const express = require("express");
const router = require("./routes/router");
const populationCache = require("./services/populationCache");

const app = express();

app.use("/api", router);

const PORT = process.env.PORT || 5000;

async function startServer() {
    await populationCache.loadPopulation();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();
