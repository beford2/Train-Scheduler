
var config = {
    apiKey: "AIzaSyAZGffveetgC3mSWzQSMxQbL9OTL4w3GRA",
    authDomain: "trainscheduler-7aa5d.firebaseapp.com",
    databaseURL: "https://trainscheduler-7aa5d.firebaseio.com",
    projectId: "trainscheduler-7aa5d",
    storageBucket: "trainscheduler-7aa5d.appspot.com",
    messagingSenderId: "361100086100"
};
firebase.initializeApp(config);

var database = firebase.database();

var initialTrain = "no name has been typed";
var initialDestination = "no destination yet";
var initialTime = "00:00";
var initialFrequency = 0;

var trainName = initialTrain;
var destination = initialDestination;
var time = initialTime;
var frequency = initialFrequency;


database.ref("/trainInfo").on("value", function(snapshot) {

    
    console.log(snapshot.val());
    if(snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("frequency").exists() && snapshot.child("time").exists()) {
        trainName = snapshot.val().trainName;
        destination = snapshot.val().destination;
        frequency = snapshot.val().frequency;
        time = snapshot.val().time;
        
        $("#name").text(snapshot.val().trainName);
        $("#destination").text(snapshot.val().destination);
        $("#frequency").text(snapshot.val().frequency);
        $("#arrival-time").text(snapshot.val().time);

        console.log(snapshot.val().trainName);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().frequency);
        console.log(snapshot.val().time);
    }
    else {

        $("#name").text(trainName);
        $("#destination").text(destination);
        $("#frequency").text(frequency);
        $("#arrival-time").text(time);


    }

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

$(document).on("click", "#submit-btn", function(event) {
    event.preventDefault();

    
    var newTrainName = $("#train-name").val().trim();
    var newDestination = $("#destination").val().trim();
    var newFrequency = parseInt($("#frequency").val().trim());
    var newTime = $("#train-time").val();

    console.log(newTrainName);
    console.log(newDestination);
    console.log(newFrequency);
    console.log(newTime);
    
    database.ref("/trainInfo").set({
        trainName: newTrainName,
        destination: newDestination,
        frequency: newFrequency,
        time: newTime
      });

      $("#name").text(newTrainNam);
      $("#destination").text(newTrainNam);
      $("#frequency").text(newTrainNam);
      $("#arrival-time").text(newTrainNam);


      
});