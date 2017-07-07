
function registerPatient() {

    var patient = new Patient();

    patient.country = registrationForm.Country.value;
    patient.firstName = registrationForm.FirstName.value;
    patient.middleName = registrationForm.MiddleName.value;
    patient.lastName = registrationForm.LastName.value;
    patient.secondLastName = registrationForm.SecondLastName.value;
    patient.diagnosis = registrationForm.Diagnosis.value;

    var dob = new Date(registrationForm.DateOfBirth.value);
    var month = dob.getMonth() + 1;
    var day = dob.getDate();
    var year = dob.getFullYear();

    patient.dateOfBirth = month + '/' + day + '/' + year;
    patient.gender = registrationForm.Sex.value;

    patient.sex = patient.gender;
    patient.guardianFirstName = registrationForm.GuardianFirstName.value;
    patient.guardianMiddleName = registrationForm.GuardianMiddleName.value;
    patient.guardianLastName = registrationForm.GuardianLastName.value;
    patient.guardianMobile = registrationForm.GuardianMobile.value;

    patient.guardianAddressLine1 = registrationForm.GuardianAddressLine1.value;
    patient.guardianAddressLine2 = registrationForm.GuardianAddressLine2.value;
    patient.guardianAddressLine3 = registrationForm.GuardianAddressLine3.value;
    patient.guardianCounty = registrationForm.GuardianCounty.value;
    patient.guardianPostalCode = registrationForm.GuardianPostalCode.value;
    patient.guardianText = registrationForm.GuardianText.value;


    if (patient.isValid()) {

        insertPatient(patient, 1);
        myNavigator.popPage({ animation : 'slide' });

    } else {

        alert(patient.errorMessage);
    
    }

}
