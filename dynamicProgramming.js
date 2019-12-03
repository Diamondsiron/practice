//背包问题是一个组合优化问题。它可以描述如下：给定一个固定大小、能够携重W的背包，
//以及一组有价值和重量的物品，找出一个最佳解决方案，使得装入背包的物品总重量不超过W，
//且总价值最大。能装重量 重量 价值 能装数量
//卧槽 我给重学数学了
function knapSack(capacity, weights, values, n) {
    var i, w, a, b, kS = [];
    for (i = 0; i <= n; i++) {
        kS[i] = [];
    }
    for (i = 0; i <= n; i++) {
        for (w = 0; w <= capacity; w++) {
            //console.log(capacity,'capacity')
            if (i == 0 || w == 0) { //{2} 
                kS[i][w] = 0;
            } else if (weights[i - 1] <= w) { //{3} 
                a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
                b = kS[i - 1][w];
                kS[i][w] = (a > b) ? a : b; //{4} max(a,b) 
            } else {
                kS[i][w] = kS[i - 1][w]; //{5}
            }
        }
    }
    console.log(kS)
    //findValues(n, capacity, kS, weights, values)
    return kS[n][capacity]; //{6}
}
function findValues(n, capacity, kS, weights, values) {
    var i = n, k = capacity;
    console.log('解决方案包含以下物品：');
    while (i > 0 && k > 0) {
        if (kS[i][k] !== kS[i - 1][k]) {
            console.log('物品' + i + '，重量：' + weights[i - 1] + '，价值：' + values[i - 1]);
            i--;
            k = k - kS[i][k];
        } else {
            i--;
        }
    }
}
var values = [3, 4, 5],
    weights = [2, 3, 4],
    capacity = 5,
    n = values.length;
console.log(knapSack(capacity, weights, values, n));
//斐波那契数列
//动态规划版本 性能更好
function dynFib(n) {
    var val = [];
    for (var i = 0; i <= n; ++i) {
        val[i] = 0;
    }
    if (n == 1 || n == 2) {
        return 1;
    } else {
        val[1] = 1; val[2] = 2;
        for (var i = 3; i <= n; ++i) {
            val[i] = val[i - 1] + val[i - 2];
        }
        return val[n - 1];
    }
}
//递归版本
function recurFib(n) {
    if (n < 2) {
        return n;
    } else {
        return recurFib(n - 1) + recurFib(n - 2);
    }
}

//最长公共子串 连续的
function lcs(word1, word2) { 
    var max = 0; 
    var index = 0; 
    var lcsarr = new Array(word1.length + 1); 
    for (var i = 0; i <= word1.length + 1; ++i) { 
        lcsarr[i] = new Array(word2.length + 1); 
        for (var j = 0; j <= word2.length + 1; ++j) { 
            lcsarr[i][j] = 0; 
        } 
    } 
    for (var i = 0; i <= word1.length; ++i) { 
            for (var j = 0; j <= word2.length; ++j) { 
                if (i == 0 || j == 0) {
                     lcsarr[i][j] = 0; 
                } else { 
                        if (word1[i - 1] == word2[j - 1]) { 
                            lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1; 
                        } else { 
                            lcsarr[i][j] = 0; 
                        } 
                } 
                if (max < lcsarr[i][j]) {
                    max = lcsarr[i][j]; index = i; 
                } 
            } 
    } 
    var str = ""; 
    if (max == 0) { 
        return ""; 
    } else { 
        for (var i = index - max; i <= max; ++i) { 
            str += word2[i]; 
        } 
        return str; 
    } 
}
lcs("abbcc","dbbcc")
//bbcc
//最长公共子序列 不连续的
function lcs2(wordX, wordY) { 
    var m = wordX.length, 
    n = wordY.length, 
    l = [], 
    solution= [],
    i, j, a, b; 
    for (i = 0; i <= m; ++i) { 
        l[i] = []; 
        solution[i] = [];
        for (j = 0; j <= n; ++j) { 
            l[i][j] = 0; 
            solution[i][j] = '0';
        } 
    } 
    for (i = 0; i <= m; i++) { 
        for (j = 0; j <= n; j++) { 
            if (i == 0 || j == 0) { 
                l[i][j] = 0; 
            } else if (wordX[i-1] == wordY[j-1]) { 
                l[i][j] = l[i-1][j-1] + 1; 
                solution[i][j] = 'diagonal';
            } else { 
                a = l[i-1][j]; 
                b = l[i][j-1]; 
                l[i][j] = (a > b) ? a : b; 
                solution[i][j]=(l[i][j] == l[i-1][j]) ? 'top' : 'left';
            } 
        } 
    } 
       
    printSolution(solution, l, wordX, wordY, m, n);     
    return l[m][n]; 
}
function printSolution(solution, l, wordX, wordY, m, n) { 
    var a = m, b = n, i, j, 
    x = solution[a][b], 
    answer = ''; 
    while (x !== '0') { 
        if (solution[a][b] === 'diagonal') { 
        answer = wordX[a - 1] + answer; 
        a--; 
        b--;
    } else if (solution[a][b] === 'left') { 
        b--; 
        } else if (solution[a][b] === 'top') { 
        a--; 
        } 
        x = solution[a][b]; 
    } 
    console.log('lcs2: '+ answer); 
}
lcs2("acbaed","abcadf")
