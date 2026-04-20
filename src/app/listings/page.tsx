import { prisma } from "@/lib/prisma";
import { mockProperties } from "@/lib/mock-data";
import ListingsClient from "@/components/ListingsClient";

export default async function ListingsPage() {
  const dbProperties = await prisma.apartment.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true }
  });

  // Map database entries to match the expected format for PropertyCards
  const formattedProperties = dbProperties.length > 0 
    ? dbProperties.map(p => ({
        id: p.id,
        title: p.title,
        price: p.monthlyRent,
        district: p.district,
        rooms: p.rooms,
        area: p.area,
        image: p.images?.[0]?.url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
        isVerified: p.isVerified
      }))
    : mockProperties; // Fallback to mock data if the database is empty

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 2xl:px-16 py-12">
      <ListingsClient initialData={formattedProperties} />
    </div>
  );
}
