const fs = require('fs');
const cp = require('child_process');
const docxFile = process.argv[2];
const txtFile = process.argv[3];
if(fs.existsSync('temp_docx_fast')) fs.rmSync('temp_docx_fast', {recursive: true, force: true});
fs.mkdirSync('temp_docx_fast');
cp.execSync('tar -xf "' + docxFile + '" -C temp_docx_fast', {stdio: 'ignore'});
const xml = fs.readFileSync('temp_docx_fast/word/document.xml', 'utf-8');
const txt = xml.match(/<w:p[^>]*>.*?<\/w:p>/g)?.map(p => {
    const t = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
    return t ? t.map(x => x.replace(/<[^>]+>/g, '')).join('') : '';
}).filter(x => x.trim()).join('\n');
fs.writeFileSync(txtFile, txt, 'utf8');
console.log('Extracted to ' + txtFile);
