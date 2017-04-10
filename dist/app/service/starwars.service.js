'use strict';

var StarWarsService = angular.module('StarWarsService', []).service('StarWars', function ($http, $q) {

    this.getCharacterData = function () {
        return $http.get("../data/characters.json");
    };

    this.getFilm = function (url) {
        return $http.get(url);
    };

    this.getMultipleFilms = function (urls) {
        var promises = [];
        angular.forEach(urls, function (url, index) {
            promises.push($http.get(url));
        });
        return $q.all(promises);
    };

    this.getCharacterDetail = function (url) {
        return $http.get(url);
    };
});
//# sourceMappingURL=starwars.service.js.map