const fs = require('fs');

async function updateFilesJson() {
  try {
    // Fetch the list of text files from the other repository (buried-seed)
    const response = await fetch('https://api.github.com/repos/pinktit/buried-seed/contents/');
    const data = await response.json();

    // Extract the file names from the response
    const fileNames = data.map((file) => file.name).filter((name) => name.endsWith('.txt'));

    // Create the JSON object
    const filesJson = { files: fileNames };

    // Write the JSON object to files.json
    fs.writeFileSync('files.json', JSON.stringify(filesJson, null, 2));

    console.log('files.json updated successfully.');
  } catch (error) {
    console.error('Error updating files.json:', error.message);
    process.exit(1);
  }
}

updateFilesJson();
