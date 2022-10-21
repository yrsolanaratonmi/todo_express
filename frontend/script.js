let taskInput
let taskArr = []
let text

async function fetchData() {
  taskArr = await fetch('http://localhost:8000/allTasks',
      {
        method: 'GET', headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
      }).then(res => res.json())
  render()

}


function getTask() {
  taskInput = document.querySelector("input").value
}

function getEdit(i) {
  text = document.getElementById(`change-${i}`).value
}

async function setEditedTask(i) {
  getEdit(i)
  if (!text) {
    text = taskArr[i].text
  }
  taskArr[i].text = text
  taskArr = await fetch('http://localhost:8000/updateTask', {
    method: 'PATCH',
    body: JSON.stringify({id: taskArr[i]._id, text: text, isCheck: false}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json())
  fetchData()
}

async function addTask() {
  getTask()
  if (!taskInput.length) {
    return
  }
  if (!taskInput.trim()) {
    return
  }
  taskInput = taskInput.trim()
  document.querySelector('input').focus()
  document.querySelector('input').value = ''
  taskArr = await fetch('http://localhost:8000/createTask', {
    method: 'POST',
    body: JSON.stringify({text: taskInput, isCheck: false}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json()).then(res => res.data)

  fetchData()
}

async function deleteElem(i) {
  taskArr = await fetch(`http://localhost:8000/deleteTask?id=${taskArr[i]._id}`, {method: 'DELETE'}).then(res => res.json()).then(res => res.data)
  fetchData()
}

async function setActive(i) {
  taskArr = await fetch('http://localhost:8000/updateTask', {
    method: 'PATCH',
    body: JSON.stringify({id: taskArr[i]._id, text: taskArr[i].text, isCheck: !taskArr[i].isCheck}),
    headers: {"Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*"}
  }).then(res => res.json()).then(res => res.data)
  fetchData()
}

function setEdit(i) {
  render()
  document.getElementById(`task-${i}`).classList.toggle('hidden')
  document.getElementById(`edit-${i}`).classList.toggle('active')
}


function render() {
  let elem = ''
  taskArr = taskArr.sort((a, b) => a.isCheck - b.isCheck)
  taskArr.forEach((el, i) => {
    elem += `<div class="edit hidden" id = 'edit-${i}' >
<input id = 'change-${i}' type="text" value="${taskArr[i].text}" onchange="getEdit(${i})" class="edit_text"/>
<div class="operators">
<input type="checkbox" onclick="setActive(${i})" ${el.isCheck ? 'checked' : ''} style="width: 20px; height: 20px;">

<button onclick="setEditedTask(${i})">Save</button>
<button onclick="render()">Cancel</button>
</div>

</div>
<div id = 'task-${i}' class="task">
<div class="task_text">
<p style="${el.isCheck ? 'text-decoration : line-through; color : #5C6672' : ''}">${i + 1}.${el.text}</p>
</div>
<div class="operators">

<input type="checkbox" onclick="setActive(${i})" ${el.isCheck ? 'checked' : ''} style="width: 20px; height: 20px;">


<button style=" ${el.isCheck ? 'display : none' : ''}" onclick="setEdit(${i})">Edit</button>
<button onclick="deleteElem(${i})">Delete</button></div>
</div>

`
  })
  document.querySelector('#tasks').innerHTML = elem
}