function Patient(){
	this.country = "";
	this.firstName = "";
	this.middleName = "";
	this.lastName = "";
	this.secondLastName = "";
	this.dateOfBirth = "";
	this.gender = "";
	this.sex = "";
	this.diagnosis = "";
	this.guardianFirstName = "";
	this.guardianMiddleName = "";
	this.guardianLastName = "";
	this.guardianMobile = "";
	this.guardianAddressLine1= "";
	this.guardianAddressLine2 = "";
	this.guardianAddressLine3 = "";
	this.guardianCounty = "";
	this.guardianPostalCode = "";
	this.guardianText = "";
	this.errorMessage = "";
	this.imageFileNames = "";
	this.imageType="Pre";

	
	this.isValid= function(){
		var nameRegex = /^[ña-z0-9]*$/i;
		var lastNameRegex = /^[ña-z0-9 ]+$/i;
		var dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
		var addressRegex =/^[a-z0-9\s,'-]*$/i;
		var postCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

		if(this.country == "" || this.country == null){
			this.errorMessage = "Country must be filled out";
			return false;
		}
		if(this.diagnosis == ""){
			this.errorMessage = "Diagnosis must be filled out";
			return false;
		}
		//fist name validation
		if (this.firstName == "" || this.firstName == null){
			this.errorMessage = "Name must be filled out";
			return false;
		}else if(!nameRegex.test(this.firstName)){
			this.errorMessage = "Invalid name";
			return false;
		}
		//middle name validation
		if(!nameRegex.test(this.middleName)){
			this.errorMessage = "Invalid middle name";
			return false;
		}
		//last name validation
		if(this.lastName=="" || this.lastName == null){
			this.errorMessage = "Last name must be filled out";
			return false;
		}else if(!lastNameRegex.test(this.lastName)){
			this.errorMessage = "Invalid last name";
			return false;
		}
		// date validation
		if(this.dateOfBirth != "NaN/NaN/NaN"){
			if(this.dateOfBirth != "") {
		      if(regs = this.dateOfBirth.match(dateRegex)) {
		        // day value between 1 and 31
		        if(regs[1] < 1 || regs[1] > 12) {
		          this.errorMessage = "Invalid value for month: " + regs[1];
		          return false;
		        }
		        // month value between 1 and 12
		        if(regs[2] < 1 || regs[2] > 31) {
		          this.errorMessage = "Invalid value for day: " + regs[2];
		          return false;
		        }
		        // year value between 1902 and 2015
		        if(regs[3] < 1902 || regs[3] > (new Date()).getFullYear()) {
		          this.errorMessage = "Invalid value for year: " + regs[3] + " - must be between 1902 and " + (new Date()).getFullYear();
		          return false;
		        }
		      }
		    } else {
		      this.errorMessage = "Invalid date format: " + form.startdate.value;
		      return false;
		    }
		}else{
			this.errorMessage = "Invalid date";
		      return false;
		}
	    //gender validation
	    if(!(this.gender == "Male" || this.gender == "Female")){
	    	this.errorMessage = "Invalid gender";
	    	return false;
	    }

	    //sex validation
	    if(!(this.sex == "Male" || this.sex == "Female")){
	    	this.errorMessage = "Invalid sex";
	    	return false;
	    }

		if(this.guardianFirstName == "" || this.guardianFirstName == null){
			this.errorMessage = "Guardian first name must be filled!";
			return false;
		} else if(!nameRegex.test(this.guardianFirstName)){
			this.errorMessage = "Invalid Guardian first name";
			return false;
		}

		if(!nameRegex.test(this.guardianMiddleName)) {
			this.errorMessage = "Invalid Guardian middle name";
			return false;
		}

		if(this.guardianLastName == "" || this.guardianLastName == null){
			this.errorMessage = "Guardian Last Name must be filled";
			return false;
		}  else if(!lastNameRegex.test(this.guardianLastName)){
			this.errorMessage = "Invalid Guardian first name";
			return false;
		}

	    // guardian address validation
	    if(this.guardianAddressLine1 == "" || this.guardianAddressLine1 == null){
	    	this.errorMessage = "Guardian address line 1 must be filled";
	    	return false;
	    }else if(!addressRegex.test(this.guardianAddressLine1)){
	    	this.errorMessage = "Invalid address";
	    	return false;
	    }

	    // guardian county validation
	    if(this.guardianCounty == "" || this.guardianCounty ==  null){
	    	this.errorMessage = "Guardian county must be filled";
	    	return false;
	    }else if(!addressRegex.test(this.guardianCounty)){
	    	this.errorMessage = "Invalid county";
	    	return false;
	    }

	    // guardian postal code validation
	    if(this.guardianPostalCode == "" || this.guardianPostalCode == null){
	    	this.errorMessage = "Guardian postal code must be filled";
	    	return false;
	    } else if(!postCodeRegex.test(this.guardianPostalCode)){
	    	this.errorMessage = "Invalid postal code";
	    	return false;
	    }

		if((this.guardianAddressLine1 == "" || this.guardianAddressLine1 == null) && (this.guardianText == "" || this.guardianText == null)){
			this.errorMessage = "Please fill out an address or a location description";
			return false;
		}
	    return true;
	}
}


