<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Employee MVC</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center;
               background: #f0f4f8; padding: 50px; }
        h1   { color: #2c3e50; }
        .btn { display: inline-block; margin: 10px; padding: 12px 24px;
               background: #3498db; color: white; text-decoration: none;
               border-radius: 6px; font-size: 16px; }
        .btn:hover { background: #2980b9; }
    </style>
</head>
<body>
    <h1>Employee Management System</h1>
    <p>${message}</p>
    <a class="btn" href="${pageContext.request.contextPath}/employee/list">
        View All Employees
    </a>
    <a class="btn" href="${pageContext.request.contextPath}/employee/add">
        Add Employee
    </a>
</body>
</html>