const mainSearchDay = document.querySelectorAll("h4");
const searchInputButton = document.querySelector(".search").children[1];
const allDays = document.querySelector(".days");
searchInputButton.addEventListener("click", search);
let foundElementS = [];
const allElements = document.querySelectorAll(".days a");
function search() {
    foundElementS=[];
    const searchInputPlace = document.querySelector(".search").children[0];
    const inputValue = searchInputPlace.value.trim().toUpperCase();
    let found = false;
    mainSearchDay.forEach(function (head) {
        const value = head.textContent.toUpperCase();
        if ((value.includes(inputValue)) || (head.parentElement.className.trim().toUpperCase().includes(inputValue))){
            allDays.innerHTML="";
            found = true;
            const foundElement = head.parentElement;
            foundElementS.push(foundElement);
            foundElementS.forEach(function(place){
                allDays.appendChild(place);
            });
            if (inputValue==""){
                allDays.innerHTML="";
                allElements.forEach(function(place){
                    allDays.appendChild(place);
                });
            }
        }
        if (!found) {
            allDays.innerHTML="";
            const notFound = document.createElement("h4");
            notFound.style.color = "#fff";
            notFound.innerHTML = "Gün Tapılmadı";
            notFound.className="notfound";
            allDays.appendChild(notFound);
        }
    });
};