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
    roles.title AS job_title, 
    roles.salary AS Salary,
    department.name, 
    CONCAT(manager.first_name, " ", manager.last_name) AS Manager_Name
    FROM employee 
    JOIN roles ON roles.id = employee.role_id
    JOIN department ON department.id = roles.department_id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
    
    db.query(viewEmployees, (err, res) => {
      
        if (err) {
    
            throw err;
      
        } else {
    
        console.log('\n \n All Employees: ');
        console.table(res);
        promptUser();
    
        }
    
    });

};

const viewRoles = () => {
    
    let viewRoles = `SELECT 
    roles.id, 
    title, 
    name, 
    salary 
    FROM roles
    JOIN department ON department.id = roles.department_id`
    
    db.query(viewRoles, (err, results) => {
    
        if (err) {
    
            throw err;
    
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
    
            throw err;
    
        } else {

            console.log('\n \n All Departments:');
    
            console.table(results);
    
            promptUser();
    
        }
    
    })
  
};

const addEmployee = () => {

    let roleQuery = "SELECT * FROM roles";

    db.query(viewRolesQuery, (err, res) => {

        if (err){
            throw err;
        } else{

            const roles = res.map(roles => roles.title);


            const managerQuery =  'SELECT * FROM employee';

            db.query(viewRolesQuery, (err, manRes) => {

                if (err){
                    throw err;
                } else{
        
                    const managers = manRes.map(employee => employee.first_name);

                    inquirer.prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Input employee first name: ",
                            valdate: firstName => {
                               
                                if (firstName) {
                               
                                    return true;
                               
                                } else {
                               
                                    console.log('Invalid first name.');
                               
                                    return false;

                                }
                            }
                        }, 
                        {
                            type: "input",
                            name: "lastName",
                            message: "Input employee last name: ",
                            valdate: lastName => {
                               
                                if (lastName) {
                               
                                    return true;
                               
                                } else {
                               
                                    console.log('Invalid last name.');
                               
                                    return false;

                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: "Assign employee's role: ",
                            choices: roles
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Assign employee's manager: ",
                            choices: managers
                        }

                    ]).then ((answers) => {
                        const { firstName, lastName, role, manager } = answers;
                        const insertEmployeeQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';

                        const roleID = res.find(result => result.title === roles).id;                        
                        const managerID = manRes.find(result => result.first_name === manager).id;
                        
                        const values = [firstName, lastName, roleID, managerID];

                        db.query(insertEmployeeQuery, values, (err, insertResult) => {
                        
                            if (err) {
                        
                                throw err;
                        
                            } else {
                        
                                console.log(`${firstName} ${lastName} added to employee database.`);
                        

                                viewEmployees();
                        
                            }
                       
                        });
                    
                    });
    
                }
            });

        }

    });

};

const updateEmployee = () => {



};

const addRole = () => {

    let viewDeptsQuery = 'SELECT * FROM department';

    db.query(viewDeptsQuery, (err, deptResults) => {
        
        if (err) {
        
            throw err
        
        } else {

        
            const deptArray = deptResults.map(department => department.name);
        
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Input role name: ',
                    validate: roleName => {
                    
                        if (roleName) {
                    
                            return true;
                    
                        } else {
                    
                            console.log('Invalid role name.');
                    
                            return false;
                    }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Input job role salary: ',
                    validate: salary => {
                    
                        if (salary) {
                    
                            return true;
                    
                        } else {
                    
                            console.log('Invalid salary.');
                    
                            return false;
                    
                        }
                    
                    }
                }, 
                {
                    type: 'list',
                        name: 'dept',
                        message: "Assign role department: ",
                        choices: deptArray
                }

            ]).then((answers) => {
                const { roleName, salary, dept } = answers;
                const insertRoleQuery = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';

                const deptID = deptResults.find(result => result.name === dept).id;
                
                const values = [roleName, salary, deptID];

                db.query(insertRoleQuery, values, (err, insertResult) => {
                    
                    if (err) {
                    
                        throw err;

                    } else {
    
                        console.log(`${roleName} added to roles database.`);

                        viewRoles();
    
                    }
    
                });
    
            });
 
        }   
    });

};

const addDept = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Input department name: ',
            validate: deptName => {
            
                if (deptName) {
            
                    return true;
            
                } else {
            
                    console.log('Please enter a valid department name.');
            
                    return false;
            
                }
            
            }
        
        }
    ]).then((answers) => {
     
        const { deptName } = answers;
     
        const insertDeptNameQuery = 'INSERT INTO department (name) VALUES (?)';
     
        const values = [deptName];

     
        db.query(insertDeptNameQuery, values, (err, insertResult) => {
     
            if (err) {
     
                throw err;
     
            } else {
     
                console.log(`${deptName} added to department database.`);
     
                viewDepts();
     
            }
     
        });
    
    });

};

promptUser();