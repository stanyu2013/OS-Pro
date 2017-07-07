function getPatientInfo(){
	patientProfile.show();
	var page = myNavigator.getCurrentPage();
	getPatientById(page.options.patientid, displayPatientInfo);
	patientProfile.hide();
	document.getElementById('reviewImage').innerHTML = '<ons-button onclick="myNavigator.pushPage(\'review-images.html\', {animation:\'slide\', patientid:' + page.options.patientid + '});">Review Images</ons-button>';
	//document.getElementById('reviewImageButton').onclick=myNavigator.pushPage('review-images.html', {animation:'slide', patientid:page.options.patientid});
}

function displayPatientInfo(results){
	console.log("displayPatientInfo called");
	var patient = results.rows.item(0);

	var name = patient.FirstName;
	if(patient.MiddleName != null){
		name += " " + patient.MiddleName;
	}
	name += " " + patient.LastName;
	if(patient.SecondLastName != null){
		name += " " + patient.SecondLastName;
	}

	var dob = patient.DateOfBirth.substring(0, 10);
	var address = patient.GuardianAddressLine1;
	if(patient.GuardianAddressLine2 != null){
		address += "\n" + patient.GuardianAddressLine2;
	}
	if(patient.GuardianAddressLine3 != null){
		address += "\n" + patient.GuardianAddressLine3;
	}

	var guardianInfo = patient.GuardianFirstName;
	if(patient.GuardianMiddleName != null){
		guardianInfo += " " + patient.GuardianMiddleName;
	}
	guardianInfo += " " + patient.GuardianLastName;
	var phone = patient.GuardianMobile;
	console.log(patient);
	var content = document.getElementById('PatientProfileName');
	content.innerHTML = name;

	content = document.getElementById('PatientProfileGender');
	content.innerHTML = patient.Gender;

	content = document.getElementById('PatientProfileDiagnosis');
	content.innerHTML = patient.Diagnosis;

	content = document.getElementById('PatientProfileDOB');
	content.innerHTML += dob;

	content = document.getElementById('PatientProfileAddress');
	content.innerHTML += address;
	if(patient.GuardianText != null){
		content.innerHTML += "<br><b>Additional Information: </b><br>" + patient.GuardianText;
	}

	content = document.getElementById('PatientProfileCountry');
	content.innerHTML += patient.Country;

	content = document.getElementById('PatientProfileGuardianInfo');
	content.innerHTML += guardianInfo;
	if(patient.GuardianMobile != null){
		content.innerHTML += "<br>Phone Number: " + patient.GuardianMobile;
	}
}

