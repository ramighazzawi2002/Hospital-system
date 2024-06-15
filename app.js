const patientForm = document.querySelector("#patientForm");
const fullName = document.querySelector("#fullName");
const password = document.querySelector("#password");
const dob = document.querySelector("#dob");
const gender = document.querySelector("#gender");
const phone = document.querySelector("#phone");
const diseases = document.querySelector("#diseases");
const cardContainer = document.querySelector("#cardContainer");
const validationIcon = document.getElementsByClassName("validation-icon");
const email = document.querySelector("#email");

function Person(fullName, password, dob, gender, phone, diseases) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.phone = phone;
  this.diseases = diseases;
}

fullName.addEventListener("keyup", () => {
  if (!/^[a-zA-Z0-9._]+$/.test(fullName.value)) {
    fullName.style.border = "3px solid red";
    validationIcon[0].classList.remove("success");
    validationIcon[0].setAttribute("name", "alert-circle-outline");
  } else {
    fullName.style.border = "1px solid #ccc";
    validationIcon[0].classList.add("success");
    validationIcon[0].setAttribute("name", "checkmark-circle-outline");
  }
});

password.addEventListener("keyup", () => {
  const passwordValue = password.value;
  // More than 8 characters.
  if (passwordValue.length > 8) {
    validationIcon[1].classList.add("success");
    validationIcon[1].setAttribute("name", "checkmark-circle-outline");
  } else {
    validationIcon[1].classList.remove("success");
    validationIcon[1].setAttribute("name", "alert-circle-outline");
  }
  // With at least 1 number
  if (/\d/.test(passwordValue)) {
    validationIcon[2].classList.add("success");
    validationIcon[2].setAttribute("name", "checkmark-circle-outline");
  } else {
    validationIcon[2].classList.remove("success");
    validationIcon[2].setAttribute("name", "alert-circle-outline");
  }

  // With at least 1 uppercase
  if (/[A-Z]/.test(passwordValue)) {
    validationIcon[3].classList.add("success");
    validationIcon[3].setAttribute("name", "checkmark-circle-outline");
  } else {
    validationIcon[3].classList.remove("success");
    validationIcon[3].setAttribute("name", "alert-circle-outline");
  }

  // With at least 1 special character
  if (/[!@#$%^&*]/.test(passwordValue)) {
    validationIcon[4].classList.add("success");
    validationIcon[4].setAttribute("name", "checkmark-circle-outline");
  } else {
    validationIcon[4].classList.remove("success");
    validationIcon[4].setAttribute("name", "alert-circle-outline");
  }
  // More than 8 characters. and With at least 1 number and With at least 1 uppercase and With at least 1 special character
  if (
    passwordValue.length > 8 &&
    /\d/.test(passwordValue) &&
    /[A-Z]/.test(passwordValue) &&
    /[!@#$%^&*]/.test(passwordValue)
  ) {
    password.style.border = "1px solid #ccc";
  } else {
    password.style.border = "3px solid red";
  }
});

phone.addEventListener("keyup", () => {
  // 10 digits
  if (phone.value.length === 10) {
    validationIcon[6].classList.add("success");
    validationIcon[6].setAttribute("name", "checkmark-circle-outline");
  } else {
    validationIcon[6].classList.remove("success");
    validationIcon[6].setAttribute("name", "alert-circle-outline");
  }
  // starts with 07
  if (/^07/.test(phone.value)) {
    validationIcon[7].classList.add("success");
    validationIcon[7].setAttribute("name", "checkmark-circle-outline");
  } else {
    validationIcon[7].classList.remove("success");
    validationIcon[7].setAttribute("name", "alert-circle-outline");
  }
  // 10 digits and starts with 07
  if (phone.value.length === 10 && /^07/.test(phone.value)) {
    phone.style.border = "1px solid #ccc";
  } else {
    phone.style.border = "3px solid red";
  }
});

dob.addEventListener("keyup", () => {
  // Format is YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dob.value)) {
    dob.style.border = "1px solid #ccc";
    validationIcon[5].classList.add("success");
    validationIcon[5].setAttribute("name", "checkmark-circle-outline");
  } else {
    dob.style.border = "3px solid red";
    validationIcon[5].classList.remove("success");
    validationIcon[5].setAttribute("name", "alert-circle-outline");
  }
});

email.addEventListener("keyup", () => {
  if (/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email.value)) {
    email.style.border = "1px solid #ccc";
    validationIcon[8].classList.add("success");
    validationIcon[8].setAttribute("name", "checkmark-circle-outline");
  } else {
    email.style.border = "3px solid red";
    validationIcon[8].classList.remove("success");
    validationIcon[8].setAttribute("name", "alert-circle-outline");
  }
});

patientForm.addEventListener("submit", e => {
  e.preventDefault();

  const isFullNameValid = /^[a-zA-Z0-9._]+$/.test(fullName.value);
  const passwordValue = password.value;
  const isPasswordValid =
    passwordValue.length > 8 &&
    /\d/.test(passwordValue) &&
    /[A-Z]/.test(passwordValue) &&
    /[!@#$%^&*]/.test(passwordValue);
  const isPhoneValid = phone.value.length === 10 && /^07/.test(phone.value);
  const isEmailValid = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(
    email.value
  );
  const isDobValid = /^\d{4}-\d{2}-\d{2}$/.test(dob.value);

  if (
    !isFullNameValid ||
    !isPasswordValid ||
    !isPhoneValid ||
    !isEmailValid ||
    !isDobValid
  ) {
    // Apply red border to all invalid fields
    if (!isFullNameValid) fullName.style.border = "3px solid red";
    if (!isPasswordValid) password.style.border = "3px solid red";
    if (!isPhoneValid) phone.style.border = "3px solid red";
    if (!isEmailValid) email.style.border = "3px solid red";

    return;
  }

  let patientsList = JSON.parse(localStorage.getItem("patients")) || [];

  // Check if the patient already exists
  const patientExists = patientsList.some(
    patient => patient.fullName === fullName.value
  );
  if (patientExists) {
    alert("Patient already exists.");
    return;
  }

  const newPatient = new Person(
    fullName.value,
    password.value,
    dob.value,
    gender.value,
    phone.value,
    diseases.value
  );

  patientsList.push(newPatient);
  localStorage.setItem("patients", JSON.stringify(patientsList));

  const card = document.createElement("div");
  card.classList.add("card");
  cardContainer.appendChild(card);
  card.innerHTML = `
    <img src="./profile-circle-icon-2048x2048-cqe5466q.png" />
    <h2>${newPatient.fullName}</h2>
    <p>Date of Birth: ${newPatient.dob}</p>
    <p>Gender : ${newPatient.gender}</p>
    <p>Phone: ${newPatient.phone}</p>
    <p>Password : ${newPatient.password}</p>
    <p>Chronic Diseases: ${newPatient.diseases}</p>
  `;
});
