import zmq from "zeromq";
import { WebSocketServer } from "ws";

async function run() {
  const sock = new zmq.Subscriber();
  sock.connect("tcp://127.0.0.1:3006");

  sock.subscribe("current_time");
  console.log("Subscriber connected to port 3002");

  const wss = new WebSocketServer({ port: 3002 });
  console.log("WebSocket server running on port 3002");

  for await (const [topic, message] of sock) {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) { 
        client.send(message.toString());
      }
    });
  }
}

run();
