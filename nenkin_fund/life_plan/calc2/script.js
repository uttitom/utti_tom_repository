(function () {
    let a, b;
    let x, y, z;
    let sum = 0;
    let R;

    a = 10000; // 積立月額　初期値　10,000円
    b = 5;     // 積立期間　初期値　　5年

    const result = document.getElementById('result2');
    const input_premium = document.getElementById('input_premium');
    const output_premium = document.getElementById('output_premium');
    const input_term = document.getElementById('input_term');
    const output_term = document.getElementById('output_term');  
    const interest0 = document.getElementById('interest0'); 

    // 積立金の表示

    result.innerText = (a * b * 12).toLocaleString();

    // 積立月額の表示

    input_premium.oninput = (e) => {
        a = parseInt(e.target.value); // スライダー操作後の積立月額 
        output_premium.innerText = a.toLocaleString();

        console.log(interest0.value);

        
        // スライダー操作後の積立金額
        // x = a * b * 12;
        x = calc(interest0.value,a,b);

        result.innerText = x.toLocaleString(); // 積立金の表示
    }

    // 積立期間の表示

    input_term.oninput = (e) => {
        b = parseInt(e.target.value); // スライダー操作後の期間（年数）
        output_term.innerText = b.toLocaleString();

        console.log(interest0.value);

        // スライダー操作後の積立金額
        // y = a * b * 12; 
        y = calc(interest0.value,a,b);

        result.innerText = y.toLocaleString() // 積立金の表示;
    }
    // 利率変更時の再計算

        interest0.addEventListener('change',()=>{
            // a=0;b=0;R=0;
            R = parseInt(interest0.value*1000)/1000;
            a = parseInt(input_premium.value);
            b = parseInt(output_term.value);
            console.log(R,a,b);
            console.log(typeof R,typeof a,typeof b);

            z = calc(R,a,b);

            console.log(z);

            result.innerText = z.toLocaleString() // 積立金の表示;            
        })
   

    
    // 月利率の算定
    function monthR(R) {
        
        if(R==0){
            let r = 0
            return r ;
        }else{
            let r = parseInt((Math.pow(1 + R, 1 / 12) - 1) * 10000000) / 10000000;
            return r;   
        }
        
    }

    // 積立金計算の関数

    function calc(R,p,t){
        sum = 0;
        let r = monthR(R);

        for (let index = 0; index < t*12; index++) {
            sum += p + parseInt(sum*r);            
        } 

        return sum;       
    }
 
}());

