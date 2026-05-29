const fs = require('fs');
const dangs = JSON.parse(fs.readFileSync('all_dangs.json', 'utf8'));

const algebraIds = [7, 8, 9, 10, 1, 2, 3, 4, 5, 6];
const geometryIds = [11, 12, 13, 14, 15, 16, 17];

const titles = {
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

// Hardcode Bai 1 and Bai 2 which were done manually
const bai1Forms = [
    { id: "b1_d1", title: "Dạng 1: Nhận biết nghiệm của phương trình bậc nhất hai ẩn", generator: "b1_d1" },
    { id: "b1_d2", title: "Dạng 2: Phương trình chứa tham số", generator: "b1_d2" },
    { id: "b1_d3", title: "Dạng 3: Tìm nghiệm tổng quát", generator: "b1_d3" },
    { id: "b1_d4", title: "Dạng 4: Nhận biết nghiệm của hệ phương trình", generator: "b1_d4" },
    { id: "b1_d5", title: "Dạng 5: Đoán nhận số nghiệm của hệ phương trình", generator: "b1_d5" }
];

const bai2Forms = [
    { id: "b2_d1", title: "Dạng 1: Giải hệ phương trình bằng phương pháp thế", generator: "b2_d1" },
    { id: "b2_d2", title: "Dạng 2: Giải hệ phương trình bằng phương pháp cộng đại số", generator: "b2_d2" },
    { id: "b2_d3", title: "Dạng 3: Giải hệ phương trình quy về hệ bậc nhất", generator: "b2_d3" },
    { id: "b2_d4", title: "Dạng 4: Giải hệ phương trình bằng đặt ẩn phụ", generator: "b2_d4" },
    { id: "b2_d5", title: "Dạng 5: Bài toán tham số liên quan đến hệ phương trình", generator: "b2_d5" }
];

function buildTopic(id) {
    if (id === 1) return { id: "bai1", title: titles[1], practice: bai1Forms };
    if (id === 2) return { id: "bai2", title: titles[2], practice: bai2Forms };
    
    let practice = [];
    const forms = dangs["bai" + id] || [];
    
    // We already wrote generator for Dạng 1 (b{id}_d1)
    forms.forEach((formTitle, idx) => {
        let genName = (idx === 0) ? `b${id}_d1` : `fallback`;
        // Deduplicate IDs
        practice.push({
            id: `b${id}_d${idx+1}`,
            title: formTitle,
            generator: genName
        });
    });
    
    return {
        id: "bai" + id,
        title: titles[id],
        practice: practice
    };
}

const math9Data = {
    algebra: {
        title: "Đại Số",
        topics: algebraIds.map(buildTopic)
    },
    geometry: {
        title: "Hình Học",
        topics: geometryIds.map(buildTopic)
    }
};

const output = `const math9Data = ${JSON.stringify(math9Data, null, 4)};\n\nwindow.math9Data = math9Data;\n`;
fs.writeFileSync('js/data_math9.js', output, 'utf8');
console.log("Updated data_math9.js");
