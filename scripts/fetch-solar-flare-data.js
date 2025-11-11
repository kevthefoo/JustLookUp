const axios = require("axios");
const fs = require("fs");
const path = require("path");

// NASA API key - you should get one from https://api.nasa.gov/
// For now, using DEMO_KEY which has rate limits
const NASA_API_KEY = "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov/DONKI";

// Date range for the data (last 14 days)
const endDate = new Date();
const startDate = new Date();
startDate.setDate(endDate.getDate() - 14);

const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};

async function fetchSolarFlareData() {
    console.log("Fetching Solar Flare data from DONKI...");
    console.log(
        `Date range: ${formatDate(startDate)} to ${formatDate(endDate)}`
    );

    try {
        const response = await axios.get(`${BASE_URL}/FLR`, {
            params: {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                api_key: NASA_API_KEY,
            },
            timeout: 15000, // 15 second timeout
        });

        console.log(`✓ Solar Flares: ${response.data.length} records`);

        // Create data directory if it doesn't exist
        const dataDir = path.join(__dirname, "..", "data");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Process and save the data
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
                recordCount: response.data.length,
                dataType: "Solar Flares (FLR)",
                description:
                    "Solar Flare - Intense bursts of radiation from the release of magnetic energy",
            },
            solarFlares: response.data,
        };

        const outputPath = path.join(dataDir, "solar-flare-data.json");
        fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

        console.log(`\n📁 Data saved to: ${outputPath}`);
        console.log(`📊 Summary:`);
        console.log(`   - Solar flare records: ${response.data.length}`);
        console.log(
            `   - Date range: ${formatDate(startDate)} to ${formatDate(
                endDate
            )}`
        );

        // Create a summary of flare classes
        const flareClasses = {};
        response.data.forEach((flare) => {
            if (flare.classType) {
                const classKey = flare.classType.charAt(0); // Get first letter (C, M, X, etc.)
                flareClasses[classKey] = (flareClasses[classKey] || 0) + 1;
            }
        });

        console.log(`   - Flare classes breakdown:`);
        Object.entries(flareClasses)
            .sort(([a], [b]) => a.localeCompare(b))
            .forEach(([classType, count]) => {
                console.log(`     * Class ${classType}: ${count} flares`);
            });

        // Show most recent flares
        if (response.data.length > 0) {
            const recentFlares = response.data
                .sort((a, b) => new Date(b.beginTime) - new Date(a.beginTime))
                .slice(0, 5);

            console.log(`\n🔥 Most Recent Flares:`);
            recentFlares.forEach((flare, i) => {
                const beginTime = new Date(flare.beginTime).toLocaleString();
                console.log(
                    `   ${i + 1}. Class ${
                        flare.classType || "Unknown"
                    } - ${beginTime}`
                );
            });
        }
    } catch (error) {
        console.error("✗ Error fetching solar flare data:", error.message);

        if (error.response) {
            console.error(
                `   HTTP ${error.response.status}: ${error.response.statusText}`
            );
        }

        process.exit(1);
    }
}

// Run the script
fetchSolarFlareData().catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
});
