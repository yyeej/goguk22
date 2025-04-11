let qaData = [];
  
  let isLoggedIn = localStorage.getItem("loggedIn") === "true";
  let currentCategory = null;
  
  document.addEventListener("DOMContentLoaded", () => {
    const questionList = document.getElementById("questionList");
    const categories = document.querySelectorAll(".category");
    const loginBtn = document.getElementById("adminLoginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const adminPanel = document.getElementById("adminPanel");
  
    if (isLoggedIn) {
      adminPanel.style.display = "block";
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    } else {
      adminPanel.style.display = "none";
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
    }
  
    categories.forEach(btn => {
      btn.addEventListener("click", () => {
        const selectedCategory = btn.dataset.category;
        currentCategory = selectedCategory;
        showQuestions(currentCategory);
      });
    });
  
    loginBtn?.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  
    logoutBtn?.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.reload();
    });
  
    const addForm = document.getElementById("addForm");
    if (addForm) {
        addForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!isLoggedIn) return;
          
            const q = document.getElementById("newQuestion").value.trim();
            const a = document.getElementById("newAnswer").value.trim();
            const img = document.getElementById("newImageUrl").value.trim();
            const c = document.getElementById("newCategory").value;
          
            if (q && a && c) {
              qaData.push({ question: q, answer: a, image: img, category: c });
              alert("질문이 추가되었습니다.");
              
              // 입력값 초기화
              document.getElementById("newQuestion").value = "";
              document.getElementById("newAnswer").value = "";
              document.getElementById("newImageUrl").value = "";
              document.getElementById("newCategory").value = "";
              imagePreview.style.display = "none";
              imagePreview.src = "";
          
              if (currentCategory === c) {
                showQuestions(currentCategory);
              }
            }
          });
                    
    }
  });
  
  function showQuestions(category) {
    const questionList = document.getElementById("questionList");
    questionList.innerHTML = "";
    const filtered = qaData.filter(q => q.category === category);
  
    if (filtered.length === 0) {
      questionList.innerHTML = "<p>질문이 없습니다.</p>";
      return;
    }
  
    filtered.forEach((q, index) => {
      const item = document.createElement("div");
      item.className = "question-item";
  
      item.innerHTML = `
        <details>
          <summary>${q.question}</summary>
          <p>${q.answer}</p>
          ${q.image ? `<img src="${q.image}" alt="첨부 이미지" style="max-width:100%; margin-top: 0.5rem;" />` : ""}
          ${isLoggedIn ? `
            <div class="admin-controls">
              <button onclick="editQuestion(${index})">수정</button>
              <button onclick="deleteQuestion(${index})">삭제</button>
            </div>` : ""}
        </details>
      `;
      questionList.appendChild(item);
    });
  }
  
  
  function deleteQuestion(index) {
    if (!isLoggedIn) return;
    if (confirm("정말 삭제하시겠습니까?")) {
      qaData.splice(index, 1);
      alert("삭제되었습니다.");
      showQuestions(currentCategory);
    }
  }
  
  function editQuestion(index) {
    if (!isLoggedIn) return;
    const newQ = prompt("질문 수정:", qaData[index].question);
    const newA = prompt("답변 수정:", qaData[index].answer);
    if (newQ !== null && newA !== null) {
      qaData[index].question = newQ;
      qaData[index].answer = newA;
      alert("수정되었습니다.");
      showQuestions(currentCategory);
    }
  }
  
  const imageUrlInput = document.getElementById("newImageUrl");
  const imagePreview = document.getElementById("imagePreview");
  const addImageBtn = document.getElementById("addImageBtn");
  
  addImageBtn.addEventListener("click", () => {
    const url = imageUrlInput.value.trim();
    if (url) {
      imagePreview.src = url;
      imagePreview.style.display = "block";
    } else {
      alert("이미지 URL을 입력해주세요!");
      imagePreview.src = "";
      imagePreview.style.display = "none";
    }
  });

  imageUrlInput.value = "";
imagePreview.src = "";
imagePreview.style.display = "none";

  