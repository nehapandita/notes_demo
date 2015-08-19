// public/core.js
var notesApp = angular.module('notesApp', []);

notesApp.config(function ($routeProvider) {

            $routeProvider.when("/addNote", {
		controller: 'mainController',
                templateUrl: "views/addNote.html"
            });

            $routeProvider.when("/editNote", {
                templateUrl: "/views/editNote.html"
            });

            $routeProvider.when("/viewNote", {
		controller: 'mainController',
                templateUrl: "/views/viewNote.html"
            });

            $routeProvider.otherwise({
		controller: "listController",
                templateUrl: "/views/all.html"
            });

        });

notesApp.controller('listController', function($scope, $http, $location) {
	getAll();
	function getAll() {
		$http.get('http://localhost:3000/notes').success(function (data) {
			$scope.data.notes = data;
	        })
        	.error(function (error) {
			 $scope.data.error = error;
		});
	};

});

notesApp.controller('mainController', function($scope, $http, $location) {
	
	$scope.data = {};

	$scope.viewNote = function(id) {
		
			

		$http.get('http://localhost:3000/notes/' + id).success(function (data) {
			$scope.title = data[0].title;
			$scope.content = data[0].content;
			$location.path("/viewNote");
	        })
        	.error(function (error) {
	            $scope.data.error = error;
        	});		


	};


	$scope.editNote = function(id) {
		
			

		$http.get('http://localhost:3000/notes/' + id).success(function (data) {
			$scope.id = data[0].id;
			$scope.title = data[0].title;
			$scope.content = data[0].content;
			$location.path("/editNote");
	        })
        	.error(function (error) {
	            $scope.data.error = error;
        	});		


	};

	$scope.saveNote = function(id) {
	
		if($scope.title == null || $scope.title == '' || $scope.content == null || $scope.content == '') {
			$scope.error = "Title & Content can not be left blank!";
			return;
		}


		$http.put('http://localhost:3000/notes/' + id, {title: $scope.title, content: $scope.content}).success(function (data) {
			$location.path("/");
	        })
        	.error(function (error) {
	            $scope.data.error = error;
        	});
	};

	$scope.addNote = function() {
		$http.get('http://localhost:3000/notes/size').success(function (data) {
			$scope.id = data.count + 1;
			$scope.title = "";
			$scope.content = "";
			$location.path("/addNote");			
	        });
	};
	
	$scope.submitNote = function() {

		if($scope.title == null || $scope.title == '' || $scope.content == null || $scope.content == '') {
			$scope.error = "Title & Content can not be left blank!";
			return;
		}
	
		$http.post('http://localhost:3000/notes', {id: $scope.id.toString(), title: $scope.title, content: $scope.content}).success(function (data) {
			$location.path("/");
	        })
        	.error(function (error) {
	            $scope.data.error = error;
        	});
	};

});