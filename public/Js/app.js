console.log("client side page loaded !");

// tempalate engine used to render dynamic web page with the help of express
// with the help of headlebars easily load content dynamically



const weatherForm = document.querySelector('form')
const search = document.querySelector('input'); 
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const loc = search.value;
    //console.log(loc);

    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';

    fetch('http://localhost:3000/weather?address='+loc).then((res) => {
        res.json().then((data) => {

            if (data.error) {
                msgOne.textContent = data.error;
            }
            else {
                msgOne.textContent = 'Forcast : ' + data.forecast;
                msgTwo.textContent = 'Location : ' + data.location;
            }
        })
    })
})


