document.addEventListener('DOMContentLoaded', () => {
    // 1. O'ZBEKISTON HUDUDLARI (To'liq Ro'yxat)
    const locations = {
        "Toshkent shahri": ["Olmazor tumani", "Bektemir tumani", "Mirobod tumani", "Mirzo Ulug'bek tumani", "Sergeli tumani", "Uchtepa tumani", "Chilonzor tumani", "Shayxontohur tumani", "Yunusobod tumani", "Yakkasaroy tumani", "Yashnobod tumani", "Yangihayot tumani"],
        "Toshkent viloyati": ["Angren shahri", "Olmaliq shahri", "Chirchiq shahri", "Bekobod tumani", "Bo'stonliq tumani", "Bo'ka tumani", "Chinoz tumani", "Qibray tumani", "Parkent tumani", "Piskent tumani", "Quyi Chirchiq tumani", "O'rta Chirchiq tumani", "Yuqori Chirchiq tumani", "Yangiyo'l tumani", "Zangiota tumani"],
        "Andijon viloyati": ["Andijon shahri", "Andijon tumani", "Asaka tumani", "Baliqchi tumani", "Buloqboshi tumani", "Bo'ston tumani", "Izboskan tumani", "Jalaquduq tumani", "Marhamat tumani", "Oltinko'l tumani", "Paxtaobod tumani", "Qo'rg'ontepa tumani", "Shahrixon tumani", "Ulug'nor tumani", "Xo'jaobod tumani"],
        "Buxoro viloyati": ["Buxoro shahri", "Buxoro tumani", "G'ijduvon tumani", "Jondor tumani", "Kogon tumani", "Olot tumani", "Peshku tumani", "Qorako'l tumani", "Qorovulbozor tumani", "Romitan tumani", "Shofirkon tumani", "Vobkent tumani"],
        "Farg'ona viloyati": ["Farg'ona shahri", "Marg'ilon shahri", "Qo'qon shahri", "Quva tumani", "Oltiariq tumani", "Bag'dod tumani", "Beshariq tumani", "Buvayda tumani", "Dang'ara tumani", "Farg'ona tumani", "Furqat tumani", "Qo'shtepa tumani", "Rishton tumani", "So'x tumani", "Toshloq tumani", "Uchko'prik tumani", "Yozyovon tumani"],
        "Jizzax viloyati": ["Jizzax shahri", "Arnasoy tumani", "Baxmal tumani", "Do'stlik tumani", "Forish tumani", "G'allaorol tumani", "Sharof Rashidov tumani", "Mirzacho'l tumani", "Paxtakor tumani", "Yangiobod tumani", "Zomin tumani", "Zafarobod tumani", "Zarbdor tumani"],
        "Namangan viloyati": ["Namangan shahri", "Chortoq tumani", "Chust tumani", "Kosonsoy tumani", "Mingbuloq tumani", "Namangan tumani", "Norin tumani", "Pop tumani", "To'raqo'rg'on tumani", "Uychi tumani", "Yangiqo'rg'on tumani"],
        "Navoiy viloyati": ["Navoiy shahri", "Zarafshon shahri", "Karmana tumani", "Konimex tumani", "Navbahor tumani", "Nurota tumani", "Qiziltepa tumani", "Tomdi tumani", "Uchquduq tumani", "Xatirchi tumani"],
        "Qashqadaryo viloyati": ["Qarshi shahri", "Shahrisabz shahri", "Chiroqchi tumani", "Dehqonobod tumani", "G'uzor tumani", "Kamashi tumani", "Karshi tumani", "Koson tumani", "Kasbi tumani", "Kitob tumani", "Mirishkor tumani", "Muborak tumani", "Nishon tumani", "Shahrisabz tumani", "Yakkabog' tumani"],
        "Samarqand viloyati": ["Samarqand shahri", "Kattaqo'rg'on shahri", "Bulung'ur tumani", "Ishtixon tumani", "Jomboy tumani", "Kattaqo'rg'on tumani", "Narpay tumani", "Nurobod tumani", "Oqdaryo tumani", "Paxtachi tumani", "Payariq tumani", "Pastdarg'om tumani", "Samarqand tumani", "Toyloq tumani", "Urgut tumani", "Qo'shrabot tumani"],
        "Sirdaryo viloyati": ["Guliston shahri", "Shirin shahri", "Yangiyer shahri", "Boyovut tumani", "Guliston tumani", "Oqoltin tumani", "Sardoba tumani", "Sayxunobod tumani", "Sirdaryo tumani", "Xovos tumani", "Mirzaobod tumani"],
        "Surxondaryo viloyati": ["Termiz shahri", "Angor tumani", "Boysun tumani", "Denov tumani", "Jarqo'rg'on tumani", "Muzrabot tumani", "Oltinsoy tumani", "Qiziriq tumani", "Qumqo'rg'on tumani", "Sariosiyo tumani", "Sherobod tumani", "Sho'rchi tumani", "Termiz tumani", "Uzun tumani"],
        "Xorazm viloyati": ["Urganch shahri", "Xiva shahri", "Bog'ot tumani", "Gurlan tumani", "Hazorasp tumani", "Qo'shko'pir tumani", "Shovot tumani", "Urganch tumani", "Xiva tumani", "Xonqa tumani", "Yangiariq tumani", "Yangibozor tumani"],
        "Qoraqalpog'iston Respublikasi": ["Nukus shahri", "Amudaryo tumani", "Beruniy tumani", "Bo'zatov tumani", "Chimboy tumani", "Ellikqal'a tumani", "Kegeyli tumani", "Mo'ynoq tumani", "Nukus tumani", "Qonliko'l tumani", "Qo'ng'irot tumani", "Qorao'zak tumani", "Shumanay tumani", "Taxtako'pir tumani", "To'rtko'l tumani", "Xo'jayli tumani", "Qorao'zak tumani"]
    };

    const regionSelect = document.getElementById('regionSelect');
    const districtSelect = document.getElementById('districtSelect');
    const mahallaList = document.getElementById('mahallaList');

    // 2. VILOYATLARNI TO'LDIRISH
    if (regionSelect) {
        regionSelect.innerHTML = '<option value="" disabled selected>Viloyatni tanlang</option>';
        Object.keys(locations).sort().forEach(region => {
            let opt = document.createElement('option');
            opt.value = region;
            opt.textContent = region;
            regionSelect.appendChild(opt);
        });
    }

    // 3. TUMANLARNI YANGILASH
    regionSelect?.addEventListener('change', function() {
        districtSelect.innerHTML = '<option value="" disabled selected>Tumanni tanlang</option>';
        districtSelect.disabled = false;
        const selectedRegion = this.value;
        if(selectedRegion && locations[selectedRegion]) {
            locations[selectedRegion].sort().forEach(dist => {
                let opt = document.createElement('option');
                opt.value = dist;
                opt.textContent = dist;
                districtSelect.appendChild(opt);
            });
        }
    });

    // 5. RASMLAR BILAN ISHLASH
    const imageInput = document.getElementById('imageInput');
    const imageContainer = document.getElementById('imageContainer');
    let uploadedImages = [];
    let mainImageIndex = 0;

    imageInput?.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            compressImage(file, function(dataUrl) {
                uploadedImages.push(dataUrl);
                renderImages();
            });
        });
        this.value = ''; // Reset input to allow re-uploading same file
    });

    function compressImage(file, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                // Compress to 60% quality JPEG to save LocalStorage space
                callback(canvas.toDataURL('image/jpeg', 0.6));
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    function renderImages() {
        if(!imageContainer) return;
        imageContainer.innerHTML = '';
        uploadedImages.forEach((imgSrc, index) => {
            const div = document.createElement('div');
            div.className = `image-preview ${index === mainImageIndex ? 'is-main' : ''}`;
            
            div.onclick = () => {
                mainImageIndex = index;
                renderImages();
            };

            const img = document.createElement('img');
            img.src = imgSrc;

            const removeBtn = document.createElement('div');
            removeBtn.className = 'remove-img';
            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                uploadedImages.splice(index, 1);
                if(mainImageIndex === index) mainImageIndex = 0;
                if(mainImageIndex >= uploadedImages.length) mainImageIndex = Math.max(0, uploadedImages.length - 1);
                renderImages();
            };

            div.appendChild(img);
            div.appendChild(removeBtn);
            imageContainer.appendChild(div);
        });
    }

    // 5. FORM SUBMISSION
    const typeNotice = document.getElementById('typeNotice');
    const typeInputs = document.querySelectorAll('input[name="listingType"]');

    typeInputs.forEach(input => {
        input.addEventListener('change', function() {
            typeNotice.innerHTML = this.value === 'sotish' 
                ? '<i class="fas fa-info-circle"></i> Sizning e\'loningiz "Sotib olish" bo\'limiga qo\'shiladi.' 
                : '<i class="fas fa-info-circle"></i> Sizning e\'loningiz "Ijaraga olish" bo\'limiga qo\'shiladi.';
        });
    });

    document.getElementById('uploadForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        if(uploadedImages.length === 0) { alert("Kamida bitta rasm yuklang!"); return; }

        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> E\'lon saqlanmoqda...';

        const listingType = document.querySelector('input[name="listingType"]:checked').value;
        const newListing = {
            id: Date.now().toString(),
            type: listingType,
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            rooms: document.getElementById('rooms').value,
            bathrooms: document.getElementById('bathrooms').value || '1',
            area: document.getElementById('area').value,
            floor: document.getElementById('floor').value,
            region: regionSelect.value,
            district: districtSelect.value,
            neighborhood: document.getElementById('neighborhoodInput').value,
            street: document.getElementById('street').value,
            description: document.getElementById('description').value,
            mainImage: uploadedImages[mainImageIndex],
            images: uploadedImages // Barcha rasmlarni saqlaymiz
        };

        setTimeout(() => {
            const estates = JSON.parse(localStorage.getItem('estates') || '[]');
            estates.unshift(newListing);
            localStorage.setItem('estates', JSON.stringify(estates));
            
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Muvaffaqiyatli saqlandi!';
            submitBtn.style.background = '#10B981';

            setTimeout(() => {
                window.location.href = listingType === 'sotish' ? 'sotib-olish.html' : 'ijaraga-olish.html';
            }, 1000);
        }, 1500);
    });
});
