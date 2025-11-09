import React from "react";
import { Rocket } from "lucide-react";
const Header = ({ mounted, currentTime }) => {
    return (
        <>
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
                                🌍 Live Space Data
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
        </>
    );
};

export default Header;
