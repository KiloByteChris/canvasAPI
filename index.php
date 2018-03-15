<!DOCTYPE html>
<html lang="en">
	<!--
		Log in page for canvas api
	-->
<header>
	<title>Canvas API - Login</title>
	<meta charset="utf-8">
	<!-- CSS -->
	<link href="css/reset.css" rel="stylesheet">
	<link href="css/index.css" rel="stylesheet">
	<!-- JQUERY -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</header>
<body>
	<form method="POST" action="includes/login.php" id="loginForm">
		<label for="userIdInput">Student ID Number</label>
		<input type="text" name="userId" id="userIdINput">
		<label for="userPasswordInput">Password</label>
		<input type="text" name="password" id="userPasswordInput">
		<input type="submit" value="login" name="login">
	</form>

	<form method="POST" action="includes/create_user.php" id="newUserForm">
		<label for="createIdInput">Student ID Number</label>
		<input type="text" name="userId" id="createIdINput">
		<label for="createPasswordInput">Password</label>
		<input type="text" name="password" id="createPasswordInput">
		<label for="apiKeyInput">API Key</label>
		<input type="text" name="apiKey" id="apiKeyInput">
		<input type="submit" value="Create" name="create">
	</form>
</body>
</html>