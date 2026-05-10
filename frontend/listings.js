document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;

    // Get page type from title or filename
    const isIjaraPage = window.location.pathname.includes('ijaraga-olish');
    const targetType = isIjaraPage ? 'ijara' : 'sotish';

    const estates = JSON.parse(localStorage.getItem('estates') || '[]');
    const filteredEstates = estates.filter(e => e.type === targetType);

    if (filteredEstates.length === 0) {
        grid.innerHTML = `<p class="no-results">Hozircha ${targetType === 'sotish' ? 'sotiladigan' : 'ijaraga beriladigan'} uylar yo'q.</p>`;
        return;
    }

    filteredEstates.forEach(estate => {
        const cardHtml = `
        <a href="property.html?id=${estate.id}" class="card-link">
            <div class="card">
                <div class="card-img-wrapper">
                    <span class="badge ${estate.type === 'ijara' ? 'badge-rent' : ''}">${estate.type === 'ijara' ? 'Ijara' : 'Sotuvda'}</span>
                    <img src="${estate.mainImage}" alt="${estate.title}" class="card-img">
                </div>
                <div class="card-content">
                    <div class="price">$${estate.price}${estate.type === 'ijara' ? ' / oy' : ''}</div>
                    <h3 class="title">${estate.title}</h3>
                    <div class="details">
                        <span><i class="fas fa-bed"></i> ${estate.rooms} xona</span>
                        <span><i class="fas fa-bath"></i> ${estate.bathrooms || 1} vanna</span>
                        <span><i class="fas fa-vector-square"></i> ${estate.area} m²</span>
                    </div>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i> ${estate.region}, ${estate.district}
                    </div>
                </div>
            </div>
        </a>`;
        grid.insertAdjacentHTML('beforeend', cardHtml);
    });
});
