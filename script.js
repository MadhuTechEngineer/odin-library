const myLibrary = []
const container = document.querySelector(".library-container");
const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book");
const closeDialog = document.querySelector("#close-dialog");
const form = document.getElementById("book-form");

function Book(title, author, pages, read) {
    if(!new.target) {
        throw Error("Use must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

addBookToLibrary(new Book("Atomic Habits", "James Clear", 320, false));
addBookToLibrary(new Book("Rich Dad Poor Dad", "Robert Kiyosaki", 336, true));
addBookToLibrary(new Book("Think and Grow Rich", "Napoleon Hill", 238, true));

function displayBooks() {
    if (myLibrary.length === 0) {
        container.innerHTML = "";
        const empty = document.createElement("div");
        const emptyMsg = document.createElement("h2");
        empty.classList.add("empty-library")
        emptyMsg.textContent = "No books added";
        empty.append(emptyMsg);
        container.style.display = "block";
        container.append(empty);
        return;
    }

    container.innerHTML = "";
    container.style.display = "grid";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const title = document.createElement("h2");
        title.classList.add("title");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = book.author;

        const pages = document.createElement("p");
        pages.classList.add("pages")
        pages.textContent = `${book.pages} pages`;

        const readCheck = document.createElement("input");
        readCheck.type = "checkbox";
        readCheck.id = `read-${book.id}`;
        readCheck.checked = book.read;

        const readLabel = document.createElement("label");
        readLabel.textContent = "Read";
        readLabel.htmlFor = `read-${book.id}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete"

        const read = document.createElement("div");
        
        read.append(readCheck, readLabel, deleteBtn);

        deleteBtn.addEventListener("click", () => removeBook(book));
        readCheck.addEventListener("change", () => {
            book.toggleReadStatus();
        });

        bookCard.append(title, author, pages, read);
        container.append(bookCard);
    });
}

function removeBook(book) {
    const index = myLibrary.findIndex(item => item.id === book.id);

    if (index != -1) {
        myLibrary.splice(index, 1);
    }

    displayBooks();
}

displayBooks();

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
    form.reset();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = Number(formData.get("pages"));
    const read = form.elements.read.checked;

    const book = new Book(title, author, pages, read);

    addBookToLibrary(book);
    displayBooks();

    dialog.close();
    form.reset();
});

