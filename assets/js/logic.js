
var config = {
    apiKey: "AIzaSyAZGffveetgC3mSWzQSMxQbL9OTL4w3GRA",
    authDomain: "trainscheduler-7aa5d.firebaseapp.com",
    databaseURL: "https://trainscheduler-7aa5d.firebaseio.com",
    projectId: "trainscheduler-7aa5d",
    storageBucket: "trainscheduler-7aa5d.appspot.com",
    messagingSenderId: "361100086100"
};
firebase.initializeApp(config);

var trainData = firebase.database();

var initialTrain = "no name has been typed";
var initialDestination = "no destination yet";
var initialTime = "00:00";
var initialFrequency = "";

var trainName = initialTrain;
var destination = initialDestination;
var time = initialTime;
var frequency = initialFrequency;

$("#submit-btn").on("click", function() {
    
    var newTrainName = $("#train-name").val().trim();
    var newDestination = $("#destination").val().trim();
    var newTime = $("#train-time").val().trim();
    var newFrequency = $("#frequency").val().trim();


    var newTrain = {
        name: newTrainName,
        destination: newDestination,
        time: newTime,
        frequency: newFrequency
    }
    
    trainData.ref("/trainData").push(newTrain);

    $("#train-name").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#train-time").val("");

    return false;
    
});


trainData.ref("/trainData").on("child_added", function(snapshot) {

    console.log(snapshot.val());

    var tName = snapshot.val().name;
    var tDestination = snapshot.val().destination;
    var tFrequency = snapshot.val().frequency;
    var tTime = snapshot.val().time;

    var timeArray = tTime.split(":");
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var nextMoment = moment.max(moment(), trainTime);
    var tMin;
    var tArrive;

    if(nextMoment === trainTime) {
        tMin = trainTime.diff(moment(), "minutes");
        tArrive = trainTime.format("hh:mm A");
    }
    else{
        var diffTime = moment().diff(trainTime, "mintues");
        var tRemainder = diffTime % tFrequency;
        tMin = tFrequency - tRemainder;

        tArrive = moment().add(tMin, "m").format("hh:mm A");
    }

    
    $("#train-info-table").append("<tr class='tain-info' style='border-top: 1px solid rgb(168, 168, 168)'><td>" + tName + "</td><td>" + tDestination + "</td><td>" +  tFrequency + "</td><td>" + tArrive + "</td><td>" + tMin + "</td></tr>");

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});