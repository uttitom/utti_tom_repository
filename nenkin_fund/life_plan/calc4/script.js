(function () {

    let pension,term, interest,fund;

    const result = document.getElementById('result2');
    const input_pension = document.getElementById('input_pension');
    const output_pension = document.getElementById('output_pension');
    const input_term = document.getElementById('input_term');
    const output_term = document.getElementById('output_term');  
    const interest0 = document.getElementById('interest0'); 
  

    pension = 10; 　// 定期分割額　初期値　10 万円
    term = 20;    　// 受取期間　初期値　　20 年
    interest = interest0.value ;　// 利率　  　初期値　　  0 ％

    console.log(interest);

    // 返済額の表示
    result.innerText =(parseInt(pension*term*12)).toLocaleString();

    // 変更後の定期分割額の表示
    input_pension.oninput = (e) => {

        // スライダー操作後の定期分割額 
        pension = parseInt(e.target.value); 
        output_pension.innerText = pension.toLocaleString();

        // スライダー操作後の定期分割額
        interest = interest0.value;
        if(interest==0){
            result.innerText =(parseInt(pension*term*12)).toLocaleString();            
        }else{
            let r = monthR(interest);
            fund = pension * (Math.pow(1 + r, term * 12)-1 )/(r*Math.pow(1 + r, term * 12));
            fund = parseInt(fund);
            result.innerText = fund.toLocaleString(); // 定期分割額の表示            
        }
        
    }

    // 返済期間の表示

    input_term.oninput = (e) => {
        term = parseInt(e.target.value); // スライダー操作後の期間（年数）
        output_term.innerText = term.toLocaleString();

        // スライダー操作後の返済額
        interest = interest0.value;

        if(interest == 0){
            result.innerText =(parseInt(pension*term*12)).toLocaleString();
        } else{
            let r = monthR(interest);
            fund = pension * (Math.pow(1 + r, term * 12) - 1) / (r * Math.pow(1 + r, term * 12));
            fund = parseInt(fund);
            result.innerText = fund.toLocaleString(); // 定期分割額の表示                 
        }        
    }
      
    // 利率変更時の再計算

        interest0.addEventListener('change',()=>{
            interest = interest0.value;
            // console.log(interest);
            
            // スライダー操作後の定期分割額
            if(interest == 0){
                result.innerText = (parseInt(pension * term * 12)).toLocaleString();
            }else{
                let r = monthR(interest);
                fund = pension * (Math.pow(1 + r, term * 12) - 1) / (r * Math.pow(1 + r, term * 12));
                fund = parseInt(fund);
                result.innerText = fund.toLocaleString(); // 定期分割額の表示           

            }
         
        });

    // 月利率の算定
    function monthR(R) {

        if (R == 0) {
            let r = 0
            return r;
        } else {
            let r = parseInt((Math.pow(1 + R, 1 / 12) - 1) * 10000000) / 10000000;
            return r;
        }

    }    
 
}());
