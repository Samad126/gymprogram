const logs = document.querySelector(".logs");
document.addEventListener("DOMContentLoaded", function () {
    const loadData = [];
    let loadExisting = JSON.parse(localStorage.getItem("logs")) || [];
    let loadMain = JSON.parse(localStorage.getItem("savedLogs")) || [];

    loadExisting.forEach(function (existings) {
        loadMain.push(existings);
        localStorage.setItem("savedLogs", JSON.stringify(loadMain));
    });

    loadMain.forEach(function (datas) {
        logs.insertAdjacentHTML("beforeend", datas);
    });

    const expandButtons = document.querySelectorAll(".day > p");
    expandButtons.forEach(function (button) {
        let expanded = false;
        button.addEventListener("click", function () {
            let allsiblings = this.parentElement;
            console.log(allsiblings.childElementCount);
            for (i = 1; i < allsiblings.childElementCount-1; i++) {
                let allsiblings = this.parentElement;
                if (expanded) {
                    allsiblings.children[i].style.display = "none";
                } else {
                    allsiblings.children[i].style.display = "block";
                }
            }
            expanded = !expanded;
        });
    });
    // Check if logs.innerHTML is empty
    if (loadMain.length == 0) {
        logs.innerHTML = "";
        const notFound = document.createElement("h4");
        notFound.style.color = "#fff";
        notFound.innerHTML = "Xəta! Zəhmət olmasa proqramınızı yaddaşa verin!";
        notFound.className = "notfound";
        logs.appendChild(notFound);
    }

    localStorage.removeItem("logs");
    const removelogButtons = document.querySelectorAll(".removeLog");
    removelogButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            let removedElement = button.parentElement;
            removedElement.remove();
            let allData = document.querySelectorAll(".day");
            allData.forEach(function (datas) {
                loadData.push(datas.outerHTML);
            });
            replace();
        });
    });

    function replace() {
        localStorage.removeItem("savedLogs");
        localStorage.setItem("savedLogs", JSON.stringify(loadData));
        alert("Gün silindi!");
        location.reload();
    }
});