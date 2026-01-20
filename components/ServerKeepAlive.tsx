"use client";

import { useEffect } from "react";
import { apiFetch } from "@/lib/apiClient";

export default function ServerKeepAlive() {
    useEffect(() => {
        const pingBackend = async () => {
            try {
                await apiFetch("/api/health", {
                    method: "GET",
                });
                console.log("Backend keep-alive ping successful");
            } catch (error) {
                console.error("Backend keep-alive ping failed", error);
            }
        };

        // Ping immediately on mount
        pingBackend();

        // Set interval for every 5 minutes (300000 ms)
        const intervalId = setInterval(pingBackend, 300000);

        return () => clearInterval(intervalId);
    }, []);

    return null;
}
