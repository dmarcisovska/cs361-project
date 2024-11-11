import zmq from "zeromq";

async function run() {
  const sock = new zmq.Subscriber();
  sock.connect("tcp://127.0.0.1:3000");

  sock.subscribe("current_time");

  for await (const [topic, message] of sock) {
    console.log(`Received ${topic.toString()}: ${message.toString()}`);
  }
}

run();
