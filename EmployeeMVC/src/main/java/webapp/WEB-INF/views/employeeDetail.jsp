<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Employee Detail</title>
    <style>
        body  { font-family: Arial, sans-serif; padding: 30px;
                background: #f0f4f8; }
        .card { background: white; max-width: 400px; margin: auto;
                padding: 30px; border-radius: 10px; }
        h2    { color: #2c3e50; text-align: center; }
        .row  { display: flex; justify-content: space-between;
                padding: 10px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #7f8c8d; }
        .error { color: red; text-align: center; }
        a     { display: block; text-align: center; margin-top: 20px;
                padding: 10px; background: #3498db; color: white;
                border-radius: 6px; text-decoration: none; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Employee Detail</h2>
        <c:if test="${not empty error}">
            <p class="error">${error}</p>
        </c:if>
        <c:if test="${not empty employee}">
            <div class="row">
                <span class="label">ID</span>
                <span>${employee.id}</span>
            </div>
            <div class="row">
                <span class="label">Name</span>
                <span>${employee.name}</span>
            </div>
            <div class="row">
                <span class="label">Department</span>
                <span>${employee.department}</span>
            </div>
            <div class="row">
                <span class="label">Salary</span>
                <span>${employee.salary}</span>
            </div>
        </c:if>
        <a href="${pageContext.request.contextPath}/employee/list">
            Back to List
        </a>
    </div>
</body>
</html>