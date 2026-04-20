"use server";

import "server-only";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { encrypt } from "./auth";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Ma'lumotlarni sonli ko'rinishga o'tkazish funktsiyalari
 * NaN bo'lishini oldini oladi
 */
const safeParseInt = (val: any, fallback = 0) => {
  const parsed = parseInt(String(val), 10);
  return isNaN(parsed) ? fallback : parsed;
};

const safeParseFloat = (val: any, fallback = 0) => {
  const parsed = parseFloat(String(val));
  return isNaN(parsed) ? fallback : parsed;
};

/* -------------------------------------------------------------------------- */
/*                                AUTH ACTIONS                                */
/* -------------------------------------------------------------------------- */

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    throw new Error("Iltimos, barcha maydonlarni to'ldiring");
  }

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    throw new Error("Login yoki parol noto'g'ri");
  }

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Login yoki parol noto'g'ri");
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ id: admin.id, username: admin.username, expires });

  (await cookies()).set("session", session, { expires, httpOnly: true });
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  (await cookies()).set("session", "", { expires: new Date(0) });
  redirect("/admin/login");
}

/* -------------------------------------------------------------------------- */
/*                              PROPERTY ACTIONS                              */
/* -------------------------------------------------------------------------- */

export async function createApartment(formData: FormData) {
  // 1. Ma'lumotlarni olish
  const title = (formData.get("title") as string)?.trim();
  const district = (formData.get("district") as string)?.trim();
  const neighborhood = (formData.get("neighborhood") as string)?.trim() || "";
  const houseNumber = (formData.get("houseNumber") as string)?.trim() || "";
  // Manzilni yig'ish (Masalan: Oltinko'l tumani, Qo'rg'ontepa MFY, 12-uy)
  const address = `${district} tumani, ${neighborhood}, ${houseNumber}`;
  
  const description = (formData.get("description") as string)?.trim();
  const tenantRequirements = (formData.get("tenantRequirements") as string)?.trim();
  const minRentalTerm = (formData.get("minRentalTerm") as string)?.trim();
  
  // 2. Numeric fieldlarni xavfsiz o'tkazish (NaN oldini olish)
  const price = safeParseFloat(formData.get("price"));
  const rooms = safeParseInt(formData.get("rooms"));
  const area = safeParseFloat(formData.get("area"));
  const floor = safeParseInt(formData.get("floor"));
  const lat = safeParseFloat(formData.get("lat"), 0);
  const lng = safeParseFloat(formData.get("lng"), 0);

  // 3. Checkboxes (Boolean)
  const petsAllowed = formData.get("petsAllowed") === "on";
  const smokingAllowed = formData.get("smokingAllowed") === "on";

  // 4. Validatsiya
  if (!title || !address || !district || price <= 0) {
    throw new Error("Sarlavha, manzil, tuman va narx majburiy maydonlardir.");
  }

  const imageFiles = formData.getAll("images") as File[];
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const imageUrls: string[] = [];

  for (const imageFile of imageFiles) {
    if (imageFile && imageFile.size > 0 && imageFile.name) {
      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}-${imageFile.name.replace(/\s+/g, '_')}`;
        await writeFile(path.join(uploadDir, filename), buffer);
        imageUrls.push(`/uploads/${filename}`);
      } catch (e) {
        console.error("Image upload failed:", e);
      }
    }
  }

  // Default fallback if no image uploaded
  if (imageUrls.length === 0) {
    imageUrls.push("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop");
  }

  try {
    // 5. Prisma orqali saqlash
    await prisma.apartment.create({
      data: {
        title,
        address,
        district,
        monthlyRent: price,
        rooms,
        area,
        floor,
        description: description || "Tavsif berilmagan",
        tenantRequirements: tenantRequirements || "Shartlar ko'rsatilmagan",
        minRentalTerm: minRentalTerm || "Kelishuv asosida",
        petsAllowed,
        smokingAllowed,
        latitude: lat,
        longitude: lng,
        isPublished: true,
        isVerified: true,
        images: {
          create: imageUrls.map((url, i) => ({
            url,
            isCover: i === 0,  // birinchisi asosiy rasm
            sortOrder: i,
          }))
        }
      },
    });
  } catch (error) {
    console.error("Prisma Create Error:", error);
    throw new Error("Ma'lumotlarni saqlashda xatolik yuz berdi.");
  }

  // 6. Muvaffaqiyatli yakunlangach keshlarni tozalab yo'naltirish
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/listings");
  redirect("/admin/dashboard");
}

export async function deleteApartment(id: string) {
  try {
    await prisma.apartment.delete({
      where: { id }
    });
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    revalidatePath("/listings");
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("E'lonni o'chirishda xatolik yuz berdi.");
  }
  
  redirect("/admin/dashboard");
}

export async function updateApartment(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) throw new Error("ID topilmadi");

  const title = (formData.get("title") as string)?.trim();
  const district = (formData.get("district") as string)?.trim();
  const neighborhood = (formData.get("neighborhood") as string)?.trim() || "";
  const houseNumber = (formData.get("houseNumber") as string)?.trim() || "";
  const address = `${district} tumani, ${neighborhood}, ${houseNumber}`;
  const description = (formData.get("description") as string)?.trim();
  const tenantRequirements = (formData.get("tenantRequirements") as string)?.trim();
  const minRentalTerm = (formData.get("minRentalTerm") as string)?.trim();

  const price = safeParseFloat(formData.get("price"));
  const rooms = safeParseInt(formData.get("rooms"));
  const area = safeParseFloat(formData.get("area"));
  const floor = safeParseInt(formData.get("floor"));
  const petsAllowed = formData.get("petsAllowed") === "on";
  const smokingAllowed = formData.get("smokingAllowed") === "on";

  // Handle new image if uploaded
  const imageFile = formData.get("image") as File;
  let newImageUrl: string | null = null;

  if (imageFile && imageFile.size > 0 && imageFile.name) {
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
      newImageUrl = `/uploads/${filename}`;
    } catch (e) {
      console.error("Image upload failed:", e);
    }
  }

  try {
    await prisma.apartment.update({
      where: { id },
      data: {
        title,
        address,
        district,
        monthlyRent: price,
        rooms,
        area,
        floor,
        description: description || "Tavsif berilmagan",
        tenantRequirements: tenantRequirements || "Shartlar ko'rsatilmagan",
        minRentalTerm: minRentalTerm || "Kelishuv asosida",
        petsAllowed,
        smokingAllowed,
        ...(newImageUrl && {
          images: {
            deleteMany: {},
            create: [{ url: newImageUrl }]
          }
        })
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    throw new Error("Ma'lumotlarni yangilashda xatolik yuz berdi.");
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/listings");
  revalidatePath(`/apartment/${id}`);
  redirect("/admin/dashboard");
}
