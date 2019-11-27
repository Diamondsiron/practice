var arr = Array.from({length:10},(item,index)=>{return index}).sort(function(){
    return Math.random() - 0.5;
});
//console.log(arr,'arr')
//冒泡排序 挨个换
function bubbleSort(arr){
    console.log(arr,'start')
    let length = arr.length
    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++){
            if(arr[i]>arr[j]){
                let a = arr[i]
                arr[i] = arr[j]
                arr[j] = a
            }
            console.log(arr,'arr1')
        }
        console.log(arr,'arr2')
    }
    console.log(arr,'end')
}
//bubbleSort([3,2,1,4,5])
//选择排序 找最小的 换
function selectionSort (arr) {
    console.log(arr,'start')
    var min;
    var length = arr.length
    for (let i = 0; i < length; i++) {
        min = i
        for (let j = i + 1; j < length; j++) {
            if(arr[min]>arr[j]){
                min = j
            }
            console.log(arr,'arr1')
        }
        if (i !== min){
            let a = arr[i]
            arr[i] = arr[min]
            arr[min] = a
        }
        console.log(arr,'arr2')
    }
    console.log(arr,'end')
}
//selectionSort([3,2,1,4,5])
//插入排序 类似整牌 顺序搬牌 有两张整理两张 有三张整理三张 一次递增整理 把搬到的牌设置为temp 
function insertionSort(arr){
    console.log(arr,'start')
    var length = arr.length;
    var j, temp
    for (let i = 0; i < length; i++) {
        j = i;
        temp = arr[i]
        console.log(i,'i')
        while(j>0 &&arr[j-1]>temp){
            arr[j] = arr[j-1]
            j--
            console.log(j,'j')
        }
        arr[j] = temp
        console.log(arr,'arr')
    }
    console.log(arr,'end')
}
//insertionSort([3,2,1,4,5])
//并归排序
//  4 3 2 1 递归的时候先拆成最小单位 最后一个merge 3,4和2,1 然后空数组 左边第一个和右边第一个比 大小谁小push谁 然后++ 在比大小 左右有一组比完了 走第二个或者第三while
function mergeSort (arr) {
    console.log('xx')
    var length = arr.length
    //结束递归的判断条件就是length
    if (length == 1){
        return arr
    }
    var mid = Math.floor(length/2),
    left = arr.slice(0, mid),
    rigth = arr.slice(mid,length);
    console.log(mid,'mid')
    console.log(left,'left')
    console.log(rigth,'rigth')
    return merge(mergeSort(left),mergeSort(rigth))
}

function merge(left, right){
    console.log('yy')
    var result = [],
    il = 0,
    ir = 0;
    while(il < left.length && ir < right.length) {
        if(left[il] < right[ir]){
            result.push(left[il++])
        } else {
            result.push(right[ir++])
        }
        console.log('中间没比完',result)
    }
    while(il < left.length){
        console.log('左边没比完',result)
        result.push(left[il++])
        
    }
    while (ir < right.length) {
        console.log('右边没比完',result)
        result.push(right[ir++])
        
    }
    console.log(result,'result')
    console.log(il,'il')
    console.log(ir,'ir')
    return result
}

//console.log(mergeSort([8,7,6,5,4,3,2,1]))
//快速排序 第一种写法 选第一个为中间值 然后排序 对已经排序的数组性能不好
function qSort(arr){
    if(arr.length == 0 ) {
        return [];
    }
    var left = [];
    var right = [];
    var pivot = arr[0];
    for (var i = 1; i < arr.length; i++) {
        console.log(" 基准值：" + pivot + " 当前元素：" + arr[i]); 
        if(arr[i]<pivot){
            console.log(" 移动 " + arr[i] + " 到左边 ");
            left.push(arr[i]);
        }else{
            console.log(" 移动 " + arr[i] + " 到右边 ");
            right.push(arr[i]);
        }
    }
    return qSort(left).concat(pivot,qSort(right));
}

//console.log(qSort([8,7,6,5,4,3,2,1]))

function quick (arr, left, right) {
    var index;
    if(arr.length >1) {
        index = partition(arr, left, right)
        if (left < index -1){
            quick(arr, left, index -1)
        }
        if (index < right) {
            quick(arr, index, right)
        }
    }
}

function partition (arr, left, right) {
    var pivot = arr[Math.floor((left+right)/2)]
    let i = left;
    let j = right
    while( i<=j){
        while(arr[i]<pivot){
            console.log(1)
            i++
        }
        while(arr[j] >pivot){
            console.log(2)
            j--
        }
        if(i<=j){
            console.log(3)
            let a = arr[i]
            arr[i] = arr[j]
            arr[j] = a
            i++
            j--
        }
    }
    //console.log(arr,'arr')
    return i
}
// var testArray = [8,7,6,5,4,3,2,1]
// console.log(testArray)
// quick(testArray,0,7)
// console.log(testArray)
//TODO哈希排序 
function shellsort1(arr) { 

    var N = arr.length; 
    var h = 1; 
    while (h < N/3) { h = 3 * h + 1; }
    while (h >= 1) { 
    for (var i = h; i < N; i++) { 
    for (var j = i; j >= h && arr[j] < arr[j-h]; j -= h) { 
    
    let a = arr[j]
    arr[j] = arr[j-h]
    arr[j-h] = a
    } 
    }
    h = (h-1)/3; } 
    console.log(arr)
}
//shellsort1([8,7,6,5,4,3,2,1])
//TODO堆排序
function heapSort (arr) {
    var heapSize = arr.length
    buildHeap(arr)
    while (heapSize > 1) {
        heapSize--
        let a = arr[0]
        arr[0] = arr[heapSize]
        arr[heapSize] = a
        heapify(arr, heapSize, 0)
    }
}
function buildHeap(arr){
    var heapSize = arr.length
    for (var i = Math.floor(arr.length/2); i>=0; i--) {
        heapify(arr,heapSize,i)
    }
}
function heapify(arr, heapSize, i) {
    var left  = i * 2 + 1,
    right = i * 2 + 2,
    largest = i;
    if (left < heapSize && arr[left] > arr[largest]) { 
        largest = left; 
    } 
    if (right < heapSize && arr[right] > arr[largest]) { 
        largest = right; 
    } 
    if (largest !== i) { 
        let a = arr[i]
        arr[i] = arr[largest]
        arr[largest] = a
        heapify(arr, heapSize, largest); 
    }
}
// var testArray = [8,7,6,5,4,3,2,1]
// console.log(testArray)
// heapSort(testArray)
// console.log(testArray)
//TODO计数排序、桶排序和基数排序
