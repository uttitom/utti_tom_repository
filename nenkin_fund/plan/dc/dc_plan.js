// DC_Plan.js

window.addEventListener('load', () => {
    document.getElementById('display-k').classList.add('active');
})



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




$(function(){
    $("button").on("click",function(){

    $(".item-j").toggle();
    let a=document.getElementById('display-k');
    let b=document.getElementById('display-j');

    if (a.classList.contains('active')==true) {
        a.classList.remove ('active');
        b.classList.add('active');
    } else {
        a.classList.add('active');
        b.classList.remove('active');
    }
 
 
        console.log(a);
        console.log(b);

 
    });
           
});
