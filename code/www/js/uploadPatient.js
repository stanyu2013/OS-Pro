function UploadPatient(patient, id){
    $.ajax({
        type: 'GET',
        url: 'https://' + serverAddress + ':6544/VitroMobileService/RegisterPatient',
        data: {
            LastName: patient.lastName,
            MiddleName: patient.middleName,
            FirstName: patient.firstName,
            SecondLastName: patient.secondLastName,
            DateOfBirth: patient.dateOfBirth,
            Gender: patient.sex,
            Sex: patient.sex,
            Diagnosis: patient.diagnosis,
            Country: patient.country,
            GuardianFirstName: patient.guardianFirstName,
            GuardianMiddleName: patient.guardianMiddleName,
            GuardianLastName: patient.guardianLastName,
            GuardianMobile: patient.guardianMobile,
            GuardianAddressLine1: patient.guardianAddressLine1,
            GuardianAddressLine2: patient.guardianAddressLine2,
            GuardianAddressLine3: patient.guardianAddressLine3,
            GuardianCounty: patient.guardianCounty,
            GuardianPostalCode: patient.guardianPostalCode,
            GuardianText: patient.guardianText
        },
        success: function (data) {
            console.log(data);
           // alert("Patient Registered!");
            console.log("Patient Registered")
            deletePatientByID(id);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log("Error in Registering Patient!");
            return false;
        }
    });

}

function uploadImages(result){

    for(i = 0; i < results.rows.length; i++){
        console.log(results.rows.item(i).ImageFileNames);
        var count = 0;
        var all_pics = document.getElementById('all_pics');
        all_pics.innerHTML += '<img style="display:block;width:300px;height:300px;margin:0 auto; border: solid 5px black" src="' + imageData + '" /><br>' +
            '<input type="radio" style="margin-left:50%;" name="image" value="' + count++ + '"><br><br>';

    }

}
