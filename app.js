const patientForm = document.querySelector("#patientForm");
const fullName = document.querySelector("#fullName");
const password = document.querySelector("#password");
const dob = document.querySelector("#dob");
const gender = document.querySelector("#gender");
const phone = document.querySelector("#phone");
const diseases = document.querySelector("#diseases");
const cardContainer = document.querySelector("#cardContainer");
let patientsValues;

function Person(fullName, password, dob, gender, phone, diseases) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.phone = phone;
  this.diseases = diseases;
}

patientForm.addEventListener("submit", e => {
  e.preventDefault();
  patientsValues = [
    fullName.value,
    password.value,
    dob.value,
    gender.value,
    phone.value,
    diseases.value,
  ];
  localStorage.setItem("patient", JSON.stringify(patientsValues));

  const patientValueRetriveFromLocalSotrage = JSON.parse(
    localStorage.getItem("patient")
  );
  console.log(patientValueRetriveFromLocalSotrage);
  const patient = new Person(
    patientValueRetriveFromLocalSotrage[0],
    patientValueRetriveFromLocalSotrage[1],
    patientValueRetriveFromLocalSotrage[2],
    patientValueRetriveFromLocalSotrage[3],
    patientValueRetriveFromLocalSotrage[4],
    patientValueRetriveFromLocalSotrage[5]
  );
  const card = document.createElement("div");
  card.classList.add("card");
  cardContainer.appendChild(card);
  card.innerHTML = `
    <img src="./profile-circle-icon-2048x2048-cqe5466q.png" />
    <h2>${patient.fullName}</h2>
    <p>Date of Birth: ${patient.dob}</p>
    <p>Gender : ${patient.gender}</p>
    <p>Phone: ${patient.phone}</p>
    <p>Password : ${patient.password}</p>
    <p>Chronic Diseases: ${patient.diseases}</p>
  `;
});
