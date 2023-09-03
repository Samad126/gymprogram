document.addEventListener("DOMContentLoaded", function () {
    const allWorkouts = document.querySelector(".all");
    const test = document.querySelector(".test");
    // console.log(test.textContent.slice(0,7));
    allWorkouts.innerHTML = "";
    let back = Array.from(JSON.parse(localStorage.getItem("back")) || []);
    let chest = Array.from(JSON.parse(localStorage.getItem("sine")) || []);
    let shoulder = Array.from(JSON.parse(localStorage.getItem("ciyin")) || []);
    let triceps = Array.from(JSON.parse(localStorage.getItem("triceps")) || []);
    let biceps = Array.from(JSON.parse(localStorage.getItem("biceps")) || []);
    let leg = Array.from(JSON.parse(localStorage.getItem("ayaq")) || []);

    if (test.textContent.slice(0, 6) == "Biceps") {
        biceps.forEach(function (htmlString) {
            allWorkouts.insertAdjacentHTML('beforeend', htmlString); // Insert the HTML string directly
        });
        if (allWorkouts.innerHTML == "") {
            allWorkouts.innerHTML = "";
            const notFound = document.createElement("h4");
            notFound.style.color = "#fff";
            notFound.innerHTML = "Xəta! Zəhmət olmasa proqramınızı yaradın";
            notFound.className = "notfound";
            allWorkouts.appendChild(notFound);
        }
    };

    if (test.textContent.slice(0, 7) == "Triceps") {
        triceps.forEach(function (htmlString) {
            allWorkouts.insertAdjacentHTML('beforeend', htmlString); 
        });
        if (allWorkouts.innerHTML == "") {
            allWorkouts.innerHTML = "";
            const notFound = document.createElement("h4");
            notFound.style.color = "#fff";
            notFound.innerHTML = "Xəta! Zəhmət olmasa proqramınızı yaradın";
            notFound.className = "notfound";
            allWorkouts.appendChild(notFound);
        }
    };

    if (test.textContent.slice(0, 5) == "Kürək") {
        back.forEach(function (htmlString) {
            allWorkouts.insertAdjacentHTML('beforeend', htmlString); 
        });
        if (allWorkouts.innerHTML == "") {
            allWorkouts.innerHTML = "";
            const notFound = document.createElement("h4");
            notFound.style.color = "#fff";
            notFound.innerHTML = "Xəta! Zəhmət olmasa proqramınızı yaradın";
            notFound.className = "notfound";
            allWorkouts.appendChild(notFound);
        }
    };

    if (test.textContent.slice(0, 4) == "Sinə") {
        chest.forEach(function (htmlString) {
            allWorkouts.insertAdjacentHTML('beforeend', htmlString); 
        });
        if (allWorkouts.innerHTML == "") {
            allWorkouts.innerHTML = "";
            const notFound = document.createElement("h4");
            notFound.style.color = "#fff";
            notFound.innerHTML = "Xəta! Zəhmət olmasa proqramınızı yaradın";
            notFound.className = "notfound";
            allWorkouts.appendChild(notFound);
        }
    };

    if (test.textContent.slice(0, 4) == "Ayaq") {
        leg.forEach(function (htmlString) {
            allWorkouts.insertAdjacentHTML('beforeend', htmlString); 
        });
        if (allWorkouts.innerHTML == "") {
            allWorkouts.innerHTML = "";
            const notFound = document.createElement("h4");
            notFound.style.color = "#fff";
            notFound.innerHTML = "Xəta! Zəhmət olmasa proqramınızı yaradın";
            notFound.className = "notfound";
            allWorkouts.appendChild(notFound);
        }
    };

    if (test.textContent.slice(0, 5) == "Çiyin") {
        shoulder.forEach(function (htmlString) {
            allWorkouts.insertAdjacentHTML('beforeend', htmlString); 
        });
        if (allWorkouts.innerHTML == "") {
            allWorkouts.innerHTML = "";
            const notFound = document.createElement("h4");
            notFound.style.color = "#fff";
            notFound.innerHTML = "Xəta! Zəhmət olmasa proqramınızı yaradın";
            notFound.className = "notfound";
            allWorkouts.appendChild(notFound);
        }
    };

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
    });

    const plusMinusButton = document.querySelectorAll(".sets");
    let max = document.querySelectorAll(".max");
    const findWorkout = document.querySelectorAll("section");
    let foundWorkouts = [];

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
});