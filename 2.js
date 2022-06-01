// 중복된 숫자와 횟수를 저장하기 위해 Map 자료구조를 사용하였습니다.

const arr = [3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
const cntMap = new Map();

for (let i = 0; i < arr.length; i++) {
    if (!cntMap.has(arr[i])) cntMap.set(arr[i], 0);

    const cnt = cntMap.get(arr[i]) + 1;
    cntMap.set(arr[i], cnt);
}

cntMap.forEach((value, key) => {
    if (value > 1) console.log(`${key}: ${value}`);
});

// output:

// 3: 5
// 4: 10
// 6: 10