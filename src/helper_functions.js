
export const merge = (arr1, arr2) => {
    let ptr1 = 0, ptr2 = 0;
    let output = [];
    while (ptr1 < arr1.length && ptr2 < arr2.length) {
        if (arr1[ptr1] < arr2[ptr2]) {
            output.push(arr1[ptr1]);
            ptr1 ++;
        } else {
            output.push((arr2[ptr2]));
            ptr2 ++;
        }
    }

    if (ptr1 == arr1.length) {
        output.push(...arr2.slice(ptr2));
    } else {
        output.push(...arr1.slice(ptr1));
    }

    return output;
}

export const flatten = (arr) => {
    let output = [];
    for (let subArray of arr) {
        output.push(...subArray);
    }

    return output;
}

export const swap = (arr, i, j) => {
    const newArr = [...arr];
    let temp = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = temp;
    return newArr;
}