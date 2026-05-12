document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;

    // 1. O'ZBEKISTON HUDUDLARI
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
        "Qoraqalpog'iston Respublikasi": ["Nukus shahri", "Amudaryo tumani", "Beruniy tumani", "Bo'zatov tumani", "Chimboy tumani", "Ellikqal'a tumani", "Kegeyli tumani", "Mo'ynoq tumani", "Nukus tumani", "Qonliko'l tumani", "Qo'ng'irot tumani", "Qorao'zak tumani", "Shumanay tumani", "Taxtako'pir tumani", "To'rtko'l tumani", "Xo'jayli tumani"]
    };

    const isIjaraPage = window.location.pathname.includes('ijaraga-olish');
    const targetType = isIjaraPage ? 'ijara' : 'sotish';

    const filterRegion = document.getElementById('filterRegion');
    const filterDistrict = document.getElementById('filterDistrict');
    const filterPrice = document.getElementById('filterPrice');
    const applyFilterBtn = document.getElementById('applyFilterBtn');

    // 2. POPULATE REGIONS
    if (filterRegion) {
        Object.keys(locations).sort().forEach(region => {
            let opt = document.createElement('option');
            opt.value = region;
            opt.textContent = region;
            filterRegion.appendChild(opt);
        });
    }

    // 3. HANDLE REGION CHANGE
    filterRegion?.addEventListener('change', function() {
        filterDistrict.innerHTML = '<option value="">Hammasi</option>';
        filterDistrict.disabled = !this.value;
        if(this.value && locations[this.value]) {
            locations[this.value].sort().forEach(dist => {
                let opt = document.createElement('option');
                opt.value = dist;
                opt.textContent = dist;
                filterDistrict.appendChild(opt);
            });
        }
    });

    // 4. RENDER FUNCTION
    function renderEstates(data) {
        grid.innerHTML = '';
        if (data.length === 0) {
            grid.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-muted);">Qidiruv natijasida hech narsa topilmadi.</p>`;
            return;
        }

        data.forEach((estate, index) => {
            const isVip = index === 0; // First one is VIP for demo
            const cardHtml = `
            <a href="property.html?id=${estate.id}" class="card-link">
                <div class="card">
                    <div class="card-img-wrapper">
                        <span class="badge ${isVip ? 'badge-vip' : (estate.type === 'ijara' ? 'badge-rent' : '')}">
                            ${isVip ? '<i class="fas fa-crown"></i> VIP' : (estate.type === 'ijara' ? 'Ijara' : 'Sotuvda')}
                        </span>
                        <img src="${estate.mainImage}" alt="${estate.title}" class="card-img">
                    </div>
                    <div class="card-content">
                        <div class="price">$${Number(estate.price).toLocaleString()}</div>
                        <h3 class="title">${estate.title}</h3>
                        <div class="details">
                            <span><i class="fas fa-bed"></i> ${estate.rooms} xona</span>
                            <span><i class="fas fa-expand"></i> ${estate.area} m²</span>
                        </div>
                        <div class="location">
                            <i class="fas fa-map-marker-alt"></i> ${estate.region}, ${estate.district}
                        </div>
                    </div>
                </div>
            </a>`;
            grid.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    // 5. INITIAL LOAD
    async function initListings() {
        try {
            const response = await fetch('/api/listings');
            const estates = await response.json();
            
            let currentEstates = estates.filter(e => e.type === targetType);
            renderEstates(currentEstates);

            // 6. FILTER LOGIC
            applyFilterBtn?.addEventListener('click', () => {
                const region = filterRegion.value;
                const district = filterDistrict.value;
                const maxPrice = parseFloat(filterPrice.value);

                let filtered = estates.filter(e => e.type === targetType);

                if (region) filtered = filtered.filter(e => e.region === region);
                if (district) filtered = filtered.filter(e => e.district === district);
                if (!isNaN(maxPrice) && maxPrice > 0) filtered = filtered.filter(e => parseFloat(e.price) <= maxPrice);

                renderEstates(filtered);
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        } catch (err) {
            console.error('Ma\'lumotlarni yuklashda xato:', err);
            grid.innerHTML = '<p class="no-results">Serverdan ma\'lumot olishda xato yuz berdi.</p>';
        }
    }

    initListings();
});
