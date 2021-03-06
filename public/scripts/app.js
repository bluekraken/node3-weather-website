const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    if (!location) {
        messageOne.textContent = 'Please supply a location!';
        messageTwo.textContent = '';
    } else {
        messageOne.textContent = 'Loading forecast...';
        messageTwo.textContent = '';

        const url=`/weather?address=${location}`;

        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                    messageTwo.textContent = '';
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            });
        });
    }
});