(function () {
    let a, b, c; // a:積立月額、b:老後期間、c:年金月額

    a = 25;  // 生活費　　初期値　25万円
    b = 20;  // 老後期間　初期値　20年
    c = 10;  // 年金月額　初期値　10万円

    const fund = document.getElementById('fund');
    const pension_sum = document.getElementById('pension_sum');
    const reduction = document.getElementById('reduction');  

    const input_cost = document.getElementById('input_cost');
    const output_cost = document.getElementById('output_cost');

    const input_term = document.getElementById('input_term');
    const output_term = document.getElementById('output_term'); 

    const input_pension = document.getElementById('input_pension');
    const output_pension = document.getElementById('output_pension');     


    // 老後資金の表示  
    fund.innerText = (a*b*12).toLocaleString();

    // 年金総額の表示
    pension_sum.innerText = (c * b * 12).toLocaleString();

    // 必要額の表示
    reduction.innerText = (a*b*12-c*b*12).toLocaleString();
    

    // 積立月額の表示

    input_cost.oninput = (e) => {

        // スライダー操作後の積立月額
        a = parseInt(e.target.value); 
        output_cost.innerText = a.toLocaleString();

        // 老後資金の表示
        fund.innerText = (a*b*12).toLocaleString(); 
        
        // 必要額の表示
        reduction.innerText = (a*b*12-c*b*12).toLocaleString();

    }

    // 老後期間の表示

    input_term.oninput = (e) => {

        // スライダー操作後の老後期間（年数）の表示
        b = parseInt(e.target.value);
        output_term.innerText = b.toLocaleString();

        // 老後資金の表示
        fund.innerText = (a*b*12).toLocaleString() ;

        // 年金総額の表示
        pension_sum.innerText = (c*b*12).toLocaleString(); 
        console.log(c,b);       

        // 必要額の表示
        reduction.innerText = (a*b*12-c*b*12).toLocaleString();
        
    }

    // 年金総額の表示

    input_pension.oninput = (e) => {

        // スライダー操作後の年金月額の表示
        c = parseInt(e.target.value); 
        output_pension.innerText = c.toLocaleString();

        // スライダー操作後の年金総額の表示
        pension_sum.innerText = (c*b*12).toLocaleString();

        // 必要額の表示
        reduction.innerText = (a*b*12-c*b*12).toLocaleString();
    
    }  
    
    // function calc21(a,b){
    //     x = a*12*b;
    //     return x;
    // }

 
}());

