const checkBoxButton1 = document.querySelectorAll(".kurak > div > input");
const checkBoxButton2 = document.querySelectorAll(".sina > div > input");
const checkBoxButton3 = document.querySelectorAll(".tricaps > div > input");
const checkBoxButton4 = document.querySelectorAll(".bicaps > div > input");
const checkBoxButton5 = document.querySelectorAll(".ciyun > div > input");
const checkBoxButton6 = document.querySelectorAll(".ayoq > div > input");
const test = document.querySelector(".test");
const adddButton = document.querySelector(".addButton");

console.log(checkBoxButton2);
let addedArray1 = [];
let addedArray2 = [];
let addedArray3 = [];
let addedArray4 = [];
let addedArray5 = [];
let addedArray6 = [];
checkBoxButton1.forEach(function (boxes) {
    boxes.addEventListener("click", function () {
        const divContent = this.previousElementSibling.outerHTML;
        if (boxes.checked == true) {
            addedArray1.push(divContent);
        }
        else {
            addedArray1 = addedArray1.filter(value => value !== divContent);
        }
    });
});

checkBoxButton2.forEach(function (boxes) {
    boxes.addEventListener("click", function () {
        const divContent = this.previousElementSibling.outerHTML;
        if (boxes.checked == true) {
            addedArray2.push(divContent);
        }
        else {
            addedArray2 = addedArray2.filter(value => value !== divContent);
        }
    });
});

checkBoxButton3.forEach(function (boxes) {
    boxes.addEventListener("click", function () {
        const divContent = this.previousElementSibling.outerHTML;
        if (boxes.checked == true) {
            addedArray3.push(divContent);
        }
        else {
            addedArray3 = addedArray3.filter(value => value !== divContent);
        }
    });
});

checkBoxButton4.forEach(function (boxes) {
    boxes.addEventListener("click", function () {
        const divContent = this.previousElementSibling.outerHTML;
        if (boxes.checked == true) {
            addedArray4.push(divContent);
        }
        else {
            addedArray4 = addedArray4.filter(value => value !== divContent);
        }
    });
});

checkBoxButton5.forEach(function (boxes) {
    boxes.addEventListener("click", function () {
        const divContent = this.previousElementSibling.outerHTML;
        if (boxes.checked == true) {
            addedArray5.push(divContent);
        }
        else {
            addedArray5 = addedArray5.filter(value => value !== divContent);
        }
    });
});

checkBoxButton6.forEach(function (boxes) {
    boxes.addEventListener("click", function () {
        const divContent = this.previousElementSibling.outerHTML;
        if (boxes.checked == true) {
            addedArray6.push(divContent);
        }
        else {
            addedArray6 = addedArray6.filter(value => value !== divContent);
        }
    });
});

adddButton.addEventListener("click", function () {
    localStorage.setItem("back", JSON.stringify(Array.from(addedArray1)));
    localStorage.setItem("sine", JSON.stringify(Array.from(addedArray2)));
    localStorage.setItem("triceps", JSON.stringify(Array.from(addedArray3)));
    localStorage.setItem("biceps", JSON.stringify(Array.from(addedArray4)));
    localStorage.setItem("ciyin", JSON.stringify(Array.from(addedArray5)));
    localStorage.setItem("ayaq", JSON.stringify(Array.from(addedArray6)));
    alert("Proqram uğurlu şəkildə yarandı!!");
});

