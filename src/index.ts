import { readFileSync } from "fs";

const TRAINING_LABELS_FILEPATH = '../MNIST_ORG/train-labels.idx1-ubyte';
const TRAINING_IMAGES_FILEPATH = '../MNIST_ORG/train-images.idx3-ubyte';
const TEST_LABELS_FILEPATH = '../MNIST_ORG/t10k-labels.idx1-ubyte';
const TEST_IMAGES_FILEPATH = '../MNIST_ORG/t10k-images.idx3-ubyte';

const labels = getTrainingLabels(TRAINING_LABELS_FILEPATH);
const images = getTrainingImages(TRAINING_IMAGES_FILEPATH);
console.log(images.length);
console.log(images[0].length)

function getTrainingLabels(filepath: string) {
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

function getTrainingImages(filepath: string) {
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
            image.push(16 + (i * header.numberOfRows * header.numberOfColumns) + j);
        }
        images.push(image)
    }
    return images;
}