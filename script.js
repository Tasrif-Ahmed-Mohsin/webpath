// Theme persistence and toggle
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
}
if (localStorage.getItem("theme")) setTheme(localStorage.getItem("theme"));

// Data (keep your original data)
let places = [
  "Mirpur 14", "Mirpur 10", "Banani", "ECB", "Jamuna", "Gulshan",
  "Mohakhali", "Hatirjheel", "NotunBazar", "BRAC university", "Mirpur 12"
];
let graph = [
  [{ dest: 1, time: 7, bus: 10, rik: 30 }, { dest: 2, time: 15, bus: 10, rik: 80 }, { dest: 10, time: 25, bus: 0, rik: 80 }, { dest: 3, time: 7, bus: 0, rik: 60 }],
  [{ dest: 0, time: 7, bus: 10, rik: 30 }, { dest: 10, time: 7, bus: 10, rik: 30 }, { dest: 7, time: 15, bus: 30, rik: 0 }],
  [{ dest: 0, time: 15, bus: 10, rik: 80 }, { dest: 5, time: 15, bus: 10, rik: 0 }, { dest: 6, time: 10, bus: 10, rik: 0 }],
  [{ dest: 0, time: 7, bus: 0, rik: 60 }, { dest: 10, time: 15, bus: 15, rik: 70 }, { dest: 4, time: 20, bus: 10, rik: 0 }],
  [{ dest: 3, time: 20, bus: 10, rik: 0 }, { dest: 8, time: 20, bus: 10, rik: 0 }],
  [{ dest: 2, time: 15, bus: 10, rik: 0 }, { dest: 8, time: 10, bus: 10, rik: 0 }],
  [{ dest: 2, time: 10, bus: 10, rik: 0 }, { dest: 7, time: 10, bus: 0, rik: 30 }],
  [{ dest: 1, time: 15, bus: 30, rik: 0 }, { dest: 6, time: 10, bus: 0, rik: 30 }, { dest: 9, time: 10, bus: 0, rik: 30 }],
  [{ dest: 4, time: 20, bus: 10, rik: 0 }, { dest: 5, time: 10, bus: 10, rik: 0 }, { dest: 9, time: 20, bus: 10, rik: 60 }],
  [{ dest: 7, time: 10, bus: 0, rik: 30 }, { dest: 8, time: 20, bus: 10, rik: 60 }],
  [{ dest: 0, time: 25, bus: 0, rik: 80 }, { dest: 1, time: 15, bus: 10, rik: 30 }, { dest: 3, time: 15, bus: 15, rik: 70 }]
];

// Populate dropdowns and location list
function populateDropdowns() {
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  const list = document.getElementById("locationList");
  start.innerHTML = "";
  end.innerHTML = "";
  list.innerHTML = "";
  places.forEach((place, idx) => {
    start.innerHTML += `<option value="${idx}">${place}</option>`;
    end.innerHTML += `<option value="${idx}">${place}</option>`;
    list.innerHTML += `<div class="location-card" role="listitem" tabindex="0">📍 ${place}</div>`;
  });
}

// Find all paths between start and end
function findPaths() {
  const start = parseInt(document.getElementById("start").value);
  const end = parseInt(document.getElementById("end").value);
  if (start === end) {
    showOutput(`<p>Please select different start and end locations.</p>`);
    return;
  }
  let allPaths = [];
  function dfs(current, visited, path, costBus, costRik, costTime) {
    if (current === end) {
      const cheapCost = path.reduce((sum, node, i) => {
        if (i === path.length - 1) return sum;
        const next = path[i + 1];
        const edge = graph[node].find(e => e.dest === next);
        return sum + Math.min(edge.bus || edge.rik, edge.rik || edge.bus);
      }, 0);
      allPaths.push({ path: [...path], bus: costBus, rik: costRik, time: costTime, cheap: cheapCost });
      return;
    }
    visited[current] = true;
    for (const edge of graph[current]) {
      if (!visited[edge.dest]) {
        const bus = edge.bus === 0 ? edge.rik : edge.bus;
        const rik = edge.rik === 0 ? edge.bus : edge.rik;
        path.push(edge.dest);
        dfs(edge.dest, visited, path, costBus + bus, costRik + rik, costTime + edge.time);
        path.pop();
      }
    }
    visited[current] = false;
  }
  dfs(start, Array(places.length).fill(false), [start], 0, 0, 0);
  let html = `<h3>Paths from ${places[start]} to ${places[end]}</h3>`;
  if (allPaths.length === 0) {
    html += `<p>No path found.</p>`;
    showOutput(html);
    return;
  }
  const shortestTimePath = allPaths.reduce((min, p) => (p.time < min.time ? p : min), allPaths[0]);
  const shortestPathNames = shortestTimePath.path.map(i => places[i]).join(" ➔ ");
  html += `
    <div class="path-result shortest-time">
      <strong>🚀 Shortest Time Path:</strong><br>
      ${shortestPathNames}<br>
      🚌 Bus: <strong>${shortestTimePath.bus}</strong> |
      🛺 Rikshaw: <strong>${shortestTimePath.rik}</strong> |
      ⏱️ Time: <strong>${shortestTimePath.time} mins</strong>
    </div>`;
  const cheapestPath = allPaths.reduce((min, p) => p.cheap < min.cheap ? p : min, allPaths[0]);
  const cheapestPathNames = cheapestPath.path.map(i => places[i]).join(" ➔ ");
  html += `
    <div class="path-result" style="background: rgba(227, 249, 229, 0.6); border-left-color:#43a047;">
      <strong>💰 Cheapest Cost Path (min of bus/rikshaw per step):</strong><br>
      ${cheapestPathNames}<br>
      💸 Total Chosen Cost: <strong>${cheapestPath.cheap}</strong><br>
      ⏱️ Time: <strong>${cheapestPath.time} mins</strong>
    </div>`;
  allPaths.forEach((p, i) => {
    const pathNames = p.path.map(idx => places[idx]).join(" ➔ ");
    html += `
      <div class='path-result'>
        <strong>Path ${i + 1}:</strong> ${pathNames}<br>
        🚌 Bus: <strong>${p.bus}</strong> |
        🛺 Rikshaw: <strong>${p.rik}</strong> |
        💸 Min Stepwise Cost: <strong>${p.cheap}</strong> |
        ⏱️ Time: <strong>${p.time} mins</strong>
      </div>`;
  });
  showOutput(html);
}
function showOutput(html) {
  document.getElementById("output").innerHTML = html;
}

// Create inputs for new location connections
function createNewConnectionInputs() {
  const container = document.getElementById("newConnections");
  container.innerHTML = "";
  places.forEach((place, index) => {
    const row = document.createElement("div");
    row.className = "connection-row";
    row.innerHTML = `
      <label for="time_${index}"><strong>${place}</strong>:</label>
      Time: <input type="number" min="0" id="time_${index}" style="width:60px;" aria-label="Time to ${place}">
      Bus: <input type="number" min="0" id="bus_${index}" style="width:60px;" aria-label="Bus fare to ${place}">
      Rik: <input type="number" min="0" id="rik_${index}" style="width:60px;" aria-label="Rikshaw fare to ${place}"><br>
    `;
    container.appendChild(row);
  });
}

// Add a new location and its connections
function addNewLocation() {
  const name = document.getElementById("newLocationName").value.trim();
  if (!name) {
    alert("Please enter a location name.");
    return;
  }
  if (places.includes(name)) {
    alert("Location already exists!");
    return;
  }
  const newIndex = places.length;
  places.push(name);
  graph.push([]);
  for (let i = 0; i < newIndex; i++) {
    const time = parseInt(document.getElementById(`time_${i}`).value);
    const bus = parseInt(document.getElementById(`bus_${i}`).value);
    const rik = parseInt(document.getElementById(`rik_${i}`).value);
    if (!isNaN(time) && !isNaN(bus) && !isNaN(rik) && (time > 0 || bus > 0 || rik > 0)) {
      graph[newIndex].push({ dest: i, time, bus, rik });
      graph[i].push({ dest: newIndex, time, bus, rik });
    }
  }
  populateDropdowns();
  createNewConnectionInputs();
  document.getElementById("newLocationName").value = "";
  alert(`${name} added successfully!`);
}

// Keyboard accessibility for navigation (Tab + Enter)
document.addEventListener('keydown', function(e) {
  if (e.target.classList.contains('location-card') && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    // Optional: show details or highlight card
  }
});

// Scroll to section utility (used by nav buttons)
function scrollSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Initialize on window load
window.onload = () => {
  setTheme(localStorage.getItem("theme") || "light");
  populateDropdowns();
  createNewConnectionInputs();
};
