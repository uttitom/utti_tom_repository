

window.addEventListener('load',()=>{
    document.getElementById('display-k').classList.add('active');
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

        // if (a.style) {
    
            
 
        // }
    });
           
});
