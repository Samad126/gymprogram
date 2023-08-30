const expandButtons = document.querySelectorAll(".main > div > p");
const plusMinusButton = document.querySelectorAll(".sets");
let max = document.querySelectorAll(".max");
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
    });
});

