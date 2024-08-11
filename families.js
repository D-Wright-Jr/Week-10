class Member {
  constructor(name, relation) {
    this.name = name;
    this.relation = relation;
  }
}
// ID of surnames, array of family members of the surname
class Surname {
  constructor(id, lastname) {
    this.id = id;
    this.lastname = lastname;
    this.members = [];
  }
  // Add member method & delete member method of the class
  addMember(member) {
    this.members.push(member);
  }

  deleteMember(member) {
    let index = this.members.indexOf(member);
    this.members.splice(index, 1);
  }
}

let surnames = [];
let surnameId = 0; // Initialize surnameId to generate IDs automatically

// reusable simplified function
onClick("new-surname", () => {
  const lastname = getValue("new-surname-name");
  surnames.push(new Surname(surnameId++, lastname)); // Increment the ID automatically
  drawDOM();
});

function onClick(id, action) {
  let element = document.getElementById(id);
  element.addEventListener("click", action);
  return element;
}

function getValue(id) {
  return document.getElementById(id).value;
}
// Takes information to create tables to pass surname data.
function drawDOM() {
  let surnameDiv = document.getElementById("surnames");
  clearElement(surnameDiv);
  // clear surname div
  for (let surname of surnames) {
    // create tables
    let table = createSurnameTable(surname);
    let title = document.createElement("h2");
    title.innerHTML = surname.lastname;
    // create delete button to remove surnames
    title.appendChild(createDeleteSurnameButton(surname));
    surnameDiv.appendChild(title);
    surnameDiv.appendChild(table);
    // adds family members to surname
    for (let member of surname.members) {
      createMemberRow(surname, table, member);
    }
  }
}
// create rows of family members on table.
function createMemberRow(surname, table, member) {
  let row = table.insertRow(2);
  row.insertCell(0).innerHTML = member.name;
  row.insertCell(1).innerHTML = member.relation;
  let actions = row.insertCell(2);
  actions.appendChild(createDeleteRowButton(surname, member));
}

function createDeleteRowButton(surname, member) {
  let btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.innerHTML = "Delete";
  btn.onclick = () => {
    // find index of members and delete member
    let index = surname.members.indexOf(member);
    surname.members.splice(index, 1);
    drawDOM();
  };
  return btn;
}

function createDeleteSurnameButton(surname) {
  let btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.innerHTML = "Delete Surname";
  btn.onclick = () => {
    let index = surnames.indexOf(surname);
    surnames.splice(index, 1);
    drawDOM();
  };
  return btn;
}

function createNewMemberButton(surname) {
  let btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.innerHTML = "Create";
  btn.onclick = () => {
    surname.addMember(
      new Member(
        getValue(`name-input-${surname.id}`),
        getValue(`relation-input-${surname.id}`)
      )
    );
    drawDOM();
  };
  return btn;
}

function createSurnameTable(surname) {
  let table = document.createElement("table");
  table.setAttribute("class", "table table-dark table-striped");
  let row = table.insertRow(0);
  let nameColumn = document.createElement("th");
  let relationColumn = document.createElement("th");
  nameColumn.innerHTML = "Name";
  relationColumn.innerHTML = "Relation";
  row.appendChild(nameColumn);
  row.appendChild(relationColumn);
  let formRow = table.insertRow(1);
  let nameTh = document.createElement("th");
  let relationTh = document.createElement("th");
  let createTh = document.createElement("th");
  let nameInput = document.createElement("input");
  nameInput.setAttribute("id", `name-input-${surname.id}`);
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("class", "form-control");
  let relationInput = document.createElement("input");
  relationInput.setAttribute("id", `relation-input-${surname.id}`);
  relationInput.setAttribute("type", "text");
  relationInput.setAttribute("class", "form-control");
  let newMemberButton = createNewMemberButton(surname);
  nameTh.appendChild(nameInput);
  relationTh.appendChild(relationInput);
  createTh.appendChild(newMemberButton);
  formRow.appendChild(nameTh);
  formRow.appendChild(relationTh);
  formRow.appendChild(createTh);
  return table;
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
