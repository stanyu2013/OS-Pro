function PatientController($scope){
	$.ajax({
				type: 'GET',
				url: 'https://cloud.slaintehealthcare.com:6544/VitroMobileService/GetPatients',
				success: function(data){
					var response = JSON.parse(data);
					$scope.CleftPatients = response;
					$scope.$apply();
				},
				error: function(jqXHR, textStatus, errorThrown){
					$scope.error = true;
					
					$scope.$apply();
				}
			});
}