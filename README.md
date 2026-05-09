# 🚀 Walkway Path Finder - Dijkstra's Algorithm Learning Tool

> **Live Demo:** https://webpath-sigma.vercel.app/ | **Repository:** https://github.com/Tasrif-Ahmed-Mohsin/webpath

A fully responsive, interactive web-based learning platform for understanding **Dijkstra's Algorithm** through visualization, exploration, and hands-on experimentation. Perfect for CSE students and DSA enthusiasts.

## ✨ Features

### 📚 **Educational Content**
- **6 Comprehensive Learning Tabs:**
  - What is Dijkstra's Algorithm?
  - Pseudocode with detailed explanations
  - Step-by-step algorithm walkthrough
  - Complexity Analysis (Time & Space)
  - Algorithm Comparison (vs BFS, Bellman-Ford, DFS)
  - Learning Resources & Practice Exercises

### 🗺️ **Interactive Visualization**
- Real-time graph visualization using Vis-Network
- 11 Dhaka-based locations with weighted edges
- Click-to-select nodes for start/end points
- Edge labels showing travel times in minutes
- Dynamic location addition with automatic graph updates

### 🔧 **Pathfinding Features**
- Find all possible paths between locations
- Display shortest time paths
- Show cheapest cost paths (minimum per-step)
- Detailed results with multiple cost metrics
- Support for three cost types: Time, Bus Fare, Rikshaw Fare

### 🌙 **User Experience**
- Dark/Light theme toggle with persistence
- Smooth animations and glass-morphism design
- Font Awesome icons for visual clarity
- Smooth scrolling navigation buttons
- Accessibility-first HTML structure

### 📱 **Mobile Responsive Design**
- **Tablet Optimization (768px breakpoint):**
  - Stacked header layout
  - Scrollable tab navigation
  - Full-width forms and buttons
  - Adjusted typography (0.95rem/0.85rem)

- **Mobile Optimization (480px breakpoint):**
  - Icon-only navigation buttons
  - 2-column location grid
  - Single-column forms and inputs
  - Further optimized typography (0.75rem/0.8rem)
  - Touch-optimized elements

- **Touch Features:**
  - Horizontal scrolling for tabs and tables
  - -webkit-overflow-scrolling: touch for smooth scroll
  - Increased tap target sizes
  - Mobile-friendly input fields (16px+ font)

## 🛠️ **Tech Stack**

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Graph Visualization:** Vis-Network Library (CDN)
- **Icons:** Font Awesome 6.4.0 (CDN)
- **Fonts:** Google Fonts (Inter typeface)
- **Hosting:** Vercel (Auto-deployment from GitHub)
- **Version Control:** Git/GitHub

## 📊 **Graph Structure**

**Default Network (11 Nodes):**
- Mirpur 14, Mirpur 10, Mirpur 12
- Banani, Gulshan, ECB, Jamuna
- Hatirjheel, NotunBazar, Mohakhali
- BRAC University

**Edge Properties:**
- Time (minutes of travel)
- Bus fare (Taka)
- Rikshaw fare (Taka)

## 🚀 **Getting Started**

### Local Development
```bash
# Clone the repository
git clone https://github.com/Tasrif-Ahmed-Mohsin/webpath.git

# Navigate to directory
cd webpath

# Open in browser (or use any local server)
open index.html
# or with Python
python -m http.server 8000
```

Visit: `http://localhost:8000`

### Live Demo
Direct visit: https://webpath-sigma.vercel.app/

## 📖 **Learning Pathway**

### For Beginners:
1. **Explore the Map** – See 11 real Dhaka locations
2. **Find Paths** – Experiment with start/end points
3. **Read Learning Content** – Study the 6-tab learning section
4. **Understand Complexity** – Compare algorithm efficiencies
5. **Practice** – Try edge cases and variations

### Key Concepts Covered:
- ✅ Graph representation & adjacency lists
- ✅ Priority queue / Min-heap concept
- ✅ Greedy algorithm strategy
- ✅ Time complexity: O((V+E) log V)
- ✅ Space complexity: O(V)
- ✅ Real-world applications

## 🎯 **Real-World Applications**

| Application | Use Case |
|------------|----------|
| 🗺️ **GPS Navigation** | Route planning in Google Maps, Waze |
| 📡 **Network Routing** | OSPF protocol for internet routing |
| 🎮 **Game Development** | AI pathfinding in strategy games |
| 🚗 **Ride-sharing** | Uber/Lyft route optimization |
| 🏥 **Healthcare** | Optimal routing in hospital networks |

## 📱 **Responsive Breakpoints**

| Device | Width | Layout Changes |
|--------|-------|-----------------|
| Desktop | >768px | Full-width with all features visible |
| Tablet | 600-768px | Adjusted fonts, stacked header, flowing layout |
| Mobile | <480px | Icon nav, stacked layout, 2-column grid, optimized spacing |

**Mobile Responsive Features:**
- Horizontal scrolling for tabs with touch support
- Tables with built-in overflow scrolling
- Full-width inputs (no side-by-side on mobile)
- Responsive navigation with text hiding on <480px
- Font size progression: 1.3rem → 0.8rem based on screen size

## 🔄 **How to Use**

### Finding Paths
1. Click **"Find Path"** in navigation
2. Select **start location** from dropdown
3. Select **end location** from dropdown
4. Click **"Find Path"** button
5. View all possible paths with costs

### Learning DSA
1. Click **"Learn DSA"** button
2. Browse through 6 learning tabs
3. Read pseudocode, complexity analysis, and comparisons
4. Check practice resources and exercises

### Adding Locations
1. Scroll to **"Add New Location"** section
2. Enter location name
3. Set travel times and costs to existing locations
4. Click **"Add Location"**
5. Graph updates automatically

## 🐛 **Known Limitations**

- Maximum ~20 locations for optimal visualization
- Single algorithm implementation (Dijkstra's)
- No backend server (client-side only)
- Graph layout is fixed-radius arrangement
- No edge modification after creation

## 🚀 **Future Enhancements**

- [ ] Step-by-step algorithm execution with visualization
- [ ] Additional algorithms (Floyd-Warshall, A*, Bellman-Ford)
- [ ] Save/load custom graphs
- [ ] Export results as PDF
- [ ] Real-time collaboration
- [ ] WebWorkers for large graphs
- [ ] Mobile app version (React Native)
- [ ] Algorithm performance benchmarking

## 📚 **Resources & References**

### Learning Materials
- [Dijkstra's Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [Algorithm Visualization - VisuAlgo](https://visualgo.net/en/sssp)
- [MIT OpenCourseWare - Algorithms](https://ocw.mit.edu/)

### Technologies
- [Vis-Network Docs](https://visjs.github.io/vis-network/docs/network/)
- [Font Awesome Icons](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

## 👨‍💻 **Developer Notes**

**Created as:** CSE221 Data Structures & Algorithms Course Project  
**Enhanced for:** Peer learning and educational value  
**Focus:** Understanding algorithm visualization & responsive web design  
**Lessons Learned:**
1. Visualization is 100x more effective than textbook explanations
2. Teaching reinforces personal understanding significantly
3. Mobile-first responsive design requires careful CSS planning
4. Graph algorithms have profound real-world applications

## 📄 **Project File Structure**

```
webpath/
├── index.html          # Main application (HTML + CSS + JS)
├── README.md           # This file
└── .git/              # Version control
```

The entire application is contained in `index.html` as a single-page application (SPA) with embedded CSS and JavaScript for easy deployment.

## 🤝 **Contributing**

Found a bug or want to suggest improvements?
- Open an [Issue](https://github.com/Tasrif-Ahmed-Mohsin/webpath/issues)
- Submit a [Pull Request](https://github.com/Tasrif-Ahmed-Mohsin/webpath/pulls)
- Share feedback via GitHub discussions

## 📄 **License**

Educational use - Built as a learning project for the CSE community.

## 🙏 **Acknowledgments**

- **CSE221 Course** – Data Structures & Algorithms fundamentals
- **Vis-Network** – Graph visualization library
- **Font Awesome** – Icon library
- **Google Fonts** – Typography
- **Vercel** – Hosting & deployment

---

**Current Version:** 1.1.0 (Mobile Responsive)  
**Last Updated:** June 2026  
**Live:** https://webpath-sigma.vercel.app/  
**GitHub:** https://github.com/Tasrif-Ahmed-Mohsin/webpath
