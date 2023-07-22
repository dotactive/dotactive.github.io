const fs = require('fs');

async function updateFilesJson() {
  const fileList = [];
  const directory = 'buried-seed/';

  try {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      if (file.endsWith('.txt')) {
        fileList.push(file);
      }
    }

    const jsonData = JSON.stringify({ files: fileList }, null, 2);
    fs.writeFileSync('files.json', jsonData);
    console.log('files.json updated successfully!');
  } catch (err) {
    console.error('Error updating files.json:', err);
  }
}

updateFilesJson();
