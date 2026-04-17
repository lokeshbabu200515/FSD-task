package com.emp;

import com.emp.model.Employee;
import com.emp.service.EmployeeService;
import com.emp.service.EmployeeServiceImpl;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {
    public static void main(String[] args) {

        // BeanFactory loads beans from XML config
        BeanFactory factory = new ClassPathXmlApplicationContext("applicationContext.xml");

        System.out.println("\n====== Employee Management System ======\n");

        // Spring auto-injects EmployeeRepositoryImpl into EmployeeServiceImpl
        EmployeeService service = factory.getBean(EmployeeServiceImpl.class);

        // ADD
        service.hire(new Employee(1, "Alice",   "Engineering", 85000));
        service.hire(new Employee(2, "Bob",     "Marketing",   72000));
        service.hire(new Employee(3, "Charlie", "HR",          65000));
        service.hire(new Employee(4, "Diana",   "Engineering", 90000));

        // LIST ALL
        System.out.println("\n--- All Employees ---");
        service.listAll().forEach(System.out::println);

        // FIND
        System.out.println("\n--- Find id=2 ---");
        System.out.println(service.findById(2));

        // UPDATE
        service.updateDetails(new Employee(2, "Bob Smith", "Marketing", 78000));

        // DELETE
        service.fire(3);

        // LIST AFTER CHANGES
        System.out.println("\n--- After Update & Delete ---");
        service.listAll().forEach(System.out::println);

        // FIND DELETED
        System.out.println("\n--- Try finding deleted id=3 ---");
        service.findById(3);

        ((ClassPathXmlApplicationContext) factory).close();
    }
}