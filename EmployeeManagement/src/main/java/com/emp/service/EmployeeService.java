package com.emp.service;

import com.emp.model.Employee;
import java.util.List;

public interface EmployeeService {
    void hire(Employee emp);
    Employee findById(int id);
    List<Employee> listAll();
    void updateDetails(Employee emp);
    void fire(int id);
}