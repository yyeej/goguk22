document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
  
      if (username === "daesang" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        alert("로그인 성공!");
        window.location.href = "index.html";
      } else {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    });
  });
  