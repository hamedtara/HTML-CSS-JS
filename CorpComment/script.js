const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';


const textareaEl = document.querySelector('.form__textarea');
const counterEl =document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl= document.querySelector('.submit-btn');
const spinnerEL= document.querySelector('.spinner');
const renderFeedbackItem = (feedbackItem) =>{

        // new feedback item HTML

        const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${ feedbackItem.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedbackItem.company}</p>
            <p class="feedback__text">${feedbackItem.text}</p>
        </div>
        <p class="feedback__date">${feedbackItem.daysAgo === 0 ?'NEW': `${feedbackItem.daysago}d`}</p>
    </li>
        `; 
    
        //insert new feedback item in list 
    
         feedbackListEl.insertAdjacentHTML('beforeend',feedbackItemHTML);
    

};

const inputHandler = () =>{
    //determine maximum number of characters
    const maxNumberOfChars = MAX_CHARS;

    //determine number of charcters currently typed

    const numberOfCharsTyped = textareaEl.value.length;

    //caalculate number of chracter left 

    const charsLeft = maxNumberOfChars-numberOfCharsTyped;

    //show number of chars left 

    
    counterEl.textContent=charsLeft;
}

textareaEl.addEventListener('input',inputHandler);

const showVisualIndicator = textCheck =>{
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';


    //show valid indicator
    formEl.classList.add(className);
          
    // remove visual indicator 
    setTimeout(() =>{
        formEl.classList.remove(className);
    },2000);
};

const submitHandler = event => {
    event.preventDefault();

    //get text from textArea
    const text = textareaEl.value;

    //validate text 

    if (text.includes('#') && text.length > 4) {
        showVisualIndicator('valid');
    }else {
        // show invalid indicator
        showVisualIndicator('invalid');
        // focous textarea 
        textareaEl.focus(); 

        //stop this function execution
        return;
    }

    // extract other info from text ;
    const hashtag = (text.split(' ')
    .find(word =>word.includes('#')));

    const company = hashtag.substring(1);
 
    const badgeLetter = company.substring(0,1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0 ;


    // create feedback item object
    const feedbackItem = {
        upvoteCount: upvoteCount,
        company: company,
        badgeLetter:badgeLetter,
        daysAgo: daysAgo,
        text:text

    };

    renderFeedbackItem(fe); 

    // send feedback item to server
    fetch(`${BASE_API_URL}/feedbacks`,{
        method:'POST',
        body: JSON.stringify(feedbackItem),
        headers:{
             Accept:'application/json',
            'ContentType':'applicatoin/json'

        }
    }).then(response => {

        if(!response.ok){
            console.log('Somthing went wrong');
            return;
            
        }else {
            console.log('Successfully submitted');
        }
    }).catch(error => {
        console.log(error =>{
            console.log(error);
        })
    });



     // clear textarea
        textareaEl.value = '';

     //blur submit button 

    submitBtnEl.blur();

    // reset counter  
    counterEl.textContent = MAX_CHARS;
    
};


formEl.addEventListener('submit',submitHandler);


fetch(`${BASE_API_URL}/feedbacks`)
.then(response=>{
    return response.json();
})
.then(data =>{
    //remove spinner   

    spinnerEL.remove();

    //itereate over each element in deedbacks array and render it in list 
 data.feedbacks.forEach(feedbackItem => {
            // new feedback item HTML

        renderFeedbackItem(feedbackItem);
     
 });


})
.catch(error => {
    feedbackListEl.textContent = `Faild to fetch feedback items. Error message: ${error.message} `;


});

