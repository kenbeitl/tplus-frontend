const fs = require('fs');
const path = require('path');

const locales = ['en', 'zh-HK', 'zh-CN'];
const rootDir = path.resolve(__dirname, '../i18n');

function mergeAllJsonFiles(dir) {
  let result = {};
  
  function readDir(currentDir, parentKey = '') {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item.name);
      
      if (item.isDirectory()) {
        // Recursively read subdirectory
        const dirName = item.name;
        const subContent = readSubDir(fullPath);
        
        if (parentKey) {
          // Nested directory (e.g., payConnect/modal)
          if (!result[parentKey]) {
            result[parentKey] = {};
          }
          result[parentKey][dirName] = subContent;
        } else {
          // Top-level directory (e.g., pages, payConnect)
          result[dirName] = subContent;
        }
      } else if (item.isFile() && path.extname(item.name) === '.json') {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        const fileName = path.parse(item.name).name;
        
        if (fileName === 'data') {
          // Merge data.json directly into root
          result = { ...result, ...content };
        } else {
          // Other root-level JSON files
          result[fileName] = content;
        }
      }
    });
  }
  
  function readSubDir(subDir) {
    let subResult = {};
    const items = fs.readdirSync(subDir, { withFileTypes: true });
    
    items.forEach(item => {
      const fullPath = path.join(subDir, item.name);
      
      if (item.isDirectory()) {
        // Nested subdirectory
        subResult[item.name] = readSubDir(fullPath);
      } else if (item.isFile() && path.extname(item.name) === '.json') {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        const fileName = path.parse(item.name).name;
        
        if (fileName === 'data') {
          // Merge data.json content into current level
          subResult = { ...subResult, ...content };
        } else {
          // Nest under filename
          subResult[fileName] = content;
        }
      }
    });
    
    return subResult;
  }
  
  readDir(dir);
  return result;
}

console.log('Building translations...\n');

locales.forEach(locale => {
  const localeDir = path.join(rootDir, locale);
  
  if (fs.existsSync(localeDir)) {
    console.log(`Building ${locale}...`);
    const merged = mergeAllJsonFiles(localeDir);
    const outputPath = path.join(rootDir, `${locale}.json`);
    fs.writeFileSync(
      outputPath,
      JSON.stringify(merged, null, 2)
    );
    console.log(`✓ ${locale}.json created`);
  } else {
    console.warn(`⚠ Locale directory not found: ${localeDir}`);
  }
});

console.log('\n✓ All translations built successfully!');