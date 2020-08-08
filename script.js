//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const dateAndTime = document.getElementById('dateAndTime');


// Load All event listeners
loadEverntListeners();
setInterval(getDateAndTime, 1000);

//load date and time 
function getDateAndTime(){
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDayDate = currentDate.getDate();
    let currentDay = currentDate.getDay();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'Novermber', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday'];

    dateAndTime.textContent = `Date: ${days[currentDay]} ${currentDayDate} ${months[currentMonth]} ${currentYear}`;

}

//Load All event listeners
function loadEverntListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //filter list
    filter.addEventListener('keyup', filterTasks);
    //clear list
    clearBtn.addEventListener('click', clearList);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //Add task event
    form.addEventListener('submit', addTask);
}

//Get tasks function
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //create li element
    const li = document.createElement('li');
    //Add class to li element
    li.className = 'collection-item';
    //create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //Add class to link
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to the li
    li.appendChild(link);
    //Append the li to ul
    taskList.appendChild(li);
    });

}
function addTask(e){
    //prevent from submitting
    e.preventDefault();
    //create li element
    const li = document.createElement('li');
    //Add class to li element
    li.className = 'collection-item';
    //create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //Add class to link
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to the li
    li.appendChild(link);
    //Append the li to ul
    taskList.appendChild(li);
    //Store in localstorage
    storeTaskInLocalStorage(taskInput.value);
    //Clear the input
    taskInput.value = '';
    }
    


//function to store task in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task function
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            //remove frorm LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function  removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
       localStorage.setItem('tasks', JSON.stringify(tasks)); 
    };


//clear list function
function clearList(){
    if(confirm('Are you sure?')){
        //remove everything in the list
        taskList.innerHTML = '';
    }
    //clear list form localStorgae
    clearTasksFromLocalStorage();
}

//function to clear tasks from localStorage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    })
    
}
