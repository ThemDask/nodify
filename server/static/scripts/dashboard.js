// npm i --save-dev @types/jquery

console.log("IN dashboard.js ")

// Retrieve backend data
var xhr = new XMLHttpRequest(); // get HTML dashboard from '
xhr.open('GET', '/tokenise');
xhr.onload = function() {
  if (xhr.status === 200) {
    let data = xhr.responseText;
    let dt = JSON.parse(data)

    loadDashboard(dt)
  }
};
xhr.send();


function loadDashboard(data) {

    let name_field = document.getElementById("name_field");
    
    name_field.innerHTML =  "Name: <i>" + data.name + "</i>";
}