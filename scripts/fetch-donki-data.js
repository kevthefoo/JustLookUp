const axios = require("axios");
const fs = require("fs");
const path = require("path");

// NASA API key - you should get one from https://api.nasa.gov/
// For now, using DEMO_KEY which has rate limits
const NASA_API_KEY = "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov/DONKI";

// Date range for the data (last 30 days)
const endDate = new Date();
const startDate = new Date();
startDate.setDate(endDate.getDate() - 30);

const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};

const endpoints = {
    // Coronal Mass Ejection
    cme: "/CME",
    // Coronal Mass Ejection Analysis
    cmeAnalysis: "/CMEAnalysis",
    // Geomagnetic Storm
    gst: "/GST",
    // Interplanetary Shock
    ips: "/IPS",
    // Solar Flare
    flr: "/FLR",
    // Solar Energetic Particle
    sep: "/SEP",
    // Magnetopause Crossing
    mpc: "/MPC",
    // Radiation Belt Enhancement
    rbe: "/RBE",
    // High Speed Stream
    hss: "/HSS",
};

async function fetchDONKIData() {
    const allData = {};
    const errors = [];

    console.log("Fetching DONKI space weather data...");
    console.log(
        `Date range: ${formatDate(startDate)} to ${formatDate(endDate)}`
    );

    for (const [name, endpoint] of Object.entries(endpoints)) {
        try {
            console.log(`Fetching ${name} data...`);

            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                params: {
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                    api_key: NASA_API_KEY,
                },
                timeout: 10000, // 10 second timeout
            });

            allData[name] = {
                endpoint: endpoint,
                description: getEndpointDescription(name),
                dataCount: response.data.length,
                data: response.data,
            };

            console.log(`✓ ${name}: ${response.data.length} records`);

            // Add a small delay to be respectful to the API
            await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`✗ Error fetching ${name}:`, error.message);
            errors.push({
                endpoint: name,
                error: error.message,
                status: error.response?.status,
            });
        }
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, "..", "data");
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save all data to JSON file
    const outputData = {
        metadata: {
            fetchedAt: new Date().toISOString(),
            dateRange: {
                start: formatDate(startDate),
                end: formatDate(endDate),
            },
            apiKey:
                NASA_API_KEY === "DEMO_KEY"
                    ? "DEMO_KEY (limited)"
                    : "Custom API Key",
            totalEndpoints: Object.keys(endpoints).length,
            successfulEndpoints: Object.keys(allData).length,
            errors: errors,
        },
        spaceWeatherData: allData,
    };

    const outputPath = path.join(dataDir, "donki-space-weather-data.json");
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

    console.log(`\n📁 Data saved to: ${outputPath}`);
    console.log(`📊 Summary:`);
    console.log(
        `   - Successful endpoints: ${Object.keys(allData).length}/${
            Object.keys(endpoints).length
        }`
    );
    console.log(
        `   - Total records: ${Object.values(allData).reduce(
            (sum, endpoint) => sum + endpoint.dataCount,
            0
        )}`
    );

    if (errors.length > 0) {
        console.log(`   - Errors: ${errors.length}`);
        errors.forEach((error) => {
            console.log(`     * ${error.endpoint}: ${error.error}`);
        });
    }

    // Also create a summary file
    const summaryPath = path.join(dataDir, "donki-summary.json");
    const summary = {
        fetchedAt: new Date().toISOString(),
        dateRange: outputData.metadata.dateRange,
        endpoints: Object.keys(allData).map((name) => ({
            name,
            description: allData[name].description,
            recordCount: allData[name].dataCount,
        })),
        errors: errors,
    };

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📋 Summary saved to: ${summaryPath}`);
}

function getEndpointDescription(name) {
    const descriptions = {
        cme: "Coronal Mass Ejection - Large expulsions of plasma and magnetic field from the solar corona",
        cmeAnalysis:
            "Coronal Mass Ejection Analysis - Detailed analysis of CME events",
        gst: "Geomagnetic Storm - Disturbances in Earth's magnetosphere caused by solar wind",
        ips: "Interplanetary Shock - Shock waves in the solar wind",
        flr: "Solar Flare - Intense bursts of radiation from the release of magnetic energy",
        sep: "Solar Energetic Particle - High-energy particles accelerated by solar events",
        mpc: "Magnetopause Crossing - Spacecraft crossings of Earth's magnetopause boundary",
        rbe: "Radiation Belt Enhancement - Increases in radiation belt particle populations",
        hss: "High Speed Stream - Fast-moving streams in the solar wind",
    };
    return descriptions[name] || "Space weather event data";
}

// Run the script
fetchDONKIData().catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
});
