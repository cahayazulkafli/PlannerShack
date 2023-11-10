const fs = require('fs').promises;
const path = require('path');

const btnCreate = document.getElementById('btnCreate');
const btnRead = document.getElementById('btnRead');
const btnDelete = document.getElementById('btnDelete');
const fileName = document.getElementById('fileName');
const fileContents = document.getElementById('fileContents');
const btnClear = document.getElementById('btnClear');

const pathName = path.join(__dirname, 'Files');

// Ensure 'Files' directory exists
async function ensureDirectoryExists() {
    try {
        await fs.promises.mkdir(pathName, { recursive: true });
        console.log("Directory created successfully");
    } catch (err) {
        console.error("Error creating directory:", err);
    }
}

// Ensure directory is created when the script starts
ensureDirectoryExists();

btnCreate.addEventListener('click', async () => {
    try {
        await ensureDirectoryExists(); // Ensure directory exists before creating a file
        const file = path.join(pathName, fileName.value);
        const contents = fileContents.value;

        await fs.writeFile(file, contents);
        console.log("The file was created successfully");
    } catch (err) {
        console.error("Error creating the file:", err);
        console.warn("File creation failed. Please check your input and try again.");
    }
});


btnRead.addEventListener('click', async () => {
    try {
        const file = path.join(pathName, fileName.value);

        const data = await fs.readFile(file, 'utf-8');
        fileContents.value = data;
        console.log("The file was read");
    } catch (err) {
        console.error(err);
        console.warn("Error reading the file. Please check your input and try again.");
    }
});

btnDelete.addEventListener('click', async () => {
    try {
        const file = path.join(pathName, fileName.value);

        await fs.unlink(file);
        fileName.value = '';
        fileContents.value = '';
        console.log("The file was deleted");
    } catch (err) {
        console.error(err);
        console.warn("Error deleting the file. Please check your input and try again.");
    }
});

btnClear.addEventListener('click', () => {
    fileName.value = '';
    fileContents.value = '';
});
