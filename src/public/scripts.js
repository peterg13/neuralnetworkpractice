document.getElementById('randomImageButton').addEventListener('click', getRandomImage);

async function getRandomImage() {

    const scale = 10;
    const defaultWidth = 28;
    const defaultHeight = 28;

    const response = await fetch('http://localhost:3000/randImage');
    const data = await response.json();
    const label = data.label;
    const image = data.image;

    const labelElement = document.getElementById('labelValue');
    labelElement.textContent = label;

    const canvas = document.getElementById('imageCanvas');
    canvas.width = defaultWidth * scale;
    canvas.height = defaultHeight * scale;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(defaultWidth, defaultHeight);

    for (let i = 0; i < image.length; i++) {
        const value = image[i];
        const pixelIndex = i * 4; // Each pixel consists of 4 values (r, g, b, a)

        imageData.data[pixelIndex] = value;       // Red
        imageData.data[pixelIndex + 1] = value;   // Green
        imageData.data[pixelIndex + 2] = value;   // Blue
        imageData.data[pixelIndex + 3] = 255;     // Alpha (fully opaque)        
    }
    ctx.putImageData(imageData, 0, 0);
    ctx.scale(scale, scale);
    ctx.drawImage(canvas, 0, 0);
}