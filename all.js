document.addEventListener("DOMContentLoaded", function () {
    const allWorkouts = document.querySelector(".all");

    const expandButtons = document.querySelectorAll(".all > div > p");
    expandButtons.forEach(function (button) {
        let expanded = false;
        button.addEventListener("click", function () {
            const details = button.nextElementSibling;
            if (expanded) {
                details.style.display = "none";
            } else {
                details.style.display = "block";
            }
            expanded = !expanded;
        });
    });

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
                value.forEach(function (place) {
                    placeValue.insertAdjacentHTML("beforeend", place);
                })
            }
        }
    });

    expandButtons.forEach(function (button) {
        let setCheck = button.nextElementSibling.children[1].children[0].children[0];
        let weightCheck = button.nextElementSibling.children[3].lastElementChild;

        if ((setCheck.textContent == "0") && (weightCheck.children.length == 1)) {
            button.parentElement.remove();
        }
    });

    const plusMinusButton = document.querySelectorAll(".sets");
    const findWorkout = document.querySelectorAll("section");
    let foundWorkouts = [];

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
            foundWorkouts = [];
            const typedValue = searchWorkoutInput.value.trim().toUpperCase();
            let found = false;
            if ((typedValue == "") || (allWorkouts.childElementCount == 0)) {
                console.log("test");
            }
            else {
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
            }
        };
    });

    const addWeight = document.querySelectorAll(".addWeight");

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

    // const expandButtons = document.querySelectorAll(".all > div > p");
    const saveWorkoutLog = document.querySelector(".saveButton");

    saveWorkoutLog.addEventListener("click", function () {
        const getData = JSON.parse(localStorage.getItem("logs")) || [];
        let dayInfo = {
            dayName: [],
            dayWeight: [],
            daySet: [],
            dayRep: []
        };

        expandButtons.forEach(function (values) {
            let setCheck = values.nextElementSibling.children[1].children[0].children[0];
            let weightCheck = values.nextElementSibling.children[3].lastElementChild;

            // Check if the conditions are met for this element
            if (!(setCheck.textContent == "0") || !(weightCheck.children.length == 1)) {
                dayInfo.dayName.push(values.textContent);

                const reps = values.nextElementSibling.children[2];
                dayInfo.dayRep.push(reps.textContent);

                const weights = values.nextElementSibling.children[3].lastElementChild.querySelectorAll(".dataa");
                let textWeight = "";
                weights.forEach(function (weight) {
                    textWeight += weight.textContent;
                });
                dayInfo.dayWeight.push(textWeight);
            }
        });

        const doneSets = document.querySelectorAll(".doneSets");
        doneSets.forEach(function (set) {
            dayInfo.daySet.push(set.textContent);
        });

        let mainDiv = document.createElement("div");
        mainDiv.className = "day";
        let dayName = document.createElement("p");
        dayName.textContent = new Date().toLocaleDateString("de-DE");
        mainDiv.append(dayName);
        for (i = 0; i < dayInfo.dayName.length; i++) {
            let allExercises = document.createElement("div");
            let specificExercise = document.createElement("div");
            specificExercise.className = "specific";
            let exerciseName = document.createElement("p");
            exerciseName.textContent = dayInfo.dayName[i];
            let exerciseInformation = document.createElement("div");
            let exerciseSets = document.createElement("p");
            exerciseSets.textContent = "Set: " + dayInfo.daySet[i];
            let exerciseReps = document.createElement("p");
            exerciseReps.textContent = dayInfo.dayRep[i];
            let exerciseWeights = document.createElement("p");
            exerciseWeights.textContent = "Çəki: " + dayInfo.dayWeight[i];
            let removeLogButton = document.createElement("button");
            removeLogButton.textContent = "Günü sil";
            removeLogButton.className = "removeLog";
            exerciseInformation.append(exerciseSets, exerciseReps, exerciseWeights);
            specificExercise.append(exerciseName, exerciseInformation);
            allExercises.append(specificExercise);
            mainDiv.append(allExercises);
            if (i == dayInfo.dayName.length - 1) {
                mainDiv.append(removeLogButton);
                getData.push(mainDiv.outerHTML);
                localStorage.setItem("logs", JSON.stringify(getData));
            }
        };
        alert("Məşq bitti və gün yaddaşa verildi");
        location.reload();
    });

});