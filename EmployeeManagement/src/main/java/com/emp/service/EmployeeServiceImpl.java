package com.emp.service;

import com.emp.model.Employee;
import com.emp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Autowired  // Spring injects EmployeeRepositoryImpl here automatically
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
        System.out.println("🔧 EmployeeServiceImpl bean created — DI done!");
    }

    @Override
    public void hire(Employee emp) {
        System.out.println("\n--- Hiring ---");
        employeeRepository.addEmployee(emp);
    }

    @Override
    public Employee findById(int id) {
        Employee emp = employeeRepository.getEmployee(id);
        if (emp == null) System.out.println("❌ Not found: id=" + id);
        return emp;
    }

    @Override
    public List<Employee> listAll() {
        return employeeRepository.getAllEmployees();
    }

    @Override
    public void updateDetails(Employee emp) {
        System.out.println("\n--- Updating ---");
        employeeRepository.updateEmployee(emp);
    }

    @Override
    public void fire(int id) {
        System.out.println("\n--- Firing ---");
        employeeRepository.deleteEmployee(id);
    }
}