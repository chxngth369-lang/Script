// ฟังก์ชันจัดการการแสดงผลสคริปต์
function updateGallery() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const activeNavItem = document.querySelector('.nav-item.active');
    const activeCategory = activeNavItem.getAttribute('data-cat');
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const category = card.getAttribute('data-category');

        const isCategoryMatch = (activeCategory === 'all' || category === activeCategory);
        const isSearchMatch = title.includes(searchTerm);

        if (isCategoryMatch && isSearchMatch) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// ผูกเหตุการณ์พิมพ์ในช่องค้นหา
document.getElementById('searchInput').addEventListener('keyup', updateGallery);

// ฟังก์ชันเปลี่ยนหมวดหมู่
function filterScripts(category, element) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    updateGallery();
}

// ฟังก์ชันเปิด Modal
function openModal(title, category, linkvertiseURL) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCategory').innerText = category;
    document.getElementById('scriptLink').href = linkvertiseURL;
    document.getElementById('scriptModal').style.display = "block";
    document.body.style.overflow = "hidden"; // ล็อกการสกรูลหน้าจอ
}

// ฟังก์ชันปิด Modal
function closeModal() {
    document.getElementById('scriptModal').style.display = "none";
    document.body.style.overflow = "auto"; // คืนค่าการสกรูล
}

// ปิด Modal เมื่อคลิกพื้นที่ว่าง
window.onclick = (e) => {
    if (e.target.className === 'modal') closeModal();
}
