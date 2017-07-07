var db; // to hold the database object

var dbCreated = false;

var databaseName = 'OSPro.db';

//document.addEventListener("deviceready", onDeviceReady, false);

function databaseInit(){
    db = window.sqlitePlugin.openDatabase({name: databaseName});
    db.transaction(function(tx) {

        tx.executeSql(createTable, [], null, function (error) {
            console.log("Create table error" + error.message);
        });

        tx.executeSql(createImageTable, [], null, function (error){
            console.log("Create Image Table Error: "+ error + " " + error.message);
        });

    });
}

//statement to create the table
var createTable = "CREATE TABLE IF NOT EXISTS patient ( "+
                "FirstName VARCHAR(60) NOT NULL, " +
                "MiddleName VARCHAR(60) NULL, " +
                "LastName VARCHAR(60) NOT NULL, " +
                "SecondLastName VARCHAR(60) NULL, " +
                "DateOfBirth DATE NOT NULL," +
                "Sex VARCHAR(10) NOT NULL, " +
                "Gender VARCHAR(10) NOT NULL, " +
                "Diagnosis VARCHAR(60) NOT NULL, " +
                "Country VARCHAR(45) NULL, " +
                "GuardianFirstName VARCHAR(60) NOT NULL, " +
                "GuardianMiddleName VARCHAR(60) NULL, " +
                "GuardianLastName VARCHAR(60) NOT NULL, " +
                "GuardianAddressLine1 VARCHAR(100) NULL, " +
                "GuardianAddressLine2 VARCHAR(100) NULL, " +
                "GuardianAddressLine3 VARCHAR(100) NULL, " +
                "GuardianCounty VARCHAR(100) NULL, " +
                "GuardianPostalCode VARCHAR(10) NULL, " +
                "GuardianMobile VARCHAR(15) NULL, " +
                "GuardianText VARCHAR(255) NULL, " +
                "IsNew INTEGER NOT NULL, " +
                "Id INTEGER PRIMARY KEY AUTOINCREMENT)"; 

var createImageTable = "CREATE TABLE IF NOT EXISTS patientImage ( " +
                "Id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "ImageFileName TEXT NOT NULL, " +
                "ImageType VARCHAR(10) NOT NULL, "+
                "Country VARCHAR(45) NULL, " + 
                "PatientId INTEGER NOT NULL, " + 
                "FOREIGN KEY(PatientId) REFERENCES patient(Id))";

function createDatabase(tx){
    tx.executeSql(createTable);
    tx.executeSql(createImageTable);
}

function createDatabaseSuccess(){
    dbCreated = true;
}

function transaction_error(tx, error) {
    console.log("Database Error: " + error);
}

function getPatients(sql, callbackFunction){

    console.log("getPatients called");
    db = window.sqlitePlugin.openDatabase({name: databaseName});
    db.transaction(function(tx){

        tx.executeSql(sql, [], function(tx, rs) {
            console.log("inside execute sql");
            callbackFunction(rs);
        }, function(error) {
            console.log(error);
        });
    });

}


function getPatientToUpload(){
    var sql = 'SELECT * FROM patient WHERE IsNew = 1';
    db = window.sqlitePlugin.openDatabase({name: databaseName});
    db.executeSql(sql, [], function(results) {
        console.log(results.rows.item(0).FirstName);
        for (var i = 0; i < results.rows.length; i++) {
            console.log(results.rows.length);
            var patient = new Patient();
            patient.firstName = results.rows.item(i).FirstName;
            patient.middleName = results.rows.item(i).MiddleName;
            patient.lastName = results.rows.item(i).LastName;
            patient.secondLastName = results.rows.item(i).SecondLastName;
            patient.dateOfBirth = results.rows.item(i).DateOfBirth;
            patient.sex = results.rows.item(i).Sex;
            patient.gender = results.rows.item(i).Gender;
            patient.diagnosis = results.rows.item(i).Diagnosis;
            patient.country = results.rows.item(i).Country;
            patient.guardianFirstName = results.rows.item(i).GuardianFirstName;
            patient.guardianMiddleName = results.rows.item(i).GuardianMiddleName;
            patient.guardianLastName = results.rows.item(i).GuardianLastName;
            patient.guardianAddressLine1 = results.rows.item(i).GuardianAddressLine1;
            patient.guardianAddressLine2 = results.rows.item(i).GuardianAddressLine2;
            patient.guardianAddressLine3 = results.rows.item(i).GuardianAddressLine3;
            patient.guardianCounty = results.rows.item(i).GuardianCounty;
            patient.guardianPostalCode = results.rows.item(i).GuardianPostalCode;
            patient.guardianMobile = results.rows.item(i).GuardianMobile;
            patient.guardianText = results.rows.item(i).GuardianText;
            console.log("Patient: " + results.rows.item(i).Id);
            UploadPatient(patient, results.rows.item(i).Id);
            //if (uploadStatus) {
            //    deletePatientByID(results.rows.item(i).Id);
            //    uploadStatus = false;
            //}
        }
    });
}


function insertPatient(patient, IsNew){
    
        db.executeSql('INSERT INTO patient (' + 
            'FirstName, MiddleName, LastName, SecondLastName, DateOfBirth, '+
            'Sex, Gender, Diagnosis, Country, GuardianFirstName, GuardianMiddleName, ' +
            'GuardianLastName, GuardianAddressLine1, '+
            'GuardianAddressLine2, GuardianAddressLine3, '+
            'GuardianCounty, GuardianPostalCode, GuardianMobile, GuardianText, IsNew) '+
            'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [patient.firstName, patient.middleName,
            patient.lastName, patient.secondLastName, patient.dateOfBirth, patient.sex,
            patient.gender, patient.diagnosis, patient.country,
            patient.guardianFirstName, patient.guardianMiddleName, patient.guardianLastName,
            patient.guardianAddressLine1, patient.guardianAddressLine2, 
            patient.guardianAddressLine3, patient.guardianCounty, 
            patient.guardianPostalCode, patient.guardianMobile,
            patient.guardianText, IsNew], function(success){
                console.log("insertPatient Successfull!!");
            }, function (error) {
                console.log(error);
            });
}

function dropTable(){
    db.executeSql("DROP TABLE patient");
}

function getPatientById(id, callbackFunction){
    console.log("getPatientById called");
    db = window.sqlitePlugin.openDatabase({name: databaseName});
    db.transaction(function(tx){

        tx.executeSql("SELECT * FROM patient where Id = " + id, [], function(tx, rs) {
            console.log("inside execute sql");
            callbackFunction(rs);
        }, function(error) {
            console.log(error);
        });
    });
    // db.executeSql("SELECT * FROM patient where Id = " + id, callbackFunction(results), function (error) {
    //     console.log(error);
    // });
}

function deletePatientByID(id){
    db.executeSql("DELETE FROM patient where Id = " + id, function(result){
        console.log(result);
    },
        function (error) {
            console.log(error);
        });

}

function deleteAllPatients(){
    db.executeSql("DELETE * patient", null, function (error) {
        console.log(error);
    });
}

function getImages(patientid){
    var sql = 'SELECT * FROM patientImage WHERE PatientId = '+patientid;
    db.executeSql(sql, [], function(results){
        for(i = 0; i < results.rows.length; i++){
            console.log(results.rows.item(i));
        }
    });
}


function getAllImagesFromPatient(callbackFunction){
    db = window.sqlitePlugin.openDatabase({name: databaseName});
    var page = myNavigator.getCurrentPage();
    var sql = 'SELECT * FROM patientImage WHERE PatientId = ' + page.options.patientid;

    db.transaction(function(tx){
        tx.executeSql(sql, [], callbackFunction(rs),function(error) {
            console.log('error '+error);
        });
    });
}

function addImage(ImageFileName, ImageType, Country, PatientId){
    db.executeSql('INSERT INTO patientImage(ImageFileName, ImageType, Country, PatientId)' +
    'VALUES(?,?,?,?)',
    [ImageFileName, ImageType, Country, PatientId], function(success){
                console.log(success);
            }, function (error) {
                console.log(error);
            });
    //getImages(PatientId);
}



