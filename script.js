let timeLeft = 5;
let countdownTimer;

// ฟังก์ชันควบคุมการนับเวลาถอยหลัง 5 วินาทีของป๊อปอัปคำเตือน
function startRulesCountdown() {
    if (countdownTimer) clearInterval(countdownTimer); 
    
    countdownTimer = setInterval(function() {
        timeLeft--;
        const countdownTextEl = document.getElementById("countdownText");
        
        if (countdownTextEl) {
            if (timeLeft > 0) {
                countdownTextEl.innerText = "(" + timeLeft + "วิ)";
            } else {
                clearInterval(countdownTimer);
                countdownTextEl.innerText = "";
                checkRulesReady(); // ตรวจสอบสถานะปุ่มเผื่อกรณีผู้ใช้กดติ๊กไว้ล่วงหน้า
            }
        }
    }, 1000);
}

// ตรวจเช็คความพร้อม (ต้องเลือก 'ฉันยอมรับข้อตกลง' แถมนับเวลาจนถึง 0 วินาที)
function checkRulesReady() {
    const checkbox = document.getElementById("agreeCheckbox");
    const enterBtn = document.getElementById("enterSiteBtn");
    
    if (checkbox && enterBtn) {
        if (checkbox.checked && timeLeft <= 0) {
            enterBtn.disabled = false;
        } else {
            enterBtn.disabled = true;
        }
    }
}

// ปิดป๊อปอัปคำเตือนและเริ่มใช้งานหน้าเว็บหลัก
function closeRulesModal() {
    const modal = document.getElementById("rulesModal");
    if (modal) modal.style.display = "none";
}

// สั่งให้ฟังก์ชันเริ่มนับเวลาทำงานทันที (ไม่รอคำสั่งโหลดหน้าเว็บแบบเก่า ป้องกันเวลานิ่งค้างบน GitHub/Vercel)
startRulesCountdown();


// --- โค้ดเดิมของระบบแกลเลอรีสคริปต์และโมดอล ---
function updateGallery() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const activeNavItem = document.querySelector('.nav-item.active');
    const activeCategory = activeNavItem ? activeNavItem.getAttribute('data-cat') : 'all';
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const category = card.getAttribute('data-category');
        const isCategoryMatch = (activeCategory === 'all' || category === activeCategory);
        const isSearchMatch = title.includes(searchTerm);

        if (isCategoryMatch && isSearchMatch) {
            card.style.display = "flex";
            card.classList.remove('card-animate');
            void card.offsetWidth; 
            card.classList.add('card-animate');
        } else {
            card.style.display = "none";
        }
    });
}

document.getElementById('searchInput').addEventListener('keyup', updateGallery);

function filterScripts(category, element) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    updateGallery();
}

function openModal(title, category, linkvertiseURL) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCategory').innerText = category;
    document.getElementById('scriptLink').href = linkvertiseURL;
    document.getElementById('scriptModal').style.display = "block";
}

function closeModal() {
    document.getElementById('scriptModal').style.display = "none";
}

window.onclick = (e) => { 
    if (e.target.className === 'modal') closeModal();  
}
