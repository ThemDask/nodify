function call_API() {
  
  let dashboard_data = [];

  // Retrieve backend data for user
  let xhr_tokenise = new XMLHttpRequest();
  xhr_tokenise.open('GET', '/tokenise');
  xhr_tokenise.onload = function() {
    if (xhr_tokenise.status === 200) {

      let data = xhr_tokenise.responseText;
      let data_tokenise = JSON.parse(data);

      dashboard_data[0] = data_tokenise.name;
      dashboard_data[1] = data_tokenise.profile_pic;
      dashboard_data[2] = data_tokenise.followers;

    }
  };
  xhr_tokenise.send();

  // get UI values from item types & time range
  let type = document.getElementById("item_types").value;
  let time_range = document.getElementById("item_time_range").value;


  // Retrieve backend data for user items
  let xhr_user_details = new XMLHttpRequest(); 
  xhr_user_details.open('GET', '/user_details/type/' + type + '/time_range/' + time_range);
  xhr_user_details.onload = function() {
    if (xhr_user_details.status === 200) {

      let data = xhr_user_details.responseText;
      let data_user_details = JSON.parse(data)
      for (let i=0;i<5;i++) {
        dashboard_data[i+3] = data_user_details[i]
      }

      loadDashboard(dashboard_data)
    }
  };
  xhr_user_details.send();
}



// helper function to display data in client side
function loadDashboard(dashboard_data) {

  // show user name
  let name_field = document.getElementById("name_field");
  name_field.innerHTML =  "Name: <i>" + dashboard_data[0] + "</i>";

  // display profile picture
  let profilepic_field = document.getElementById("profilepic");
  profilepic_field.innerHTML = dashboard_data[1];

  //display followers
  let followers_field = document.getElementById("followers");
  followers_field.innerHTML = "Followers: " + dashboard_data[2];
  // show top tracks/artists
  let list = document.getElementById("items_list");
  for (var i = 0; i < 5; i++) {
    list.children[i].innerHTML = dashboard_data[i+3];

}
}


// TODO
function getStatistics() {
  console.log("inside")
  let xhr_statistics = new XMLHttpRequest();
  xhr_statistics.open('GET', '/statistics');
//     xhr_statistics.onload = function() {

//     if (xhr_statistics.status === 200) {

//         let data = xhr_statistics.responseText;
//         let data_tokenise = JSON.parse(data);

//         dashboard_data[0] = data_tokenise.name;
//     }
// };

xhr_statistics.send();
}


function generate_profile() {

  let xhr_user_data = new XMLHttpRequest();
  xhr_user_data.open('GET', '/user_data');
  xhr_user_data.onload = function() {
    if (xhr_user_data.status === 200) {

      let data = xhr_user_data.responseText;
      let data_parsed = JSON.parse(data);
      
      let bg = document.getElementById("gradient");

      let content_btn = document.getElementById("content_btn");
      let content_div = document.getElementById("content");
      let content_text = document.getElementById("content_txt");
      let content_img = document.getElementById("content_image");
      let conent_header = document.getElementById("content_header");

      if (data_parsed != null) {
        switch (data_parsed) {
          case "dancer":
            bg.innerHTML = "./assets/dancer.jpg";
            break;

          case "default": // test case

            content_div.removeAttribute("hidden");

            content_text.innerHTML =   '<br>' +
            '<ul style="list-style-type: none; padding-left: 1.5em;">' +
            
            '<li style="list-style-type: none; position: relative;"><h5>&#x27B1; Your music taste is diverse and eclectic, embracing a wide range of genres and styles.</h5></li>' +
            '<br>' +
            '<li style="list-style-type: none; position: relative;"><h5>&#x27B1;  You appreciate the beauty of different musical expressions and find joy in discovering new sounds.</h5></li>' +
            '<br>' +
            '<li style="list-style-type: none; position: relative;"><h5>&#x27B1;  Your openness to various genres makes your musical journey exciting and unpredictable.</h5></li>' +
            '<br>' +
            '<li style="list-style-type: none; position: relative;"><h5>&#x27B1;  You\'re a versatile listener, exploring music from various genres and eras.</h5></li>' +
            '<br>' + 
            '<li style="list-style-type: none; position: relative;"><h5>&#x27B1;  Your music taste is ever-evolving, and you appreciate the unique qualities that each style brings.</h5></li>' +
            '<br>' +
          '</ul>';
            
            content_img.src = "./assets/default.jpg";
            conent_header.innerHTML = ' You\'re a <span style="color: #1DB954;">Versatile Listener</span>';

            // remove gradient and button
            bg.classList.add("bg-dark");
            bg.classList.remove("bg-gradient");
            content_btn.style.visibility = "hidden"

            break;

          case "alive":
            bg.innerHTML = "./assets/alive.jpg";
            break;

          case "loud":
            bg.innerHTML = "./assets/loud.jpg";
            break;

          case "jock": 
            bg.innerHTML = "./assets/jock.jpg";
            break;

          case "singer":
            bg.innerHTML = "./assets/singer.jpg";
            break;

          case "raver":
            bg.innerHTML = "./assets/raver.jpg";
            break;
        }

      }
      
    }
  };
  xhr_user_data.send();
}