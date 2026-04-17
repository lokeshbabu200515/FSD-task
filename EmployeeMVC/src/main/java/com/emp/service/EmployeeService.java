package com.emp.service;

import com.emp.model.Employee;
import org.springframework.stereotype.Service;
import java.util.*;

@Service  // Spring manages this as a bean
public class EmployeeService {

    // In-memory employee store
    private Map<Integer, Employee> employeeMap = new HashMap<>();

    public EmployeeService() {
        // Pre-loaded sample data
        employeeMap.put(1, new Employee(1, "Alice",   "Engineering", 85000));
        employeeMap.put(2, new Employee(2, "Bob",     "Marketing",   72000));
        employeeMap.put(3, new Employee(3, "Charlie", "HR",          65000));
        employeeMap.put(4, new Employee(4, "Diana",   "Engineering", 90000));
    }

    public List<Employee> getAllEmployees() {
        return new ArrayList<>(employeeMap.values());
    }

    public Employee getEmployeeById(int id) {
        return employeeMap.get(id);
    }

    public void addEmployee(Employee emp) {
        employeeMap.put(emp.getId(), emp);
    }
}