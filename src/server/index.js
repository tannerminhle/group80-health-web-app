const express = require("express");
const router = require("./routes/router");
const populationCache = require("./services/populationCache");

const app = express();

app.use("/api", router);

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
