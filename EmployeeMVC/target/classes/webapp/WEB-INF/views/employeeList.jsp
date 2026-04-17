<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Employee List</title>
    <style>
        body  { font-family: Arial, sans-serif; padding: 30px;
                background: #f0f4f8; }
        h2    { color: #2c3e50; }
        table { width: 100%; border-collapse: collapse;
                background: white; }
        th    { background: #3498db; color: white; padding: 12px; }
        td    { padding: 10px; border-bottom: 1px solid #ddd;
                text-align: center; }
        tr:hover { background: #eaf4fb; }
        a     { color: #3498db; text-decoration: none; font-weight: bold; }
        .back { display: inline-block; margin-top: 20px; padding: 10px 20px;
                background: #2ecc71; color: white; border-radius: 6px; }
    </style>
</head>
<body>
    <h2>All Employees</h2>
    <table>
        <tr>
            <th>ID</th><th>Name</th><th>Department</th>
            <th>Salary</th><th>Action</th>
        </tr>
        <c:forEach var="emp" items="${employees}">
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>
                <a href="${pageContext.request.contextPath}/employee/detail/${emp.id}">
                    View
                </a>
            </td>
        </tr>
        </c:forEach>
    </table>
    <a class="back" href="${pageContext.request.contextPath}/employee/home">
        Back to Home
    </a>
</body>
</html>