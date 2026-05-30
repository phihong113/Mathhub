
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
    b9_d8: function(count=5) {
        return this.generic_root('b9_d8', `Dạng 8: Sử dụng các phép biến đổi căn thức bậc hai để giải phương trình`, count);
    },
    b10_d1: function(count=5) {
        return this.generic_root('b10_d1', `Dạng 1: Tính căn thức bậc ba`, count);
    },
    b10_d2: function(count=5) {
        return this.generic_root('b10_d2', `Dạng 2: Tính giá trị, rút gọn biểu thức chứa căn bậc ba`, count);
    },
    b10_d3: function(count=5) {
        return this.generic_root('b10_d3', `Dạng 2: Khử mẫu thức chứa căn bậc ba`, count);
    },
    b10_d4: function(count=5) {
        return this.generic_root('b10_d4', `Dạng 3: So sánh các căn bậc ba`, count);
    },
    b10_d5: function(count=5) {
        return this.generic_root('b10_d5', `Dạng 4: Giải phương trình chứa căn bậc ba`, count);
    },
    b10_d6: function(count=5) {
        return this.generic_algebra('b10_d6', `Dạng 4: Bài toán thực tế`, count);
    },
    b11_d1: function(count=5) {
        return this.generic_geometry('b11_d1', `Dạng 1: Sử dụng MTCT tính tỉ số lượng giác, tính góc`, count);
    },
    b11_d2: function(count=5) {
        return this.generic_geometry('b11_d2', `Dạng 2: Tính tỉ số lượng giác của góc nhọn trong một tam giác vuông`, count);
    },
    b11_d3: function(count=5) {
        return this.generic_geometry('b11_d3', `Dạng 3: Tính các cạnh trong một tam giác vuông sử dụng tỉ số lượng giác của góc nhọn.`, count);
    },
    b11_d4: function(count=5) {
        return this.generic_geometry('b11_d4', `Dạng 4: Dựng góc nhọn  biết một tỉ số lượng giác của góc đó bằng`, count);
    },
    b11_d5: function(count=5) {
        return this.generic_geometry('b11_d5', `Dạng 5: Tính giá trị của biểu thức lượng giác với các góc đặc biệt`, count);
    },
    b11_d6: function(count=5) {
        return this.generic_geometry('b11_d6', `Dạng 6: So sánh các tỉ số lượng giác mà không dùng máy tính hoặc bảng số`, count);
    },
    b12_d1: function(count=5) {
        return this.generic_geometry('b12_d1', `Dạng 1: Giải tam giác vuông`, count);
    },
    b13_d1: function(count=5) {
        return this.generic_geometry('b13_d1', `Dạng 1: Chứng minh nhiều điểm cùng nằm trên một đường tròn`, count);
    },
    b13_d2: function(count=5) {
        return this.generic_geometry('b13_d2', `Dạng 2: Xác định vị trí tương đối của điểm  với đường tròn .`, count);
    },
    b13_d3: function(count=5) {
        return this.generic_geometry('b13_d3', `Dạng 3: Tâm đối xứng, trục đối xứng của đường tròn`, count);
    },
    b14_d1: function(count=5) {
        return this.generic_algebra('b14_d1', `Dạng 1: So sánh hai đoạn thẳng`, count);
    },
    b14_d2: function(count=5) {
        return this.generic_algebra('b14_d2', `Dạng 2: Tính số đo góc ở tâm, số đo cung tròn.`, count);
    },
    b14_d3: function(count=5) {
        return this.generic_geometry('b14_d3', `Dạng 3: Tính độ dài của một dây. Tính khoảng cách từ tâm đến dây`, count);
    },
    b15_d1: function(count=5) {
        return this.generic_geometry('b15_d1', `Dạng 1: Tính độ dài đường tròn, cung tròn hoặc các đại lượng liên quan`, count);
    },
    b15_d2: function(count=5) {
        return this.generic_algebra('b15_d2', `Dạng 2: Tính diện tích hình tròn, hình quạt tròn và những yếu tố liên quan`, count);
    },
    b15_d3: function(count=5) {
        return this.generic_algebra('b15_d3', `Dạng 3: Tính diện tích hình vành khăn, hình viên phân và những yếu tố liên quan`, count);
    },
    b16_d1: function(count=5) {
        return this.generic_geometry('b16_d1', `Dạng 1: Xác định vị trí tương đối của đường thẳng và đường tròn`, count);
    },
    b16_d2: function(count=5) {
        return this.generic_geometry('b16_d2', `Dạng 2: Nhận biết một đường thẳng là tiếp tuyến của đường tròn`, count);
    },
    b16_d3: function(count=5) {
        return this.generic_geometry('b16_d3', `Dạng 2: Bài toán liên quan đến tính độ dài`, count);
    },
    b16_d4: function(count=5) {
        return this.generic_algebra('b16_d4', `Dạng 3: Bài toán vận dụng tính chất tiếp tuyến`, count);
    },
    b16_d5: function(count=5) {
        return this.generic_system('b16_d5', `Dạng 4: Chứng minh một số tính chất và hệ thức hình học`, count);
    },
    b16_d6: function(count=5) {
        return this.generic_algebra('b16_d6', `Dạng 5: Một số bài toán liên quan đến cực trị hình học`, count);
    },
    b17_d1: function(count=5) {
        return this.generic_geometry('b17_d1', `Dạng 1: Xác định vị trí tương đối của hai đường tròn`, count);
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
                // A(x) = B(x) => ax+b = cx+d
                const a = Math.floor(Math.random()*5)+2;
                let c = Math.floor(Math.random()*5)+1;
                if(a===c) c++;
                const b = Math.floor(Math.random()*10)+1;
                const d = Math.floor(Math.random()*10)+1;
                
                const text = `Tìm giá trị của \\( x \\) để giá trị của hai biểu thức \\( A = ${a}x + ${b} \\) và \\( B = ${c}x + ${d} \\) bằng nhau.`;
                const root = this.formatFraction(d-b, a-c);
                const ans = `\\( x = ${root} \\)`;
                const wrong1 = `\\( x = ${this.formatFraction(b-d, a-c)} \\)`;
                const wrong2 = `\\( x = ${this.formatFraction(d+b, a-c)} \\)`;
                const wrong3 = `\\( x = ${this.formatFraction(d-b, a+c)} \\)`;
                
                const exp = `Cho \\( A = B \\Leftrightarrow ${a}x + ${b} = ${c}x + ${d} \\)
\\( \\Leftrightarrow ${a}x - ${c}x = ${d} - ${b} \\)
\\( \\Leftrightarrow ${a-c}x = ${d-b} \\Leftrightarrow x = ${root} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                // A(x) * B(x) = 0
                const a = Math.floor(Math.random()*3)+1;
                const b = Math.floor(Math.random()*5)+1;
                const a_str = a===1?'':a;
                
                const text = `Tìm \\( x \\) để biểu thức \\( P = x(${a_str}x - ${b}) \\) có giá trị bằng 0.`;
                const root = this.formatFraction(b, a);
                const ans = `\\( x = 0 \\) hoặc \\( x = ${root} \\)`;
                const wrong1 = `\\( x = ${root} \\)`;
                const wrong2 = `\\( x = 0 \\) hoặc \\( x = ${this.formatFraction(-b, a)} \\)`;
                const wrong3 = `\\( x = 0 \\)`;
                
                const exp = `Ta có \\( P = 0 \\Leftrightarrow x(${a_str}x - ${b}) = 0 \\)
\\( \\Leftrightarrow \\begin{bmatrix} x = 0 \\\\ ${a_str}x - ${b} = 0 \\end{bmatrix} \\Leftrightarrow \\begin{bmatrix} x = 0 \\\\ x = ${root} \\end{bmatrix} \\).`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b4_d5_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    }
};
window.MathGenerators = Generators;
