(function () {
    'use strict';

    angular.module('myApp', ["ngRoute"])

        .controller('MyController', function ($scope, $http) {
            $http.get('http://localhost:3028/').then(function (response) {
                $scope.datas = response.data
            })
        })

        .controller('createController', function ($scope) {
            $scope.createEntry = function () {
                var newData = "{\"user_id\":\"" + $scope.user_id + "\", \"service_id\":\"" + $scope.service_id + "\", \"service_vehicle\":\"" + $scope.service_vehicle + "\", \"service_type\":\"" + $scope.service_type + "\", \"service_status\":\"" + $scope.service_status + "\"}";
                console.log(newData)
                fetch('http://localhost:3028/new', {
                    method: "POST",
                    body: newData,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.user_id=""
                $scope.service_id=""
                $scope.service_vehicle=""
                $scope.service_type=""
                $scope.service_status=""
            };
        })

        .controller('updateController', function ($scope, $http) {
            $http.get('http://localhost:3028/').then(function (response) {
                $scope.datas = response.data
            })

            $scope.getId = function () {
                var selectedId = $scope.service_id
                console.log("Testing : ",$scope.service_id)
                $scope.user_id = selectedId['user_id']
                $scope.service_vehicle = selectedId['service_vehicle']
                $scope.service_type = selectedId['service_type']
                $scope.service_status = selectedId['service_status']
            }

            $scope.updateEntry = function () {
                var newData = "{\"user_id\":\"" + $scope.user_id + "\", \"service_id\":\"" + $scope.service_id['service_id'] + "\", \"service_vehicle\":\"" + $scope.service_vehicle + "\", \"service_type\":\"" + $scope.service_type + "\",\"service_status\":\"" + $scope.service_status + "\"}";
                console.log("Sending Data",newData)
                fetch('http://localhost:3028/update', {
                    method: "POST",
                    body: newData,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.user_id=""
                $scope.service_id=""
                $scope.service_vehicle=""
                $scope.service_type=""
                $scope.service_status=""
            };
        })

        .controller('searchController', function ($scope, $rootScope) {
            $scope.getData = function () {
                var searchJson = { status: $scope.service_status }
                var jsonObj = JSON.stringify(searchJson)
                fetch('http://localhost:3028/search', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    $scope.datas = json
                })
                .catch(err => console.log(err))
            }
        })

        .controller('deleteController', function ($scope, $http) {
            $http.get('http://localhost:3028/').then(function (response) {
                $scope.datas = response.data
            })
            $scope.deleteEntry = function () {
                var delJson = { delID: $scope.del.service_id }
                var jsonObj = JSON.stringify(delJson)

                fetch('http://localhost:3028/delete', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.del = ""
            }
        })

        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "view.html"
                })
                .when("/create", {
                    templateUrl: "create.html",
                    controller: "createController"
                })
                .when("/update", {
                    templateUrl: "update.html",
                    controller: "updateController"
                })

                .when("/delete", {
                    templateUrl: "delete.html",
                    controller: "deleteController"
                });
        })
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
})();


// (function(){

// })();