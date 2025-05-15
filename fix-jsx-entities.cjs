const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx and .jsx files
function findJsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      fileList = findJsxFiles(filePath, fileList);
    } else if (['.tsx', '.jsx'].includes(path.extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix unescaped entities in a file
function fixUnescapedEntities(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Save original content for comparison
    const originalContent = content;
    
    // Simple apostrophe replacement - this pattern targets apostrophes 
    // in text content rather than in attributes or JS code
    content = content.replace(/(\w)'(\w)/g, '$1&apos;$2'); // don't → don&apos;t
    content = content.replace(/(\w)'(\s)/g, '$1&apos;$2'); // we're → we&apos; 
    content = content.replace(/(\s)'(\w)/g, '$1&apos;$2'); // 'example → &apos;example
    
    // Double quotes replacement
    content = content.replace(/(\s)"(\w)/g, '$1&quot;$2'); // "word → &quot;word
    content = content.replace(/(\w)"(\s)/g, '$1&quot;$2'); // word" → word&quot;
    content = content.replace(/(\s)"(\s)/g, '$1&quot;$2'); // " " → &quot; &quot;
    
    // Write the modified content back to the file if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed entities in ${filePath}`);
      return true;
    }
    
    return false;
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
    return false;
  }
}

// Main execution
const rootDir = path.resolve(__dirname, 'src');
const jsxFiles = findJsxFiles(rootDir);

console.log(`Found ${jsxFiles.length} JSX/TSX files to process.`);

let fixedCount = 0;
jsxFiles.forEach(file => {
  const fixed = fixUnescapedEntities(file);
  if (fixed) fixedCount++;
});

console.log(`Processing complete! Fixed ${fixedCount} files.`);