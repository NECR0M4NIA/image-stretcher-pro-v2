const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const downloadBtn = document.getElementById('downloadBtn');
const ctx = preview.getContext('2d');

dropzone.addEventListener('click', () => fileInput.click());

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    handleImage(file);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleImage(file);
});

function handleImage(file) {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            updateCanvas(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    downloadBtn.style.display = 'block';
}

function updateCanvas(img) {
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
  
    preview.width = width;
    preview.height = height;
  
    ctx.drawImage(img, 0, 0, width, height);
}

[widthInput, heightInput].forEach(input => {
    input.addEventListener('change', () => {
        const img = new Image();
        img.onload = () => {
            updateCanvas(img);
        };
        img.src = preview.toDataURL();
    });
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'resized-image.png';
    link.href = preview.toDataURL();
    link.click();
});