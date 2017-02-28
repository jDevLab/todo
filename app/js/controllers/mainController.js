'use strict';
angular.module('todo')
    .controller('mainController', ['dataService',
        function (dataService) {
            var vm = this;
            var filterValue = 'all';
            var allData = [];
            vm.newTask = '';
            vm.leftAmount = 0;

            //load data
            getAllItems();

            /**@description Event handler. Add new item*/
            vm.onAddNewItem = function () {
                dataService.addItem(vm.newTask).then(updateFn);
                vm.newTask = '';
            };
            /**@description Event handler. Change complete status
            * @param {todo} items Changed item.
            */
            vm.onChangeCompleteStatus = function (item) {
                dataService.changeItems([item]);
                item.isCompleted ? vm.leftAmount-- : vm.leftAmount++;
            };
            /**@description Event handler. Filter todo list.
            */
            vm.onChangeFilter = function (option) {
                filterValue = option;
                filterData();
            };
            /**@description Event handler. Clear completed tasks
            */
            vm.onClear = function () {
                var arr = [];
                for (var i in allData) {
                    if (allData[i].isCompleted)
                        arr.push(allData[i]);
                }
                dataService.deleteItems(arr).then(updateFn);
            };
                       
            function getAllItems() {
                dataService.getAll().then(updateFn);

            }
            
            function updateFn(resp) {
                allData = resp.data;
                filterData();
                calcLeftAmount();
            }
            function calcLeftAmount() {
                vm.leftAmount = 0;
                for (var i in allData) {
                    if (!allData[i].isCompleted)
                        vm.leftAmount++
                }
            };
            function filterData() {
                if (filterValue == 'all') {
                    vm.todoItems = allData;
                    return;
                }
                var isCompleted = (filterValue == 'completed');
                var partialData = [];
                for (var i in allData) {
                    if (isCompleted == allData[i].isCompleted)
                        partialData.push(allData[i])
                }
                vm.todoItems = partialData;
            }
}])