const db = require("./server");

const inquirer = require("inquirer");

const promptUser = () =>{
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "mainMenu",
            choices: [

                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                
                "View All Roles",
                "Add Role",

                "View All Departments",
                "Add Department",

                "Exit"
                
            ]
        }
    ])
    .then((answers) => {
        const { mainMenu } = answers;

        switch ( mainMenu ) {

            case "View All Employees":
                viewEmployees();
            case "Add Employee":
                addEmployee();
            case "Update Employee Role":
                updateEmployee();
            case "View All Roles":
                viewRoles();
            case "Add Role":
                addRole();
            case "View All Departments":
                viewDepts();
            case "Add Department":
                addDept();
            case "Exit":
                console.log("Exiting now. Thank you.");
                process.exit(0);

        }
    });
}

const viewEmployees = () => {
    
    let viewEmployees = `SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title AS job_title, 
    role.salary AS Salary,
    department.name, 
    CONCAT(manager.first_name, " ", manager.last_name) AS Manager_Name
    FROM employee 
    JOIN role ON role.id = employee.role_id
    JOIN department ON department.id = role.department_id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
    
    db.query(viewEmployees, (err, res) => {
      
        if (err) {
    
            throw err
      
        } else {
    
        console.log('\n \n All Employees: ');
        console.table(res);
        promptUser();
    
        }
    
    });

};

const viewRoles = () => {
    
    let viewRoles = `SELECT 
    role.id, 
    title, 
    name, 
    salary 
    FROM role 
    JOIN department ON department.id = role.department_id`
    
    db.query(viewRoles, (err, results) => {
    
        if (err) {
    
            throw err
    
        } else {
    
            console.log('\n \n All Roles:');
    
            console.table(results);
    
            promptUser();
    
        }
    
    });
  
};

const viewDepts = () => {
    
    let viewDepts = 'SELECT id, name AS Department_Name FROM department'
    
    db.query(viewDepts, (err, results) => {
    
        if ((err)) {
    
            throw err
    
        } else {

            console.log('\n \n All Departments:');
    
            console.table(results);
    
            promptUser();
    
        }
    
    })
  
};

const addEmployee = () => {



}

const updateEmployee = () => {



}

const addRole = () => {



}

const addDept = () => {



}

promptUser();