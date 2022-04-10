INSERT INTO department (name)
VALUES
    ('Management'),
    ('Electronics'),
    ('Tools'),
    ('Kitchen'),
    ('Pharmacy');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Store Manager', 80000.00, 1),
    ('Department Head', 50000.00, 1),
    ('TV Salesperson', 25000.00, 2),
    ('Phone Salesperson', 25000.00, 2),
    ('Tools Salesperson', 25000.00, 3),
    ('Tools Servicer', 30000.00, 3),
    ('Kitchen Salesperson', 25000.00, 4),
    ('Appliance Repairman', 40000.00, 4),
    ('Pharmacist', 75000,00, 5),
    ('Pharmacy Cashier', 38000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Fraser', 1, NULL),
    ('Jack', 'London', 2, 1),
    ('Robert', 'Bruce', 3, 2),
    ('Peter', 'Greenaway', 3, 2),
    ('Derek', 'Jarman', 4, 2),
    ('Paolo', 'Pasolini', 4, 2),
    ('Heathcote', 'Williams', 2, 1),
    ('Sandy', 'Powell', 5, 7),
    ('Emil', 'Zola', 5, 7),
    ('Sissy', 'Coalpits', 6, 7),
    ('Antoinette', 'Capet', 6, 7),
    ('Samuel', 'Delany', 2, 1),
    ('Tony', 'Duvert', 7, 12),
    ('Dennis', 'Cooper', 7, 12),
    ('Monica', 'Bellucci', 8, 12),
    ('Samuel', 'Johnson', 8, 12),
    ('John', 'Dryden', 2, 1),
    ('Alexander', 'Pope', 9, 17),
    ('Lionel', 'Johnson', 9, 17),
    ('Aubrey', 'Beardsley', 10, 17),
    ('Tulse', 'Luper', 10, 17);