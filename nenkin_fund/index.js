const menu_btn=document.getElementById('menu_btn');

const sp1=document.getElementById('sp1');
const sp2=document.getElementById('sp2');
const sp3=document.getElementById('sp3');

const nav2=document.getElementById('nav2');

// let cnt=1;
menu_btn.addEventListener('click',()=>{

    console.log('success!');
 
        sp1.classList.toggle('close');
        sp2.classList.toggle('close');
        sp3.classList.toggle('close');   

        nav2.classList.toggle('open');

})
