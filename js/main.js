/** @format */
showTweet();
// Select Elements
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
let msg = document.querySelector(".msg");
// let savetaskbtn = document.getElementById("savetaskbtn");
// let saveindex = document.getElementById("saveindex");

// Add and show tweets on the Document
addtaskbtn.addEventListener("click", function (e) {
  let addtaskinputVal = addtaskinput.value;
  if (addtaskinputVal !== "" && addtaskinputVal.trim() !== 0) {
    let webTask = localStorage.getItem("localTask");
    if (webTask === null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webTask);
    }
    taskObj.push(addtaskinputVal);
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    addtaskinput.value = "";
  } else {
    alert("Please post your first tweet");
  }
  showTweet();
});

// Show Tweets
function showTweet() {
  let webTask = localStorage.getItem("localTask");
  if (webTask === null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webTask);
  }
  let html = "";
  let addedtasklist = document.getElementById("addedtasklist");
  taskObj.forEach((task, index) => {
    html += `
        <tr>
                  <th scope="row">${index + 1}</th>
                  <td>${task}</td>
                  <td class="text-right"><button type="button" onclick="editTweet(${index})"  class="text-success "><i class="fa fa-edit"></i> Edit</button></td>
                  <td class="text-left"><button type="button" onclick="deleteTweet(${index})"  class="text-danger"><i class="fa fa-trash"></i> Del <button></td>
                </tr>
        `;
  });
  addedtasklist.innerHTML = html;
}

// Edit Tweet
function editTweet(index) {
  let addtaskbtn = document.getElementById("addtaskbtn");
  let savetaskbtn = document.getElementById("savetaskbtn");
  let saveindex = document.getElementById("saveindex");
  saveindex.value = index;
  let webTask = localStorage.getItem("localTask");
  let taskObj = JSON.parse(webTask);
  addtaskinput.value = taskObj[index];
  addtaskbtn.style.display = "none";
  savetaskbtn.style.display = "block";
}

// Save Tweet
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function () {
  let webTask = localStorage.getItem("localTask");
  let taskObj = JSON.parse(webTask);
  let saveindex = document.getElementById("saveindex").value;
  taskObj[saveindex] = addtaskinput.value;
  localStorage.setItem("localTask", JSON.stringify(taskObj));
  addtaskbtn.style.display = "block";
  savetaskbtn.style.display = "none";
  addtaskinput.value = "";
  showTweet();
});

// Delete Tweet
function deleteTweet(index) {
  let webTask = localStorage.getItem("localTask");
  let taskObj = JSON.parse(webTask);
  taskObj.splice(index, 1);
  localStorage.setItem("localTask", JSON.stringify(taskObj));
  addtaskbtn.style.display = "block";
  savetaskbtn.style.display = "none";
  addtaskinput.value = "";
  showTweet();
}

// Delete all Tweet
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function () {
  let webTask = localStorage.getItem("localTask");
  let taskObj = JSON.parse(webTask);
  if (webTask === null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webTask);
    taskObj = [];
  }
  localStorage.setItem("localTask", JSON.stringify(taskObj));
  addtaskbtn.style.display = "block";
  savetaskbtn.style.display = "none";
  addtaskinput.value = "";
  showTweet();
});

// Filter/ Search Tweet Tweet
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function () {
  let searchtextboxval = searchtextbox.value.toLowerCase();
  let trList = document.querySelectorAll("tr");
  trList.forEach((item) => {
    itemText = item.getElementsByTagName("td")[0].innerText.toLowerCase();
    if (itemText.indexOf(searchtextboxval) === -1) {
      item.style.display = "none";
    } else {
      item.style.display = "table-row";
    }
  });
});
