'use strict';
angular.module('todo').service('dataService', ['$http', function ($http) {
    //Service URI
    var apiUrl = "http://todo-service.azurewebsites.net/api/todo";

    /**@description Ruturn all items
    * @return {promisse}
    */
    this.getAll = function () {
        return $http({
            url: apiUrl,
            method: 'GET',
        });
    };

    /**@description Add new item to List
    * @param {string} label Text of task.
    * @return {promisse}
    */
    this.addItem = function (label) {
        return $http({
            url: apiUrl,
            method: 'PUT',
            data: JSON.stringify(label)
        });
    };


    /**@description Add new item to List
    * @param {array} changedItems Array of changed items.
    * @return {promisse}
    */
    this.changeItems = function (changedItems) {
        return $http({
            url: apiUrl,
            method: 'POST',
            data: changedItems
        });
    };

    /**@description Delete items
    * @param {array} itemsArr Array of deleted objects.
    * @return {promisse}
    */
    this.deleteItems = function (itemsArr) {
        return $http({
            url: apiUrl+"/delete",
            method: 'POST',
            data: JSON.stringify( itemsArr)
        });
    }
}])