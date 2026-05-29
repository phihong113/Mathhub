const fs = require('fs');
const dangs = JSON.parse(fs.readFileSync('all_dangs.json', 'utf8'));

let out = `
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
            const text = \`[\${title}] Tìm giá trị của biểu thức: \\\\( \${a}x + \${b} \\\\) khi \\\\( x = 1 \\\\)?\`;
            const exp = \`Thay \\\\( x = 1 \\\\) vào biểu thức ta được: \\\\( \${a}(1) + \${b} = \${ans} \\\\).\`;
            const opts = this.shuffle([\`\${ans}\`, \`\${ans+1}\`, \`\${ans-1}\`, \`\${a*b}\`]);
            q.push({ id: id+'_'+i, text, options: opts, correctAnswer: opts.indexOf(\`\${ans}\`), explanation: exp });
        }
        return q;
    },
    generic_equation: function(id, title, count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const x = Math.floor(Math.random()*5)+1;
            const a = Math.floor(Math.random()*3)+2;
            const c = a*x;
            const text = \`[\${title}] Giải phương trình: \\\\( \${a}x = \${c} \\\\)\`;
            const exp = \`Chia hai vế cho \${a}, ta được: \\\\( x = \\\\frac{\${c}}{\${a}} = \${x} \\\\).\`;
            const opts = this.shuffle([\`x = \${x}\`, \`x = \${x+1}\`, \`x = \${x-1}\`, \`x = \${x+2}\`]);
            q.push({ id: id+'_'+i, text, options: opts, correctAnswer: opts.indexOf(\`x = \${x}\`), explanation: exp });
        }
        return q;
    },
    generic_root: function(id, title, count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const a = Math.floor(Math.random()*5)+2;
            const text = \`[\${title}] Rút gọn biểu thức: \\\\( \\\\sqrt{\${a*a}} + 1 \\\\)\`;
            const exp = \`Ta có \\\\( \\\\sqrt{\${a*a}} = \${a} \\\\). Do đó biểu thức bằng \\\\( \${a} + 1 = \${a+1} \\\\).\`;
            const ans = \`\${a+1}\`;
            const opts = this.shuffle([ans, \`\${a}\`, \`\${a+2}\`, \`\${a*2}\`]);
            q.push({ id: id+'_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
    generic_geometry: function(id, title, count=5) {
        const q = [];
        for(let i=0; i<count; i++) {
            const r = Math.floor(Math.random()*10)+5;
            const text = \`[\${title}] Cho đường tròn bán kính \\\\( R = \${r} \\\\). Tính đường kính đường tròn.\`;
            const exp = \`Đường kính gấp đôi bán kính: \\\\( d = 2R = 2 \\\\cdot \${r} = \${2*r} \\\\).\`;
            const ans = \`\${2*r}\`;
            const opts = this.shuffle([ans, \`\${r}\`, \`\${r/2}\`, \`\${r+2}\`]);
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
            const text = \`[\${title}] Giải hệ phương trình: \\\\( \\\\begin{cases} x + y = \${c1} \\\\\\\\ x - y = \${c2} \\\\end{cases} \\\\)\`;
            const exp = \`Cộng hai phương trình ta có \\\\( 2x = \${c1+c2} \\\\Rightarrow x = \${x} \\\\). Từ đó \\\\( y = \${y} \\\\).\`;
            const ans = \`(\${x}; \${y})\`;
            const opts = this.shuffle([ans, \`(\${x+1}; \${y})\`, \`(\${x}; \${y-1})\`, \`(\${y}; \${x})\`]);
            q.push({ id: id+'_'+i, text, options: opts, correctAnswer: opts.indexOf(ans), explanation: exp });
        }
        return q;
    },
`;

for (let key in dangs) {
    let forms = dangs[key];
    let baiNum = key.replace('bai', '');
    
    forms.forEach((title, idx) => {
        let fnName = `b${baiNum}_d${idx+1}`;
        let type = 'generic_algebra';
        let lower = title.toLowerCase();
        
        if (lower.includes('phương trình') || lower.includes('hệ')) type = 'generic_system';
        if (lower.includes('phương trình') && !lower.includes('hệ')) type = 'generic_equation';
        if (lower.includes('căn')) type = 'generic_root';
        if (lower.includes('đường tròn') || lower.includes('tam giác') || lower.includes('độ dài') || lower.includes('lượng giác')) type = 'generic_geometry';

        out += `
    ${fnName}: function(count=5) {
        return this.${type}('${fnName}', \`${title}\`, count);
    },`;
    });
}

const bai12 = [
    {id: 'b1_d1', title: 'Dạng 1: Nhận biết nghiệm'},
    {id: 'b1_d2', title: 'Dạng 2: Phương trình chứa tham số'},
    {id: 'b1_d3', title: 'Dạng 3: Tìm nghiệm tổng quát'},
    {id: 'b1_d4', title: 'Dạng 4: Nhận biết hệ'},
    {id: 'b1_d5', title: 'Dạng 5: Đoán số nghiệm'},
    {id: 'b2_d1', title: 'Dạng 1: Thế'},
    {id: 'b2_d2', title: 'Dạng 2: Cộng đại số'},
    {id: 'b2_d3', title: 'Dạng 3: Quy về bậc nhất'},
    {id: 'b2_d4', title: 'Dạng 4: Đặt ẩn phụ'},
    {id: 'b2_d5', title: 'Dạng 5: Tham số'}
];

bai12.forEach(item => {
    out += `
    ${item.id}: function(count=5) {
        return this.generic_system('${item.id}', \`${item.title}\`, count);
    },`;
});

out += `
};
window.MathGenerators = Generators;
`;

fs.writeFileSync('js/generators.js', out, 'utf8');

const algebraIds = [7, 8, 9, 10, 1, 2, 3, 4, 5, 6];
const geometryIds = [11, 12, 13, 14, 15, 16, 17];
const titlesMap = {
    1: "Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
    2: "Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn",
    3: "Bài 3: Giải bài toán bằng cách lập hệ phương trình",
    4: "Bài 4: Phương trình quy về phương trình bậc nhất một ẩn",
    5: "Bài 5: Bất đẳng thức và tính chất",
    6: "Bài 6: Bất phương trình bậc nhất một ẩn",
    7: "Bài 7: Căn bậc hai và căn thức bậc hai",
    8: "Bài 8: Khai căn bậc hai với phép nhân và phép chia",
    9: "Bài 9: Biến đổi đơn giản và rút gọn biểu thức chứa căn",
    10: "Bài 10: Căn bậc ba",
    11: "Bài 11: Tỉ số lượng giác của góc nhọn",
    12: "Bài 12: Một số hệ thức giữa cạnh, góc trong tam giác vuông",
    13: "Bài 13: Mở đầu về đường tròn",
    14: "Bài 14: Cung và dây của một cung",
    15: "Bài 15: Độ dài đường tròn, cung tròn",
    16: "Bài 16: Vị trí tương đối của đường thẳng và đường tròn",
    17: "Bài 17: Vị trí tương đối của hai đường tròn"
};

function buildTopic(id) {
    if (id === 1) return { id: "bai1", title: titlesMap[1], practice: bai12.slice(0,5).map(f => ({...f, generator: f.id})) };
    if (id === 2) return { id: "bai2", title: titlesMap[2], practice: bai12.slice(5,10).map(f => ({...f, generator: f.id})) };
    
    let practice = [];
    const forms = dangs["bai" + id] || [];
    forms.forEach((title, idx) => {
        practice.push({
            id: `b${id}_d${idx+1}`,
            title: title,
            generator: `b${id}_d${idx+1}`
        });
    });
    return { id: "bai" + id, title: titlesMap[id], practice: practice };
}

const math9Data = {
    algebra: { title: "Đại Số", topics: algebraIds.map(buildTopic) },
    geometry: { title: "Hình Học", topics: geometryIds.map(buildTopic) }
};

fs.writeFileSync('js/data_math9.js', `const math9Data = ${JSON.stringify(math9Data, null, 4)};\n\nwindow.math9Data = math9Data;\n`, 'utf8');

console.log("Success");
