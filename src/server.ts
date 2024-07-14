import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const PORT = '3000';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function startServer(labels: number[], images: number[][]) {
    const app = express();

    app.use(express.static(path.join(__dirname, '/public')));

    app.listen(PORT, () =>
      console.log(`Listening on port ${PORT}`)
    );

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/public/site.html'));
    });

    app.get('/randImage', (req, res) => {
        const index = Math.floor(Math.random() * labels.length);
        const label = labels[index];
        const image = images[index];
        // Create a random 28x28 pixel array (for demonstration)
        res.json({ label, image });
        console.log('sent image')
    });
}