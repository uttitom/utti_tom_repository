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

// １．ＤＢプランの仕組み

const article_01 = document.getElementById('article-01');
const display_01 = document.getElementById('display_01');

article_01.addEventListener('click',(e)=>{
    e.preventDefault();
    display_01.classList.toggle('open');
})

const office1 = document.getElementById('office1');
const img1 = document.getElementById('img1');
office1.addEventListener('click', () => {
    img1.classList.toggle('open');
})

//  仕組図の描画（基金年金）

// let ctx1 = can1.getContext('2d');

// const img1 = new Image();
// img1.src = 'img1.png ';
// img1.onload = ()=>{
//     ctx1.drawImage(img1,0,0,500,300);
// }



const office2 = document.getElementById('office2');
const img2 = document.getElementById('img2');
office2.addEventListener('click', () => {
    img2.classList.toggle('open');
})
//  仕組図の描画（基金年金＋地質年金）

// let ctx2 = can2.getContext('2d');

// const img2 = new Image();
// img2.src = 'img2.png ';
// img2.onload = ()=>{
//     ctx2.drawImage(img2,0,0,500,300);
// }

const office3 = document.getElementById('office3');
const img3 = document.getElementById('img3');
office3.addEventListener('click', () => {
    img3.classList.toggle('open');
})

//  仕組図の描画（基金年金＋地質年金＋付加年金）

// let ctx3 = can3.getContext('2d'); 

// const img3 = new Image();
// img3.src = 'img3.png ';
// img3.onload = ()=>{
//     ctx3.drawImage(img3,0,0,500,300);
// }


// ２．加入対象者

const article_02 = document.getElementById('article_02');
const display_02 = document.getElementById('display_02');

article_02.addEventListener('click',(e)=>{
    e.preventDefault();
    display_02.classList.toggle('open');
});

// ３．給付設計

const article_03 = document.getElementById('article_03');
const display_03 = document.getElementById('display_03');

article_03.addEventListener('click',(e)=>{
    e.preventDefault();
    display_03.classList.toggle('open');
});

// ４．主な給付

const article_04 = document.getElementById('article_04');
const display_04 = document.getElementById('display_04');

article_04.addEventListener('click',(e)=>{
    e.preventDefault();
    display_04.classList.toggle('open');
});


// ５．掛金コース

const article_05 = document.getElementById('article_05');
const display_05 = document.getElementById('display_05');

article_05.addEventListener('click',(e)=>{
    e.preventDefault();
    display_05.classList.toggle('open');
});

// (1) 定額コース

const fixed = document.getElementById('fixed');
const fixed_table = document.getElementById('fixed_table');

fixed.addEventListener('click',(e)=>{
    e.preventDefault();
    fixed_table.classList.toggle('open');
});

// (2) 給与比例コース

const ratio = document.getElementById('ratio');
const ratio_table = document.getElementById('ratio_table');

ratio.addEventListener('click',(e)=>{
    e.preventDefault();
    ratio_table.classList.toggle('open');
});