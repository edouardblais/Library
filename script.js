let myLibrary = [];

function inputNewBook() {
    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    const pagesInput = document.querySelector('#pages').value;
    const statusInput = document.querySelector('input[name="status"]');

    if (titleInput !== '' && authorInput !== '' && pagesInput > 0) {
        if (statusInput.checked) {
            addBookToLibrary(titleInput, authorInput, pagesInput, true);
        } else {
            addBookToLibrary(titleInput, authorInput, pagesInput, false); 
        }
        document.getElementById('form').reset();
    }
}

function addBookToLibrary(title, author, pages, readornot) {
    const book = new Book(title, author, pages, readornot);
    myLibrary.push(book);
    showBooksInLibrary();
}

function Book(title, author, pages, readornot) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readornot = readornot
    this.info = function() {
        return (title + " by " + author + ", " + pages + "pages, " + readornot)
    }
}

function showBooksInLibrary() {
    const booklist = document.querySelector('.book-list')
    booklist.textContent = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const bookrow = document.createElement('tr');
        booklist.appendChild(bookrow);
        // title
        const bookTitle = document.createElement('td');
        bookTitle.textContent = myLibrary[i].title;
        bookrow.appendChild(bookTitle);
        // author
        const bookAuthor = document.createElement('td');
        bookAuthor.textContent = myLibrary[i].author;
        bookrow.appendChild(bookAuthor);
        // pages
        const bookPages = document.createElement('td');
        bookPages.textContent = myLibrary[i].pages;
        bookrow.appendChild(bookPages);
        // status: read or not read
        const bookStatus = document.createElement('td');
        const statusSymbol = document.createElement('i');
        if (myLibrary[i].readornot === true) {
            statusSymbol.classList.add('fa', 'fa-check')
        } else {
            statusSymbol.classList.add('fa', 'fa-times')
        };
        bookStatus.appendChild(statusSymbol);
        bookrow.appendChild(bookStatus);
        // Remove book
        const removeBook = document.createElement('td');
        const removeSymbol = document.createElement('i');
        removeSymbol.classList.add('fa', 'fa-trash');
        removeSymbol.setAttribute('id', 'removeBook');
        removeBook.appendChild(removeSymbol);
        bookrow.appendChild(removeBook);
    };
}

function listenToClick() {
    document.addEventListener(('click'), (event) => {
        const tr = event.target.parentNode.parentNode.rowIndex;
        // Input a new book button
        if (event.target.id === 'addbook') {
            inputNewBook();
        // Remove a chosen book
        } else if (event.target.id === 'removeBook') {
            myLibrary.splice(tr, 1);
        // Toggle a chosen book status
        } else if (event.target.classList.contains('fa-check')) {
            event.target.classList.remove('fa-check');
            event.target.classList.add('fa-times');
            myLibrary[tr].readornot = false;
        } else if (event.target.classList.contains('fa-times')) {
            event.target.classList.remove('fa-times');
            event.target.classList.add('fa-check');
            myLibrary[tr].readornot = true;
        }
        showBooksInLibrary();
    })
}

showBooksInLibrary();
listenToClick();



