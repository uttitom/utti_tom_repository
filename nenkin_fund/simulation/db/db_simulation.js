// db_simulation.js

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





//　*********************　　基金年金(除く2号、3号)　と地質年金の共通 の変数宣言　　　*******************

const　interest = 0.02;
const join = document.getElementById('join');  　　　　　// 加入年齢
const retire = document.getElementById('retire');　　　　// 退職年齢

//　*********************　　基金年金(除く2号、3号) の変数宣言　　　*******************

let arr = [];

const p_box =document.getElementById('p_box');　　//　掛金選択エリア

const flat_title=document.getElementById('flat_title');  //　定額掛金
const flat_aria=document.getElementById('flat_aria');    //　定額掛金選択のBOX
const flat=document.getElementById('flat');    //　定額掛金ELEMENT

const fixed_title=document.getElementById('fixed_title');//　定率掛金(給与比例)
const fixed_aria=document.getElementById('fixed_aria');  //　定率掛金選択のbox
const salary = document.getElementById('salary');        // 現在給与
const fixed=document.getElementById('fixed');    //　定率掛金ELEMENT

const result1 = document.getElementById('result1'); // 計算結果の表示部分
const result1_a = document.getElementById('result1_a'); // 月額掛金
const result1_b = document.getElementById('result1_b'); // 掛金累計
const result1_c= document.getElementById('result1_c'); //  給付額(一時金)

const salary_index1=[
    0.79357,0.90479,
    1.00000,1.06479,1.10738,1.15127,1.21189,1.28362,1.35009,1.40738,1.45823,1.50820,
    1.55792,1.60794,1.65761,1.70672,1.75573,1.80480,1.85336,1.90078,1.94797,1.99673,
    2.04828,2.10132,2.15158,2.19433,2.22774,2.25402,2.27618,2.29461,2.30686,2.31027,
    2.30618,2.29883,2.29139,2.28087,2.26163,2.23152,2.19435,2.15688,2.12377,2.09500,
    1.64080,1.55614,1.49934,1.46405,1.43403,1.39659,1.35247,1.31791,1.29685,1.28529
]

const salary_index2=[
    0.86066,0.93324,
    1.00000,1.06326,1.12933,1.20399,1.27829,1.33730,1.37421,1.39575,1.41083,1.42507,
    1.43906,1.45326,1.46724,1.47998,1.49068,1.49939,1.50760,1.51662,1.52673,1.53626,
    1.54331,1.54724,1.54882,1.54887,1.54705,1.54260,1.53567,1.52754,1.52003,1.51354,
    1.50730,1.50056,1.49358,1.48542,1.47535,1.46326,1.45040,1.43867,1.42925,1.42183,
    1.30528,1.26942,1.24704,1.23810,1.23659,1.23534,1.23175,1.22899,1.22644,1.22324
]

// console.log(salary_index1,salary_index2);

const pattern1 = /^[0-9]{2}$/;      //　2ケタの数値入力（年齢）のための正規表現
const pattern2 = /^[0-9]{2,3}$/;　　　 //  2又は3ケタの数値（給与：千円単位）の正規表現

const calcBtn = document.getElementById('calcBtn');


// const join_age = parseInt(join.value) ;
// const retire_age = parseInt(retire.value) ;
// let premium_sum=0;
// let sum=0;         



// 入力チェック：加入年齢
join.addEventListener('change',()=>{
    if (pattern1.test(join.value)) {
        if (parseInt(join.value)>=18 && parseInt(join.value)<65) {
            retire.focus();            
        } else {
            alert('加入年齢範囲外です。');
        }
    } else {
        alert('数値を正しく入力ください');
    }
})

// 入力チェック：退職年齢
retire.addEventListener('change',()=>{
    if (pattern1.test(retire.value)) {
        if (parseInt(retire.value)>parseInt(join.value) && parseInt(retire.value)<=65) {
            flat_title.focus();          
        } else {
            alert('加入年齢を超えて65歳以下で入力してください。');
        }
    } else {
        alert('数値を正しく入力ください');
    }

})

// 入力チェック：現在の給与
salary.addEventListener('change', () => {
    if (pattern2.test(salary.value)) {
        if (parseInt(salary.value) >= 88 && parseInt(salary.value) <= 650) {
           fixed.focus();
        } else {
            alert('対象給与額範囲外です。');
        }
    } else {
        alert('88,000円から650,000円の範囲で入力ください');
    }
})

// 掛金：定額と給与比例の切替の実装

// 定額の場合
flat_title.addEventListener('change',(e)=>{
    e.preventDefault();
    flat_aria.style.display='block';
    fixed_aria.style.display='none';
})
//　給与比例の場合
fixed_title.addEventListener('change',(e)=>{
    e.preventDefault();
    fixed_aria.style.display='block';
    flat_aria.style.display='none';
})

//　全クリア（clBtn）

document.getElementById('clBtn').addEventListener('click',()=>{
    window.location.reload();
})

// 給付計算

document.getElementById('calcBtn').addEventListener('click', (e) => {
    e.preventDefault();

    
    const join_age = parseInt(join.value) ;
    const retire_age = parseInt(retire.value) ;
    let premium_sum=0;
    let sum=0;           
        
    if (flat_title.checked===true) {
        if ((pattern1.test(join.value)) && (pattern1.test(retire.value)) ) {

            const premium = parseInt(flat.value) ;

            console.log(join_age,retire_age,premium,100*interest);
           
            for (let i = 1; i<= retire_age - join_age; i++) {

                premium_sum = premium_sum + premium * 12;
                sum = sum + parseInt(parseInt(sum * interest+.5) / 12+.5) * 12 + premium * 12;;

                // premium_sum = premium_sum + premium*12;
                // sum = sum + Math.round(Math.round(sum * interest) / 12) * 12+premium*12;;

                let benefit = parseInt(sum / 100 + .99) * 100;
                p = Math.floor(benefit / premium_sum * 1000) / 10

                // let benefit = Math.ceil(sum / 100+.99) * 100;
                // p = Math.floor( benefit/ premium_sum * 1000) / 10
                arr[i] = [i, i+ join_age, premium, premium_sum, sum, benefit,p];
            }
            console.log(arr);
            // console.log(arr[30][5].toLocaleString());
            result1_a.innerText=`月額掛金　　 　：${arr[arr.length-1][2].toLocaleString()}円`;
            result1_b.innerText=`掛金累計　　 　：${arr[arr.length-1][3].toLocaleString()}円`;
            result1_c.innerText=`給付額(${retire_age}歳時) ：${arr[arr.length-1][5].toLocaleString()}円`;
            　
        } else {
            alert('数値を入力してください。');
        }        
        
    } else if(fixed_title.checked===true)  {

        const premium_rate=parseFloat(fixed.value);

        const premium =[];

        let r_box = [];
        
        for (let i = 0; i < retire_age - join_age ; i++) {

            let r=parseInt(salary_index1[join_age - 18+i]/salary_index1[join_age-18]*100000)/100000 ;

            
            r_box[i + join_age]=[r];

            premium[i + join_age] = parseInt(parseInt(salary.value)*1000 *r *premium_rate)  ;    
            
        }

        console.log(premium_rate,premium,r_box);

            for (let i = 1; i<= retire_age - join_age; i++) {

                premium_sum = premium_sum + premium[i+join_age-1]*12;
                sum = sum + Math.round(Math.round(sum * interest) / 12) * 12+premium[i+join_age-1]*12;;

                let benefit = Math.ceil(sum / 100) * 100;
                p = Math.floor( benefit/ premium_sum * 1000) / 10
                arr[i] = [i, i+ join_age, premium[i+ join_age-1], premium_sum, sum, benefit,p];
            }        
        console.log(arr);   
            result1_a.innerText='';
            result1_b.innerText=`掛金累計　　 　：${arr[arr.length-1][3].toLocaleString()}円`;
            result1_c.innerText=`給付額(${retire_age}歳時) ：${arr[arr.length-1][5].toLocaleString()}円`;
    }

})

//　*********************　　地質年金の変数宣言　　　********************

const coefficient = [
    2.18,2.27,2.36,2.44,2.53,
    2.61,2.70,2.79,2.87,2.96,3.05,3.09,3.14,3.19,3.24,
    3.29,3.32,3.36,3.40,3.43,3.47,3.51,3.55,3.58,3.62,
    3.66,3.70,3.73,3.77,3.81,3.85,3.88,3.92,3.96,4.00,4.03
];
let geo_pension = 0;
const remuneration = document.getElementById('remuneration');　 // 平均給与
const calcBtn2 = document.getElementById('calcBtn');

const result2_a = document.getElementById('result2_a'); // 地質年金（一時金）
const result2_b = document.getElementById('result2_b'); // 5年確定（年金）
const result2_c = document.getElementById('result2_c'); // 10年確定（年金）
const result2_d = document.getElementById('result2_d'); // 15年確定（年金）
const result2_e = document.getElementById('result2_e'); // 20年確定（年金）

// 入力チェック：平均給与
remuneration.addEventListener('change', () => {
    if (pattern2.test(remuneration.value)) {
        if (parseInt(remuneration.value) >= 88 && parseInt(remuneration.value) <= 650) {
           calcBtn2.focus();
        } else {
            alert('対象給与額範囲外です。');
        }
    } else {
        alert('88,000円から650,000円の範囲で入力ください');
    }
})

// 地質年金の計算（年金と一時金）

// console.log(coefficient);


document.getElementById('calcBtn2').addEventListener('click', (e) => {
    e.preventDefault();
    const join_age = parseInt(join.value) ;
    const retire_age = parseInt(retire.value) ;

console.log(retire_age - join_age-15);
geo_pension = parseInt(remuneration.value)*1000*coefficient[retire_age - join_age-15]; 

result2_a.innerText=`一時金：${geo_pension.toLocaleString()}円`;
result2_b.innerText=`・5年確定年金選択　年額：${(parseInt(parseInt(geo_pension/4.812/100+.99))*100) .toLocaleString()}円`;
result2_c.innerText=`・10年確定年金選択　年額：${(parseInt(parseInt(geo_pension/9.280/100+.99))*100) .toLocaleString()}円`;
result2_d.innerText=`・15年確定年金選択　年額：${(parseInt(parseInt(geo_pension/13.426/100+.99))*100) .toLocaleString()}円`;
result2_e.innerText=`・20年確定年金選択　年額：${(parseInt(parseInt(geo_pension/17.276/100+.99))*100) .toLocaleString()}円`;

})