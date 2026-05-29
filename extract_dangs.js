const fs = require('fs');
const cp = require('child_process');

const files = fs.readdirSync('.').filter(f => f.endsWith('.docx') && f.startsWith('Bai-'));
files.sort((a,b) => {
    let numA = parseInt(a.match(/Bai-(\d+)/)[1]);
    let numB = parseInt(b.match(/Bai-(\d+)/)[1]);
    return numA - numB;
});

let results = '';

for (let file of files) {
    if (file.includes('Bai-1-') || file.includes('Bai-2-')) continue;
    console.log("Processing", file);
    
    // Copy and extract using powershell
    try {
        cp.execSync('powershell.exe -Command "Remove-Item -Recurse -Force temp_docx -ErrorAction SilentlyContinue; Copy-Item \'' + file + '\' temp.zip -Force; Expand-Archive -Path temp.zip -DestinationPath temp_docx -Force"', {stdio: 'ignore'});
        
        const xml = fs.readFileSync('temp_docx/word/document.xml', 'utf-8');
        const txt = xml.match(/<w:p[^>]*>.*?<\/w:p>/g)?.map(p => {
            const t = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
            return t ? t.map(x => x.replace(/<[^>]+>/g, '')).join('') : '';
        }).filter(x => x.trim()).join('\n');
        
        let dangs = txt.split('\n').filter(line => line.startsWith('Dạng '));
        dangs = [...new Set(dangs)];
        results += '--- ' + file + ' ---\n' + dangs.join('\n') + '\n\n';
    } catch(e) {
        console.error("Error processing", file, e.message);
    }
}

fs.writeFileSync('all_dangs.txt', results, 'utf8');
console.log("Done");
