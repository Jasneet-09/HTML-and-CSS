const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// TO ADD THE ELEMENT IN THE TO DO LIST
function addTask(){
    if(inputBox.value === ""){
        alert("You must write something!!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// EVENT LISTENER TO REMOVE THE TASK WHEN CLICKED ON X
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

// THE FUNCTION SAVEDATA() WILL SAVE THE ELEMENT IN THE BROWSER 
// USE THIS EVERYTIME WE MAKE CHANGES IN THE LIST... SO ADD THIS IN EVERY FUNCTION
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML); // IT WILL SET THE CONTENT OF THE listcontainer i.e. IT WILL SAVE THE CONTENT IN THE BROWSER
    // BY USING THE LOCAL STORAGE IT WILL SAVE THE CONTENT IN THE BROWSER EVEN IF WE REFRESHED IT IT WILL REMAIN SAVE
    // WE WILL SAVE THE DATA WITH THE NAME data
}
//  IT WILL DISPLAY ALL THE CONTENT THAT IS STORED AS NAME data
//  WE CAN ACCESS IT BY USING THE localStorage.getItem("data")
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();// CALL THIS FUNCTION EVERYTIME TO DISPLAY THE UPDATED CONTENT OF THE LIST
