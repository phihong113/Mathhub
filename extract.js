const fs = require('fs');
const content = fs.readFileSync('doc_extracted/word/document.xml', 'utf-8');
const textMatches = content.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
if (textMatches) {
    const text = textMatches.map(tag => tag.replace(/<[^>]+>/g, '')).join('');
    // Better: extract paragraphs to preserve some structure
    const pMatches = content.match(/<w:p[^>]*>.*?<\/w:p>/g);
    if(pMatches) {
        const pText = pMatches.map(p => {
            const tMatches = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
            return tMatches ? tMatches.map(t => t.replace(/<[^>]+>/g, '')).join('') : '';
        }).filter(t => t.trim().length > 0).join('\n');
        fs.writeFileSync('extracted_text_utf8.txt', pText, 'utf-8');
    }
}
