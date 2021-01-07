const weightsArray = [];
const heightsArray = [];

for (let i = 40; i <= 250; i += 5) {
    weightsArray.push({ key: i, value: `${i} lbs` });
}

for (let i = 4; i <= 7; i++) {
    for (let j = 0; j <= 11 ; j++) {
        if (i == 7 && j == 6) {
            break;
        }
        heightsArray.push({ key: `${i}.${j}`, value: `${i}.${j} inches` });
    }
}

export const weights = weightsArray;
export const heights = heightsArray;
