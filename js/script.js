let issues = [];

// Login function
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    alert("Login success");
    window.location.assign("/dashboard.html");
  } else {
    alert("Invalid Credentials");
  }
}
// Load issues
function loadIssues() {
  const loader = document.getElementById("global-loader");
  if (loader) loader.classList.remove("hidden");

  fetch("issue.json")
    .then((res) => res.json())
    .then((data) => {
      issues = data.data;

      displayIssues(issues);

      // Update Total Issues
      const issueCount = document.getElementById("issue-count");
      if (issueCount) issueCount.innerText = issues.length + " Issues";

      if (loader) loader.classList.add("hidden");
    })
    .catch((err) => console.log("Error loading issues", err));
}

if (document.getElementById("issuesContainer")) {
  loadIssues();
  filterIssues("all");
}

// Display issues card
function displayIssues(data) {
  const container = document.getElementById("issuesContainer");
  container.innerHTML = "";

  const priorityStyles = {
    high: {
      bg: "bg-red-50",
      text: "text-red-500",
      iconBox: "bg-emerald-100 border-emerald-500 border-dashed",
      icon: `<div class="w-3 h-3 rounded-full border-2 border-emerald-500 border-dashed"></div>`,
    },
    medium: {
      bg: "bg-orange-50",
      text: "text-orange-500",
      iconBox: "bg-emerald-100 border-emerald-500 border-dashed",
      icon: `<div class="w-3 h-3 rounded-full border-2 border-emerald-500 border-dashed"></div>`,
    },
    low: {
      bg: "bg-slate-100",
      text: "text-slate-500",
      iconBox: "bg-purple-100 border-none",
      icon: `<i class="fa-solid fa-check text-purple-600 text-xs"></i>`,
    },
  };

  data.forEach((issue) => {
    const priority = issue.priority.toLowerCase();
    const style = priorityStyles[priority] || priorityStyles.low;

    const topBorder =
      issue.status === "open" ? "border-green-500" : "border-purple-500";

    const div = document.createElement("div");
    div.className = `card bg-white shadow-sm border border-gray-100 border-t-4 ${topBorder} cursor-pointer hover:shadow-md transition-shadow`;

    div.innerHTML = `
      <div class="card-body p-5">
        <div class="flex justify-between items-center mb-4">
          <div class="w-8 h-8 rounded-full flex items-center justify-center border-2 ${style.iconBox}">
            ${style.icon}
          </div>
          <span class="badge border-none px-4 py-3 font-bold text-[10px] tracking-widest uppercase ${style.bg} ${style.text}">
            ${issue.priority}
          </span>
        </div>

        <h2 class="text-lg font-bold text-slate-800 leading-snug line-clamp-2 mb-2">${issue.title}</h2>
        <p class="text-sm text-slate-500 mb-4">${issue.description.substring(0, 85)}...</p>

        <div class="flex flex-wrap gap-2 mb-6">
          <span class="badge badge-sm bg-red-50 text-red-500 border-red-100 py-3 px-3">
            <i class="fa-solid fa-face-angry mr-1"></i> BUG
          </span>
          <span class="badge badge-sm bg-orange-50 text-orange-500 border-orange-100 py-3 px-3">
            <i class="fa-solid fa-life-ring mr-1"></i> HELP WANTED
          </span>
        </div>

        <div class="border-t border-gray-50 pt-4 text-slate-400 text-xs font-medium space-y-1">
          <p>#${issue.id} by ${issue.author}</p>
          <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    `;

    div.onclick = () => openModal(issue);
    container.appendChild(div);
  });
  // Update Total Issue
  const issueCount = document.getElementById("issue-count");
  if (issueCount) issueCount.innerText = data.length + " Issues";
}
