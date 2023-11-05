INSERT INTO department (name)
VALUES
    ("Information Technology"),
    ("Human Resources"),
    ("Development"),
    ("Project Management");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Network Manager", 120000, 1),
    ("Head of Cyber Security", 150000, 1),
    ("Technical Assistance", 70000, 1),
    ("Employment Specialist", 80000, 2),
    ("Human Resources Manager", 90000, 2),
    ("Employee Relations Manager", 90000, 2),
    ("Developer", 100000, 3),
    ("Senior Developer", 130000, 3),
    ("Team Leader", 150000, 4),
    ("Scrum Master", 100000, 4),
    ("Product Owner", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Patricia", "Santos", 1, NULL),
    ("Jonathan", "Espinoza", 2, NULL),
    ("Ricardo", "Marciano", 3, 1),
    ("Matthew", "Towe", 4, 5),
    ("Richard", "Johnson", 5, NULL),
    ("Beatrice", "Wang", 6, NULL),
    ("Margaret", "Johnson", 7, 9),
    ("William", "Jefferson", 8, 9),
    ("Benjamin", "Shetye", 9, NULL),
    ("Robert", "Thomas", 10, NULL),
    ("Gabriel", "Matagrano", 11, 9),
    ("George", "Matagrano", 7, 9),
    ("Gianni", "Matagrano", 8, 9);
