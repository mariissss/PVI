let currentPage = 1; 
const studentsPerPage = 5; 

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("studentModal").style.display = "none";
    document.getElementById("deleteModal").style.display = "none";
    document.getElementById("deleteSelectedModal").style.display = "none";
    renderStudents();
    renderPagination();

    document.getElementById("prevPage").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            renderStudents();
            renderPagination();
        }
    });

    document.getElementById("nextPage").addEventListener("click", function() {
        const totalPages = Math.ceil(students.length / studentsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderStudents();
            renderPagination();
        }
    });

    document.getElementById("select-all").addEventListener("change", function () {
        document.querySelectorAll('#students-list input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
});

function renderStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentsList = document.getElementById("students-list");
    studentsList.innerHTML = "";  
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const studentsToShow = students.slice(startIndex, endIndex); 
    
    studentsToShow.forEach((student, index) => {
        const row = createStudentRow(student, startIndex + index);
        studentsList.appendChild(row);
    });

    updateSelectAllCheckbox();
}

function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById("select-all");
    selectAllCheckbox.checked = false; 

    selectAllCheckbox.addEventListener("change", function () {
        document.querySelectorAll('#students-list input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

function renderPagination() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const totalPages = Math.ceil(students.length / studentsPerPage);
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = ''; 

    const prevButton = document.createElement("button");
    prevButton.textContent = "← Prev";
    prevButton.classList.add("pagination-btn");
    prevButton.disabled = currentPage === 1; 
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderStudents();
            renderPagination();
        }
    });
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("pagination-btn");
        if (i === currentPage) {
            pageButton.disabled = true;
        }
        pageButton.addEventListener("click", function () {
            currentPage = i;
            renderStudents();
            renderPagination();
        });
        paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next →";
    nextButton.classList.add("pagination-btn");
    nextButton.disabled = currentPage === totalPages; 
    nextButton.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            renderStudents();
            renderPagination();
        }
    });
    paginationContainer.appendChild(nextButton);
}

function createPageButton(text, pageNumber) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("pagination-btn");
    if (pageNumber === currentPage) {
        button.disabled = true;
    }
    button.addEventListener("click", function () {
        currentPage = pageNumber;
        renderStudents();
        renderPagination();
    });
    return button;
}

function createStudentRow(student, index) {
    const row = document.createElement("tr");
    row.innerHTML = `    
        <td><label for="checkbox-${index}">Select</label><input type="checkbox" id="checkbox-${index}"></td>
        <td>${student.group}</td>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.gender}</td>
        <td>${student.birthDate}</td>
        <td><span class="status ${student.status}"></span></td>
        <td>
            <button class="edit-btn" onclick="openStudentModal(true, ${index})">
                <img src="/images/edit.png" alt="Edit" width="20">
            </button>
            <button class="delete-btn" onclick="openDeleteModal(${index})">
                <img src="/images/delete.png" alt="Delete" width="20">
            </button>
        </td>
    `;
    return row;
}


function openStudentModal(isEdit, studentIndex = -1) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    console.log('openStudent...')
    const modal = document.getElementById("studentModal");
    const modalTitle = document.getElementById("modalTitle");

    if (isEdit) {
        editingIndex = studentIndex;
        const student = students[studentIndex];
        modalTitle.textContent = "Edit Student";
        document.getElementById("group").value = student.group;
        document.getElementById("firstName").value = student.firstName;
        document.getElementById("lastName").value = student.lastName;
        document.getElementById("gender").value = student.gender;
        document.getElementById("birthDate").value = student.birthDate;
        saveStudentButton.textContent = "Save";
    } else {
        editingIndex = -1;
        modalTitle.textContent = "Add Student";
        document.getElementById("studentForm").reset();
        saveStudentButton.textContent = "Create";
    }

    modal.style.display = "block";
}

function closeStudentModal() {
    console.log("closeStudentModal...")
    document.getElementById("studentModal").style.display = "none";
}

const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    saveStudent();
});

function saveStudent() { 

    let students = JSON.parse(localStorage.getItem('students')) || [];

    const group = document.getElementById("group").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const gender = document.getElementById("gender").value;
    const birthDate = document.getElementById("birthDate").value;

    if (editingIndex !== -1) {
        students[editingIndex] = { group, firstName, lastName, gender, status: "active", birthDate };
    } else {
        if (!group || !firstName || !lastName || !gender || !birthDate) return;
        students.push({ group, firstName, lastName, gender, status: "active", birthDate });
    }

    localStorage.setItem('students', JSON.stringify(students));

    renderStudents(); 
    renderPagination();
    closeStudentModal();
}

function openDeleteModal(index) {
    const modal = document.getElementById("deleteModal");
    modal.dataset.index = index; 
    modal.style.display = "block";
}

function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
}

function deleteStudent() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    console.log("delete...")
    const modal = document.getElementById("deleteModal");
    const studentIndex = modal.dataset.index;
    students.splice(studentIndex, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
    renderPagination();
    closeDeleteModal();
}

function openDeleteSelectedModal() {
    const selectedCheckboxes = document.querySelectorAll('#students-list input[type="checkbox"]:checked');
    const modal = document.getElementById("deleteSelectedModal");

    if (selectedCheckboxes.length === 0) {
        modal.innerHTML = `
        <div class="modal-content">
                    <span class="close" onclick="closeDeleteSelectedModal()">&times;</span>
            <h2>Error</h2>
            <p>Select at least one student to delete</p>
            <button type="submit" id="cancelSelectedDeleteButton" onclick="closeDeleteSelectedModal()">OK</button>
            </div>
        `;
    } else {
        modal.innerHTML = `
        <div class="modal-content">
                    <span class="close" onclick="closeDeleteSelectedModal()">&times;</span>
                    <h2>Delete Students</h2>
                    <p>Are you sure you want to delete selected students?</p>
                    <button type="button" id="cancelSelectedDeleteButton" onclick="closeDeleteSelectedModal()">Cancel</button>
                    <button type="submit" id="deleteSelectedStudentButton" onclick="deleteSelectedStudents()">Delete</button>
        </div>
        `;
    }

    modal.style.display = "block";
}

function closeDeleteSelectedModal() {
    document.getElementById("deleteSelectedModal").style.display = "none";
}

function deleteSelectedStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const selectedCheckboxes = document.querySelectorAll('#students-list input[type="checkbox"]:checked');
    const selectedIndexes = Array.from(selectedCheckboxes).map((checkbox) => Array.from(checkbox.closest('tr').children).indexOf(checkbox.closest('td')));

    selectedIndexes.reverse().forEach((index) => {
        students.splice(index, 1);
    });
    localStorage.setItem('students', JSON.stringify(students));

    closeDeleteSelectedModal();

    renderStudents();
    renderPagination();
}

function toggleMenu() {
    let menu = document.querySelector(".side-menu");
    let burger = document.querySelector(".burger-menu");

    menu.classList.toggle("open");
    burger.classList.toggle("open");
}

