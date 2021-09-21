let myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false
   
}

//Add Book Button
const addBookButton = document.getElementById('add-book');
addBookButton.addEventListener("click", openForm);

function openForm(){
    let formContainer = document.getElementById("form-container");
    formContainer.style.display = formContainer.style.display === 'none' ? '' : 'block';
    
    const closePopUp = document.getElementsByTagName('span')[0];
    closePopUp.addEventListener('click', () => formContainer.style.display = 'none');
}

//Add Button
const addButton = document.getElementById('add');
addButton.addEventListener("click", () => {
    addBookToLibrary();
    let formContainer = document.getElementById("form-container");
    formContainer.style.display = formContainer.style.display === 'block' ? '' : 'none';
});



//Adds books to myLibrary
function addBookToLibrary(){
  
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    myLibrary.push({title, author,  pages,  read});    
    setData()
    render()
    
}

function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function displayBooks(item){

    const library = document.querySelector('#cards-container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    
    
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = item.author;
    authDiv.classList.add('author');
    bookDiv.appendChild(authDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn')    
    bookDiv.appendChild(readBtn);
    if(item.read===false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#e04f63';
    }else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#63da63'
    }

    removeBtn.textContent = 'Remove'; 
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);

    library.appendChild(bookDiv);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData()
        render();
    });
    
    readBtn.addEventListener('click', () => { 
        item.read = !item.read; 
        setData(); 
        render();
    }); 
}


//Creates book visual in browser
function render() {
    const display = document.getElementById('cards-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
   
    for (let i=0; i<myLibrary.length; i++){
        displayBooks(myLibrary[i]);
    }
}

function restore() {
    if(!localStorage.myLibrary) {
        render();
    }else {
        let objects = localStorage.getItem('myLibrary') 
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();