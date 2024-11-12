import zmq from "zeromq";
import { WebSocketServer } from "ws";

async function run() {
  const sock = new zmq.Subscriber();
  sock.connect("tcp://127.0.0.1:3006"); // current_time
  sock.connect("tcp://127.0.0.1:3004"); //quote
  sock.connect("tcp://127.0.0.1:3008"); //temp

  sock.subscribe("current_time");
  sock.subscribe("quote_body");
  sock.subscribe("quote_author");
  sock.subscribe("weather");
  console.log("Subscriber connected to ports 3006 and 3004");

  const wss = new WebSocketServer({ port: 3002 });
  console.log("WebSocket server running on port 3006");

  for await (const [topic, message] of sock) {
    let data;
    if (topic.toString() === "current_time") {
      data = { type: "current_time", content: message.toString() };
    } else if (topic.toString() === "quote_body") {
      data = { type: "quote_body", content: message.toString() };
    } else if (topic.toString() === "quote_author") {
      data = { type: "quote_author", content: message.toString() };
    } else if (topic.toString() === "weather") {
      data = { type: "weather", content: message.toString() };
    }
    

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

run();
