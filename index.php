<!DOCTYPE html>
<html lang="en">
	<!--
		Log in page for canvas api
	-->
<head>
	<title>Canvas API - Login</title>
	<meta charset="utf-8">
	<meta name="description" content="A website that uses the canvas api and my student access token to display canvas information" >
    <meta name="keywords" content="Clark, Canvas, API" >
    <meta name="author" content="Chris McGuire">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- CSS -->
	<link href="css/reset.css" rel="stylesheet">
	<link href="css/index.css" rel="stylesheet">
	<!-- GOOGLE FONTS -->
	<link href="https://fonts.googleapis.com/css?family=Arimo" rel="stylesheet">
	<!-- JQUERY -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
	<div id="wrapper">
		<header>
			<h1>Canvas API</h1>
			<h2>Welcome to the Canvas API</h2>
		</header>
		<!-- Login form -->
		<form method="POST" action="includes/login.php" id="loginForm">
			<h3>Sign In</h3>
			<label for="userIdInput">Student ID Number</label>
			<input type="text" name="userId" id="userIdINput">
			<label for="userPasswordInput">Password</label>
			<input type="text" name="password" id="userPasswordInput">
			<input type="submit" value="Login" name="login" class="formSubmit">
		</form>
		<!-- Create account form -->
		<form method="POST" action="includes/create_user.php" id="newUserForm">
			<h3>Create Account</h3>
			<label for="createIdInput">Student ID Number</label>
			<input type="text" name="userId" id="createIdINput">
			<label for="createPasswordInput">Password</label>
			<input type="text" name="password" id="createPasswordInput">
			<label for="apiKeyInput">API Key</label>
			<input type="text" name="apiKey" id="apiKeyInput">
			<input type="submit" value="Create" name="create" class="formSubmit">
		</form>
	</div>
</body>
</html>