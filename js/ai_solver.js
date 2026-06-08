const GEMINI_API_KEY = "NHAP_API_KEY_CUA_BAN_VAO_DAY"; // <-- THAY MÃ API KEY CỦA BẠN VÀO ĐÂY

function openAIToolModal() {
    document.getElementById('ai-solver-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAIToolModal() {
    document.getElementById('ai-solver-modal').style.display = 'none';
    document.body.style.overflow = '';
}

// Convert file to base64
function fileToGenerativePart(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type
                }
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function solveMathProblem() {
    if (GEMINI_API_KEY === "NHAP_API_KEY_CUA_BAN_VAO_DAY") {
        alert("Bạn chưa nhập Gemini API Key trong mã nguồn (js/ai_solver.js)!");
        return;
    }

    const textInput = document.getElementById('ai-question-input').value.trim();
    const imageInput = document.getElementById('ai-image-input').files[0];
    const resultBox = document.getElementById('ai-result-box');
    const resultContent = document.getElementById('ai-result-content');
    const btnSolve = document.getElementById('btn-solve-math');

    if (!textInput && !imageInput) {
        alert("Vui lòng nhập câu hỏi hoặc tải ảnh bài toán lên!");
        return;
    }

    // Giao diện trạng thái đang tải
    btnSolve.disabled = true;
    btnSolve.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang giải...';
    resultBox.style.display = 'block';
    resultContent.innerHTML = '<div style="text-align: center; color: #64748b; padding: 20px;"><i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; margin-bottom: 10px;"></i><br>AI đang phân tích và giải toán. Vui lòng đợi trong giây lát...</div>';

    try {
        const contents = [];
        const parts = [];

        if (textInput) {
            parts.push({ text: `Bạn là một giáo viên dạy toán xuất sắc. Hãy giải bài toán sau đây một cách chi tiết, từng bước rõ ràng để học sinh dễ hiểu. Sử dụng định dạng LaTeX cho các công thức toán học (bọc trong $ hoặc $$).\n\nBài toán: ${textInput}` });
        } else {
            parts.push({ text: `Bạn là một giáo viên dạy toán xuất sắc. Hãy giải bài toán trong bức ảnh được đính kèm một cách chi tiết, từng bước rõ ràng để học sinh dễ hiểu. Sử dụng định dạng LaTeX cho các công thức toán học (bọc trong $ hoặc $$).` });
        }

        if (imageInput) {
            const imagePart = await fileToGenerativePart(imageInput);
            parts.push(imagePart);
        }

        contents.push({ parts: parts });

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contents: contents })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const answerText = data.candidates[0].content.parts[0].text;
        
        // Xử lý Markdown cơ bản (an toàn với công thức Toán học MathJax)
        let formattedAnswer = answerText;
        
        // Headers
        formattedAnswer = formattedAnswer.replace(/^### (.*$)/gim, '<h4 style="color: #4f46e5; margin-top: 20px; margin-bottom: 10px;">$1</h4>');
        formattedAnswer = formattedAnswer.replace(/^## (.*$)/gim, '<h3 style="color: #4f46e5; margin-top: 25px; margin-bottom: 15px;">$1</h3>');
        
        // In đậm (Bold)
        formattedAnswer = formattedAnswer.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #1e293b; font-weight: 700;">$1</strong>');
        
        // Gạch ngang phân cách (---)
        formattedAnswer = formattedAnswer.replace(/^---$/gim, '<hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 20px 0;">');
        
        // List items
        formattedAnswer = formattedAnswer.replace(/^\* (.*$)/gim, '<div style="margin-left: 20px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #8b5cf6;">•</span>$1</div>');
        
        // Xuống dòng (Line breaks)
        formattedAnswer = formattedAnswer.replace(/\n/g, '<br>');

        resultContent.innerHTML = `<div style="line-height: 1.8; color: #334155; font-size: 1.05rem;">${formattedAnswer}</div>`;
        
        // Yêu cầu MathJax render lại công thức toán học
        if (window.MathJax) {
            MathJax.typesetPromise([resultContent]).catch(function (err) {
                console.error("MathJax render error: ", err.message);
            });
        }

    } catch (error) {
        console.error("Lỗi khi gọi Gemini API:", error);
        resultContent.innerHTML = `<div style="color: #ef4444; padding: 15px; background: #fef2f2; border-radius: 8px; border: 1px solid #fca5a5;">
            <i class="fa-solid fa-triangle-exclamation"></i> Có lỗi xảy ra: ${error.message}
        </div>`;
    } finally {
        btnSolve.disabled = false;
        btnSolve.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Giải bài toán';
    }
}
