package com.emp.repository;

import com.emp.model.Employee;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class EmployeeRepositoryImpl implements EmployeeRepository {

    // In-memory storage
    private Map<Integer, Employee> employeeStore = new HashMap<>();

    @Override
    public void addEmployee(Employee emp) {
        employeeStore.put(emp.getId(), emp);
        System.out.println("✅ Added: " + emp);
    }

    @Override
    public Employee getEmployee(int id) {
        return employeeStore.getOrDefault(id, null);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return new ArrayList<>(employeeStore.values());
    }

    @Override
    public void updateEmployee(Employee emp) {
        if (employeeStore.containsKey(emp.getId())) {
            employeeStore.put(emp.getId(), emp);
            System.out.println("✏️  Updated: " + emp);
        } else {
            System.out.println("❌ Employee not found: id=" + emp.getId());
        }
    }

    @Override
    public void deleteEmployee(int id) {
        if (employeeStore.remove(id) != null) {
            System.out.println("🗑️  Deleted employee id=" + id);
        } else {
            System.out.println("❌ Employee not found: id=" + id);
        }
    }
}