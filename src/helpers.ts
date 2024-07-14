import { readFileSync } from "fs";

export function getTrainingLabels(filepath: string) {
    const buffer = readFileSync(filepath);
    const header = {
        magicNumber: buffer.readUInt32BE(0),
        numberOfItems: buffer.readUInt32BE(4)
    };
    const labels = [];
    for(let i = 0; i < header.numberOfItems; i++) {
        labels.push(buffer.readUInt8(8 + i));
    }
    return labels;
}

export function getTrainingImages(filepath: string) {
    const buffer = readFileSync(filepath);
    const header = {
        magicNumber: buffer.readUInt32BE(0),
        numberOfImages: buffer.readUInt32BE(4),
        numberOfRows: buffer.readUInt32BE(8),
        numberOfColumns: buffer.readUInt32BE(12)
    };
    const images: number[][] = [];
    for(let i = 0; i < header.numberOfImages; i++) {
        const image: number[] = [];
        for(let j = 0; j < header.numberOfRows * header.numberOfColumns; j++) {
            image.push(buffer.readUInt8(16 + (i * header.numberOfRows * header.numberOfColumns) + j));
        }
        images.push(image)
    }
    return images;
}