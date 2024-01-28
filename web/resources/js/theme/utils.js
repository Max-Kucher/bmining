import {blue, green, indigo, orange, purple} from './colors';

export const getPrimary = (preset) => {
    switch (preset) {
        case 'blue':
            return blue;
        case 'orange':
            return orange;
        case 'green':
            return green;
        case 'indigo':
            return indigo;
        case 'purple':
            return purple;
        default:
            console.error('Invalid color preset, accepted values: "blue", "orange", "green", "indigo" or "purple"".');
            return blue;
    }
};
