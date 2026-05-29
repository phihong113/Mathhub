const fs = require('fs');
const cp = require('child_process');

const files = fs.readdirSync('.').filter(f => f.endsWith('.docx') && f.startsWith('Bai-'));
files.sort((a,b) => {
    let numA = parseInt(a.match(/Bai-(\d+)/)[1]);
    let numB = parseInt(b.match(/Bai-(\d+)/)[1]);
    return numA - numB;
});

let results = {};

for (let file of files) {
    if (file.includes('Bai-1-') || file.includes('Bai-2-')) continue;
    let matchId = file.match(/Bai-(\d+)/)[1];
    console.log("Processing", file);
    
    try {
        if(fs.existsSync('temp_docx_fast')) {
            fs.rmSync('temp_docx_fast', {recursive: true, force: true});
        }
        fs.mkdirSync('temp_docx_fast');
        // tar is native on windows 10/11
        cp.execSync('tar -xf "' + file + '" -C temp_docx_fast', {stdio: 'ignore'});
        
        const xml = fs.readFileSync('temp_docx_fast/word/document.xml', 'utf-8');
        const txt = xml.match(/<w:p[^>]*>.*?<\/w:p>/g)?.map(p => {
            const t = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
            return t ? t.map(x => x.replace(/<[^>]+>/g, '')).join('') : '';
        }).filter(x => x.trim()).join('\n');
        
        let dangs = txt.split('\n')
                       .map(x => x.trim())
                       .filter(line => line.startsWith('Dạng '));
        
        // Extract Dạng X: ...
        let parsed = dangs.map(d => {
            const m = d.match(/Dạng \d+:(.*)/);
            if(m) return m[0].trim();
            return null;
        }).filter(Boolean);
        parsed = [...new Set(parsed)];
        
        results['bai' + matchId] = parsed;
    } catch(e) {
        console.error("Error processing", file, e.message);
    }
}

fs.writeFileSync('all_dangs.json', JSON.stringify(results, null, 2), 'utf8');
console.log("Done");
