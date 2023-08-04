firebaseConfig = {
    apiKey: "AIzaSyBWy_iA9g76BuMF9flZFhsoZ6vSV_fk0Zg",
    authDomain: "cobrat800-ce075.firebaseapp.com",
    projectId: "cobrat800-ce075",
    storageBucket: "cobrat800-ce075.appspot.com",
    messagingSenderId: "833804897235",
    appId: "1:833804897235:web:ba837ff0b9725dbf163d26"
  };

   firebase.initializeApp(firebaseConfig);
  user_name=localStorage.getItem("user_name");
  room_name=localStorage.getItem("room_name")
  //document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";



function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
          firebase_message_id = childKey;
          message_data = childData;
          //Inicia código
          console.log(firebase_message_id);
          console.log(message_data);
          name = message_data['name'];
          message = message_data['message'];
          like = message_data['like'];
          name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
          message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
          like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
          span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
  
          row = name_with_tag + message_with_tag + like_button + span_with_tag;
          document.getElementById("output").innerHTML += row;
          //Termina código
        }
      });
    });
  }
  getData();

function updateLike(message_id){
    console.log("botton like precionado"+message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes= Number(likes)+1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        like:updated_likes    });
        

}
function logout (){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}
