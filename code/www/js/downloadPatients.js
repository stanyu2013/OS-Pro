function downloadPatients(){
    $.ajax({
        type: 'GET',
        url: 'https://' + serverAddress + ':6544/VitroMobileService/GetPatients',
        success: function(data){
            var response = JSON.parse(data);
            for(i = 0; i < response.length; i++){
                console.log(response[i].Diagnosis);
                var patient = new Patient();
                patient.firstName = response[i].FirstName;
                patient.lastName = response[i].LastName;
                patient.middleName = response[i].MiddleName;
                patient.secondLastName = response[i].SecondLastName;
                patient.dateOfBirth = response[i].DateOfBirth;
                patient.sex = response[i].Sex;
                patient.gender = response[i].Sex;
                patient.diagnosis = response[i].Diagnosis;
                patient.country = response[i].Country;
                patient.guardianFirstName = response[i].GuardianFirstName;
                patient.guardianMiddleName = response[i].GuardianMiddleName;
                patient.guardianLastName = response[i].GuardianLastName;
                patient.guardianAddressLine1 = response[i].GuardianAddressLine1;
                patient.guardianAddressLine2 = response[i].GuardianAddressLine2;
                patient.guardianAddressLine3 = response[i].GuardianAddressLine3;
                patient.guardianCounty = response[i].GuardianCounty;
                patient.guardianPostalCode = response[i].GuardianPostalCode;
                patient.guardianMobile = response[i].GuardianMobile;
                patient.guardianText = response[i].GuardianText;
                insertPatient(patient, 0);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
    alert("Complete");
}