const date_picker_ele = document.querySelector(".date-picker-wrapper");
const selected_date_ele = document.querySelector(" .selected-date");
const dates_ele = document.querySelector(".dates-container");
const month_ele = document.querySelector(".month .month-item");
const next_month_ele = document.querySelector(".month .next-month");
const prev_month_ele = document.querySelector(".month .prev-month");
const days_ele = document.querySelector(".days-container");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

month_ele.textContent = months[month] + " " + year;

selected_date_ele.textContent = formatDate(date);
selected_date_ele.dataset.value = selectedDate;

populateDates();

date_picker_ele.addEventListener("click", toggleDatePicker);
next_month_ele.addEventListener("click", goToNextMonth);
prev_month_ele.addEventListener("click", goToPrevMonth);

function toggleDatePicker(e) {
  if (!checkClassExist(e.composedPath(), "dates-container")) {
    dates_ele.classList.toggle("active");
  }
}

function checkClassExist(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }

  return false;
}

function goToNextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  month_ele.textContent = months[month] + " " + year;
  populateDates();
}

function goToPrevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  month_ele.textContent = months[month] + " " + year;
  populateDates();
}

function populateDates() {
  days_ele.innerHTML = "";
  let total_days;

  if (month == 1) {
    total_days = 28;
  } else if (month % 2 === 0) {
    total_days = 31;
  } else {
    total_days = 30;
  }

  for (let i = 0; i < total_days; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");
    day_element.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      day_element.classList.add("selected");
    }

    day_element.addEventListener("click", function () {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;

      selected_date_ele.textContent = formatDate(selectedDate);
      selected_date_ele.dataset.value = selectedDate;

      populateDates();
    });

    days_ele.appendChild(day_element);
  }
}

function formatDate(selectedDate) {
  let day = selectedDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = selectedDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let year = selectedDate.getFullYear();

  return day + " / " + month + " / " + year;
}
