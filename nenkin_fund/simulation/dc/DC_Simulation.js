// DC_Smulation2.js


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




// ***** 変数宣言 *****

let age0 ; // 年齢
let age1 ; // 変更時年齢1
let age2 ; // 変更時年齢2
let age3 ; // 変更時年齢3

let retireAge;  //　退職年齢

let premium0 ; // 掛金
let premium1 ; // 変更掛金1
let premium2 ; // 変更掛金2
let premium3 ; // 変更掛金3

let R0 ;     // 想定利率(年利率)　
let R1 ;     // 変更利率1(年利率)
let R2 ;     // 変更利率2(年利率)
let R3 ;     // 変更利率3(年利率)

let r0 ;     // 想定利率(月利率)　※　年利率Rとすると　r=(1+R)^(1/12)-1
let r1 ;     // 変更利率1(月利率)
let r2 ;     // 変更利率2(月利率)
let r3 ;     // 変更利率3(月利率)

let premium_sum = 0; //　掛金累計
let dc_sum = 0; //　ＤＣ残高

const data_arr = []; // 配列（14)：

                      // 年齢0、年齢1、年齢2、年齢3、退職年齢
                      // 想定利率0、想定利率1、想定利率2、想定利率3
                      // 掛金0、掛金1、掛金2、掛金3、引継資産

const data_arr0 = []; // 配列(5)　：年齢0、退職年齢、想定利率0、掛金0、引継資産
const data_arr1 = []; // 配列(3)　：年齢1、想定利率1、掛金1
const data_arr2 = []; // 配列(3)　：年齢2、想定利率2、掛金2
const data_arr3 = []; // 配列(3)　：年齢3、想定利率3、掛金3

let arr  = [];    //（月）[年齢,想定利率,掛金,掛金累計,ＤＣ残高]

let arr1 = [];    //（月）[年齢,想定利率,掛金,掛金累計,ＤＣ残高]
let arr2 = [];    //（月）[年齢,想定利率,掛金,掛金累計,ＤＣ残高]
let arr3 = [];    //（月）[年齢,想定利率,掛金,掛金累計,ＤＣ残高]

let arr_year=[]; //（年）[年齢,想定利率,掛金,掛金累計,ＤＣ残高]
let arr_five=[]; //（5年ごと）[年齢,想定利率,掛金,掛金累計,ＤＣ残高]

//　必須入力項目（Element）
const ageE0 = document.getElementById('age0');
const retireE = document.getElementById('retireAge');
let premiumE0 = document.getElementById('premium0');
const interestE0 = document.getElementById('interest0');

//　引継資産（Element）
const tfBtn = document.getElementById('tfBtn');
const tfAsset = document.getElementById('tfAsset');
const assetE = document.getElementById('asset');
assetE.value=0;

let asset;

//　変更年齢（Element）
const ageE1 = document.getElementById('age1');
const ageE2 = document.getElementById('age2');
const ageE3 = document.getElementById('age3');

//　変更掛金（Element）
const premiumE1 = document.getElementById('premium1');
const premiumE2 = document.getElementById('premium2');
const premiumE3 = document.getElementById('premium3');

//　変更利率（Element）
const interestE1 = document.getElementById('interest1');
const interestE2 = document.getElementById('interest2');
const interestE3 = document.getElementById('interest3');

//　テーブルの作成（Element）
const table = document.getElementById('table');
const myTable = table.rows;

const t_head = document.getElementById('t_head');
const t_body = document.getElementById('t_body');

//　表示切替ボタン（Element）
const yearly=document.getElementById('yearly');
const monthly=document.getElementById('monthly');
const five_years=document.getElementById('five_years');

// table上の引継資産の表示（Element）
const asset_amount=document.getElementById('asset_amount');

// 入力数値の正規化定義
const pattern1 = /^[0-9]{2}$/;　　 //　年齢の正規表現
const pattern2 = /^[0-9]{0,5}$/;　//　掛金の正規表現
const pattern3 = /^[0-9]{0,7}$/;　//　引継資産の正規表現

// ******* 期中で掛金・利率を変更する場合 ******

// 　変更回数：cnt
let cnt=0; //　カウンターの設定

let cnt2 = 0; //　カウンターの設定

// add1,add2,add3　:　変更回数ごとの入力エリア
const add1 = document.getElementById('container1');
const add2 = document.getElementById('container2');
const add3 = document.getElementById('container3');



// 引継資産の入力画面表示
document.getElementById('tfBtn').addEventListener('click',()=>{
    tfAsset.classList.toggle('active');
    if (tfBtn.value==='表示') {
        tfBtn.setAttribute('value','非表示');
        assetE.focus();
    }else{
         tfBtn.setAttribute('value','表示'); 
        assetE.value='';

    }    
})

// 変更ボタンの実装
document.getElementById('addBtn').addEventListener('click',()=>{
    cnt = cnt + 1;
    const a=interestE0.value;     
    if (cnt === 1) {       
        add1.style.display = 'block';　　// cnt=1のとき、変更1グループを表示
        interestE1.value=a;      
    } else if (cnt === 2) {        
        add2.style.display = 'block';　　// cnt=2のとき、変更2グループを表示
        interestE2.value=a; 
    } else if (cnt === 3) {        
        add3.style.display = 'block';　　// cnt=3のとき、変更3グループを表示
        interestE3.value=a; 

    } else if (cnt === 4) {　　　　　　　　// cnt=4のとき、変更表示をクリア
        add1.style.display = 'none';
        add2.style.display = 'none';
        add3.style.display = 'none';

        cnt = 0;　　//　cntを初期値に戻す
    }
})

// ******************************** 入力チェック　********************************

// （加入年齢）

ageE0.addEventListener('change', ()=> {
    if (pattern1.test(ageE0.value)) {
        if (parseInt(ageE0.value) >= 18 && parseInt(ageE0.value) < 65) {
            retireE.focus();         
        } else { alert('加入年齢範囲外です。'); }
    } else { alert('数値を正しく入力してください。'); }
})

// （退職年齢）

retireE.addEventListener('change',()=>{
    if (pattern1.test(retireE.value)) {

        if (parseInt(retireE.value) > parseInt(ageE0.value) && parseInt(retireE.value) <=65){
            premiumE0.focus();
        } else {
             alert('加入年齢を超えて65歳以下で入力してください。');
        }
    } else {
         alert('数値を正しく入力してください。'); 
    }
})

// （掛　金）

premiumE0.addEventListener('change',()=>{
    if (pattern2.test(premiumE0.value)) {
        if (parseInt(premiumE0.value) >= 1000 && parseInt(premiumE0.value) <= 55000) {
            premium0=premiumE0.value;
            premiumE0.setAttribute('type','text'); 　                     // 'number'➡'text' 
            premiumE0.value=parseInt(premiumE0.value).toLocaleString(); 　// 3桁カンマ表示

            interestE0.focus();
        } else {
             alert('掛金設定範囲外です。'); 
        }
    }else{
        alert('数値を正しく入力してください。');
    }
    return age0,retireAge,premium0;

})


// （引継資産）

tfAsset.addEventListener('change',()=>{

    if (pattern3.test(assetE.value)) {
        assetE.setAttribute('type','text'); 　                
        assetE.value=parseInt(assetE.value).toLocaleString(); 　
        document.getElementById('calcBtn').focus();
    } else {
        alert('数値を正しく入力してください。');
    }
})

// （変更年齢1）

ageE1.addEventListener('change', ()=> {
    if (pattern1.test(ageE1.value)) {
        if (parseInt(ageE1.value) >(parseInt(ageE0.value)) && parseInt(ageE1.value) < 65) {
            premiumE1.focus();
        } else { alert('加入年齢範囲外です。'); }
    } else { alert('数値を正しく入力してください。'); }
})

// （変更掛金1）

premiumE1.addEventListener('change',()=>{
    if (pattern2.test(premiumE1.value)) {
        if (parseInt(premiumE1.value) >= 1000 && parseInt(premiumE1.value) <= 55000) {           
            premiumE1.setAttribute('type','text'); 　                     // 'number'➡'text'へ  
            premiumE1.value=parseInt(premiumE1.value).toLocaleString(); 　// 3桁カンマ表示の処理   
            interestE1.focus();
        } else {
             alert('掛金設定範囲外です。'); 
        }

    }else{
        alert('数値を正しく入力してください。');
    }
})

// （変更年齢2）

ageE2.addEventListener('change', ()=> {
    if (pattern1.test(ageE2.value)) {
        if (parseInt(ageE2.value) >(parseInt(ageE1.value)) && parseInt(ageE2.value) < 65) {
            premiumE2.focus();
        } else { alert('加入年齢範囲外です。'); }
    } else { alert('数値を正しく入力してください。'); }
})

// （変更掛金2）

premiumE2.addEventListener('change',()=>{

    if (pattern2.test(premiumE2.value)) {
        if (parseInt(premiumE2.value) >= 1000 && parseInt(premiumE2.value) <= 55000) {           
            premiumE2.setAttribute('type','text'); 　                     // 'number'➡'text'へ  
            premiumE2.value=parseInt(premiumE2.value).toLocaleString(); 　// 3桁カンマ表示の処理   
            interestE2.focus();
        } else {
             alert('掛金設定範囲外です。'); 
        }
    }else{
        alert('数値を正しく入力してください。');
    }
})

// （変更年齢3）

ageE3.addEventListener('change', ()=> {
    if (pattern1.test(ageE3.value)) {
        if (parseInt(ageE3.value) >(parseInt(ageE2.value)) && parseInt(ageE3.value) < 65) {
            premiumE3.focus();
        } else { alert('加入年齢範囲外です。'); }
    } else { alert('数値を正しく入力してください。'); }
})
 
// （変更掛金3）

premiumE3.addEventListener('change',()=>{

    if (pattern2.test(premiumE3.value)) {
        if (parseInt(premiumE3.value) >= 1000 && parseInt(premiumE3.value) <= 55000) {           
            premiumE3.setAttribute('type','text'); 　                     // 'number'➡'text'へ  
            premiumE3.value=parseInt(premiumE3.value).toLocaleString(); 　// 3桁カンマ表示の処理   
            interestE3.focus();
        } else {
             alert('掛金設定範囲外です。'); 
        }
    }else{
        alert('数値を正しく入力してください。');
    }
})


//  入力数値及び表示のクリア 　　---■「クリアボタン」(clBtn)

document.getElementById('clBtn').addEventListener('click',()=>{
    window.location.reload();
})

  // ************************  積立金の計算  ************************


document.getElementById('calcBtn').addEventListener('click',()=>{

    premium0=comma(premiumE0.value ); // 掛金の3桁カンマ削除（comma関数）
    asset=comma(assetE.value);　      // 引継資産の3桁カンマ削除（comma関数）
    

    // 正規表現(pattern1,pattern2)に合致しているかの判定
    // 合致していない場合は、警告メッセージの表示 ➡　alert('数値を正しく入力して下さい')　

        if ((pattern1.test(ageE0.value))  &&  // age0 が正規表現と一致
          (pattern1.test(retireE.value))  &&    // retireAge が正規表現と一致
          (pattern2.test(premium0))  ) {        // premium0 が正規表現と一致

            dc_sum=dc_sum
                        +parseInt(asset); // ＤＣ残高に引継資産(asset)を加算する
        
    // 【掛金又は利率の変更なしの場合】********************************************

        if (!ageE1.value&&!ageE2.value&&!ageE3.value) {

                R0=parseFloat(interestE0.value);
                r0 = monthR(parseInt(R0*1000)/1000 ); //月利率：monthR()関数
            console.log(r0); // ★★★

            for (let n = 1; n <=(retireE.value-ageE0.value)*12 ; n++) { // 全区間

            premium_sum+=
                        parseInt(comma(premiumE0.value)); // 掛金累計

                dc_sum=
                        dc_sum                              // 前月残高
                        + parseInt(dc_sum*r0)               // 当月利息
                        +parseInt(comma(premiumE0.value));  // 当月掛金 

                arr[n] =[

                parseInt(ageE0.value)+parseInt(n/12),                // 0:年齢　
                (parseInt(interestE0.value * 1000) / 10).toFixed(1), // 1:年 利率
                parseInt(comma(premiumE0.value)) ,                   // 2:当月掛金 
                premium_sum,                                         // 3:掛金累計
                dc_sum                                               // 4:ＤＣ残高 

                ];
            }

        console.log(arr);

     // 【掛金又は利率の変更1の場合】 ***********************************************

        } else if(!ageE2.value&&!ageE3.value){

            R0 = parseFloat(interestE0.value);      // 年利率(加入時)
            R1 = parseFloat(interestE1.value);      // 年利率(変更時)
            r0 = monthR(parseInt(R0 * 1000) / 1000); //月利率：monthR()関数
            r1 = monthR(parseInt(R1 * 1000) / 1000); //月利率：monthR()関数
            console.log(r0, r1);// ★★★

            console.log(ageE0.value,ageE1.value,retireE.value); // ★★★

            // 第1区間(加入年齢から変更年齢1前まで)

            for (let n = 1; n <= (ageE1.value-ageE0.value)*12; n++) { 

                premium_sum +=
                    parseInt(comma(premiumE0.value)); // 掛金累計
                dc_sum =
                    dc_sum                              // 前月残高
                    + parseInt(dc_sum * r0)               // 当月利息
                    + parseInt(comma(premiumE0.value));  // 当月掛金                

                 arr[n] =[
                    parseInt(ageE0.value)+parseInt(n/12),                // 0:年齢
                    (parseInt(interestE0.value * 1000) / 10).toFixed(1), // 1:年 利率
                    parseInt(comma(premiumE0.value)),                    // 2:当月掛金
                    premium_sum,                                         // 3:掛金累計
                    dc_sum                                               // 4:ＤＣ残高                 
                ];                              
            } 
            console.log(arr);  //  ★★★　配列変数の確認

            // 第2区間(変更年齢1から退職年齢前)
            console.log((ageE1.value-ageE0.value)*12,(retireE.value-ageE0.value)*12);
            for (let n = 1; n <=(retireE.value-ageE1.value)*12 ; n++) {　

                premium_sum +=
                    parseInt(comma(premiumE1.value)); // 掛金累計
                dc_sum =
                    dc_sum                                // 前月残高
                    + parseInt(dc_sum * r1)               // 当月利息
                    + parseInt(comma(premiumE1.value));   // 当月掛金                

                arr1[n-1] =[
                parseInt(ageE1.value)+parseInt(n/12),                // 0:年齢
                (parseInt(interestE1.value * 1000) / 10).toFixed(1), // 1:年 利率
                parseInt(comma(premiumE1.value)),                    // 2:当月掛金
                premium_sum,                                         // 3:掛金累計
                dc_sum                                               // 4:ＤＣ残高                 
                ];                                             
            } 

            arr=arr.concat(arr1);

            console.log(arr1);  //  ★★★　配列変数の確認
            console.log(arr);  //  ★★★　配列変数の確認


            
        // 【掛金又は利率の変更2の場合】    

        }else if(!ageE3.value){

            R0 = parseFloat(interestE0.value);      // 年利率(加入時)
            R1 = parseFloat(interestE1.value);      // 年利率(変更時1)
            R2 = parseFloat(interestE2.value);      // 年利率(変更時2)
            r0 = monthR(parseInt(R0 * 1000) / 1000); //月利率：monthR()関数
            r1 = monthR(parseInt(R1 * 1000) / 1000); //月利率：monthR()関数
            r2 = monthR(parseInt(R2 * 1000) / 1000); //月利率：monthR()関数            
            console.log(r0, r1, r2);// ★★★

            console.log(ageE0.value, ageE1.value, ageE2.value, retireE.value); // ★★★

            // 第1区間(加入年齢から変更年齢1前まで)

            for (let n = 1; n <= (ageE1.value - ageE0.value) * 12; n++) {

                premium_sum +=
                    parseInt(comma(premiumE0.value)); // 掛金累計
                dc_sum =
                    dc_sum                              // 前月残高
                    + parseInt(dc_sum * r0)               // 当月利息
                    + parseInt(comma(premiumE0.value));  // 当月掛金                

                arr[n] = [
                    parseInt(ageE0.value) + parseInt(n / 12),                // 0:年齢
                    (parseInt(interestE0.value * 1000) / 10).toFixed(1), // 1:年 利率
                    parseInt(comma(premiumE0.value)),                    // 2:当月掛金
                    premium_sum,                                         // 3:掛金累計
                    dc_sum                                               // 4:ＤＣ残高                 
                ];
            }
            console.log(arr);  //  ★★★　配列変数の確認

            // 第2区間(変更年齢1から変更年齢2前)
            console.log((ageE1.value - ageE0.value) * 12, (retireE.value - ageE0.value) * 12);
            for (let n = 1; n <= (ageE2.value - ageE1.value) * 12; n++) {

                premium_sum +=
                    parseInt(comma(premiumE1.value)); // 掛金累計
                dc_sum =
                    dc_sum                                // 前月残高
                    + parseInt(dc_sum * r1)               // 当月利息
                    + parseInt(comma(premiumE1.value));   // 当月掛金                

                arr1[n - 1] = [
                    parseInt(ageE1.value) + parseInt(n / 12),                // 0:年齢
                    (parseInt(interestE1.value * 1000) / 10).toFixed(1), // 1:年 利率
                    parseInt(comma(premiumE1.value)),                    // 2:当月掛金
                    premium_sum,                                         // 3:掛金累計
                    dc_sum                                               // 4:ＤＣ残高                 
                ];
            }

            arr = arr.concat(arr1);

            // 第3区間(変更年齢2から退職年齢前)
            console.log((ageE2.value - ageE1.value) * 12, (retireE.value - ageE2.value) * 12);
            for (let n = 1; n <= (retireE.value - ageE2.value) * 12; n++) {

                premium_sum +=
                    parseInt(comma(premiumE2.value)); // 掛金累計
                dc_sum =
                    dc_sum                                // 前月残高
                    + parseInt(dc_sum * r2)               // 当月利息
                    + parseInt(comma(premiumE2.value));   // 当月掛金                

                arr2[n - 1] = [
                    parseInt(ageE2.value) + parseInt(n / 12),                // 0:年齢
                    (parseInt(interestE2.value * 1000) / 10).toFixed(1), // 1:年 利率
                    parseInt(comma(premiumE2.value)),                    // 2:当月掛金
                    premium_sum,                                         // 3:掛金累計
                    dc_sum                                               // 4:ＤＣ残高                 
                ];
            }

            arr = arr.concat(arr2);

            console.log(arr2);  //  ★★★　配列変数の確認
            console.log(arr);  //  ★★★　配列変数の確認

            
            // 【掛金又は利率の変更3の場合】

        }else{ 

            R0 = parseFloat(interestE0.value);      // 年利率(加入時)
            R1 = parseFloat(interestE1.value);      // 年利率(変更時1)
            R2 = parseFloat(interestE2.value);      // 年利率(変更時2)
            R3 = parseFloat(interestE3.value);      // 年利率(変更時3)
            r0 = monthR(parseInt(R0 * 1000) / 1000); //月利率：monthR()関数
            r1 = monthR(parseInt(R1 * 1000) / 1000); //月利率：monthR()関数
            r2 = monthR(parseInt(R2 * 1000) / 1000); //月利率：monthR()関数 
            r3 = monthR(parseInt(R3 * 1000) / 1000); //月利率：monthR()関数                        
            console.log(r0, r1, r2, r3);// ★★★

            console.log(ageE0.value, ageE1.value, ageE2.value,  ageE3.value, retireE.value); // ★★★

            // 第1区間(加入年齢から変更年齢1前まで)

            for (let n = 1; n <= (ageE1.value - ageE0.value) * 12; n++) {

                premium_sum +=
                    parseInt(comma(premiumE0.value)); // 掛金累計
                dc_sum =
                    dc_sum                              // 前月残高
                    + parseInt(dc_sum * r0)               // 当月利息
                    + parseInt(comma(premiumE0.value));  // 当月掛金                

                arr[n] = [
                    parseInt(ageE0.value) + parseInt(n / 12),                // 0:年齢
                    (parseInt(interestE0.value * 1000) / 10).toFixed(1), // 1:年 利率
                    parseInt(comma(premiumE0.value)),                    // 2:当月掛金
                    premium_sum,                                         // 3:掛金累計
                    dc_sum                                               // 4:ＤＣ残高                 
                ];
            }
            console.log(arr);  //  ★★★　配列変数の確認

            // 第2区間(変更年齢1から変更年齢2前)
            console.log((ageE1.value - ageE0.value) * 12, (ageE2.value - ageE1.value) * 12);
            for (let n = 1; n <= (ageE2.value - ageE1.value) * 12; n++) {

                premium_sum +=
                    parseInt(comma(premiumE1.value)); // 掛金累計
                dc_sum =
                    dc_sum                                // 前月残高
                    + parseInt(dc_sum * r1)               // 当月利息
                    + parseInt(comma(premiumE1.value));   // 当月掛金                

                arr1[n - 1] = [
                    parseInt(ageE1.value) + parseInt(n / 12),                // 0:年齢
                    (parseInt(interestE1.value * 1000) / 10).toFixed(1), // 1:年 利率
                    parseInt(comma(premiumE1.value)),                    // 2:当月掛金
                    premium_sum,                                         // 3:掛金累計
                    dc_sum                                               // 4:ＤＣ残高                 
                ];
            }

            arr = arr.concat(arr1);

            // 第3区間(変更年齢2から変更年齢3前)
            console.log((ageE2.value - ageE1.value) * 12,(ageE3.value - ageE2.value) * 12);
            for (let n = 1; n <= (ageE3.value - ageE2.value) * 12; n++) {

                premium_sum +=
                    parseInt(comma(premiumE2.value)); // 掛金累計
                dc_sum =
                    dc_sum                                // 前月残高
                    + parseInt(dc_sum * r2)               // 当月利息
                    + parseInt(comma(premiumE2.value));   // 当月掛金                

                arr2[n - 1] = [
                    parseInt(ageE2.value) + parseInt(n / 12),                // 0:年齢
                    (parseInt(interestE2.value * 1000) / 10).toFixed(1), // 1:年 利率
                    parseInt(comma(premiumE2.value)),                    // 2:当月掛金
                    premium_sum,                                         // 3:掛金累計
                    dc_sum                                               // 4:ＤＣ残高                 
                ];
            }

            arr = arr.concat(arr2);

            // 第4区間(変更年齢3から退職年齢前)
            console.log((ageE3.value - ageE2.value) * 12, (retireE.value - ageE3.value) * 12);
            for (let n = 1; n <= (retireE.value - ageE3.value) * 12; n++) {

                premium_sum +=
                    parseInt(comma(premiumE3.value)); // 掛金累計
                dc_sum =
                    dc_sum                                // 前月残高
                    + parseInt(dc_sum * r3)               // 当月利息
                    + parseInt(comma(premiumE3.value));   // 当月掛金                

                arr3[n - 1] = [
                    parseInt(ageE3.value) + parseInt(n / 12),                // 0:年齢
                    (parseInt(interestE3.value * 1000) / 10).toFixed(1), // 1:年 利率
                    parseInt(comma(premiumE3.value)),                    // 2:当月掛金
                    premium_sum,                                         // 3:掛金累計
                    dc_sum                                               // 4:ＤＣ残高                 
                ];
            }

            arr = arr.concat(arr3);

            
            console.log(arr3);  //  ★★★　配列変数の確認
            console.log(arr);  //  ★★★　配列変数の確認



        }

        }            
        for (let i = 1; i < arr.length; i++) {
            if (i%12===0) {
            arr_year.push(arr[i]) ;
                // arr_year[0][3] = parseInt(comma(assetE.value));
            }
        }

        for (let i = 1; i < arr.length; i++) {

            if (arr.length<60) {
                if (i%12===0) {
                    arr_five=arr_year;
                    // arr_five[0][3] = parseInt(comma(assetE.value));
                }            
            } else if (i%60===0) {
                arr_five.push(arr[i]) ;              
                // arr_five[0][3] = parseInt(comma(assetE.value));
            }
            
        }
        //  arr_five.push(arr[arr.length]);
            console.table(arr_year); // ★★★
            console.table(arr_five); // ★★★
            console.log(arr_five[1]); // ★★★
        // 計算結果の表示
        document.getElementById('result1').innerText=`■ ＤＣ残高：${arr_year[arr_year.length-1][4].toLocaleString()}円`;



})


document.getElementById('setTable').addEventListener('click',()=>{

    if ((pattern1.test(ageE0.value)) && (pattern1.test(retireE.value)) && (pattern2.test(premium0))){

        asset_amount.innerText = `■ 引継資産 : ${asset.toLocaleString()}円（金額：円）`;

        cnt2=cnt2+1; // 表作成のスイッチ　1：作成　　1以外の場合：reloadされcnt2は初期値0となる

        if (cnt2===1) {
            const name = ['年齢', '利率(%)', '掛金',  '掛金累計', 'ＤＣ残高'];
 
            //　ヘッダーの作成

            if (yearly.checked===true) {　　　　　　// ***** 年表示（デフォルト）*****

                let row = '<tr><th></th>';
                for (let j = 0; j < name.length; j++) {
                    row = row + '<th>' + name[j] + '</th>';
                }
                row = row + '</tr>';

                t_head.insertAdjacentHTML('beforeend', row);

                // データの作成

                for (let i = 0; i < arr_year.length; i++) {
                    row = '';
                    row = row + '<tr><th>' + (i + 1) + '年' + '</th>';

                    for (let j = 0; j < 5; j++) {

                        row = row + '<td>' + arr_year[i][j].toLocaleString() + '</td>';

                    }

                    row = row + '</tr>';
                    t_body.insertAdjacentHTML('beforeend', row)
                }                                
            } else if (monthly.checked === true) {     // ***** 月表示 *****


                let row = '<tr><th></th>';
                for (let j = 0; j < name.length; j++) {
                    row = row + '<th>' + name[j] + '</th>';
                }
                row = row + '</tr>';

                t_head.insertAdjacentHTML('beforeend', row);

                //データの作成

                for (let i = 1; i <= arr.length; i++) {
                    row = '';
                    row = row + '<tr><th>' + i + '月' + '</th>';

                    for (let j = 0; j < 5; j++) {

                        row = row + '<td>' + arr[i][j].toLocaleString() + '</td>';

                    }

                    row = row + '</tr>';
                    t_body.insertAdjacentHTML('beforeend', row);
                }


            } else if (five_years.checked === true) {     // ***** 5年ごと表示 *****

                let row = '<tr><th></th>';
                for (let j = 0; j < name.length; j++) {
                    row = row + '<th>' + name[j] + '</th>';
                }
                row = row + '</tr>';

                t_head.insertAdjacentHTML('beforeend', row);

                // データの作成

                for (let i = 0; i < arr_five.length; i++) {
                    row = '';
                    row = row + '<tr><th>' + (i+1)*5 + '年' + '</th>';

                    for (let j = 0; j < 5; j++) {
                        console.log(arr_five[i]);

                        row = row + '<td>' + arr_five[i][j].toLocaleString() + '</td>';
                    }                    
                    row = row + '</tr>';
                    t_body.insertAdjacentHTML('beforeend', row);
                }

                
                for (let i = arr_five.length*5; i < arr.length; i++) {
                    row = '';
                    row = row + '<tr><th>' + (i + 1) + '年' + '</th>';

                    for (let j = 0; j < 6; j++) {
                        if (i > 0) {
                            arr_year[i][3] = '-';
                        }

                        row = row + '<td>' + arr_year[i][j].toLocaleString() + '</td>';

                    }

                    row = row + '</tr>';
                    t_body.insertAdjacentHTML('beforeend', row);
                }    
            }
        }else{
            window.location.reload();
        }

    }else{
        window.location.reload();
    }
    scrollBy(0, 300);    
})

//　表示の切り替え　年　⇔　月　⇔　5年ごと

let radio=document.getElementById('radio-box');

radio.addEventListener('click',()=>{

    if(myTable.length>0){
        // 表データ行の削除

        for (let i = myTable.length - 1; i >= 1; i--) {
            table.deleteRow(i);
        }

        // *******************  切替処理１（月単位へ）　　************************************

        if (monthly.checked === true) {　　　// ***** 月表示へ　*****

            //データの作成

            for (let i = 1; i < arr.length; i++) {
                row = '';
                row = row + '<tr><th>' + i + '月' + '</th>';

                for (let j = 0; j < 5; j++) {

                    row = row + '<td>' + arr[i][j].toLocaleString() + '</td>';
                }

                row = row + '</tr>';
                t_body.insertAdjacentHTML('beforeend', row);
            }
        // ***** 年表示へ　*****
        } else if (yearly.checked === true) {　　　　　　　

            //データの作成

            for (let i = 0; i < arr_year.length; i++) {
                row = '';
                row = row + '<tr><th>' + (i + 1) + '年' + '</th>';

                for (let j = 0; j < 5; j++) {

                    row = row + '<td>' + arr_year[i][j].toLocaleString() + '</td>';
                }

                row = row + '</tr>';
                t_body.insertAdjacentHTML('beforeend', row);
            }

        } else if (five_years.checked === true) {　// ***** 5年ごと年表示　*****

            // データの作成

            if (arr.length >= 60) {

                for (let i = 0; i < arr_five.length; i++) {
                    row = '';
                    row = row + '<tr><th>' + (i + 1) * 5 + '年' + '</th>';

                    for (let j = 0; j < 5; j++) {

                        row = row + '<td>' + arr_five[i][j].toLocaleString() + '</td>';
                    }
                    row = row + '</tr>';
                    t_body.insertAdjacentHTML('beforeend', row);
                }


                for (let i = arr_five.length * 5; i < arr.length; i++) {
                    row = '';
                    row = row + '<tr><th>' + (i + 1) + '年' + '</th>';

                    for (let j = 0; j < 5; j++) {

                        row = row + '<td>' + arr_year[i][j].toLocaleString() + '</td>';　//***エラーが発生****

                    }

                    row = row + '</tr>';
                    t_body.insertAdjacentHTML('beforeend', row);
                }

            } else {

                for (let i = 0; i < arr.length; i++) {
                    row = '';
                    row = row + '<tr><th>' + (i + 1) + '年' + '</th>';

                    for (let j = 0; j < 6; j++) {

                        row = row + '<td>' + arr_year[i][j].toLocaleString() + '</td>';

                    }

                    row = row + '</tr>';
                    t_body.insertAdjacentHTML('beforeend', row);
                }
            }
        }
    }
    console.log(myTable.length); // ★★★

})

        


//　カンマを削除する関数

function comma(string_number){
    const remove=string_number.replace(/,/g,'');
    return parseInt(remove);
}


function monthR(R){
    let r = parseInt((Math.pow(1 + R, 1 / 12) - 1) * 10000000) / 10000000;
    return r;    
}

