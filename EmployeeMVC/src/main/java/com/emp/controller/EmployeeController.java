package com.emp.controller;

import com.emp.model.Employee;
import com.emp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // HOME — show welcome page
    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("message", "Welcome to Employee Management System");
        return "home";  // → WEB-INF/views/home.jsp
    }

    // LIST — show all employees
    @GetMapping("/list")
    public String listEmployees(Model model) {
        model.addAttribute("employees", employeeService.getAllEmployees());
        return "employeeList";  // → WEB-INF/views/employeeList.jsp
    }

    // DETAIL — show single employee by id
    @GetMapping("/detail/{id}")
    public String employeeDetail(@PathVariable int id, Model model) {
        Employee emp = employeeService.getEmployeeById(id);
        if (emp != null) {
            model.addAttribute("employee", emp);
        } else {
            model.addAttribute("error", "Employee not found with id: " + id);
        }
        return "employeeDetail";  // → WEB-INF/views/employeeDetail.jsp
    }

    // FORM — show add employee form
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("employee", new Employee());
        return "addEmployee";
    }

    // SAVE — handle form submission
    @PostMapping("/save")
    public String saveEmployee(@ModelAttribute Employee employee) {
        employeeService.addEmployee(employee);
        return "redirect:/employee/list";  // redirect after save
    }
}