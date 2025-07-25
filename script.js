// Utility: Sanitization
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Toast notifications
function showToast(msg, duration=2500) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// Loader
function showLoader(show) {
  document.getElementById('loader').style.display = show ? 'block' : 'none';
}

// Theme persistence
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
}
if (localStorage.getItem("theme")) setTheme(localStorage.getItem("theme"));

// Data: Load from localStorage or default
let places = JSON.parse(localStorage.getItem("places")) || [
  "Mirpur 14", "Mirpur 10", "Banani", "ECB", "Jamuna", "Gulshan",
  "Mohakhali", "Hatirjheel", "NotunBazar", "BRAC university", "Mirpur 12"
];
// Initial graph: update as per your real connections
let graph = JSON.parse(localStorage.getItem("graph")) || [
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

// Save data
function saveData() {
  localStorage.setItem("places", JSON.stringify(places));
  localStorage.setItem("graph", JSON.stringify(graph));
}

// Populate dropdowns and location list
function populateDropdowns() {
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  const list = document.getElementById("locationList");
  start.innerHTML = "";
  end.innerHTML = "";
  list.innerHTML = "";
  places.forEach((place, idx) => {
    start.innerHTML += `<option value="${idx}">${sanitize(place)}</option>`;
    end.innerHTML += `<option value="${idx}">${sanitize(place)}</option>`;
    list.innerHTML += `<div class="location-card" role="listitem">
      📍 ${sanitize(place)}
      <button type="button" onclick="editLocation(${idx})" aria-label="Edit ${sanitize(place)}">✏️</button>
      <button type="button" onclick="deleteLocation(${idx})" aria-label="Delete ${sanitize(place)}">🗑️</button>
    </div>`;
  });
}

// Location search
function filterDropdown(inputId, selectId) {
  const input = document.getElementById(inputId);
  const select = document.getElementById(selectId);
  input.addEventListener('input', () => {
    const val = input.value.toLowerCase();
    select.innerHTML = places
      .map((place, idx) => val === "" || place.toLowerCase().includes(val)
        ? `<option value="${idx}">${sanitize(place)}</option>` : '').join('');
  });
}

// Dijkstra's algorithm
function dijkstra(start, end, costType='time') {
  const N = places.length;
  const dist = Array(N).fill(Infinity);
  const prev = Array(N).fill(null);
  dist[start] = 0;
  const visited = Array(N).fill(false);
  for(let count=0; count<N; count++) {
    let u = -1;
    for(let i=0; i<N; i++)
      if (!visited[i] && (u === -1 || dist[i] < dist[u])) u = i;
    if (dist[u] === Infinity) break;
    visited[u] = true;
    for (const edge of graph[u]) {
      let cost = (costType === 'bus' ? edge.bus : costType === 'rik' ? edge.rik :
                  costType === 'time' ? edge.time : Math.min(edge.bus || edge.rik, edge.rik || edge.bus));
      if (dist[edge.dest] > dist[u] + cost) {
        dist[edge.dest] = dist[u] + cost;
        prev[edge.dest] = u;
      }
    }
  }
  // Reconstruct path
  const path = [];
  let u = end;
  while (u !== null) { path.unshift(u); u = prev[u]; }
  if (path[0] !== start) return null;
  return path;
}

// Find paths debounced
let pathTimeout = null;
function findPaths(e) {
  if (e) e.preventDefault();
  showLoader(true);
  clearTimeout(pathTimeout);
  pathTimeout = setTimeout(() => {
    const start = parseInt(document.getElementById("start").value);
    const end = parseInt(document.getElementById("end").value);
    const filterType = document.getElementById("filterType").value;
    if (start === end) {
      showToast("Select different start and end locations.");
      showLoader(false);
      return;
    }
    let costType = filterType === "fastest" ? "time" : filterType === "cheapest" ? "bus" : "min";
    let path = dijkstra(start, end, costType);
    if (!path) {
      showToast("No path found.");
      showLoader(false);
      document.getElementById("output").innerHTML = "<p>No path found.</p>";
      return;
    }
    // Show output and visualize
    let names = path.map(i => places[i]).join(" ➔ ");
    document.getElementById("output").innerHTML =
      `<div class="path-result"><strong>Best Path:</strong><br>${sanitize(names)}</div>`;
    visualizeGraph(path);
    showLoader(false);
  }, 300);
}

// Graph Visualization using vis-network
function visualizeGraph(path) {
  const nodes = places.map((name, id) => ({ id, label: name }));
  const edges = [];
  graph.forEach((edgesArr, from) => {
    edgesArr.forEach(edge => edges.push({
      from, to: edge.dest, label: `${edge.time}m`, color: path.includes(from) && path.includes(edge.dest) ? 'red' : undefined
    }));
  });
  const container = document.getElementById('network');
  const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
  const options = { edges: { arrows: 'to', font: { align: 'top' } }, nodes: { shape: 'ellipse' } };
  new vis.Network(container, data, options);
}

// Add/Edit/Delete Locations
function createNewConnectionInputs() {
  const container = document.getElementById("newConnections");
  container.innerHTML = "";
  places.forEach((place, index) => {
    const row = document.createElement("div");
    row.className = "connection-row";
    row.innerHTML = `
      <label for="time_${index}"><strong>${sanitize(place)}</strong>:</label>
      Time: <input type="number" min="0" id="time_${index}" style="width:60px;" aria-label="Time to ${sanitize(place)}">
      Bus: <input type="number" min="0" id="bus_${index}" style="width:60px;" aria-label="Bus fare to ${sanitize(place)}">
      Rik: <input type="number" min="0" id="rik_${index}" style="width:60px;" aria-label="Rikshaw fare to ${sanitize(place)}"><br>
    `;
    container.appendChild(row);
  });
}

function addNewLocation(e) {
  if (e) e.preventDefault();
  const name = document.getElementById("newLocationName").value.trim();
  if (!name) {
    showToast("Please enter a location name.");
    return;
  }
  if (places.includes(name)) {
    showToast("Location already exists!");
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
  saveData();
  populateDropdowns();
  createNewConnectionInputs();
  document.getElementById("newLocationName").value = "";
  showToast(`${sanitize(name)} added successfully!`);
}

// Edit location
function editLocation(idx) {
  let name = prompt("Edit location name:", places[idx]);
  if (!name || name.trim() === "" || places.includes(name.trim())) {
    showToast("Invalid or duplicate name.");
    return;
  }
  places[idx] = name.trim();
  saveData();
  populateDropdowns();
  showToast("Location edited.");
}

// Delete location
function deleteLocation(idx) {
  if (!confirm(`Delete location ${places[idx]}?`)) return;
  places.splice(idx, 1);
  graph.splice(idx, 1);
  graph.forEach(edgesArr => {
    for (let i = edgesArr.length - 1; i >= 0; i--) {
      if (edgesArr[i].dest === idx) edgesArr.splice(i, 1);
      else if (edgesArr[i].dest > idx) edgesArr[i].dest--;
    }
  });
  saveData();
  populateDropdowns();
  createNewConnectionInputs();
  showToast("Location deleted.");
}

// Initialization
window.onload = () => {
  populateDropdowns();
  createNewConnectionInputs();
  filterDropdown('startSearch', 'start');
  filterDropdown('endSearch', 'end');
  document.getElementById('findPathForm').onsubmit = findPaths;
  document.getElementById('addLocationForm').onsubmit = addNewLocation;
};

// Tests (example)
function test_dijkstra() {
  console.assert(Array.isArray(dijkstra(0,1)), "Dijkstra should return array for valid path.");
  console.assert(d