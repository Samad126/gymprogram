const expandButtons = document.querySelectorAll(".main > div > div > p");
const plusMinusButton = document.querySelectorAll(".sets");
let max = document.querySelectorAll(".max");
const findWorkout = document.querySelectorAll("section");
const allWorkouts = document.querySelector(".all");
let foundWorkouts = [];

expandButtons.forEach(function (button) {
    let expanded = false;
    button.addEventListener("click", function () {
        if (expanded) {
            button.nextElementSibling.style.display = "none";
        } else {
            button.nextElementSibling.style.display = "block";
        }
        expanded = !expanded;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    expandButtons.forEach(function (button) {
        for (i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) == button.textContent) {
                let value = localStorage.getItem(button.textContent);
                let next = button.nextElementSibling.children[1].children[0].children[0];
                next.textContent = value;
            }
        }
    });
});

plusMinusButton.forEach(function (buttons) {
    buttons.children[1].addEventListener("click", function () {
        // debugger;
        let number = Number(this.previousElementSibling.children[0].textContent);
        if (number == Number(this.previousElementSibling.children[1].textContent)) {
            this.previousElementSibling.children[0].textContent = number;
        }
        else {
            ++number;
            this.previousElementSibling.children[0].textContent = number;
        }
        localStorage.setItem(this.parentElement.parentElement.previousElementSibling.textContent, JSON.stringify(number));
    });
    buttons.children[2].addEventListener("click", function () {
        // console.log(this.previousElementSibling.previousElementSibling.children[0].textContent);
        let number = Number(this.previousElementSibling.previousElementSibling.children[0].textContent);
        if (number == 0) {
            this.previousElementSibling.previousElementSibling.children[0].textContent = number;
        }
        else {
            --number;
            this.previousElementSibling.previousElementSibling.children[0].textContent = number;
        }
        localStorage.setItem(this.parentElement.parentElement.previousElementSibling.textContent, JSON.stringify(number));
    });

});

findWorkout.forEach(function (eachSection) {
    const searchWorkoutInput = eachSection.children[0];
    const searchWorkoutButton = eachSection.children[1];
    searchWorkoutButton.addEventListener("click", workoutSearch);
    function workoutSearch() {
        foundWorkouts = []
        const typedValue = searchWorkoutInput.value.trim().toUpperCase();
        let found = false;
        expandButtons.forEach(function (button) {
            if (button.textContent.trim().toUpperCase().includes(typedValue)) {
                found = true;
                foundWorkouts.push(button.parentElement);
                allWorkouts.innerHTML = "";
                foundWorkouts.forEach(function (place) {
                    allWorkouts.appendChild(place);
                });
                if (typedValue == "") {
                    allWorkouts.innerHTML = "";
                    foundWorkouts.forEach(function (place) {
                        allWorkouts.appendChild(place);
                    });
                }
            };
            if (!found) {
                allWorkouts.innerHTML = "";
                const notFound = document.createElement("h4");
                notFound.style.color = "#fff";
                notFound.innerHTML = "Hərəkət Tapılmadı";
                notFound.className = "notfound";
                allWorkouts.appendChild(notFound);
            }
        });
    };
});