"use client";

import { useState, useEffect } from "react";
import {
    Rocket,
    Star,
    Activity,
    AlertTriangle,
    Camera,
    Sun,
    Calendar,
    Globe,
    Zap,
} from "lucide-react";
import RealAPOD from "./RealAPOD";
import RealNEOTracker from "./RealNEOTracker";
import SimpleMarsWeather from "./SimpleMarsWeather";
import RealSolarFlareMonitor from "./RealSolarFlareMonitor";
import RealEarthImagery from "./RealEarthImagery";

export default function EnhancedDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeSection, setActiveSection] = useState("overview");
    const [mounted, setMounted] = useState(false);
    const [liveStats, setLiveStats] = useState({
        issAstronauts: 7,
        solarWindSpeed: 425,
        geomagneticActivity: "Quiet",
        activeMissions: 42,
    });

    useEffect(() => {
        setTimeout(() => setMounted(true), 0);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Simulate some live data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveStats((prev) => ({
                ...prev,
                solarWindSpeed: Math.floor(Math.random() * 100) + 300,
                geomagneticActivity: Math.random() > 0.8 ? "Active" : "Quiet",
            }));
        }, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, []);

    const sections = [
        { id: "overview", label: "Mission Control", icon: Star },
        { id: "asteroids", label: "Asteroid Watch", icon: AlertTriangle },
        { id: "apod", label: "Daily Image", icon: Camera },
        { id: "mars", label: "Mars Weather", icon: Sun },
        { id: "earth", label: "Earth View", icon: Globe },
        { id: "solar", label: "Space Weather", icon: Activity },
    ];

    return (
        <div className="h-screen overflow-hidden p-3 text-white flex flex-col">
            {/* Compact Header */}
            <div className="mb-3 bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20 shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Rocket className="w-8 h-8 text-blue-400" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                NASA Mission Control
                            </h1>
                            <p className="text-gray-300 text-sm">
                                🌍 Live Space Data • 🚀 Streaming Ready
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono text-blue-400 tracking-wider">
                            {mounted
                                ? currentTime.toLocaleTimeString()
                                : "--:--:--"}
                        </div>
                        <div className="text-xs text-gray-300">
                            {mounted
                                ? currentTime.toLocaleDateString("en-US", {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                  })
                                : "Loading..."}
                        </div>
                    </div>
                </div>
            </div>

            {/* Compact Navigation Tabs */}
            <div className="mb-3 bg-black/30 backdrop-blur-md rounded-lg p-1 border border-white/20 shrink-0">
                <div className="flex gap-1">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                    activeSection === section.id
                                        ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                                        : "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {section.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area - Flexible Height */}
            <div className="flex-1 overflow-hidden">
                {activeSection === "overview" && (
                    <div className="h-full flex flex-col gap-3">
                        {/* Compact Live Statistics Grid */}
                        <div className="grid grid-cols-4 gap-3 shrink-0">
                            <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-black/50 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1 bg-blue-500/20 rounded">
                                        <Globe className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-gray-400 text-xs">
                                        ISS Crew
                                    </span>
                                </div>
                                <div className="text-2xl font-bold text-blue-400">
                                    {liveStats.issAstronauts}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Astronauts
                                </div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-black/50 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1 bg-yellow-500/20 rounded">
                                        <Activity className="w-4 h-4 text-yellow-400" />
                                    </div>
                                    <span className="text-gray-400 text-xs">
                                        Solar Wind
                                    </span>
                                </div>
                                <div className="text-2xl font-bold text-yellow-400">
                                    {liveStats.solarWindSpeed}
                                </div>
                                <div className="text-xs text-gray-500">
                                    km/s
                                </div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-black/50 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1 bg-green-500/20 rounded">
                                        <Calendar className="w-4 h-4 text-green-400" />
                                    </div>
                                    <span className="text-gray-400 text-xs">
                                        Space Weather
                                    </span>
                                </div>
                                <div className="text-lg font-bold text-green-400">
                                    {liveStats.geomagneticActivity}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Status
                                </div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-black/50 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1 bg-purple-500/20 rounded">
                                        <Rocket className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <span className="text-gray-400 text-xs">
                                        Missions
                                    </span>
                                </div>
                                <div className="text-2xl font-bold text-purple-400">
                                    {liveStats.activeMissions}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Active
                                </div>
                            </div>
                        </div>

                        {/* Compact Preview Cards */}
                        <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
                            <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/20 h-full flex flex-col">
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                                    Asteroid Watch
                                </h3>
                                <div className="space-y-2 flex-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">
                                            Near-Earth Objects:
                                        </span>
                                        <span className="text-orange-400 font-semibold">
                                            Loading...
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">
                                            Potentially Hazardous:
                                        </span>
                                        <span className="text-red-400 font-semibold">
                                            Monitoring
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">
                                            Status:
                                        </span>
                                        <span className="text-green-400 font-semibold">
                                            All Clear
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/20 h-full flex flex-col">
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <Camera className="w-5 h-5 text-blue-400" />
                                    Daily Space Image
                                </h3>
                                <div className="flex-1 bg-linear-to-br from-blue-900/30 to-purple-900/30 rounded-lg flex items-center justify-center mb-2">
                                    <div className="text-center">
                                        <Camera className="w-6 h-6 text-white/50 mx-auto mb-1" />
                                        <p className="text-white/70 text-xs">
                                            NASA APOD Loading...
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs">
                                    Astronomy Picture of the Day
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "asteroids" && (
                    <div className="h-full overflow-hidden">
                        <RealNEOTracker />
                    </div>
                )}
                {activeSection === "apod" && (
                    <div className="h-full overflow-hidden">
                        <RealAPOD />
                    </div>
                )}
                {activeSection === "mars" && (
                    <div className="h-full overflow-hidden">
                        <SimpleMarsWeather />
                    </div>
                )}
                {activeSection === "earth" && (
                    <div className="h-full overflow-hidden">
                        <RealEarthImagery />
                    </div>
                )}
                {activeSection === "solar" && (
                    <div className="h-full overflow-hidden">
                        <RealSolarFlareMonitor />
                    </div>
                )}
            </div>

            {/* Compact Status Footer */}
            <div className="mt-3 bg-black/20 backdrop-blur-md rounded-lg p-2 border border-white/10 shrink-0">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-300">Live Feed</span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">NASA API</span>
                    </div>
                    <div className="text-gray-400">
                        🚀 Streaming Ready •{" "}
                        {mounted
                            ? currentTime.toLocaleTimeString()
                            : "--:--:--"}
                    </div>
                </div>
            </div>
        </div>
    );
}
