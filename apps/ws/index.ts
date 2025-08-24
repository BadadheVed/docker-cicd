import { PrismaClient } from "@prisma/client";
import { dbClient } from "db/client";



Bun.serve({
  port: 8081,

  fetch(req, server) {
    // Upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // ✅ WebSocket upgraded, no HTTP response needed
    }
    return new Response("Upgrade failed", { status: 500 });
  },

  websocket: {
    async message(ws, message) {
      // Create a new user with random username + password
      const user = await dbClient.user.create({
        data: {
          username: Math.random().toString(36).substring(2, 9),
          password: Math.random().toString(),
        },
      });

      console.log("✅ User created:", user);

      
      ws.send(JSON.stringify(user));
    },
  },
});

console.log("🚀 WebSocket server running on ws://localhost:8081");
