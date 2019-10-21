CREATE TABLE departments (
  id INT(11) NOT NULL,
  name VARCHAR(40) NOT NULL,
  id_employee INT(11),
  city VARCHAR(40) NOT NULL,
  CONSTRAINT fk_id_employee FOREIGN KEY(id_employee) REFERENCES employees(id)

);



ALTER TABLE departments 
  ADD PRIMARY KEY (id);