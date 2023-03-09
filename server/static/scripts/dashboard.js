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



// var xhr_Json = new XMLHttpRequest();
// xhrJson.open('GET', '/jsonEndpoint'); // get session data from 'tokenise' endpoint
// xhrJson.onload = function() {
//   if (xhrJson.status === 200) {
//     var jsonResponse = JSON.parse(xhrJson.responseText);
//     // Do something with the JSON response, such as display it in a console
//     console.log(jsonResponse);
//   } else {
//     // Handle errors
//   }
// };
// xhrJson.send();

function loadDashboard(data) {

    let name_field = document.getElementById("name_field");
    
    name_field.innerHTML =  "Name: <i>" + data.name + "</i>";
}