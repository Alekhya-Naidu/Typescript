const app = (function(){
    var sidebar_var: boolean = true;
    var empDropDown_var: boolean = true;
    var rolesDropDown_var: boolean = true;
    var filterBar_var: boolean = true;
    let sortOrders:{[key : number]: string} = {};
    var opt_var: boolean = true;
    var letter = "";
    const employees = JSON.parse(localStorage.getItem('employees') || "[]") || [];
    const tableBody = document.getElementById('tBody');
    const statusOpt: {value: string;
        name: string;}[] = [
        { value: 'default', name: 'Status' },
        { value: 'Active', name: 'Active'},
        { value: 'InActive', name: 'InActive' }
    ];
    const LocationOpt : {value: string;
        name: string;}[] = [
        { value: 'default', name: 'Location' },
        { value: 'US', name: 'US' },
        { value: 'UK', name: 'UK' },
        { value: 'Hyderabad', name: 'Hyderabad'}
    ];
    const DepartmentOpt : {value: string;
        name: string;}[] = [
        { value: 'default', name: 'Department' },
        { value: 'IT', name: 'IT' },
        { value: 'PE', name: 'PE' }
    ];
    type Option = {
        value: string;
        name: string;
    };

    (function(){
        createSelect("status", statusOpt);
        createSelect("location", LocationOpt);
        createSelect("department", DepartmentOpt);
    })();

    //  sidebar functionality
    function openSidebar() : void{
        const sideBar = document.querySelector(".sidebar") as HTMLElement;
        sideBar.style.display = "block";
        sideBar.style.width = "15%";
        const mainContainer = document.getElementById("mainBody") as HTMLElement;
        mainContainer.style.width = "85%";
        const miniIcon = document.querySelector(".minimised-icons") as HTMLElement;
        miniIcon.style.display = "none";
        rotateImage();           
    }

    function rotateImage(): void {
        var handle_icon = document.querySelector('.handle-icon') as HTMLElement;
        if(sidebar_var)
            handle_icon.style.rotate = '180deg';
        else
            handle_icon.style.rotate = '0deg';
    }

    function closeSidebar() : void{
        const sideBar = document.querySelector(".sidebar") as HTMLElement;
        const mainContainer = document.getElementById("mainBody") as HTMLElement;
        mainContainer.style.width = "100%";
        const miniIcon = document.querySelector(".minimised-icons") as HTMLElement;
        miniIcon.style.display = "flex";
        miniIcon.style.flexDirection = "column";
        sideBar.style.display = "none";
        rotateImage();
    }

    function sideBar() : void{
        if(sidebar_var == false){
            openSidebar();
        }else{
            closeSidebar();
        }
        sidebar_var = !sidebar_var;
    }

    // Employee dropdown in Employee
    function empInfo() : void{
        if(empDropDown_var == true){ //Open employee innerlist
            const emp = document.querySelector(".all-list") as HTMLElement;
            emp.style.display = "block";  
        }
        else{ //Close epmloyee
            const emp = document.querySelector(".all-list") as HTMLElement;
            emp.style.display = "none"; 
        }
        empDropDown_var = !empDropDown_var;
    }

    //exporting the table data to csv 
    function exportData() {
        if(!tableBody){
            toastr("table Body is empty", 3000);
            return;
        }
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
    function filterBar() : void{
        if(filterBar_var == true){  //Closing the filter bar
            const filterBar = document.querySelector(".filter") as HTMLElement;
            filterBar.style.display = "none";
        }
        else{ //Opening the filter bar
            const filterBar = document.querySelector(".filter") as HTMLElement;
            filterBar.style.display = "flex";
        }
        filterBar_var = !filterBar_var;
    }

    // Dropdown in Add roles
    function dropDown() : void{
        if(rolesDropDown_var == true){  //Opening Dropdown
            const dropDown = document.querySelector(".dropdown") as HTMLElement;
            dropDown.style.display = "block";
        }
        else{ //Closing Dropdown
            const dropDown = document.querySelector(".dropdown") as HTMLElement;
            dropDown.style.display = "none";
        }
        rolesDropDown_var = !rolesDropDown_var;
    }

    //cancel in addemployee 
    function cancel(){
        window.history.back(); 
    }

    //creating select and options
    function createSelect(label: string, options: Option[]){
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
    function sortColumn(col : number) {
        if(!tableBody){
            toastr("Table Not found",3000);
            return;
        }
        const rows = Array.from(tableBody.querySelectorAll('tr'));

        if(!sortOrders[col] || sortOrders[col] == 'desc'){
            rows.sort((a, b) => {
                const cellA = (a.cells[col].textContent || '').trim();
                const cellB = (b.cells[col].textContent || '').trim();
                if(isNaN(Number(cellA)) && isNaN(Number(cellB))){
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
                const cellA = (a.cells[col].textContent || '').trim();
                const cellB = (b.cells[col].textContent || '').trim();
                if(isNaN(Number(cellA)) && isNaN(Number(cellB))){
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


    class Employee{
        empNo: number;
        firstName: string;
        lastName: string;
        dob: Date;
        email:string;
        mobileNumber:number;
        joinDate: Date;
        location: string;
        role: string;
        department: string;
        manager: string;
        project: string;
        status: string;
        profileImg:string
    
        constructor(empNo: number, firstName: string, lastName: string, dob: Date, email: string, mobileNumber: number, joinDate: Date, location: string, 
            role: string, department: string, manager: string, project: string, status: string = "Active", profileImg: string){
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
    }

    function validateEmpNo(empNum: number): boolean {
        return empNum > 0;
    }

    function validateEmail(mail: string): boolean {
        return mail.includes("@") && mail.includes(".");
    }

    function validateMobileNumber(num: number) : boolean {
        const numStr: string = num.toString();
        return !isNaN(num) && numStr.length === 10;
    }

    function validateFName(fname: string) : boolean{
        return fname.length > 0;
    }

    function validateLName(lname: string) : boolean{
        return lname.length > 0;
    }

    function addEmployee(){
        const empNo = parseInt((document.getElementById('empNum')as HTMLInputElement).value);
        const firstName = (document.getElementById('fname')as HTMLInputElement).value;
        const lastName = (document.getElementById('lname')as HTMLInputElement).value;
        const dob = new Date((document.getElementById('dob')as HTMLInputElement).value);
        const email = (document.getElementById('mail')as HTMLInputElement).value;
        const mobileNumber = parseInt((document.getElementById('number')as HTMLInputElement).value);
        const joinDate = new Date((document.getElementById('jdate')as HTMLInputElement).value);
        const location = (document.getElementById('location')as HTMLSelectElement).value;
        const role = (document.getElementById('Role')as HTMLSelectElement).value;
        const department = (document.getElementById('department')as HTMLSelectElement).value;
        const manager = (document.getElementById('manager')as HTMLSelectElement).value;
        const project = (document.getElementById('project')as HTMLSelectElement).value;
        const profileImg = (document.getElementById('profileImg')as HTMLImageElement).src;
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
        
        
        const employee = new Employee(empNo, firstName, lastName, dob, email, mobileNumber, joinDate, location, 
            role, department, manager, project, status, profileImg);

        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));
        toastr("Added new employee successfully", 3000, "#E7F4E8");
        window.setTimeout(function(){
            window.location.href = "/employee.html";
        }, 3000);
    }

    function toastr(msg : string, duration: number, color="#FDE9E9"){
        const toastrContainer = document.querySelector('#toasterSection') as HTMLElement;
        toastrContainer.classList.add('toaster-section');
        toastrContainer.style.backgroundColor = color;
        const toasterContent = document.createElement('div') as HTMLDivElement;
        toasterContent.textContent = msg;
        toastrContainer.appendChild(toasterContent);

        setTimeout(() => {
            toastrContainer.removeChild(toasterContent);
            if (toastrContainer.children.length === 0) {
                toastrContainer.classList.remove('toaster-section');
            }
        }, duration);
    }

    // displaying of the entire table data
    function displayAllData(){
        const tableBody = document.getElementById('tBody') as HTMLElement;
        tableBody ? tableBody.innerHTML = '': "";
    
        employees.forEach((employee : Employee) => {
            const profileImgSrc = employee.profileImg;
            const row = createRow(employee, profileImgSrc ? profileImgSrc : 'assets/images/man-profile.png');
            tableBody?.appendChild(row);
        });
    }

    //creating row
    function createRow(employee : Employee, profileImgSrc: string){
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
        const profileInput = document.getElementById('uploadInput') as HTMLInputElement;
        const profileImg = document.getElementById('profileImg') as HTMLImageElement;
        if (profileInput.files && profileInput.files[0]) {
            var reader = new FileReader();
            let profileImgSrc;
            reader.onload = function(e) {
                if(e && e.target){
                    profileImgSrc = e.target?.result as string;
                    profileImg.setAttribute('src', profileImgSrc);
                }
            }
            reader.readAsDataURL(profileInput.files[0]);
        }
    }

    function createUser(employee: Employee, profileImgSrc: string){
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

    function createLoc(text: string){
        const data = document.createElement('td');
        data.innerText = text;
        return data;
    }

    function createEmpId(text: number){
        const data = document.createElement('td');
        data.setAttribute('id', "empId");
        data.innerText = text.toString();
        return data;
    }

    function createStatus(text: string){
        const data = document.createElement('td');
        const btn = document.createElement('button');
        btn.textContent = text;
        data.appendChild(btn);
        return data;
    }

    function createJdate(text: Date){
        const data = document.createElement('td');
        data.textContent = (text).toDateString();
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

    function moreOpt(event: MouseEvent){
        const dot = (event.target as HTMLElement).nextElementSibling;
        if(dot){
            if(opt_var == true){
                dot.classList.add('more-opt');
                (dot as HTMLElement).style.display = "block";
            }
            else{
                (dot as HTMLElement).style.display = "none";
            }
            opt_var = !opt_var;
        }
    }

    function alpha(l: string){
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
        var stat = (document.querySelector('select[name="status"]')as HTMLSelectElement).value;
        var loc = (document.querySelector('select[name="location"]')as HTMLSelectElement).value;
        var dept = (document.querySelector('select[name="department"]')as HTMLSelectElement).value;
        var filteredData = [];

        const allButtons = document.querySelectorAll('.alphabet-content button');
        allButtons.forEach(button => {
            button.classList.remove('active');
        });

        filteredData = employees.filter((emp: Employee) => {
            if(stat == "default"){
                return emp;
            }
            else{
                return emp.status == stat;
            }
        });

        filteredData = filteredData.filter((emp: Employee) => {
            if(loc == "default"){
                return emp;
            }
            else{
                return emp.location == loc;
            }
        });

        filteredData = filteredData.filter((emp: Employee) => {
            if(dept == "default"){
                return emp;
            }
            else{
                return emp.department == dept;
            }
        });

        filteredData = filteredData.filter((emp: Employee) => {
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
        (document.querySelector('select[name="status"]')as HTMLSelectElement).selectedIndex = 0;
        (document.querySelector('select[name="location"]') as HTMLSelectElement).selectedIndex = 0;
        (document.querySelector('select[name="department"]')as HTMLSelectElement).selectedIndex = 0;
        displayAllData();

        const allButtons = document.querySelectorAll('.alphabet-content button');
        allButtons.forEach(button => {
            button.classList.remove('active');
        });
    }

    function displayFilterData(filteredData: Employee[]) {
        const tableBody = document.getElementById('tBody') as HTMLElement;
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

    function deleteButtonCheck(checkbox: HTMLInputElement) {
        const deleteOpt = document.querySelector('.delete-btn button');
        if (checkbox.checked) {
            (deleteOpt as HTMLElement).style.backgroundColor = '#F44848';
        } else {
            const check = document.querySelectorAll('input[type = "checkbox"]:checked').length > 0;
            if (!check) {
                (deleteOpt as HTMLElement).style.backgroundColor = '#F89191';
            }
        }
    }

    function deleteCheckedRows() {
        const tableBody = document.getElementById('tBody') as HTMLElement;
        const box = tableBody.querySelectorAll('input[type="checkbox"]:checked');

        box.forEach(checkbox => {
            const tabrow = checkbox.closest('.table-data') as HTMLElement;
            const empidSelector = tabrow.querySelector('#empId') as HTMLElement;
            const empidText = empidSelector.textContent;
            if(empidText)
            {
                const empid = parseInt(empidText);
                if(!isNaN(empid)){
                    const index = employees.findIndex((emp: Employee) => emp.empNo == empid);
                    if (index !== -1) {
                        employees.splice(index, 1);
                        tabrow.remove();
                        localStorage.setItem('employees', JSON.stringify(employees));
                    }
                }
            }
            
        });

        const deleteOpt = document.querySelector('.delete-btn button');
        (deleteOpt as HTMLElement).style.backgroundColor = '#F89191';
    }


    return {
        sideBar, empInfo, filterBar, dropDown,exportData, cancel, createSelect, sortColumn, addEmployee, displayAllData, 
        storeImage, alpha, applyFilter, resetFilter, deleteButtonCheck, deleteCheckedRows
    };    
})();