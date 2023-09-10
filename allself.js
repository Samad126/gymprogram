document.addEventListener("DOMContentLoaded", function () {
    const allWorkouts = document.querySelector(".all");
    const test = document.querySelector(".test");
    const saveWorkoutLog = document.querySelector(".saveButton");
    const deleteWorkout = document.querySelector(".removeProggramme");
    let back = Array.from(JSON.parse(localStorage.getItem("back")) || []);
    let chest = Array.from(JSON.parse(localStorage.getItem("sine")) || []);
    let shoulder = Array.from(JSON.parse(localStorage.getItem("ciyin")) || []);
    let triceps = Array.from(JSON.parse(localStorage.getItem("triceps")) || []);
    let biceps = Array.from(JSON.parse(localStorage.getItem("biceps")) || []);
    let leg = Array.from(JSON.parse(localStorage.getItem("ayaq")) || []);

    let defaultStyles = document.querySelectorAll(".all > div");
    defaultStyles.forEach(function (defaults) {
        defaults.style.display = "none";
    });


    for (let i = 0; i < allWorkouts.childElementCount; i++) {
        let workoutNameElement = allWorkouts.children[i].children[0];
        let workoutName = workoutNameElement.textContent.trim();

        // Check if the workout name is in the 'ciyin' local storage array
        if (shoulder.includes(workoutName)) {
            workoutNameElement.parentElement.style.display = "block";
        }
        if (chest.includes(workoutName)) {
            workoutNameElement.parentElement.style.display = "block";
        }
        if (back.includes(workoutName)) {
            workoutNameElement.parentElement.style.display = "block";
        }
        if (triceps.includes(workoutName)) {
            workoutNameElement.parentElement.style.display = "block";
        }
        if (biceps.includes(workoutName)) {
            workoutNameElement.parentElement.style.display = "block";
        }
        if (leg.includes(workoutName)) {
            workoutNameElement.parentElement.style.display = "block";
        }
    }
    let foundAnyWorkout = false; // Flag to check if any workout is found

    defaultStyles.forEach(function (defaults) {
        let attribute = defaults.getAttribute("style");
        if (attribute.includes("display: block")) {
            foundAnyWorkout = true; // Set the flag to true if any workout is found
        }
        if (!(attribute.includes("display: block"))) {
            defaults.remove();
        }
    });

    // Check the flag and add the "Xəta! Zəhmət olmasa proqram əlavə edin!" message if no workout is found
    if (!foundAnyWorkout) {
        allWorkouts.innerHTML = "";
        const notFound = document.createElement("h4");
        notFound.style.color = "#fff";
        notFound.innerHTML = "Xəta! Zəhmət olmasa proqram əlavə edin!";
        notFound.className = "notfound";
        allWorkouts.appendChild(notFound);
    }

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
            if (localStorage.key(i) == button.textContent + "selfweight") {
                let value = JSON.parse(localStorage.getItem(button.textContent + "selfweight")) || [];
                let placeValue = button.nextElementSibling.children[4].lastElementChild;
                value.forEach(function (place) {
                    placeValue.insertAdjacentHTML("beforeend", place);
                })
            }
        }
        for (i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) == button.textContent + "selfrep") {
                let value = JSON.parse(localStorage.getItem(button.textContent + "selfrep")) || [];
                let placeValue = button.nextElementSibling.children[3].lastElementChild;
                value.forEach(function (place) {
                    placeValue.insertAdjacentHTML("beforeend", place);
                })
            }
        }
        for (i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) == button.textContent + "selfset") {
                let value = localStorage.getItem(button.textContent + "selfset") || "";
                let placeValue = button.nextElementSibling.children[1].firstElementChild.lastElementChild;
                placeValue.textContent = value;
            }
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

    const addRep = document.querySelectorAll(".addRep");
    const addWeight = document.querySelectorAll(".addWeight");
    const addSet = document.querySelectorAll(".addMaxSet");

    addRep.forEach(function (repDiv) {
        let addNumberInput = repDiv.children[1];
        let addNumberButton = repDiv.children[2];
        let addNumberPlace = repDiv.children[5];
        let removeLatestWeight = repDiv.children[3];
        let removeAllWeight = repDiv.children[4];
        addNumberButton.addEventListener("click", function () {
            if (addNumberInput.value == "") {
                alert("Zəhmət olmasa rep yazın");
            }
            else {
                let value = addNumberInput.value;
                let repCount = document.createElement("p");
                repCount.style.color = "rgb(51, 255, 0)";
                repCount.className = "dataa";
                if (addNumberPlace.children.length === 1) {
                    repCount.textContent = value;
                }
                else {
                    repCount.textContent = "-" + value;
                }
                addNumberPlace.append(repCount);
                let saveP = addNumberPlace.querySelectorAll(".dataa");
                let saveArrayRep = [];
                saveP.forEach(function (log) {
                    saveArrayRep.push(log.outerHTML);
                });
                localStorage.setItem(repDiv.parentElement.previousElementSibling.textContent + "selfrep", JSON.stringify(saveArrayRep));
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
            let saveArrayRep = [];
            saveP.forEach(function (log) {
                saveArrayRep.push(log.outerHTML);
            });
            localStorage.setItem(repDiv.parentElement.previousElementSibling.textContent + "selfrep", JSON.stringify(saveArrayRep));
        });
        removeAllWeight.addEventListener("click", function () {
            let firstChild = addNumberPlace.children[0];
            addNumberPlace.innerHTML = "";
            addNumberPlace.append(firstChild);
            localStorage.removeItem(repDiv.parentElement.previousElementSibling.textContent + "selfrep");
        });
    });

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
                localStorage.setItem(weightDiv.parentElement.previousElementSibling.textContent + "selfweight", JSON.stringify(saveArrayWeight));
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
            localStorage.setItem(weightDiv.parentElement.previousElementSibling.textContent + "selfweight", JSON.stringify(saveArrayWeight));
        });
        removeAllWeight.addEventListener("click", function () {
            let firstChild = addNumberPlace.children[0];
            addNumberPlace.innerHTML = "";
            addNumberPlace.append(firstChild);
            localStorage.removeItem(weightDiv.parentElement.previousElementSibling.textContent + "selfweight");
        });
    });

    addSet.forEach(function (set) {
        let input = set.children[1];
        let button = set.children[2];
        let maxSet = set.previousElementSibling.children[0].children[1];
        button.addEventListener("click", function () {
            let value = input.value;
            if (value == "") {
                alert("Zəhmət olmasa set sayı yazın");
            }
            else {
                maxSet.textContent = value;
                input.value = "";
                localStorage.setItem(maxSet.parentElement.parentElement.parentElement.previousElementSibling.textContent + "selfset", maxSet.textContent);
            }
        });
    });



    saveWorkoutLog.addEventListener("click", function () {
        localStorage.removeItem("sets");
        localStorage.removeItem("reps");
        localStorage.removeItem("names");
        localStorage.removeItem("weights");
        const getData = JSON.parse(localStorage.getItem("logs")) || [];
        let dayInfo = {
            dayName: [],
            dayWeight: [],
            daySet: [],
            dayRep: []
        };
        expandButtons.forEach(function (values) {
            let textRep = "";
            let textWeight = "";
            dayInfo.dayName.push(values.textContent);
            localStorage.setItem("names", JSON.stringify(dayInfo.dayName));
            const reps = values.nextElementSibling.children[3].lastElementChild.querySelectorAll(".dataa");
            reps.forEach(function (rep) {
                textRep += rep.textContent;
            });
            dayInfo.dayRep.push(textRep);
            localStorage.setItem("reps", JSON.stringify(dayInfo.dayRep));
            const weights = values.nextElementSibling.children[4].lastElementChild.querySelectorAll(".dataa");
            weights.forEach(function (weight) {
                textWeight += weight.textContent;
            });
            dayInfo.dayWeight.push(textWeight);
            localStorage.setItem("weights", JSON.stringify(dayInfo.dayWeight));
        });
        const doneSets = document.querySelectorAll(".doneSets");
        doneSets.forEach(function (set) {
            dayInfo.daySet.push(set.textContent);
            localStorage.setItem("sets", JSON.stringify(dayInfo.daySet));
        });
        const nameArray = JSON.parse(localStorage.getItem("names")) || [];
        const setArray = JSON.parse(localStorage.getItem("sets")) || [];
        const repArray = JSON.parse(localStorage.getItem("reps")) || [];
        const weightArray = JSON.parse(localStorage.getItem("weights")) || [];
        let mainDiv = document.createElement("div");
        mainDiv.className = "day";
        let dayName = document.createElement("p");
        dayName.textContent = new Date().toLocaleDateString("de-DE");
        mainDiv.append(dayName);
        for (i = 0; i < nameArray.length; i++) {
            let allExercises = document.createElement("div");
            let specificExercise = document.createElement("div");
            specificExercise.className = "specific";
            let exerciseName = document.createElement("p");
            exerciseName.textContent = nameArray[i];
            let exerciseInformation = document.createElement("div");
            let exerciseSets = document.createElement("p");
            exerciseSets.textContent = "Set: " + setArray[i];
            let exerciseReps = document.createElement("p");
            exerciseReps.textContent = "Rep: " + repArray[i];
            let exerciseWeights = document.createElement("p");
            exerciseWeights.textContent = "Çəki: " + weightArray[i];
            let removeLogButton = document.createElement("button");
            removeLogButton.textContent = "Günü sil";
            removeLogButton.className = "removeLog";
            exerciseInformation.append(exerciseSets, exerciseReps, exerciseWeights);
            specificExercise.append(exerciseName, exerciseInformation);
            allExercises.append(specificExercise);
            mainDiv.append(allExercises);
            if (i == nameArray.length - 1) {
                mainDiv.append(removeLogButton);
                getData.push(mainDiv.outerHTML);
                localStorage.setItem("logs", JSON.stringify(getData));
            }
        };
        let resetlog = JSON.parse(localStorage.getItem("logs")) || [];
        let reset = JSON.parse(localStorage.getItem("savedLogs")) || [];
        localStorage.clear();
        localStorage.setItem("savedLogs", JSON.stringify(reset));
        localStorage.setItem("logs", JSON.stringify(resetlog));
        alert("Məşq yaddaşa verildi və bitti!");
        location.reload();
    });

    deleteWorkout.addEventListener("click", function () {
        let reset = JSON.parse(localStorage.getItem("savedLogs")) || [];
        localStorage.clear();
        localStorage.setItem("savedLogs", JSON.stringify(reset));
        location.reload();
        alert("Bütün proqram silindi");
    });
});

