#!/bin/bash

# Function to find and kill a process
kill_process() {
    local pattern=$1
    local pids=$(pgrep -f "$pattern")
    if [ -n "$pids" ]; then
        echo "Stopping $pattern..."
        kill $pids
        sleep 2
    fi
}

# Kill existing processes
kill_process "bun run dev"
kill_process "docker compose up"
kill_process "npm run dev -- --port 4000"

# Restart the processes
(cd poyoweb-server && bun run dev) & 
(cd poyoweb-server && docker compose up) & 
(cd poyoweb-client && npm run dev -- --port 4000)
