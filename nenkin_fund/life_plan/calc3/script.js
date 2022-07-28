(function () {

    let loan,term, interest,repay;

    const result = document.getElementById('result2');
    const input_loan = document.getElementById('input_loan');
    const output_loan = document.getElementById('output_loan');
    const input_term = document.getElementById('input_term');
    const output_term = document.getElementById('output_term');  
    const interest0 = document.getElementById('interest0'); 
  

    loan = 3000; 　// ローン額　初期値　3,000 万円
    term = 20;    　// 返済期間　初期値　　20 年
    interest = interest0.value ;　// 利率　  　初期値　　  0 ％

    console.log(interest);

    // 返済額の表示
    result.innerText =(parseInt(loan*10000/(term*12))).toLocaleString();

    // 変更後のローン額の表示
    input_loan.oninput = (e) => {

        // スライダー操作後のローン額 
        loan = parseInt(e.target.value); 
        output_loan.innerText = loan.toLocaleString();

        // スライダー操作後の返済額
        interest = interest0.value;
        if(term == 0){
            result.innerText = (loan*10000).toLocaleString();
        } else if(interest==0){
            result.innerText =(parseInt(loan*10000/(term*12))).toLocaleString();            
        }else{
            repay = loan*10000*interest/12*Math.pow(1+interest/12,term*12)/(Math.pow(1+interest/12,term*12)-1) ;
            repay = parseInt(repay);
            result.innerText = repay.toLocaleString(); // 返済額の表示            
        }
        
    }

    // 返済期間の表示

    input_term.oninput = (e) => {
        term = parseInt(e.target.value); // スライダー操作後の期間（年数）
        output_term.innerText = term.toLocaleString();

        // スライダー操作後の返済額
        interest = interest0.value;

        if(term == 0){
            result.innerText = (loan*10000).toLocaleString();
            
        } else if(interest == 0){
            result.innerText =(parseInt(loan*10000/(term*12))).toLocaleString();
        } else{
            repay = loan*10000*interest/12*Math.pow(1+interest/12,term*12)/(Math.pow(1+interest/12,term*12)-1) ;
            repay = parseInt(repay);
            result.innerText = repay.toLocaleString(); // 返済額の表示            
        }        

        // repay = loan*10000*interest/12*Math.pow(1+interest/12,term*12)/(Math.pow(1+interest/12,term*12)-1) ;
        // repay = parseInt(repay);
        // result.innerText = repay.toLocaleString() // ローン額の表示;
    }
      
    // 利率変更時の再計算

        interest0.addEventListener('change',()=>{
            interest = interest0.value;
            console.log(interest);
            
        // スライダー操作後の返済額
        if(interest==0){
            result.innerText =(parseInt(loan*10000/(term*12))).toLocaleString();
        }else{
            repay = loan*10000*interest/12*Math.pow(1+interest/12,term*12)/(Math.pow(1+interest/12,term*12)-1) ;
            repay = parseInt(repay);
            result.innerText = repay.toLocaleString(); // 返済額の表示            

        }
         
         });
 
}());
