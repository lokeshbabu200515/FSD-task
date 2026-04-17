<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Add Employee</title>
    <style>
        body   { font-family: Arial, sans-serif; padding: 30px;
                 background: #f0f4f8; }
        .form  { background: white; max-width: 400px; margin: auto;
                 padding: 30px; border-radius: 10px; }
        h2     { color: #2c3e50; text-align: center; }
        label  { display: block; margin-top: 15px;
                 font-weight: bold; color: #7f8c8d; }
        input  { width: 100%; padding: 10px; margin-top: 5px;
                 border: 1px solid #ddd; border-radius: 6px;
                 box-sizing: border-box; }
        button { width: 100%; margin-top: 20px; padding: 12px;
                 background: #2ecc71; color: white; border: none;
                 border-radius: 6px; font-size: 16px; cursor: pointer; }
        a      { display: block; text-align: center;
                 margin-top: 10px; color: #3498db; }
    </style>
</head>
<body>
    <div class="form">
        <h2>Add New Employee</h2>
        <form action="${pageContext.request.contextPath}/employee/save"
              method="post">
            <label>ID</label>
            <input type="number" name="id" required />
            <label>Name</label>
            <input type="text" name="name" required />
            <label>Department</label>
            <input type="text" name="department" required />
            <label>Salary</label>
            <input type="number" name="salary" required />
            <button type="submit">Save Employee</button>
        </form>
        <a href="${pageContext.request.contextPath}/employee/list">
            Back to List
        </a>
    </div>
</body>
</html>
 