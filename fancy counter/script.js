const counterEl = document.querySelector('.counter');
const increaseButtonEl = document.querySelector('.counter__button--increase');
const decreaseButtonEl = document.querySelector('.counter__button--decrease');
const resetButtonEl = document.querySelector('.counter__reset-button'); 
const counterValueEl = document.querySelector('.counter__value');
const counterTitleEl = document.querySelector('.counter__title');
resetButtonEl.addEventListener('click',function(){

// reset counter to 0
counterValueEl.textContent = 0;  

// reset Background Color
counterEl.classList.remove('counter--limit');

// reset counter title 

counterTitleEl.textContent = 'Fancy Counter';

// enabled increase and decrease buttons 

increaseButtonEl.disabled = false; 
decreaseButtonEl.disabled = false; 

// unfocous (blur) reset button 

resetButtonEl.blur();

});

decreaseButtonEl.addEventListener('click',function(){
    // get current value of the counter 
    const currentValue = counterValueEl.textContent;
    // convert value to number type 
    const currentValueAsNumber = +currentValue;
    // decreamnt by 1 
    let newValue = currentValue - 1;

    // check if new value is less than 0 

    if(newValue < 0 ){
        newValue = 0 ;
    }

    // update counter value with new value 
    counterValueEl.textContent = newValue; 

    // unfocous (blur) decrease button 

decreaseButtonEl.blur();
 
});

function increamentCounter(){
   //get current value of counter
   const currentValue =   counterValueEl.textContent;
   // convert value to number type 
   const currentValueAsNumber = + currentValue ;
   // increament by 1
   let newValue = currentValueAsNumber + 1 ;

    // check if new value is greater than 5 

    if(newValue>5){
        // if coorect , force it to be 5 instead 
        newValue = 5 ; 

        // give visual indicator that limit has been reached 
        counterEl.classList.add('counter--limit');

        // update counter title to say limit has been reached 

        counterTitleEl.innerHTML = 'Limit! Buy <b>Pro</b> for > 5 ';

        //disable increase and decrease button 

        increaseButtonEl.disabled = true; 
        decreaseButtonEl.disabled = true; 

 
    }

   // set counter element with new value
counterValueEl.textContent =newValue;


    // unfocous (blur) increase button 

    increaseButtonEl.blur();
 
}
 

increaseButtonEl.addEventListener('click',increamentCounter);


document.addEventListener('keydown',increamentCounter);