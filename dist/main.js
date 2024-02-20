/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

const app = (function () {
    var sidebar_var = true;
    var empDropDown_var = true;
    var rolesDropDown_var = true;
    var filterBar_var = true;
    let sortOrders = {};
    var opt_var = true;
    // var multiselect_var = true;
    var letter = "";
    const tableBody = document.getElementById('tBody');
    const statusOpt = [
        { value: 'default', name: 'Status' },
        { value: 'Active', name: 'Active' },
        { value: 'InActive', name: 'InActive' }
    ];
    const LocationOpt = [
        { value: 'default', name: 'Location' },
        { value: 'US', name: 'US' },
        { value: 'UK', name: 'UK' },
        { value: 'Hyderabad', name: 'Hyderabad' }
    ];
    const DepartmentOpt = [
        { value: 'default', name: 'Department' },
        { value: 'IT', name: 'IT' },
        { value: 'PE', name: 'PE' }
    ];
    (function () {
        createSelect("status", statusOpt);
        createSelect("location", LocationOpt);
        createSelect("department", DepartmentOpt);
    })();
    //  sidebar functionality
    function openSidebar() {
        const sideBar = document.querySelector(".sidebar");
        sideBar.style.display = "block";
        sideBar.style.width = "15%";
        const mainContainer = document.getElementById("mainBody");
        mainContainer.style.width = "85%";
        const miniIcon = document.querySelector(".minimised-icons");
        miniIcon.style.display = "none";
        rotateImage();
    }
    function rotateImage() {
        var handle_icon = document.querySelector('.handle-icon');
        if (sidebar_var)
            handle_icon.style.rotate = '180deg';
        else
            handle_icon.style.rotate = '0deg';
    }
    function closeSidebar() {
        const sideBar = document.querySelector(".sidebar");
        const mainContainer = document.getElementById("mainBody");
        mainContainer.style.width = "100%";
        const miniIcon = document.querySelector(".minimised-icons");
        miniIcon.style.display = "flex";
        miniIcon.style.flexDirection = "column";
        sideBar.style.display = "none";
        rotateImage();
    }
    function sideBar() {
        if (sidebar_var == false) {
            openSidebar();
        }
        else {
            closeSidebar();
        }
        sidebar_var = !sidebar_var;
    }
    // Employee dropdown in Employee
    function empInfo() {
        if (empDropDown_var == true) { //Open employee innerlist
            const emp = document.querySelector(".all-list");
            emp.style.display = "block";
        }
        else { //Close epmloyee
            const emp = document.querySelector(".all-list");
            emp.style.display = "none";
        }
        empDropDown_var = !empDropDown_var;
    }
    //exporting the table data to csv 
    // function exportData() {
    //     const data = Array.from(tableBody.querySelectorAll('tr')).map(row => {
    //         return Array.from(row.querySelectorAll('td')).map(cell => cell.textContent);
    //     });
    //     const csv = data.map(row => row.join(',')).join('\n');
    //     const blob = new Blob([csv], { type: 'text/csv' });
    //     const link = document.createElement('a');
    //     link.href = URL.createObjectURL(blob);
    //     link.download = 'table.csv';
    //     link.click();
    // }
    // Filter bar in employees
    function filterBar() {
        if (filterBar_var == true) { //Closing the filter bar
            const filterBar = document.querySelector(".filter");
            filterBar.style.display = "none";
        }
        else { //Opening the filter bar
            const filterBar = document.querySelector(".filter");
            filterBar.style.display = "flex";
        }
        filterBar_var = !filterBar_var;
    }
    // Dropdown in Add roles
    function dropDown() {
        if (rolesDropDown_var == true) { //Opening Dropdown
            const dropDown = document.querySelector(".dropdown");
            dropDown.style.display = "block";
        }
        else { //Closing Dropdown
            const dropDown = document.querySelector(".dropdown");
            dropDown.style.display = "none";
        }
        rolesDropDown_var = !rolesDropDown_var;
    }
    //cancel in addemployee 
    function cancel() {
        window.history.back();
    }
    //creating select and options
    function createSelect(label, options) {
        const selectFilterContainer = document.querySelector('.select-filters');
        const selectEle = document.createElement('select');
        selectEle.setAttribute('name', label);
        selectEle.setAttribute('id', label);
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.name;
            selectEle === null || selectEle === void 0 ? void 0 : selectEle.appendChild(opt);
        });
        selectFilterContainer === null || selectFilterContainer === void 0 ? void 0 : selectFilterContainer.appendChild(selectEle);
    }
    return {
        sideBar, empInfo, filterBar, dropDown, cancel, createSelect
    };
    // return {
    //     sideBar, empInfo, exportData, filterBar, dropDown, cancel, createSelect, updateField, sortColumn, addEmployee, empPrototype,
    //     displayAllData, storeImage, alpha, applyFilter, resetFilter, displayFilterData, deleteCheckedRows
    // };    
})();

/******/ })()
;