
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
        for(let i=0; i<count; i++) {
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
        return q;
    },
    b8_d7: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                const A = Math.floor(Math.random()*5)+2;
                const k = Math.floor(Math.random()*5)+1;
                const B = A * k; 
                const x_val = A * k * k;
                const text = `Tìm \\( x \\), biết: \\( \\sqrt{${A}x} = ${B} \\)`;
                const ans = `\\( x = ${x_val} \\)`;
                const exp = `Điều kiện: \\( x \\geq 0 \\).
Bình phương hai vế ta được: \\( ${A}x = ${B}^2 = ${B*B} \\).
Suy ra \\( x = \\frac{${B*B}}{${A}} = ${x_val} \\) (thỏa mãn điều kiện).`;
                const wrong1 = `\\( x = ${B*B} \\)`;
                const wrong2 = `\\( x = ${k} \\)`;
                const wrong3 = `\\( x = ${x_val + 2} \\)`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b8_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const sqrt_x = Math.floor(Math.random()*4)+2;
                const x_val = sqrt_x * sqrt_x;
                let A = Math.floor(Math.random()*5)+4;
                let B = Math.floor(Math.random()*3)+1;
                const C = (A - B) * sqrt_x;
                const text = `Tìm \\( x \\), biết: \\( \\sqrt{${A*A}x} - \\sqrt{${B*B}x} = ${C} \\)`;
                const ans = `\\( x = ${x_val} \\)`;
                const exp = `Điều kiện: \\( x \\geq 0 \\).
Ta có: \\( \\sqrt{${A*A}x} - \\sqrt{${B*B}x} = ${C} \\)
\\( \\Leftrightarrow \\sqrt{${A*A}}\\sqrt{x} - \\sqrt{${B*B}}\\sqrt{x} = ${C} \\)
\\( \\Leftrightarrow ${A}\\sqrt{x} - ${B}\\sqrt{x} = ${C} \\)
\\( \\Leftrightarrow ${(A-B)}\\sqrt{x} = ${C} \\)
\\( \\Leftrightarrow \\sqrt{x} = ${sqrt_x} \\)
\\( \\Leftrightarrow x = ${x_val} \\) (thỏa mãn điều kiện).`;
                const wrong1 = `\\( x = ${sqrt_x} \\)`;
                const wrong2 = `\\( x = ${x_val + 1} \\)`;
                const wrong3 = `\\( x = ${x_val * 2} \\)`;
                const opts = this.shuffle([ans, wrong1, wrong2, wrong3]);
                q.push({ id: 'b8_d7_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            }
        }
        return q;
    },
    b8_d8: function(count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                const factor_P = [4, 9, 16][Math.floor(Math.random()*3)];
                const factor_R = [1, 4, 9][Math.floor(Math.random()*3)];
                const ratio = Math.sqrt(factor_P / factor_R);
                let R_text = factor_R === 1 ? `giữ nguyên` : `giảm ${factor_R} lần`;
                
                const text = `Công suất \\( P \\), hiệu điện thế \\( U \\), điện trở \\( R \\) liên hệ với nhau theo công thức \\( P = \\frac{U^2}{R} \\). 
Nếu công suất tăng gấp ${factor_P} lần, điện trở ${R_text} thì tỉ số giữa hiệu điện thế lúc sau và hiệu điện thế ban đầu bằng bao nhiêu?`;

                const ansStr = this.formatFraction ? this.formatFraction(Math.sqrt(factor_P), Math.sqrt(factor_R)) : `${ratio}`;
                const ans = ansStr;
                
                const exp = `Gọi công suất, hiệu điện thế, điện trở ban đầu là \\( P_1, U_1, R_1 \\). Lúc sau là \\( P_2, U_2, R_2 \\).
Ta có: \\( P_1 = \\frac{U_1^2}{R_1} \\Rightarrow U_1 = \\sqrt{P_1 R_1} \\). Tương tự \\( U_2 = \\sqrt{P_2 R_2} \\).
Theo bài ra: \\( P_2 = ${factor_P} P_1 \\) và \\( R_2 = \\frac{R_1}{${factor_R}} \\).
Do đó: \\( U_2 = \\sqrt{${factor_P} P_1 \\cdot \\frac{R_1}{${factor_R}}} = \\sqrt{\\frac{${factor_P}}{${factor_R}}} \\cdot \\sqrt{P_1 R_1} = ${ans} \\cdot U_1 \\).
Vậy tỉ số là ${ans}.`;

                const wrong1 = `${factor_P * factor_R}`;
                const wrong2 = this.formatFraction ? this.formatFraction(factor_P, factor_R) : `${factor_P / factor_R}`;
                const wrong3 = `${Math.sqrt(factor_P * factor_R)}`;
                
                const optSet = new Set([ans, wrong1, wrong2, wrong3]);
                while (optSet.size < 4) optSet.add(`${Math.floor(Math.random()*5)+2}`);
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                
                q.push({ id: 'b8_d8_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
            } else {
                const pairs = [[2, 4], [2, 1], [8, 1], [3, 6], [2, 9], [1, 18]];
                const pair = pairs[Math.floor(Math.random() * pairs.length)];
                const w = pair[0];
                const h = pair[1];
                const side = Math.sqrt(2 * w * h);
                
                const text = `Một hình chữ nhật có chiều dài là \\( ${Math.max(w, h)}\\sqrt{2} \\) (cm) và chiều rộng là \\( ${Math.min(w, h)}\\sqrt{2} \\) (cm). Một hình vuông có diện tích bằng diện tích hình chữ nhật này. Cạnh của hình vuông là bao nhiêu cm?`;
                const ans = `${side} cm`;
                const wrong1 = `${side*2} cm`;
                const wrong2 = `${side*side} cm`;
                const wrong3 = `${Math.max(w,h)*2} cm`;
                
                const exp = `Diện tích hình chữ nhật là: \\( S = ${Math.max(w, h)}\\sqrt{2} \\cdot ${Math.min(w, h)}\\sqrt{2} = ${w*h} \\cdot (\\sqrt{2})^2 = ${w*h} \\cdot 2 = ${w*h*2} \\) (\\( cm^2 \\)).
Hình vuông có diện tích bằng ${w*h*2} (\\( cm^2 \\)) nên cạnh của nó là \\( \\sqrt{${w*h*2}} = ${side} \\) (cm).`;

                const optSet = new Set([ans, wrong1, wrong2, wrong3]);
                let c = 1;
                while (optSet.size < 4) {
                    optSet.add(`${side + c} cm`);
                    c++;
                }
                const opts = this.shuffle(Array.from(optSet).slice(0, 4));
                q.push({ id: 'b8_d8_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
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
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*3)+1;
            const b = Math.floor(Math.random()*3)+2;
            const sum = a + b;
            const sq_x = Math.floor(Math.random()*3)+1;
            const x = sq_x * sq_x;
            const C = sum * sq_x;
            
            const n1 = a*a;
            const n2 = b*b;
            
            const text = `Nghiệm của phương trình \\( \\sqrt{${n1}x} + \\sqrt{${n2}x} = ${C} \\) là:`;
            const exp = `Điều kiện: \\( x \\geq 0 \\).
Ta có: \\( \\sqrt{${n1}x} + \\sqrt{${n2}x} = ${C} \\)
\\( \\Leftrightarrow ${a}\\sqrt{x} + ${b}\\sqrt{x} = ${C} \\)
\\( \\Leftrightarrow ${sum}\\sqrt{x} = ${C} \\)
\\( \\Leftrightarrow \\sqrt{x} = ${sq_x} \\)
\\( \\Leftrightarrow x = ${x} \\).`;

            const ansStr = `\\( x = ${x} \\)`;
            const wrong1 = `\\( x = ${sq_x} \\)`;
            const wrong2 = `\\( x = ${x*x} \\)`;
            const wrong3 = `\\( x = ${x+1} \\)`;
            
            const optSet = new Set([ansStr, wrong1, wrong2, wrong3]);
            while(optSet.size < 4) optSet.add(`\\( x = ${Math.floor(Math.random()*10)} \\)`);
            const opts = this.shuffle(Array.from(optSet).slice(0, 4));
            
            q.push({ id: 'b9_d8_'+i, text, options: opts, correctAnswer: opts.indexOf(ansStr), explanation: exp });
        }
        return q;
    }
};
window.MathGenerators = Generators;
