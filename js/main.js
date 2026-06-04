document.addEventListener('DOMContentLoaded', () => {
    // Check if data exists
    if (typeof window.math9Data === 'undefined') {
        console.error('Math 9 Data is missing!');
        return;
    }

    const data = window.math9Data;
    
    // --- Render Topics as Accordion Tree (Grid of 4) ---
    function renderAllTopics(containerId, allTopics) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const colors = ['#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#14b8a6', '#f43f5e', '#6366f1'];
        let html = '';
        allTopics.forEach((topic, index) => {
            const color = colors[index % colors.length];
            const views = Math.floor(Math.random() * 800) + 500;
            const viewsStr = '1.' + String(views).padStart(3, '0');
            
            let iconClass = 'fa-book';
            const lowerTitle = topic.title.toLowerCase();
            if (lowerTitle.includes('phương trình')) iconClass = 'fa-equals';
            else if (lowerTitle.includes('căn')) iconClass = 'fa-square-root-variable';
            else if (lowerTitle.includes('tam giác') || lowerTitle.includes('lượng giác')) iconClass = 'fa-ruler-triangle';
            else if (lowerTitle.includes('đường tròn') || lowerTitle.includes('cung')) iconClass = 'fa-circle-notch';
            else if (lowerTitle.includes('hàm số')) iconClass = 'fa-chart-line';

            let titlePrefix = "";
            let titleContent = topic.title;
            const colonIndex = topic.title.indexOf(':');
            if (colonIndex > -1) {
                titlePrefix = topic.title.substring(0, colonIndex).trim();
                titleContent = topic.title.substring(colonIndex + 1).trim();
            } else {
                titleContent = topic.title;
            }

            html += `
                <div class="tree-node" style="position: relative; border-radius: 8px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s; border-top: 5px solid ${color}; display: flex; flex-direction: column;">
                    <div id="header-chapter-${index}" class="tree-header" onclick="toggleTree('chapter-${index}')" style="padding: 15px 15px 10px 15px; cursor: pointer; display: flex; flex-direction: column; flex-grow: 1; min-height: 100px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-grow: 1;">
                            <div style="flex-grow: 1; display: flex; flex-direction: column; align-items: flex-start;">
                                <div style="display: inline-block; background: ${color}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.85rem; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">
                                    ${titlePrefix || 'BÀI HỌC'}
                                </div>
                                <h4 style="margin: 0; font-size: 1.05rem; color: #111827; line-height: 1.4; font-weight: 600;">
                                    ${titleContent}
                                </h4>
                            </div>
                            <div style="display: flex; gap: 8px; align-items: flex-start;">
                                <div style="background: ${color}1A; color: ${color}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.1rem;">
                                    <i class="fa-solid ${iconClass}"></i>
                                </div>
                                <div style="display: flex; align-items: center; height: 36px;">
                                    <i class="fa-solid fa-chevron-down" id="icon-chapter-${index}" style="transition: transform 0.3s; color: #6b7280;"></i>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #e5e7eb; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #6b7280; font-weight: 500;">
                            <div>
                                <i class="fa-regular fa-eye" style="margin-right: 4px;"></i> ${viewsStr}
                            </div>
                            <div>
                                <i class="fa-solid fa-star" style="color: #fbbf24; margin-right: 2px;"></i> 4.9/5
                            </div>
                        </div>
                    </div>
                    <div class="tree-body" id="body-chapter-${index}" style="display: none; position: absolute; top: calc(100% + 5px); left: 0; width: 800px; max-width: 90vw; background: #fff; z-index: 1000; padding: 25px; border-radius: 12px; box-shadow: 0 15px 50px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.05);">
                        <h5 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--primary); border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 10px;">Các dạng bài tập:</h5>
                        <div class="card-grid practice-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px;">`;
            
            topic.practice.forEach((item) => {
                let parts = item.title.split(':');
                let dang = parts[0];
                let desc = parts.slice(1).join(':').trim();
                if (parts.length === 1) {
                    dang = "DẠNG BÀI";
                    desc = item.title;
                }
                html += `
                            <div class="topic-card" onclick="handleCardClick('${item.id}', 'mixed', 'practice')" style="background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; padding: 15px; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
                                <div class="topic-id" style="color: var(--secondary); font-weight: 700; font-size: 0.8rem; margin-bottom: 8px; text-transform: uppercase;">${dang}</div>
                                <div class="topic-title" style="font-size: 0.95rem; color: var(--text-primary); font-weight: 500;">${desc}</div>
                            </div>`;
            });
            
            html += `
                        <div class="topic-card" onclick="handleCardClick('${topic.id}', 'lesson_mixed', 'lesson')" style="background: var(--primary); border: none; border-radius: 8px; padding: 15px; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3); display: flex; align-items: center; justify-content: center; min-height: 100px;">
                            <div style="color: #fff; font-weight: 600; font-size: 1.1rem; text-align: center;">
                                <i class="fa-solid fa-graduation-cap" style="font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                                Luyện Tập<br>Tổng Hợp Bài
                            </div>
                        </div>
                        </div>
                    </div>
                </div>`;
        });
        container.innerHTML = html;
    }

    window.toggleTree = function(id) {
        // Close all other bodies
        document.querySelectorAll('.tree-body').forEach(b => {
            if(b.id !== `body-${id}`) b.style.display = 'none';
        });
        document.querySelectorAll('.tree-header i').forEach(i => {
            if(i.id !== `icon-${id}`) i.style.transform = 'rotate(0deg)';
        });

        const body = document.getElementById(`body-${id}`);
        const icon = document.getElementById(`icon-${id}`);
        if (!body) return;
        
        if (body.style.display === 'none' || body.style.display === '') {
            body.style.left = '0';
            body.style.right = 'auto';
            body.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
            
            // Ensure it doesn't overflow the viewport width
            const rect = body.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                body.style.left = 'auto';
                body.style.right = '0';
            }
        } else {
            body.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
        }
    };
    
    // Close popovers when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.tree-node')) {
            document.querySelectorAll('.tree-body').forEach(b => b.style.display = 'none');
            document.querySelectorAll('.tree-header i').forEach(i => i.style.transform = 'rotate(0deg)');
        }
    });

    // Combine and sort topics
    let allTopics = [...data.algebra.topics, ...data.geometry.topics];
    allTopics.sort((a, b) => {
        let numA = parseInt(a.id.replace('bai', ''));
        let numB = parseInt(b.id.replace('bai', ''));
        return numA - numB;
    });

    // Initialize Rendering
    renderAllTopics('all-practice-grid', allTopics);

    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            
            if (targetEl) {
                // Adjust for fixed header offset
                const headerOffset = 80;
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
                
                // Update active state in main nav if applicable
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                if(this.classList.contains('active') === false && this.closest('.nav-links')) {
                    this.classList.add('active');
                }
            }
        });
    });
});

// Handle card clicks
window.handleCardClick = function(id, type, category) {
    // category is 'theory' or 'practice'
    console.log(`Clicked on ${category} card: ${id} (${type})`);
    
    if (category === 'theory') {
        // Redirect to lesson page, passing ID in URL params
        window.location.href = `lesson.html?id=${id}&type=${type}`;
    } else {
        // Redirect to practice page
        window.location.href = `practice.html?id=${id}&type=${type}`;
    }
}

// Tab Switching Logic
window.switchSubject = function(subject) {
    const algebraSection = document.getElementById('algebra-section');
    const geometrySection = document.getElementById('geometry-section');
    const tabBtns = document.querySelectorAll('.subject-tab-btn');
    
    // Update tabs
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    if (subject === 'algebra') {
        algebraSection.style.display = 'block';
        geometrySection.style.display = 'none';
        tabBtns[0].classList.add('active');
    } else {
        algebraSection.style.display = 'none';
        geometrySection.style.display = 'block';
        tabBtns[1].classList.add('active');
    }
}


// --- Test Config Functions ---
window.openTestConfig = function() {
    const container = document.getElementById('config-tree-container');
    let html = '<ul style="list-style: none; padding: 0; margin: 0;">';
    
    ['algebra', 'geometry'].forEach(cat => {
        if (!window.math9Data[cat]) return;
        html += `<li style="margin-bottom: 15px;">
            <div style="font-weight: 700; color: var(--primary); margin-bottom: 10px; font-size: 1.1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">${window.math9Data[cat].title}</div>
            <ul style="list-style: none; padding-left: 10px;">`;
            
        window.math9Data[cat].topics.forEach((topic, tIdx) => {
            html += `<li style="margin-bottom: 12px; background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #f1f5f9;">
                <label style="display: flex; align-items: center; font-weight: 600; cursor: pointer; margin-bottom: 8px; color: var(--primary-dark);">
                    <input type="checkbox" class="config-lesson-cb" data-target=".config-type-cb-${cat}-${tIdx}" onchange="toggleLessonCb(this)" style="margin-right: 10px; transform: scale(1.2);">
                    ${topic.title}
                </label>
                <ul style="list-style: none; padding-left: 28px; display: flex; flex-direction: column; gap: 6px;">`;
                
            topic.practice.forEach((item, iIdx) => {
                let parts = item.title.split(':');
                let desc = parts.length > 1 ? parts.slice(1).join(':').trim() : item.title;
                html += `<li>
                    <label style="display: flex; align-items: flex-start; cursor: pointer; color: #475569; font-size: 0.95rem;">
                        <input type="checkbox" class="config-type-cb config-type-cb-${cat}-${tIdx}" value="${item.id}" style="margin-right: 10px; margin-top: 4px;">
                        <span>${desc}</span>
                    </label>
                </li>`;
            });
            html += `</ul></li>`;
        });
        html += `</ul></li>`;
    });
    
    html += '</ul>';
    container.innerHTML = html;
    document.getElementById('test-config-modal').style.display = 'block';
};

window.closeTestConfig = function() {
    document.getElementById('test-config-modal').style.display = 'none';
};

window.toggleLessonCb = function(checkbox) {
    const targets = document.querySelectorAll(checkbox.getAttribute('data-target'));
    targets.forEach(cb => cb.checked = checkbox.checked);
};

window.generateCustomTest = function() {
    const checkboxes = document.querySelectorAll('.config-type-cb:checked');
    if (checkboxes.length === 0) {
        alert('Vui lòng chọn ít nhất một dạng bài tập!');
        return;
    }
    const selectedIds = Array.from(checkboxes).map(cb => cb.value);
    const difficulty = document.getElementById('test-difficulty').value;
    
    const encodedIds = encodeURIComponent(selectedIds.join(','));
    window.location.href = `practice.html?type=custom_test&ids=${encodedIds}&diff=${difficulty}`;
};
