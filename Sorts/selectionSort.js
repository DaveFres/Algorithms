function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function selectionSort(arr) {
    let min;

    for (let i = 0; i < arr.length; i++) {
        min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        if (i !== min) swap(arr, i, min);

    }
    return arr;
}

var arr = [3, 2, 1, 4];