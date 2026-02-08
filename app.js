// app.js

// Select DOM elements
const dashboardBtn = document.getElementById("dashboardBtn");
const addActivityBtn = document.getElementById("addActivityBtn");
const reportsBtn = document.getElementById("reportsBtn");
const content = document.getElementById("content");

// -------------------------
// 1️⃣ Show Dashboard Section
// -------------------------
dashboardBtn.addEventListener("click", () => {
  content.innerHTML = `
    <h2 class="text-3xl font-semibold mb-4 text-[#00ff99]">📊 Dashboard</h2>
    <p class="text-[#66ffcc] mb-6">Real-time insider threat alerts and user behavior summary will appear here.</p>
    <div id="alertBox" class="alert-box mb-6 p-4 bg-[#0d1529] border border-[#00ff99] rounded-xl text-left"></div>
    <canvas id="behaviorChart" width="400" height="200"></canvas>
  `;
  loadDashboard();
});

// -------------------------
// 2️⃣ Show Add Activity Section
// -------------------------
addActivityBtn.addEventListener("click", () => {
  content.innerHTML = `
    <h2 class="text-3xl font-semibold mb-6 text-[#00ff99]">📝 Add User Activity</h2>

    <form id="activityForm" class="max-w-md mx-auto bg-[#0d1529] p-6 rounded-2xl border border-[#00ff99] shadow-lg">
      
      <div class="mb-4">
        <label class="block mb-1 text-left text-[#66ffcc]">User ID:</label>
        <input type="text" id="userId" required
          class="w-full px-4 py-2 rounded-lg bg-[#081121] text-[#00ff99] border border-[#00ff99] focus:outline-none focus:ring-2 focus:ring-[#00ff99]" />
      </div>

      <div class="mb-4">
        <label class="block mb-1 text-left text-[#66ffcc]">Activity Type:</label>
        <select id="activityType"
          class="w-full px-4 py-2 rounded-lg bg-[#081121] text-[#00ff99] border border-[#00ff99] focus:outline-none focus:ring-2 focus:ring-[#00ff99]">
          <option value="login">Login</option>
          <option value="file_access">File Access</option>
          <option value="data_transfer">Data Transfer</option>
          <option value="unauthorized_access">Unauthorized Access</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block mb-1 text-left text-[#66ffcc]">Risk Score (0–100):</label>
        <input type="number" id="riskScore" min="0" max="100" required
          class="w-full px-4 py-2 rounded-lg bg-[#081121] text-[#00ff99] border border-[#00ff99] focus:outline-none focus:ring-2 focus:ring-[#00ff99]" />
      </div>

      <button type="submit"
        class="w-full py-3 bg-[#00ff99] text-black font-semibold rounded-lg hover:bg-[#00cc7a] transition duration-300">
        Submit Activity
      </button>
    </form>
  `;

  const form = document.getElementById("activityForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const activity = {
      userId: document.getElementById("userId").value,
      type: document.getElementById("activityType").value,
      riskScore: parseInt(document.getElementById("riskScore").value),
      time: new Date().toISOString(),
    };

    await addActivity(activity);
    alert("✅ Activity saved successfully!");
    form.reset();
  });
});

// -------------------------
// 3️⃣ Show Reports Section
// -------------------------
reportsBtn.addEventListener("click", async () => {
  content.innerHTML = `
    <h2 class="text-3xl font-semibold mb-4 text-[#00ff99]">📜 Reports</h2>
    <p class="text-[#66ffcc] mb-4">All recorded user activities are listed below.</p>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-[#00ff99] text-[#00ff99] bg-[#0d1529] rounded-lg">
        <thead>
          <tr class="bg-[#081121]">
            <th class="py-2 px-4 border-b border-[#00ff99]">User ID</th>
            <th class="py-2 px-4 border-b border-[#00ff99]">Activity</th>
            <th class="py-2 px-4 border-b border-[#00ff99]">Risk Score</th>
            <th class="py-2 px-4 border-b border-[#00ff99]">Timestamp</th>
          </tr>
        </thead>
        <tbody id="reportBody"></tbody>
      </table>
    </div>
  `;

  const data = await loadActivities();
  const reportBody = document.getElementById("reportBody");
  reportBody.innerHTML = "";

  data.forEach((a) => {
    const row = `
      <tr class="hover:bg-[#112244] transition">
        <td class="py-2 px-4 border-b border-[#00ff99]">${a.userId}</td>
        <td class="py-2 px-4 border-b border-[#00ff99]">${a.type}</td>
        <td class="py-2 px-4 border-b border-[#00ff99]">${a.riskScore}</td>
        <td class="py-2 px-4 border-b border-[#00ff99]">${new Date(
          a.time
        ).toLocaleString()}</td>
      </tr>
    `;
    reportBody.innerHTML += row;
  });
});

// -------------------------
// 4️⃣ Local Storage Backend Simulation
// -------------------------
async function addActivity(activity) {
  const data = JSON.parse(localStorage.getItem("activities") || "[]");
  data.push(activity);
  localStorage.setItem("activities", JSON.stringify(data));
}

async function loadActivities() {
  return JSON.parse(localStorage.getItem("activities") || "[]");
}

// -------------------------
// 5️⃣ Dashboard (Chart + Alerts)
// -------------------------
async function loadDashboard() {
  const data = await loadActivities();
  const alertBox = document.getElementById("alertBox");

  // Show alerts for suspicious activities
  const suspicious = data.filter((a) => a.riskScore >= 70);
  if (suspicious.length > 0) {
    alertBox.innerHTML = `
      <h3 class="text-xl text-red-500 font-semibold mb-2">🚨 Suspicious Activities Detected!</h3>
      <ul class="list-disc pl-5">
        ${suspicious
          .map(
            (s) =>
              `<li>User <b>${s.userId}</b> performed ${s.type} (Risk: ${s.riskScore})</li>`
          )
          .join("")}
      </ul>
    `;
  } else {
    alertBox.innerHTML = `<p class="text-[#66ffcc]">✅ No suspicious behavior detected.</p>`;
  }

  // Chart.js visualization
  const ctx = document.getElementById("behaviorChart").getContext("2d");
  const chartData = {
    labels: data.map((a) => a.userId),
    datasets: [
      {
        label: "Risk Scores",
        data: data.map((a) => a.riskScore),
        borderColor: "rgba(0,255,153,1)",
        backgroundColor: "rgba(0,255,153,0.3)",
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 },
      },
      plugins: {
        legend: {
          labels: { color: "#00ff99" },
        },
      },
    },
  });
}

// -------------------------
// 6️⃣ Default Page
// -------------------------
content.innerHTML = `
  <h2 class="text-3xl font-semibold mb-4 text-[#00ff99]">Welcome!</h2>
  <p class="text-[#66ffcc] text-lg">Select an option to begin analyzing user behavior.</p>
`;
