// config object to pass for firebase authentication
var config = {
    apiKey: "AIzaSyDaGc7a6DpEEdNxLWRLxEc4y4cakt89y9Q",
    authDomain: "fb-playground-6ef6f.firebaseapp.com",
    databaseURL: "https://fb-playground-6ef6f.firebaseio.com",
    projectId: "fb-playground-6ef6f",
    storageBucket: "fb-playground-6ef6f.appspot.com",
    messagingSenderId: "125687812033",
    appId: "1:125687812033:web:4bf7ff2c4c48c3e69d2940"
  };

  // test if prgm running
  console.log("i'm here!");

  // initialize firebase
  firebase.initializeApp(config);

  // var to simplify calling firebase
  var database = firebase.database();

  // button to add train and its schedule info
  $("#add-train-button").on("click", function(event) {

    // check if click registered
    console.log("i've been clicked");

    // allows use of enter button
    event.preventDefault();

    // grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();

    // check that values taken in
    console.log("v1 " + trainName);
    console.log("v2 " + destination);
    console.log("v3 " +  frequency);
    console.log("v4 " + firstTrainTime);

    // create local object to hold input data
    var newTrain = {
      name: trainName,
      dest: destination,
      freq: frequency,
      firstTrTime: firstTrainTime
    };

    // upload data to firebase
    database.ref().push(newTrain);

    // check that data was stored using console.log
    console.log("a " + newTrain.name);
    console.log("b " + newTrain.dest);
    console.log("c " +  newTrain.freq);
    console.log("d " + newTrain.firstTrTime);

    // alert user that information was added
    alert("Train and Schedule Successfully Added");

    // clear input text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-time-input").val("");
  });

    // create firebase event for adding train/schedule to database
    // event also creates row to display data on web page via index.html
    database.ref().on("child_added", function(childSnapshot) {
      // view childSnapshot
      console.log("now i'm here!");
      console.log("childSnapshot " + childSnapshot.val());

      // create variables for storage
      var trName = childSnapshot.val().name;
      var trDest = childSnapshot.val().dest;
      var trFreq = childSnapshot.val().freq;
      var trFirstT = childSnapshot.val().firstTrTime;
      
      // create new row for entry
      var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDest),
        $("<td>").text(trFreq),
        $("<td>").text(trFirstT)
        );

        // append the new row to the table
        console.log("ready to apppend");
        $("#train-table > tbody").append(newRow);
      });
