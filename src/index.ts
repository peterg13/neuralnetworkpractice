import { startServer } from "./server";
import { getTrainingImages, getTrainingLabels } from "./helpers";

const TRAINING_LABELS_FILEPATH = '../MNIST_ORG/train-labels.idx1-ubyte';
const TRAINING_IMAGES_FILEPATH = '../MNIST_ORG/train-images.idx3-ubyte';
const TEST_LABELS_FILEPATH = '../MNIST_ORG/t10k-labels.idx1-ubyte';
const TEST_IMAGES_FILEPATH = '../MNIST_ORG/t10k-images.idx3-ubyte';

//loads uin the data for the images and labels
const labels = getTrainingLabels(TRAINING_LABELS_FILEPATH);
const images = getTrainingImages(TRAINING_IMAGES_FILEPATH);

//starts the server which we can load in our browser to get a visual of what we are doing
startServer(labels, images);