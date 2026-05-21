let timeLeft = 10; // 🔥 ปรับเพิ่มเวลาเป็น 10 วินาทีตรงนี้เรียบร้อยแล้วครับ
let countdownTimer;

// ฟังก์ชันควบคุมการนับเวลาถอยหลัง 10 วินาทีของป๊อปอัปคำเตือน
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

// ฟังก์ชันปิดป๊อปอัปคำเตือน: เพิ่มแอนิเมชันจางออกอย่างนุ่มนวล
function closeRulesModal() {
    const modal = document.getElementById("rulesModal");
    const appContainer = document.querySelector(".app-container");
    
    if (modal) {
        modal.classList.add("popup-fade-out");
        
        if (appContainer) {
            appContainer.classList.add("app-content-show");
        }
        
        setTimeout(function() {
            modal.style.display = "none";
        }, 500);
    }
}

// สั่งให้ฟังก์ชันเริ่มนับเวลาทำงานทันที
startRulesCountdown();


// --- ระบบแกลเลอรีสคริปต์และการค้นหา ---
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


// ฟังก์ชันเปิดโมดอลรายละเอียดสคริปต์ (เน้นนุ่มนวล ค่อยๆ เปิด)
function openModal(title, category, linkvertiseURL) {
    const modal = document.getElementById('scriptModal');
    
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCategory').innerText = category;
    document.getElementById('scriptLink').href = linkvertiseURL;
    
    if (modal) {
        modal.style.display = "block";
        modal.classList.remove('modal-fade-out');
        
        setTimeout(function() {
            modal.classList.add('modal-fade-in');
        }, 10);
    }
}

// ฟังก์ชันปิดโมดอลรายละเอียดสคริปต์ (หน่วงเวลาให้เล่นแอนิเมชันจนจบ)
function closeModal() {
    const modal = document.getElementById('scriptModal');
    
    if (modal) {
        modal.classList.remove('modal-fade-in');
        modal.classList.add('modal-fade-out');
        
        setTimeout(function() {
            modal.style.display = "none";
            modal.classList.remove('modal-fade-out');
        }, 400);
    }
}

// ปิดโมดอลเมื่อคลิกพื้นที่ว่างข้างนอก
window.onclick = (e) => { 
    const modal = document.getElementById('scriptModal');
    if (e.target === modal) {
        closeModal();
    }
}
