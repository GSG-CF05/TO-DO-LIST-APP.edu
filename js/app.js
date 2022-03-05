// ****************** header Elements ******************
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');


// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Dark and Light mode theme
const darkMode = document.createElement('div');
darkMode.innerHTML = '<i class="ri-moon-fill"></i>';
darkMode.classList.add('darkMode');

const header = document.getElementById('header');
header.appendChild(darkMode);

darkMode.addEventListener('click', (e) => {
	if (darkMode.innerHTML == '<i class="ri-moon-fill"></i>') {
		darkMode.innerHTML = '<i class="ri-sun-fill"></i>';
		document.body.classList.add('dark-theme');
	} else {
		darkMode.innerHTML = '<i class="ri-moon-fill"></i>';
		document.body.classList.remove('dark-theme');
	}
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


