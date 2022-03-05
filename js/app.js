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

// ****************** main Elements ******************
const form = document.querySelector('#new-task-form');
const input = document.querySelector('#new-task-input');
const list_el = document.querySelector("#tasks");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = input.value;

    // if the input is empty
    if (!task){
        alert('please fill out the task');
        return;
    }
		
	// Add new task in input value
	const task_el = document.createElement('div');
	task_el.classList.add('task');
		
	// (Check Box) complete functions ==> done || line through
	const task_checkBox_el = document.createElement('div');
	task_checkBox_el.innerHTML = '<i class="fa fa-circle-thin"></i>';
	task_checkBox_el.classList.add('checkbox')

	task_el.appendChild(task_checkBox_el);

	task_checkBox_el.addEventListener('click', (e) => {
		if (task_checkBox_el.innerHTML == '<i class="fa fa-circle-thin"></i>') {
			task_checkBox_el.innerHTML = '<i class="fa fa-check-circle"></i>';
			task_input_el.classList.add('lineThrough');
		} else {
			task_checkBox_el.innerHTML = '<i class="fa fa-circle-thin"></i>';
			task_input_el.classList.remove('lineThrough');
		}
	});

	// content of task
	const task_content_el = document.createElement('div');
	task_content_el.classList.add('content');

	task_el.appendChild(task_content_el);
	
	// input the task
	const task_input_el = document.createElement('input');
	task_input_el.classList.add('text');
	task_input_el.type = 'text';
	task_input_el.value = task;
	task_input_el.setAttribute('readonly', 'readonly');

	task_content_el.appendChild(task_input_el);

	// create actions functions ==> edit || delete || save edit
	const task_actions_el = document.createElement('div');
	task_actions_el.classList.add('actions');
	
	// edit();
	const task_edit_el = document.createElement('button');
	task_edit_el.innerHTML = '<i class="fa fa-pencil"></i>';
	task_edit_el.classList.add('edit');

	task_actions_el.appendChild(task_edit_el);
	task_el.appendChild(task_actions_el);

    // delete();
	const task_delete_el = document.createElement('button');
	task_delete_el.innerHTML = '<i class="fa fa-trash"></i>';
	task_delete_el.classList.add('delete');

    task_actions_el.appendChild(task_delete_el);

	list_el.appendChild(task_el);

	// saveEdit();
    task_edit_el.addEventListener('click', (e) => {
		if (task_edit_el.innerHTML == '<i class="fa fa-pencil"></i>') {
			task_edit_el.innerHTML = '<i class="fa fa-check"></i>';
			task_input_el.removeAttribute("readonly");
			task_input_el.focus();
		} else {
			task_edit_el.innerHTML = '<i class="fa fa-pencil"></i>';
			task_input_el.setAttribute("readonly", "readonly");
		}
	});

	task_delete_el.addEventListener('click', (e) => {
		list_el.removeChild(task_el);
	});

	input.value = '';
});