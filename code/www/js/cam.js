var pictureSource;   // picture source
var destinationType; // sets the format of returned value

function initializeCamera() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType.FILE_URI;
}

function onPhotoDataSuccess(imageData) {
    //var smallImage = document.getElementById('smallImage');
    //var pic_count = 0;
    //smallImage.innerHTML += '<img style="display:block;width:300px;height:300px;margin:0 auto; border: solid 5px black" src="' + imageData + '" /><br>' +
            //'<input type="radio" style="margin-left:50%;" name="image" value="' + pic_count++ + '"><br><br>';
    //smallImage.innerHTML += '<img style="display:block;width:100px;height:150px;margin:5px 5px; border: solid 5px black" src="' + imageData + '" />';

    var page = myNavigator.getCurrentPage();
    console.log('page: '+ page);
    var patientid = page.options.patientid;
    console.log('patientId'+ patientid);
    //var imageType = document.getElementById('type').value;
    //console.log('imageType '+ imageType);
    var imageType = "Pre";
    console.log('imageType ' + imageType);
    var patient = getPatientById(patientid, function(results){
        var country = results.rows.item(0).Country;
        console.log('country ' + country);
        addImage(imageData, imageType, country, patientid);
    });

    capturePhoto();

    //convertToBase64(imageData, function(base64Img){
        //console.log(base64Img);
        //var newBase64 = base64Img.substring(base64Img.indexOf(',') + 1);
        //console.log(newBase64);
        //uploadOPImage2(newBase64);
    //});
}

function convertToBase64(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType });
}
function onFail(message) {
    alert('Failed because: ' + message);
}
function uploadImage(imageString) {
    var http = new XMLHttpRequest();
    var url = "https://cloud.slaintehealthcare.com:6544/VitroMobileService/UploadOpImage";
    var params = JSON.stringify({
        "country": "Default Organisation",
        "imageString": imageString,
        "imageType": "Pre",
        "mrn": "392"
    });
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json; charset=utf-8");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    };
    http.send(params);
}