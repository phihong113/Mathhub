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

        let html = '';
        allTopics.forEach((topic, index) => {
            html += `
                <div class="tree-node" style="position: relative; border: 1px solid rgba(0,0,0,0.05); border-radius: 8px; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.3s;">
                    <div id="header-chapter-${index}" class="tree-header" onclick="toggleTree('chapter-${index}')" style="padding: 15px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; min-height: 80px;">
                        <h4 style="margin: 0; font-size: 1rem; color: var(--text-primary); line-height: 1.4; font-weight: 600;">${topic.title}</h4>
                        <i class="fa-solid fa-chevron-down" id="icon-chapter-${index}" style="transition: transform 0.3s; margin-left: 10px; color: var(--primary);"></i>
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
