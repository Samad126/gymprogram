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
        for (i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) == button.textContent + "weight") {
                let value = JSON.parse(localStorage.getItem(button.textContent + "weight")) || [];
                let placeValue = button.nextElementSibling.children[3].lastElementChild;
                console.log(placeValue);
                value.forEach(function (place) {
                    placeValue.insertAdjacentHTML("beforeend", place);
                })
            }
        }
    });
    const addWeight = document.querySelectorAll(".addWeight");
    console.log(addWeight);
    addWeight.forEach(function (weightDiv) {
        let addNumberInput = weightDiv.children[1];
        let addNumberButton = weightDiv.children[2];
        let addNumberPlace = weightDiv.children[5];
        let removeLatestWeight = weightDiv.children[3];
        let removeAllWeight = weightDiv.children[4];
        addNumberButton.addEventListener("click", function () {
            if (addNumberInput.value == "") {
                alert("Zəhmət olmasa çəki yazın");
            }
            else {
                let value = addNumberInput.value;
                let repCount = document.createElement("p");
                repCount.style.color = "rgb(51, 255, 0)";
                repCount.className = "dataa";
                if (addNumberPlace.children.length === 1) {
                    repCount.textContent = value + "kq";
                }
                else {
                    repCount.textContent = "-" + value + "kq";
                }
                addNumberPlace.append(repCount);
                let saveP = addNumberPlace.querySelectorAll(".dataa");
                let saveArrayWeight = [];
                saveP.forEach(function (log) {
                    saveArrayWeight.push(log.outerHTML);
                });
                localStorage.setItem(weightDiv.parentElement.previousElementSibling.textContent + "weight", JSON.stringify(saveArrayWeight));
            }
            addNumberInput.value = "";
        });
        removeLatestWeight.addEventListener("click", function () {
            let value = addNumberPlace.lastElementChild;
            value.remove();
            if (addNumberPlace.children.length === 0) {
                addNumberPlace.innerHTML = "";
                addNumberPlace.append(firstChild);
            }
            let saveP = addNumberPlace.querySelectorAll(".dataa");
            let saveArrayWeight = [];
            saveP.forEach(function (log) {
                saveArrayWeight.push(log.outerHTML);
            });
            localStorage.setItem(weightDiv.parentElement.previousElementSibling.textContent + "weight", JSON.stringify(saveArrayWeight));
        });
        removeAllWeight.addEventListener("click", function () {
            let firstChild = addNumberPlace.children[0];
            addNumberPlace.innerHTML = "";
            addNumberPlace.append(firstChild);
            localStorage.removeItem(weightDiv.parentElement.previousElementSibling.textContent + "weight");
        });
    });
});

plusMinusButton.forEach(function (buttons) {
    buttons.children[1].addEventListener("click", function () {
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


// let dayArray = [];
// expandButtons.forEach(function(name){
//     dayArray.push(name.textContent);
//     localStorage.setItem("daysave", JSON.stringify(dayArray));
// });