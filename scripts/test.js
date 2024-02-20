const tableBody = document.getElementById('tBody');
var opt_var = true;

var tezo = (function() {
    function sample()
    {
        console.log(1+2);
    }
    return sample;
});

tezo();

letter = "";
function closureFun(){
    var sidebar_var = true;
    var empDropDown_var = true;
    var rolesDropDown_var = true;
    var filterBar_var = true;

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
        console.log("Table");
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

    //sorting thr table asc, desc order
    let sortOrders = {};
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
        const empManager = new EmployeeManager();
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const btn = document.createElement('button');
            btn.textContent = letter;
            btn.dataset.letter = letter;
            btn.addEventListener('click', function(e) {
                const clickedBtn = e.target;
                const letter = clickedBtn.textContent;
                console.log("Letter value :", letter);
                empManager.getContent();
            });
            alphabetContent?.appendChild(btn);
        }
    });

    return {
        sideBar, empInfo, exportData, filterBar, dropDown, cancel, sortColumn
    };
}
const {sideBar, empInfo, exportData, filterBar, dropDown, cancel, sortColumn} = closureFun();

//---------------------------------
class EmployeeManager {
    constructor() {
        const storedData = localStorage.getItem('employees');
        this.employees = storedData ? JSON.parse(storedData) : [];
        // this.employees = JSON.parse(localStorage.getItem('employees')) || [];
    }

    validateEmail(mail) {
        return mail.includes("@") && mail.includes(".");
    }

    validateMobileNumber(number) {
        return !isNaN(number) && number.length === 10;
    }

    addEmployee(){
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

        if (!this.validateMobileNumber(mobileNumber)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }
        if (!this.validateEmail(email)) {
            alert("Please enter a valid mailId");
            return;
        }
        
        const employee = {
            empNo, firstName, lastName, dob, email, mobileNumber, joinDate, location, 
            role, department, manager, project, status : 'Active', profileImg
        };

        this.employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(this.employees));
        window.alert("New employee has been added successfully");
        window.location = '/employee.html';
    }

    displayAllData(){
        const tableBody = document.getElementById('tBody');
        tableBody ? tableBody.innerHTML = '': "";
    
        this.employees.forEach(employee => {
            const profileImgSrc = employee.profileImg;
            const row = EmployeeManager.createRow(employee, profileImgSrc ? profileImgSrc : 'assets/images/man-profile.png');
            tableBody?.appendChild(row);
        });
    }

    static createRow(employee, profileImgSrc){
        const row = document.createElement('tr');
        row.classList.add('table-data');
        const rowdata = [
            EmployeeManager.createBox(),
            EmployeeManager.createUser(employee, profileImgSrc),
            EmployeeManager.createLoc(employee.location),
            EmployeeManager.createLoc(employee.department),
            EmployeeManager.createLoc(employee.role),
            EmployeeManager.createLoc(employee.empNo),
            EmployeeManager.createStatus('Active'),
            EmployeeManager.createJdate(employee.joinDate),
            EmployeeManager.createMore()
        ];
        rowdata.forEach(rowd => {
            row.append(rowd);
        }); 
        return row;
    }

    static createBox(){
        const data = document.createElement('td');
        const inp = document.createElement('input');
        inp.setAttribute('type', 'checkbox');
        data.append(inp);
        return data;
    }

    static storeImage() {
        
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

    static createUser(employee, profileImgSrc){
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

    static createLoc(text){
        const data = document.createElement('td');
        data.innerText = text;
        return data;
    }

    static createStatus(text){
        const data = document.createElement('td');
        const btn = document.createElement('button');
        btn.textContent = text;
        data.appendChild(btn);
        return data;
    }

    static createJdate(text){
        const data = document.createElement('td');
        data.textContent= text;
        return data;
    }

    static createMore(){
        const data = document.createElement('td');
        const image = document.createElement('img');
        image.classList.add('three-dots');
        image.setAttribute('src', 'assets/Images/more-dots.png');
        image.setAttribute('alt', 'image of three dots horizontally');
        data.appendChild(image);
        image.addEventListener('click', EmployeeManager.moreOpt);
    
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

    static moreOpt(event){
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

    // getContent(letter){
    //     const allButtons = document.querySelectorAll('.alphabet-content button');
    //     allButtons.forEach(button => {
    //         button.classList.remove('active');
    //     });
        
    //     const emp = this.employees.filter(employee => {
    //         const userName = employee.firstName.charAt(0).toUpperCase();
    //         return userName == letter;
    //     });
    //     this.displayFilterData(emp);

    //     const clickedBtn = document.querySelector(`button[data-letter="${letter}"]`);
    //     if (clickedBtn) {
    //         clickedBtn.classList.add('active');
    //     }
    // }

    applyFilter(){
        let stat = document.querySelector('select[name="status"]').value;
        let loc = document.querySelector('select[name="location"]').value;
        let dept = document.querySelector('select[name="department"]').value;
        let filteredData = {};
        console.log("Final letter : ", letter);
        console.log("Filter criteria: ", stat, loc, dept);
        filteredData = this.employees.filter(employee => {
            const userName = employee.firstName.charAt(0).toUpperCase();
            const allButtons = document.querySelectorAll('.alphabet-content button');
            allButtons.forEach(button => {
                button.classList.remove('active');
            });

            if(stat != "default" || loc != "default" || dept != "default"){
                console.log("Letter :",letter);
                if (userName ==letter || letter == null) {
                    console.log("Filter passed:", userName);
                    if(stat != "default" && stat == employee.status && userName == letter){
                        if((loc == "default" || loc == employee.location) && (dept == "default" || dept == employee.department)){
                            return true;
                        }
                    }
                    else if(loc != "default" && loc == employee.location && userName == letter){
                        if((stat == "default" || stat == employee.status) && (dept == "default" || dept == employee.department)){
                            return true;
                        }
                    }
                    else if(dept != "default" && dept == employee.department){
                        if((stat == "default" || stat == employee.status) && (loc == "default" || loc == employee.location)){
                            return true;

                        }
                    }
                }
                
            }
            else{
                console.log("alpha");
                const userName = employee.firstName.charAt(0).toUpperCase();
                return userName == letter;
            }
        });
        console.log(filteredData);
        this.displayFilterData(filteredData);
        
        const clickedBtn = document.querySelector(`button[data-letter="${letter}"]`);
        if (clickedBtn) {
            clickedBtn.classList.add('active');
        }
    }

    

    resetFilter(){
        document.querySelector('select[name="status"]').selectedIndex = 0;
        document.querySelector('select[name="location"]').selectedIndex = 0;
        document.querySelector('select[name="department"]').selectedIndex = 0;
        this.displayAllData();

        const allButtons = document.querySelectorAll('.alphabet-content button');
        allButtons.forEach(button => {
            button.classList.remove('active');
        });
    }

    displayFilterData(filteredData) {
        const tableBody = document.getElementById('tBody');
        tableBody.innerHTML = '';

        if (filteredData.length > 0) {
            filteredData.forEach(employee => {
                const profileImgSrc = employee.profileImg; 
                const row = EmployeeManager.createRow(employee, profileImgSrc ? profileImgSrc : 'assets/images/man-profile.png');
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = 'No data available for your filter';
        }
    }

    deleteButtonCheck(checkbox) {
        const deleteOpt = document.querySelector('.delete-btn button');
        if (checkbox.checked) {
            deleteOpt.style.backgroundColor = '#F44848';
        } else {
            const check = document.querySelectorAll('input[type = "checkbox"]:checked').length > 0;
            if (!check) {
                deleteOpt.style.backgroundColor = '#F89191';
            }
        }
    }

    deleteCheckedRows() {
        const tableBody = document.getElementById('tBody');
        const box = tableBody.querySelectorAll('input[type="checkbox"]:checked');

        box.forEach(checkbox => {
            const tabrow = checkbox.closest('.table-data');
            const rowheader = tabrow.rowheader - 1;
            tabrow.remove();
            this.employees.splice(rowheader, 1);
        });

        localStorage.setItem('employees', JSON.stringify(this.employees));
        const deleteOpt = document.querySelector('.delete-btn button');
        deleteOpt.style.backgroundColor = '#F89191';
    }
}

const empManager = new EmployeeManager();

document.getElementById('addEmpBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    empManager.addEmployee();
});
document.getElementById('tBody')?.addEventListener('change', function(event){
    if(event.target.type == 'checkbox'){
        empManager.deleteButtonCheck(event.target);
    }
});
document.querySelector('.delete-btn button')?.addEventListener('click', () => {
    empManager.deleteCheckedRows();
});

document.addEventListener('DOMContentLoaded', function(){
    const appltBtn = document.querySelector('.filter-btn .apply');
    const resetBtn = document.querySelector('.filter-btn .reset');
    appltBtn?.addEventListener('click', () => {
        empManager.applyFilter();
    });
    resetBtn?.addEventListener('click', () => {
        empManager.resetFilter();
    });
});
empManager.displayAllData();