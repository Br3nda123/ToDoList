// Input
let $toDoInput;
let $popupInput;

// Buttons
let $addBtn;
let $editedToDo;
let $addPopupBtn;
let $closePopupBtn;

// Other
let $alertInfo;
let $ulList;
let $newTask;
let $allTasks;
let $idNumber = 0;
let $popup;
let $popupInfo;

const main = () => {
	prepereDOMElements();
	prepereDOMEvents();
};

const prepereDOMElements = () => {
	$toDoInput = document.querySelector(".todo-input");
	$addBtn = document.querySelector(".add-btn");
	$alertInfo = document.querySelector(".alert-info");
	$ulList = document.querySelector(".todo-list ul");
	$allTasks = document.getElementsByTagName("li");
	$popup = document.querySelector(".popup");
	$popupInfo = document.querySelector(".popup-info");
	$popupInput = document.querySelector(".popup-input");
	$addPopupBtn = document.querySelector(".accept");
	$closePopupBtn = document.querySelector(".cancel");
};

const prepereDOMEvents = () => {
	$addBtn.addEventListener("click", addNewTask);
	$toDoInput.addEventListener("keyup", enterCheck);
	$popupInput.addEventListener("keyup", enterCheckPopup);
	$ulList.addEventListener("click", checkClick);
	checkTasks();
	$addPopupBtn.addEventListener("click", changeToDo);
	$closePopupBtn.addEventListener("click", closePopup);
};

const addNewTask = () => {
	if ($toDoInput.value) {
		$newTask = document.createElement("li");
		$newTask.setAttribute("id", `todo-${$idNumber}`);
		$newTask.innerHTML = `${$toDoInput.value}<div class="tools"><button class="complete"><i class="fas fa-check"></i></button><button class="edit">EDIT</button><button class="delete"><i class="fas fa-times"></i></button></div>`;
		$ulList.appendChild($newTask);

		$idNumber++;
		$toDoInput.value = "";
		$alertInfo.innerText = "";
	} else {
		$alertInfo.innerText = "Wpisz treść zadania";
	}
};

const checkClick = (e) => {
	if (
		e.target.classList.value !== "" &&
		e.target.classList.value !== "completed"
	) {
		if (e.target.closest("button").classList.contains("complete")) {
			e.target.closest("li").classList.toggle("completed");
			e.target.closest("button").classList.toggle("completed");
		} else if (e.target.closest("button").classList.contains("edit")) {
			editTask(e);
		} else if (e.target.closest("button").classList.contains("delete")) {
			deleteTask(e);
		}
		checkTasks();
	}
};

const checkTasks = () => {
	$toDoInput.value = "";
	if ($allTasks.length === 0) {
		$alertInfo.innerText = "Brak zadań na liście";
		$idNumber = 0;
	} else {
		$alertInfo.innerText = "";
	}
};

const editTask = (e) => {
	const oldToDo = e.target.closest("li").id;
	$editedToDo = document.getElementById(oldToDo);
	$popupInput.value = $editedToDo.firstChild.textContent;

	$popup.style.display = "flex";
};

const deleteTask = (e) => {
	const deleteToDo = e.target.closest("li");
	deleteToDo.remove();
};

const changeToDo = () => {
	if ($popupInput.value) {
		$editedToDo.firstChild.textContent = $popupInput.value;
		$popup.style.display = "none";
		$popupInfo.textContent = "";
	} else {
		$popupInfo.textContent = "Musisz podać jakąś treść!";
	}
};

const closePopup = () => {
	$popup.style.display = "none";
	$popupInfo.textContent = "";
};

const enterCheck = (e) => {
	if (e.keyCode === 13) {
		addNewTask();
	}
};

const enterCheckPopup = (e) => {
	if (e.keyCode === 13) {
		changeToDo();
	}
};

document.addEventListener("DOMContentLoaded", main);