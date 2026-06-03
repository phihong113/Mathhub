
const Generators = {
    shuffle: function(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    },
    formatFraction: function(tu, mau) {
        if (mau < 0) {
            tu = -tu;
            mau = -mau;
        }
        if (mau === 1) return tu.toString();
        if (tu === 0) return "0";
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const d = gcd(Math.abs(tu), Math.abs(mau));
        tu = tu / d;
        mau = mau / d;
        if (mau === 1) return tu.toString();
        if (tu < 0) return `-\\frac{${-tu}}{${mau}}`;
        return `\\frac{${tu}}{${mau}}`;
    },
    fallback: function(count = 1) {
        return [{
            id: 'fallback_0', text: 'Đang tải thuật toán...', options: ['A','B','C','D'], correctAnswer: 0, explanation: ''
        }];
    },
    generic_algebra: function(id, title, count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*5)+2;
            const b = Math.floor(Math.random()*10)+1;
            const ans = a+b;
            const text = `[${title}] Tìm giá trị của biểu thức: \\( ${a}x + ${b} \\) khi \\( x = 1 \\)?`;
            const exp = `Thay \\( x = 1 \\) vào biểu thức ta được: \\( ${a}(1) + ${b} = ${ans} \\).`;
            const opts = this.shuffle([`${ans}`, `${ans+1}`, `${ans-1}`, `${a*b}`]);
            q.push({ id: id+'_'+i, text, options: opts, correctAnswer: opts.indexOf(`${ans}`), explanation: exp });
        }
        return q;
    },
    generic_equation: function(id, title, count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const x = Math.floor(Math.random()*5)+1;
            const a = Math.floor(Math.random()*3)+2;
            const c = a*x;
            const text = `[${title}] Giải phương trình: \\( ${a}x = ${c} \\)`;
            const exp = `Chia hai vế cho ${a}, ta được: \\( x = \\frac{${c}}{${a}} = ${x} \\).`;
            const opts = this.shuffle([`x = ${x}`, `x = ${x+1}`, `x = ${x-1}`, `x = ${x+2}`]);
            q.push({ id: id+'_'+i, text, options: opts, correctAnswer: opts.indexOf(`x = ${x}`), explanation: exp });
        }
        return q;
    },
    generic_root: function(id, title, count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*5)+2;
            const text = `[${title}] Rút gọn biểu thức: \\( \\sqrt{${a*a}} + 1 \\)`;
            const exp = `Ta có \\( \\sqrt{${a*a}} = ${a} \\). Do đó biểu thức bằng \\( ${a} + 1 = ${a+1} \\).`;
            const ans = `${a+1}`;
            const opts = this.shuffle([ans, `${a}`, `${a+2}`, `${a*2}`]);
            q.push({ id: id+'_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    generic_geometry: function(id, title, count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const r = Math.floor(Math.random()*10)+5;
            const text = `[${title}] Cho đường tròn bán kính \\( R = ${r} \\). Tính đường kính đường tròn.`;
            const exp = `Đường kính gấp đôi bán kính: \\( d = 2R = 2 \\cdot ${r} = ${2*r} \\).`;
            const ans = `${2*r}`;
            const opts = this.shuffle([ans, `${r}`, `${r/2}`, `${r+2}`]);
            q.push({ id: id+'_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    generic_system: function(id, title, count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const x = Math.floor(Math.random()*5)+1;
            const y = Math.floor(Math.random()*5)+1;
            const c1 = x+y;
            const c2 = x-y;
            const text = `[${title}] Giải hệ phương trình: \\( \\begin{cases} x + y = ${c1} \\\\ x - y = ${c2} \\end{cases} \\)`;
            const exp = `Cộng hai phương trình ta có \\( 2x = ${c1+c2} \\Rightarrow x = ${x} \\). Từ đó \\( y = ${y} \\).`;
            const ans = `(${x}; ${y})`;
            const opts = this.shuffle([ans, `(${x+1}; ${y})`, `(${x}; ${y-1})`, `(${y}; ${x})`]);
            q.push({ id: id+'_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },

    b3_d1: function(count=5) {
        return this.generic_system('b3_d1', `Dạng 1: Toán về quan hệ giữa các số`, count);
    },
    b3_d2: function(count=5) {
        return this.generic_algebra('b3_d2', `Dạng 2: Toán liên quan đến chữ số`, count);
    },
    b3_d3: function(count=5) {
        return this.generic_algebra('b3_d3', `Dạng 3: Toán làm chung công việc`, count);
    },
    b3_d4: function(count=5) {
        return this.generic_algebra('b3_d4', `Dạng 4: Toán chuyển động`, count);
    },
    b3_d5: function(count=5) {
        return this.generic_algebra('b3_d5', `Dạng 5: Toán có nội dung lí, hóa`, count);
    },
    b4_d1: function(count=5) {
        return this.generic_equation('b4_d1', `Dạng 1: Giải phương trình tích`, count);
    },
    b4_d2: function(count=5) {
        return this.generic_equation('b4_d2', `Dạng 2: Giải phương trình đưa về dạng phương trình tích`, count);
    },
    b4_d3: function(count=5) {
        return this.generic_equation('b4_d3', `Dạng 3: Giải phương trình chứa ẩn ở mẫu`, count);
    },
    b4_d4: function(count=5) {
        return this.generic_equation('b4_d4', `Dạng 4: Biết phương trình có một trong các nghiệm là . Tìm giá trị của tham số`, count);
    },
    b4_d5: function(count=5) {
        return this.generic_algebra('b4_d5', `Dạng 5: Tìm giá trị của biến để giá trị của hai biểu thức có mối liên quan nào đó`, count);
    },
    b5_d1: function(count=5) {
        return this.generic_algebra('b5_d1', `Dạng 1: Viết bất đẳng thức và một số yếu tố liên quan`, count);
    },
    b5_d2: function(count=5) {
        return this.generic_algebra('b5_d2', `Dạng 2: Chứng minh bất đẳng thức`, count);
    },
    b5_d3: function(count=5) {
        return this.generic_algebra('b5_d3', `Dạng 3: So sánh hai số`, count);
    },
    b5_d4: function(count=5) {
        return this.generic_algebra('b5_d4', `Dạng 4: Bài toán thực tế`, count);
    },
    b5_d5: function(count=5) {
        return this.generic_algebra('b5_d5', `Dạng 5: Áp dụng bất đẳng thức để tìm giá trị lớn nhất, giá trị nhỏ nhất của một biểu thức`, count);
    },
    b6_d1: function(count=5) {
        return this.generic_equation('b6_d1', `Dạng 1: Nhận biết bất phương trình bậc nhất, nghiệm của bất phương trình`, count);
    },
    b6_d2: function(count=5) {
        return this.generic_equation('b6_d2', `Dạng 2: Giải bất phương trình bậc nhất một ẩn`, count);
    },
    b6_d3: function(count=5) {
        return this.generic_equation('b6_d3', `Dạng 3: Giải bài toán bằng cách lập bất phương trình`, count);
    },
    b7_d1: function(count=5) {
        return this.generic_root('b7_d1', `Dạng 1: Tìm căn bậc hai của một số`, count);
    },
    b7_d2: function(count=5) {
        return this.generic_root('b7_d2', `Dạng 2: Tìm điều kiện xác định của biểu thức chứa căn. Tính giá trị của biểu thức`, count);
    },
    b7_d3: function(count=5) {
        return this.generic_algebra('b7_d3', `Dạng 3: Tính toán, rút gọn biểu thức dạng`, count);
    },
    b7_d4: function(count=5) {
        return this.generic_algebra('b7_d4', `Dạng 4: Rút gọn các biểu thức chứa biến`, count);
    },
    b7_d5: function(count=5) {
        return this.generic_algebra('b7_d5', `Dạng 4: Bài toán so sánh, bài toán tìm`, count);
    },
    b7_d6: function(count=5) {
        return this.generic_algebra('b7_d6', `Dạng 5: Bài toán thực tế`, count);
    },
    b7_d7: function(count=5) {
        return this.generic_root('b7_d7', `Dạng 6: Tìm giá trị lớn nhất, nhỏ nhất có chứa căn`, count);
    },
    b8_d1: function(count=5) {
        return this.generic_root('b8_d1', `Dạng 1: Khai căn một tích`, count);
    },
    b8_d2: function(count=5) {
        return this.generic_root('b8_d2', `Dạng 2: Nhân các căn bậc hai`, count);
    },
    b8_d3: function(count=5) {
        return this.generic_root('b8_d3', `Dạng 3: Khai căn một thương`, count);
    },
    b8_d4: function(count=5) {
        return this.generic_root('b8_d4', `Dạng 4: Chia các căn bậc hai`, count);
    },
    b8_d5: function(count=5) {
        return this.generic_algebra('b8_d5', `Dạng 5: Rút gọn, tính giá trị của biểu thức`, count);
    },
    b8_d6: function(count=5) {
        return this.generic_algebra('b8_d6', `Dạng 6: Chứng minh bất đẳng thức`, count);
    },
    b8_d7: function(count=5) {
        return this.generic_algebra('b8_d7', `Dạng 7: Bài toán tìm`, count);
    },
    b8_d8: function(count=5) {
        return this.generic_algebra('b8_d8', `Dạng 8: Bài toán vận dụng`, count);
    },
    b9_d1: function(count=5) {
        return this.generic_root('b9_d1', `Dạng 1: Đưa thừa số ra ngoài dấu căn`, count);
    },
    b9_d2: function(count=5) {
        return this.generic_root('b9_d2', `Dạng 2: Đưa thừa số vào trong dấu căn`, count);
    },
    b9_d3: function(count=5) {
        return this.generic_root('b9_d3', `Dạng 3: Khử mẫu của biểu thức lấy căn`, count);
    },
    b9_d4: function(count=5) {
        return this.generic_root('b9_d4', `Dạng 4: Trục căn thức ở mẫu`, count);
    },
    b9_d5: function(count=5) {
        return this.generic_root('b9_d5', `Dạng 5: So sánh hai số chứa căn`, count);
    },
    b9_d6: function(count=5) {
        return this.generic_root('b9_d6', `Dạng 6: Rút gọn biểu thức chứa căn`, count);
    },
    b9_d7: function(count=5) {
        return this.generic_algebra('b9_d7', `Dạng 7: Chứng minh đẳng thức`, count);
    },
    b13_d1: function(count=5) {
        const q = [];
        let types = [];
        for(let i=0; i<count; i++) types.push(i % 3);
        types = this.shuffle(types);
        
        for(let i=0; i<count; i++) {
            if (types[i] === 0) {
                // Hình chữ nhật
                const text = `Cho hình chữ nhật ABCD có hai đường chéo AC và BD cắt nhau tại O. Khẳng định nào sau đây là **đúng** về đường tròn đi qua 4 điểm A, B, C, D?`;
                const ansStr = `Tâm của đường tròn là O, bán kính \\( R = \\frac{AC}{2} \\).`;
                const wrong1 = `Tâm của đường tròn là A, bán kính \\( R = AC \\).`;
                const wrong2 = `Tâm của đường tròn là O, bán kính \\( R = AB \\).`;
                const wrong3 = `Bốn điểm A, B, C, D không cùng nằm trên một đường tròn.`;
                const svgRect = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
    <circle cx="110" cy="70" r="89.44" fill="none" stroke="blue" stroke-width="1.5" stroke-dasharray="5,5" />
    <polygon points="30,30 190,30 190,110 30,110" fill="none" stroke="black" stroke-width="2" />
    <line x1="30" y1="30" x2="190" y2="110" stroke="black" stroke-width="1" />
    <line x1="30" y1="110" x2="190" y2="30" stroke="black" stroke-width="1" />
    <circle cx="30" cy="30" r="3" fill="red" />
    <text x="20" y="25" font-size="14" font-family="sans-serif">A</text>
    <circle cx="190" cy="30" r="3" fill="red" />
    <text x="195" y="25" font-size="14" font-family="sans-serif">B</text>
    <circle cx="190" cy="110" r="3" fill="red" />
    <text x="195" y="125" font-size="14" font-family="sans-serif">C</text>
    <circle cx="30" cy="110" r="3" fill="red" />
    <text x="20" y="125" font-size="14" font-family="sans-serif">D</text>
    <circle cx="110" cy="70" r="3" fill="red" />
    <text x="105" y="60" font-size="14" font-family="sans-serif">O</text>
  </svg>
</div>`;
                const exp = `Vì ABCD là hình chữ nhật nên hai đường chéo AC và BD bằng nhau và cắt nhau tại trung điểm O của mỗi đường.\n` + 
                            `Do đó, \\( OA = OB = OC = OD = \\frac{AC}{2} \\).\n` +
                            `Vậy bốn điểm A, B, C, D cùng cách đều điểm O, nên chúng cùng nằm trên đường tròn tâm O, bán kính \\( R = \\frac{AC}{2} \\).\n` + svgRect;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b13_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else if (types[i] === 1) {
                // Tam giác 2 đường cao
                const text = `Cho tam giác ABC (góc A nhọn), các đường cao BD và CE (D thuộc AC, E thuộc AB). Khẳng định nào sau đây là **đúng**?`;
                const ansStr = `Bốn điểm B, C, D, E cùng thuộc đường tròn đường kính BC.`;
                const wrong1 = `Bốn điểm B, C, D, E cùng thuộc đường tròn đường kính DE.`;
                const wrong2 = `Bốn điểm B, C, D, E cùng thuộc đường tròn đường kính AB.`;
                const wrong3 = `Bốn điểm B, C, D, E không cùng nằm trên một đường tròn.`;
                const svgTri = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="220" height="150" viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M 20 120 A 80 80 0 0 1 180 120" fill="none" stroke="blue" stroke-width="1.5" stroke-dasharray="5,5" />
    <path d="M 180 120 A 80 80 0 0 1 20 120" fill="none" stroke="blue" stroke-width="1.5" stroke-dasharray="5,5" />
    <polygon points="60,20 20,120 180,120" fill="none" stroke="black" stroke-width="2" />
    <line x1="20" y1="120" x2="85.6" y2="41.3" stroke="black" stroke-width="1" />
    <line x1="180" y1="120" x2="42.1" y2="64.8" stroke="black" stroke-width="1" />
    <circle cx="60" cy="20" r="3" fill="red" />
    <text x="55" y="15" font-size="14" font-family="sans-serif">A</text>
    <circle cx="20" cy="120" r="3" fill="red" />
    <text x="10" y="135" font-size="14" font-family="sans-serif">B</text>
    <circle cx="180" cy="120" r="3" fill="red" />
    <text x="185" y="135" font-size="14" font-family="sans-serif">C</text>
    <circle cx="85.6" cy="41.3" r="3" fill="red" />
    <text x="92" y="40" font-size="14" font-family="sans-serif">D</text>
    <circle cx="42.1" cy="64.8" r="3" fill="red" />
    <text x="25" y="65" font-size="14" font-family="sans-serif">E</text>
  </svg>
</div>`;
                const exp = `Vì BD là đường cao nên \\( \\widehat{BDC} = 90^\\circ \\). Do đó tam giác BDC vuông tại D, suy ra D thuộc đường tròn đường kính BC.\n` + 
                            `Vì CE là đường cao nên \\( \\widehat{BEC} = 90^\\circ \\). Do đó tam giác BEC vuông tại E, suy ra E thuộc đường tròn đường kính BC.\n` +
                            `Vậy bốn điểm B, C, D, E cùng nằm trên đường tròn đường kính BC (tâm là trung điểm của BC).\n` + svgTri;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b13_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                // Hình thoi
                const text = `Cho hình thoi ABCD có hai đường chéo AC và BD cắt nhau tại O. Gọi M, N, P, Q lần lượt là trung điểm của AB, BC, CD, DA. Bốn điểm M, N, P, Q cùng nằm trên đường tròn có tâm là điểm nào?`;
                const ansStr = `Tâm O (giao điểm của AC và BD).`;
                const wrong1 = `Tâm A.`;
                const wrong2 = `Tâm là trung điểm của AB.`;
                const wrong3 = `Bốn điểm M, N, P, Q không cùng nằm trên một đường tròn.`;
                const svgRhombus = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="220" height="150" viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
    <circle cx="110" cy="70" r="46.1" fill="none" stroke="blue" stroke-width="1.5" stroke-dasharray="5,5" />
    <polygon points="110,10 180,70 110,130 40,70" fill="none" stroke="black" stroke-width="2" />
    <line x1="110" y1="10" x2="110" y2="130" stroke="black" stroke-width="1" />
    <line x1="40" y1="70" x2="180" y2="70" stroke="black" stroke-width="1" />
    <circle cx="110" cy="10" r="3" fill="red" />
    <text x="105" y="8" font-size="14" font-family="sans-serif">A</text>
    <circle cx="180" cy="70" r="3" fill="red" />
    <text x="185" y="75" font-size="14" font-family="sans-serif">B</text>
    <circle cx="110" cy="130" r="3" fill="red" />
    <text x="105" y="145" font-size="14" font-family="sans-serif">C</text>
    <circle cx="40" cy="70" r="3" fill="red" />
    <text x="25" y="75" font-size="14" font-family="sans-serif">D</text>
    <circle cx="110" cy="70" r="3" fill="red" />
    <text x="115" y="65" font-size="14" font-family="sans-serif">O</text>
    <circle cx="145" cy="40" r="3" fill="green" />
    <text x="150" y="35" font-size="14" font-family="sans-serif">M</text>
    <circle cx="145" cy="100" r="3" fill="green" />
    <text x="150" y="115" font-size="14" font-family="sans-serif">N</text>
    <circle cx="75" cy="100" r="3" fill="green" />
    <text x="60" y="115" font-size="14" font-family="sans-serif">P</text>
    <circle cx="75" cy="40" r="3" fill="green" />
    <text x="60" y="35" font-size="14" font-family="sans-serif">Q</text>
  </svg>
</div>`;
                const exp = `Trong hình thoi ABCD, hai đường chéo AC và BD vuông góc với nhau tại O. Suy ra các tam giác OAB, OBC, OCD, ODA là các tam giác vuông tại O.\n` +
                            `M, N, P, Q là trung điểm các cạnh huyền nên các trung tuyến OM, ON, OP, OQ bằng nửa cạnh huyền tương ứng.\n` +
                            `Vì AB = BC = CD = DA (tính chất hình thoi) nên \\( OM = ON = OP = OQ \\).\n` +
                            `Vậy bốn điểm M, N, P, Q cùng cách đều điểm O, tức là cùng nằm trên đường tròn tâm O.\n` + svgRhombus;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b13_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b13_d2: function(count=5) {
        const q = [];
        let types = [];
        for(let i=0; i<count; i++) types.push(i % 2);
        types = this.shuffle(types);
        
        for(let i=0; i<count; i++) {
            if (types[i] === 0) {
                // Dùng d và R
                const R = Math.floor(Math.random()*5)+4; // 4 to 8
                let d = Math.floor(Math.random()*8)+2; // 2 to 9
                let pos = "";
                let exp_pos = "";
                if (d < R) { pos = "nằm bên trong"; exp_pos = `d < R (${d} < ${R})`; }
                else if (d === R) { pos = "nằm trên"; exp_pos = `d = R (${d} = ${R})`; }
                else { pos = "nằm bên ngoài"; exp_pos = `d > R (${d} > ${R})`; }
                
                const text = `Cho đường tròn (O; ${R} cm) và điểm A. Biết khoảng cách từ A đến tâm O là OA = ${d} cm. Vị trí tương đối của điểm A đối với đường tròn (O) là:`;
                const ansStr = `Điểm A ${pos} đường tròn (O).`;
                let wrong1, wrong2, wrong3;
                if (pos === "nằm bên trong") {
                    wrong1 = `Điểm A nằm trên đường tròn (O).`;
                    wrong2 = `Điểm A nằm bên ngoài đường tròn (O).`;
                } else if (pos === "nằm trên") {
                    wrong1 = `Điểm A nằm bên trong đường tròn (O).`;
                    wrong2 = `Điểm A nằm bên ngoài đường tròn (O).`;
                } else {
                    wrong1 = `Điểm A nằm bên trong đường tròn (O).`;
                    wrong2 = `Điểm A nằm trên đường tròn (O).`;
                }
                wrong3 = `Không thể xác định được.`;
                
                const exp = `Ta so sánh khoảng cách từ điểm đến tâm (d = OA) với bán kính R của đường tròn:\n` +
                            `Ở đây, d = ${d} cm, R = ${R} cm.\n` +
                            `Vì ${exp_pos} nên điểm A ${pos} đường tròn (O).` + `\n<div style="text-align: center; margin: 15px 0;">\n  <svg width="220" height="170" viewBox="0 0 220 170" xmlns="http://www.w3.org/2000/svg">\n    <circle cx="100" cy="85" r="${R*10}" fill="none" stroke="blue" stroke-width="1.5" />\n    <circle cx="100" cy="85" r="3" fill="red" />\n    <text x="95" y="75" font-size="14" font-family="sans-serif">O</text>\n    <line x1="100" y1="85" x2="100" y2="${85 - R*10}" stroke="green" stroke-dasharray="4" stroke-width="1.5" />\n    <text x="105" y="${85 - R*5}" font-size="14" font-family="sans-serif" fill="green">R</text>\n    <line x1="100" y1="85" x2="${100 + d*10}" y2="85" stroke="purple" stroke-width="2" />\n    <circle cx="${100 + d*10}" cy="85" r="4" fill="purple" />\n    <text x="${100 + d*10 - 5}" y="105" font-size="14" font-family="sans-serif" fill="purple">A</text>\n    <text x="${100 + d*5 - 5}" y="80" font-size="14" font-family="sans-serif" fill="purple">d</text>\n  </svg>\n</div>`;
                            
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b13_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                // Điểm M là trung điểm
                const l = (Math.floor(Math.random()*5)+2)*2; // 4, 6, 8, 10, 12
                const text = `Cho đoạn thẳng AB dài ${l} cm. Gọi I là trung điểm của đoạn thẳng AB. Khẳng định nào sau đây là **đúng** về vị trí của điểm I đối với đường tròn tâm A bán kính ${l/2} cm?`;
                const ansStr = `Điểm I nằm trên đường tròn.`;
                const wrong1 = `Điểm I nằm bên trong đường tròn.`;
                const wrong2 = `Điểm I nằm bên ngoài đường tròn.`;
                const wrong3 = `Điểm I trùng với tâm của đường tròn.`;
                
                const exp = `Vì I là trung điểm của AB nên khoảng cách từ A đến I là: \\( AI = \\frac{AB}{2} = \\frac{${l}}{2} = ${l/2} \\) (cm).\n` +
                            `Bán kính của đường tròn là R = ${l/2} cm.\n` +
                            `Ta thấy khoảng cách AI đúng bằng bán kính R (AI = R = ${l/2} cm).\n` +
                            `Vậy điểm I nằm trên đường tròn (A; ${l/2} cm).` + `\n<div style="text-align: center; margin: 15px 0;">\n  <svg width="220" height="150" viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">\n    <circle cx="50" cy="75" r="60" fill="none" stroke="blue" stroke-width="1.5" />\n    <line x1="50" y1="75" x2="170" y2="75" stroke="black" stroke-width="2" />\n    <circle cx="50" cy="75" r="3" fill="red" />\n    <text x="45" y="65" font-size="14" font-family="sans-serif">A</text>\n    <circle cx="170" cy="75" r="3" fill="red" />\n    <text x="165" y="65" font-size="14" font-family="sans-serif">B</text>\n    <circle cx="110" cy="75" r="4" fill="purple" />\n    <text x="105" y="65" font-size="14" font-family="sans-serif" fill="purple">I</text>\n  </svg>\n</div>`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b13_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b13_d3: function(count=5) {
        const q = [];
        let types = [];
        for(let i=0; i<count; i++) types.push(i % 3);
        types = this.shuffle(types);
        
        for(let i=0; i<count; i++) {
            if (types[i] === 0) {
                const text = `Khẳng định nào sau đây là **đúng** khi nói về tâm đối xứng và trục đối xứng của đường tròn?`;
                const ansStr = `Đường tròn có duy nhất một tâm đối xứng là tâm của nó và có vô số trục đối xứng.`;
                const wrong1 = `Đường tròn có vô số tâm đối xứng và có duy nhất một trục đối xứng.`;
                const wrong2 = `Đường tròn không có tâm đối xứng nhưng có vô số trục đối xứng.`;
                const wrong3 = `Đường tròn có duy nhất một tâm đối xứng và có duy nhất một trục đối xứng.`;
                
                const exp = `Theo tính chất đối xứng của đường tròn:\n` +
                            `- Đường tròn có tâm đối xứng, và tâm đối xứng duy nhất chính là tâm của đường tròn đó.\n` +
                            `- Mỗi đường thẳng đi qua tâm đều chia đường tròn thành 2 phần bằng nhau và chồng khít lên nhau, do đó đường tròn có vô số trục đối xứng.` + `\n<div style="text-align: center; margin: 15px 0;">\n  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">\n    <circle cx="100" cy="100" r="70" fill="none" stroke="blue" stroke-width="1.5" />\n    <circle cx="100" cy="100" r="3" fill="red" />\n    <text x="105" y="95" font-size="14" font-family="sans-serif">O</text>\n    <line x1="20" y1="100" x2="180" y2="100" stroke="green" stroke-dasharray="4" stroke-width="1" />\n    <line x1="100" y1="20" x2="100" y2="180" stroke="green" stroke-dasharray="4" stroke-width="1" />\n    <line x1="43" y1="43" x2="157" y2="157" stroke="green" stroke-dasharray="4" stroke-width="1" />\n    <line x1="43" y1="157" x2="157" y2="43" stroke="green" stroke-dasharray="4" stroke-width="1" />\n  </svg>\n</div>`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b13_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else if (types[i] === 1) {
                const text = `Đường thẳng nào dưới đây là trục đối xứng của đường tròn (O; R)?`;
                const ansStr = `Đường thẳng d đi qua tâm O của đường tròn.`;
                const wrong1 = `Đường thẳng d tiếp xúc với đường tròn.`;
                const wrong2 = `Đường thẳng d cắt đường tròn nhưng không đi qua tâm O.`;
                const wrong3 = `Đường thẳng d nằm hoàn toàn ngoài đường tròn.`;
                
                const exp = `Hình tròn / Đường tròn có trục đối xứng là bất kỳ đường thẳng nào đi qua tâm O của nó.\n` +
                            `Chỉ có đường thẳng đi qua tâm mới là trục đối xứng của đường tròn.` + `\n<div style="text-align: center; margin: 15px 0;">\n  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">\n    <circle cx="100" cy="100" r="70" fill="none" stroke="blue" stroke-width="1.5" />\n    <circle cx="100" cy="100" r="3" fill="red" />\n    <text x="105" y="95" font-size="14" font-family="sans-serif">O</text>\n    <line x1="20" y1="120" x2="180" y2="80" stroke="red" stroke-width="2" />\n    <text x="185" y="85" font-size="14" font-family="sans-serif" fill="red">d</text>\n  </svg>\n</div>`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b13_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const text = `Cho đường tròn (O) và điểm M thuộc (O). Điểm M' đối xứng với M qua tâm O. Khẳng định nào sau đây là **đúng**?`;
                const ansStr = `Điểm M' cũng thuộc đường tròn (O) và đoạn thẳng MM' là một đường kính của (O).`;
                const wrong1 = `Điểm M' nằm bên trong đường tròn (O).`;
                const wrong2 = `Điểm M' nằm bên ngoài đường tròn (O).`;
                const wrong3 = `M và M' tạo thành một dây cung nhưng không đi qua tâm.`;
                
                const exp = `Vì M thuộc (O) nên khoảng cách OM = R.\n` +
                            `Vì M' đối xứng với M qua tâm O nên O là trung điểm của MM'. Suy ra OM' = OM = R.\n` +
                            `Do đó M' cũng thuộc đường tròn (O).\n` +
                            `Hơn nữa, 3 điểm M, O, M' thẳng hàng (do tính đối xứng qua điểm O), nên MM' là dây cung đi qua tâm, tức là đường kính của (O).` + `\n<div style="text-align: center; margin: 15px 0;">\n  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">\n    <circle cx="100" cy="100" r="70" fill="none" stroke="blue" stroke-width="1.5" />\n    <line x1="30" y1="100" x2="170" y2="100" stroke="black" stroke-width="1.5" />\n    <circle cx="100" cy="100" r="3" fill="red" />\n    <text x="95" y="90" font-size="14" font-family="sans-serif">O</text>\n    <circle cx="170" cy="100" r="4" fill="purple" />\n    <text x="175" y="95" font-size="14" font-family="sans-serif" fill="purple">M</text>\n    <circle cx="30" cy="100" r="4" fill="purple" />\n    <text x="15" y="95" font-size="14" font-family="sans-serif" fill="purple">M'</text>\n  </svg>\n</div>`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b13_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },

    b14_d1: function(count=5) {
        const q = [];
        let types = [];
        for(let i=0; i<count; i++) types.push(i % 3);
        types = this.shuffle(types);
        
        for(let i=0; i<count; i++) {
            if (types[i] === 0) {
                // So sánh dây -> cung
                const ab = Math.floor(Math.random()*3)+3; // 3 to 5
                const cd = Math.floor(Math.random()*4)+6; // 6 to 9
                const text = `Cho đường tròn (O) và hai dây cung AB, CD (không đi qua tâm). Biết $AB = ${ab}\\text{ cm}$ và $CD = ${cd}\\text{ cm}$. Khẳng định nào sau đây là **đúng** về số đo hai cung nhỏ AB và CD?`;
                const ansStr = `Số đo cung nhỏ AB bé hơn số đo cung nhỏ CD.`;
                const wrong1 = `Số đo cung nhỏ AB lớn hơn số đo cung nhỏ CD.`;
                const wrong2 = `Số đo cung nhỏ AB bằng số đo cung nhỏ CD.`;
                const wrong3 = `Không thể so sánh được vì không biết bán kính.`;
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="blue" stroke-width="1.5" />
    <circle cx="100" cy="100" r="3" fill="red" />
    <text x="95" y="95" font-size="14" font-family="sans-serif">O</text>
    <!-- Chord AB (small) -->
    <line x1="25" y1="70" x2="60" y2="30" stroke="green" stroke-width="2" />
    <text x="15" y="80" font-size="14" font-family="sans-serif">A</text>
    <text x="60" y="25" font-size="14" font-family="sans-serif">B</text>
    <!-- Chord CD (large) -->
    <line x1="160" y1="150" x2="160" y2="50" stroke="purple" stroke-width="2" />
    <text x="165" y="155" font-size="14" font-family="sans-serif">C</text>
    <text x="165" y="45" font-size="14" font-family="sans-serif">D</text>
  </svg>
</div>`;
                const exp = `Theo định lý liên hệ giữa cung và dây trong cùng một đường tròn: Dây lớn hơn thì căng cung lớn hơn.\n` +
                            `Vì $AB = ${ab} < CD = ${cd}$ nên cung nhỏ AB nhỏ hơn cung nhỏ CD.\n` + svgCode;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b14_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else if (types[i] === 1) {
                // So sánh góc ở tâm -> dây
                const g1 = (Math.floor(Math.random()*4)+3)*10; // 30 to 60
                const g2 = (Math.floor(Math.random()*5)+7)*10; // 70 to 110
                const text = `Cho đường tròn (O), hai góc ở tâm $\\widehat{AOB} = ${g1}^\\circ$ và $\\widehat{COD} = ${g2}^\\circ$. Hãy so sánh độ dài hai dây cung AB và CD.`;
                const ansStr = `$AB < CD$`;
                const wrong1 = `$AB > CD$`;
                const wrong2 = `$AB = CD$`;
                const wrong3 = `Không thể so sánh được vì các dây có thể cắt nhau.`;
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="blue" stroke-width="1.5" />
    <circle cx="100" cy="100" r="3" fill="red" />
    <text x="105" y="115" font-size="14" font-family="sans-serif">O</text>
    <!-- AB Sector -->
    <path d="M 100 100 L 100 20 A 80 80 0 0 1 156.5 43.4 Z" fill="rgba(0,255,0,0.2)" stroke="none" />
    <line x1="100" y1="100" x2="100" y2="20" stroke="black" />
    <line x1="100" y1="100" x2="156.5" y2="43.4" stroke="black" />
    <line x1="100" y1="20" x2="156.5" y2="43.4" stroke="green" stroke-width="2" />
    <text x="95" y="15" font-size="14" font-family="sans-serif">A</text>
    <text x="165" y="45" font-size="14" font-family="sans-serif">B</text>
    
    <!-- CD Sector -->
    <path d="M 100 100 L 20 100 A 80 80 0 0 0 100 180 Z" fill="rgba(128,0,128,0.2)" stroke="none" />
    <line x1="100" y1="100" x2="20" y2="100" stroke="black" />
    <line x1="100" y1="100" x2="100" y2="180" stroke="black" />
    <line x1="20" y1="100" x2="100" y2="180" stroke="purple" stroke-width="2" />
    <text x="10" y="105" font-size="14" font-family="sans-serif">C</text>
    <text x="95" y="195" font-size="14" font-family="sans-serif">D</text>
  </svg>
</div>`;
                const exp = `Số đo góc ở tâm bằng số đo cung bị chắn. Ta có $\\text{sđ}\\overparen{AB} = ${g1}^\\circ$ và $\\text{sđ}\\overparen{CD} = ${g2}^\\circ$.\n` +
                            `Vì $${g1}^\\circ < ${g2}^\\circ$ nên cung nhỏ AB nhỏ hơn cung nhỏ CD.\n` +
                            `Trong một đường tròn, cung nhỏ hơn thì căng dây nhỏ hơn, do đó $AB < CD$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b14_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                // Khoảng cách
                const text = `Cho đường tròn (O), OH và OK lần lượt là khoảng cách từ tâm O đến hai dây AB và CD. Biết rằng $OH < OK$, khẳng định nào sau đây là **đúng**?`;
                const ansStr = `$AB > CD$`;
                const wrong1 = `$AB < CD$`;
                const wrong2 = `$AB = CD$`;
                const wrong3 = `Hai dây AB và CD song song với nhau.`;
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="blue" stroke-width="1.5" />
    <circle cx="100" cy="100" r="3" fill="red" />
    <text x="105" y="115" font-size="14" font-family="sans-serif">O</text>
    
    <!-- Dây AB gần tâm -->
    <line x1="25" y1="70" x2="175" y2="70" stroke="green" stroke-width="2" />
    <text x="15" y="75" font-size="14" font-family="sans-serif">A</text>
    <text x="180" y="75" font-size="14" font-family="sans-serif">B</text>
    <line x1="100" y1="100" x2="100" y2="70" stroke="black" stroke-dasharray="4" />
    <circle cx="100" cy="70" r="2" fill="black" />
    <text x="105" y="65" font-size="14" font-family="sans-serif">H</text>
    
    <!-- Dây CD xa tâm -->
    <line x1="160" y1="150" x2="160" y2="50" stroke="purple" stroke-width="2" />
    <text x="165" y="160" font-size="14" font-family="sans-serif">C</text>
    <text x="165" y="45" font-size="14" font-family="sans-serif">D</text>
    <line x1="100" y1="100" x2="160" y2="100" stroke="black" stroke-dasharray="4" />
    <circle cx="160" cy="100" r="2" fill="black" />
    <text x="165" y="115" font-size="14" font-family="sans-serif">K</text>
  </svg>
</div>`;
                const exp = `Theo định lý về khoảng cách từ tâm đến dây trong cùng một đường tròn: Dây nào gần tâm hơn thì dây đó lớn hơn.\n` +
                            `Vì $OH < OK$ (khoảng cách đến dây AB nhỏ hơn) nên dây AB gần tâm O hơn dây CD.\n` +
                            `Do đó $AB > CD$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b14_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b14_d2: function(count=5) {
        const q = [];
        let types = [];
        for(let i=0; i<count; i++) types.push(i % 2);
        types = this.shuffle(types);
        
        for(let i=0; i<count; i++) {
            if (types[i] === 0) {
                // Kim đồng hồ
                const t1 = Math.floor(Math.random()*4)+1; // 1 to 4
                const t2 = t1 + Math.floor(Math.random()*4)+2; // t1+2 to t1+5, max 9
                
                const text = `Kim giờ của đồng hồ quay được một góc ở tâm bằng bao nhiêu độ từ ${t1} giờ đến ${t2} giờ cùng ngày?`;
                const ansStr = `$${(t2-t1)*30}^\\circ$`;
                const wrong1 = `$${(t2-t1+1)*30}^\\circ$`;
                const wrong2 = `$${(t2-t1)*15}^\\circ$`;
                const wrong3 = `$${(t2-t1)*60}^\\circ$`;
                
                // SVG for clock
                let clockLines = "";
                for(let h=1; h<=12; h++) {
                    const ang = (h * 30 - 90) * Math.PI / 180;
                    const x1 = 100 + 70 * Math.cos(ang);
                    const y1 = 100 + 70 * Math.sin(ang);
                    const x2 = 100 + 80 * Math.cos(ang);
                    const y2 = 100 + 80 * Math.sin(ang);
                    clockLines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" />\n`;
                    const tx = 100 + 60 * Math.cos(ang) - 5;
                    const ty = 100 + 60 * Math.sin(ang) + 5;
                    clockLines += `<text x="${tx}" y="${ty}" font-size="12" font-family="sans-serif">${h}</text>\n`;
                }
                const a1 = (t1 * 30 - 90) * Math.PI / 180;
                const h1x = 100 + 40 * Math.cos(a1);
                const h1y = 100 + 40 * Math.sin(a1);
                const a2 = (t2 * 30 - 90) * Math.PI / 180;
                const h2x = 100 + 40 * Math.cos(a2);
                const h2y = 100 + 40 * Math.sin(a2);
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="blue" stroke-width="2" />
    ${clockLines}
    <!-- Hands -->
    <line x1="100" y1="100" x2="${h1x}" y2="${h1y}" stroke="red" stroke-width="3" stroke-dasharray="2" />
    <line x1="100" y1="100" x2="${h2x}" y2="${h2y}" stroke="red" stroke-width="3" />
    <circle cx="100" cy="100" r="4" fill="black" />
  </svg>
</div>`;
                const exp = `Mặt đồng hồ được chia thành 12 khoảng bằng nhau, mỗi khoảng (1 giờ) tương ứng với góc ở tâm là: $\\frac{360^\\circ}{12} = 30^\\circ$.\n` +
                            `Từ ${t1} giờ đến ${t2} giờ là khoảng thời gian ${t2-t1} giờ.\n` +
                            `Do đó, kim giờ quay được góc ở tâm là: $${t2-t1} \\times 30^\\circ = ${(t2-t1)*30}^\\circ$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b14_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                // Cung lớn cung nhỏ
                const ang = (Math.floor(Math.random()*9)+4)*10; // 40 to 120
                const text = `Cho đường tròn (O), có góc ở tâm $\\widehat{AOB} = ${ang}^\\circ$. Tính số đo cung nhỏ $\\overparen{AB}$ và cung lớn $\\overparen{AB}$.`;
                const ansStr = `Cung nhỏ $= ${ang}^\\circ$, cung lớn $= ${360-ang}^\\circ$`;
                const wrong1 = `Cung nhỏ $= ${ang/2}^\\circ$, cung lớn $= ${360-ang/2}^\\circ$`;
                const wrong2 = `Cung nhỏ $= ${ang}^\\circ$, cung lớn $= ${180-ang}^\\circ$`;
                const wrong3 = `Cung nhỏ $= ${ang*2}^\\circ$, cung lớn $= ${360-ang*2}^\\circ$`;
                
                const radStart = -90 * Math.PI / 180;
                const radEnd = (ang - 90) * Math.PI / 180;
                const x2 = 100 + 80 * Math.cos(radEnd);
                const y2 = 100 + 80 * Math.sin(radEnd);
                const isLarge = ang > 180 ? 1 : 0;
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1.5" />
    <path d="M 100 20 A 80 80 0 ${isLarge} 1 ${x2} ${y2}" fill="none" stroke="red" stroke-width="3" />
    <path d="M ${x2} ${y2} A 80 80 0 ${1-isLarge} 1 100 20" fill="none" stroke="blue" stroke-width="3" stroke-dasharray="5,5" />
    
    <line x1="100" y1="100" x2="100" y2="20" stroke="black" />
    <line x1="100" y1="100" x2="${x2}" y2="${y2}" stroke="black" />
    
    <text x="95" y="15" font-size="14" font-family="sans-serif">A</text>
    <text x="${x2 + 5}" y="${y2 + 10}" font-size="14" font-family="sans-serif">B</text>
    <circle cx="100" cy="100" r="3" fill="red" />
    <text x="105" y="110" font-size="14" font-family="sans-serif">O</text>
  </svg>
</div>`;
                const exp = `Số đo của cung nhỏ bằng chính số đo của góc ở tâm chắn cung đó.\n` +
                            `Nên $\\text{sđ}\\overparen{AB}\\text{(nhỏ)} = \\widehat{AOB} = ${ang}^\\circ$.\n` +
                            `Số đo của cung lớn bằng $360^\\circ$ trừ đi số đo cung nhỏ.\n` +
                            `Nên $\\text{sđ}\\overparen{AB}\\text{(lớn)} = 360^\\circ - ${ang}^\\circ = ${360-ang}^\\circ$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b14_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b14_d3: function(count=5) {
        const q = [];
        const triples = [
            { a: 3, b: 4, c: 5 },
            { a: 6, b: 8, c: 10 },
            { a: 5, b: 12, c: 13 },
            { a: 8, b: 15, c: 17 }
        ];
        
        for(let i=0; i<count; i++) {
            const tr = triples[Math.floor(Math.random()*triples.length)];
            const isFindDist = Math.random() > 0.5;
            
            if (isFindDist) {
                // Cho R, dây AB, tìm d
                const R = tr.c;
                const AB = tr.b * 2;
                const d = tr.a;
                
                const text = `Cho đường tròn tâm O bán kính $R = ${R}\\text{ cm}$ và một dây cung $AB = ${AB}\\text{ cm}$. Tính khoảng cách từ tâm O đến dây AB.`;
                const ansStr = `$${d}\\text{ cm}$`;
                const wrong1 = `$${tr.b}\\text{ cm}$`;
                const wrong2 = `$${Math.abs(R - AB/2)}\\text{ cm}$`;
                const wrong3 = `$${d+1}\\text{ cm}$`;
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="blue" stroke-width="1.5" />
    <circle cx="100" cy="100" r="3" fill="red" />
    <text x="95" y="95" font-size="14" font-family="sans-serif">O</text>
    
    <line x1="40" y1="140" x2="160" y2="140" stroke="black" stroke-width="2" />
    <text x="30" y="150" font-size="14" font-family="sans-serif">A</text>
    <text x="165" y="150" font-size="14" font-family="sans-serif">B</text>
    
    <line x1="100" y1="100" x2="100" y2="140" stroke="green" stroke-width="2" />
    <circle cx="100" cy="140" r="3" fill="red" />
    <text x="105" y="155" font-size="14" font-family="sans-serif">H</text>
    
    <line x1="100" y1="100" x2="40" y2="140" stroke="red" stroke-dasharray="4" />
  </svg>
</div>`;
                const exp = `Kẻ $OH \\perp AB$ tại H. Theo tính chất đường kính và dây cung, H là trung điểm của AB.\n` +
                            `Nên $AH = \\frac{AB}{2} = \\frac{${AB}}{2} = ${tr.b}\\text{ cm}$.\n` +
                            `Áp dụng định lý Pythagore trong tam giác vuông OHA (vuông tại H):\n` +
                            `$OH^2 + AH^2 = OA^2 \\implies OH^2 = OA^2 - AH^2 = ${R}^2 - ${tr.b}^2 = ${d*d}$.\n` +
                            `Vậy khoảng cách $OH = \\sqrt{${d*d}} = ${d}\\text{ cm}$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b14_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                // Cho R, d, tìm AB
                const R = tr.c;
                const d = tr.a;
                const AB = tr.b * 2;
                
                const text = `Cho đường tròn (O; ${R} cm). Lấy một điểm M tùy ý thuộc (O). Vẽ dây AB vuông góc với OM tại H sao cho khoảng cách $OH = ${d}\\text{ cm}$. Tính độ dài dây cung AB.`;
                const ansStr = `$${AB}\\text{ cm}$`;
                const wrong1 = `$${tr.b}\\text{ cm}$`;
                const wrong2 = `$${AB/2}\\text{ cm}$`;
                const wrong3 = `$${d+R}\\text{ cm}$`;
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="blue" stroke-width="1.5" />
    <circle cx="100" cy="100" r="3" fill="red" />
    <text x="95" y="95" font-size="14" font-family="sans-serif">O</text>
    
    <line x1="40" y1="140" x2="160" y2="140" stroke="black" stroke-width="2" />
    <text x="30" y="150" font-size="14" font-family="sans-serif">A</text>
    <text x="165" y="150" font-size="14" font-family="sans-serif">B</text>
    
    <line x1="100" y1="100" x2="100" y2="180" stroke="black" />
    <circle cx="100" cy="180" r="3" fill="black" />
    <text x="105" y="195" font-size="14" font-family="sans-serif">M</text>
    
    <circle cx="100" cy="140" r="3" fill="red" />
    <text x="105" y="135" font-size="14" font-family="sans-serif">H</text>
    
    <line x1="100" y1="100" x2="40" y2="140" stroke="red" stroke-dasharray="4" />
  </svg>
</div>`;
                const exp = `Vì $OH \\perp AB$ tại H nên H là trung điểm của AB (tính chất đường kính và dây cung).\n` +
                            `Trong tam giác vuông OHA (vuông tại H), ta có $OA = R = ${R}$, $OH = ${d}$.\n` +
                            `Áp dụng Pythagore: $AH^2 = OA^2 - OH^2 = ${R}^2 - ${d}^2 = ${tr.b * tr.b}$.\n` +
                            `Suy ra $AH = ${tr.b}\\text{ cm}$.\n` +
                            `Vậy dây cung $AB = 2 \\times AH = 2 \\times ${tr.b} = ${AB}\\text{ cm}$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b14_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },

    b15_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const isArc = Math.random() > 0.5;
            const R = Math.floor(Math.random()*8)+2;
            if (!isArc) {
                const text = `Tính độ dài đường tròn (chu vi) có bán kính $R = ${R}\\text{ cm}$.`;
                const ansStr = `$C = ${2*R}\\pi\\text{ cm}$`;
                const wrong1 = `$C = ${R}\\pi\\text{ cm}$`;
                const wrong2 = `$C = ${R*R}\\pi\\text{ cm}$`;
                const wrong3 = `$C = ${2*R}\\text{ cm}$`;
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="blue" stroke-width="2.5" />
    <circle cx="100" cy="100" r="3" fill="red" />
    <line x1="100" y1="100" x2="180" y2="100" stroke="green" stroke-width="2" />
    <text x="135" y="95" font-size="14" font-family="sans-serif">R = ${R}</text>
  </svg>
</div>`;
                const exp = `Công thức tính chu vi đường tròn là $C = 2\\pi R$.\n` +
                            `Thay $R = ${R}$ vào, ta được $C = 2 \\times ${R} \\times \\pi = ${2*R}\\pi\\text{ cm}$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b15_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const ang = (Math.floor(Math.random()*12)+3)*10;
                const text = `Tính độ dài cung tròn $n = ${ang}^\\circ$ của đường tròn bán kính $R = ${R}\\text{ cm}$.`;
                const l = (Math.PI * R * ang / 180).toFixed(2);
                
                const num = R * ang;
                const den = 180;
                const gcd = function(a, b) { return b === 0 ? a : gcd(b, a % b); };
                const g = gcd(num, den);
                const n1 = num/g, d1 = den/g;
                const piStr = (d1 === 1) ? (n1 === 1 ? "\\pi" : `${n1}\\pi`) : `\\frac{${n1}\\pi}{${d1}}`;
                
                const ansStr = `$l = ${piStr}\\text{ cm} \\approx ${l}\\text{ cm}$`;
                const wrong1 = `$l = \\frac{${n1+1}\\pi}{${d1}}\\text{ cm}$`;
                const wrong2 = `$l = ${(R*ang*2/180).toFixed(2)}\\pi\\text{ cm}$`;
                const wrong3 = `$l = ${(R*R*ang/360).toFixed(2)}\\pi\\text{ cm}$`;
                
                const rad = ang * Math.PI / 180;
                const x2 = 100 + 80 * Math.cos(-rad);
                const y2 = 100 + 80 * Math.sin(-rad);
                const isLarge = ang > 180 ? 1 : 0;
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1.5" />
    <path d="M 180 100 A 80 80 0 ${isLarge} 0 ${x2} ${y2}" fill="none" stroke="red" stroke-width="3" />
    <line x1="100" y1="100" x2="180" y2="100" stroke="black" />
    <line x1="100" y1="100" x2="${x2}" y2="${y2}" stroke="black" />
    <text x="140" y="90" font-size="12" font-family="sans-serif">${ang}&deg;</text>
  </svg>
</div>`;
                const exp = `Công thức tính độ dài cung tròn là $l = \\frac{\\pi R n}{180}$.\n` +
                            `Thay $R = ${R}, n = ${ang}$ vào công thức:\n` +
                            `$l = \\frac{\\pi \\cdot ${R} \\cdot ${ang}}{180} = ${piStr}\\text{ cm} \\approx ${l}\\text{ cm}$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b15_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b15_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const isQuat = Math.random() > 0.5;
            const R = Math.floor(Math.random()*8)+2;
            if (!isQuat) {
                const text = `Tính diện tích hình tròn có bán kính $R = ${R}\\text{ cm}$.`;
                const ansStr = `$S = ${R*R}\\pi\\text{ cm}^2$`;
                const wrong1 = `$S = ${2*R}\\pi\\text{ cm}^2$`;
                const wrong2 = `$S = ${R}\\pi\\text{ cm}^2$`;
                const wrong3 = `$S = ${R*R}\\text{ cm}^2$`;
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="rgba(0,0,255,0.2)" stroke="blue" stroke-width="2" />
    <circle cx="100" cy="100" r="3" fill="red" />
    <line x1="100" y1="100" x2="180" y2="100" stroke="black" stroke-width="2" />
    <text x="135" y="95" font-size="14" font-family="sans-serif">R = ${R}</text>
  </svg>
</div>`;
                const exp = `Công thức tính diện tích hình tròn là $S = \\pi R^2$.\n` +
                            `Thay $R = ${R}$ vào, ta được $S = \\pi \\cdot ${R}^2 = ${R*R}\\pi\\text{ cm}^2$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b15_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const ang = (Math.floor(Math.random()*12)+3)*10;
                const text = `Tính diện tích hình quạt tròn bán kính $R = ${R}\\text{ cm}$ và có số đo cung là $n = ${ang}^\\circ$.`;
                
                const num = R * R * ang;
                const den = 360;
                const gcd = function(a, b) { return b === 0 ? a : gcd(b, a % b); };
                const g = gcd(num, den);
                const n1 = num/g, d1 = den/g;
                const piStr = (d1 === 1) ? (n1 === 1 ? "\\pi" : `${n1}\\pi`) : `\\frac{${n1}\\pi}{${d1}}`;
                
                const ansStr = `$S = ${piStr}\\text{ cm}^2$`;
                const wrong1 = `$S = \\frac{${n1+1}\\pi}{${d1}}\\text{ cm}^2$`;
                const wrong2 = `$S = \\frac{${n1}\\pi}{${d1+2}}\\text{ cm}^2$`;
                const wrong3 = `$S = ${(R*ang/180).toFixed(2)}\\pi\\text{ cm}^2$`;
                
                const rad = ang * Math.PI / 180;
                const x2 = 100 + 80 * Math.cos(-rad);
                const y2 = 100 + 80 * Math.sin(-rad);
                const isLarge = ang > 180 ? 1 : 0;
                
                const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1.5" />
    <path d="M 100 100 L 180 100 A 80 80 0 ${isLarge} 0 ${x2} ${y2} Z" fill="rgba(255,165,0,0.4)" stroke="orange" stroke-width="2" />
    <text x="140" y="90" font-size="12" font-family="sans-serif">${ang}&deg;</text>
  </svg>
</div>`;
                const exp = `Công thức tính diện tích hình quạt tròn là $S = \\frac{\\pi R^2 n}{360}$.\n` +
                            `Thay $R = ${R}, n = ${ang}$ vào, ta được:\n` +
                            `$S = \\frac{\\pi \\cdot ${R}^2 \\cdot ${ang}}{360} = ${piStr}\\text{ cm}^2$.\n` + svgCode;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b15_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b15_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const r = Math.floor(Math.random()*4)+2; // 2 to 5
            const R = r + Math.floor(Math.random()*4)+2; // r+2 to r+5
            const text = `Tính diện tích hình vành khăn giới hạn bởi hai đường tròn đồng tâm có bán kính $R = ${R}\\text{ cm}$ và $r = ${r}\\text{ cm}$.`;
            const S = (R*R - r*r);
            const ansStr = `$S = ${S}\\pi\\text{ cm}^2$`;
            const wrong1 = `$S = ${S*2}\\pi\\text{ cm}^2$`;
            const wrong2 = `$S = ${(R-r)*(R-r)}\\pi\\text{ cm}^2$`;
            const wrong3 = `$S = ${R*R + r*r}\\pi\\text{ cm}^2$`;
            
            const rSvg = Math.round((r/R) * 80);
            const svgCode = `
<div style="text-align: center; margin: 15px 0;">
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="rgba(0,128,0,0.3)" />
    <circle cx="100" cy="100" r="${rSvg}" fill="white" stroke="black" />
    <circle cx="100" cy="100" r="80" fill="none" stroke="black" />
    <circle cx="100" cy="100" r="3" fill="red" />
    <line x1="100" y1="100" x2="180" y2="100" stroke="black" />
    <text x="145" y="95" font-size="12" font-family="sans-serif">R</text>
    <line x1="100" y1="100" x2="${100 - rSvg}" y2="100" stroke="black" />
    <text x="${100 - rSvg/2}" y="95" font-size="12" font-family="sans-serif">r</text>
  </svg>
</div>`;
            const exp = `Diện tích hình vành khăn bằng diện tích hình tròn lớn trừ đi diện tích hình tròn nhỏ.\n` +
                        `Công thức: $S = \\pi R^2 - \\pi r^2 = \\pi(R^2 - r^2)$.\n` +
                        `Thay $R = ${R}, r = ${r}$ vào, ta được: $S = \\pi(${R}^2 - ${r}^2) = \\pi(${R*R} - ${r*r}) = ${S}\\pi\\text{ cm}^2$.\n` + svgCode;
            const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
            q.push({ id: 'b15_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b16_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const R = Math.floor(Math.random()*5)+4; // 4 to 8
            const type = Math.floor(Math.random()*3); // 0: d<R, 1: d=R, 2: d>R
            let d = R;
            let ansStr, wrong1, wrong2, state, svgCode;
            if (type === 0) {
                d = R - Math.floor(Math.random()*2) - 1; // 1 to 3 less
                ansStr = `Đường thẳng cắt đường tròn (tại 2 điểm phân biệt)`;
                wrong1 = `Đường thẳng tiếp xúc với đường tròn (tại 1 điểm)`;
                wrong2 = `Đường thẳng và đường tròn không giao nhau`;
                state = "cắt";
                const chordHalf = Math.sqrt(R*R - d*d);
                svgCode = `<svg width="200" height="200"><circle cx="100" cy="100" r="80" fill="none" stroke="blue" /><circle cx="100" cy="100" r="3" fill="red" /><line x1="20" y1="${100 + d*10}" x2="180" y2="${100 + d*10}" stroke="black" stroke-width="2" /><line x1="100" y1="100" x2="100" y2="${100 + d*10}" stroke="green" stroke-dasharray="4" /><text x="105" y="${100 + d*5}">d = ${d}</text></svg>`;
            } else if (type === 1) {
                ansStr = `Đường thẳng tiếp xúc với đường tròn (tại 1 điểm)`;
                wrong1 = `Đường thẳng cắt đường tròn (tại 2 điểm phân biệt)`;
                wrong2 = `Đường thẳng và đường tròn không giao nhau`;
                state = "tiếp xúc";
                svgCode = `<svg width="200" height="200"><circle cx="100" cy="100" r="80" fill="none" stroke="blue" /><circle cx="100" cy="100" r="3" fill="red" /><line x1="20" y1="180" x2="180" y2="180" stroke="black" stroke-width="2" /><line x1="100" y1="100" x2="100" y2="180" stroke="green" stroke-dasharray="4" /><text x="105" y="140">d = R = ${R}</text></svg>`;
            } else {
                d = R + Math.floor(Math.random()*3) + 1;
                ansStr = `Đường thẳng và đường tròn không giao nhau`;
                wrong1 = `Đường thẳng cắt đường tròn (tại 2 điểm phân biệt)`;
                wrong2 = `Đường thẳng tiếp xúc với đường tròn (tại 1 điểm)`;
                state = "không giao nhau";
                svgCode = `<svg width="200" height="200"><circle cx="100" cy="100" r="60" fill="none" stroke="blue" /><circle cx="100" cy="100" r="3" fill="red" /><line x1="20" y1="${100 + d*8}" x2="180" y2="${100 + d*8}" stroke="black" stroke-width="2" /><line x1="100" y1="100" x2="100" y2="${100 + d*8}" stroke="green" stroke-dasharray="4" /><text x="105" y="${100 + d*4}">d = ${d}</text></svg>`;
            }
            
            const text = `Cho đường tròn (O) có bán kính $R = ${R}\\text{ cm}$. Gọi $d$ là khoảng cách từ tâm O đến đường thẳng $a$. Biết $d = ${d}\\text{ cm}$. Hỏi vị trí tương đối của đường thẳng $a$ và đường tròn (O) là gì?`;
            const exp = `Ta so sánh khoảng cách $d$ và bán kính $R$:\n` +
                        `$d = ${d}, R = ${R} \\implies d ${type===0 ? "<" : (type===1 ? "=" : ">")} R$.\n` +
                        `Vậy đường thẳng ${state} đường tròn.\n` +
                        `<div style="text-align: center; margin: 15px 0;">${svgCode}</div>`;
            
            const opts = this.shuffle([ansStr, wrong1, wrong2]);
            q.push({ id: 'b16_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b17_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const R = Math.floor(Math.random()*3)+6; // 6 to 8
            const r = Math.floor(Math.random()*3)+2; // 2 to 4
            const type = Math.floor(Math.random()*5); // 0: cắt, 1: tx ngoài, 2: ngoài nhau, 3: tx trong, 4: đựng nhau
            let d = 0;
            let ansStr, wrong1, wrong2, wrong3;
            
            if (type === 0) { // Cắt nhau: R-r < d < R+r
                d = R;
                ansStr = "Cắt nhau"; wrong1 = "Tiếp xúc ngoài"; wrong2 = "Ngoài nhau"; wrong3 = "Tiếp xúc trong";
            } else if (type === 1) { // Tiếp xúc ngoài: d = R+r
                d = R + r;
                ansStr = "Tiếp xúc ngoài"; wrong1 = "Cắt nhau"; wrong2 = "Ngoài nhau"; wrong3 = "Tiếp xúc trong";
            } else if (type === 2) { // Ngoài nhau: d > R+r
                d = R + r + 2;
                ansStr = "Ngoài nhau"; wrong1 = "Cắt nhau"; wrong2 = "Tiếp xúc ngoài"; wrong3 = "Đựng nhau";
            } else if (type === 3) { // Tiếp xúc trong: d = R-r
                d = R - r;
                ansStr = "Tiếp xúc trong"; wrong1 = "Cắt nhau"; wrong2 = "Tiếp xúc ngoài"; wrong3 = "Đựng nhau";
            } else { // Đựng nhau: d < R-r
                d = R - r - 1;
                ansStr = "Đựng nhau"; wrong1 = "Tiếp xúc trong"; wrong2 = "Cắt nhau"; wrong3 = "Ngoài nhau";
            }
            
            const text = `Cho hai đường tròn (O; $R$) và (O'; $r$) có bán kính lần lượt là $R = ${R}\\text{ cm}$, $r = ${r}\\text{ cm}$. Biết khoảng cách nối tâm $OO' = ${d}\\text{ cm}$. Hãy xác định vị trí tương đối của hai đường tròn.`;
            const exp = `Ta xét các tổng và hiệu: $R + r = ${R} + ${r} = ${R+r}$ và $R - r = ${R} - ${r} = ${R-r}$.\n` +
                        `Vì khoảng cách $OO' = d = ${d}$. So sánh, ta thấy:\n` +
                        (type===0 ? `$R - r < d < R + r$ (${R-r} < ${d} < ${R+r}). Vậy hai đường tròn cắt nhau.` :
                         type===1 ? `$d = R + r$ (${d} = ${R+r}). Vậy hai đường tròn tiếp xúc ngoài.` :
                         type===2 ? `$d > R + r$ (${d} > ${R+r}). Vậy hai đường tròn ở ngoài nhau.` :
                         type===3 ? `$d = R - r$ (${d} = ${R-r}). Vậy hai đường tròn tiếp xúc trong.` :
                         `$d < R - r$ (${d} < ${R-r}). Vậy đường tròn (O) đựng đường tròn (O').`);
            
            const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
            q.push({ id: 'b17_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b17_d2: function(count=5) {
        return this.generic_geometry('b17_d2', `Dạng 2: Các bài toán liên quan đến hai đường tròn tiếp xúc nhau`, count);
    },
    b17_d3: function(count=5) {
        return this.generic_geometry('b17_d3', `Dạng 3: Các bài toán liên quan đến hai đường tròn cắt nhau`, count);
    },
    b17_d4: function(count=5) {
        return this.generic_geometry('b17_d4', `Dạng 3: Các bài toán về hai đường tròn không cắt nhau`, count);
    },
    b17_d5: function(count=5) {
        return this.generic_system('b17_d5', `Dạng 4: Chứng minh các tính chất về hệ thức hình học`, count);
    },
    b17_d6: function(count=5) {
        return this.generic_geometry('b17_d6', `Dạng 5: Tính độ dài đoạn thẳng`, count);
    },
    b1_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*5)+1;
            const b = Math.floor(Math.random()*5)+1;
            const c = Math.floor(Math.random()*20)-10;
            const x = Math.floor(Math.random()*5)-2;
            const y = Math.floor(Math.random()*5)-2;
            
            const type = Math.random() > 0.5;
            if (type) {
                const c_val = a*x + b*y;
                const text = `Trong các cặp số sau, cặp số nào là nghiệm của phương trình \\( ${a}x + ${b}y = ${c_val} \\)?`;
                const ans = `(${x}; ${y})`;
                const wrong1 = `(${x+1}; ${y})`;
                const wrong2 = `(${x}; ${y-1})`;
                const wrong3 = `(${y}; ${x === y ? x+1 : x})`;
                const exp = `Thay \\( x = ${x} \\) và \\( y = ${y} \\) vào phương trình ta được: \\( ${a}(${x}) + ${b}(${y}) = ${a*x} + ${b*y} = ${c_val} \\) (đúng). Vậy ${ans} là nghiệm.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b1_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const text = `Trong các phương trình sau, phương trình nào là phương trình bậc nhất hai ẩn?`;
                const ans = `\\( ${a}x - ${b}y = ${c} \\)`;
                const wrong1 = `\\( ${a}x^2 + ${b}y = ${c} \\)`;
                const wrong2 = `\\( 0x + 0y = ${c} \\)`;
                const wrong3 = `\\( ${a}x + ${b}y^2 = ${c} \\)`;
                const exp = `Phương trình bậc nhất hai ẩn có dạng \\( ax + by = c \\) (với \\( a \\neq 0 \\) hoặc \\( b \\neq 0 \\)). Do đó ${ans} là phương trình bậc nhất hai ẩn.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b1_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b1_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const m = Math.floor(Math.random()*9)-4;
            let x = Math.floor(Math.random()*5)-2;
            if(x === 0) x = 1;
            const b = Math.floor(Math.random()*5)+1;
            const y = Math.floor(Math.random()*5)-2;
            const c = m*x + b*y;
            
            const text = `Tìm \\( m \\) để cặp số \\( (${x}; ${y}) \\) là nghiệm của phương trình \\( mx + ${b}y = ${c} \\).`;
            const ans = `m = ${m}`;
            const wrong1 = `m = ${m+1}`;
            const wrong2 = `m = ${m-1}`;
            const wrong3 = `m = ${-m}`;
            const exp = `Thay \\( x = ${x} \\) và \\( y = ${y} \\) vào phương trình, ta có: \\( m(${x}) + ${b}(${y}) = ${c} \\Rightarrow ${x}m + ${b*y} = ${c} \\Rightarrow ${x}m = ${c - b*y} \\Rightarrow m = ${m} \\).`;
            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b1_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b1_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*3)+1;
            const b = Math.floor(Math.random()*3)+1;
            const c = Math.floor(Math.random()*10)-5;
            
            const text = `Tìm nghiệm tổng quát của phương trình \\( ${a}x - ${b}y = ${c} \\).`;
            const ans = `\\( \\begin{cases} x \\in \\mathbb{R} \\\\ y = \\frac{${a}}{${b}}x - \\frac{${c}}{${b}} \\end{cases} \\)`;
            const wrong1 = `\\( \\begin{cases} x \\in \\mathbb{R} \\\\ y = \\frac{${a}}{${b}}x + \\frac{${c}}{${b}} \\end{cases} \\)`;
            const wrong2 = `\\( \\begin{cases} y \\in \\mathbb{R} \\\\ x = \\frac{${b}}{${a}}y - \\frac{${c}}{${a}} \\end{cases} \\)`;
            const wrong3 = `\\( \\begin{cases} x \\in \\mathbb{R} \\\\ y = -\\frac{${a}}{${b}}x - \\frac{${c}}{${b}} \\end{cases} \\)`;
            const exp = `Từ phương trình \\( ${a}x - ${b}y = ${c} \\Rightarrow ${b}y = ${a}x - ${c} \\Rightarrow y = \\frac{${a}}{${b}}x - \\frac{${c}}{${b}} \\). Vậy nghiệm tổng quát là ${ans}.`;
            
            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b1_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b1_d4: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const x = Math.floor(Math.random()*5)-2;
            const y = Math.floor(Math.random()*5)-2;
            const a1 = Math.floor(Math.random()*3)+1;
            const b1 = Math.floor(Math.random()*3)+1;
            const c1 = a1*x + b1*y;
            const a2 = Math.floor(Math.random()*3)+1;
            const b2 = Math.floor(Math.random()*3)-3;
            const c2 = a2*x + b2*y;
            
            const type = Math.random() > 0.5;
            if(type) {
                const text = `Cặp số nào sau đây là nghiệm của hệ phương trình \\( \\begin{cases} ${a1}x + ${b1}y = ${c1} \\\\ ${a2}x ${b2<0?'-':'+'} ${Math.abs(b2)}y = ${c2} \\end{cases} \\)?`;
                const ans = `(${x}; ${y})`;
                const wrong1 = `(${x+1}; ${y})`;
                const wrong2 = `(${x}; ${y-1})`;
                const wrong3 = `(${y}; ${x})`;
                const exp = `Thay \\( x = ${x} \\) và \\( y = ${y} \\) vào hệ phương trình ta thấy thỏa mãn cả hai phương trình. Do đó ${ans} là nghiệm của hệ.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b1_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const text = `Trong các hệ phương trình sau, hệ nào là hệ phương trình bậc nhất hai ẩn?`;
                const ans = `\\( \\begin{cases} ${a1}x + ${b1}y = ${c1} \\\\ ${a2}x ${b2<0?'-':'+'} ${Math.abs(b2)}y = ${c2} \\end{cases} \\)`;
                const wrong1 = `\\( \\begin{cases} ${a1}x^2 + ${b1}y = ${c1} \\\\ ${a2}x ${b2<0?'-':'+'} ${Math.abs(b2)}y = ${c2} \\end{cases} \\)`;
                const wrong2 = `\\( \\begin{cases} 0x + 0y = ${c1} \\\\ ${a2}x ${b2<0?'-':'+'} ${Math.abs(b2)}y = ${c2} \\end{cases} \\)`;
                const wrong3 = `\\( \\begin{cases} ${a1}x + ${b1}y = ${c1} \\\\ x^2 - y^2 = ${c2} \\end{cases} \\)`;
                const exp = `Hệ phương trình bậc nhất hai ẩn gồm hai phương trình bậc nhất hai ẩn. Do đó ${ans} là hệ phương trình bậc nhất hai ẩn.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b1_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b1_d5: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random()*3); // 0: 1 nghiệm, 1: vô nghiệm, 2: vô số nghiệm
            let a1 = Math.floor(Math.random()*3)+1;
            let b1 = Math.floor(Math.random()*3)+1;
            let c1 = Math.floor(Math.random()*5)+1;
            let a2, b2, c2;
            
            let ans = "";
            let exp = "";
            if (type === 0) { // Cắt nhau -> 1 nghiệm
                a2 = a1; b2 = b1 + 1; c2 = c1;
                ans = "Có một nghiệm duy nhất";
                exp = `Vì \\( \\frac{${a1}}{${a2}} \\neq \\frac{${b1}}{${b2}} \\) nên hai đường thẳng cắt nhau. Hệ có một nghiệm duy nhất.`;
            } else if (type === 1) { // Song song -> Vô nghiệm
                let k = 2;
                a2 = a1 * k; b2 = b1 * k; c2 = c1 * k + 1;
                ans = "Vô nghiệm";
                exp = `Vì \\( \\frac{${a1}}{${a2}} = \\frac{${b1}}{${b2}} \\neq \\frac{${c1}}{${c2}} \\) nên hai đường thẳng song song. Hệ vô nghiệm.`;
            } else { // Trùng nhau -> Vô số nghiệm
                let k = 2;
                a2 = a1 * k; b2 = b1 * k; c2 = c1 * k;
                ans = "Vô số nghiệm";
                exp = `Vì \\( \\frac{${a1}}{${a2}} = \\frac{${b1}}{${b2}} = \\frac{${c1}}{${c2}} \\) nên hai đường thẳng trùng nhau. Hệ có vô số nghiệm.`;
            }
            const text = `Không vẽ đồ thị, hãy đoán nhận số nghiệm của hệ phương trình: \\( \\begin{cases} ${a1}x + ${b1}y = ${c1} \\\\ ${a2}x + ${b2}y = ${c2} \\end{cases} \\)`;
            const opts = this.shuffle(["Có một nghiệm duy nhất", "Vô nghiệm", "Vô số nghiệm", "Không xác định"]);
            q.push({ id: 'b1_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b2_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const x = Math.floor(Math.random()*9)-4;
            const y = Math.floor(Math.random()*9)-4;
            const getCoeff = () => { let c = Math.floor(Math.random()*8)-4; return c >= 0 ? c+2 : c-1; };
            const a1 = getCoeff();
            const b1 = getCoeff();
            const c1 = a1*x + b1*y;
            const a2 = getCoeff();
            const b2 = getCoeff();
            const c2 = a2*x + b2*y;
            
            const formatTerm = (c, v, isFirst) => {
                if (c === 0) return '';
                let s = '';
                if (c < 0) s = isFirst ? '-' : ' - ';
                else s = isFirst ? '' : ' + ';
                let absC = Math.abs(c);
                if (absC === 1) return s + v;
                return s + absC + v;
            };
            
            const eq1 = formatTerm(a1, 'x', true) + formatTerm(b1, 'y', false) + ' = ' + c1;
            const eq2 = formatTerm(a2, 'x', true) + formatTerm(b2, 'y', false) + ' = ' + c2;
            
            const text = `Giải hệ phương trình sau: \\( \\begin{cases} ${eq1} \\\\ ${eq2} \\end{cases} \\)`;
            const ans = `(${x}; ${y})`;
            const wrong1 = `(${x+1}; ${y})`;
            const wrong2 = `(${x}; ${y-1})`;
            const wrong3 = `(${y}; ${x === y ? x+1 : x})`;
            const exp = `Sử dụng phương pháp thế hoặc cộng đại số. Giải hệ phương trình ta được \\( x = ${x} \\) và \\( y = ${y} \\).`;
            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b2_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b2_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const x = Math.floor(Math.random()*5)+1;
            const y = Math.floor(Math.random()*5)+1;
            const a1 = Math.floor(Math.random()*4)+2; // 2 to 5
            const b1 = Math.floor(Math.random()*4)+2; // 2 to 5
            const c1 = a1*x + b1*y;
            
            const k1 = Math.floor(Math.random()*3)+2; // 2 to 4
            const k2 = Math.floor(Math.random()*3)+2; // 2 to 4
            
            const c1_new = c1 - a1*k1 + b1*k2;
            
            const a2 = Math.floor(Math.random()*4)+2;
            const b2 = Math.floor(Math.random()*4)+2;
            const c2_new = a2*(x+y) - b2*(x-y);
            
            const text = `Giải hệ phương trình sau: \\( \\begin{cases} ${a1}(x - ${k1}) + ${b1}(y + ${k2}) = ${c1_new} \\\\ ${a2}(x + y) - ${b2}(x - y) = ${c2_new} \\end{cases} \\)`;
            const ans = `(${x}; ${y})`;
            const wrong1 = `(${x+1}; ${y})`;
            const wrong2 = `(${x}; ${y-1})`;
            const wrong3 = `(${y}; ${x === y ? x+1 : x})`;
            const exp = `Khai triển và rút gọn hệ phương trình về dạng cơ bản bậc nhất hai ẩn, ta được hệ tương đương: \\( \\begin{cases} ${a1}x + ${b1}y = ${a1*x+b1*y} \\\\ ${a2-b2}x + ${a2+b2}y = ${c2_new} \\end{cases} \\). Giải hệ này ta tìm được \\( (x; y) = (${x}; ${y}) \\).`;
            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b2_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b2_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const ans_x = Math.floor(Math.random()*5)-2; 
            const ans_y = Math.floor(Math.random()*5)-2;
            const u_v = Math.random() > 0.5 ? 1 : -1;
            const v_v = Math.random() > 0.5 ? 1 : -1;
            
            const k1 = ans_x - u_v;
            const k2 = ans_y - v_v;
            
            const a1 = Math.floor(Math.random()*4)+2;
            const b1 = Math.floor(Math.random()*4)+2;
            const c1 = a1*u_v + b1*v_v;
            const a2 = Math.floor(Math.random()*4)+2;
            const b2 = -(Math.floor(Math.random()*4)+2);
            const c2 = a2*u_v + b2*v_v;
            
            const fmtK1 = k1 < 0 ? `+ ${Math.abs(k1)}` : (k1 > 0 ? `- ${k1}` : '');
            const fmtK2 = k2 < 0 ? `+ ${Math.abs(k2)}` : (k2 > 0 ? `- ${k2}` : '');
            
            const text = `Giải hệ phương trình sau: \\( \\begin{cases} \\frac{${a1}}{x${fmtK1}} + \\frac{${b1}}{y${fmtK2}} = ${c1} \\\\ \\frac{${a2}}{x${fmtK1}} ${b2<0?'-':'+'} \\frac{${Math.abs(b2)}}{y${fmtK2}} = ${c2} \\end{cases} \\)`;
            const ans = `(${ans_x}; ${ans_y})`;
            const wrong1 = `(${ans_x+1}; ${ans_y})`;
            const wrong2 = `(${ans_x}; ${ans_y+1})`;
            const wrong3 = `(${ans_y}; ${ans_x === ans_y ? ans_x+1 : ans_x})`;
            const exp = `Đặt ẩn phụ \\( u = \\frac{1}{x${fmtK1}} \\) và \\( v = \\frac{1}{y${fmtK2}} \\) (điều kiện \\( x \\neq ${k1}, y \\neq ${k2} \\)). Giải hệ tìm được \\( u=${u_v}, v=${v_v} \\). Từ đó tính được \\( (x; y) = (${ans_x}; ${ans_y}) \\).`;
            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b2_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b2_d4: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // Type 1: Find m given a solution
                const m = Math.floor(Math.random()*7)-3;
                const m_val = m === 0 ? 4 : m;
                const x = Math.floor(Math.random()*5)-2;
                const y = Math.floor(Math.random()*5)-2;
                const k = Math.floor(Math.random()*3)+2;
                
                const c1 = m_val*x + k*y;
                const c2 = k*x - m_val*y;
                
                const text = `Cho hệ phương trình \\( \\begin{cases} mx + ${k}y = ${c1} \\\\ ${k}x - my = ${c2} \\end{cases} \\). Tìm tham số \\( m \\) để hệ phương trình có nghiệm là \\( (${x}; ${y}) \\).`;
                const ans = `m = ${m_val}`;
                const wrong1 = `m = ${m_val+1}`;
                const wrong2 = `m = ${-m_val}`;
                const wrong3 = `m = ${m_val-1}`;
                const exp = `Thay \\( x = ${x} \\) và \\( y = ${y} \\) vào hệ phương trình, ta được hệ mới với ẩn \\( m \\). Giải ra ta tìm được \\( m = ${m_val} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b2_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Type 2: Find a, b given a solution
                const a = Math.floor(Math.random()*5)+1;
                const b = Math.floor(Math.random()*5)+1;
                const x = Math.floor(Math.random()*5)-2;
                const y = Math.floor(Math.random()*5)-2;
                
                const c1 = a*x + b*y;
                const c2 = b*x - a*y;
                
                const text = `Xác định các hệ số \\( a, b \\) biết rằng hệ phương trình \\( \\begin{cases} ax + by = ${c1} \\\\ bx - ay = ${c2} \\end{cases} \\) có nghiệm là \\( (${x}; ${y}) \\).`;
                const ans = `a = ${a}, b = ${b}`;
                const wrong1 = `a = ${a+1}, b = ${b}`;
                const wrong2 = `a = ${b}, b = ${a}`;
                const wrong3 = `a = ${a}, b = ${b-1}`;
                const exp = `Thay \\( x = ${x} \\) và \\( y = ${y} \\) vào hệ phương trình, ta được hệ phương trình mới với hai ẩn \\( a, b \\). Giải hệ phương trình đó ta tìm được \\( a = ${a}, b = ${b} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b2_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Type 3: Find m so two lines intersect at a point
                const m = Math.floor(Math.random()*5)+2;
                const x = Math.floor(Math.random()*5)-2;
                const y = Math.floor(Math.random()*5)-2;
                
                const c1 = y - m*x;
                const c2 = y - 2*x;
                
                const text = `Tìm giá trị của tham số \\( m \\) để hai đường thẳng \\( (d_1): y = mx ${c1<0?'-':'+'} ${Math.abs(c1)} \\) và \\( (d_2): y = 2x ${c2<0?'-':'+'} ${Math.abs(c2)} \\) cắt nhau tại một điểm có hoành độ \\( x = ${x} \\).`;
                const ans = `m = ${m}`;
                const wrong1 = `m = ${m+1}`;
                const wrong2 = `m = ${-m}`;
                const wrong3 = `m = ${m-1}`;
                const exp = `Vì hai đường thẳng cắt nhau tại điểm có hoành độ \\( x = ${x} \\), thay \\( x = ${x} \\) vào phương trình \\( d_2 \\) để tìm tung độ giao điểm \\( y = ${y} \\). Sau đó thay tọa độ \\( (${x}; ${y}) \\) vào phương trình \\( d_1 \\) để tìm \\( m \\). Giải ra ta được \\( m = ${m} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b2_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b3_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                const y = Math.floor(Math.random() * 15) + 5;
                const q_val = Math.floor(Math.random() * 4) + 2;
                const r = Math.floor(Math.random() * (y - 1)) + 1;
                const x = q_val * y + r;
                const sum = x + y;
                
                const text = `Tìm hai số tự nhiên biết tổng của chúng bằng ${sum}. Nếu lấy số lớn chia cho số nhỏ thì được thương là ${q_val} và số dư là ${r}.`;
                const ans = `${x} và ${y}`;
                const wrong1 = `${x+1} và ${y-1}`;
                const wrong2 = `${x-1} và ${y+1}`;
                const wrong3 = `${x+r} và ${y}`;
                const exp = `Gọi số lớn là \\( x \\), số nhỏ là \\( y \\). Hệ: \\( \\begin{cases} x + y = ${sum} \\\\ x = ${q_val}y + ${r} \\end{cases} \\). Giải ra: \\( x = ${x} \\), \\( y = ${y} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                const y = Math.floor(Math.random() * 10) + 10;
                const x = y + Math.floor(Math.random() * 10) + 2;
                const p = 2 * (x + y);
                const d1 = Math.floor(Math.random() * 3) + 2;
                const d2 = Math.floor(Math.random() * 3) + 2;
                const ds = (x + d1) * (y + d2) - x * y;
                
                const text = `Một mảnh vườn hình chữ nhật có chu vi là ${p} m. Nếu tăng chiều dài thêm ${d1} m và tăng chiều rộng thêm ${d2} m thì diện tích tăng thêm ${ds} m². Tính chiều dài và chiều rộng của mảnh vườn lúc đầu (m).`;
                const ans = `${x} và ${y}`;
                const wrong1 = `${x+2} và ${y-2}`;
                const wrong2 = `${x-2} và ${y+2}`;
                const wrong3 = `${x+1} và ${y-1}`;
                const exp = `Gọi dài \\( x \\), rộng \\( y \\). \\( x+y=${p/2} \\). Diện tích: \\( (x+${d1})(y+${d2}) - xy = ${ds} \\). Giải hệ ra \\( x = ${x}, y = ${y} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const x = Math.floor(Math.random() * 50) + 30;
                const y = Math.floor(Math.random() * 50) + 30;
                const sum = x + y;
                const k = Math.floor(Math.random() * 3) + 2; // gấp k lần
                const c = Math.floor(Math.random() * 15) + 5; // chuyển c cuốn
                // we need (y + c) = k * (x - c) => y = k(x-c) - c => y = kx - c(k+1). So x, c, k determine y.
                // Let's redefine:
                const nx = Math.floor(Math.random() * 20) + 10; // x-c
                const ny = nx * k; // y+c
                const cx = Math.floor(Math.random() * 10) + 5; // transfer amount
                const orig_x = nx + cx;
                const orig_y = ny - cx;
                const total = orig_x + orig_y;
                
                const text = `Hai kệ sách có tổng cộng ${total} cuốn. Nếu chuyển ${cx} cuốn từ kệ thứ nhất sang kệ thứ hai thì số sách ở kệ thứ hai gấp ${k} lần số sách ở kệ thứ nhất. Tính số sách ở mỗi kệ lúc đầu.`;
                const ans = `${orig_x} và ${orig_y}`;
                const wrong1 = `${orig_x+5} và ${orig_y-5}`;
                const wrong2 = `${orig_y} và ${orig_x}`;
                const wrong3 = `${orig_x-5} và ${orig_y+5}`;
                const exp = `Gọi số sách kệ 1 là \\( x \\), kệ 2 là \\( y \\). \\( x+y=${total} \\). Chuyển ${cx} cuốn: \\( y+${cx} = ${k}(x-${cx}) \\). Giải ra: \\( x = ${orig_x}, y = ${orig_y} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b3_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                let x = Math.floor(Math.random() * 9) + 1;
                let y = Math.floor(Math.random() * 9) + 1;
                while (x === y) y = Math.floor(Math.random() * 9) + 1;
                const sum = x + y;
                const orig = x * 10 + y;
                const rev = y * 10 + x;
                const diff = Math.abs(orig - rev);
                const greater = orig > rev ? "nhỏ hơn" : "lớn hơn";
                
                const text = `Tìm một số tự nhiên có hai chữ số, biết rằng tổng hai chữ số của nó bằng ${sum}. Nếu viết số đó theo thứ tự ngược lại thì được số mới ${greater} số ban đầu ${diff} đơn vị.`;
                const ans = `${orig}`;
                const wrong1 = `${rev}`;
                const wrong2 = `${orig > 50 ? orig - 9 : orig + 9}`;
                const wrong3 = `${orig > 50 ? orig - 18 : orig + 18}`;
                const exp = `Gọi chữ số hàng chục là \\( x \\), hàng đơn vị là \\( y \\). Số ban đầu là \\( 10x + y \\), số mới là \\( 10y + x \\). Hệ phương trình: \\( \\begin{cases} x + y = ${sum} \\\\ |(10y+x) - (10x+y)| = ${diff} \\end{cases} \\). Giải ra ta được số ${orig}.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                let x = Math.floor(Math.random() * 5) + 3; // tens 3..7
                let y = x - (Math.floor(Math.random() * 2) + 1); // units smaller than tens
                if (Math.random() > 0.5) { let temp = x; x = y; y = temp; }
                const orig = x * 10 + y;
                const mid = Math.floor(Math.random() * 5) + 1; // digit to insert
                const newNum = x * 100 + mid * 10 + y;
                const diff = newNum - orig;
                const k = Math.abs(x - y); // difference of digits
                const greater = x > y ? "lớn hơn" : "nhỏ hơn";
                
                const text = `Tìm số tự nhiên có hai chữ số. Biết chữ số hàng chục ${greater} chữ số hàng đơn vị ${k} đơn vị. Nếu viết chữ số ${mid} vào giữa hai chữ số đó thì số tự nhiên tăng thêm ${diff} đơn vị.`;
                const ans = `${orig}`;
                const wrong1 = `${orig + 9}`;
                const wrong2 = `${y * 10 + x}`;
                const wrong3 = `${orig > 50 ? orig - 9 : orig + 18}`;
                const exp = `Gọi số có hai chữ số là \\( \\overline{xy} \\). Ta có phương trình khoảng cách: \\( |x - y| = ${k} \\). Khi viết thêm chữ số ${mid} vào giữa, số mới là \\( \\overline{x${mid}y} = 100x + 10${mid} + y \\). Hiệu hai số: \\( \\overline{x${mid}y} - \\overline{xy} = ${diff} \\). Giải ra được số ${orig}.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b3_d3: function(count=5) {
        const q = [];
        const pairs = [[3,6,2],[4,12,3],[6,12,4],[10,15,6],[12,24,8],[20,30,12]];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                const pair = pairs[Math.floor(Math.random() * pairs.length)];
                const t1 = pair[0];
                const t2 = pair[1];
                const T = pair[2];
                const h1 = Math.floor(Math.random() * (t1 - 1)) + 1;
                const h2 = Math.floor(Math.random() * (t2 - 1)) + 1;
                // P = h1/t1 + h2/t2
                let tu = h1 * t2 + h2 * t1;
                let mau = t1 * t2;
                const ucln = (a, b) => b === 0 ? a : ucln(b, a % b);
                const d = ucln(tu, mau);
                tu = tu / d;
                mau = mau / d;
                const phan = tu === mau ? "1" : `${tu}/${mau}`;
                
                const text = `Hai người thợ cùng làm một công việc trong ${T} giờ thì xong. Nếu người thứ nhất làm trong ${h1} giờ và người thứ hai làm trong ${h2} giờ thì hoàn thành được ${phan} công việc. Hỏi nếu làm riêng thì mỗi người hoàn thành công việc trong bao lâu?`;
                const ans = `${t1} giờ và ${t2} giờ`;
                const wrong1 = `${t2} giờ và ${t1} giờ`;
                const wrong2 = `${t1+1} giờ và ${t2-1} giờ`;
                const wrong3 = `${t1-1} giờ và ${t2+1} giờ`;
                const exp = `Gọi thời gian người 1 làm một mình là \\( x \\), người 2 là \\( y \\). Trong 1 giờ người 1 làm \\( 1/x \\), người 2 làm \\( 1/y \\). Ta có hệ: \\( \\begin{cases} 1/x + 1/y = 1/${T} \\\\ ${h1}/x + ${h2}/y = ${phan} \\end{cases} \\). Giải hệ được \\( x = ${t1}, y = ${t2} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const n1 = Math.floor(Math.random() * 20) + 10; // products per day for team 1
                const k = Math.floor(Math.random() * 5) + 2; // difference
                const n2 = n1 + k; // team 2 makes k more
                const d1 = Math.floor(Math.random() * 5) + 3; // days for team 1
                const d2 = Math.floor(Math.random() * 5) + 2; // days for team 2
                const total = n1 * d1 + n2 * d2;
                
                const text = `Hai tổ sản xuất may một loại áo. Nếu tổ thứ nhất may trong ${d1} ngày và tổ thứ hai may trong ${d2} ngày thì hai tổ may được ${total} chiếc áo. Biết rằng trong mỗi ngày tổ thứ hai may được nhiều hơn tổ thứ nhất ${k} chiếc áo. Hỏi trong một ngày mỗi tổ may được bao nhiêu chiếc áo?`;
                const ans = `${n1} áo và ${n2} áo`;
                const wrong1 = `${n1+2} áo và ${n2+2} áo`;
                const wrong2 = `${n1-1} áo và ${n2-1} áo`;
                const wrong3 = `${n2} áo và ${n1} áo`;
                const exp = `Gọi số áo may mỗi ngày của tổ 1 là \\( x \\), tổ 2 là \\( y \\). Hệ phương trình: \\( \\begin{cases} ${d1}x + ${d2}y = ${total} \\\\ y - x = ${k} \\end{cases} \\). Giải hệ được \\( x = ${n1}, y = ${n2} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b3_d4: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                const vc = Math.floor(Math.random() * 5) * 5 + 20; // 20, 25, 30, 35, 40
                const vn = Math.floor(Math.random() * 2) * 2 + 2; // 2, 4
                const vx = vc + vn;
                const vng = vc - vn;
                
                const t1_x = Math.floor(Math.random() * 2) + 1;
                const t1_ng = Math.floor(Math.random() * 2) + 2;
                const S1_x = vx * t1_x;
                const S1_ng = vng * t1_ng;
                const T1 = t1_x + t1_ng;
                
                const t2_x = Math.floor(Math.random() * 2) + 2;
                const t2_ng = Math.floor(Math.random() * 2) + 1;
                const S2_x = vx * t2_x;
                const S2_ng = vng * t2_ng;
                const T2 = t2_x + t2_ng;
                
                const text = `Một ca nô chạy trên sông, xuôi dòng ${S1_x} km và ngược dòng ${S1_ng} km hết ${T1} giờ. Một lần khác, ca nô đó xuôi dòng ${S2_x} km và ngược dòng ${S2_ng} km hết ${T2} giờ. Tính vận tốc riêng của ca nô và vận tốc dòng nước (km/h).`;
                const ans = `${vc} và ${vn}`;
                const wrong1 = `${vc+2} và ${vn+2}`;
                const wrong2 = `${vc-2} và ${vn-1}`;
                const wrong3 = `${vc+5} và ${vn+1}`;
                const exp = `Gọi vận tốc riêng ca nô là \\( x \\), dòng nước là \\( y \\). Vận tốc xuôi: \\( x+y \\), ngược: \\( x-y \\). Hệ: \\( \\begin{cases} \\frac{${S1_x}}{x+y} + \\frac{${S1_ng}}{x-y} = ${T1} \\\\ \\frac{${S2_x}}{x+y} + \\frac{${S2_ng}}{x-y} = ${T2} \\end{cases} \\). Giải hệ được \\( x = ${vc}, y = ${vn} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const v1 = Math.floor(Math.random() * 4) * 10 + 40; // 40, 50, 60, 70
                const v2 = Math.floor(Math.random() * 3) * 10 + 20; // 20, 30, 40 (make sure v1 > v2)
                let actual_v1 = v1 > v2 ? v1 : v2;
                let actual_v2 = v1 > v2 ? v2 : v1;
                if (actual_v1 === actual_v2) actual_v1 += 10;
                const t = Math.floor(Math.random() * 3) + 2; // 2, 3, 4 hours
                const S = (actual_v1 + actual_v2) * t;
                const diff = actual_v1 - actual_v2;
                
                const text = `Hai xe xuất phát cùng lúc từ A và B cách nhau ${S} km, đi ngược chiều nhau và gặp nhau sau ${t} giờ. Biết vận tốc xe thứ nhất lớn hơn xe thứ hai là ${diff} km/h. Tính vận tốc mỗi xe.`;
                const ans = `${actual_v1} km/h và ${actual_v2} km/h`;
                const wrong1 = `${actual_v1+5} km/h và ${actual_v2+5} km/h`;
                const wrong2 = `${actual_v2} km/h và ${actual_v1} km/h`;
                const wrong3 = `${actual_v1-10} km/h và ${actual_v2+10} km/h`;
                const exp = `Gọi vận tốc xe 1 là \\( x \\), xe 2 là \\( y \\) (\\( x > y \\)). Tổng vận tốc: \\( x + y = \\frac{${S}}{${t}} \\). Hiệu vận tốc: \\( x - y = ${diff} \\). Ta có hệ phương trình: \\( \\begin{cases} x + y = ${S/t} \\\\ x - y = ${diff} \\end{cases} \\). Giải hệ được \\( x = ${actual_v1}, y = ${actual_v2} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b3_d5: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                const m1 = Math.floor(Math.random() * 4) * 5 + 10; // 10, 15, 20, 25
                const m2 = Math.floor(Math.random() * 4) * 5 + 10; // 10, 15, 20, 25
                const M = m1 + m2;
                const p1 = Math.floor(Math.random() * 3) * 10 + 40; // 40, 50, 60
                const p2 = Math.floor(Math.random() * 3) * 10 + 70; // 70, 80, 90
                const P = (m1 * p1 + m2 * p2) / M;
                
                const text = `Có hai loại quặng sắt: loại I chứa ${p1}% sắt, loại II chứa ${p2}% sắt. Hỏi phải đem trộn bao nhiêu tấn quặng mỗi loại để được ${M} tấn quặng hỗn hợp chứa ${P}% sắt?`;
                const ans = `${m1} tấn và ${m2} tấn`;
                const wrong1 = `${m2} tấn và ${m1} tấn`;
                const wrong2 = `${m1+5} tấn và ${m2-5} tấn`;
                const wrong3 = `${m1-5} tấn và ${m2+5} tấn`;
                const exp = `Gọi khối lượng quặng I là \\( x \\), quặng II là \\( y \\). Ta có: tổng khối lượng \\( x + y = ${M} \\). Khối lượng sắt trong hỗn hợp: \\( \\frac{${p1}}{100}x + \\frac{${p2}}{100}y = \\frac{${P}}{100} \\times ${M} \\). Giải hệ được \\( x = ${m1}, y = ${m2} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const x = Math.floor(Math.random() * 10) + 10; // 10 to 19 million
                const y = Math.floor(Math.random() * 10) + 5; // 5 to 14 million
                const S = x + y;
                const a = Math.floor(Math.random() * 3) * 5 + 10; // 10, 15, 20
                const b = Math.floor(Math.random() * 3) * 5 + 5; // 5, 10, 15
                const M = (1 - a/100) * x + (1 - b/100) * y;
                // M might have decimals, round to 2 decimal places to be safe
                const M_str = Number.isInteger(M) ? M : M.toFixed(2);
                
                const text = `Giá niêm yết của một chiếc tủ lạnh và một chiếc máy giặt có tổng số tiền là ${S} triệu đồng. Nhân dịp khuyến mãi, tủ lạnh giảm ${a}% giá niêm yết và máy giặt giảm ${b}% giá niêm yết. Vì thế, người mua chỉ phải trả tổng cộng ${M_str} triệu đồng. Hỏi giá niêm yết của mỗi mặt hàng (triệu đồng) là bao nhiêu?`;
                const ans = `${x} và ${y}`;
                const wrong1 = `${x+2} và ${y-2}`;
                const wrong2 = `${y} và ${x}`;
                const wrong3 = `${x-1} và ${y+1}`;
                const exp = `Gọi giá niêm yết tủ lạnh là \\( x \\), máy giặt là \\( y \\). Tổng: \\( x + y = ${S} \\). Giá sau giảm: \\( (1 - ${a/100})x + (1 - ${b/100})y = ${M_str} \\). Giải hệ ra \\( x = ${x}, y = ${y} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b3_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b4_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // (ax + b)(cx + d) = 0
                const a = Math.floor(Math.random() * 4) + 1; // 1 to 4
                let b = Math.floor(Math.random() * 9) - 4; // -4 to 4
                if (b === 0) b = 1;
                const c = Math.floor(Math.random() * 4) + 1;
                let d = Math.floor(Math.random() * 9) - 4;
                if (d === 0) d = -1;
                
                const b_str = b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
                const d_str = d > 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
                const a_str = a === 1 ? '' : a;
                const c_str = c === 1 ? '' : c;
                
                const text = `Giải phương trình sau: \\( (${a_str}x ${b_str})(${c_str}x ${d_str}) = 0 \\)`;
                
                const ans1 = this.formatFraction(-b, a);
                const ans2 = this.formatFraction(-d, c);
                const ans = `\\( x = ${ans1} \\) hoặc \\( x = ${ans2} \\)`;
                const wrong1 = `\\( x = ${this.formatFraction(b, a)} \\) hoặc \\( x = ${this.formatFraction(d, c)} \\)`;
                const wrong2 = `\\( x = ${this.formatFraction(-b, c)} \\) hoặc \\( x = ${this.formatFraction(-d, a)} \\)`;
                const wrong3 = `\\( x = ${ans1} \\)`;
                
                const exp = `Phương trình tích có dạng \\( A(x)B(x) = 0 \\Leftrightarrow A(x) = 0 \\) hoặc \\( B(x) = 0 \\).
Suy ra:
\\( \\begin{bmatrix} ${a_str}x ${b_str} = 0 \\\\ ${c_str}x ${d_str} = 0 \\end{bmatrix} \\)
\\( \\Leftrightarrow \\begin{bmatrix} x = ${ans1} \\\\ x = ${ans2} \\end{bmatrix} \\).
Vậy tập nghiệm của phương trình là \\( S = \\{${ans1}; ${ans2}\\} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // x(ax + b) = 0
                const a = Math.floor(Math.random() * 5) + 2;
                let b = Math.floor(Math.random() * 9) - 4;
                if (b === 0) b = -2;
                const b_str = b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
                
                const text = `Tập nghiệm của phương trình \\( x(${a}x ${b_str}) = 0 \\) là:`;
                const ans_frac = this.formatFraction(-b, a);
                const ans = `\\( S = \\{0; ${ans_frac}\\} \\)`;
                const wrong1 = `\\( S = \\{${ans_frac}\\} \\)`;
                const wrong2 = `\\( S = \\{0; ${this.formatFraction(b, a)}\\} \\)`;
                const wrong3 = `\\( S = \\{0; ${-b}\\} \\)`;
                
                const exp = `Phương trình tương đương: \\( \\begin{bmatrix} x = 0 \\\\ ${a}x ${b_str} = 0 \\end{bmatrix} \\)
\\( \\Leftrightarrow \\begin{bmatrix} x = 0 \\\\ x = ${ans_frac} \\end{bmatrix} \\).
Tập nghiệm là ${ans}.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // (ax + b)(x^2 - c^2) = 0
                const a = Math.floor(Math.random() * 3) + 1;
                let b = Math.floor(Math.random() * 5) + 1;
                const c = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
                const c2 = c * c;
                const a_str = a === 1 ? '' : a;
                const b_str = `+ ${b}`;
                
                const text = `Số nghiệm của phương trình \\( (${a_str}x ${b_str})(x^2 - ${c2}) = 0 \\) là:`;
                
                // roots are -b/a, c, -c
                // Ensure -b/a is not equal to c or -c to avoid duplicate roots
                const root1 = -b/a;
                let numRoots = (root1 === c || root1 === -c) ? 2 : 3;
                
                const ans = `${numRoots}`;
                const wrong1 = `1`;
                const wrong2 = `2`;
                const wrong3 = `4`;
                
                // if numRoots happens to be 2, swap wrong2 to 3
                let w2 = numRoots === 2 ? `3` : `2`;
                let w1 = numRoots === 1 ? `0` : `1`; // Wait, root1, c, -c -> min 2 roots
                
                const exp = `Phương trình tương đương với:
\\( \\begin{bmatrix} ${a_str}x ${b_str} = 0 \\\\ x^2 - ${c2} = 0 \\end{bmatrix} \\)
\\( \\Leftrightarrow \\begin{bmatrix} x = ${this.formatFraction(-b, a)} \\\\ x = ${c} \\\\ x = -${c} \\end{bmatrix} \\).
Vậy phương trình có ${numRoots} nghiệm.`;
                let final_opts = this.shuffle([ans, w1, w2, wrong3]);
                // fix duplicates
                final_opts = [...new Set(final_opts)];
                while(final_opts.length < 4) final_opts.push((Math.floor(Math.random()*5)+4).toString());
                
                q.push({ id: 'b4_d1_'+i, text, options: final_opts, correctAnswer: final_opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b4_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                // ax^2 + bx = 0
                const a = Math.floor(Math.random() * 4) + 2;
                let b = Math.floor(Math.random() * 7) + 2;
                if (Math.random() > 0.5) b = -b;
                const b_str = b > 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
                
                const text = `Giải phương trình: \\( ${a}x^2 ${b_str} = 0 \\)`;
                const ans_frac = this.formatFraction(-b, a);
                const ans = `\\( x = 0 \\) hoặc \\( x = ${ans_frac} \\)`;
                const wrong1 = `\\( x = 0 \\) hoặc \\( x = ${this.formatFraction(b, a)} \\)`;
                const wrong2 = `\\( x = ${ans_frac} \\)`;
                const wrong3 = `\\( x = 0 \\)`;
                const exp = `Đặt nhân tử chung:
\\( ${a}x^2 ${b_str} = 0 \\Leftrightarrow x(${a}x ${b > 0 ? '+' : '-'} ${Math.abs(b)}) = 0 \\).
Chia thành 2 trường hợp:
\\( x = 0 \\) hoặc \\( ${a}x ${b > 0 ? '+' : '-'} ${Math.abs(b)} = 0 \\)
\\( \\Leftrightarrow x = 0 \\) hoặc \\( x = ${ans_frac} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // (ax+b)^2 - (cx+d)^2 = 0
                const a = 2;
                let b = Math.floor(Math.random() * 5) + 1;
                const c = 1;
                let d = Math.floor(Math.random() * 5) + 2;
                if(b===d) d++;
                
                const text = `Nghiệm của phương trình \\( (${a}x + ${b})^2 - (x + ${d})^2 = 0 \\) là:`;
                
                // (2x+b - x - d)(2x+b + x + d) = 0
                // (x + b-d)(3x + b+d) = 0
                const root1 = d - b;
                const root2 = this.formatFraction(-(b+d), 3);
                
                const ans = `\\( x = ${root1} \\) hoặc \\( x = ${root2} \\)`;
                const wrong1 = `\\( x = ${b-d} \\) hoặc \\( x = ${root2} \\)`;
                const wrong2 = `\\( x = ${root1} \\) hoặc \\( x = ${this.formatFraction(b+d, 3)} \\)`;
                const wrong3 = `\\( x = ${-root1} \\) hoặc \\( x = ${this.formatFraction(-(b-d), 3)} \\)`;
                
                const exp = `Áp dụng hằng đẳng thức hiệu hai bình phương:
\\( [(${a}x + ${b}) - (x + ${d})][(${a}x + ${b}) + (x + ${d})] = 0 \\)
\\( \\Leftrightarrow (x ${b-d >= 0 ? '+' : '-'} ${Math.abs(b-d)})(3x + ${b+d}) = 0 \\)
\\( \\Leftrightarrow \\begin{bmatrix} x = ${root1} \\\\ x = ${root2} \\end{bmatrix} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b4_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                // (ax+b) / (cx+d) = 0
                const a = Math.floor(Math.random()*3)+1;
                const b = Math.floor(Math.random()*5)+1; // ax - b
                const c = Math.floor(Math.random()*3)+1;
                const d = Math.floor(Math.random()*5)+1; // cx - d
                const a_str = a===1?'':a;
                const c_str = c===1?'':c;
                
                const text = `Giải phương trình: \\( \\frac{${a_str}x - ${b}}{${c_str}x - ${d}} = 0 \\)`;
                
                const root = this.formatFraction(b, a);
                const dk = this.formatFraction(d, c);
                
                let ans = "";
                let exp = `Điều kiện: \\( ${c_str}x - ${d} \\neq 0 \\Leftrightarrow x \\neq ${dk} \\).
Tử số bằng 0: \\( ${a_str}x - ${b} = 0 \\Leftrightarrow x = ${root} \\).`;
                
                let wrong1, wrong2, wrong3;
                if (root === dk) {
                    ans = `Phương trình vô nghiệm`;
                    wrong1 = `\\( x = ${root} \\)`;
                    wrong2 = `\\( x = ${dk} \\)`;
                    wrong3 = `\\( x = -${root} \\)`;
                    exp += ` Nhưng giá trị này vi phạm điều kiện xác định. Vậy phương trình vô nghiệm.`;
                } else {
                    ans = `\\( x = ${root} \\)`;
                    wrong1 = `Phương trình vô nghiệm`;
                    wrong2 = `\\( x = ${dk} \\)`;
                    wrong3 = `\\( x = ${this.formatFraction(-b, a)} \\)`;
                    exp += ` Giá trị này thỏa mãn ĐKXĐ. Vậy nghiệm là \\( x = ${root} \\).`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // a/(x-1) = b/(x+1)
                const a = Math.floor(Math.random()*5)+2;
                let b = Math.floor(Math.random()*5)+2;
                if (a === b) b++;
                
                const text = `Giải phương trình: \\( \\frac{${a}}{x - 1} = \\frac{${b}}{x + 1} \\)`;
                const tu = a + b;
                const mau = a - b;
                const root = this.formatFraction(-tu, mau);
                
                const ans = `\\( x = ${root} \\)`;
                const wrong1 = `\\( x = ${this.formatFraction(tu, mau)} \\)`;
                const wrong2 = `\\( x = 1 \\)`;
                const wrong3 = `Phương trình vô nghiệm`;
                
                const exp = `Điều kiện: \\( x \\neq \\pm 1 \\).
Quy đồng và khử mẫu: \\( ${a}(x + 1) = ${b}(x - 1) \\)
\\( \\Leftrightarrow ${a}x + ${a} = ${b}x - ${b} \\)
\\( \\Leftrightarrow (${a} - ${b})x = -${b} - ${a} \\)
\\( \\Leftrightarrow ${a-b}x = ${-(a+b)} \\Leftrightarrow x = ${root} \\).
Giá trị này thỏa mãn ĐKXĐ.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b4_d4: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // (m-1)x + b = 0 has root x = r
                const root = Math.floor(Math.random()*5)+1;
                const b = Math.floor(Math.random()*10)+2; // constant
                // (m-1)root + b = 0 => (m-1) = -b/root => m = 1 - b/root
                // Let's ensure m is nice. b should be multiple of root.
                const b_nice = root * (Math.floor(Math.random()*3)+1);
                const isPlus = Math.random() > 0.5;
                const b_str = isPlus ? `+ ${b_nice}` : `- ${b_nice}`;
                const val = isPlus ? b_nice : -b_nice;
                
                const text = `Tìm \\( m \\) để phương trình \\( (m - 1)x ${b_str} = 0 \\) có nghiệm \\( x = ${root} \\).`;
                const m_ans = 1 - val/root;
                const ans = `\\( m = ${m_ans} \\)`;
                const wrong1 = `\\( m = ${m_ans + 1} \\)`;
                const wrong2 = `\\( m = ${-m_ans} \\)`;
                const wrong3 = `\\( m = 1 \\)`;
                
                const exp = `Vì phương trình có nghiệm \\( x = ${root} \\), ta thay \\( x = ${root} \\) vào phương trình:
\\( (m - 1)\\times ${root} ${b_str} = 0 \\)
\\( \\Leftrightarrow ${root}m - ${root} ${b_str} = 0 \\)
\\( \\Leftrightarrow ${root}m = ${root - val} \\)
\\( \\Leftrightarrow m = ${m_ans} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // (x - m) / (x - 2) = 0 has root x = 5
                const root = Math.floor(Math.random()*5)+3; // 3 to 7
                const mau = Math.floor(Math.random()*2)+1; // 1 or 2
                
                const text = `Biết phương trình \\( \\frac{x - m}{x - ${mau}} = 0 \\) có một nghiệm là \\( x = ${root} \\). Tìm giá trị của \\( m \\).`;
                const ans = `\\( m = ${root} \\)`;
                const wrong1 = `\\( m = ${mau} \\)`;
                const wrong2 = `\\( m = -${root} \\)`;
                const wrong3 = `\\( m = ${root+mau} \\)`;
                
                const exp = `Điều kiện xác định: \\( x \\neq ${mau} \\).
Thay \\( x = ${root} \\) (thỏa mãn ĐKXĐ) vào phương trình, ta có:
\\( \\frac{${root} - m}{${root} - ${mau}} = 0 \\Leftrightarrow ${root} - m = 0 \\Leftrightarrow m = ${root} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // (ax+m)/(x-1) = c(x-1)/(x+1)
                let valid = false;
                let a, c, m, p, q_val, x2;
                let attempts = 0;
                while(!valid && attempts < 100) {
                    attempts++;
                    q_val = Math.floor(Math.random()*4)+2;
                    p = Math.floor(Math.random()*4)+1;
                    const gcd = (x,y) => y===0?x:gcd(y,x%y);
                    if(gcd(p,q_val)!==1 || p===q_val) continue;
                    if(Math.random()>0.5) p = -p;
                    x2 = Math.floor(Math.random()*8)-4;
                    if(x2 >= -1 && x2 <= 1) x2 = 4;
                    let k = 1;
                    while((k*(p+q_val)*(x2+1)) % 4 !== 0) k++;
                    c = k*(p+q_val)*(x2+1)/4;
                    a = c - k*q_val;
                    m = c - k*p*x2;
                    if(a !== 0 && c !== 0) valid = true;
                }
                
                const a_str = a === 1 ? '' : (a === -1 ? '-' : a);
                const c_str = c === 1 ? '' : (c === -1 ? '-' : c);
                const m_str = m > 0 ? `+ ${m}` : `- ${Math.abs(m)}`;
                
                const root1_str = this.formatFraction(p, q_val);
                const text = `Cho phương trình \\( \\frac{${a_str}x + m}{x - 1} = \\frac{${c_str}(x - 1)}{x + 1} \\). Biết rằng \\( x = ${root1_str} \\) là một nghiệm của phương trình. Tìm nghiệm còn lại của phương trình.`;
                
                const ans = `\\( x = ${x2} \\)`;
                const wrong1 = `\\( x = ${-x2} \\)`;
                const wrong2 = `\\( x = ${x2+1} \\)`;
                const wrong3 = `\\( x = ${x2-2} \\)`;
                
                const root1_val = p/q_val;
                // m = c - k*p*x2, a = c - k*q -> c-a = kq
                // Let's show the substitution step
                const exp = `Thay \\( x = ${root1_str} \\) vào phương trình để tìm \\( m \\), ta giải được \\( m = ${m} \\).
Với \\( m = ${m} \\), phương trình trở thành: \\( \\frac{${a_str}x ${m_str}}{x - 1} = \\frac{${c_str}(x - 1)}{x + 1} \\).
ĐKXĐ: \\( x \\neq \\pm 1 \\).
Quy đồng và khử mẫu:
\\( (${a_str}x ${m_str})(x + 1) = ${c_str}(x - 1)^2 \\)
\\( \\Leftrightarrow ${a}x^2 + ${a+m}x + ${m} = ${c}x^2 - ${2*c}x + ${c} \\)
\\( \\Leftrightarrow ${c-a}x^2 - ${2*c+a+m}x + ${c-m} = 0 \\).
Bấm máy giải phương trình bậc hai hoặc dùng Vi-ét, ta được hai nghiệm \\( x = ${root1_str} \\) và \\( x = ${x2} \\) (đều thỏa mãn ĐKXĐ).
Nghiệm còn lại là \\( x = ${x2} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b4_d5: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                // A = a/(bx+c), B = d/(e-bx) where e = -f, C = g / ((bx+c)(bx+f))
                const b = Math.floor(Math.random()*3)+2;
                let c = Math.floor(Math.random()*7)-3; if(c===0) c=1;
                let f = Math.floor(Math.random()*7)-3; if(f===0) f=-1;
                if(c===f) { f++; if(f===0) f=1; }
                const a = Math.floor(Math.random()*4)+1;
                let d_val = Math.floor(Math.random()*4)+1;
                if(a===d_val) d_val++;
                
                let x_ans;
                let isRejected = false;
                if (Math.random() < 0.3) {
                    // Force a rejected root (e.g. x = -c/b or x = -f/b)
                    isRejected = true;
                    x_ans = Math.random() < 0.5 ? -c/b : -f/b;
                } else {
                    // Pick a nice integer root
                    x_ans = Math.floor(Math.random()*5)-2;
                    if(x_ans === -c/b || x_ans === -f/b) x_ans++; // Avoid accidental rejection
                }
                
                const g = b*(a-d_val)*x_ans + a*f - d_val*c;
                // If g is not integer (happens if x_ans is fraction and b doesn't cancel), we re-roll or just use Math.round.
                // Wait, if x_ans = -c/b, then g = b(a-d)(-c/b) + af - dc = -c(a-d) + af - dc = -ac + dc + af - dc = a(f-c).
                // So g is always an integer!
                
                const c_str = c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
                const f_str = f > 0 ? `+ ${f}` : `- ${Math.abs(f)}`;
                const e_str = -f > 0 ? `${-f}` : `-${f}`; // e = -f
                
                const text = `Cho ba biểu thức \\( A = \\frac{${a}}{${b}x ${c_str}} \\); \\( B = \\frac{${d_val}}{${-f > 0 ? -f : '-'+Math.abs(f)} - ${b}x} \\); \\( C = \\frac{${g}}{(${b}x ${c_str})(${b}x ${f_str})} \\). Tìm các giá trị của \\( x \\) để tổng \\( A + B \\) có giá trị bằng giá trị của biểu thức \\( C \\).`;
                
                const root_str = Number.isInteger(x_ans) ? x_ans.toString() : this.formatFraction(Math.round(x_ans*b), b);
                const dk1 = this.formatFraction(-c, b);
                const dk2 = this.formatFraction(-f, b);
                
                const ans = isRejected ? `Phương trình vô nghiệm` : `\\( x = ${root_str} \\)`;
                const wrong1 = isRejected ? `\\( x = ${root_str} \\)` : `Phương trình vô nghiệm`;
                const wrong2 = `\\( x = ${this.formatFraction(c, b)} \\)`;
                const wrong3 = `\\( x = ${this.formatFraction(f, b)} \\)`;
                
                const exp = `Ta có phương trình: \\( \\frac{${a}}{${b}x ${c_str}} + \\frac{${d_val}}{${-f} - ${b}x} = \\frac{${g}}{(${b}x ${c_str})(${b}x ${f_str})} \\).
ĐKXĐ: \\( x \\neq ${dk1} \\) và \\( x \\neq ${dk2} \\).
Biến đổi \\( B = \\frac{${d_val}}{-(${b}x ${f_str})} = \\frac{-${d_val}}{${b}x ${f_str}} \\).
Quy đồng và khử mẫu:
\\( ${a}(${b}x ${f_str}) - ${d_val}(${b}x ${c_str}) = ${g} \\)
\\( \\Leftrightarrow ${a*b}x + ${a*f} - ${d_val*b}x - ${d_val*c} = ${g} \\)
\\( \\Leftrightarrow ${b*(a-d_val)}x = ${g - a*f + d_val*c} \\Leftrightarrow x = ${root_str} \\).
${isRejected ? `Nhưng giá trị này vi phạm ĐKXĐ nên bị loại. Vậy phương trình vô nghiệm.` : `Giá trị này thỏa mãn ĐKXĐ. Vậy nghiệm là \\( x = ${root_str} \\).`}`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // a/(x+b) + c/(x+d) = e
                // e(x+b)(x+d) = a(x+d) + c(x+b)
                // ex^2 + e(b+d)x + ebd = (a+c)x + ad+cb
                // ex^2 + (eb+ed-a-c)x + (ebd-ad-cb) = 0
                // Let's generate roots r1, r2 and e.
                const r1 = Math.floor(Math.random()*5)-2; // -2 to 2
                let r2 = Math.floor(Math.random()*5)-2; // -2 to 2
                if(r1===r2) r2++;
                const e = Math.floor(Math.random()*2)+1; // 1 or 2
                
                // We need to pick b, d such that b != -r1, b != -r2 etc.
                const b = Math.floor(Math.random()*5)+1;
                let d = Math.floor(Math.random()*5)+1;
                if(b===d) d++;
                
                // ex^2 - e(r1+r2)x + e(r1*r2) = 0
                // Match coefficients:
                // eb + ed - a - c = -e(r1+r2) => a+c = e(b+d+r1+r2)
                // ebd - ad - cb = e(r1*r2)
                // Let S = e(b+d+r1+r2). Then c = S - a.
                // ebd - ad - (S-a)b = e*r1*r2
                // ebd - ad - Sb + ab = e*r1*r2
                // a(b-d) = e*r1*r2 - ebd + Sb
                const S = e*(b + d + r1 + r2);
                const a_num = e*r1*r2 - e*b*d + S*b;
                const a_den = b - d;
                
                if (a_num % a_den !== 0) {
                    // Try again if not integer
                    i--;
                    continue;
                }
                const a_val = a_num / a_den;
                const c_val = S - a_val;
                
                if (a_val === 0 || c_val === 0 || -b === r1 || -b === r2 || -d === r1 || -d === r2) {
                    i--;
                    continue;
                }
                
                const b_str = b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
                const d_str = d > 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
                
                const text = `Tìm \\( x \\) thỏa mãn phương trình: \\( \\frac{${a_val}}{x ${b_str}} + \\frac{${c_val}}{x ${d_str}} = ${e} \\).`;
                const ans = `\\( x = ${r1} \\) hoặc \\( x = ${r2} \\)`;
                const wrong1 = `\\( x = ${-r1} \\) hoặc \\( x = ${-r2} \\)`;
                const wrong2 = `\\( x = ${r1+1} \\) hoặc \\( x = ${r2-1} \\)`;
                const wrong3 = `Phương trình vô nghiệm`;
                
                const exp = `ĐKXĐ: \\( x \\neq ${-b} \\) và \\( x \\neq ${-d} \\).
Quy đồng và khử mẫu:
\\( ${a_val}(x ${d_str}) + ${c_val}(x ${b_str}) = ${e}(x ${b_str})(x ${d_str}) \\)
\\( \\Leftrightarrow ${a_val}x + ${a_val*d} + ${c_val}x + ${c_val*b} = ${e}(x^2 + ${b+d}x + ${b*d}) \\)
\\( \\Leftrightarrow ${e}x^2 - ${e*(r1+r2)}x + ${e*r1*r2} = 0 \\).
Giải phương trình bậc hai ta được \\( x = ${r1} \\) và \\( x = ${r2} \\) (đều thỏa mãn ĐKXĐ).`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b5_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // Sentence to inequality
                const subjects = [
                    { text: "không lớn hơn", op: "\\leq" },
                    { text: "không vượt quá", op: "\\leq" },
                    { text: "tối đa là", op: "\\leq" },
                    { text: "ít nhất là", op: "\\geq" },
                    { text: "tối thiểu là", op: "\\geq" },
                    { text: "không nhỏ hơn", op: "\\geq" },
                    { text: "nhỏ hơn", op: "<" },
                    { text: "lớn hơn", op: ">" }
                ];
                const choice = subjects[Math.floor(Math.random() * subjects.length)];
                const num = Math.floor(Math.random() * 20) + 1;
                const varName = Math.random() > 0.5 ? 'x' : 'y';
                
                const text = `Phát biểu "Số \\( ${varName} \\) ${choice.text} ${num}" được viết dưới dạng bất đẳng thức là:`;
                const ans = `\\( ${varName} ${choice.op} ${num} \\)`;
                
                const wrongOps = ["\\leq", "\\geq", "<", ">"].filter(o => o !== choice.op);
                const wrong1 = `\\( ${varName} ${wrongOps[0]} ${num} \\)`;
                const wrong2 = `\\( ${varName} ${wrongOps[1]} ${num} \\)`;
                const wrong3 = `\\( ${varName} ${wrongOps[2]} ${num} \\)`;
                
                const exp = `Cụm từ "${choice.text}" tương đương với dấu bất đẳng thức "\\( ${choice.op} \\)".\nVậy bất đẳng thức đúng là \\( ${varName} ${choice.op} ${num} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Property of inequality (+ c or * c)
                const c = Math.floor(Math.random() * 10) + 2;
                const isNegative = Math.random() > 0.5;
                const multiplier = isNegative ? -c : c;
                
                const text = `Cho bất đẳng thức \\( a < b \\). Bất đẳng thức nào sau đây luôn đúng?`;
                let ans, wrong1, wrong2, wrong3, exp;
                
                if (isNegative) {
                    ans = `\\( ${multiplier}a > ${multiplier}b \\)`;
                    wrong1 = `\\( ${multiplier}a < ${multiplier}b \\)`;
                    wrong2 = `\\( a ${multiplier} < b ${multiplier} \\)`; // This is a - c < b - c which is true, wait. 
                    wrong2 = `\\( a - ${c} > b - ${c} \\)`; // false
                    wrong3 = `\\( \\frac{a}{${c}} > \\frac{b}{${c}} \\)`; // false
                    exp = `Khi nhân cả hai vế của một bất đẳng thức với cùng một số âm (số ${multiplier} < 0), ta phải đổi chiều bất đẳng thức. Do đó từ \\( a < b \\) suy ra \\( ${multiplier}a > ${multiplier}b \\).`;
                } else {
                    ans = `\\( ${multiplier}a < ${multiplier}b \\)`;
                    wrong1 = `\\( ${multiplier}a > ${multiplier}b \\)`;
                    wrong2 = `\\( a + ${c} > b + ${c} \\)`; // false
                    wrong3 = `\\( a - ${c} > b - ${c} \\)`; // false
                    exp = `Khi nhân cả hai vế của một bất đẳng thức với cùng một số dương (số ${multiplier} > 0), chiều của bất đẳng thức được giữ nguyên. Do đó từ \\( a < b \\) suy ra \\( ${multiplier}a < ${multiplier}b \\).`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Transitive property
                const text = `Cho ba số thực \\( a, b, c \\). Khẳng định nào sau đây là đúng về tính chất bắc cầu của bất đẳng thức?`;
                const ans = `Nếu \\( a > b \\) và \\( b > c \\) thì \\( a > c \\)`;
                const wrong1 = `Nếu \\( a > b \\) và \\( c > b \\) thì \\( a > c \\)`;
                const wrong2 = `Nếu \\( a < b \\) và \\( b > c \\) thì \\( a < c \\)`;
                const wrong3 = `Nếu \\( a > b \\) và \\( b > c \\) thì \\( a < c \\)`;
                const exp = `Tính chất bắc cầu của bất đẳng thức phát biểu rằng: Nếu số thứ nhất lớn hơn số thứ hai, và số thứ hai lớn hơn số thứ ba, thì số thứ nhất lớn hơn số thứ ba. Vậy: Nếu \\( a > b \\) và \\( b > c \\) thì \\( a > c \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b5_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                // Prove true statement
                const m = Math.floor(Math.random() * 5) + 2;
                const n = Math.floor(Math.random() * 5) + 2;
                const text = `Để chứng minh bất đẳng thức \\( x^2 + ${m*m} \\geq ${2*m}x \\) với mọi \\( x \\), ta biến đổi tương đương bất đẳng thức về dạng nào sau đây?`;
                const ans = `\\( (x - ${m})^2 \\geq 0 \\)`;
                const wrong1 = `\\( (x + ${m})^2 \\geq 0 \\)`;
                const wrong2 = `\\( x^2 - ${2*m}x \\geq 0 \\)`;
                const wrong3 = `\\( x(x - ${2*m}) \\geq -${m*m} \\)`;
                const exp = `Chuyển vế phương trình, ta được: \\( x^2 - ${2*m}x + ${m*m} \\geq 0 \\).
Áp dụng hằng đẳng thức bình phương của một hiệu, ta có: \\( (x - ${m})^2 \\geq 0 \\).
Vì bình phương của mọi số thực luôn không âm, nên bất đẳng thức cuối cùng luôn đúng với mọi \\( x \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Given a>b, deduce complex inequality
                const a = Math.floor(Math.random() * 5) + 2;
                const b = Math.floor(Math.random() * 10) + 1;
                const text = `Cho \\( x > y \\). Bất đẳng thức nào sau đây chắc chắn đúng?`;
                const ans = `\\( ${a}x + ${b} > ${a}y + ${b} \\)`;
                const wrong1 = `\\( -${a}x + ${b} > -${a}y + ${b} \\)`;
                const wrong2 = `\\( ${a}x - ${b} < ${a}y - ${b} \\)`;
                const wrong3 = `\\( x - ${a}y > 0 \\)`;
                const exp = `Nhân cả hai vế của \\( x > y \\) với ${a} (dương) ta được \\( ${a}x > ${a}y \\).
Tiếp tục cộng thêm ${b} vào hai vế, bất đẳng thức giữ nguyên chiều: \\( ${a}x + ${b} > ${a}y + ${b} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b5_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                // Compare fractions given condition
                const a = Math.floor(Math.random() * 5) + 2;
                const b = Math.floor(Math.random() * 5) + 2;
                const text = `Cho \\( 0 < x < y \\). Hãy so sánh hai biểu thức \\( A = \\frac{${a}}{x} \\) và \\( B = \\frac{${a}}{y} \\).`;
                const ans = `\\( A > B \\)`;
                const wrong1 = `\\( A < B \\)`;
                const wrong2 = `\\( A = B \\)`;
                const wrong3 = `Không thể so sánh được`;
                const exp = `Vì \\( x < y \\) và cả hai số đều dương, nên khi lấy nghịch đảo chiều bất đẳng thức sẽ đổi lại: \\( \\frac{1}{x} > \\frac{1}{y} \\).
Nhân cả hai vế với số dương ${a}, ta được \\( \\frac{${a}}{x} > \\frac{${a}}{y} \\). Vậy \\( A > B \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Evaluate an expression range
                const a = Math.floor(Math.random() * 4) + 2;
                const c = Math.floor(Math.random() * 4) + 2;
                const b = Math.floor(Math.random() * 10) + 1;
                const isLess = Math.random() > 0.5;
                const op1 = isLess ? "<" : ">";
                
                const text = `Biết \\( x ${op1} ${c} \\). Hãy so sánh giá trị của biểu thức \\( P = ${a}x - ${b} \\) với số \\( ${a*c - b} \\).`;
                const ans = `\\( P ${op1} ${a*c - b} \\)`;
                const wrong1 = `\\( P ${isLess ? '>' : '<'} ${a*c - b} \\)`;
                const wrong2 = `\\( P = ${a*c - b} \\)`;
                const wrong3 = `\\( P \\geq ${a*c - b} \\)`;
                const exp = `Từ giả thiết \\( x ${op1} ${c} \\).
Nhân cả hai vế với ${a} (dương), ta được: \\( ${a}x ${op1} ${a*c} \\).
Trừ cả hai vế cho ${b}, ta được: \\( ${a}x - ${b} ${op1} ${a*c} - ${b} \\).
Hay \\( P ${op1} ${a*c - b} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b5_d4: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                // Cost problem
                const a = (Math.floor(Math.random() * 5) + 2) * 10; // 20 to 60 thousand
                const b = (Math.floor(Math.random() * 5) + 2) * 10;
                const M = (Math.floor(Math.random() * 5) + 10) * 10; // 100 to 140 thousand
                
                const text = `Bạn Nam có ${M} nghìn đồng. Nam muốn mua \\( x \\) cuốn vở (giá ${a} nghìn đồng/cuốn) và \\( y \\) chiếc bút (giá ${b} nghìn đồng/chiếc). Bất đẳng thức nào mô tả giới hạn số tiền Nam có thể tiêu?`;
                const ans = `\\( ${a}x + ${b}y \\leq ${M} \\)`;
                const wrong1 = `\\( ${a}x + ${b}y < ${M} \\)`;
                const wrong2 = `\\( ${a}x + ${b}y \\geq ${M} \\)`;
                const wrong3 = `\\( ${a}x + ${b}y > ${M} \\)`;
                
                const exp = `Tổng số tiền mua \\( x \\) cuốn vở là \\( ${a}x \\) (nghìn đồng).
Tổng số tiền mua \\( y \\) chiếc bút là \\( ${b}y \\) (nghìn đồng).
Vì Nam chỉ có tối đa ${M} nghìn đồng, nên tổng số tiền tiêu không được vượt quá số tiền Nam có: \\( ${a}x + ${b}y \\leq ${M} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Time/Speed problem
                const S = (Math.floor(Math.random() * 10) + 5) * 10; // 50 to 140 km
                const T = Math.floor(Math.random() * 3) + 2; // 2 to 4 hours
                
                const text = `Một ô tô dự định đi quãng đường ${S} km trong thời gian không quá ${T} giờ. Gọi \\( v \\) (km/h) là vận tốc trung bình của ô tô. Bất đẳng thức nào sau đây thể hiện đúng điều kiện của vận tốc?`;
                const v_min = S / T;
                const ans = `\\( v \\geq ${v_min} \\)`;
                const wrong1 = `\\( v \\leq ${v_min} \\)`;
                const wrong2 = `\\( v > ${v_min} \\)`;
                const wrong3 = `\\( v < ${v_min} \\)`;
                
                const exp = `Thời gian đi là \\( t = \\frac{S}{v} = \\frac{${S}}{v} \\) (giờ).
Yêu cầu thời gian không quá ${T} giờ, tức là \\( \\frac{${S}}{v} \\leq ${T} \\).
Vì \\( v > 0 \\), nhân chéo ta được \\( ${S} \\leq ${T}v \\Leftrightarrow v \\geq \\frac{${S}}{${T}} = ${v_min} \\) (km/h).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b5_d5: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // Min of x^2 - 2ax + b
                const a = Math.floor(Math.random() * 5) + 1; // 1 to 5
                const a2 = 2 * a;
                const c = Math.floor(Math.random() * 10) + 1;
                const b = a*a + c; // b = a^2 + c
                
                const text = `Giá trị nhỏ nhất của biểu thức \\( P = x^2 - ${a2}x + ${b} \\) là:`;
                const ans = `${c}`;
                const wrong1 = `${b}`;
                const wrong2 = `${-c}`;
                const wrong3 = `0`;
                
                const exp = `Ta biến đổi biểu thức về dạng bình phương:
\\( P = x^2 - 2 \\times x \\times ${a} + ${a*a} + ${c} \\)
\\( P = (x - ${a})^2 + ${c} \\).
Vì \\( (x - ${a})^2 \\geq 0 \\) với mọi \\( x \\), nên \\( P \\geq ${c} \\).
Dấu "=" xảy ra khi \\( x = ${a} \\).
Vậy giá trị nhỏ nhất của P là ${c}.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Max of -x^2 + 2ax + b
                const a = Math.floor(Math.random() * 5) + 1; // 1 to 5
                const a2 = 2 * a;
                const c = Math.floor(Math.random() * 10) + 1; // max value
                const b = c - a*a; 
                const b_str = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
                
                const text = `Tìm giá trị lớn nhất của biểu thức \\( Q = -x^2 + ${a2}x ${b_str} \\).`;
                const ans = `${c}`;
                const wrong1 = `${c + 2}`;
                const wrong2 = `${-c}`;
                const wrong3 = `${b}`;
                
                const exp = `Ta đặt dấu trừ ra ngoài và nhóm lại thành hằng đẳng thức:
\\( Q = -(x^2 - ${a2}x) ${b_str} \\)
\\( Q = -(x^2 - 2 \\times x \\times ${a} + ${a*a}) + ${a*a} ${b_str} \\)
\\( Q = -(x - ${a})^2 + ${c} \\).
Vì \\( -(x - ${a})^2 \\leq 0 \\) với mọi \\( x \\), nên \\( Q \\leq ${c} \\).
Dấu "=" xảy ra khi \\( x = ${a} \\).
Vậy giá trị lớn nhất của Q là ${c}.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Min using AM-GM (Cauchy)
                // x + a^2 / x >= 2a
                const a = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, 5
                const a2 = a * a; // 4, 9, 16, 25
                const text = `Cho số thực \\( x > 0 \\). Giá trị nhỏ nhất của biểu thức \\( M = x + \\frac{${a2}}{x} \\) là:`;
                const minVal = 2 * a;
                
                const ans = `${minVal}`;
                const wrong1 = `${a2}`;
                const wrong2 = `${a}`;
                const wrong3 = `${minVal + 2}`;
                
                const exp = `Vì \\( x > 0 \\), nên \\( \\frac{${a2}}{x} > 0 \\).
Áp dụng bất đẳng thức Cô-si (AM-GM) cho hai số dương \\( x \\) và \\( \\frac{${a2}}{x} \\), ta có:
\\( x + \\frac{${a2}}{x} \\geq 2\\sqrt{x \\times \\frac{${a2}}{x}} = 2\\sqrt{${a2}} = 2 \\times ${a} = ${minVal} \\).
Dấu "=" xảy ra khi \\( x = \\frac{${a2}}{x} \\Leftrightarrow x^2 = ${a2} \\Leftrightarrow x = ${a} \\) (vì \\( x > 0 \\)).
Vậy giá trị nhỏ nhất của M là ${minVal}.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b5_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b6_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // Nhận biết BPT bậc nhất 1 ẩn
                const text = `Trong các bất phương trình sau, bất phương trình nào là bất phương trình bậc nhất một ẩn?`;
                const a = Math.floor(Math.random()*5)+2;
                const b = Math.floor(Math.random()*5)+1;
                
                const ans = `\\( ${a}x - ${b} > 0 \\)`;
                const wrong1 = `\\( ${a}x^2 - ${b} > 0 \\)`; // Bậc 2
                const wrong2 = `\\( 0x + ${b} > 0 \\)`; // a = 0
                const wrong3 = `\\( \\frac{${a}}{x} - ${b} > 0 \\)`; // Ẩn ở mẫu
                
                const exp = `Bất phương trình bậc nhất một ẩn có dạng \\( ax + b > 0 \\) (hoặc \\( <, \\leq, \\geq \\)) với \\( a \\neq 0 \\).
Trong các đáp án, chỉ có \\( ${a}x - ${b} > 0 \\) thỏa mãn điều kiện này (ẩn \\( x \\) bậc 1 và hệ số \\( a = ${a} \\neq 0 \\)).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Kiểm tra nghiệm của BPT
                const a = Math.floor(Math.random()*3)+2;
                const b = Math.floor(Math.random()*10)+5; // 5 to 14
                const isLess = Math.random() > 0.5;
                const op = isLess ? "<" : ">";
                
                const text = `Số nào sau đây là một nghiệm của bất phương trình \\( ${a}x - ${b} ${op} 0 \\)?`;
                
                // Giải: ax > b => x > b/a
                const threshold = b/a;
                let ans, wrong1, wrong2, wrong3;
                if (isLess) {
                    // x < threshold
                    ans = Math.floor(threshold) - 1;
                    wrong1 = Math.ceil(threshold) + 1;
                    wrong2 = Math.ceil(threshold) + 2;
                    wrong3 = Math.ceil(threshold) + 3;
                } else {
                    // x > threshold
                    ans = Math.ceil(threshold) + 1;
                    wrong1 = Math.floor(threshold) - 1;
                    wrong2 = Math.floor(threshold) - 2;
                    wrong3 = Math.floor(threshold) - 3;
                }
                
                const exp = `Thay lần lượt các giá trị vào bất phương trình:
Với \\( x = ${ans} \\), ta có: \\( ${a} \\times (${ans}) - ${b} = ${a*ans - b} \\).
Vì \\( ${a*ans - b} ${op} 0 \\) là mệnh đề đúng, nên \\( x = ${ans} \\) là nghiệm của bất phương trình.`;
                const opts = this.shuffle([ans.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()]);
                q.push({ id: 'b6_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans.toString()), explanation: exp });
            } else {
                // Biểu diễn tập nghiệm trên trục số
                const num = Math.floor(Math.random()*10)-5;
                const signs = [">", "<", "\\geq", "\\leq"];
                const sign = signs[Math.floor(Math.random()*signs.length)];
                
                const text = `Hình biểu diễn tập nghiệm trên trục số (gạch chéo phần không thuộc tập nghiệm) với ngoặc tròn "(" hoặc "[" tương ứng, phản ánh đúng tập nghiệm nào?
Giả sử trục số giữ lại phần lớn hơn hoặc bằng ${num} (ngoặc vuông "["):`;
                
                // To keep it text-based, we ask them to match description
                const text2 = `Tập nghiệm \\( x ${sign} ${num} \\) được biểu diễn trên trục số bằng cách:`;
                
                let ans, wrong1, wrong2, wrong3;
                if (sign === ">") {
                    ans = `Giữ lại phần bên phải số ${num}, gạch bỏ phần bên trái, dùng ngoặc tròn "("`;
                    wrong1 = `Giữ lại phần bên phải số ${num}, gạch bỏ phần bên trái, dùng ngoặc vuông "["`;
                    wrong2 = `Giữ lại phần bên trái số ${num}, gạch bỏ phần bên phải, dùng ngoặc tròn ")"`;
                    wrong3 = `Giữ lại phần bên trái số ${num}, gạch bỏ phần bên phải, dùng ngoặc vuông "]"`;
                } else if (sign === "<") {
                    ans = `Giữ lại phần bên trái số ${num}, gạch bỏ phần bên phải, dùng ngoặc tròn ")"`;
                    wrong1 = `Giữ lại phần bên trái số ${num}, gạch bỏ phần bên phải, dùng ngoặc vuông "]"`;
                    wrong2 = `Giữ lại phần bên phải số ${num}, gạch bỏ phần bên trái, dùng ngoặc tròn "("`;
                    wrong3 = `Giữ lại phần bên phải số ${num}, gạch bỏ phần bên trái, dùng ngoặc vuông "["`;
                } else if (sign === "\\geq") {
                    ans = `Giữ lại phần bên phải số ${num}, gạch bỏ phần bên trái, dùng ngoặc vuông "["`;
                    wrong1 = `Giữ lại phần bên phải số ${num}, gạch bỏ phần bên trái, dùng ngoặc tròn "("`;
                    wrong2 = `Giữ lại phần bên trái số ${num}, gạch bỏ phần bên phải, dùng ngoặc vuông "]"`;
                    wrong3 = `Giữ lại phần bên trái số ${num}, gạch bỏ phần bên phải, dùng ngoặc tròn ")"`;
                } else {
                    ans = `Giữ lại phần bên trái số ${num}, gạch bỏ phần bên phải, dùng ngoặc vuông "]"`;
                    wrong1 = `Giữ lại phần bên trái số ${num}, gạch bỏ phần bên phải, dùng ngoặc tròn ")"`;
                    wrong2 = `Giữ lại phần bên phải số ${num}, gạch bỏ phần bên trái, dùng ngoặc vuông "["`;
                    wrong3 = `Giữ lại phần bên phải số ${num}, gạch bỏ phần bên trái, dùng ngoặc tròn "("`;
                }
                
                const exp = `Ký hiệu \\( ${sign} \\) mang ý nghĩa:
- Nếu có dấu "=" (\\( \\leq, \\geq \\)) thì dùng ngoặc vuông [ hoặc ].
- Nếu không có dấu "=" (\\( <, > \\)) thì dùng ngoặc tròn ( hoặc ).
- Chiều lớn hơn (\\( >, \\geq \\)) thì giữ lại phần bên phải, gạch bên trái.
- Chiều nhỏ hơn (\\( <, \\leq \\)) thì giữ lại phần bên trái, gạch bên phải.
Áp dụng quy tắc trên, ta tìm được đáp án đúng.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d1_'+i, text: text2, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b6_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // Giải BPT cơ bản (hệ số a âm)
                const a = -(Math.floor(Math.random()*4)+2); // a < 0
                const b = Math.floor(Math.random()*20)+5;
                const ops = [">", "<", "\\geq", "\\leq"];
                const opIndex = Math.floor(Math.random()*4);
                const op = ops[opIndex];
                
                const text = `Giải bất phương trình: \\( ${a}x + ${b} ${op} 0 \\)`;
                
                const flipOp = {
                    ">": "<",
                    "<": ">",
                    "\\geq": "\\leq",
                    "\\leq": "\\geq"
                };
                const flipped = flipOp[op];
                const root = this.formatFraction(-b, a);
                
                const ans = `\\( x ${flipped} ${root} \\)`;
                const wrong1 = `\\( x ${op} ${root} \\)`;
                const wrong2 = `\\( x ${flipped} ${this.formatFraction(b, a)} \\)`;
                const wrong3 = `\\( x ${op} ${this.formatFraction(b, a)} \\)`;
                
                const exp = `Ta có: \\( ${a}x + ${b} ${op} 0 \\)
\\( \\Leftrightarrow ${a}x ${op} -${b} \\).
Chia cả hai vế cho \\( ${a} \\) (là một số âm), ta phải **đổi chiều** bất phương trình:
\\( x ${flipped} \\frac{-${b}}{${a}} \\Leftrightarrow x ${flipped} ${root} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Giải BPT chứa mẫu số (Quy đồng)
                const m1 = Math.floor(Math.random()*3)+2; // 2 to 4
                let m2 = Math.floor(Math.random()*3)+2;
                if(m1===m2) m2++;
                const bscnn = m1 * m2;
                
                const text = `Tập nghiệm của bất phương trình \\( \\frac{x - 1}{${m1}} < \\frac{x + 2}{${m2}} \\) là:`;
                
                // (x-1)/m1 < (x+2)/m2
                // m2(x-1) < m1(x+2)
                // m2*x - m2 < m1*x + 2*m1
                // (m2-m1)x < 2m1 + m2
                
                const a = m2 - m1;
                const b = 2*m1 + m2;
                
                let ans, wrong1, wrong2, wrong3;
                let exp = `Nhân cả hai vế với mẫu chung là ${bscnn} (số dương nên giữ nguyên chiều):
\\( ${m2}(x - 1) < ${m1}(x + 2) \\)
\\( \\Leftrightarrow ${m2}x - ${m2} < ${m1}x + ${2*m1} \\)
\\( \\Leftrightarrow (${m2} - ${m1})x < ${2*m1} + ${m2} \\)
\\( \\Leftrightarrow ${a}x < ${b} \\).`;

                if (a > 0) {
                    const r = this.formatFraction(b, a);
                    ans = `\\( x < ${r} \\)`;
                    wrong1 = `\\( x > ${r} \\)`;
                    wrong2 = `\\( x < ${this.formatFraction(-b, a)} \\)`;
                    wrong3 = `\\( x > ${this.formatFraction(-b, a)} \\)`;
                    exp += `\nChia hai vế cho số dương ${a}, bất phương trình giữ nguyên chiều: \\( x < ${r} \\).`;
                } else if (a < 0) {
                    const r = this.formatFraction(b, a);
                    ans = `\\( x > ${r} \\)`;
                    wrong1 = `\\( x < ${r} \\)`;
                    wrong2 = `\\( x > ${this.formatFraction(-b, a)} \\)`;
                    wrong3 = `\\( x < ${this.formatFraction(-b, a)} \\)`;
                    exp += `\nChia hai vế cho số âm ${a}, ta phải đổi chiều bất phương trình: \\( x > ${r} \\).`;
                } else {
                    // a = 0 (but we prevented m1 === m2, so a != 0 is guaranteed)
                }
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Tìm nghiệm nguyên lớn nhất/nhỏ nhất
                const a = Math.floor(Math.random()*4)+2;
                const b = Math.floor(Math.random()*10)+5; // 5 to 14
                
                // ax < b => x < b/a
                const val = b/a;
                const max_int = Math.floor(val);
                // Ensure it's not a round integer to avoid boundary confusion in < vs <=, actually floor works fine for < if it's not integer.
                // Wait, if val is integer, then x < val means max integer is val - 1.
                const ans_val = Number.isInteger(val) ? max_int - 1 : max_int;
                
                const text = `Tìm nghiệm nguyên lớn nhất của bất phương trình: \\( ${a}x - ${b} < 0 \\).`;
                const ans = `${ans_val}`;
                const wrong1 = `${ans_val + 1}`;
                const wrong2 = `${ans_val - 1}`;
                const wrong3 = `${ans_val + 2}`;
                
                const exp = `Ta có: \\( ${a}x - ${b} < 0 \\Leftrightarrow ${a}x < ${b} \\Leftrightarrow x < ${this.formatFraction(b, a)} \\).
Ta có \\( \\frac{${b}}{${a}} \\approx ${(b/a).toFixed(2)} \\).
Vì \\( x \\) là số nguyên lớn nhất thỏa mãn điều kiện nhỏ hơn ${(b/a).toFixed(2)}, nên \\( x = ${ans_val} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b6_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 5);
            if (type === 0) {
                // Điểm trung bình
                const toan = Math.floor(Math.random()*3) + 6; // 6 to 8
                const van = Math.floor(Math.random()*3) + 6; // 6 to 8
                const target = Math.floor(Math.random()*2) + 7; // 7 or 8
                
                const text = `Điểm kiểm tra của bạn An môn Toán là ${toan} điểm (hệ số 2), môn Văn là ${van} điểm (hệ số 2). An sắp thi môn Tiếng Anh (hệ số 1). Hỏi An cần đạt ít nhất bao nhiêu điểm môn Tiếng Anh để điểm trung bình của 3 môn đạt từ ${target} điểm trở lên?`;
                
                // (Toan*2 + Van*2 + Anh*1)/5 >= target
                // Anh >= target*5 - (Toan*2 + Van*2)
                const total_current = toan*2 + van*2;
                const needed = target*5 - total_current;
                
                let ans, wrong1, wrong2, wrong3, exp;
                if (needed > 10) {
                    ans = `Không thể đạt được`;
                    wrong1 = `10 điểm`;
                    wrong2 = `9 điểm`;
                    wrong3 = `8 điểm`;
                    exp = `Gọi điểm Tiếng Anh cần đạt là \\( x \\). 
Theo đề bài, điểm trung bình là: \\( \\frac{${toan} \\times 2 + ${van} \\times 2 + x}{5} \\geq ${target} \\)
\\( \\Leftrightarrow \\frac{${total_current} + x}{5} \\geq ${target} \\Leftrightarrow ${total_current} + x \\geq ${target*5} \\)
\\( \\Leftrightarrow x \\geq ${needed} \\).
Vì điểm thi tối đa là 10, nên An không thể đạt được mục tiêu này.`;
                } else {
                    const ans_val = Math.max(0, needed); // if negative, 0 is enough
                    ans = `${ans_val} điểm`;
                    wrong1 = `${ans_val + 1} điểm`;
                    wrong2 = `${ans_val - 1 < 0 ? ans_val + 2 : ans_val - 1} điểm`;
                    wrong3 = `${ans_val + 0.5} điểm`;
                    exp = `Gọi điểm Tiếng Anh cần đạt là \\( x \\). 
Theo đề bài, điểm trung bình là: \\( \\frac{${toan} \\times 2 + ${van} \\times 2 + x}{5} \\geq ${target} \\)
\\( \\Leftrightarrow \\frac{${total_current} + x}{5} \\geq ${target} \\Leftrightarrow ${total_current} + x \\geq ${target*5} \\)
\\( \\Leftrightarrow x \\geq ${needed} \\).
Vậy An cần đạt ít nhất ${ans_val} điểm môn Tiếng Anh.`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Taxi cost
                const km1 = Math.floor(Math.random()*5) + 15; // 15 to 19k
                const kmn = Math.floor(Math.random()*4) + 10; // 10 to 13k
                const money = Math.floor(Math.random()*10)*10 + 100; // 100k to 190k
                
                const text = `Giá cước taxi được tính như sau: Giá mở cửa cho km đầu tiên là ${km1} nghìn đồng. Từ km thứ hai trở đi, giá mỗi km là ${kmn} nghìn đồng. Bạn Bình mang theo ${money} nghìn đồng. Hỏi Bình có thể đi được quãng đường tối đa là bao nhiêu km (làm tròn số nguyên nhỏ hơn)?`;
                
                // km1 + kmn*(x-1) <= money
                // kmn*(x-1) <= money - km1
                // x-1 <= (money - km1)/kmn
                // x <= (money - km1)/kmn + 1
                const max_x = Math.floor((money - km1)/kmn + 1);
                
                const ans = `${max_x} km`;
                const wrong1 = `${max_x + 1} km`;
                const wrong2 = `${max_x - 1} km`;
                const wrong3 = `${max_x + 2} km`;
                
                const exp = `Gọi quãng đường tối đa đi được là \\( x \\) (km) (\\( x \\geq 1 \\)).
Số tiền phải trả cho km đầu tiên là: ${km1} (nghìn đồng).
Số tiền trả cho \\( x - 1 \\) km tiếp theo là: \\( ${kmn}(x - 1) \\) (nghìn đồng).
Tổng số tiền phải trả: \\( ${km1} + ${kmn}(x - 1) \\leq ${money} \\)
\\( \\Leftrightarrow ${kmn}x - ${kmn} + ${km1} \\leq ${money} \\)
\\( \\Leftrightarrow ${kmn}x + ${km1 - kmn} \\leq ${money} \\)
\\( \\Leftrightarrow ${kmn}x \\leq ${money - km1 + kmn} \\)
\\( \\Leftrightarrow x \\leq ${((money - km1 + kmn)/kmn).toFixed(2)} \\).
Vì quãng đường làm tròn số nguyên, nên Bình có thể đi tối đa ${max_x} km.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 2) {
                // Sản xuất
                const total = Math.floor(Math.random()*10)*50 + 500; // 500 to 950 sp
                const daily = Math.floor(Math.random()*5)*10 + 30; // 30 to 70 sp/day
                const done_days = Math.floor(Math.random()*3) + 3; // 3 to 5 days
                const days_left = Math.floor(Math.random()*3) + 4; // 4 to 6 days
                
                const done_sp = daily * done_days;
                const text = `Một xưởng may nhận hợp đồng may ít nhất ${total} bộ quần áo. Trong ${done_days} ngày đầu, mỗi ngày xưởng may được ${daily} bộ. Xưởng muốn hoàn thành hợp đồng trong ${days_left} ngày còn lại. Hỏi mỗi ngày trong khoảng thời gian còn lại, xưởng phải may ít nhất bao nhiêu bộ quần áo (làm tròn số nguyên lớn hơn)?`;
                
                // done_sp + days_left * x >= total
                // days_left * x >= total - done_sp
                // x >= (total - done_sp) / days_left
                const remain = total - done_sp;
                let ans_val;
                let exp;
                if (remain <= 0) {
                    ans_val = 0;
                    exp = `Số quần áo đã may trong ${done_days} ngày đầu là: \\( ${daily} \\times ${done_days} = ${done_sp} \\) (bộ).
Vì ${done_sp} đã vượt quá chỉ tiêu ${total} bộ, nên những ngày còn lại xưởng không cần may thêm bộ nào vẫn đạt hợp đồng.`;
                } else {
                    ans_val = Math.ceil(remain / days_left);
                    exp = `Số quần áo đã may trong ${done_days} ngày đầu là: \\( ${daily} \\times ${done_days} = ${done_sp} \\) (bộ).
Số quần áo còn lại phải may ít nhất là: \\( ${total} - ${done_sp} = ${remain} \\) (bộ).
Gọi số bộ quần áo phải may mỗi ngày trong ${days_left} ngày còn lại là \\( x \\).
Ta có bất phương trình: \\( ${days_left}x \\geq ${remain} \\Leftrightarrow x \\geq ${(remain/days_left).toFixed(2)} \\).
Vì \\( x \\) là số nguyên, xưởng phải may ít nhất ${ans_val} bộ mỗi ngày.`;
                }
                
                const ans = `${ans_val} bộ`;
                const wrong1 = `${ans_val + 1} bộ`;
                const wrong2 = `${ans_val - 1 < 0 ? 2 : ans_val - 1} bộ`;
                const wrong3 = `${ans_val + 5} bộ`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 3) {
                // Bank interest problem
                const rates = [6.0, 6.5, 7.0, 7.2, 7.5, 8.0, 8.5];
                const rate = rates[Math.floor(Math.random() * rates.length)];
                
                // Principal in millions
                const principal_mil = Math.floor(Math.random()*10)*5 + 10; // 10 to 55 million
                const principal = principal_mil * 1000000;
                
                const target_total = principal * (1 + rate/100);
                
                // Format target_total nicely with dots
                const target_str = target_total.toLocaleString('vi-VN');
                const principal_str = principal.toLocaleString('vi-VN');
                
                const names = ["Bác Ngọc", "Cô Lan", "Chú Hùng", "Bác An"];
                const name = names[Math.floor(Math.random() * names.length)];
                
                const text = `${name} gửi tiền tiết kiệm kì hạn 12 tháng ở một ngân hàng với lãi suất ${rate}%/năm. ${name} dự định tổng số tiền nhận được (cả gốc lẫn lãi) sau khi gửi 12 tháng ít nhất là ${target_str} đồng. Hỏi ${name} phải gửi số tiền tiết kiệm ít nhất là bao nhiêu để đạt được dự định đó?`;
                
                const ans = `${principal_str} đồng`;
                const wrong1 = `${(principal + 1000000).toLocaleString('vi-VN')} đồng`;
                const wrong2 = `${(principal - 1000000).toLocaleString('vi-VN')} đồng`;
                const wrong3 = `${(principal + 500000).toLocaleString('vi-VN')} đồng`;
                
                const exp = `Gọi số tiền tiết kiệm ${name} cần gửi là \\( x \\) (đồng) (\\( x > 0 \\)).
Sau 12 tháng (1 năm), số tiền lãi nhận được là: \\( x \\times ${rate}\\% = ${rate/100}x \\) (đồng).
Tổng số tiền (cả gốc và lãi) nhận được là: \\( x + ${rate/100}x = ${(1 + rate/100)}x \\) (đồng).
Để tổng số tiền nhận được ít nhất là ${target_str} đồng, ta có bất phương trình:
\\( ${(1 + rate/100)}x \\geq ${target_total} \\)
\\( \\Leftrightarrow x \\geq \\frac{${target_total}}{${(1 + rate/100)}} \\)
\\( \\Leftrightarrow x \\geq ${principal} \\).
Vậy ${name} phải gửi ít nhất ${principal_str} đồng.`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Profit / Retail problem
                const cost = Math.floor(Math.random()*4)*10 + 30; // 30k to 60k
                const margin = Math.floor(Math.random()*3)*10 + 20; // 20k to 40k
                const price = cost + margin;
                const fixed_mil = Math.floor(Math.random()*3) + 2; // 2 to 4 million
                const fixed_cost = fixed_mil * 1000000;
                
                const target_profit_mil = Math.floor(Math.random()*3) + 3; // 3 to 5 million
                const target_profit = target_profit_mil * 1000000;
                
                const margin_real = margin * 1000; // in VND
                // x * margin_real >= fixed_cost + target_profit
                const needed_items = Math.ceil((fixed_cost + target_profit) / margin_real);
                
                const text = `Một cửa hàng kinh doanh áo thun có chi phí cố định (tiền thuê mặt bằng, điện nước...) mỗi tháng là ${fixed_mil} triệu đồng. Cửa hàng nhập mỗi chiếc áo thun với giá ${cost}.000 đồng và bán ra với giá ${price}.000 đồng. Hỏi trong một tháng, cửa hàng cần bán ít nhất bao nhiêu chiếc áo thun để thu được lợi nhuận ít nhất là ${target_profit_mil} triệu đồng?`;
                
                const ans = `${needed_items} chiếc`;
                const wrong1 = `${needed_items + 10} chiếc`;
                const wrong2 = `${needed_items - 5} chiếc`;
                const wrong3 = `${needed_items + 5} chiếc`;
                
                const exp = `Đổi: ${fixed_mil} triệu đồng = ${fixed_cost.toLocaleString('vi-VN')} đồng; ${target_profit_mil} triệu đồng = ${target_profit.toLocaleString('vi-VN')} đồng.
Gọi \\( x \\) là số chiếc áo thun cửa hàng cần bán trong một tháng (\\( x \\) là số nguyên dương).
Số tiền bán \\( x \\) chiếc áo là: \\( ${price*1000}x \\) (đồng).
Tiền vốn nhập \\( x \\) chiếc áo là: \\( ${cost*1000}x \\) (đồng).
Lợi nhuận = (Tiền bán) - (Tiền vốn) - (Chi phí cố định).
Theo đề bài, lợi nhuận ít nhất là ${target_profit_mil} triệu đồng nên ta có bất phương trình:
\\( ${price*1000}x - ${cost*1000}x - ${fixed_cost} \\geq ${target_profit} \\)
\\( \\Leftrightarrow ${margin_real}x - ${fixed_cost} \\geq ${target_profit} \\)
\\( \\Leftrightarrow ${margin_real}x \\geq ${fixed_cost + target_profit} \\)
\\( \\Leftrightarrow x \\geq \\frac{${fixed_cost + target_profit}}{${margin_real}} \\)
\\( \\Leftrightarrow x \\geq ${((fixed_cost + target_profit)/margin_real).toFixed(2)} \\).
Vì \\( x \\) là số nguyên, cửa hàng cần bán ít nhất ${needed_items} chiếc áo.`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b6_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b7_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // Căn bậc hai (có 2 giá trị đối nhau)
                const base = Math.floor(Math.random()*15) + 2; // 2 to 16
                const square = base * base;
                const text = `Căn bậc hai của số ${square} là:`;
                const ans = `\\( \\pm ${base} \\)`;
                const wrong1 = `\\( ${base} \\)`;
                const wrong2 = `\\( -${base} \\)`;
                const wrong3 = `\\( \\pm ${base*2} \\)`;
                
                const exp = `Mỗi số dương \\( a \\) có đúng hai căn bậc hai là hai số đối nhau: \\( \\sqrt{a} \\) và \\( -\\sqrt{a} \\).
Vì vậy, căn bậc hai của ${square} là \\( \\pm \\sqrt{${square}} = \\pm ${base} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Căn bậc hai số học (chỉ dương)
                const base = Math.floor(Math.random()*15) + 2;
                const square = base * base;
                const text = `Căn bậc hai số học của ${square} là:`;
                const ans = `\\( ${base} \\)`;
                const wrong1 = `\\( \\pm ${base} \\)`;
                const wrong2 = `\\( -${base} \\)`;
                const wrong3 = `\\( ${base*2} \\)`;
                
                const exp = `Căn bậc hai số học của một số dương \\( a \\) là số dương \\( x \\) sao cho \\( x^2 = a \\).
Ký hiệu là \\( \\sqrt{a} \\). Vậy căn bậc hai số học của ${square} là \\( \\sqrt{${square}} = ${base} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Biểu thức số học cơ bản
                const a = Math.floor(Math.random()*5)+1;
                const b = Math.floor(Math.random()*5)+1;
                const a2 = a*a;
                const b2 = b*b;
                const text = `Giá trị của biểu thức \\( \\sqrt{${a2}} + \\sqrt{${b2}} \\) bằng:`;
                const ans = `${a + b}`;
                const wrong1 = `${a + b + 1}`;
                const wrong2 = `${Math.abs(a - b)}`;
                const wrong3 = `${a * b}`;
                
                const exp = `Ta có: \\( \\sqrt{${a2}} = ${a} \\) và \\( \\sqrt{${b2}} = ${b} \\).
Vậy \\( \\sqrt{${a2}} + \\sqrt{${b2}} = ${a} + ${b} = ${a+b} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b7_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // Điều kiện xác định ax + b >= 0
                const a = Math.floor(Math.random()*4)+2;
                const b = Math.floor(Math.random()*10)+1;
                const sign = Math.random() > 0.5 ? 1 : -1;
                const a_signed = a * sign;
                
                const text = `Biểu thức \\( \\sqrt{${a_signed}x + ${b}} \\) xác định khi:`;
                
                let ans, wrong1, wrong2, wrong3, exp;
                if (a_signed > 0) {
                    ans = `\\( x \\geq \\frac{-${b}}{${a}} \\)`;
                    wrong1 = `\\( x \\leq \\frac{-${b}}{${a}} \\)`;
                    wrong2 = `\\( x \\geq \\frac{${b}}{${a}} \\)`;
                    wrong3 = `\\( x \\leq \\frac{${b}}{${a}} \\)`;
                    exp = `Biểu thức chứa căn xác định khi biểu thức dưới dấu căn không âm:
\\( ${a_signed}x + ${b} \\geq 0 \\Leftrightarrow ${a_signed}x \\geq -${b} \\Leftrightarrow x \\geq \\frac{-${b}}{${a}} \\).`;
                } else {
                    const a_abs = Math.abs(a_signed);
                    ans = `\\( x \\leq \\frac{${b}}{${a_abs}} \\)`;
                    wrong1 = `\\( x \\geq \\frac{${b}}{${a_abs}} \\)`;
                    wrong2 = `\\( x \\leq \\frac{-${b}}{${a_abs}} \\)`;
                    wrong3 = `\\( x \\geq \\frac{-${b}}{${a_abs}} \\)`;
                    exp = `Biểu thức chứa căn xác định khi biểu thức dưới dấu căn không âm:
\\( ${a_signed}x + ${b} \\geq 0 \\Leftrightarrow ${a_signed}x \\geq -${b} \\).
Chia hai vế cho số âm ${a_signed}, ta đổi chiều bất phương trình:
\\( x \\leq \\frac{-${b}}{${a_signed}} \\Leftrightarrow x \\leq \\frac{${b}}{${a_abs}} \\).`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Điều kiện xác định ở mẫu: 1 / sqrt(ax + b) => ax + b > 0
                const a = Math.floor(Math.random()*3)+2;
                const b = Math.floor(Math.random()*10)+1;
                
                const text = `Điều kiện xác định của biểu thức \\( \\frac{1}{\\sqrt{${a}x - ${b}}} \\) là:`;
                
                const ans = `\\( x > \\frac{${b}}{${a}} \\)`;
                const wrong1 = `\\( x \\geq \\frac{${b}}{${a}} \\)`;
                const wrong2 = `\\( x < \\frac{${b}}{${a}} \\)`;
                const wrong3 = `\\( x \\neq \\frac{${b}}{${a}} \\)`;
                
                const exp = `Biểu thức \\( \\frac{1}{\\sqrt{A}} \\) xác định khi biểu thức dưới dấu căn dương (vì nằm dưới mẫu số):
\\( ${a}x - ${b} > 0 \\Leftrightarrow ${a}x > ${b} \\Leftrightarrow x > \\frac{${b}}{${a}} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Tính giá trị biểu thức
                const a = Math.floor(Math.random()*5)+1;
                const b = Math.floor(Math.random()*5)+1;
                const x = Math.floor(Math.random()*3)+1;
                // sqrt(a x^2 + b)
                const inner = a*x*x + b;
                // make inner a perfect square by picking b carefully
                const sq = Math.floor(Math.sqrt(inner)) + 1;
                const b_adj = sq*sq - a*x*x;
                const final_b = Math.abs(b_adj) > 0 ? b_adj : 1;
                const final_sq = Math.sqrt(a*x*x + final_b);
                
                // If it's still not integer, fallback
                if (!Number.isInteger(final_sq)) {
                    // fallback to trivial
                    const base = Math.floor(Math.random()*5)+2;
                    const val = base*base;
                    const x_val = 2;
                    const a_val = val / 2; // could be float
                    const text = `Tính giá trị của biểu thức \\( \\sqrt{${val-1}x + 1} \\) tại \\( x = 1 \\)`;
                    const ans = `${base}`;
                    const opts = this.shuffle([ans, `${base+1}`, `${base-1}`, `${base*2}`]);
                    const exp = `Thay \\( x = 1 \\) vào biểu thức: \\( \\sqrt{${val-1}(1) + 1} = \\sqrt{${val}} = ${base} \\).`;
                    q.push({ id: 'b7_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
                } else {
                    const text = `Tính giá trị của biểu thức \\( \\sqrt{${a}x^2 + ${final_b}} \\) tại \\( x = ${x} \\)`;
                    const ans = `${final_sq}`;
                    const wrong1 = `${final_sq + 1}`;
                    const wrong2 = `${final_sq - 1}`;
                    const wrong3 = `${final_sq * 2}`;
                    const exp = `Thay \\( x = ${x} \\) vào biểu thức, ta được:
\\( \\sqrt{${a}(${x})^2 + ${final_b}} = \\sqrt{${a*x*x} + ${final_b}} = \\sqrt{${final_sq*final_sq}} = ${final_sq} \\).`;
                    const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                    q.push({ id: 'b7_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
                }
            }
        }
        return q;
    },
    b7_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                // Rút gọn sqrt((a - sqrt(b))^2)
                const a = Math.floor(Math.random()*3)+2; // 2, 3, 4
                const b = Math.floor(Math.random()*10)+5; // 5 to 14
                
                // Compare a and sqrt(b)
                const is_a_bigger = a*a > b;
                const text = `Rút gọn biểu thức \\( \\sqrt{(${a} - \\sqrt{${b}})^2} \\)`;
                
                let ans, wrong1, wrong2, wrong3, exp;
                if (is_a_bigger) {
                    ans = `\\( ${a} - \\sqrt{${b}} \\)`;
                    wrong1 = `\\( \\sqrt{${b}} - ${a} \\)`;
                    wrong2 = `\\( ${a} + \\sqrt{${b}} \\)`;
                    wrong3 = `\\( ${a*a} - ${b} \\)`;
                    exp = `Áp dụng hằng đẳng thức \\( \\sqrt{A^2} = |A| \\):
\\( \\sqrt{(${a} - \\sqrt{${b}})^2} = |${a} - \\sqrt{${b}}| \\).
Vì \\( ${a} = \\sqrt{${a*a}} > \\sqrt{${b}} \\) nên \\( ${a} - \\sqrt{${b}} > 0 \\).
Do đó \\( |${a} - \\sqrt{${b}}| = ${a} - \\sqrt{${b}} \\).`;
                } else {
                    ans = `\\( \\sqrt{${b}} - ${a} \\)`;
                    wrong1 = `\\( ${a} - \\sqrt{${b}} \\)`;
                    wrong2 = `\\( ${a} + \\sqrt{${b}} \\)`;
                    wrong3 = `\\( ${b} - ${a*a} \\)`;
                    exp = `Áp dụng hằng đẳng thức \\( \\sqrt{A^2} = |A| \\):
\\( \\sqrt{(${a} - \\sqrt{${b}})^2} = |${a} - \\sqrt{${b}}| \\).
Vì \\( ${a} = \\sqrt{${a*a}} < \\sqrt{${b}} \\) nên \\( ${a} - \\sqrt{${b}} < 0 \\).
Do đó \\( |${a} - \\sqrt{${b}}| = \\sqrt{${b}} - ${a} \\).`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // sqrt((sqrt(a) - sqrt(b))^2) + sqrt(a)
                const a = Math.floor(Math.random()*5)+2; 
                let b = Math.floor(Math.random()*5)+2;
                if (a===b) b++;
                
                const is_a_bigger = a > b;
                const text = `Tính giá trị biểu thức \\( \\sqrt{(\\sqrt{${a}} - \\sqrt{${b}})^2} + \\sqrt{${b}} \\)`;
                
                let ans, wrong1, wrong2, wrong3, exp;
                if (is_a_bigger) { // sqrt(a) - sqrt(b) > 0
                    ans = `\\( \\sqrt{${a}} \\)`;
                    wrong1 = `\\( \\sqrt{${a}} + 2\\sqrt{${b}} \\)`;
                    wrong2 = `\\( -\\sqrt{${a}} \\)`;
                    wrong3 = `\\( \\sqrt{${a}} - 2\\sqrt{${b}} \\)`;
                    exp = `Ta có: \\( \\sqrt{(\\sqrt{${a}} - \\sqrt{${b}})^2} = |\\sqrt{${a}} - \\sqrt{${b}}| \\).
Vì \\( ${a} > ${b} \\) nên \\( \\sqrt{${a}} > \\sqrt{${b}} \\), do đó \\( |\\sqrt{${a}} - \\sqrt{${b}}| = \\sqrt{${a}} - \\sqrt{${b}} \\).
Biểu thức ban đầu trở thành: \\( (\\sqrt{${a}} - \\sqrt{${b}}) + \\sqrt{${b}} = \\sqrt{${a}} \\).`;
                } else { // sqrt(a) - sqrt(b) < 0
                    ans = `\\( 2\\sqrt{${b}} - \\sqrt{${a}} \\)`;
                    wrong1 = `\\( \\sqrt{${a}} \\)`;
                    wrong2 = `\\( -\\sqrt{${a}} \\)`;
                    wrong3 = `\\( 2\\sqrt{${b}} + \\sqrt{${a}} \\)`;
                    exp = `Ta có: \\( \\sqrt{(\\sqrt{${a}} - \\sqrt{${b}})^2} = |\\sqrt{${a}} - \\sqrt{${b}}| \\).
Vì \\( ${a} < ${b} \\) nên \\( \\sqrt{${a}} < \\sqrt{${b}} \\), do đó \\( |\\sqrt{${a}} - \\sqrt{${b}}| = \\sqrt{${b}} - \\sqrt{${a}} \\).
Biểu thức ban đầu trở thành: \\( (\\sqrt{${b}} - \\sqrt{${a}}) + \\sqrt{${b}} = 2\\sqrt{${b}} - \\sqrt{${a}} \\).`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // sqrt(A + B sqrt(C)) +- sqrt(A - B sqrt(C))
                const Cs = [2, 3, 5, 6, 7];
                const C = Cs[Math.floor(Math.random() * Cs.length)];
                
                const y = Math.floor(Math.random() * 2) + 1; // 1 or 2
                const min_x = Math.ceil(y * Math.sqrt(C));
                const x = min_x + Math.floor(Math.random() * 2) + 1; // Ensure x > y*sqrt(C)
                
                const A = x*x + y*y*C;
                const B = 2*x*y;
                
                const isAdd = Math.random() > 0.5;
                const op = isAdd ? "+" : "-";
                
                let text, ans, wrong1, wrong2, wrong3, exp;
                if (isAdd) {
                    text = `Tính giá trị của biểu thức: \\( \\sqrt{${A} + ${B}\\sqrt{${C}}} + \\sqrt{${A} - ${B}\\sqrt{${C}}} \\)`;
                    ans = `${2*x}`;
                    wrong1 = `${2*x + 1}`;
                    wrong2 = `\\( 2\\sqrt{${C}} \\)`;
                    wrong3 = `\\( ${2*y}\\sqrt{${C}} \\)`;
                    exp = `Ta phân tích biểu thức dưới dấu căn thành hằng đẳng thức:
\\( ${A} + ${B}\\sqrt{${C}} = ${x*x} + 2 \\cdot ${x} \\cdot ${y}\\sqrt{${C}} + ${y*y*C} = (${x})^2 + 2 \\cdot ${x} \\cdot ${y}\\sqrt{${C}} + (${y}\\sqrt{${C}})^2 = (${x} + ${y}\\sqrt{${C}})^2 \\).
Tương tự: \\( ${A} - ${B}\\sqrt{${C}} = (${x} - ${y}\\sqrt{${C}})^2 \\).
Khi đó biểu thức trở thành:
\\( \\sqrt{(${x} + ${y}\\sqrt{${C}})^2} + \\sqrt{(${x} - ${y}\\sqrt{${C}})^2} = |${x} + ${y}\\sqrt{${C}}| + |${x} - ${y}\\sqrt{${C}}| \\).
Vì \\( ${x} > ${y}\\sqrt{${C}} \\) (do \\( ${x*x} > ${y*y*C} \\)), ta có \\( |${x} - ${y}\\sqrt{${C}}| = ${x} - ${y}\\sqrt{${C}} \\).
Vậy biểu thức bằng: \\( (${x} + ${y}\\sqrt{${C}}) + (${x} - ${y}\\sqrt{${C}}) = ${2*x} \\).`;
                } else {
                    text = `Tính giá trị của biểu thức: \\( \\sqrt{${A} + ${B}\\sqrt{${C}}} - \\sqrt{${A} - ${B}\\sqrt{${C}}} \\)`;
                    // (x + y sqrtC) - (x - y sqrtC) = 2 y sqrtC
                    let ansStr = `\\( ${2*y}\\sqrt{${C}} \\)`;
                    if (2*y === 1) ansStr = `\\( \\sqrt{${C}} \\)`;
                    ans = ansStr;
                    wrong1 = `\\( ${2*x} \\)`;
                    wrong2 = `\\( 2\\sqrt{${C}} \\)`;
                    wrong3 = `\\( -${2*y}\\sqrt{${C}} \\)`;
                    exp = `Ta phân tích biểu thức dưới dấu căn thành hằng đẳng thức:
\\( ${A} + ${B}\\sqrt{${C}} = ${x*x} + 2 \\cdot ${x} \\cdot ${y}\\sqrt{${C}} + ${y*y*C} = (${x})^2 + 2 \\cdot ${x} \\cdot ${y}\\sqrt{${C}} + (${y}\\sqrt{${C}})^2 = (${x} + ${y}\\sqrt{${C}})^2 \\).
Tương tự: \\( ${A} - ${B}\\sqrt{${C}} = (${x} - ${y}\\sqrt{${C}})^2 \\).
Khi đó biểu thức trở thành:
\\( \\sqrt{(${x} + ${y}\\sqrt{${C}})^2} - \\sqrt{(${x} - ${y}\\sqrt{${C}})^2} = |${x} + ${y}\\sqrt{${C}}| - |${x} - ${y}\\sqrt{${C}}| \\).
Vì \\( ${x} > ${y}\\sqrt{${C}} \\) (do \\( ${x*x} > ${y*y*C} \\)), ta có \\( |${x} - ${y}\\sqrt{${C}}| = ${x} - ${y}\\sqrt{${C}} \\).
Vậy biểu thức bằng: \\( (${x} + ${y}\\sqrt{${C}}) - (${x} - ${y}\\sqrt{${C}}) = ${2*y}\\sqrt{${C}} \\).`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b7_d4: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 4);
            if (type === 0) {
                // Rút gọn sqrt(a^2 x^2) với điều kiện x
                const a = Math.floor(Math.random()*4)+2;
                const a2 = a*a;
                const isLess = Math.random() > 0.5;
                const text = `Rút gọn biểu thức \\( \\sqrt{${a2}x^2} \\) với \\( x ${isLess ? '<' : '\\geq'} 0 \\):`;
                
                let ans, wrong1, wrong2, wrong3, exp;
                if (isLess) {
                    ans = `\\( -${a}x \\)`;
                    wrong1 = `\\( ${a}x \\)`;
                    wrong2 = `\\( ${a2}x \\)`;
                    wrong3 = `\\( -${a2}x \\)`;
                    exp = `Ta có \\( \\sqrt{${a2}x^2} = \\sqrt{(${a}x)^2} = |${a}x| \\).
Vì \\( x < 0 \\) nên \\( ${a}x < 0 \\), do đó \\( |${a}x| = -${a}x \\).`;
                } else {
                    ans = `\\( ${a}x \\)`;
                    wrong1 = `\\( -${a}x \\)`;
                    wrong2 = `\\( ${a2}x \\)`;
                    wrong3 = `\\( -${a2}x \\)`;
                    exp = `Ta có \\( \\sqrt{${a2}x^2} = \\sqrt{(${a}x)^2} = |${a}x| \\).
Vì \\( x \\geq 0 \\) nên \\( ${a}x \\geq 0 \\), do đó \\( |${a}x| = ${a}x \\).`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Rút gọn phân thức chứa căn
                const b = Math.floor(Math.random()*4)+1;
                const b2 = b*b;
                const b2_2 = 2*b;
                const isLess = Math.random() > 0.5;
                
                const text = `Rút gọn biểu thức \\( \\frac{\\sqrt{x^2 - ${b2_2}x + ${b2}}}{x - ${b}} \\) với \\( x ${isLess ? '<' : '>'} ${b} \\):`;
                
                let ans, wrong1, wrong2, wrong3, exp;
                if (isLess) {
                    ans = `-1`;
                    wrong1 = `1`;
                    wrong2 = `\\( x - ${b} \\)`;
                    wrong3 = `\\( -(x - ${b}) \\)`;
                    exp = `Tử số: \\( \\sqrt{x^2 - ${b2_2}x + ${b2}} = \\sqrt{(x - ${b})^2} = |x - ${b}| \\).
Vì \\( x < ${b} \\) nên \\( x - ${b} < 0 \\), do đó \\( |x - ${b}| = -(x - ${b}) \\).
Biểu thức trở thành: \\( \\frac{-(x - ${b})}{x - ${b}} = -1 \\).`;
                } else {
                    ans = `1`;
                    wrong1 = `-1`;
                    wrong2 = `\\( x - ${b} \\)`;
                    wrong3 = `\\( -(x - ${b}) \\)`;
                    exp = `Tử số: \\( \\sqrt{x^2 - ${b2_2}x + ${b2}} = \\sqrt{(x - ${b})^2} = |x - ${b}| \\).
Vì \\( x > ${b} \\) nên \\( x - ${b} > 0 \\), do đó \\( |x - ${b}| = x - ${b} \\).
Biểu thức trở thành: \\( \\frac{x - ${b}}{x - ${b}} = 1 \\).`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 2) {
                // Tính P = ax - sqrt(x^2 - 2bx + b^2) tại x = c
                const a = Math.floor(Math.random()*4) + 2; // 2 to 5
                const b = Math.floor(Math.random()*5) + 2; // 2 to 6
                
                const isLess = Math.random() > 0.5;
                let c;
                if (isLess) {
                    c = Math.floor(Math.random()*(b-1)); // 0 to b-1
                } else {
                    c = b + Math.floor(Math.random()*4) + 1; // b+1 to b+4
                }
                
                const b2_2 = 2*b;
                const b2 = b*b;
                const text = `Cho biểu thức \\( P = ${a}x - \\sqrt{x^2 - ${b2_2}x + ${b2}} \\). Tính giá trị của \\( P \\) khi \\( x = ${c} \\).`;
                
                let ans_val;
                let exp = `Ta có: \\( P = ${a}x - \\sqrt{(x - ${b})^2} = ${a}x - |x - ${b}| \\).\n`;
                if (c >= b) {
                    ans_val = a*c - (c - b);
                    exp += `Vì \\( x = ${c} \\geq ${b} \\) nên \\( x - ${b} \\geq 0 \\Rightarrow |x - ${b}| = x - ${b} \\).\n`;
                    exp += `Khi đó \\( P = ${a}x - (x - ${b}) = ${(a-1)}x + ${b} \\).\n`;
                    exp += `Thay \\( x = ${c} \\), ta được \\( P = ${(a-1)} \\cdot ${c} + ${b} = ${ans_val} \\).`;
                } else {
                    ans_val = a*c + (c - b);
                    exp += `Vì \\( x = ${c} < ${b} \\) nên \\( x - ${b} < 0 \\Rightarrow |x - ${b}| = -(x - ${b}) = ${b} - x \\).\n`;
                    exp += `Khi đó \\( P = ${a}x - (${b} - x) = ${(a+1)}x - ${b} \\).\n`;
                    exp += `Thay \\( x = ${c} \\), ta được \\( P = ${(a+1)} \\cdot ${c} - ${b} = ${ans_val} \\).`;
                }
                
                const ans = `${ans_val}`;
                const wrong1 = `${a*c - Math.abs(c - b) + 2}`;
                const wrong2 = `${a*c + Math.abs(c - b)}`;
                const wrong3 = `${a*c - Math.abs(c - b) - 2}`;
                
                // Ensure unique options
                const optSet = new Set([ans, wrong1, wrong2, wrong3]);
                while(optSet.size < 4) {
                    optSet.add(`${ans_val + Math.floor(Math.random()*10) + 1}`);
                }
                
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                q.push({ id: 'b7_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Giải phương trình Q = ax - sqrt(x^2 + 2bx + b^2) = d
                const a = Math.floor(Math.random()*3) + 2; // 2, 3, 4
                const b = Math.floor(Math.random()*5) + 1; // 1 to 5
                
                const b2_2 = 2*b;
                const b2 = b*b;
                
                // Pick a valid x1 >= -b
                // To avoid trivial x1 = 0, let's pick x1 > 0
                const x1 = Math.floor(Math.random()*5) + 1;
                const d = (a-1)*x1 - b;
                
                const text = `Cho biểu thức \\( Q = ${a}x - \\sqrt{x^2 + ${b2_2}x + ${b2}} \\). Tìm giá trị của \\( x \\) để \\( Q = ${d} \\).`;
                
                const fracStr = this.formatFraction ? this.formatFraction(d-b, a+1) : `${(d-b)/(a+1)}`;
                
                const exp = `Ta có: \\( Q = ${a}x - \\sqrt{(x + ${b})^2} = ${a}x - |x + ${b}| \\).
Ta phải xét hai trường hợp:
+ Nếu \\( x \\geq -${b} \\) thì \\( Q = ${a}x - (x + ${b}) = ${(a-1)}x - ${b} \\).
  Khi đó \\( Q = ${d} \\Rightarrow ${(a-1)}x - ${b} = ${d} \\Leftrightarrow ${(a-1)}x = ${d+b} \\Leftrightarrow x = ${x1} \\) (thỏa mãn \\( x \\geq -${b} \\)).
+ Nếu \\( x < -${b} \\) thì \\( Q = ${a}x + (x + ${b}) = ${(a+1)}x + ${b} \\).
  Khi đó \\( Q = ${d} \\Rightarrow ${(a+1)}x + ${b} = ${d} \\Leftrightarrow ${(a+1)}x = ${d-b} \\Leftrightarrow x = ${fracStr} \\) (không thỏa mãn \\( x < -${b} \\)).
Vậy \\( Q = ${d} \\) khi \\( x = ${x1} \\).`;
                
                const ans = `\\( x = ${x1} \\)`;
                const wrong1 = `\\( x = ${fracStr} \\)`;
                const wrong2 = `\\( x = ${x1 + 2} \\)`;
                const wrong3 = `\\( x = ${-x1} \\)`;
                
                // Ensure unique options
                const optArr = [ans, wrong1, wrong2, wrong3];
                const optSet = new Set(optArr);
                let counter = 1;
                while(optSet.size < 4) {
                    optSet.add(`\\( x = ${x1 + counter} \\)`);
                    counter++;
                }
                
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                q.push({ id: 'b7_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b7_d5: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                // Giải phương trình sqrt(x) = a
                const a = Math.floor(Math.random()*8)+2;
                const hasNegative = Math.random() > 0.7; // sometimes show sqrt(x) = -a
                
                if (hasNegative) {
                    const text = `Giải phương trình: \\( \\sqrt{x} = -${a} \\)`;
                    const ans = `Vô nghiệm`;
                    const wrong1 = `\\( x = ${a*a} \\)`;
                    const wrong2 = `\\( x = -${a*a} \\)`;
                    const wrong3 = `\\( x = ${a} \\)`;
                    const exp = `Vì \\( \\sqrt{x} \\geq 0 \\) với mọi \\( x \\geq 0 \\), nên phương trình \\( \\sqrt{x} = -${a} \\) vô nghiệm (số âm không thể là kết quả của căn bậc hai số học).`;
                    const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                    q.push({ id: 'b7_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
                } else {
                    const text = `Nghiệm của phương trình \\( \\sqrt{x} = ${a} \\) là:`;
                    const ans = `\\( x = ${a*a} \\)`;
                    const wrong1 = `\\( x = ${a} \\)`;
                    const wrong2 = `\\( x = \\pm ${a*a} \\)`;
                    const wrong3 = `\\( x = ${a*a*a} \\)`;
                    const exp = `Điều kiện: \\( x \\geq 0 \\).
Bình phương hai vế ta được: \\( (\\sqrt{x})^2 = ${a}^2 \\Leftrightarrow x = ${a*a} \\) (thỏa mãn).`;
                    const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                    q.push({ id: 'b7_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
                }
            } else {
                // So sánh a và sqrt(b)
                const a = Math.floor(Math.random()*5)+2;
                const b = a*a + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random()*3)+1);
                
                const text = `Không sử dụng máy tính, hãy chọn khẳng định đúng khi so sánh ${a} và \\( \\sqrt{${b}} \\):`;
                let ans, wrong1, wrong2, wrong3, exp;
                
                if (a*a > b) {
                    ans = `\\( ${a} > \\sqrt{${b}} \\)`;
                    wrong1 = `\\( ${a} < \\sqrt{${b}} \\)`;
                    wrong2 = `\\( ${a} = \\sqrt{${b}} \\)`;
                    wrong3 = `Không thể so sánh`;
                    exp = `Ta có \\( ${a} = \\sqrt{${a*a}} \\).
Vì \\( ${a*a} > ${b} \\) nên \\( \\sqrt{${a*a}} > \\sqrt{${b}} \\). Vậy \\( ${a} > \\sqrt{${b}} \\).`;
                } else {
                    ans = `\\( ${a} < \\sqrt{${b}} \\)`;
                    wrong1 = `\\( ${a} > \\sqrt{${b}} \\)`;
                    wrong2 = `\\( ${a} = \\sqrt{${b}} \\)`;
                    wrong3 = `Không thể so sánh`;
                    exp = `Ta có \\( ${a} = \\sqrt{${a*a}} \\).
Vì \\( ${a*a} < ${b} \\) nên \\( \\sqrt{${a*a}} < \\sqrt{${b}} \\). Vậy \\( ${a} < \\sqrt{${b}} \\).`;
                }
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b7_d6: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 4);
            if (type === 0) {
                // Rơi tự do s = 5t^2
                const t = Math.floor(Math.random()*5)+2; // 2 to 6
                const s = 5 * t * t;
                const text = `Quãng đường \\( s \\) (tính bằng mét) của một vật rơi tự do được cho bởi công thức \\( s = 5t^2 \\), trong đó \\( t \\) là thời gian rơi (tính bằng giây). Hỏi sau bao nhiêu giây thì vật chạm đất nếu được thả rơi từ độ cao ${s} mét?`;
                const ans = `${t} giây`;
                const wrong1 = `${t+1} giây`;
                const wrong2 = `${t-1} giây`;
                const wrong3 = `${t*t} giây`;
                const exp = `Thay \\( s = ${s} \\) vào công thức \\( s = 5t^2 \\), ta có:
\\( 5t^2 = ${s} \\Leftrightarrow t^2 = ${s/5} \\).
Vì thời gian \\( t > 0 \\) nên \\( t = \\sqrt{${s/5}} = ${t} \\) (giây).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // Hình vuông
                const base = Math.floor(Math.random()*10)+5; // 5 to 14
                const area = base * base;
                const text = `Một hình vuông có diện tích bằng ${area} \\( m^2 \\). Cạnh của hình vuông đó là bao nhiêu?`;
                const ans = `${base} m`;
                const wrong1 = `${base*2} m`;
                const wrong2 = `${base*base} m`;
                const wrong3 = `\\( \\pm ${base} \\) m`;
                const exp = `Gọi độ dài cạnh hình vuông là \\( a \\) (m) (\\( a > 0 \\)).
Diện tích hình vuông là \\( a^2 = ${area} \\).
Do \\( a > 0 \\) nên \\( a = \\sqrt{${area}} = ${base} \\) (m).
Lưu ý: Độ dài cạnh không thể là số âm nên loại trường hợp \\( -${base} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 2) {
                // Tốc độ tối đa
                const muOptions = [0.12, 0.15, 0.2];
                const mu = muOptions[Math.floor(Math.random() * muOptions.length)];
                // Choose r such that 10 * mu * r is a nice square if possible, or close to it
                // We want 10 * mu * r = v^2 => r = v^2 / (10 * mu)
                const v = Math.floor(Math.random()*10) + 15; // 15 to 24
                const r = Math.round(v * v / (10 * mu));
                
                // Actual calculated v
                const actual_v = Math.sqrt(10 * mu * r);
                const rounded_v = actual_v.toFixed(1);
                
                const text = `Tốc độ tối đa cho phép \\( v \\) (m/s) để lái xe an toàn qua đoạn đường vòng được tính bởi công thức \\( v = \\sqrt{10\\mu r} \\), trong đó \\( r \\) là bán kính cung đường (m), \\( \\mu \\) là hệ số ma sát. 
Tính tốc độ tối đa cho phép \\( v \\) khi đi qua cung đường có bán kính \\( r = ${r} \\) m và hệ số ma sát \\( \\mu = ${mu} \\) (làm tròn đến hàng phần mười).`;
                
                const ans = `${rounded_v} m/s`;
                const wrong1 = `${(actual_v + 1).toFixed(1)} m/s`;
                const wrong2 = `${(actual_v - 1).toFixed(1)} m/s`;
                const wrong3 = `${(actual_v * 2).toFixed(1)} m/s`;
                
                const exp = `Thay \\( r = ${r} \\) và \\( \\mu = ${mu} \\) vào công thức \\( v = \\sqrt{10\\mu r} \\), ta được:
\\( v = \\sqrt{10 \\times ${mu} \\times ${r}} = \\sqrt{${10 * mu * r}} \\approx ${rounded_v} \\) (m/s).`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Trạm phát sóng
                const d = Math.floor(Math.random()*4) + 3; // 3 to 6
                const x = Math.floor(Math.random()*4) + 4; // 4 to 7
                const s = Math.sqrt(d*d + x*x);
                const rounded_s = s.toFixed(1);
                
                const text = `Một trạm phát sóng được đặt ở vị trí \\( A \\) cách đường tàu thẳng một khoảng \\( ${d} \\) km. Đầu tàu đang ở vị trí \\( B \\), cách hình chiếu vuông góc của \\( A \\) trên đường tàu một khoảng \\( ${x} \\) km. 
Khoảng cách từ trạm phát sóng đến đầu tàu là bao nhiêu km? (làm tròn đến hàng phần mười nếu cần)`;
                
                const ans = `${Number.isInteger(s) ? s : rounded_s} km`;
                const wrong1 = `${d + x} km`;
                const wrong2 = `${Math.abs(d - x)} km`;
                const wrong3 = `${(s + 1).toFixed(1)} km`;
                
                const exp = `Khoảng cách từ trạm phát sóng đến đầu tàu là cạnh huyền của một tam giác vuông có hai cạnh góc vuông là ${d} km và ${x} km.
Áp dụng định lý Pythagore, khoảng cách đó biểu thị bởi: \\( \\sqrt{${d}^2 + ${x}^2} = \\sqrt{${d*d + x*x}} \\).
Giá trị tính được là \\( \\approx ${rounded_s} \\) km.`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b7_d7: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 4);
            if (type === 0) {
                // GTNN của sqrt(x - a) + b
                const a = Math.floor(Math.random()*5)+1;
                const b = Math.floor(Math.random()*10)+2;
                const text = `Giá trị nhỏ nhất của biểu thức \\( A = \\sqrt{x - ${a}} + ${b} \\) là:`;
                const ans = `${b}`;
                const wrong1 = `${b + a}`;
                const wrong2 = `${b - a}`;
                const wrong3 = `Không có giá trị nhỏ nhất`;
                const exp = `Điều kiện xác định: \\( x \\geq ${a} \\).
Với mọi \\( x \\geq ${a} \\), ta luôn có \\( \\sqrt{x - ${a}} \\geq 0 \\).
Do đó, \\( A = \\sqrt{x - ${a}} + ${b} \\geq 0 + ${b} = ${b} \\).
Dấu "=" xảy ra khi \\( x - ${a} = 0 \\Leftrightarrow x = ${a} \\).
Vậy giá trị nhỏ nhất của \\( A \\) là ${b}.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                // GTLN của b - sqrt(x + a)
                const a = Math.floor(Math.random()*5)+1;
                const b = Math.floor(Math.random()*10)+5;
                const text = `Giá trị lớn nhất của biểu thức \\( B = ${b} - \\sqrt{x + ${a}} \\) là:`;
                const ans = `${b}`;
                const wrong1 = `${b - a}`;
                const wrong2 = `${b + a}`;
                const wrong3 = `Không có giá trị lớn nhất`;
                const exp = `Điều kiện xác định: \\( x \\geq -${a} \\).
Với mọi \\( x \\geq -${a} \\), ta luôn có \\( \\sqrt{x + ${a}} \\geq 0 \\).
Do đó, \\( -\\sqrt{x + ${a}} \\leq 0 \\).
Cộng cả hai vế với ${b}, ta được \\( B = ${b} - \\sqrt{x + ${a}} \\leq ${b} - 0 = ${b} \\).
Dấu "=" xảy ra khi \\( x + ${a} = 0 \\Leftrightarrow x = -${a} \\).
Vậy giá trị lớn nhất của \\( B \\) là ${b}.`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 2) {
                // GTNN của sqrt(x^2 - 2mx + m^2 + k^2) + d
                const m = Math.floor(Math.random()*4) + 1;
                const k = Math.floor(Math.random()*4) + 1; // k^2 is the min of the quadratic
                const d = Math.floor(Math.random()*10) + 1;
                const sign_d = Math.random() > 0.5 ? 1 : -1;
                
                const b = -2 * m;
                const c = m*m + k*k;
                const d_str = sign_d > 0 ? `+ ${d}` : `- ${d}`;
                
                const text = `Tìm giá trị nhỏ nhất của biểu thức: \\( C = \\sqrt{x^2 ${b}x + ${c}} ${d_str} \\)`;
                
                const ans = `${k + sign_d * d}`;
                const wrong1 = `${c + sign_d * d}`;
                const wrong2 = `${k}`;
                const wrong3 = `Không có GTNN`;
                
                const exp = `Ta phân tích biểu thức dưới dấu căn:
\\( x^2 ${b}x + ${c} = x^2 - 2 \\cdot ${m} \\cdot x + ${m*m} + ${k*k} = (x - ${m})^2 + ${k*k} \\).
Vì \\( (x - ${m})^2 \\geq 0 \\) với mọi \\( x \\), nên \\( (x - ${m})^2 + ${k*k} \\geq ${k*k} \\).
Do đó \\( \\sqrt{x^2 ${b}x + ${c}} = \\sqrt{(x - ${m})^2 + ${k*k}} \\geq \\sqrt{${k*k}} = ${k} \\).
Suy ra: \\( C \\geq ${k} ${d_str} = ${ans} \\).
Dấu "=" xảy ra khi \\( x - ${m} = 0 \\Leftrightarrow x = ${m} \\).
Vậy giá trị nhỏ nhất của biểu thức là ${ans}.`;

                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // GTLN của d - sqrt(x^2 + 2mx + m^2 + k^2)
                const m = Math.floor(Math.random()*4) + 1;
                const k = Math.floor(Math.random()*4) + 1; // k^2 is the min of the quadratic
                const d = Math.floor(Math.random()*10) + 5;
                
                const b = 2 * m;
                const c = m*m + k*k;
                
                const text = `Tìm giá trị lớn nhất của biểu thức: \\( D = ${d} - \\sqrt{x^2 + ${b}x + ${c}} \\)`;
                
                const ans = `${d - k}`;
                const wrong1 = `${d - c}`;
                const wrong2 = `${d + k}`;
                const wrong3 = `Không có GTLN`;
                
                const exp = `Ta phân tích biểu thức dưới dấu căn:
\\( x^2 + ${b}x + ${c} = x^2 + 2 \\cdot ${m} \\cdot x + ${m*m} + ${k*k} = (x + ${m})^2 + ${k*k} \\).
Vì \\( (x + ${m})^2 \\geq 0 \\) với mọi \\( x \\), nên \\( (x + ${m})^2 + ${k*k} \\geq ${k*k} \\).
Do đó \\( \\sqrt{x^2 + ${b}x + ${c}} = \\sqrt{(x + ${m})^2 + ${k*k}} \\geq \\sqrt{${k*k}} = ${k} \\).
Vì vậy \\( D = ${d} - \\sqrt{x^2 + ${b}x + ${c}} \\leq ${d} - ${k} = ${ans} \\).
Dấu "=" xảy ra khi \\( x + ${m} = 0 \\Leftrightarrow x = -${m} \\).
Vậy giá trị lớn nhất của biểu thức là ${ans}.`;

                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b7_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b8_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                // Tính sqrt(a^2 * b^2)
                const a = Math.floor(Math.random()*9)+2;
                const b = Math.floor(Math.random()*9)+2;
                const a2 = a*a;
                const b2 = b*b;
                const text = `Tính giá trị của biểu thức: \\( \\sqrt{${a2} \\cdot ${b2}} \\)`;
                const ans = `${a*b}`;
                const exp = `Áp dụng quy tắc khai phương một tích: \\( \\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b} \\).
Ta có: \\( \\sqrt{${a2} \\cdot ${b2}} = \\sqrt{${a2}} \\cdot \\sqrt{${b2}} = ${a} \\cdot ${b} = ${a*b} \\).`;
                const opts = this.shuffle([ans, `${a*b + 1}`, `${a+b}`, `${a*b - 1}`]);
                q.push({ id: 'b8_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // Tính sqrt(a^2 * b^4)
                const a = Math.floor(Math.random()*5)+2;
                const b = Math.floor(Math.random()*3)+2;
                const a2 = a*a;
                const b4 = b*b*b*b;
                const text = `Tính giá trị của biểu thức: \\( \\sqrt{${a2} \\cdot ${b4}} \\)`;
                const ans = `${a*b*b}`;
                const exp = `Áp dụng quy tắc khai phương một tích:
\\( \\sqrt{${a2} \\cdot ${b4}} = \\sqrt{${a2}} \\cdot \\sqrt{${b4}} = \\sqrt{${a}^2} \\cdot \\sqrt{(${b*b})^2} = ${a} \\cdot ${b*b} = ${a*b*b} \\).`;
                const opts = this.shuffle([ans, `${a*b*b + 2}`, `${a*b}`, `${a*b*b*b}`]);
                q.push({ id: 'b8_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b8_d2: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            if (i === 0) types.push(1);
            else if (i === 1) types.push(2);
            else types.push(Math.floor(Math.random() * 3));
        }
        types = this.shuffle(types);

        for(let i=0; i<count; i++) {
            const type = types[i];
            if (type === 0) {
                const f1 = Math.floor(Math.random()*4)+2;
                const f2 = Math.floor(Math.random()*4)+2;
                const f3 = Math.floor(Math.random()*3)+2;
                const n1 = f1 * f3;
                const n2 = f2 * f2 * f1 * f3;
                const text = `Tính giá trị của phép nhân: \\( \\sqrt{${n1}} \\cdot \\sqrt{${n2}} \\)`;
                const ans_val = f1 * f2 * f3;
                const exp = `Áp dụng quy tắc nhân các căn bậc hai: \\( \\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{a \\cdot b} \\).
Ta có: \\( \\sqrt{${n1}} \\cdot \\sqrt{${n2}} = \\sqrt{${n1} \\cdot ${n2}} = \\sqrt{${n1 * n2}} = \\sqrt{${ans_val * ans_val}} = ${ans_val} \\).`;
                const opts = this.shuffle([`${ans_val}`, `${ans_val+2}`, `${ans_val-2}`, `${ans_val*2}`]);
                q.push({ id: 'b8_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(`${ans_val}`), explanation: exp });
            } else if (type === 1) {
                // (sqrt(A) +/- sqrt(B))^2
                const c_vals = [2, 3, 5];
                const c = c_vals[Math.floor(Math.random() * c_vals.length)];
                let x = Math.floor(Math.random()*3)+1; // 1, 2, 3
                let y = Math.floor(Math.random()*3)+1;
                while (x === y) {
                    y = Math.floor(Math.random()*3)+1;
                }
                const A = x * x * c;
                const B = y * y * c;
                const isPlus = Math.random() > 0.5;
                const sign = isPlus ? '+' : '-';
                
                const text = `Thực hiện phép tính: \\( (\\sqrt{${A}} ${sign} \\sqrt{${B}})^2 \\)`;
                
                const term1 = A;
                const term2 = B;
                const cross = 2 * Math.sqrt(A * B);
                const ans_val = isPlus ? (term1 + term2 + cross) : (term1 + term2 - cross);
                
                const exp = `Khai triển hằng đẳng thức \\( (a \\pm b)^2 = a^2 \\pm 2ab + b^2 \\):
\\( (\\sqrt{${A}} ${sign} \\sqrt{${B}})^2 = (\\sqrt{${A}})^2 ${sign} 2\\sqrt{${A}}\\sqrt{${B}} + (\\sqrt{${B}})^2 \\)
\\( = ${A} ${sign} 2\\sqrt{${A * B}} + ${B} \\)
\\( = ${A + B} ${sign} 2 \\cdot ${cross / 2} = ${A + B} ${sign} ${cross} = ${ans_val} \\).`;
                
                const ansStr = `${ans_val}`;
                const optSet = new Set([ansStr, `${ans_val + 2}`, `${ans_val - 2}`, `${Math.abs(term1 - term2)}`]);
                while (optSet.size < 4) optSet.add(`${ans_val + Math.floor(Math.random()*10)+1}`);
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                
                q.push({ id: 'b8_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                // (x sqrt(a) - y sqrt(b))(x sqrt(a) + y sqrt(b))
                const x = Math.floor(Math.random()*4)+2; // 2 to 5
                const y = Math.floor(Math.random()*4)+2;
                const primes = [2, 3, 5, 7];
                const a = primes[Math.floor(Math.random()*4)];
                let b = primes[Math.floor(Math.random()*4)];
                while (a === b) {
                    b = primes[Math.floor(Math.random()*4)];
                }
                
                const text = `Thực hiện phép tính: \\( (${x}\\sqrt{${a}} - ${y}\\sqrt{${b}})(${x}\\sqrt{${a}} + ${y}\\sqrt{${b}}) \\)`;
                
                const term1 = x * x * a;
                const term2 = y * y * b;
                const ans_val = term1 - term2;
                
                const exp = `Áp dụng hằng đẳng thức \\( (A - B)(A + B) = A^2 - B^2 \\):
\\( (${x}\\sqrt{${a}} - ${y}\\sqrt{${b}})(${x}\\sqrt{${a}} + ${y}\\sqrt{${b}}) = (${x}\\sqrt{${a}})^2 - (${y}\\sqrt{${b}})^2 \\)
\\( = ${x*x} \\cdot ${a} - ${y*y} \\cdot ${b} = ${term1} - ${term2} = ${ans_val} \\).`;
                
                const ansStr = `${ans_val}`;
                const optSet = new Set([ansStr, `${ans_val + 2}`, `${-ans_val}`, `${term1 + term2}`]);
                while (optSet.size < 4) optSet.add(`${ans_val + Math.floor(Math.random()*10)+1}`);
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                
                q.push({ id: 'b8_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b8_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*10)+2;
            const b = Math.floor(Math.random()*10)+2;
            const a2 = a*a;
            const b2 = b*b;
            const text = `Tính giá trị của biểu thức: \\( \\sqrt{\\frac{${a2}}{${b2}}} \\)`;
            
            const fracStr = this.formatFraction ? this.formatFraction(a, b) : `${a}/${b}`;
            const wrong1 = this.formatFraction ? this.formatFraction(a+1, b) : `${a+1}/${b}`;
            const wrong2 = this.formatFraction ? this.formatFraction(a, b+1) : `${a}/${b+1}`;
            const wrong3 = this.formatFraction ? this.formatFraction(b, a) : `${b}/${a}`;
            
            const exp = `Áp dụng quy tắc khai phương một thương: \\( \\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}} \\).
Ta có: \\( \\sqrt{\\frac{${a2}}{${b2}}} = \\frac{\\sqrt{${a2}}}{\\sqrt{${b2}}} = \\frac{${a}}{${b}} = ${fracStr} \\).`;
            
            const optArr = [fracStr, wrong1, wrong2, wrong3];
            const optSet = new Set(optArr);
            let c = 2;
            while(optSet.size < 4) {
                optSet.add(this.formatFraction ? this.formatFraction(a+c, b) : `${a+c}/${b}`);
                c++;
            }
            const opts = this.shuffle(Array.from(optSet).slice(0, 4));
            q.push({ id: 'b8_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(fracStr), explanation: exp });
        }
        return q;
    },
    b8_d4: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            if (i < 2) types.push(1); // ensure at least 2 questions are type 1
            else types.push(0);
        }
        types = this.shuffle(types);

        for(let i=0; i<count; i++) {
            const type = types[i];
            if (type === 0) {
                const b = Math.floor(Math.random()*5)+2;
                const ans = Math.floor(Math.random()*8)+2;
                const a = ans * ans * b;
                
                const text = `Tính giá trị của biểu thức: \\( \\frac{\\sqrt{${a}}}{\\sqrt{${b}}} \\)`;
                const exp = `Áp dụng quy tắc chia các căn bậc hai: \\( \\frac{\\sqrt{A}}{\\sqrt{B}} = \\sqrt{\\frac{A}{B}} \\).
Ta có: \\( \\frac{\\sqrt{${a}}}{\\sqrt{${b}}} = \\sqrt{\\frac{${a}}{${b}}} = \\sqrt{${ans*ans}} = ${ans} \\).`;
                
                const ansStr = `${ans}`;
                const opts = this.shuffle([ansStr, `${ans+1}`, `${ans-1}`, `${ans*2}`]);
                q.push({ id: 'b8_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const D_vals = [2, 3, 5];
                const D = D_vals[Math.floor(Math.random() * D_vals.length)];
                
                const s1 = Math.floor(Math.random() * 4) + 2;
                const s2 = Math.floor(Math.random() * 4) + 2;
                const s3 = Math.floor(Math.random() * 4) + 1;
                
                const A = s1 * s1 * D;
                const B = s2 * s2 * D;
                const C = s3 * s3 * D;
                
                const c1 = Math.floor(Math.random() * 3) + 1;
                const c2 = Math.floor(Math.random() * 3) + 1;
                const c3 = Math.floor(Math.random() * 4) + 1;
                
                const c1_str = c1 === 1 ? '' : c1;
                const c2_str = c2 === 1 ? '' : c2;
                const c3_str = c3 === 1 ? '' : c3;
                
                const sign2 = Math.random() > 0.5 ? '+' : '-';
                const sign3 = Math.random() > 0.5 ? '+' : '-';
                
                const text = `Thực hiện phép tính: \\( (${c1_str}\\sqrt{${A}} ${sign2} ${c2_str}\\sqrt{${B}} ${sign3} ${c3_str}\\sqrt{${C}}) : \\sqrt{${D}} \\)`;
                
                const t1_val = c1 * s1;
                const t2_val = c2 * s2;
                const t3_val = c3 * s3;
                
                let ans_val = t1_val;
                ans_val += sign2 === '+' ? t2_val : -t2_val;
                ans_val += sign3 === '+' ? t3_val : -t3_val;
                
                const step3_1 = c1 === 1 ? `${s1}` : `${c1} \\cdot ${s1}`;
                const step3_2 = c2 === 1 ? `${s2}` : `${c2} \\cdot ${s2}`;
                const step3_3 = c3 === 1 ? `${s3}` : `${c3} \\cdot ${s3}`;
                
                const exp = `Áp dụng quy tắc chia các căn bậc hai:
\\( (${c1_str}\\sqrt{${A}} ${sign2} ${c2_str}\\sqrt{${B}} ${sign3} ${c3_str}\\sqrt{${C}}) : \\sqrt{${D}} \\)
\\( = ${c1_str}\\sqrt{\\frac{${A}}{${D}}} ${sign2} ${c2_str}\\sqrt{\\frac{${B}}{${D}}} ${sign3} ${c3_str}\\sqrt{\\frac{${C}}{${D}}} \\)
\\( = ${c1_str}\\sqrt{${s1*s1}} ${sign2} ${c2_str}\\sqrt{${s2*s2}} ${sign3} ${c3_str}\\sqrt{${s3*s3}} \\)
\\( = ${step3_1} ${sign2} ${step3_2} ${sign3} ${step3_3} \\)
\\( = ${t1_val} ${sign2} ${t2_val} ${sign3} ${t3_val} = ${ans_val} \\).`;

                const ansStr = `${ans_val}`;
                const optSet = new Set([ansStr, `${ans_val+2}`, `${ans_val-2}`, `${ans_val+5}`]);
                while (optSet.size < 4) optSet.add(`${ans_val + Math.floor(Math.random()*10)+1}`);
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                
                q.push({ id: 'b8_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b8_d5: function(count=5) {
        const q = [];
        for (let i = 0; i < count; i++) {
            const type = (i % 2 === 0) ? 1 : 2; 
            if (type === 1) {
                const primes = [2, 3, 5, 7, 11];
                let p1 = primes[Math.floor(Math.random()*primes.length)];
                let p2 = primes[Math.floor(Math.random()*primes.length)];
                while(p1 === p2) p2 = primes[Math.floor(Math.random()*primes.length)];
                
                const k_vals = [2, 3, 4, 5, 6, 7, 8, 9, 10];
                let k1 = k_vals[Math.floor(Math.random()*k_vals.length)];
                let k2 = k_vals[Math.floor(Math.random()*k_vals.length)];
                while(k1 === k2) k2 = k_vals[Math.floor(Math.random()*k_vals.length)];
                
                const sign = Math.random() > 0.5 ? '+' : '-';
                const isFlipped = sign === '-' && Math.random() > 0.5; 
                
                const num1 = k1 * p1, num2 = k1 * p2;
                let den1, den2;
                if (isFlipped) {
                    den1 = k2 * p2; den2 = k2 * p1;
                } else {
                    den1 = k2 * p1; den2 = k2 * p2;
                }
                
                const text = `Rút gọn biểu thức: \\( \\frac{\\sqrt{${num1}} ${sign} \\sqrt{${num2}}}{\\sqrt{${den1}} ${sign} \\sqrt{${den2}}} \\)`;
                
                let ansSign = isFlipped ? '-' : '';
                
                let num_ins = k1 * k2;
                let den_out = k2;
                let extract = 1;
                for (let sq = 10; sq >= 2; sq--) {
                    if (num_ins % (sq * sq) === 0) {
                        extract = sq;
                        num_ins = num_ins / (sq * sq);
                        break;
                    }
                }
                const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
                const g = gcd(extract, den_out);
                const ex_simp = extract / g;
                const den_simp = den_out / g;
                
                let rawAns = '';
                if (num_ins === 1) { 
                    if (den_simp === 1) rawAns = `${ansSign}${ex_simp}`;
                    else rawAns = `${ansSign}\\frac{${ex_simp}}{${den_simp}}`;
                } else {
                    let topStr = ex_simp === 1 ? `\\sqrt{${num_ins}}` : `${ex_simp}\\sqrt{${num_ins}}`;
                    if (den_simp === 1) rawAns = `${ansSign}${topStr}`;
                    else rawAns = `${ansSign}\\frac{${topStr}}{${den_simp}}`;
                }
                
                if (rawAns === '' || rawAns === '-') rawAns = rawAns + '1';
                let ansStr = `\\( ${rawAns} \\)`;
                
                const k1_root = Math.sqrt(k1) === Math.floor(Math.sqrt(k1)) ? `${Math.sqrt(k1)}` : `\\sqrt{${k1}}`;
                const k2_root = Math.sqrt(k2) === Math.floor(Math.sqrt(k2)) ? `${Math.sqrt(k2)}` : `\\sqrt{${k2}}`;
                
                let p_part = `(\\sqrt{${p1}} ${sign} \\sqrt{${p2}})`;
                let den_p_part = isFlipped ? `(\\sqrt{${p2}} ${sign} \\sqrt{${p1}})` : `(\\sqrt{${p1}} ${sign} \\sqrt{${p2}})`;
                
                let exp = `Ta có: \\( \\frac{\\sqrt{${num1}} ${sign} \\sqrt{${num2}}}{\\sqrt{${den1}} ${sign} \\sqrt{${den2}}} = \\frac{${k1_root}\\sqrt{${p1}} ${sign} ${k1_root}\\sqrt{${p2}}}{${k2_root}\\sqrt{${isFlipped ? p2 : p1}} ${sign} ${k2_root}\\sqrt{${isFlipped ? p1 : p2}}} \\)
\\( = \\frac{${k1_root}${p_part}}{${k2_root}${den_p_part}} \\)`;
                
                if (isFlipped) {
                    exp += `\nĐổi dấu mẫu số: \\( ${den_p_part} = -${p_part} \\).
\\( \\Rightarrow \\frac{${k1_root}${p_part}}{-${k2_root}${p_part}} = -\\frac{${k1_root}}{${k2_root}} = -\\sqrt{\\frac{${k1}}{${k2}}} = ${rawAns} \\).`;
                } else {
                    exp += `\n\\( = \\frac{${k1_root}}{${k2_root}} = \\sqrt{\\frac{${k1}}{${k2}}} = ${rawAns} \\).`;
                }

                const optSet = new Set([ansStr]);
                while(optSet.size < 4) {
                    let rf_top = Math.floor(Math.random()*5)+1;
                    let rf_bot = Math.floor(Math.random()*4)+2;
                    let rf_in = primes[Math.floor(Math.random()*primes.length)];
                    let str = `\\frac{${rf_top === 1 ? '' : rf_top}\\sqrt{${rf_in}}}{${rf_bot}}`;
                    if (Math.random() > 0.5) str = '-' + str;
                    optSet.add(`\\( ${str} \\)`);
                }
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                q.push({ id: 'b8_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const primes = [2, 3, 5, 7];
                const sp = this.shuffle([...primes]);
                const p1 = sp[0], p2 = sp[1], p3 = sp[2];
                
                const x = Math.floor(Math.random()*3)+1;
                const y = Math.floor(Math.random()*3)+1;
                const z = Math.floor(Math.random()*3)+1;
                
                const k1 = Math.floor(Math.random()*4)+2; 
                let k2 = Math.floor(Math.random()*4)+2;
                while(k1 === k2) k2 = Math.floor(Math.random()*4)+2;
                
                const sign1 = Math.random() > 0.5 ? '+' : '-';
                const sign2 = Math.random() > 0.5 ? '+' : '-';
                
                const nA = k1*k1*p1, nB = k1*k1*p2, nC = k1*k1*p3;
                const dA = k2*k2*p1, dB = k2*k2*p2, dC = k2*k2*p3;
                
                const x_str = x === 1 ? '' : x;
                const y_str = y === 1 ? '' : y;
                const z_str = z === 1 ? '' : z;
                
                const text = `Rút gọn biểu thức: \\( \\frac{${x_str}\\sqrt{${nA}} ${sign1} ${y_str}\\sqrt{${nB}} ${sign2} ${z_str}\\sqrt{${nC}}}{${x_str}\\sqrt{${dA}} ${sign1} ${y_str}\\sqrt{${dB}} ${sign2} ${z_str}\\sqrt{${dC}}} \\)`;
                
                const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
                const g = gcd(k1, k2);
                let rawAns = '';
                if (k2/g === 1) rawAns = `${k1/g}`;
                else rawAns = `\\frac{${k1/g}}{${k2/g}}`;
                let ansStr = `\\( ${rawAns} \\)`;
                
                const k1x = k1 * x, k1y = k1 * y, k1z = k1 * z;
                const k2x = k2 * x, k2y = k2 * y, k2z = k2 * z;
                
                const exp = `Đưa thừa số ra ngoài dấu căn ở tử và mẫu:
Tử số: \\( ${x_str}\\sqrt{${nA}} ${sign1} ${y_str}\\sqrt{${nB}} ${sign2} ${z_str}\\sqrt{${nC}} \\)
\\( = ${k1x}\\sqrt{${p1}} ${sign1} ${k1y}\\sqrt{${p2}} ${sign2} ${k1z}\\sqrt{${p3}} \\)
\\( = ${k1}(${x === 1 ? '' : x}\\sqrt{${p1}} ${sign1} ${y === 1 ? '' : y}\\sqrt{${p2}} ${sign2} ${z === 1 ? '' : z}\\sqrt{${p3}}) \\).

Mẫu số: \\( ${x_str}\\sqrt{${dA}} ${sign1} ${y_str}\\sqrt{${dB}} ${sign2} ${z_str}\\sqrt{${dC}} \\)
\\( = ${k2x}\\sqrt{${p1}} ${sign1} ${k2y}\\sqrt{${p2}} ${sign2} ${k2z}\\sqrt{${p3}} \\)
\\( = ${k2}(${x === 1 ? '' : x}\\sqrt{${p1}} ${sign1} ${y === 1 ? '' : y}\\sqrt{${p2}} ${sign2} ${z === 1 ? '' : z}\\sqrt{${p3}}) \\).

Rút gọn cả tử và mẫu cho phần chung, ta được:
\\( \\frac{${k1}}{${k2}} = ${rawAns} \\).`;

                const optSet = new Set([ansStr]);
                while(optSet.size < 4) {
                    let rf_top = Math.floor(Math.random()*5)+1;
                    let rf_bot = Math.floor(Math.random()*4)+2;
                    let g2 = gcd(rf_top, rf_bot);
                    if (rf_bot/g2 === 1) optSet.add(`\\( ${rf_top/g2} \\)`);
                    else optSet.add(`\\( \\frac{${rf_top/g2}}{${rf_bot/g2}} \\)`);
                }
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                q.push({ id: 'b8_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b8_d6: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 3);
        }
        types = this.shuffle(types);

        for(let i=0; i<count; i++) {
            const type = types[i];
            if (type === 0) {
                const A = Math.floor(Math.random()*100)+2000;
                const text = `So sánh \\( \\sqrt{${A-1}} \\cdot \\sqrt{${A+1}} \\) và \\( ${A} \\), khẳng định nào sau đây là đúng?`;
                const ans = `\\( \\sqrt{${A-1}} \\cdot \\sqrt{${A+1}} < ${A} \\)`;
                const wrong1 = `\\( \\sqrt{${A-1}} \\cdot \\sqrt{${A+1}} > ${A} \\)`;
                const wrong2 = `\\( \\sqrt{${A-1}} \\cdot \\sqrt{${A+1}} = ${A} \\)`;
                const wrong3 = `Không thể so sánh`;
                
                const exp = `Ta có: \\( \\sqrt{${A-1}} \\cdot \\sqrt{${A+1}} = \\sqrt{(${A-1})(${A+1})} = \\sqrt{${A}^2 - 1} \\).
Vì \\( ${A}^2 - 1 < ${A}^2 \\) nên \\( \\sqrt{${A}^2 - 1} < \\sqrt{${A}^2} = ${A} \\).
Vậy \\( \\sqrt{${A-1}} \\cdot \\sqrt{${A+1}} < ${A} \\).`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b8_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                const A = Math.floor(Math.random()*100)+2000;
                const text = `So sánh \\( \\sqrt{${A-1}} + \\sqrt{${A+1}} \\) và \\( 2\\sqrt{${A}} \\), khẳng định nào sau đây là đúng?`;
                const ans = `\\( \\sqrt{${A-1}} + \\sqrt{${A+1}} < 2\\sqrt{${A}} \\)`;
                const wrong1 = `\\( \\sqrt{${A-1}} + \\sqrt{${A+1}} > 2\\sqrt{${A}} \\)`;
                const wrong2 = `\\( \\sqrt{${A-1}} + \\sqrt{${A+1}} = 2\\sqrt{${A}} \\)`;
                const wrong3 = `Không thể so sánh`;
                
                const exp = `Ta xét bình phương của \\( \\sqrt{${A-1}} + \\sqrt{${A+1}} \\):
\\( (\\sqrt{${A-1}} + \\sqrt{${A+1}})^2 = ${A-1} + ${A+1} + 2\\sqrt{(${A-1})(${A+1})} = 2 \\cdot ${A} + 2\\sqrt{${A}^2 - 1} \\).
Bình phương của \\( 2\\sqrt{${A}} \\) là \\( (2\\sqrt{${A}})^2 = 4 \\cdot ${A} = 2 \\cdot ${A} + 2 \\cdot ${A} \\).
Vì \\( \\sqrt{${A}^2 - 1} < \\sqrt{${A}^2} = ${A} \\) nên \\( 2\\sqrt{${A}^2 - 1} < 2 \\cdot ${A} \\).
Suy ra \\( (\\sqrt{${A-1}} + \\sqrt{${A+1}})^2 < (2\\sqrt{${A}})^2 \\).
Do cả hai biểu thức đều dương nên \\( \\sqrt{${A-1}} + \\sqrt{${A+1}} < 2\\sqrt{${A}} \\).`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b8_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const text = `Với hai số \\( a > 0 \\) và \\( b > 0 \\), khẳng định nào sau đây là đúng?`;
                const ans = `\\( \\sqrt{a+b} < \\sqrt{a} + \\sqrt{b} \\)`;
                const wrong1 = `\\( \\sqrt{a+b} > \\sqrt{a} + \\sqrt{b} \\)`;
                const wrong2 = `\\( \\sqrt{a+b} = \\sqrt{a} + \\sqrt{b} \\)`;
                const wrong3 = `\\( \\sqrt{a+b} \\geq \\sqrt{a} + \\sqrt{b} \\)`;
                
                const exp = `Ta xét hiệu bình phương hai vế:
\\( (\\sqrt{a} + \\sqrt{b})^2 = a + b + 2\\sqrt{ab} \\).
Vì \\( a > 0, b > 0 \\) nên \\( 2\\sqrt{ab} > 0 \\).
Suy ra \\( (\\sqrt{a} + \\sqrt{b})^2 > a + b = (\\sqrt{a+b})^2 \\).
Do cả hai vế đều dương nên \\( \\sqrt{a} + \\sqrt{b} > \\sqrt{a+b} \\). Khẳng định đúng là \\( \\sqrt{a+b} < \\sqrt{a} + \\sqrt{b} \\).`;
                
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b8_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b8_d7: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 3);
        }
        types = this.shuffle(types);

        for(let i=0; i<count; i++) {
            const type = types[i];
            if (type === 0) {
                const A = Math.floor(Math.random()*5)+1;
                const sign = Math.random() > 0.5 ? '+' : '-';
                const B = Math.floor(Math.random()*4)+2;
                const coeff = 2 * A;
                const c2 = A * A;
                
                let eq_left = `x^2 ${sign} ${coeff}x + ${c2}`;
                if (sign === '+') {
                    eq_left = `x^2 + ${coeff}x + ${c2}`;
                } else {
                    eq_left = `x^2 - ${coeff}x + ${c2}`;
                }
                
                const text = `Tập nghiệm của phương trình \\( \\sqrt{${eq_left}} = ${B} \\) là:`;
                
                const s1 = sign === '+' ? B - A : B + A;
                const s2 = sign === '+' ? -B - A : -B + A;
                const S_arr = [s1, s2].sort((a,b) => a-b);
                const ans = `\\( S = \\{${S_arr[0]}; ${S_arr[1]}\\} \\)`;
                
                const exp = `Ta có: \\( \\sqrt{${eq_left}} = ${B} \\)
\\( \\Leftrightarrow \\sqrt{(x ${sign} ${A})^2} = ${B} \\)
\\( \\Leftrightarrow |x ${sign} ${A}| = ${B} \\).
Trường hợp 1: \\( x ${sign} ${A} = ${B} \\Leftrightarrow x = ${s1} \\).
Trường hợp 2: \\( x ${sign} ${A} = -${B} \\Leftrightarrow x = ${s2} \\).
Vậy tập nghiệm của phương trình là \\( S = \\{${S_arr[0]}; ${S_arr[1]}\\} \\).`;

                const wrong1 = `\\( S = \\{${B}; -${B}\\} \\)`;
                const wrong2 = `\\( S = \\{${s1+1}; ${s2-1}\\} \\)`;
                const wrong3 = `\\( S = \\{${Math.abs(s1)}; ${Math.abs(s2)}\\} \\)`;
                const optSet = new Set([ans, wrong1, wrong2, wrong3]);
                while(optSet.size < 4) optSet.add(`\\( S = \\{${Math.floor(Math.random()*10)}; -${Math.floor(Math.random()*10)}\\} \\)`);
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                q.push({ id: 'b8_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else if (type === 1) {
                let hasSol = false;
                while(!hasSol) {
                    const A_c = Math.floor(Math.random()*3)+1;
                    const c = Math.floor(Math.random()*2)+2; 
                    const d_val = Math.floor(Math.random()*5)+1;
                    let sol1 = null;
                    if (c - 1 !== 0) {
                        const num1 = d_val - A_c;
                        const den1 = c - 1;
                        if (num1 % den1 === 0) {
                            let x1 = num1 / den1;
                            if (x1 >= A_c && c*x1 - d_val >= 0) sol1 = x1;
                        }
                    }
                    let sol2 = null;
                    const num2 = A_c + d_val;
                    const den2 = c + 1;
                    if (num2 % den2 === 0) {
                        let x2 = num2 / den2;
                        if (x2 < A_c && c*x2 - d_val >= 0) sol2 = x2;
                    }
                    
                    if (sol1 !== null || sol2 !== null) {
                        hasSol = true;
                        let eq_left = `x^2 - ${2*A_c}x + ${A_c*A_c}`;
                        const text = `Tập nghiệm của phương trình \\( \\sqrt{${eq_left}} = ${c}x - ${d_val} \\) là:`;
                        
                        let s_arr = [];
                        if (sol1 !== null) s_arr.push(sol1);
                        if (sol2 !== null) s_arr.push(sol2);
                        
                        let ans = '';
                        if (s_arr.length === 0) ans = `\\( S = \\emptyset \\)`;
                        else if (s_arr.length === 1) ans = `\\( S = \\{${s_arr[0]}\\} \\)`;
                        else ans = `\\( S = \\{${s_arr[0]}; ${s_arr[1]}\\} \\)`;
                        
                        let exp = `Điều kiện: \\( ${c}x - ${d_val} \\geq 0 \\Leftrightarrow x \\geq \\frac{${d_val}}{${c}} \\).
Ta có: \\( \\sqrt{${eq_left}} = ${c}x - ${d_val} \\)
\\( \\Leftrightarrow \\sqrt{(x - ${A_c})^2} = ${c}x - ${d_val} \\)
\\( \\Leftrightarrow |x - ${A_c}| = ${c}x - ${d_val} \\).
Trường hợp 1: \\( x - ${A_c} \\geq 0 \\Leftrightarrow x \\geq ${A_c} \\). Phương trình trở thành:
\\( x - ${A_c} = ${c}x - ${d_val} \\Leftrightarrow ${(c-1)}x = ${d_val - A_c} \\Leftrightarrow x = ${(d_val - A_c)/(c-1)} \\).
Kiểm tra điều kiện: ${sol1 !== null ? `Thỏa mãn` : `Loại`}.
Trường hợp 2: \\( x - ${A_c} < 0 \\Leftrightarrow x < ${A_c} \\). Phương trình trở thành:
\\( -(x - ${A_c}) = ${c}x - ${d_val} \\Leftrightarrow -x + ${A_c} = ${c}x - ${d_val} \\Leftrightarrow ${(c+1)}x = ${A_c + d_val} \\Leftrightarrow x = ${(A_c + d_val)/(c+1)} \\).
Kiểm tra điều kiện: ${sol2 !== null ? `Thỏa mãn` : `Loại`}.
Vậy ${ans}.`;
                        
                        let wrong1 = sol1 !== null ? `\\( S = \\{${sol1 + 1}\\} \\)` : `\\( S = \\{${sol2 + 1}\\} \\)`;
                        let wrong2 = `\\( S = \\emptyset \\)`;
                        if (ans === `\\( S = \\emptyset \\)`) wrong2 = `\\( S = \\{1\\} \\)`;
                        let wrong3 = `\\( S = \\{${A_c}\\} \\)`;
                        if (ans === `\\( S = \\{${A_c}\\} \\)`) wrong3 = `\\( S = \\{-${A_c}\\} \\)`;
                        
                        const optSet = new Set([ans, wrong1, wrong2, wrong3]);
                        while(optSet.size < 4) optSet.add(`\\( S = \\{${Math.floor(Math.random()*10)}\\} \\)`);
                        const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                        q.push({ id: 'b8_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
                    }
                }
            } else {
                const A = Math.floor(Math.random()*5)+2;
                const k = Math.floor(Math.random()*5)+1;
                const B = A * k; 
                const x_val = A * k * k;
                const text = `Tìm \\( x \\), biết: \\( \\sqrt{${A}x} = ${B} \\)`;
                const ans = `\\( S = \\{${x_val}\\} \\)`;
                const exp = `Điều kiện: \\( x \\geq 0 \\).
Bình phương hai vế ta được: \\( ${A}x = ${B}^2 = ${B*B} \\).
Suy ra \\( x = \\frac{${B*B}}{${A}} = ${x_val} \\) (thỏa mãn điều kiện).`;
                const wrong1 = `\\( S = \\{${B*B}\\} \\)`;
                const wrong2 = `\\( S = \\{${k}\\} \\)`;
                const wrong3 = `\\( S = \\{${x_val + 2}\\} \\)`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b8_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b8_d8: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 2);
        }
        types = this.shuffle(types);

        for (let i = 0; i < count; i++) {
            const type = types[i];
            if (type === 0) {
                const k = Math.floor(Math.random()*3)+2; 
                const V = k;
                const m1 = Math.floor(Math.random()*3)+3; 
                const m2 = Math.floor(Math.random()*(m1-1))+1; 
                const N = k * (m1 - m2) + 1;
                const D = N;
                const c = Math.floor(Math.random()*2)+2; 
                
                let x_sol, d_val;
                do {
                    x_sol = Math.floor(Math.random()*4)+2;
                    d_val = V*V - c*x_sol;
                } while (d_val === 0);
                
                const sign_d = d_val >= 0 ? '+' : '-';
                const abs_d = Math.abs(d_val);
                
                const core_str = `${c}x ${sign_d} ${abs_d}`;
                
                const t1_c = m1*m1*c;
                const t1_d = m1*m1*abs_d;
                const t1_str = `\\sqrt{${t1_c}x ${sign_d} ${t1_d}}`;
                
                const t2_c = m2*m2*c;
                const t2_d = m2*m2*abs_d;
                const t2_str = `\\sqrt{${t2_c}x ${sign_d} ${t2_d}}`;
                
                const text = `Giải phương trình: \\( ${t1_str} - ${t2_str} + \\frac{1}{${k}}\\sqrt{${core_str}} = ${D} \\)`;
                
                const ans = `\\( x = ${x_sol} \\)`;
                
                const exp = `Điều kiện: \\( ${core_str} \\geq 0 \\Leftrightarrow x \\geq ${sign_d === '+' ? `-\\frac{${abs_d}}{${c}}` : `\\frac{${abs_d}}{${c}}`} \\).
Ta có: \\( ${t1_str} - ${t2_str} + \\frac{1}{${k}}\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow \\sqrt{${m1*m1}(${core_str})} - \\sqrt{${m2*m2}(${core_str})} + \\frac{1}{${k}}\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow ${m1}\\sqrt{${core_str}} - ${m2}\\sqrt{${core_str}} + \\frac{1}{${k}}\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow (${m1} - ${m2} + \\frac{1}{${k}})\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow \\frac{${N}}{${k}}\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow \\sqrt{${core_str}} = ${V} \\)
\\( \\Leftrightarrow ${core_str} = ${V*V} \\)
\\( \\Leftrightarrow ${c}x = ${V*V - d_val} \\Leftrightarrow x = ${x_sol} \\) (thỏa mãn điều kiện).
Vậy phương trình có nghiệm duy nhất \\( x = ${x_sol} \\).`;
                
                const wrong1 = `\\( x = ${x_sol + 2} \\)`;
                const wrong2 = `\\( x = ${Math.floor(x_sol / 2) || 1} \\)`;
                const wrong3 = `\\( x = ${x_sol * 2} \\)`;
                
                const optSet = new Set([ans, wrong1, wrong2, wrong3]);
                while(optSet.size < 4) optSet.add(`\\( x = ${Math.floor(Math.random()*10)+1} \\)`);
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                
                q.push({ id: 'b8_d8_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const V = Math.floor(Math.random()*2)+2; 
                const max_m = Math.floor((V*V)/2);
                const m = Math.floor(Math.random()*max_m)+1; 
                
                const B = Math.floor(Math.random()*2)+1; 
                const A = B * V;
                
                const c2 = Math.floor(Math.random()*2)+2;
                const c1 = A + c2;
                
                const c4 = Math.floor(Math.random()*2)+1;
                const c3 = B + c4;
                
                const K1 = Math.floor(Math.random()*4)+3; 
                const C1 = c1 * K1;
                
                const K2 = (Math.random() > 0.5) ? 2 : 4;
                const C2 = (c2 * K2) / 2;
                
                const K4 = (Math.random() > 0.5) ? 3 : 6;
                const C4 = (c4 * K4) / 3;
                
                const t1_in = `\\frac{x - ${m}}{${K1*K1}}`;
                const t2_in = `\\frac{4x - ${4*m}}{${K2*K2}}`;
                const t4_in = `\\frac{9x^2 - ${9*m*m}}{${K4*K4}}`;
                
                const text = `Tập nghiệm của phương trình \\( ${C1}\\sqrt{${t1_in}} - ${C2}\\sqrt{${t2_in}} - ${c3}\\sqrt{x^2 - ${m*m}} + ${C4}\\sqrt{${t4_in}} = 0 \\) là:`;
                
                const x2 = V*V - m;
                let ansStr = '';
                if (m === x2) ansStr = `\\( S = \\{${m}\\} \\)`;
                else ansStr = `\\( S = \\{${Math.min(m, x2)}; ${Math.max(m, x2)}\\} \\)`;
                
                const exp = `Điều kiện: \\( x \\geq ${m} \\).
Ta có: \\( ${C1}\\sqrt{${t1_in}} - ${C2}\\sqrt{${t2_in}} - ${c3}\\sqrt{x^2 - ${m*m}} + ${C4}\\sqrt{${t4_in}} = 0 \\)
\\( \\Leftrightarrow ${C1} \\cdot \\frac{1}{${K1}}\\sqrt{x - ${m}} - ${C2} \\cdot \\frac{2}{${K2}}\\sqrt{x - ${m}} - ${c3}\\sqrt{x^2 - ${m*m}} + ${C4} \\cdot \\frac{3}{${K4}}\\sqrt{x^2 - ${m*m}} = 0 \\)
\\( \\Leftrightarrow ${c1}\\sqrt{x - ${m}} - ${c2}\\sqrt{x - ${m}} - ${c3}\\sqrt{x^2 - ${m*m}} + ${c4}\\sqrt{x^2 - ${m*m}} = 0 \\)
\\( \\Leftrightarrow ${A}\\sqrt{x - ${m}} - ${B}\\sqrt{x^2 - ${m*m}} = 0 \\)
\\( \\Leftrightarrow ${A}\\sqrt{x - ${m}} - ${B}\\sqrt{x - ${m}}\\sqrt{x + ${m}} = 0 \\)
\\( \\Leftrightarrow \\sqrt{x - ${m}}(${A} - ${B}\\sqrt{x + ${m}}) = 0 \\)
Trường hợp 1: \\( \\sqrt{x - ${m}} = 0 \\Leftrightarrow x = ${m} \\) (thỏa mãn).
Trường hợp 2: \\( ${A} - ${B}\\sqrt{x + ${m}} = 0 \\Leftrightarrow \\sqrt{x + ${m}} = ${V} \\Leftrightarrow x + ${m} = ${V*V} \\Leftrightarrow x = ${x2} \\) (thỏa mãn).
Vậy phương trình có tập nghiệm ${ansStr}.`;

                let wrong1 = `\\( S = \\{${m}\\} \\)`;
                if (ansStr === wrong1) wrong1 = `\\( S = \\{${m}; ${m+2}\\} \\)`;
                const wrong2 = `\\( S = \\{${x2 + 1}; ${m}\\} \\)`;
                const wrong3 = `\\( S = \\{-${Math.min(m, x2)}; ${Math.max(m, x2)}\\} \\)`;
                
                const optSet = new Set([ansStr, wrong1, wrong2, wrong3]);
                while(optSet.size < 4) optSet.add(`\\( S = \\{${Math.floor(Math.random()*10)}; ${Math.floor(Math.random()*10)+5}\\} \\)`);
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                
                q.push({ id: 'b8_d8_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b9_d1: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*6)+2;
            const b_vals = [2, 3, 5, 6, 7];
            const b = b_vals[Math.floor(Math.random()*b_vals.length)];
            const n = a * a * b;
            const text = `Đưa thừa số ra ngoài dấu căn: \\( \\sqrt{${n}} \\)`;
            const ans = `\\( ${a}\\sqrt{${b}} \\)`;
            const exp = `Ta có: \\( \\sqrt{${n}} = \\sqrt{${a*a} \\cdot ${b}} = \\sqrt{${a}^2} \\cdot \\sqrt{${b}} = ${a}\\sqrt{${b}} \\).`;
            const wrong1 = `\\( ${a*a}\\sqrt{${b}} \\)`;
            const wrong2 = `\\( ${b}\\sqrt{${a}} \\)`;
            const wrong3 = `\\( ${a+1}\\sqrt{${b}} \\)`;
            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b9_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b9_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const isNegative = Math.random() > 0.5;
            const a = Math.floor(Math.random()*5)+2;
            const b_vals = [2, 3, 5, 7];
            const b = b_vals[Math.floor(Math.random()*b_vals.length)];
            const n = a * a * b;
            if (isNegative) {
                const text = `Đưa thừa số vào trong dấu căn: \\( -${a}\\sqrt{${b}} \\)`;
                const ans = `\\( -\\sqrt{${n}} \\)`;
                const exp = `Vì \\( -${a} \\) là số âm nên ta giữ nguyên dấu âm ở ngoài căn:
\\( -${a}\\sqrt{${b}} = -\\sqrt{${a}^2 \\cdot ${b}} = -\\sqrt{${a*a} \\cdot ${b}} = -\\sqrt{${n}} \\).`;
                const wrong1 = `\\( \\sqrt{${n}} \\)`;
                const wrong2 = `\\( -\\sqrt{${a*b}} \\)`;
                const wrong3 = `\\( \\sqrt{${a*b}} \\)`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b9_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const text = `Đưa thừa số vào trong dấu căn: \\( ${a}\\sqrt{${b}} \\)`;
                const ans = `\\( \\sqrt{${n}} \\)`;
                const exp = `Ta có: \\( ${a}\\sqrt{${b}} = \\sqrt{${a}^2 \\cdot ${b}} = \\sqrt{${a*a} \\cdot ${b}} = \\sqrt{${n}} \\).`;
                const wrong1 = `\\( -\\sqrt{${n}} \\)`;
                const wrong2 = `\\( \\sqrt{${a*b}} \\)`;
                const wrong3 = `\\( \\sqrt{${n+1}} \\)`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b9_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b9_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const primes = [2, 3, 5, 7, 11];
            const p1 = primes[Math.floor(Math.random()*primes.length)];
            let p2 = primes[Math.floor(Math.random()*primes.length)];
            while (p1 === p2) p2 = primes[Math.floor(Math.random()*primes.length)];
            
            const ab = p1 * p2;
            const ansStr = `\\( \\frac{\\sqrt{${ab}}}{${p2}} \\)`;
            const text2 = `Khử mẫu của biểu thức lấy căn: \\( \\sqrt{\\frac{${p1}}{${p2}}} \\)`;
            const exp = `Ta nhân cả tử và mẫu với ${p2}:
\\( \\sqrt{\\frac{${p1}}{${p2}}} = \\sqrt{\\frac{${p1} \\cdot ${p2}}{${p2} \\cdot ${p2}}} = \\sqrt{\\frac{${ab}}{${p2}^2}} = \\frac{\\sqrt{${ab}}}{${p2}} \\).`;
            const wrong1 = `\\( \\frac{\\sqrt{${p1}}}{${p2}} \\)`;
            const wrong2 = `\\( \\frac{\\sqrt{${ab}}}{${p1}} \\)`;
            const wrong3 = `\\( \\sqrt{${ab}} \\)`;
            const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
            q.push({ id: 'b9_d3_'+i, text: text2, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b9_d4: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*8)+3;
            let b = Math.floor(Math.random()*(a-1))+1;
            const isPlus = Math.random() > 0.5;
            const sign = isPlus ? '+' : '-';
            const oppSign = isPlus ? '-' : '+';
            const diff = a - b;
            const c = diff;
            const b_str = Math.sqrt(b) === Math.floor(Math.sqrt(b)) ? `${Math.sqrt(b)}` : `\\sqrt{${b}}`;
            
            const text = `Trục căn thức ở mẫu: \\( \\frac{${c}}{\\sqrt{${a}} ${sign} ${b_str}} \\)`;
            const ansStr = `\\( \\sqrt{${a}} ${oppSign} ${b_str} \\)`;
            const exp = `Nhân cả tử và mẫu với biểu thức liên hợp \\( \\sqrt{${a}} ${oppSign} ${b_str} \\):
\\( \\frac{${c}(\\sqrt{${a}} ${oppSign} ${b_str})}{(\\sqrt{${a}} ${sign} ${b_str})(\\sqrt{${a}} ${oppSign} ${b_str})} = \\frac{${c}(\\sqrt{${a}} ${oppSign} ${b_str})}{${a} - ${b}} \\)
\\( = \\frac{${c}(\\sqrt{${a}} ${oppSign} ${b_str})}{${diff}} = \\sqrt{${a}} ${oppSign} ${b_str} \\).`;
            
            const wrong1 = `\\( \\sqrt{${a}} ${sign} ${b_str} \\)`;
            const wrong2 = `\\( \\frac{\\sqrt{${a}} ${oppSign} ${b_str}}{${diff}} \\)`;
            const wrong3 = `\\( \\sqrt{${a+b}} \\)`;
            
            const optSet = new Set([ansStr, wrong1, wrong2, wrong3]);
            while (optSet.size < 4) optSet.add(`\\( ${Math.floor(Math.random()*5)+1} \\)`);
            const opts = this.shuffle(Array.from(optSet).slice(0, 4));
            
            q.push({ id: 'b9_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b9_d5: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*4)+2;
            const b = Math.floor(Math.random()*5)+2;
            let c = Math.floor(Math.random()*4)+2;
            let d = Math.floor(Math.random()*5)+2;
            while(a*a*b === c*c*d) {
                c = Math.floor(Math.random()*4)+2;
                d = Math.floor(Math.random()*5)+2;
            }
            const n1 = a*a*b;
            const n2 = c*c*d;
            const text = `So sánh hai số \\( ${a}\\sqrt{${b}} \\) và \\( ${c}\\sqrt{${d}} \\):`;
            
            let ans, wrong1, wrong2, exp;
            if (n1 > n2) {
                ans = `\\( ${a}\\sqrt{${b}} > ${c}\\sqrt{${d}} \\)`;
                wrong1 = `\\( ${a}\\sqrt{${b}} < ${c}\\sqrt{${d}} \\)`;
                wrong2 = `\\( ${a}\\sqrt{${b}} = ${c}\\sqrt{${d}} \\)`;
                exp = `Đưa các thừa số vào trong căn:
\\( ${a}\\sqrt{${b}} = \\sqrt{${a}^2 \\cdot ${b}} = \\sqrt{${n1}} \\)
\\( ${c}\\sqrt{${d}} = \\sqrt{${c}^2 \\cdot ${d}} = \\sqrt{${n2}} \\)
Vì \\( ${n1} > ${n2} \\) nên \\( \\sqrt{${n1}} > \\sqrt{${n2}} \\).
Vậy \\( ${a}\\sqrt{${b}} > ${c}\\sqrt{${d}} \\).`;
            } else {
                ans = `\\( ${a}\\sqrt{${b}} < ${c}\\sqrt{${d}} \\)`;
                wrong1 = `\\( ${a}\\sqrt{${b}} > ${c}\\sqrt{${d}} \\)`;
                wrong2 = `\\( ${a}\\sqrt{${b}} = ${c}\\sqrt{${d}} \\)`;
                exp = `Đưa các thừa số vào trong căn:
\\( ${a}\\sqrt{${b}} = \\sqrt{${a}^2 \\cdot ${b}} = \\sqrt{${n1}} \\)
\\( ${c}\\sqrt{${d}} = \\sqrt{${c}^2 \\cdot ${d}} = \\sqrt{${n2}} \\)
Vì \\( ${n1} < ${n2} \\) nên \\( \\sqrt{${n1}} < \\sqrt{${n2}} \\).
Vậy \\( ${a}\\sqrt{${b}} < ${c}\\sqrt{${d}} \\).`;
            }
            
            const wrong3 = `Không thể so sánh`;
            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b9_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b9_d6: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const c_vals = [2, 3, 5];
            const c = c_vals[Math.floor(Math.random()*c_vals.length)];
            const a = Math.floor(Math.random()*3)+2;
            const b = Math.floor(Math.random()*3)+2;
            const d = Math.floor(Math.random()*3)+1;
            
            const n1 = a*a*c;
            const n2 = b*b*c;
            const n3 = d*d*c;
            
            const text = `Rút gọn biểu thức: \\( \\sqrt{${n1}} + \\sqrt{${n2}} - \\sqrt{${n3}} \\)`;
            const ansCoef = a + b - d;
            
            const ansStr = ansCoef === 1 ? `\\( \\sqrt{${c}} \\)` : (ansCoef === 0 ? `0` : `\\( ${ansCoef}\\sqrt{${c}} \\)`);
            
            const exp = `Đưa các thừa số ra ngoài dấu căn:
\\( \\sqrt{${n1}} = \\sqrt{${a}^2 \\cdot ${c}} = ${a}\\sqrt{${c}} \\)
\\( \\sqrt{${n2}} = \\sqrt{${b}^2 \\cdot ${c}} = ${b}\\sqrt{${c}} \\)
\\( \\sqrt{${n3}} = \\sqrt{${d}^2 \\cdot ${c}} = ${d}\\sqrt{${c}} \\)
Biểu thức trở thành: \\( ${a}\\sqrt{${c}} + ${b}\\sqrt{${c}} - ${d}\\sqrt{${c}} = (${a} + ${b} - ${d})\\sqrt{${c}} = ${ansCoef}\\sqrt{${c}} \\).`;
            
            const wrong1 = `\\( ${ansCoef+1}\\sqrt{${c}} \\)`;
            const wrong2 = `\\( ${ansCoef-1}\\sqrt{${c}} \\)`;
            const wrong3 = `\\( ${ansCoef+2}\\sqrt{${c}} \\)`;
            
            const optSet = new Set([ansStr, wrong1, wrong2, wrong3]);
            while(optSet.size < 4) optSet.add(`\\( ${Math.floor(Math.random()*5)+1}\\sqrt{${c}} \\)`);
            const opts = this.shuffle(Array.from(optSet).slice(0, 4));
            
            q.push({ id: 'b9_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b9_d7: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const c = Math.floor(Math.random()*3)+2; 
            const a = Math.floor(Math.random()*4)+2; 
            const b = Math.floor(Math.random()*4)+2;
            const n1 = a*a*c;
            const n2 = b*b*c;
            
            const text = `Giá trị của biểu thức \\( (\\sqrt{${n1}} - \\sqrt{${n2}})\\sqrt{${c}} \\) là:`;
            
            const exp = `Ta có: \\( (\\sqrt{${n1}} - \\sqrt{${n2}})\\sqrt{${c}} \\)
\\( = \\sqrt{${n1}} \\cdot \\sqrt{${c}} - \\sqrt{${n2}} \\cdot \\sqrt{${c}} \\)
\\( = \\sqrt{${n1 * c}} - \\sqrt{${n2 * c}} \\)
\\( = \\sqrt{${a*a*c*c}} - \\sqrt{${b*b*c*c}} = ${a*c} - ${b*c} = ${(a-b)*c} \\).`;
            
            const ansStr = `${(a-b)*c}`;
            const wrong1 = `${(a+b)*c}`;
            const wrong2 = `${(a-b)*c + 2}`;
            const wrong3 = `${(a-b)*c - 2}`;
            
            const optSet = new Set([ansStr, wrong1, wrong2, wrong3]);
            while(optSet.size < 4) optSet.add(`${Math.floor(Math.random()*10)}`);
            const opts = this.shuffle(Array.from(optSet).slice(0, 4));
            
            q.push({ id: 'b9_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b9_d8: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 2);
        }
        types = this.shuffle(types);

        for (let i = 0; i < count; i++) {
            const type = types[i];
            if (type === 0) {
                const k = Math.floor(Math.random()*3)+2; 
                const V = k;
                const m1 = Math.floor(Math.random()*3)+3; 
                const m2 = Math.floor(Math.random()*(m1-1))+1; 
                const N = k * (m1 - m2) + 1;
                const D = N;
                const c = Math.floor(Math.random()*2)+2; 
                
                let x_sol, d_val;
                do {
                    x_sol = Math.floor(Math.random()*4)+2;
                    d_val = V*V - c*x_sol;
                } while (d_val === 0);
                
                const sign_d = d_val >= 0 ? '+' : '-';
                const abs_d = Math.abs(d_val);
                
                const core_str = `${c}x ${sign_d} ${abs_d}`;
                
                const t1_c = m1*m1*c;
                const t1_d = m1*m1*abs_d;
                const t1_str = `\\sqrt{${t1_c}x ${sign_d} ${t1_d}}`;
                
                const t2_c = m2*m2*c;
                const t2_d = m2*m2*abs_d;
                const t2_str = `\\sqrt{${t2_c}x ${sign_d} ${t2_d}}`;
                
                const text = `Giải phương trình: \\( ${t1_str} - ${t2_str} + \\frac{1}{${k}}\\sqrt{${core_str}} = ${D} \\)`;
                
                const ans = `\\( x = ${x_sol} \\)`;
                
                const exp = `Điều kiện: \\( ${core_str} \\geq 0 \\Leftrightarrow x \\geq ${sign_d === '+' ? `-\\frac{${abs_d}}{${c}}` : `\\frac{${abs_d}}{${c}}`} \\).
Ta có: \\( ${t1_str} - ${t2_str} + \\frac{1}{${k}}\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow \\sqrt{${m1*m1}(${core_str})} - \\sqrt{${m2*m2}(${core_str})} + \\frac{1}{${k}}\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow ${m1}\\sqrt{${core_str}} - ${m2}\\sqrt{${core_str}} + \\frac{1}{${k}}\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow (${m1} - ${m2} + \\frac{1}{${k}})\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow \\frac{${N}}{${k}}\\sqrt{${core_str}} = ${D} \\)
\\( \\Leftrightarrow \\sqrt{${core_str}} = ${V} \\)
\\( \\Leftrightarrow ${core_str} = ${V*V} \\)
\\( \\Leftrightarrow ${c}x = ${V*V - d_val} \\Leftrightarrow x = ${x_sol} \\) (thỏa mãn điều kiện).
Vậy phương trình có nghiệm duy nhất \\( x = ${x_sol} \\).`;
                
                const wrong1 = `\\( x = ${x_sol + 2} \\)`;
                const wrong2 = `\\( x = ${Math.floor(x_sol / 2) || 1} \\)`;
                const wrong3 = `\\( x = ${x_sol * 2} \\)`;
                
                const optSet = new Set([ans, wrong1, wrong2, wrong3]);
                while(optSet.size < 4) optSet.add(`\\( x = ${Math.floor(Math.random()*10)+1} \\)`);
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                
                q.push({ id: 'b9_d8_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const V = Math.floor(Math.random()*2)+2; 
                const max_m = Math.floor((V*V)/2);
                const m = Math.floor(Math.random()*max_m)+1; 
                
                const B = Math.floor(Math.random()*2)+1; 
                const A = B * V;
                
                const c2 = Math.floor(Math.random()*2)+2;
                const c1 = A + c2;
                
                const c4 = Math.floor(Math.random()*2)+1;
                const c3 = B + c4;
                
                const K1 = Math.floor(Math.random()*4)+3; 
                const C1 = c1 * K1;
                
                const K2 = (Math.random() > 0.5) ? 2 : 4;
                const C2 = (c2 * K2) / 2;
                
                const K4 = (Math.random() > 0.5) ? 3 : 6;
                const C4 = (c4 * K4) / 3;
                
                const t1_in = `\\frac{x - ${m}}{${K1*K1}}`;
                const t2_in = `\\frac{4x - ${4*m}}{${K2*K2}}`;
                const t4_in = `\\frac{9x^2 - ${9*m*m}}{${K4*K4}}`;
                
                const text = `Tập nghiệm của phương trình \\( ${C1}\\sqrt{${t1_in}} - ${C2}\\sqrt{${t2_in}} - ${c3}\\sqrt{x^2 - ${m*m}} + ${C4}\\sqrt{${t4_in}} = 0 \\) là:`;
                
                const x2 = V*V - m;
                let ansStr = '';
                if (m === x2) ansStr = `\\( S = \\{${m}\\} \\)`;
                else ansStr = `\\( S = \\{${Math.min(m, x2)}; ${Math.max(m, x2)}\\} \\)`;
                
                const exp = `Điều kiện: \\( x \\geq ${m} \\).
Ta có: \\( ${C1}\\sqrt{${t1_in}} - ${C2}\\sqrt{${t2_in}} - ${c3}\\sqrt{x^2 - ${m*m}} + ${C4}\\sqrt{${t4_in}} = 0 \\)
\\( \\Leftrightarrow ${C1} \\cdot \\frac{1}{${K1}}\\sqrt{x - ${m}} - ${C2} \\cdot \\frac{2}{${K2}}\\sqrt{x - ${m}} - ${c3}\\sqrt{x^2 - ${m*m}} + ${C4} \\cdot \\frac{3}{${K4}}\\sqrt{x^2 - ${m*m}} = 0 \\)
\\( \\Leftrightarrow ${c1}\\sqrt{x - ${m}} - ${c2}\\sqrt{x - ${m}} - ${c3}\\sqrt{x^2 - ${m*m}} + ${c4}\\sqrt{x^2 - ${m*m}} = 0 \\)
\\( \\Leftrightarrow ${A}\\sqrt{x - ${m}} - ${B}\\sqrt{x^2 - ${m*m}} = 0 \\)
\\( \\Leftrightarrow ${A}\\sqrt{x - ${m}} - ${B}\\sqrt{x - ${m}}\\sqrt{x + ${m}} = 0 \\)
\\( \\Leftrightarrow \\sqrt{x - ${m}}(${A} - ${B}\\sqrt{x + ${m}}) = 0 \\)
Trường hợp 1: \\( \\sqrt{x - ${m}} = 0 \\Leftrightarrow x = ${m} \\) (thỏa mãn).
Trường hợp 2: \\( ${A} - ${B}\\sqrt{x + ${m}} = 0 \\Leftrightarrow \\sqrt{x + ${m}} = ${V} \\Leftrightarrow x + ${m} = ${V*V} \\Leftrightarrow x = ${x2} \\) (thỏa mãn).
Vậy phương trình có tập nghiệm ${ansStr}.`;

                let wrong1 = `\\( S = \\{${m}\\} \\)`;
                if (ansStr === wrong1) wrong1 = `\\( S = \\{${m}; ${m+2}\\} \\)`;
                const wrong2 = `\\( S = \\{${x2 + 1}; ${m}\\} \\)`;
                const wrong3 = `\\( S = \\{-${Math.min(m, x2)}; ${Math.max(m, x2)}\\} \\)`;
                
                const optSet = new Set([ansStr, wrong1, wrong2, wrong3]);
                while(optSet.size < 4) optSet.add(`\\( S = \\{${Math.floor(Math.random()*10)}; ${Math.floor(Math.random()*10)+5}\\} \\)`);
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                
                q.push({ id: 'b9_d8_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b10_d1: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 2);
        }
        types = this.shuffle(types);

        for (let i = 0; i < count; i++) {
            const type = types[i];
            if (type === 0) {
                const a = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random()*5)+2);
                const b = Math.floor(Math.random()*5)+1;
                const c = Math.floor(Math.random()*4)+2;
                
                const a3 = a*a*a;
                const b3_dec = (b*b*b / 1000).toFixed(3).replace(/\.?0+$/, '');
                const c3 = c*c*c;
                
                const text = `Tính giá trị của biểu thức: \\( A = \\sqrt[3]{${a3}} + \\sqrt[3]{${b3_dec}} - \\sqrt[3]{\\frac{1}{${c3}}} \\)`;
                
                const val_a = a;
                const val_b = b/10;
                
                let ans_num = val_a*10*c + b*c - 10;
                let ans_den = 10*c;
                const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
                const g = Math.abs(gcd(ans_num, ans_den));
                ans_num /= g;
                ans_den /= g;
                
                let ansStr = '';
                if (ans_den === 1) ansStr = `\\( ${ans_num} \\)`;
                else if (ans_num === 0) ansStr = `\\( 0 \\)`;
                else if (ans_num < 0) ansStr = `\\( -\\frac{${-ans_num}}{${ans_den}} \\)`;
                else ansStr = `\\( \\frac{${ans_num}}{${ans_den}} \\)`;
                
                const exp = `Ta đưa các số về dạng lập phương: 
\\( ${a3} = (${a})^3 \\) ; \\( ${b3_dec} = (${val_b})^3 \\) ; \\( \\frac{1}{${c3}} = \\left(\\frac{1}{${c}}\\right)^3 \\).
Thay vào biểu thức:
\\( A = ${a} + ${val_b} - \\frac{1}{${c}} = ${ansStr} \\).`;

                let wrong1 = ans_den === 1 ? `\\( ${ans_num + 1} \\)` : `\\( \\frac{${ans_num + 1}}{${ans_den}} \\)`;
                let wrong2 = ans_den === 1 ? `\\( ${ans_num - 1} \\)` : `\\( \\frac{${ans_num - 1}}{${ans_den}} \\)`;
                let wrong3 = ans_den === 1 ? `\\( ${ans_num + 2} \\)` : `\\( \\frac{${ans_num + 2}}{${ans_den}} \\)`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const a = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random()*4)+1);
                const x_val = Math.floor(Math.random()*10)+5;
                const sign1 = a > 0 ? '+' : '-';
                const a_abs = Math.abs(a);
                
                const c2 = 3 * a;
                const c1 = 3 * a * a;
                const c0 = a * a * a;
                
                const sign_c2 = c2 > 0 ? '+' : '-';
                const sign_c0 = c0 > 0 ? '+' : '-';
                
                const text = `Tính giá trị của biểu thức: \\( B = \\sqrt[3]{x^3 ${sign_c2} ${Math.abs(c2)}x^2 + ${c1}x ${sign_c0} ${Math.abs(c0)}} \\) tại \\( x = ${x_val} \\)`;
                
                const ans_val = x_val + a;
                const ansStr = `\\( ${ans_val} \\)`;
                
                const exp = `Sử dụng hằng đẳng thức \\( (A+B)^3 = A^3 + 3A^2B + 3AB^2 + B^3 \\), ta thấy biểu thức dưới căn là dạng khai triển của \\( (x ${sign1} ${a_abs})^3 \\).
Rút gọn biểu thức: \\( B = \\sqrt[3]{(x ${sign1} ${a_abs})^3} = x ${sign1} ${a_abs} \\).
Thay \\( x = ${x_val} \\) vào ta được: \\( B = ${x_val} ${sign1} ${a_abs} = ${ans_val} \\).`;

                const wrong1 = `\\( ${ans_val + 1} \\)`;
                const wrong2 = `\\( ${ans_val - 1} \\)`;
                const wrong3 = `\\( ${ans_val + 2} \\)`;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b10_d2: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 2);
        }
        types = this.shuffle(types);

        for (let i = 0; i < count; i++) {
            const type = types[i];
            if (type === 0) {
                const a = Math.floor(Math.random()*4)+4;
                const b = Math.floor(Math.random()*3)+1;
                const p1 = Math.floor(Math.random()*3)+1;
                const p2 = Math.floor(Math.random()*3)+1;
                
                const x_pow = 3 * p1;
                const y_pow = 3 * p2;
                
                const text = `Rút gọn biểu thức: \\( C = \\sqrt[3]{${a*a*a}x^{${x_pow}}y^{${y_pow}}} - \\sqrt[3]{${b*b*b}x^{${x_pow}}y^{${y_pow}}} \\)`;
                
                const x_out = p1 === 1 ? 'x' : `x^${p1}`;
                const y_out = p2 === 1 ? 'y' : `y^${p2}`;
                
                const ansStr = `\\( ${(a-b)}${x_out}${y_out} \\)`;
                
                const exp = `Sử dụng quy tắc khai căn bậc ba của một tích: 
\\( C = \\sqrt[3]{(${a}${x_out}${y_out})^3} - \\sqrt[3]{(${b}${x_out}${y_out})^3} \\)
\\( C = ${a}${x_out}${y_out} - ${b}${x_out}${y_out} = ${(a-b)}${x_out}${y_out} \\).`;

                const wrong1 = `\\( ${(a+b)}${x_out}${y_out} \\)`;
                const wrong2 = `\\( ${(a-b)}x^{${x_pow}}y^{${y_pow}} \\)`;
                const wrong3 = `\\( ${(a-b+1)}${x_out}${y_out} \\)`;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const a = Math.floor(Math.random()*4)+1;
                const V = Math.floor(Math.random()*15)+2;
                
                const c2 = 3 * a;
                const c1 = 3 * a * a;
                const c0 = a * a * a;
                
                const text = `Cho \\( x = \\sqrt[3]{${V}} + ${a} \\). Tính giá trị của đa thức \\( P(x) = x^3 - ${c2}x^2 + ${c1}x - ${c0} \\)`;
                
                const ansStr = `\\( ${V} \\)`;
                
                const exp = `Nhận xét đa thức \\( P(x) = x^3 - 3 \\cdot x^2 \\cdot ${a} + 3 \\cdot x \\cdot ${a}^2 - ${a}^3 = (x - ${a})^3 \\).
Từ giả thiết \\( x = \\sqrt[3]{${V}} + ${a} \\Rightarrow x - ${a} = \\sqrt[3]{${V}} \\).
Lập phương hai vế để thế vào đa thức: \\( P(x) = (x - ${a})^3 = (\\sqrt[3]{${V}})^3 = ${V} \\).`;

                const wrong1 = `\\( ${V+1} \\)`;
                const wrong2 = `\\( ${V*a} \\)`;
                const wrong3 = `\\( ${V+a} \\)`;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b10_d3: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 2);
        }
        types = this.shuffle(types);

        for (let i = 0; i < count; i++) {
            const type = types[i];
            if (type === 0) {
                const a = Math.floor(Math.random()*4)+3;
                let b = Math.floor(Math.random()*3)+1;
                while(a===b) b = Math.floor(Math.random()*3)+1;
                const sign = Math.random() > 0.5 ? '+' : '-';
                
                const denom_val = sign === '+' ? a + b : a - b;
                const k = Math.floor(Math.random()*3)+1;
                const A = k * denom_val;
                
                const text = `Trục căn thức ở mẫu: \\( M = \\frac{${A}}{\\sqrt[3]{${a}} ${sign} \\sqrt[3]{${b}}} \\)`;
                
                const opp_sign = sign === '+' ? '-' : '+';
                const part2 = `\\sqrt[3]{${a*a}} ${opp_sign} \\sqrt[3]{${a*b}} + \\sqrt[3]{${b*b}}`;
                
                const ansStr = k === 1 ? `\\( ${part2} \\)` : `\\( ${k}(${part2}) \\)`;
                
                const exp = `Mẫu số có dạng \\( u ${sign} v \\), ta nhân cả tử và mẫu với lượng liên hợp là bình phương thiếu của ${sign === '+' ? 'hiệu' : 'tổng'}: \\( (\\sqrt[3]{${a}})^2 ${opp_sign} \\sqrt[3]{${a} \\cdot ${b}} + (\\sqrt[3]{${b}})^2 = ${part2} \\).
\\( M = \\frac{${A}(${part2})}{(\\sqrt[3]{${a}} ${sign} \\sqrt[3]{${b}})(${part2})} \\)
\\( M = \\frac{${A}(${part2})}{${a} ${sign} ${b}} = \\frac{${A}(${part2})}{${denom_val}} = ${ansStr} \\).`;

                const part2_wrong1 = `\\sqrt[3]{${a*a}} ${sign} \\sqrt[3]{${a*b}} + \\sqrt[3]{${b*b}}`;
                const part2_wrong2 = `\\sqrt[3]{${a*a}} ${opp_sign} 2\\sqrt[3]{${a*b}} + \\sqrt[3]{${b*b}}`;
                
                const wrong1 = k === 1 ? `\\( ${part2_wrong1} \\)` : `\\( ${k}(${part2_wrong1}) \\)`;
                const wrong2 = k === 1 ? `\\( ${part2_wrong2} \\)` : `\\( ${k}(${part2_wrong2}) \\)`;
                const wrong3 = k === 1 ? `\\( ${part2} + 1 \\)` : `\\( ${k+1}(${part2}) \\)`;
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const a = Math.floor(Math.random()*4)+4; 
                let b = Math.floor(Math.random()*3)+1; 
                const sign = Math.random() > 0.5 ? '+' : '-'; 
                const opp_sign = sign === '+' ? '-' : '+';
                
                const eval_denom = sign === '+' ? a - b : a + b;
                
                const k = Math.floor(Math.random()*4)+2;
                const A = k * eval_denom;
                
                const text = `Trục căn thức ở mẫu: \\( N = \\frac{${A}}{\\sqrt[3]{${a*a}} ${sign} \\sqrt[3]{${a*b}} + \\sqrt[3]{${b*b}}} \\)`;
                
                const part2 = `\\sqrt[3]{${a}} ${opp_sign} \\sqrt[3]{${b}}`;
                
                const ansStr = k === 1 ? `\\( ${part2} \\)` : `\\( ${k}(${part2}) \\)`;
                
                const exp = `Mẫu số có dạng bình phương thiếu của ${sign === '+' ? 'tổng' : 'hiệu'}: \\( \\sqrt[3]{${a}^2} ${sign} \\sqrt[3]{${a} \\cdot ${b}} + \\sqrt[3]{${b}^2} \\), do đó ta cần nhân cả tử và mẫu với lượng liên hợp là ${sign === '+' ? 'hiệu' : 'tổng'} hai căn bậc ba: \\( ${part2} \\).
\\( N = \\frac{${A}(${part2})}{(${part2})(\\sqrt[3]{${a*a}} ${sign} \\sqrt[3]{${a*b}} + \\sqrt[3]{${b*b}})} = \\frac{${A}(${part2})}{${a} ${opp_sign} ${b}} = \\frac{${A}(${part2})}{${eval_denom}} = ${ansStr} \\).`;

                const part2_wrong1 = `\\sqrt[3]{${a}} ${sign} \\sqrt[3]{${b}}`;
                const wrong1 = k === 1 ? `\\( ${part2_wrong1} \\)` : `\\( ${k}(${part2_wrong1}) \\)`;
                const wrong2 = k === 1 ? `\\( \\sqrt[3]{${a*a}} ${opp_sign} \\sqrt[3]{${b*b}} \\)` : `\\( ${k}(\\sqrt[3]{${a*a}} ${opp_sign} \\sqrt[3]{${b*b}}) \\)`;
                const wrong3 = `\\( ${k+1}(${part2}) \\)`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b10_d4: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const isNeg = Math.random() > 0.5;
            const sign = isNeg ? '-' : '';
            const A = Math.floor(Math.random()*3)+2;
            const B = Math.floor(Math.random()*4)+2;
            const inside = A*A*A*B;
            const offset = Math.random() > 0.5 ? 1 : -1;
            const C = inside + offset;
            
            const text = `So sánh \\( ${sign}${A}\\sqrt[3]{${B}} \\) và \\( ${sign}\\sqrt[3]{${C}} \\)`;
            
            let ans = '';
            if (isNeg) {
                if (inside < C) ans = `\\( -${A}\\sqrt[3]{${B}} > -\\sqrt[3]{${C}} \\)`;
                else ans = `\\( -${A}\\sqrt[3]{${B}} < -\\sqrt[3]{${C}} \\)`;
            } else {
                if (inside < C) ans = `\\( ${A}\\sqrt[3]{${B}} < \\sqrt[3]{${C}} \\)`;
                else ans = `\\( ${A}\\sqrt[3]{${B}} > \\sqrt[3]{${C}} \\)`;
            }
            
            const wrong1 = ans.replace('<', '>').replace('>', '<');
            const wrong2 = ans.replace('<', '=').replace('>', '=');
            const wrong3 = `Không thể so sánh`;
            
            const exp = `Đưa thừa số vào trong dấu căn: \\( ${A}\\sqrt[3]{${B}} = \\sqrt[3]{${A}^3 \\cdot ${B}} = \\sqrt[3]{${A*A*A} \\cdot ${B}} = \\sqrt[3]{${inside}} \\).
Vì \\( ${inside} ${inside < C ? '<' : '>'} ${C} \\) nên \\( \\sqrt[3]{${inside}} ${inside < C ? '<' : '>'} \\sqrt[3]{${C}} \\).
${isNeg ? `Nhân hai vế với \\( -1 \\) ta phải đổi chiều bất đẳng thức: \\( -\\sqrt[3]{${inside}} ${inside < C ? '>' : '<'} -\\sqrt[3]{${C}} \\).\n` : ''}Vậy ${ans}.`;

            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b10_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b10_d5: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 2);
        }
        types = this.shuffle(types);

        for (let i = 0; i < count; i++) {
            const type = types[i];
            if (type === 0) {
                const V = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random()*4)+2); 
                const c = Math.floor(Math.random()*3)+2; 
                const x_sol = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random()*5)+1);
                const d = V*V*V - c*x_sol;
                const sign_d = d >= 0 ? '+' : '-';
                
                const text = `Giải phương trình: \\( \\sqrt[3]{${c}x ${sign_d} ${Math.abs(d)}} = ${V} \\)`;
                const ansStr = `\\( S = \\{${x_sol}\\} \\)`;
                
                const exp = `Lập phương hai vế của phương trình: \\( ${c}x ${sign_d} ${Math.abs(d)} = (${V})^3 \\).
\\( \\Leftrightarrow ${c}x ${sign_d} ${Math.abs(d)} = ${V*V*V} \\)
\\( \\Leftrightarrow ${c}x = ${V*V*V - d} \\Leftrightarrow x = ${x_sol} \\).
Vậy phương trình có tập nghiệm ${ansStr} (Không cần điều kiện xác định vì căn bậc ba xác định với mọi x).`;

                const wrong1 = `\\( S = \\{${x_sol+1}\\} \\)`;
                const wrong2 = `\\( S = \\{${-x_sol}\\} \\)`;
                const wrong3 = `\\( S = \\emptyset \\)`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const b_coef = (Math.random() > 0.5 ? 1 : -1) * 2 * (Math.floor(Math.random()*3)+1);
                const c_coef = (b_coef/2) * (b_coef/2);
                const D = Math.floor(Math.random()*2)+2;
                
                const sign_b = b_coef < 0 ? '+' : '-';
                const text = `Giải phương trình: \\( \\sqrt[3]{x^2 ${sign_b} ${Math.abs(b_coef)}x + ${c_coef}} - ${D} = 0 \\)`;
                
                const center = Math.abs(b_coef)/2;
                const actual_center = b_coef < 0 ? -center : center;
                
                let ansStr = `\\( S = \\{${actual_center} - ${D}\\sqrt{${D}}; ${actual_center} + ${D}\\sqrt{${D}}\\} \\)`;
                
                const exp = `\\( \\Leftrightarrow \\sqrt[3]{x^2 ${sign_b} ${Math.abs(b_coef)}x + ${c_coef}} = ${D} \\).
Lập phương 2 vế: \\( x^2 ${sign_b} ${Math.abs(b_coef)}x + ${c_coef} = ${D*D*D} \\).
\\( \\Leftrightarrow x^2 ${sign_b} ${Math.abs(b_coef)}x ${c_coef - D*D*D >= 0 ? '+' : '-'} ${Math.abs(c_coef - D*D*D)} = 0 \\).
Giải phương trình bậc 2, ta có \\( \\Delta' = (${actual_center})^2 - 1 \\cdot (${c_coef - D*D*D}) = ${D*D*D} > 0 \\).
Phương trình có 2 nghiệm: \\( x_1 = ${actual_center} + \\sqrt{${D*D*D}} = ${actual_center} + ${D}\\sqrt{${D}} \\) và \\( x_2 = ${actual_center} - \\sqrt{${D*D*D}} = ${actual_center} - ${D}\\sqrt{${D}} \\).
Vậy tập nghiệm là ${ansStr}.`;

                const wrong1 = `\\( S = \\{${actual_center} - \\sqrt{${D}}; ${actual_center} + \\sqrt{${D}}\\} \\)`;
                const wrong2 = `\\( S = \\{${actual_center + 1} - ${D}\\sqrt{${D}}; ${actual_center + 1} + ${D}\\sqrt{${D}}\\} \\)`;
                const wrong3 = `\\( S = \\{${-actual_center} - ${D}\\sqrt{${D}}; ${-actual_center} + ${D}\\sqrt{${D}}\\} \\)`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b10_d6: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 2);
        }
        types = this.shuffle(types);

        for (let i = 0; i < count; i++) {
            const type = types[i];
            if (type === 0) {
                const a = Math.floor(Math.random()*5)+4; 
                const V = a*a*a;
                
                const text = `Một bể nước có dạng hình lập phương chứa được đúng \\( ${V}\\text{ m}^3 \\) nước thì đầy bể. Tính độ dài cạnh của bể nước đó.`;
                const ansStr = `\\( ${a}\\text{ m} \\)`;
                
                const exp = `Gọi độ dài cạnh của bể nước hình lập phương là \\( a \\) (\\( a > 0 \\), mét).
Thể tích của hình lập phương là \\( V = a^3 = ${V} \\).
Suy ra \\( a = \\sqrt[3]{${V}} = ${a} \\) (m).
Vậy độ dài cạnh bể nước là ${a}m.`;

                const wrong1 = `\\( ${a*a}\\text{ m} \\)`;
                const wrong2 = `\\( ${a*3}\\text{ m} \\)`;
                const wrong3 = `\\( ${a+1}\\text{ m} \\)`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const t = Math.floor(Math.random()*5)+4; 
                const t3 = t*t*t;
                const k = (Math.floor(Math.random()*10)+50) + 0.5; 
                const C = (Math.floor(Math.random()*20)+60) + 0.8; 
                const h = parseFloat((k * t + C).toFixed(2));
                
                const text = `Chiều cao ngang vai \\( h \\) (cm) của một con voi đực ở châu Phi xấp xỉ tính theo tuổi \\( t \\) (năm) bằng công thức \\( h = ${k} \\cdot \\sqrt[3]{t} + ${C} \\). Nếu một con voi đực có chiều cao ngang vai là \\( ${h} \\) cm thì con voi đó khoảng bao nhiêu tuổi?`;
                
                const ansStr = `\\( ${t3} \\) tuổi`;
                
                const exp = `Thay chiều cao \\( h = ${h} \\) vào công thức sinh học đã cho, ta được một phương trình chứa căn bậc ba: 
\\( ${h} = ${k} \\cdot \\sqrt[3]{t} + ${C} \\)
\\( \\Leftrightarrow ${k} \\cdot \\sqrt[3]{t} = ${h} - ${C} = ${(h - C).toFixed(2)} \\)
\\( \\Leftrightarrow \\sqrt[3]{t} = ${(h - C).toFixed(2)} : ${k} = ${t} \\).
Lập phương 2 vế ta có \\( t = ${t}^3 = ${t3} \\).
Vậy con voi đực đó khoảng ${t3} tuổi.`;

                const wrong1 = `\\( ${t*t} \\) tuổi`;
                const wrong2 = `\\( ${t*3} \\) tuổi`;
                const wrong3 = `\\( ${t3 + 1} \\) tuổi`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b10_d6_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b11_d1: function(count=5) {
        const q = [];
        let types = [];
        for (let i = 0; i < count; i++) {
            types.push(i % 2);
        }
        types = this.shuffle(types);

        for(let i=0; i<count; i++) {
            const type = types[i];
            const trig = ['sin', 'cos', 'tan', 'cot'][Math.floor(Math.random()*4)];
            if (type === 0) {
                const deg = Math.floor(Math.random()*80)+5;
                const min = Math.floor(Math.random()*60);
                const angleRad = (deg + min/60) * Math.PI / 180;
                let val = 0;
                if (trig === 'sin') val = Math.sin(angleRad);
                else if (trig === 'cos') val = Math.cos(angleRad);
                else if (trig === 'tan') val = Math.tan(angleRad);
                else val = 1 / Math.tan(angleRad);
                
                const valStr = val.toFixed(3);
                
                const text = `Sử dụng máy tính cầm tay, tính giá trị của \\( \\${trig} ${deg}^\\circ ${min}' \\) (làm tròn đến chữ số thập phân thứ 3).`;
                const ans = `\\( ${valStr} \\)`;
                
                const exp = trig === 'cot' 
                    ? `Đối với \\( \\cot \\), ta bấm \\( \\frac{1}{\\tan(${deg}^\\circ ${min}')} \\) trên máy tính. Kết quả xấp xỉ \\( ${valStr} \\).`
                    : `Bấm trực tiếp phím \\( \\${trig} \\) rồi nhập \\( ${deg}^\\circ ${min}' \\). Kết quả làm tròn 3 chữ số thập phân là \\( ${valStr} \\).`;
                
                const wrong1 = `\\( ${(val + 0.1).toFixed(3)} \\)`;
                const wrong2 = `\\( ${(val - 0.05).toFixed(3)} \\)`;
                const wrong3 = `\\( ${(val * 1.5).toFixed(3)} \\)`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b11_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                let val = 0;
                if (trig === 'sin' || trig === 'cos') val = (Math.floor(Math.random()*90)+5)/100;
                else val = (Math.floor(Math.random()*300)+10)/100; 
                
                let angleRad = 0;
                if (trig === 'sin') angleRad = Math.asin(val);
                else if (trig === 'cos') angleRad = Math.acos(val);
                else if (trig === 'tan') angleRad = Math.atan(val);
                else angleRad = Math.atan(1/val);
                
                const angleDeg = angleRad * 180 / Math.PI;
                const d = Math.floor(angleDeg);
                const m = Math.round((angleDeg - d) * 60);
                
                const text = `Sử dụng máy tính cầm tay, tìm số đo góc nhọn \\( \\alpha \\) (làm tròn đến phút) biết \\( \\${trig} \\alpha = ${val.toFixed(2)} \\).`;
                const ans = `\\( \\alpha \\approx ${d}^\\circ ${m}' \\)`;
                
                const exp = trig === 'cot'
                    ? `Vì \\( \\cot \\alpha = ${val.toFixed(2)} \\) nên \\( \\tan \\alpha = \\frac{1}{${val.toFixed(2)}} \\). Sử dụng phím Shift + tan để tìm góc \\( \\alpha \\). Kết quả xấp xỉ \\( ${d}^\\circ ${m}' \\).`
                    : `Sử dụng phím Shift + \\( \\${trig} \\) rồi nhập \\( ${val.toFixed(2)} \\). Bấm phím độ, phút để ra kết quả. Kết quả xấp xỉ \\( ${d}^\\circ ${m}' \\).`;
                
                const wrong1 = `\\( \\alpha \\approx ${d+1}^\\circ ${m}' \\)`;
                const wrong2 = `\\( \\alpha \\approx ${d}^\\circ ${(m+15)%60}' \\)`;
                const wrong3 = `\\( \\alpha \\approx ${d-1}^\\circ ${m}' \\)`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b11_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b11_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const triples = [
                [3, 4, 5], [6, 8, 10], [5, 12, 13], 
                [8, 15, 17], [7, 24, 25], [9, 12, 15]
            ];
            const tr = triples[Math.floor(Math.random() * triples.length)];
            let a, b, c;
            if (Math.random() > 0.5) { a = tr[0]; b = tr[1]; c = tr[2]; }
            else { a = tr[1]; b = tr[0]; c = tr[2]; }
            
            const missing = Math.floor(Math.random()*3);
            
            let given1, given2, missing_var;
            if (missing === 0) {
                given1 = `AC = ${b}`; given2 = `BC = ${c}`; missing_var = 'AB';
            } else if (missing === 1) {
                given1 = `AB = ${a}`; given2 = `BC = ${c}`; missing_var = 'AC';
            } else {
                given1 = `AB = ${a}`; given2 = `AC = ${b}`; missing_var = 'BC';
            }
            
            const trig = ['sin', 'cos', 'tan', 'cot'][Math.floor(Math.random()*4)];
            const angle = ['B', 'C'][Math.floor(Math.random()*2)];
            
            const text = `Cho tam giác ABC vuông tại A có \\( ${given1} \\) cm, \\( ${given2} \\) cm. Tính \\( \\${trig} ${angle} \\).`;
            
            let num, den;
            if (angle === 'B') {
                if (trig === 'sin') { num = b; den = c; }
                else if (trig === 'cos') { num = a; den = c; }
                else if (trig === 'tan') { num = b; den = a; }
                else { num = a; den = b; }
            } else {
                if (trig === 'sin') { num = a; den = c; }
                else if (trig === 'cos') { num = b; den = c; }
                else if (trig === 'tan') { num = a; den = b; }
                else { num = b; den = a; }
            }
            
            const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
            const g = gcd(num, den);
            num /= g; den /= g;
            
            let ans = den === 1 ? `\\( ${num} \\)` : `\\( \\frac{${num}}{${den}} \\)`;
            
            const exp = `Sử dụng định lý Pythagore trong tam giác ABC vuông tại A: \\( AB^2 + AC^2 = BC^2 \\).
Ta tính được \\( ${missing_var} = ${[a,b,c][missing]} \\) cm.
Các cạnh của tam giác là: \\( AB = ${a}, AC = ${b}, BC = ${c} \\).
Góc \\( ${angle} \\) có cạnh đối là \\( ${angle === 'B' ? 'AC' : 'AB'} \\), cạnh kề là \\( ${angle === 'B' ? 'AB' : 'AC'} \\), cạnh huyền là \\( BC \\).
Theo định nghĩa: \\( \\${trig} ${angle} = \\frac{\\text{${trig === 'sin' ? 'đối' : trig === 'cos' ? 'kề' : trig === 'tan' ? 'đối' : 'kề'}}}{\\text{${trig === 'sin' || trig === 'cos' ? 'huyền' : trig === 'tan' ? 'kề' : 'đối'}}} = \\frac{${num*g}}{${den*g}} = ${ans} \\).`;

            let wrong1 = `\\( \\frac{${den}}{${num}} \\)`; 
            let w_num2 = angle === 'B' ? a : b;
            let w_den2 = c;
            const g2 = gcd(w_num2, w_den2);
            let wrong2 = `\\( \\frac{${w_num2/g2}}{${w_den2/g2}} \\)`; 
            if (ans === wrong2) wrong2 = `\\( \\frac{${Math.abs(num-1) || 2}}{${den+1}} \\)`;
            
            let w_num3 = angle === 'B' ? a : b;
            let w_den3 = angle === 'B' ? b : a;
            const g3 = gcd(w_num3, w_den3);
            let wrong3 = `\\( \\frac{${w_num3/g3}}{${w_den3/g3}} \\)`;
            if (ans === wrong3 || wrong2 === wrong3) wrong3 = `\\( \\frac{${num+1}}{${den}} \\)`;
            
            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b11_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b11_d3: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const angles = [30, 45, 60];
            const alpha = angles[Math.floor(Math.random()*3)];
            const BC = Math.floor(Math.random()*5)*2 + 10; 
            
            const text = `Cho tam giác ABC vuông tại A có cạnh huyền \\( BC = ${BC} \\) cm và góc \\( \\widehat{B} = ${alpha}^\\circ \\). Tính độ dài cạnh \\( AC \\) (kết quả có chứa căn hoặc số nguyên).`;
            
            let AC_val = "";
            if (alpha === 30) {
                AC_val = `${BC/2}`;
            } else if (alpha === 45) {
                AC_val = `${BC/2}\\sqrt{2}`;
            } else if (alpha === 60) {
                AC_val = `${BC/2}\\sqrt{3}`;
            }
            const ans = `\\( ${AC_val} \\) cm`;
            
            const exp = `Trong tam giác vuông ABC, cạnh góc vuông \\( AC \\) là cạnh đối của góc \\( \\widehat{B} \\), và \\( BC \\) là cạnh huyền.
Theo hệ thức lượng giác: \\( \\sin B = \\frac{AC}{BC} \\Rightarrow AC = BC \\cdot \\sin B \\).
\\( AC = ${BC} \\cdot \\sin ${alpha}^\\circ \\).
Tra bảng lượng giác: \\( \\sin ${alpha}^\\circ = ${alpha === 30 ? '\\frac{1}{2}' : alpha === 45 ? '\\frac{\\sqrt{2}}{2}' : '\\frac{\\sqrt{3}}{2}'} \\).
Vậy \\( AC = ${BC} \\cdot ${alpha === 30 ? '\\frac{1}{2}' : alpha === 45 ? '\\frac{\\sqrt{2}}{2}' : '\\frac{\\sqrt{3}}{2}'} = ${AC_val} \\) (cm).`;

            let wrong1 = alpha === 60 ? `\\( ${BC/2} \\) cm` : `\\( ${BC/2}\\sqrt{3} \\) cm`;
            let wrong2 = alpha === 45 ? `\\( ${BC/2} \\) cm` : `\\( ${BC/2}\\sqrt{2} \\) cm`;
            let wrong3 = `\\( ${BC*2} \\) cm`;
            
            const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
            q.push({ id: 'b11_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    b11_d4: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const ratios = [
                {a: 1, b: 2}, {a: 2, b: 3}, {a: 3, b: 4}, 
                {a: 4, b: 5}, {a: 1, b: 3}, {a: 2, b: 5}
            ];
            const rat = ratios[Math.floor(Math.random() * ratios.length)];
            const trig = ['sin', 'cos', 'tan', 'cot'][Math.floor(Math.random()*4)];
            
            let val = rat.a;
            let val2 = rat.b;
            if (trig === 'tan' || trig === 'cot') {
                val = Math.floor(Math.random()*5)+1;
                val2 = Math.floor(Math.random()*5)+2;
                while (val === val2) val2 = Math.floor(Math.random()*5)+2;
            }
            
            const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
            const g = gcd(val, val2);
            val /= g; val2 /= g;
            
            const text = `Biết \\( \\${trig} \\alpha = \\frac{${val}}{${val2}} \\). Tính ${trig === 'sin' || trig === 'cos' ? '\\( \\tan \\alpha \\)' : '\\( \\sin \\alpha \\)'}.`;
            
            let opp, adj, hyp;
            if (trig === 'sin') {
                opp = val; hyp = val2;
                adj = Math.sqrt(hyp*hyp - opp*opp);
            } else if (trig === 'cos') {
                adj = val; hyp = val2;
                opp = Math.sqrt(hyp*hyp - adj*adj);
            } else if (trig === 'tan') {
                opp = val; adj = val2;
                hyp = Math.sqrt(opp*opp + adj*adj);
            } else {
                adj = val; opp = val2;
                hyp = Math.sqrt(opp*opp + adj*adj);
            }
            
            let ansStr = '';
            let targetTrig = trig === 'sin' || trig === 'cos' ? 'tan' : 'sin';
            let w1Str = '';
            let w2Str = '';
            if (targetTrig === 'tan') {
                let denom = Number.isInteger(adj) ? adj : `\\sqrt{${hyp*hyp - opp*opp}}`;
                let denom_no_sqrt = Number.isInteger(adj) ? adj : `${hyp*hyp - opp*opp}`;
                ansStr = `\\( \\frac{${opp}}{${denom}} \\)`;
                w1Str = `\\( \\frac{1}{${opp}} ${denom} \\)`;
                w2Str = `\\( \\frac{${opp}}{${denom_no_sqrt}} \\)`;
            } else {
                let denom = Number.isInteger(hyp) ? hyp : `\\sqrt{${opp*opp + adj*adj}}`;
                let denom_no_sqrt = Number.isInteger(hyp) ? hyp : `${opp*opp + adj*adj}`;
                ansStr = `\\( \\frac{${opp}}{${denom}} \\)`;
                w1Str = `\\( \\frac{1}{${opp}} ${denom} \\)`;
                w2Str = `\\( \\frac{${opp}}{${denom_no_sqrt}} \\)`;
            }

            const exp = `Dựng một tam giác vuông có góc nhọn \\( \\alpha \\).\n` +
                (trig === 'sin' ? `Vì \\( \\sin \\alpha = \\frac{${val}}{${val2}} \\), ta chọn cạnh đối = ${val}, cạnh huyền = ${val2}.\nCạnh kề = \\( \\sqrt{${val2}^2 - ${val}^2} = ${Number.isInteger(adj)?adj:`\\sqrt{${hyp*hyp - opp*opp}}`} \\).\n` :
                 trig === 'cos' ? `Vì \\( \\cos \\alpha = \\frac{${val}}{${val2}} \\), ta chọn cạnh kề = ${val}, cạnh huyền = ${val2}.\nCạnh đối = \\( \\sqrt{${val2}^2 - ${val}^2} = ${Number.isInteger(opp)?opp:`\\sqrt{${hyp*hyp - adj*adj}}`} \\).\n` :
                 trig === 'tan' ? `Vì \\( \\tan \\alpha = \\frac{${val}}{${val2}} \\), ta chọn cạnh đối = ${val}, cạnh kề = ${val2}.\nCạnh huyền = \\( \\sqrt{${val}^2 + ${val2}^2} = ${Number.isInteger(hyp)?hyp:`\\sqrt{${opp*opp + adj*adj}}`} \\).\n` :
                 `Vì \\( \\cot \\alpha = \\frac{${val}}{${val2}} \\), ta chọn cạnh kề = ${val}, cạnh đối = ${val2}.\nCạnh huyền = \\( \\sqrt{${val2}^2 + ${val}^2} = ${Number.isInteger(hyp)?hyp:`\\sqrt{${opp*opp + adj*adj}}`} \\).\n`) +
                `Vậy \\( \\${targetTrig} \\alpha = \\) ${ansStr}.`;
            
            const wrong1 = w1Str;
            const wrong2 = w2Str;
            const wrong3 = `\\( \\frac{${val}}{${val2}} \\)`;

            const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
            q.push({ id: 'b11_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b11_d5: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const alpha = Math.floor(Math.random()*40)+10; 
            const beta = 90 - alpha;
            const text = `Tính giá trị của biểu thức: \\( A = \\sin^2 ${alpha}^\\circ + \\sin^2 ${beta}^\\circ \\)`;
            const ansStr = `\\( A = 1 \\)`;
            
            const exp = `Vì \\( ${alpha}^\\circ + ${beta}^\\circ = 90^\\circ \\) nên hai góc này phụ nhau.
Áp dụng tính chất tỉ số lượng giác của hai góc phụ nhau: \\( \\sin ${beta}^\\circ = \\cos ${alpha}^\\circ \\).
Thay vào biểu thức: \\( A = \\sin^2 ${alpha}^\\circ + \\cos^2 ${alpha}^\\circ \\).
Lại có công thức cơ bản: \\( \\sin^2 \\alpha + \\cos^2 \\alpha = 1 \\).
Vậy \\( A = 1 \\).`;

            const wrong1 = `\\( A = 0 \\)`;
            const wrong2 = `\\( A = 2 \\)`;
            const wrong3 = `\\( A = \\sin ${alpha}^\\circ \\)`;
            const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
            q.push({ id: 'b11_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b11_d6: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const arr = [];
            for (let j=0; j<4; j++) {
                let isSin = Math.random() > 0.5;
                let ang = Math.floor(Math.random()*80)+5; 
                arr.push({ orig: `\\${isSin?'sin':'cos'} ${ang}^\\circ`, val: Math.sin((isSin?ang:(90-ang))*Math.PI/180), equivAng: isSin?ang:90-ang });
            }
            arr.sort((a,b) => a.val - b.val); 
            
            const items = this.shuffle([...arr]); 
            const listStr = items.map(x => x.orig).join(', ');
            
            const text = `Sắp xếp các tỉ số lượng giác sau theo thứ tự tăng dần: \\( ${listStr} \\).`;
            
            const ansStr = arr.map(x => x.orig).join(' < ');
            
            let exp = `Đổi các tỉ số lượng giác về cùng hàm \\( \\sin \\) (sử dụng tính chất 2 góc phụ nhau: \\( \\cos \\alpha = \\sin(90^\\circ - \\alpha) \\)):\n`;
            for (let x of items) {
                if (x.orig.includes('cos')) {
                    exp += `\\( ${x.orig} = \\sin ${x.equivAng}^\\circ \\).\n`;
                }
            }
            exp += `Sắp xếp các góc theo thứ tự tăng dần: \\( ${arr.map(x => x.equivAng + '^\\circ').join(' < ')} \\).\n`;
            exp += `Vì góc nhọn càng lớn thì sin càng lớn, suy ra: \\( ${arr.map(x => '\\sin ' + x.equivAng + '^\\circ').join(' < ')} \\).\n`;
            exp += `Vậy ta có thứ tự: \\( ${ansStr} \\).`;

            let wrong1 = [...arr].reverse().map(x => x.orig).join(' < '); 
            let wrong2 = this.shuffle([...arr]).map(x => x.orig).join(' < ');
            let wrong3 = this.shuffle([...arr]).map(x => x.orig).join(' < ');
            
            const opts = this.shuffle([`\\( ${ansStr} \\)`, `\\( ${wrong1} \\)`, `\\( ${wrong2} \\)`, `\\( ${wrong3} \\)`]);
            q.push({ id: 'b11_d6_'+i, text, options: opts, correctAnswer: opts.findIndex(x => x === `\\( ${ansStr} \\)`), explanation: exp });
        }
        return q;
    },
    b12_d1: function(count=5) {
        const q = [];
        let types = [];
        for(let i=0; i<count; i++) types.push(i % 2);
        types = this.shuffle(types);
        
        for(let i=0; i<count; i++) {
            if (types[i] === 0) {
                const triples = [
                    [3, 4, 5], [6, 8, 10], [5, 12, 13], 
                    [8, 15, 17], [7, 24, 25], [9, 12, 15],
                    [15, 20, 25], [12, 16, 20], [10, 24, 26]
                ];
                const tr = triples[Math.floor(Math.random() * triples.length)];
                const a = tr[0], b = tr[1], c = tr[2];
                const missing = Math.floor(Math.random()*3); 
                
                let text = `Giải tam giác ABC vuông tại A, biết `;
                let ansStr = '';
                let exp = `Sử dụng định lý Pythagore trong tam giác ABC vuông tại A:\n`;
                let b_ang = Math.round(Math.asin(b/c) * 180 / Math.PI);
                let c_ang = 90 - b_ang;
                
                if (missing === 0) {
                    text += `\\( AC = ${b} \\) cm, \\( BC = ${c} \\) cm.`;
                    ansStr = `\\( AB = ${a} \\text{ cm}; \\widehat{B} \\approx ${b_ang}^\\circ; \\widehat{C} \\approx ${c_ang}^\\circ \\)`;
                    exp += `\\( AB = \\sqrt{BC^2 - AC^2} = \\sqrt{${c}^2 - ${b}^2} = ${a} \\) (cm).\n`;
                    exp += `Tính góc: \\( \\sin B = \\frac{AC}{BC} = \\frac{${b}}{${c}} \\Rightarrow \\widehat{B} \\approx ${b_ang}^\\circ \\).\n`;
                } else if (missing === 1) {
                    text += `\\( AB = ${a} \\) cm, \\( BC = ${c} \\) cm.`;
                    ansStr = `\\( AC = ${b} \\text{ cm}; \\widehat{B} \\approx ${b_ang}^\\circ; \\widehat{C} \\approx ${c_ang}^\\circ \\)`;
                    exp += `\\( AC = \\sqrt{BC^2 - AB^2} = \\sqrt{${c}^2 - ${a}^2} = ${b} \\) (cm).\n`;
                    exp += `Tính góc: \\( \\cos B = \\frac{AB}{BC} = \\frac{${a}}{${c}} \\Rightarrow \\widehat{B} \\approx ${b_ang}^\\circ \\).\n`;
                } else {
                    text += `\\( AB = ${a} \\) cm, \\( AC = ${b} \\) cm.`;
                    ansStr = `\\( BC = ${c} \\text{ cm}; \\widehat{B} \\approx ${b_ang}^\\circ; \\widehat{C} \\approx ${c_ang}^\\circ \\)`;
                    exp += `\\( BC = \\sqrt{AB^2 + AC^2} = \\sqrt{${a}^2 + ${b}^2} = ${c} \\) (cm).\n`;
                    exp += `Tính góc: \\( \\tan B = \\frac{AC}{AB} = \\frac{${b}}{${a}} \\Rightarrow \\widehat{B} \\approx ${b_ang}^\\circ \\).\n`;
                }
                exp += `Suy ra \\( \\widehat{C} = 90^\\circ - \\widehat{B} \\approx ${c_ang}^\\circ \\).`;
                
                const w1 = ansStr.replace(`\\approx ${b_ang}^\\circ`, `\\approx ${c_ang}^\\circ`).replace(`\\approx ${c_ang}^\\circ`, `\\approx ${b_ang}^\\circ`);
                let val_wrong = missing === 0 ? a+1 : missing === 1 ? b+1 : c+1;
                const w2 = ansStr.replace(`= ${missing===0?a:missing===1?b:c} \\`, `= ${val_wrong} \\`);
                const w3 = ansStr.replace(`\\approx ${b_ang}^\\circ`, `\\approx ${b_ang+5}^\\circ`);
                
                const opts = this.shuffle([ansStr, w1, w2, w3]);
                q.push({ id: 'b12_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const angles = [30, 45, 60];
                const ang = angles[Math.floor(Math.random()*3)];
                const isHyp = Math.random() > 0.5; 
                const side = (Math.floor(Math.random()*5)+3)*2; 
                
                let text = `Giải tam giác ABC vuông tại A, biết \\( \\widehat{B} = ${ang}^\\circ \\) và `;
                let ansStr = '';
                let exp = `Vì tam giác ABC vuông tại A nên \\( \\widehat{C} = 90^\\circ - \\widehat{B} = 90^\\circ - ${ang}^\\circ = ${90-ang}^\\circ \\).\n`;
                
                if (isHyp) {
                    text += `\\( BC = ${side} \\) cm.`;
                    const ab = ang === 30 ? `${side}\\cdot \\frac{\\sqrt{3}}{2} = ${side/2}\\sqrt{3}` : ang === 45 ? `${side}\\cdot \\frac{\\sqrt{2}}{2} = ${side/2}\\sqrt{2}` : `${side}\\cdot \\frac{1}{2} = ${side/2}`;
                    const ac = ang === 30 ? `${side}\\cdot \\frac{1}{2} = ${side/2}` : ang === 45 ? `${side/2}\\sqrt{2}` : `${side/2}\\sqrt{3}`;
                    
                    const ab_val = ang === 30 ? `${side/2}\\sqrt{3}` : ang === 45 ? `${side/2}\\sqrt{2}` : `${side/2}`;
                    const ac_val = ang === 30 ? `${side/2}` : ang === 45 ? `${side/2}\\sqrt{2}` : `${side/2}\\sqrt{3}`;
                    
                    ansStr = `\\( \\widehat{C} = ${90-ang}^\\circ; AB = ${ab_val}\\text{ cm}; AC = ${ac_val}\\text{ cm} \\)`;
                    exp += `Tính cạnh góc vuông: \\( AB = BC \\cdot \\cos B = ${side} \\cdot \\cos ${ang}^\\circ = ${ab} \\) (cm).\n`;
                    exp += `Tính cạnh góc vuông: \\( AC = BC \\cdot \\sin B = ${side} \\cdot \\sin ${ang}^\\circ = ${ac} \\) (cm).`;
                    
                    const w1 = `\\( \\widehat{C} = ${90-ang}^\\circ; AB = ${ac_val}\\text{ cm}; AC = ${ab_val}\\text{ cm} \\)`; 
                    const w2 = `\\( \\widehat{C} = ${ang}^\\circ; AB = ${ab_val}\\text{ cm}; AC = ${ac_val}\\text{ cm} \\)`; 
                    const w3 = `\\( \\widehat{C} = ${90-ang}^\\circ; AB = ${side}\\sqrt{3}\\text{ cm}; AC = ${side}\\text{ cm} \\)`; 
                    
                    const opts = this.shuffle([ansStr, w1, w2, w3]);
                    q.push({ id: 'b12_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
                } else {
                    text += `\\( AB = ${side} \\) cm.`;
                    
                    const fmtNum = (n) => Number.isInteger(n) ? n : parseFloat(n.toFixed(3));
                    const bc_val = ang === 30 ? `${fmtNum(side*2/3)}\\sqrt{3}` : ang === 45 ? `${side}\\sqrt{2}` : `${side*2}`;
                    const ac_val = ang === 30 ? `${fmtNum(side/3)}\\sqrt{3}` : ang === 45 ? `${side}` : `${side}\\sqrt{3}`;
                    
                    ansStr = `\\( \\widehat{C} = ${90-ang}^\\circ; BC = ${bc_val}\\text{ cm}; AC = ${ac_val}\\text{ cm} \\)`;
                    
                    exp += `Tính cạnh góc vuông: \\( AC = AB \\cdot \\tan B = ${side} \\cdot \\tan ${ang}^\\circ = ${ac_val} \\) (cm).\n`;
                    exp += `Tính cạnh huyền: \\( BC = \\frac{AB}{\\cos B} = \\frac{${side}}{\\cos ${ang}^\\circ} = ${bc_val} \\) (cm).`;
                    
                    const w1 = `\\( \\widehat{C} = ${90-ang}^\\circ; BC = ${ac_val}\\text{ cm}; AC = ${bc_val}\\text{ cm} \\)`;
                    const w2 = `\\( \\widehat{C} = ${ang}^\\circ; BC = ${bc_val}\\text{ cm}; AC = ${ac_val}\\text{ cm} \\)`;
                    const w3 = `\\( \\widehat{C} = ${90-ang}^\\circ; BC = ${side}\\text{ cm}; AC = ${side}\\sqrt{3}\\text{ cm} \\)`;
                    
                    const opts = this.shuffle([ansStr, w1, w2, w3]);
                    q.push({ id: 'b12_d1_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
                }
            }
        }
        return q;
    },
    b12_d2: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const B = 45; 
            const C = 60; 
            const AH = (Math.floor(Math.random()*4)+2)*6; 
            
            const AB = AH * Math.sqrt(2); 
            const AC = AH * 2 / Math.sqrt(3); 
            
            const AB_disp = `${AH}\\sqrt{2}`;
            
            const text = `Cho tam giác ABC nhọn, biết \\( \\widehat{B} = ${B}^\\circ \\), \\( \\widehat{C} = ${C}^\\circ \\), và \\( AB = ${AB_disp} \\) cm. Kẻ đường cao AH. Tính độ dài cạnh \\( AC \\) (kết quả chứa căn).`;
            
            const ac_val = (2 * AH) % 3 === 0 ? `${(2*AH/3)}\\sqrt{3}` : `\\frac{${2*AH}}{3}\\sqrt{3}`;
            const ansStr = `\\( AC = ${ac_val} \\text{ cm} \\)`;
            
            const exp = `Kẻ đường cao \\( AH \\perp BC \\) (\\( H \\in BC \\)). Ta có hai tam giác vuông \\( AHB \\) và \\( AHC \\).\n` +
                `Xét tam giác vuông \\( AHB \\): \\( AH = AB \\cdot \\sin B = ${AB_disp} \\cdot \\sin ${B}^\\circ = ${AB_disp} \\cdot \\frac{\\sqrt{2}}{2} = ${AH} \\) (cm).\n` +
                `Xét tam giác vuông \\( AHC \\): \\( AC = \\frac{AH}{\\sin C} = \\frac{${AH}}{\\sin ${C}^\\circ} = \\frac{${AH}}{\\frac{\\sqrt{3}}{2}} = ${ac_val} \\) (cm).`;
            
            let wrong1 = `\\( AC = ${AH}\\sqrt{3} \\text{ cm} \\)`;
            let wrong2 = `\\( AC = ${AH*2} \\text{ cm} \\)`;
            let wrong3 = `\\( AC = ${(2 * AH) % 3 === 0 ? (2*AH/3) : `\\frac{${2*AH}}{3}`} \\sqrt{2} \\text{ cm} \\)`;
            if (wrong1 === ansStr) wrong1 = `\\( AC = ${AH} \\text{ cm} \\)`;
            
            const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
            q.push({ id: 'b12_d2_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    },
    b12_d3: function(count=5) {
        const q = [];
        let types = [];
        for(let i=0; i<count; i++) types.push(i % 2);
        types = this.shuffle(types);
        
        for(let i=0; i<count; i++) {
            if (types[i] === 0) {
                const a = (Math.floor(Math.random()*5)+2)*2; 
                const b = (Math.floor(Math.random()*5)+3)*2; 
                const angles = [30, 45, 60];
                const C = angles[Math.floor(Math.random()*3)];
                
                const text = `Tính diện tích tam giác ABC biết \\( AC = ${b} \\) cm, \\( BC = ${a} \\) cm và góc xen giữa \\( \\widehat{C} = ${C}^\\circ \\).`;
                
                let S_val = '';
                const S_coeff = (a * b) / 2;
                if (C === 30) {
                    S_val = `${S_coeff / 2}`;
                } else if (C === 45) {
                    S_val = `${S_coeff / 2}\\sqrt{2}`;
                } else {
                    S_val = `${S_coeff / 2}\\sqrt{3}`;
                }
                const ansStr = `\\( ${S_val} \\text{ cm}^2 \\)`;
                
                const exp = `Kẻ đường cao \\( AH \\perp BC \\).\n` +
                    `Trong tam giác vuông \\( AHC \\), ta có \\( AH = AC \\cdot \\sin C = ${b} \\cdot \\sin ${C}^\\circ \\).\n` +
                    `Diện tích tam giác \\( ABC \\) là:\n` +
                    `\\( S = \\frac{1}{2} \\cdot BC \\cdot AH = \\frac{1}{2} \\cdot BC \\cdot AC \\cdot \\sin C \\)\n` +
                    `\\( S = \\frac{1}{2} \\cdot ${a} \\cdot ${b} \\cdot \\sin ${C}^\\circ = ${S_coeff} \\cdot ${C === 30 ? '\\frac{1}{2}' : C === 45 ? '\\frac{\\sqrt{2}}{2}' : '\\frac{\\sqrt{3}}{2}'} = ${S_val} \\) (\\( \\text{cm}^2 \\)).`;

                const wrong1 = `\\( ${S_coeff} \\text{ cm}^2 \\)`;
                const wrong2 = C === 30 ? `\\( ${S_coeff / 2}\\sqrt{3} \\text{ cm}^2 \\)` : `\\( ${S_coeff / 2} \\text{ cm}^2 \\)`;
                const wrong3 = `\\( ${S_coeff * 2} \\text{ cm}^2 \\)`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b12_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const a = (Math.floor(Math.random()*5)+2)*2; 
                const b = (Math.floor(Math.random()*5)+3)*2; 
                const angles = [30, 45, 60];
                const C = angles[Math.floor(Math.random()*3)];
                
                const text = `Tính diện tích hình bình hành ABCD biết \\( AB = ${a} \\) cm, \\( AD = ${b} \\) cm và góc \\( \\widehat{A} = ${C}^\\circ \\).`;
                
                let S_val = '';
                const S_coeff = a * b;
                if (C === 30) {
                    S_val = `${S_coeff / 2}`;
                } else if (C === 45) {
                    S_val = `${S_coeff / 2}\\sqrt{2}`;
                } else {
                    S_val = `${S_coeff / 2}\\sqrt{3}`;
                }
                const ansStr = `\\( ${S_val} \\text{ cm}^2 \\)`;
                
                const exp = `Kẻ đường cao \\( DH \\perp AB \\) (\\( H \\in AB \\)).\n` +
                    `Trong tam giác vuông \\( AHD \\), ta có \\( DH = AD \\cdot \\sin A = ${b} \\cdot \\sin ${C}^\\circ \\).\n` +
                    `Diện tích hình bình hành \\( ABCD \\) là tích của cạnh đáy và chiều cao tương ứng:\n` +
                    `\\( S = AB \\cdot DH = AB \\cdot AD \\cdot \\sin A \\)\n` +
                    `\\( S = ${a} \\cdot ${b} \\cdot \\sin ${C}^\\circ = ${S_coeff} \\cdot ${C === 30 ? '\\frac{1}{2}' : C === 45 ? '\\frac{\\sqrt{2}}{2}' : '\\frac{\\sqrt{3}}{2}'} = ${S_val} \\) (\\( \\text{cm}^2 \\)).`;

                const wrong1 = `\\( ${S_coeff} \\text{ cm}^2 \\)`;
                const wrong2 = C === 30 ? `\\( ${S_coeff / 2}\\sqrt{3} \\text{ cm}^2 \\)` : `\\( ${S_coeff / 2} \\text{ cm}^2 \\)`;
                const wrong3 = `\\( ${S_coeff / 4} \\text{ cm}^2 \\)`;
                
                const opts = this.shuffle([ansStr, wrong1, wrong2, wrong3]);
                q.push({ id: 'b12_d3_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    },
    b12_d4: function(count=5) {
        const q = [];
        let types = [];
        for(let i=0; i<count; i++) types.push(i % 3);
        types = this.shuffle(types);
        
        for(let i=0; i<count; i++) {
            if (types[i] === 0) {
                const length = Math.floor(Math.random()*4)+4; 
                const ang = Math.floor(Math.random()*15)+55; 
                const text = `Một cái thang dài \\( ${length} \\) m tựa vào một bức tường. Góc tạo bởi cái thang và mặt đất là \\( ${ang}^\\circ \\). Hỏi chân thang cách chân tường bao nhiêu mét? (Làm tròn đến 2 chữ số thập phân).`;
                
                const dist = length * Math.cos(ang * Math.PI / 180);
                const ansStr = `\\( ${dist.toFixed(2)} \\text{ m} \\)`;
                
                const exp = `Bài toán được mô hình hóa thành tam giác vuông, trong đó cái thang là cạnh huyền (\\( ${length} \\) m), khoảng cách từ chân thang đến chân tường là cạnh kề của góc tạo bởi thang và mặt đất (\\( ${ang}^\\circ \\)).\n` +
                    `Sử dụng hệ thức: \\( \\text{cạnh kề} = \\text{cạnh huyền} \\cdot \\cos(\\text{góc}) \\)\n` +
                    `\\( d = ${length} \\cdot \\cos ${ang}^\\circ \\approx ${dist.toFixed(2)} \\text{ m} \\).`;
                
                const w1 = `\\( ${(length * Math.sin(ang * Math.PI / 180)).toFixed(2)} \\text{ m} \\)`; 
                const w2 = `\\( ${(length / Math.cos(ang * Math.PI / 180)).toFixed(2)} \\text{ m} \\)`;
                const w3 = `\\( ${(length * Math.tan(ang * Math.PI / 180)).toFixed(2)} \\text{ m} \\)`;
                
                const opts = this.shuffle([ansStr, w1, w2, w3]);
                q.push({ id: 'b12_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else if (types[i] === 1) {
                const v = Math.floor(Math.random()*200)+400; 
                const t_min = Math.floor(Math.random()*5)+2; 
                const ang = Math.floor(Math.random()*10)+10; 
                
                const text = `Một máy bay cất cánh với vận tốc \\( ${v} \\text{ km/h} \\) bay lên theo một đường thẳng tạo với mặt đất một góc \\( ${ang}^\\circ \\). Hỏi sau \\( ${t_min} \\) phút bay, máy bay ở độ cao bao nhiêu km so với mặt đất? (Làm tròn đến 2 chữ số thập phân).`;
                
                const dist = v * (t_min / 60); 
                const height = dist * Math.sin(ang * Math.PI / 180);
                const ansStr = `\\( ${height.toFixed(2)} \\text{ km} \\)`;
                
                const exp = `Đổi \\( ${t_min} \\) phút = \\( \\frac{${t_min}}{60} \\) giờ = \\( ${Number.isInteger(t_min/60) ? t_min/60 : `\\frac{${t_min}}{60}`} \\) giờ.\n` +
                    `Quãng đường máy bay bay được (cạnh huyền của tam giác vuông): \\( s = v \\cdot t = ${v} \\cdot \\frac{${t_min}}{60} = ${dist} \\text{ km} \\).\n` +
                    `Độ cao của máy bay là cạnh đối của góc \\( ${ang}^\\circ \\):\n` +
                    `\\( h = s \\cdot \\sin ${ang}^\\circ = ${dist} \\cdot \\sin ${ang}^\\circ \\approx ${height.toFixed(2)} \\text{ km} \\).`;
                
                const w1 = `\\( ${(dist * Math.cos(ang * Math.PI / 180)).toFixed(2)} \\text{ km} \\)`; 
                const w2 = `\\( ${(v * t_min * Math.sin(ang * Math.PI / 180)).toFixed(2)} \\text{ km} \\)`; 
                const w3 = `\\( ${(dist * Math.tan(ang * Math.PI / 180)).toFixed(2)} \\text{ km} \\)`;
                
                const opts = this.shuffle([ansStr, w1, w2, w3]);
                q.push({ id: 'b12_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            } else {
                const gk = (Math.floor(Math.random()*5)+13)/10; 
                const dist = Math.floor(Math.random()*10)+20; 
                const ang = Math.floor(Math.random()*15)+35; 
                
                const text = `Một người dùng giác kế đo chiều cao của một cái cây. Biết khoảng cách từ điểm đặt giác kế đến gốc cây là \\( ${dist} \\text{ m} \\), chiều cao của giác kế (tính từ mặt đất đến ống ngắm) là \\( ${gk} \\text{ m} \\) và góc nâng quan sát được đỉnh cây là \\( ${ang}^\\circ \\). Tính chiều cao của cây (làm tròn đến 2 chữ số thập phân).`;
                
                const height_rel = dist * Math.tan(ang * Math.PI / 180);
                const height = height_rel + gk;
                const ansStr = `\\( ${height.toFixed(2)} \\text{ m} \\)`;
                
                const exp = `Phần ngọn cây tính từ tầm mắt người đo tạo thành cạnh đối của một tam giác vuông có cạnh kề là khoảng cách từ người đo đến cây (\\( ${dist} \\text{ m} \\)).\n` +
                    `Chiều cao phần ngọn cây so với giác kế là: \\( h_1 = ${dist} \\cdot \\tan ${ang}^\\circ \\approx ${height_rel.toFixed(2)} \\text{ m} \\).\n` +
                    `Chiều cao tổng thể của cây bằng chiều cao phần ngọn cộng với chiều cao giác kế:\n` +
                    `\\( H = h_1 + ${gk} \\approx ${height.toFixed(2)} \\text{ m} \\).`;
                
                const w1 = `\\( ${height_rel.toFixed(2)} \\text{ m} \\)`; 
                const w2 = `\\( ${(dist * Math.sin(ang * Math.PI / 180) + gk).toFixed(2)} \\text{ m} \\)`;
                const w3 = `\\( ${(dist * Math.cos(ang * Math.PI / 180) + gk).toFixed(2)} \\text{ m} \\)`;
                
                const opts = this.shuffle([ansStr, w1, w2, w3]);
                q.push({ id: 'b12_d4_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
            }
        }
        return q;
    }

};
window.MathGenerators = Generators;
