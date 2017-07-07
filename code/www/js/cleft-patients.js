function populateAllPatients(){
    getPatients('SELECT FirstName,LastName,DateOfBirth,Diagnosis,Gender,Id FROM patient', populatePatients);
}

function populatePatients(response) {


    console.log("Inside Callback: " + response.rows.item(1).Diagnosis);
    //listPatients.show();
    var content = document.getElementById('information');
    content.innerHTML += '<ons-list>';
    for (var i = 0; i < response.rows.length; i++) {
        console.log(response.rows.item(i).Diagnosis);
        var patientClicked = response.rows.item(i);
        var patient_name = patientClicked.FirstName + " " + patientClicked.LastName;
        var diagnosis = "Primary Diagnosis: " + patientClicked.Diagnosis;
        var gender = "Gender: " + patientClicked.Gender;
        var dob = "Date of Birth: " + patientClicked.DateOfBirth.substring(0, 10);
        var id = patientClicked.Id;
        content.innerHTML += '<ons-list-item modifier="tappable" class="list-item-container"' +
            ' onclick="myNavigator.pushPage(\'patient-profile.html\', ' +
            '{ animation : \'slide\', ' +
            'patientid: '+id+' });">' +
            '<ons-row>' +
            '<ons-col width="95px">' +
            '<img src="img/cleftlip.jpg" class="thumbnail">' +
            '</ons-col>' +
            '<ons-col>' +
            '</div> ' +
            '<div class="name" >' +
            patient_name +
            '</div>' +
            '<div class="desc">' +
            gender + '<br>' + dob + '<br>' + diagnosis +
            '</div>' +
            '</ons-col>' +
            '<ons-col width="40px"></ons-col>' +
            '</ons-row>' +
            '</ons-list-item>';

    }
    content.innerHTML += '</ons-list>';

    ons.compile(content);
    listPatients.hide();
}