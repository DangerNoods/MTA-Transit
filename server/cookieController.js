const { Cookie } = require('express-session');



const cookieController = {};

//cookie setter... needs work
cookieController.setCookie= ((cname, cvalue , exdays = 365) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
});


//checks cookie ids... needs work.
cookieController.checkCookie(() => {
    let username = getCookie("username");
    if (username != "") {
     alert("Welcome again " + username);
    } else {
      username = prompt("Please enter your name:", "");
      if (username != "" && username != null) {
        setCookie("username", username, 365);
      }
    }
  });


// //cookie checks to see if there is a cookie active. 
// cookieController.getCookie = ((req, res, next) => {
    
// });






module.exports = cookieController;