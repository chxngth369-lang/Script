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
                checkRulesReady();
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

// 🔥 ปรับปรุงฟังก์ชันปิดป๊อปอัปคำเตือน: เพิ่มแอนิเมชัน Fade Out ขาออก
function closeRulesModal() {
    const modal = document.getElementById("rulesModal");
    const appContainer = document.querySelector(".app-container");
    
    if (modal) {
        // ใส่ Class สั่งให้ป๊อปอัปค่อยๆ จางและยุบตัวหายไป
        modal.classList.add("popup-fade-out");
        
        // ใส่ Class สั่งให้เนื้อหาเว็บหลักค่อยๆ slide โผล่ขึ้นมาอย่างนุ่มนวล
        if (appContainer) {
            appContainer.classList.add("app-content-show");
        }
        
        // รอให้แอนิเมชันเล่นจบ (0.5 วินาที) แล้วค่อยซ่อน Element
        setTimeout(function() {
            modal.style.display = "none";
        }, 500);
    }
}

// สั่งให้ฟังก์ชันเริ่มนับเวลาทำงานทันที
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
