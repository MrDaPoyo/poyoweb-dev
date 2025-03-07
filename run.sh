(cd poyoweb-server && bun run dev) & \
(cd poyoweb-server && ls && docker compose up) & \
(cd poyoweb-client && npm run dev -- --port 4000)
