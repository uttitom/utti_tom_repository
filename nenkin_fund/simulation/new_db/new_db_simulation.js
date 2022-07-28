// new_db_simulation.js

// **************  メインボタン  ***************

const menu_btn1 = document.getElementById('menu_btn1');
const sp1 = document.getElementById('sp1');
const sp2 = document.getElementById('sp2');
const sp3 = document.getElementById('sp3');
const nav1 = document.getElementById('nav1');

menu_btn1.addEventListener('click', () => {

    sp1.classList.toggle('close');
    sp2.classList.toggle('close');
    sp3.classList.toggle('close');
    nav1.classList.toggle('open');

})


// **************  サブボタン  ***************

const menu_btn2 = document.getElementById('menu_btn2');
const sp4 = document.getElementById('sp4');
const sp5 = document.getElementById('sp5');
const sp6 = document.getElementById('sp6');
const status1 = document.getElementById('status1');

menu_btn2.addEventListener('click', () => {

    sp4.classList.toggle('close');
    sp5.classList.toggle('close');
    sp6.classList.toggle('close');

    status1.classList.toggle('open');

})




// 変数の定義
const r = 0.005;
let arr = [];
let s1 = 0;
let s2 = 0;
let s3 = 0;
let p = 0;

const joinE = document.getElementById('join');
const retireE = document.getElementById('retire');
const premiumE = document.getElementById('premium');
const join1E = document.getElementById('join1');
const premium1E = document.getElementById('premium1');
const join2E = document.getElementById('join2');;
const premium2E = document.getElementById('premium2');
const join3E = document.getElementById('join3');;
const premium3E = document.getElementById('premium3');

let retireN;
let joinN;
let join1N;
let join2N;
let join3N;

let premiumN;

let premium0N;
let premium1N;
let premium2N;
let premium3N;

const pattern1 =/^[0-9]{2}$/;
const pattern2 = /^[0-9]{0,5}$/;

let cnt;
cnt=parseInt(cnt);
cnt=0 ;

let cnt2;
cnt2=parseInt(cnt2);
cnt2=1;

joinE.addEventListener('change', ()=> {
    if (pattern1.test(joinE.value)) {
        if (parseInt(joinE.value) >= 18 && parseInt(joinE.value) < 65) {
            retireE.focus();
        } else { alert('加入年齢範囲外です。'); }
    } else { alert('数値を正しく入力してください。'); }
})


retireE.addEventListener('change',()=>{
    if (pattern1.test(retireE.value)) {
        if (parseInt(retireE.value) > parseInt(joinE.value) && parseInt(retireE.value) <= 70) {
            premiumE.focus();
        } else { alert('加入年齢を超えて70歳以下で入力してください。'); }
    } else { alert('数値を正しく入力してください。'); }
})


premiumE.addEventListener('change',()=>{
    if (pattern2.test(premiumE.value)) {
        if (parseInt(premiumE.value) >= 100 && parseInt(premiumE.value) <= 50000) {
        let num =parseInt(premiumE.value).toLocaleString();
        premiumE.setAttribute('type','text');
        premiumE.value=num;    
        document.getElementById('calcBtn').focus();
        } else { alert('掛金設定範囲外です。'); }
    } else {
        alert('数値を正しく入力してください。');
    }
})

document.getElementById('clBtn').addEventListener('click',()=> {
    window.location.reload();
})

document.getElementById('calcBtn').addEventListener('click', ()=> {

    if ((pattern1.test(joinE.value)) && (pattern1.test(retireE.value) && (pattern2.test(comma(premiumE.value))))) {
        premiumN = 0;
        retireN = parseInt(retireE.value);
        joinN = parseInt(joinE.value);
        join1N = parseInt(join1E.value);
        join2N = parseInt(join2E.value);
        join3N = parseInt(join3E.value);
        premium0N = parseInt(comma(premiumE.value));
        premium1N = parseInt(comma(premium1E.value));
        premium2N = parseInt(comma(premium2E.value));
        premium3N = parseInt(comma(premium3E.value));

        // 掛金変更なしの場合
        if (!join1N && !join2N && !join3N) {
            for (let index = 0; index < retireN - joinN; index++) {
                premiumN = premium0N;
                s1 = s1 + premiumN * 12;
                s2 = s2 + premiumN * 12 + Math.round(Math.round(s2 * r) / 12) * 12;
                s3 = Math.ceil(s2 / 100) * 100
                p = Math.floor(s3 / s1 * 1000) / 10
                arr[index + 1] = [index + 1, index + joinN, premiumN, s1, s2, s3];
            }

        }　// 掛金変更1回の場合
        else if (!join2N && !join3N) {
            for (let index = 0; index < retireN - joinN; index++) {
                if (index + joinN < join1N) {
                    premiumN = premium0N;
                } else {
                    premiumN = premium1N;
                }
                s1 = s1 + premiumN * 12;
                s2 = s2 + premiumN * 12 + Math.round(Math.round(s2 * r) / 12) * 12;
                s3 = Math.ceil(s2 / 100) * 100
                p = Math.floor(s3 / s1 * 1000) / 10
                arr[index + 1] = [index + 1, index + joinN, premiumN, s1, s2, s3]
            }

        }　// 掛金変更2回の場合
        else if (!join3N) {
            for (let index = 0; index < retireN - joinN; index++) {
                if (index + joinN < join1N) {
                    premiumN = premium0N;
                } else if (index + joinN < join2N) {
                    premiumN = premium1N;
                } else {
                    premiumN = premium2N;
                }
                s1 = s1 + premiumN * 12;
                s2 = s2 + premiumN * 12 + Math.round(Math.round(s2 * r) / 12) * 12;
                s3 = Math.ceil(s2 / 100) * 100
                p = Math.floor(s3 / s1 * 1000) / 10
                arr[index + 1] = [index + 1, index + joinN, premiumN, s1, s2, s3]
            }

        }　// 掛金変更3回の場合
        else {
            for (let index = 0; index < retireN - joinN; index++) {
                if (index + joinN < join1N) {
                    premiumN = premium0N;
                } else if (index + joinN < join2N) {
                    premiumN = premium1N;
                } else if (index + joinN < join3N) {
                    premiumN = premium2N;
                } else {
                    premiumN = premium3N;
                }
                s1 = s1 + premiumN * 12;
                s2 = s2 + premiumN * 12 + Math.round(Math.round(s2 * r) / 12) * 12;
                s3 = Math.ceil(s2 / 100) * 100
                p = Math.floor(s3 / s1 * 1000) / 10
                arr[index + 1] = [index + 1, index + joinN, premiumN, s1, s2, s3];
            }
        }

        let num = arr[retireN - joinN][5].toLocaleString();
        let sum = arr[retireN - joinN][3].toLocaleString();
        let prop0 = parseInt(arr[retireN - joinN][5] / arr[retireN - joinN][3] * 1000) / 10;
        let interest = arr[retireN - joinN][5] - arr[retireN - joinN][3]
        document.getElementById('result1').innerText = '■給付額 : ' + num + '円  (' + prop0 + '%)';
        document.getElementById('premiumS').innerText = '●掛金累計 : ' + sum + '円';
        document.getElementById('interestS').innerText = '●利息相当 : ' + interest.toLocaleString() + '円';
        s1 = 0; s2 = 0; s3 = 0;
        scrollBy(0, 100);
        document.querySelector('.tableTitle').style.display = 'block';

    } else {
        alert('数値を入力してください。');
    }
})


document.getElementById('addBtn').addEventListener('click',()=>{

        cnt = cnt + 1;
        if (cnt === 1) {
            const add1 = document.getElementById('add1');
            add1.style.display = 'block';
        } else if (cnt === 2) {
            const add2 = document.getElementById('add2');
            add2.style.display = 'block';
        } else if (cnt === 3) {
            const add3 = document.getElementById('add3');
            add3.style.display = 'block';
        } else if (cnt === 4) {
            add1.style.display = 'none';
            add2.style.display = 'none';
            add3.style.display = 'none';
            cnt = 0;
        }

    })

join1E.addEventListener('change', ()=> {
        if (pattern1.test(join1E.value)) {
            if (parseInt(join1E.value) > joinE.value && parseInt(join1E.value) < 65) {
                premium1E.focus();
            } else { alert('加入年齢を超えるか、65歳未満の年齢を入力してください'); }
        } else { alert('数値を正しく入力してください。'); }
    })


premium1E.addEventListener('change',(e)=> {
    e.preventDefault();
        if (pattern2.test(premium1E.value)) {
            if (parseInt(premium1E.value) >= 0 && parseInt(premium1E.value) <= 50000) {
                let num = parseInt(premium1E.value).toLocaleString();
                premium1E.setAttribute('type','text');
                console.log(premium1E);
                premium1E.value = num;
                join2E.focus();
            } else { alert('掛金設定範囲外です。'); }
        } else {
            alert('数値を正しく入力してください。');
        }
    })
    

join2E.addEventListener('change',()=> {
        if (pattern1.test(join2E.value)) {
            if (parseInt(join2E.value) > join1E.value && parseInt(join2E.value) < 65) {
                premium2E.focus();
            } else { alert('加入年齢を超えるか、65歳未満の年齢を入力してください'); }
        } else { alert('数値を正しく入力してください。'); }
    })    

 
premium2E.addEventListener('change',(e)=>{
    e.preventDefault();
        if (pattern2.test(premium2E.value)) {
            if (parseInt(premium2E.value) >= 0 && parseInt(premium2E.value) <= 50000) {
                let num = parseInt(premium2E.value).toLocaleString();
                premium2E.setAttribute('type', 'text');
                premium2E.value = num;
                join3E.focus();
            } else { alert('掛金設定範囲外です。'); }
        } else {
            alert('数値を正しく入力してください。');
        }
    })



join3E.addEventListener('change',()=> {
        if (pattern1.test(join3E.value)) {
            if (parseInt(join3E.value) > join2E.value && parseInt(join3E.value) < 65) {
                premium3E.focus();
            } else { alert('加入年齢を超えるか、65歳未満の年齢を入力してください'); }
        } else { alert('数値を正しく入力してください。'); }
    })

 

premium3E.addEventListener('change',(e)=> {
    e.preventDefault();
        if (pattern2.test(premium3E.value)) {
            if (parseInt(premium3E.value) >= 0 && parseInt(premium3E.value) <= 50000) {
                let num = parseInt(premium3E.value).toLocaleString();
                premium3E.setAttribute('type', 'text');
                premium3E.value = num;
                document.getElementById('calcBtn').focus();
            } else { alert('掛金設定範囲外です。'); }
        } else {
            alert('数値を正しく入力してください。');
        }
    })

    document.getElementById('taxSipBtn').addEventListener('click',()=>{
        if ((pattern1.test(joinE.value)) && (pattern1.test(retireE.value) && (pattern2.test(comma(premiumE.value))))) {
            document.getElementById('preBtn').classList.add('active');
            document.getElementById('mask').classList.add('active');
            document.getElementById('close2').addEventListener('click', ()=>{
            document.getElementById('preBtn').classList. remove('active');
            document.getElementById('mask').classList.remove('active');
            })
            let tax1 = parseInt(arr[retireN - joinN][3]) *0.8* 0.2;
            document.getElementById('nonInt').style.display = 'block';
            document.getElementById('tax1').style.display = 'block';
            document.getElementById('sip1').style.display = 'block';
            document.getElementById('pen1').style.display = 'block';
            document.getElementById('tax1').innerText = '●税金の軽減額 : ' + tax1.toLocaleString() + '円';
            let sip1 = parseInt(arr[retireN - joinN][3]) * 0.15;
            document.getElementById('sip1').innerText = '●社会保険料の軽減額 : ' + sip1.toLocaleString() + '円';
            let pension = parseInt(arr[retireN - joinN][3] * 5.481/1000000 * 20)*1000;
            document.getElementById('pen1').innerText = '●厚生年金減少額(20年分) :▲ ' + pension.toLocaleString() + '円';
            document.getElementById('nonInt').innerText = '■メリット(利息以外) : ' + parseInt(tax1 + sip1 - pension).toLocaleString() + '円';
            let message = document.getElementById('message');
            let sum5 =arr[retireN - joinN][5] + tax1 + sip1 - pension;
            let prop = parseInt((sum5) / arr[retireN - joinN][3] * 1000) / 10;
            message.innerText = '➡ 実質受取額 :' + sum5.toLocaleString() + '円 (' + prop + '%)';
            scrollBy(0, 130);

    } else {
        alert('数値を入力してください。');
    }

    })    
    
document.getElementById('setTable').addEventListener('click',()=> {
    if ((pattern1.test(joinE.value)) && (pattern1.test(retireE.value) && (pattern2.test(comma(premiumE.value))))) {
        cnt2 = cnt2 + 1;
        if (cnt2 === 2) {
            const name = ['年齢', '掛金', '掛金累計', '積立残高', '給付額'];

            //ヘッダー行の作成
            let row = '<tr><th></th>';
            for (let j = 0; j < name.length; j++) {
                row = row + '<th>' + name[j] + '</th>';
            }
            row = row + '</tr>';
            document.getElementById('t_head').insertAdjacentHTML('beforeend', row);

            // データ行の作成

            for (let i = 1; i < arr.length; i++) {
                row = '';
                row = row + '<tr><th>' + i + '年' + '</th>';
                for (let j = 1; j < 6; j++) {
                    row = row + '<td>' + arr[i][j].toLocaleString() + '</td>';
                }
                row = row + '</tr>';
                document.getElementById('t_body').insertAdjacentHTML('beforeend', row);
                scrollBy(0, 15);
            }
        } else {
            window.location.reload();
        }
    }else{
        window.location.reload();} 
})

function comma(number){
    const remove=number.replace(/,/g,'');
    return parseInt(remove);
}