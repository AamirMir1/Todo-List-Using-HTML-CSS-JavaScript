// Input the user value in localStorage

showNotes()
let areaBtn = document.getElementById('addBtn')
areaBtn.addEventListener('click', function () {
    let areaTxt = document.getElementById('addTxt')
    let titleTxt = document.getElementById('notesTitle')
    let myNotes = localStorage.getItem('myNotes')
    if (myNotes == null) {
        myObj = []
    }
    else {
        myObj = JSON.parse(myNotes)
    }
    let Objs = {
        title: titleTxt.value,
        areaText: areaTxt.value
    }
    myObj.push(Objs)
    localStorage.setItem('myNotes', JSON.stringify(myObj))
    areaTxt.value = ""
    titleTxt.value = ""
    showNotes()
})
// Function to show notes 

function showNotes() {
    let myNotes = localStorage.getItem('myNotes')
    if (myNotes == null) {
        myObj = []
    } else {
        myObj = JSON.parse(myNotes)
    }
    let notesElem = document.getElementById('notes')
    let html = ""
    
    myObj.forEach(function (element, index) {
        if (element.title == "") {
            element.title = `<h4 style="color: red">Unnamed</h4>`
        }
        html += `
          <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
          <div class="card-body" id="${index}">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.areaText}</p>
                <button id="${index}" href="#" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                <button id="${index}" href="#" onclick="importantNote(this.id)" class="btn btn-light">Important</button>
                </div>
        </div>
        `
    });
    if (myObj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `Nothing to show! please add a note`
    }
}

// Function to delete a note

function deleteNote(index) {
    let myNotes = localStorage.getItem('myNotes')
    if (myNotes == null) {
        myObj = []
    } else {
        myObj = JSON.parse(myNotes)
    }
    myObj.splice(index, 1)
    localStorage.setItem('myNotes', JSON.stringify(myObj))
    showNotes()
}

// Method to search

let search = document.getElementById('searchBar')
search.addEventListener('input', function () {
    let searchVal = search.value
    let notesChilds = document.getElementsByClassName('noteCard')
    Array.from(notesChilds).forEach(function (element) {
        let includePara = element.getElementsByTagName('p')[0].innerHTML
        if (includePara.includes(searchVal)) {
            element.style.display = "block"
            element.style.color = "green"
        } else {
            element.style.display = "none"
        }
    })
})

// Function to mark as important

function importantNote(index) {
    let myNotes = localStorage.getItem('myNotes')
    if (myNotes == null) {
        myObj = []
    }
    else {
        myObj = JSON.parse(myNotes)
    }
    let elem = document.getElementById(`${index}`)
    if (elem.style.backgroundColor != 'gray') {
        elem.style.backgroundColor = 'gray'
    } else {
        elem.style.backgroundColor = 'white'
    }
    localStorage.setItem('myNotes', JSON.stringify(myObj))
}

