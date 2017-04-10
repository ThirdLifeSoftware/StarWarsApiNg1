'use strict';

angular.module('myApp', ['StarWarsService']).component('starWarsComponent', {
    templateUrl: 'template/starwars.component.html',
    controller: function StarWarsController($scope, StarWars) {
        $scope.characters = [];
        $scope.films = [];
        $scope.selectedCharacterUrl;
        $scope.hasError = "";
        $scope.film;

        loadCharacters();

        function loadCharacters() {
            StarWars.getCharacterData().then(function (response) {
                $scope.characters = response.data.characters;
                var defaultOption = { name: "Please Select", url: "-1" };
                $scope.characters.unshift(defaultOption);
                $scope.selectedCharacterUrl = $scope.characters[0];
            }).catch(function (error) {
                $scope.hasError = error.message;
            });
        }

        $scope.onSelectedCharacterChange = function (url) {
            $scope.hasError = "";
            if (url != "-1") {
                StarWars.getCharacterDetail(url).then(function (response) {
                    StarWars.getMultipleFilms(response.data.films).then(function (response) {
                        $scope.films = response;
                    }).catch(function (error) {
                        $scope.hasError = error.message;
                        $scope.films = [];
                    });
                }).catch(function (error) {
                    $scope.hasError = error.message;
                    $scope.films = [];
                });
            } else {
                $scope.films = [];
            }
        };
    }
});
//# sourceMappingURL=starwars.component.js.map