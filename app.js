var taskInput = document.getElementById("form-add");
var addForm = document.querySelector(".add-wrap");
var incompleteTaskHolder = document.getElementById("section-choose");
var completedTasksHolder = document.getElementById("section-selected");

//New task list item
var createNewTaskElement = function(taskString) {

    var listItem = document.createElement("li");
    listItem.className = "list-item";

    //input (checkbox)
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "form-checkbox";
    //label
    var label = document.createElement("label");
    label.className = "form";
    label.innerText = taskString;
    //input (text)
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "form-text";
    //button.edit
    var editButton = document.createElement("button");
    editButton.className = "btn-edit";
    editButton.innerText = "Edit";
    //button.delete
    var deleteButton = document.createElement("button");
    deleteButton.className = "btn-remove";
    var deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "cross";
    deleteButtonImg.className = "btn-img";
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

var addTask = function(event) {
    event.preventDefault();
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value.trim()) return;

    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
};

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

//Edit an existing task.

var editTask = function() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".btn-edit");
    var containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .edit-mode
    if (containsClass) {
        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
        editInput.focus();
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle("edit-mode");
};

//Delete task.
var deleteTask=function(){
    var listItem=this.parentNode;
    listItem.remove();
};

//Mark task completed
var taskCompleted = function() {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.btn-edit");
    var deleteButton = taskListItem.querySelector("button.btn-remove");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

addForm.addEventListener("submit", addTask);

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
