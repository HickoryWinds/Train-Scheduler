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

    // create local object to hold input data
    var newTrain = {
      name: trainName,
      dest: destination,
      freq: frequency,
      firstTrTime: firstTrainTime
      // futureTrTime: makePos(unixRefTime, frequency)
    };

    // upload data to firebase
    database.ref().push(newTrain);

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

      // create variables for printing
      var trName = childSnapshot.val().name;
      var trDest = childSnapshot.val().dest;
      var trFreq = childSnapshot.val().freq;
      var trFirstT = childSnapshot.val().firstTrTime;

      // compare firstTrTime to current date/time
      // first split firstTrTime into minutes and hours
      var sepTime = trFirstT.split(":");
      console.log("sepTime " + sepTime);
      // create seconds to add to unixDate
      var addSeconds = sepTime[0]*3600 + sepTime[1]*60;
      console.log("addSeconds " + addSeconds);
      // get current date at midnight
      var unixDate = moment().set('hours', 0).set('minutes', 0).set('seconds', 0).unix();
      // combine current date and train start time
      var unixRefTime = unixDate + addSeconds;
      console.log("unixRefTime " + unixRefTime);
      // compare first train time to current time
      // if start time in past add frequency until next time
      // is in future
      var trFutureT = makePos(unixRefTime, trFreq);
      var minAway = Math.ceil((trFutureT - moment().unix()) / 60);
      // convert trFutureT into hours and minutes
      var nextTime = moment(trFutureT*1000).format("ddd h:mm a");

// time manipulation code ends here

      // create new row for entry
      var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDest),
        $("<td>").text(trFreq),
        // $("<td>").text(trFirstT),
        // $("<td>").text(trFutureT),
        $("<td>").text(nextTime),
        // $("<td>").text(trFutureT)
        $("<td>").text(minAway)
        );

        // append the new row to the table
        console.log("ready to apppend");
        $("#train-table > tbody").append(newRow);
      
        //finds next arrival time after current date/time
        function makePos(uRef, freq) {
          console.log("uRefIn " + uRef);
          var currentUnixTime = moment().seconds(0).unix();
          console.log("currentUnixTime " + currentUnixTime);
          while (uRef - currentUnixTime <= 0) { 
              uRef = uRef + freq * 60; //moment(time).add(1, "d").unix();
          }
          console.log("uRefOut " + uRef);
          return uRef;
        }

      });
