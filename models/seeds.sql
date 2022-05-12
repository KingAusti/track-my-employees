USE employees;
--prepopulated departments table
INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');
-- prepopulated roles table
INSERT INTO role (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 1),
    ('Sales Person', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);
--prepopulated employees table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Dont', 1, NULL),
    ('Ethan', 'Hunt', 2, 1),
    ('Ashley', 'Redfield', 3, NULL),
    ('Kevin', 'Malone', 4, 3),
    ('Brad', 'Bradson', 5, NULL),
    ('Malia', 'OConner', 6, 5),
    ('Eyeyam', 'Lorde', 7, NULL),
    ('Paul', 'Allen', 8, 7);