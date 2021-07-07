var speechrecog = window.webkitSpeechRecognition;
var recog = new speechrecog();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recog.start();
}

recog.onresult = function (event) {
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {
        speak();
    }
}

function speak() {
    synth = window.speechSynthesis;
    speakdata = "taking your selfie in 5 seconds ";
    var utterThis = new SpeechSynthesisUtterance(speakdata); //function to convert T to S 
    synth.speak(utterThis);
    Webcam.attach('#camera');
    setTimeout(function () {
        take_snapshot();
        save();
    }, 5000);
}

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("output").innerHTML = '<img id="selfie_image" src="' + data_uri + '"/>';
    });
}

function save() {
    link = document.getElementById("link");
    img = document.getElementById("selfie_image").src;
    link.href = img;
    link.click();
}