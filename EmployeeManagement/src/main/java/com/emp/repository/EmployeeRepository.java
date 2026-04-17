package com.emp.repository;

import com.emp.model.Employee;
import java.util.List;

public interface EmployeeRepository {
    void addEmployee(Employee emp);
    Employee getEmployee(int id);
    List<Employee> getAllEmployees();
    void updateEmployee(Employee emp);
    void deleteEmployee(int id);
}