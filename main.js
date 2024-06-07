const form = document.getElementById('formRegister');
const nameInput = document.getElementById('name');
const lastnameInput = document.getElementById('lastname');
const phoneInput = document.getElementById('phone');
const tableBody = document.getElementById('tableBody');
const sendData = document.getElementById('sendData');


let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const lastname = lastnameInput.value;
    const phone = phoneInput.value;

    if (name && lastname && phone) {
        const newData = { name, lastname, phone };
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();

    }
})

function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML = '';

    data.forEach(function (item, index) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const lastnameCell = document.createElement('td');
        const phoneCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        nameCell.textContent = item.name;
        lastnameCell.textContent = item.lastname;
        phoneCell.textContent = item.phone;
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        editButton.classList.add('btn-edit');
        deleteButton.classList.add('btn-delete');

        editButton.addEventListener('click', function () {
            editData(index);
        })

        deleteButton.addEventListener('click', function () {
            deleteData(index);
        })

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(lastnameCell);
        row.appendChild(phoneCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);

    });

}

function editData(index) {
    const item = data[index];
    nameInput.value = item.name;
    lastnameInput.value = item.lastname;
    phoneInput.value = item.phone;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();

}

renderTable();

sendData.addEventListener('click', function () {
    sendMessage();

    Swal.fire({
        icon: "success",
        title: "Enviado con exito!",
        footer: 'Feliz Navidad!'
    });
}
)

function getPhoneRandom() {
    let dataIndex;
    let phoneRandom;
    for (let i = 0; i < data.length; i++) {
        dataIndex = Math.floor(Math.random() * data.length);
        phoneRandom = data[dataIndex].phone;
    }
    return phoneRandom;

}

function getUsers() {
    let users;
    for(let i = 0; i<data.length; i++){
        users =;
    }
   
    return users;
}

function sendMessage() {
    let phone = getPhoneRandom();
    let user = getUsers();
    let message = document.querySelector('.wpp');
    message.innerHTML = `<a href="https://wa.me/${phone}?text=Tu%20amigo%20invisible%20es%20${user}">Enviar</a>`
    console.log(message.innerHTML);
}
