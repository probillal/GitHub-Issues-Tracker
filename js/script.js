//check login
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    alert("login success");
    window.location.assign("/dashboard.html");
  } else {
    alert("Invalid Credentials");
  }
}
