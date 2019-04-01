function merge(arr1, arr2) {
    let res = [];
    let firstAI = 0;
    let secondAI = 0;

    while (firstAI < arr1.length && secondAI < arr2.length) {
        if (arr1[firstAI] <= arr2[secondAI]) {
            res.push(arr1[firstAI]);
            firstAI++;
        } else {
            res.push(arr2[secondAI]);
            secondAI++;
        }
    }

    while (firstAI < arr1.length) {
        res.push(arr1[firstAI]);
        firstAI++;
    }
    while (secondAI < arr2.length) {
        res.push(arr2[secondAI]);
        secondAI++;
    }

    return res;

}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let middle = Math.round(arr.length / 2);
    let left = mergeSort(arr.slice(0, middle));
    let right = mergeSort(arr.slice(middle));
    return merge(left, right);
}