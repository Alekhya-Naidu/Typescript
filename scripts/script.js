const app = (function(){
    var sidebar_var = true;
    var empDropDown_var = true;
    var rolesDropDown_var = true;
    var filterBar_var = true;
    let sortOrders = {};
    var opt_var = true;
    // var multiselect_var = true;
    var letter = "";
    const tableBody = document.getElementById('tBody');
    employees = JSON.parse(localStorage.getItem('employees')) || [];
    const statusOpt = [
        { value: 'default', name: 'Status' },
        { value: 'Active', name: 'Active'},
        { value: 'InActive', name: 'InActive' }
    ];
    const LocationOpt = [
        { value: 'default', name: 'Location' },
        { value: 'US', name: 'US' },
        { value: 'UK', name: 'UK' },
        { value: 'Hyderabad', name: 'Hyderabad'}
    ];
    const DepartmentOpt = [
        { value: 'default', name: 'Department' },
        { value: 'IT', name: 'IT' },
        { value: 'PE', name: 'PE' }
    ];

    (function(){
        createSelect("status", statusOpt);
        createSelect("location", LocationOpt);
        createSelect("department", DepartmentOpt);
    })();

    //  sidebar functionality
    function openSidebar(){
        document.getElementById("empSideBar").style.width = "15%";
        document.getElementById("mainBody").style.width = "85%";
        const miniIcon = document.querySelector(".minimised-icons");
        miniIcon.style.display = "none";
        const sideBar = document.querySelector(".sidebar");
        sideBar.style.display = "block";
        rotateImage();           
    }

    function rotateImage() {
        var handle_icon = document.querySelector('.handle-icon');
        if(sidebar_var)
            handle_icon.style.rotate = '180deg';
        else
            handle_icon.style.rotate = '0deg';
    }

    function closeSidebar(){
        const sideBar = document.querySelector(".sidebar");
        document.getElementById("mainBody").style.width = "100%";
        const miniIcon = document.querySelector(".minimised-icons");
        miniIcon.style.display = "flex";
        miniIcon.style.flexDirection = "column";
        sideBar.style.display = "none";
        rotateImage();
    }

    function sideBar(){
        if(sidebar_var == false){
            openSidebar();
        }else{
            closeSidebar();
        }
        sidebar_var = !sidebar_var;
    }

    // Employee dropdown in Employee
    function empInfo(){
        if(empDropDown_var == true){ //Open employee innerlist
            const emp = document.querySelector(".all-list");
            emp.style.display = "block";    
        }
        else{ //Close epmloyee
            const emp = document.querySelector(".all-list");
            emp.style.display = "none"; 
        }
        empDropDown_var = !empDropDown_var;
    }

    //exporting the table data to csv 
    function exportData() {
        const data = Array.from(tableBody.querySelectorAll('tr')).map(row => {
            return Array.from(row.querySelectorAll('td')).map(cell => cell.textContent);
        });
        const csv = data.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'table.csv';
        link.click();
    }

    // Filter bar in employees
    function filterBar(){
        if(filterBar_var == true){  //Closing the filter bar
            const filterBar = document.querySelector(".filter");
            filterBar.style.display = "none";
        }
        else{ //Opening the filter bar
            const filterBar = document.querySelector(".filter");
            filterBar.style.display = "flex";
        }
        filterBar_var = !filterBar_var;
    }

    // Dropdown in Add roles
    function dropDown(){
        if(rolesDropDown_var == true){  //Opening Dropdown
            const dropDown = document.querySelector(".dropdown");
            dropDown.style.display = "block";
        }
        else{ //Closing Dropdown
            const dropDown = document.querySelector(".dropdown");
            dropDown.style.display = "none";
        }
        rolesDropDown_var = !rolesDropDown_var;
    }

    //cancel in addemployee 
    function cancel(){
        window.history.back(); 
    }

    function updateField(){
            const update = document.querySelector('.update');
            update.style.display = "none";
    } 

    //creating select and options
    function createSelect(label, options){
        const selectFilterContainer = document.querySelector('.select-filters');
        const selectEle = document.createElement('select');
        selectEle.setAttribute('name', label);
        selectEle.setAttribute('id', label);
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.name;
            selectEle?.appendChild(opt);
        });
        selectFilterContainer?.appendChild(selectEle);
    }
    
    //sorting thr table asc, desc order
    function sortColumn(col) {
        const rows = Array.from(tableBody.querySelectorAll('tr'));

        if(!sortOrders[col] || sortOrders[col] == 'desc'){
            rows.sort((a, b) => {
                const cellA = a.cells[col].textContent.trim();
                const cellB = b.cells[col].textContent.trim();
                if(isNaN(cellA) && isNaN(cellB)){
                    return cellA.localeCompare(cellB);
                } 
                else{
                    return parseInt(cellA) - parseInt(cellB);
                }
            });
            sortOrders[col] = 'asc';
        } 
        else {
            rows.sort((a, b) => {
                const cellA = a.cells[col].textContent.trim();
                const cellB = b.cells[col].textContent.trim();
                if(isNaN(cellA) && isNaN(cellB)){
                    return cellB.localeCompare(cellA);
                } 
                else{
                    return parseInt(cellB) - parseInt(cellA);
                }
            });
            sortOrders[col] = 'desc';
        }
        tableBody.innerHTML = '';
        rows.forEach(rowdata => tableBody.appendChild(rowdata));
    }

    //creating alphabet buttons
    document.addEventListener("DOMContentLoaded", function() {
        const alphabetContent = document.querySelector('.alphabet-content');
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const btn = document.createElement('button');
            btn.textContent = letter;
            btn.dataset.letter = letter;
            btn.addEventListener('click', function(e) {
                const clickedBtn = e.target;
                const letterValue = clickedBtn.textContent;
                alpha(letterValue);
            });
            alphabetContent?.appendChild(btn);
        }
    });

    //prototype function
    function empPrototype(empNo, firstName, lastName, dob, email, mobileNumber, joinDate, location, 
        role, department, manager, project, status = "Active", profileImg){
            this.empNo = empNo;
            this.firstName = firstName;
            this.lastName = lastName;
            this.dob = dob;
            this.email = email;
            this.mobileNumber = mobileNumber;
            this.joinDate = joinDate;
            this.location = location;
            this.role = role;
            this.department = department;
            this.manager = manager;
            this.project = project;
            this.status = status;
            this.profileImg = profileImg;
    }

    function validateEmpNo(empNum) {
        return empNum > 0;
    }

    function validateEmail(mail) {
        return mail.includes("@") && mail.includes(".");
    }

    function validateMobileNumber(number) {
        return !isNaN(number) && number.length === 10;
    }

    function validateFName(fname){
        return fname.length > 0;
    }

    function validateLName(lname){
        return lname.length > 0;
    }

    function addEmployee(){
        const empNo = document.getElementById('empNum').value;
        const firstName = document.getElementById('fname').value;
        const lastName = document.getElementById('lname').value;
        const dob = document.getElementById('dob').value;
        const email = document.getElementById('mail').value;
        const mobileNumber = document.getElementById('number').value;
        const joinDate = document.getElementById('jdate').value;
        const location = document.getElementById('location').value;
        const role = document.getElementById('Role').value;
        const department = document.getElementById('department').value;
        const manager = document.getElementById('manager').value;
        const project = document.getElementById('project').value;
        const profileImg = document.getElementById('profileImg').src;
        const status = "Active";

        if(!validateEmpNo(empNo)){
            toastr("Please enter Emp No to add new employee", 3000, "#FDE9E9");
            return;
        }
        if(!validateFName(firstName)){
            toastr("Please fill firstName to add new employee", 3000);
            return;
        }
        if(!validateLName(lastName)){
            toastr("Please fill lastName to add new employee", 3000);
            return;
        }
        if (!validateEmail(email)) {
            toastr("Enter valid Email Id", 3000);
            return;
        }
        if (!validateMobileNumber(mobileNumber)) {
            toastr("Please enter valid Mobile Number", 3000);
            return;
        }
        
        const employee = new empPrototype(empNo, firstName, lastName, dob, email, mobileNumber, joinDate, location, 
            role, department, manager, project, status, profileImg);

        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));
        toastr("Added new employee successfully", 3000, "#E7F4E8");
        window.setTimeout(function(){
            window.location = "/employee.html";
        }, 3000);
    }

    // displaying of the entire table data
    function displayAllData(){
        const tableBody = document.getElementById('tBody');
        tableBody ? tableBody.innerHTML = '': "";
    
        employees.forEach(employee => {
            const profileImgSrc = employee.profileImg;
            const row = createRow(employee, profileImgSrc ? profileImgSrc : 'assets/images/man-profile.png');
            tableBody?.appendChild(row);
        });
    }

    //creating row
    function createRow(employee, profileImgSrc){
        const row = document.createElement('tr');
        row.classList.add('table-data');
        const rowdata = [
            createBox(),
            createUser(employee, profileImgSrc),
            createLoc(employee.location),
            createLoc(employee.department),
            createLoc(employee.role),
            createEmpId(employee.empNo),
            createStatus('Active'),
            createJdate(employee.joinDate),
            createMore()
        ];        rowdata.forEach(rowd => {
            row.append(rowd);
        }); 
        return row;
    }

    function createBox(){
        const data = document.createElement('td');
        const inp = document.createElement('input');
        inp.setAttribute('type', 'checkbox');
        data.append(inp);
        return data;
    }

    function storeImage() {
        const profileInput = document.getElementById('uploadInput');
        if (profileInput.files && profileInput.files[0]) {
            var reader = new FileReader();
            let profileImgSrc;
            reader.onload = function(e) {
                profileImgSrc = e.target.result;
                profileImg.setAttribute('src', profileImgSrc);
            }
            reader.readAsDataURL(profileInput.files[0]);
        }
    }

    function createUser(employee, profileImgSrc){
        const data = document.createElement('td');
        const image = document.createElement('img');
        // image.setAttribute('src', "assets/Images/man-profile.png");
        image.setAttribute('src', profileImgSrc);
        image.setAttribute('alt', 'Profile picture of a man');
        data.appendChild(image);
    
        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info');
        
        const userName = document.createElement('span');
        userName.classList.add('user-name');
        userName.textContent = employee.firstName +" "+ employee.lastName;
    
        const mailId = document.createElement('span');
        mailId.classList.add('mail-id');
        mailId.textContent= employee.email;
    
        userInfo.appendChild(userName);
        userInfo.appendChild(mailId);
        data.appendChild(userInfo);
        return data;
    }

    function createLoc(text){
        const data = document.createElement('td');
        data.innerText = text;
        return data;
    }

    function createEmpId(text){
        const data = document.createElement('td');
        data.setAttribute('id', "empId");
        data.innerText = text;
        return data;
    }

    function createStatus(text){
        const data = document.createElement('td');
        const btn = document.createElement('button');
        btn.textContent = text;
        data.appendChild(btn);
        return data;
    }

    function createJdate(text){
        const data = document.createElement('td');
        data.textContent= text;
        return data;
    }

    function createMore(){
        const data = document.createElement('td');
        const image = document.createElement('img');
        image.classList.add('three-dots');
        image.setAttribute('src', 'assets/Images/more-dots.png');
        image.setAttribute('alt', 'image of three dots horizontally');
        data.appendChild(image);
        image.addEventListener('click', moreOpt);
    
        const dotOption = document.createElement('div');
        dotOption.style.backgroundColor = "white";
        dotOption.classList.add('dot-option');
        dotOption.setAttribute('id', 'dotOpt');
    
        const options = ['View Details', 'Edit', 'Delete'];
        options.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option;
            dotOption.appendChild(li);
        });
    
        data.appendChild(dotOption);
        return data;
    }

    function moreOpt(event){
        const dot = event.target.nextElementSibling;
        if(opt_var == true){
            dot.classList.add('more-opt');
            dot.style.display = "block";
        }
        else{
            dot.style.display = "none";
        }
        opt_var = !opt_var;
    }

    function alpha(l){
        const allButtons = document.querySelectorAll('.alphabet-content button');
        allButtons.forEach(button => {
            button.classList.remove('active');
        });

        letter = l;
        applyFilter();

        const clickedBtn = document.querySelector(`button[data-letter="${letter}"]`);
        if (clickedBtn) {
            clickedBtn.classList.add('active');
        }
    }

    function applyFilter(){
        var stat = document.querySelector('select[name="status"]').value;
        var loc = document.querySelector('select[name="location"]').value;
        var dept = document.querySelector('select[name="department"]').value;
        var filteredData = [];

        const allButtons = document.querySelectorAll('.alphabet-content button');
        allButtons.forEach(button => {
            button.classList.remove('active');
        });

        filteredData = employees.filter(emp => {
            if(stat == "default"){
                return emp;
            }
            else{
                return emp.status == stat;
            }
        });

        filteredData = filteredData.filter(emp => {
            if(loc == "default"){
                return emp;
            }
            else{
                return emp.location == loc;
            }
        });

        filteredData = filteredData.filter(emp => {
            if(dept == "default"){
                return emp;
            }
            else{
                return emp.department == dept;
            }
        });

        filteredData = filteredData.filter(emp => {
            if(!letter){
                return emp;
            }
            else{
                return emp.firstName.charAt(0).toUpperCase() == letter;
            }
        });
        
        displayFilterData(filteredData);
        
        const clickedBtn = document.querySelector(`button[data-letter="${letter}"]`);
        if (clickedBtn) {
            clickedBtn.classList.add('active');
        }
    }

    function resetFilter(){
        document.querySelector('select[name="status"]').selectedIndex = 0;
        document.querySelector('select[name="location"]').selectedIndex = 0;
        document.querySelector('select[name="department"]').selectedIndex = 0;
        displayAllData();

        const allButtons = document.querySelectorAll('.alphabet-content button');
        allButtons.forEach(button => {
            button.classList.remove('active');
        });
    }

    function displayFilterData(filteredData) {
        const tableBody = document.getElementById('tBody');
        tableBody.innerHTML = '';

        if (filteredData.length > 0) {
            filteredData.forEach(employee => {
                const profileImgSrc = employee.profileImg; 
                const row = createRow(employee, profileImgSrc ? profileImgSrc : 'assets/images/man-profile.png');
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = 'No data available for your filter';
        }
    }

    function deleteButtonCheck(checkbox) {
        const deleteOpt = document.querySelector('.delete-btn button');
        if (checkbox.checked) {
            deleteOpt.style.backgroundColor = '#F44848';
        } 
        else {
            const check = document.querySelectorAll('input[type = "checkbox"]:checked').length > 0;
            if (!check) {
                deleteOpt.style.backgroundColor = '#F89191';
            }
        }
    }

    function deleteCheckedRows() {
        const tableBody = document.getElementById('tBody');
        const box = tableBody.querySelectorAll('input[type="checkbox"]:checked');

        box.forEach(checkbox => {
            const tabrow = checkbox.closest('.table-data');
            const empid = tabrow.querySelector('#empId').textContent;
            const index = employees.findIndex(emp => emp.empNo == empid);
            if (index !== -1) {
                employees.splice(index, 1);
                tabrow.remove();
                localStorage.setItem('employees', JSON.stringify(employees));
            }
        });

        const deleteOpt = document.querySelector('.delete-btn button');
        deleteOpt.style.backgroundColor = '#F89191';
    }

    function toastr(msg, duration, color="#FDE9E9"){
        const toastrContainer = document.querySelector('#toasterSection');
        toastrContainer.classList.add('toaster-section');
        toastrContainer.style.backgroundColor = color;
        const toasterContent = document.createElement('div');
        toasterContent.textContent = msg;
        toastrContainer.appendChild(toasterContent);

        setTimeout(() => {
            toastrContainer.removeChild(toasterContent);
            if (toastrContainer.children.length === 0) {
                toastrContainer.classList.remove('toaster-section');
            }
        }, duration);
    }

    document.getElementById('addEmpBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        addEmployee();
    });

    document.getElementById('tBody')?.addEventListener('change', function(event){
        if(event.target.type == 'checkbox'){
            deleteButtonCheck(event.target);
        }
    });

    return {
        sideBar, empInfo, exportData, filterBar, dropDown, cancel, createSelect, updateField, sortColumn, addEmployee, empPrototype,
        displayAllData, storeImage, alpha, applyFilter, resetFilter, displayFilterData, deleteCheckedRows
    };    
})();
