const express = require("express");
const path = require("path");
const router = require("./routes/router");
const populationCache = require("./services/populationCache");

const app = express();

app.use("/api", router);

// Serve React frontend in production
const clientDist = path.join(__dirname, "../../src/client/dist");
app.use(express.static(clientDist));

// All non-API routes return index.html (supports React Router)
app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
});

// Use 5001 by default so local dev doesn't collide with system-reserved port 5000.
// (Port 5000 on macOS may be occupied by system processes, causing EADDRINUSE.)
const PORT = process.env.PORT || 5001;

async function startServer() {
    await populationCache.loadPopulation();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();
