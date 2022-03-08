// ****************** header Elements ******************
// ------------------ clear all the local storage
const clear = document.querySelector('.clear');
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// ------------------ Dark and Light mode theme
const darkMode = document.createElement('div');
darkMode.innerHTML = '<i class="ri-moon-fill"></i>'; // add moon icons in page
darkMode.classList.add('dark-mode-icon')

const header = document.getElementById('header');
header.appendChild(darkMode); // add the moon icon in header

let getDarkMode = localStorage.getItem('darkModePage'); 

const onDarkMode = () => {
	// Add the sun icon instead of the moon icon
	darkMode.innerHTML = '<i class="ri-sun-fill"></i>';
	document.body.classList.add('dark-theme'); 

	// Update darkMode in localStorage
	localStorage.setItem('darkModePage', 'onTheme');
}

const offDarkMode = () => {
	darkMode.innerHTML = '<i class="ri-moon-fill"></i>';
	document.body.classList.remove('dark-theme');

	// Update darkMode in localStorage 
	localStorage.setItem('darkModePage', 'offTheme');
}

if (getDarkMode === 'onTheme') {
	onDarkMode();
}

darkMode.addEventListener('click', () => {
	// get data in from local storage
	getDarkMode = localStorage.getItem('darkModePage'); 
	
	// if the theme off(not on) , using on theme
	if (getDarkMode !== 'onTheme') {
		onDarkMode();
	// else, turn it off  
	} else {  
		offDarkMode(); 
	}
});

// ------------------ Show todays date
const dateElement = document.getElementById('date');
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// ****************** main Elements ******************
const form = document.querySelector('#new-task-form');
const input = document.querySelector('#new-task-input');
const list_el = document.querySelector("#tasks");
let addTaskBtn = document.getElementById('add-new-task');

let taskArray = [];

document.addEventListener('DOMContentLoaded', getLocalStorage);
function getLocalStorage () {
	taskArray = JSON.parse(localStorage.getItem('tasks'));
	taskArray.forEach(element => {
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
		task_input_el.value = element;
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

		task_delete_el.addEventListener('click', deleteFromLocalStorage);
	
		function deleteFromLocalStorage(a){
			const index = taskArray.indexOf(task_input_el.value);
			taskArray.splice(index, 1);
			localStorage.setItem("tasks", JSON.stringify(taskArray));
		}
	});
}

addTaskBtn.addEventListener('submit', (e) => {
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

	task_delete_el.addEventListener('click', deleteFromLocalStorage);

	function setDataToLocalStorage(){
		taskArray.push(task_input_el.value);
		localStorage.setItem("tasks", JSON.stringify(taskArray));
	}
	setDataToLocalStorage();

	function deleteFromLocalStorage(a){
		const index = taskArray.indexOf(task_input_el.value);
		taskArray.splice(index, 1);
		localStorage.setItem("tasks", JSON.stringify(taskArray));
	}
});