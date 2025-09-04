
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");


document.addEventListener("DOMContentLoaded", loadStudents);


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const email = document.getElementById("emailId").value.trim();
    const contact = document.getElementById("contactNo").value.trim();

    
    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert("Name must contain only letters.");
        return;
    }
    if (!/^[0-9]+$/.test(id)) {
        alert("Student ID must be numeric.");
        return;
    }
    if (!/^[0-9]{10,}$/.test(contact)) {
        alert("Contact must be at least 10 digits.");
        return;
    }
    if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
        alert("Enter a valid email address.");
        return;
    }

    const student = { name, id, email, contact };

    
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    
    addStudentToTable(student);

    form.reset();
});


function addStudentToTable(student, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="edit" onclick="editStudent(${index})">Edit</button>
            <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
}


function loadStudents() {
    tableBody.innerHTML = "";
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach((student, index) => addStudentToTable(student, index));
}


function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students[index];

    document.getElementById("studentName").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("emailId").value = student.email;
    document.getElementById("contactNo").value = student.contact;

    
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}


function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleMode");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️ Light Mode";
    } else {
      toggleBtn.textContent = "🌙 Dark Mode";
    }
  });
});