import { connectPolyfill } from "./polyfill";

export default {
	async fetch(req: Request) {
	  const gopherAddr = "gopher.floodgap.com:70";
	  const url = new URL(req.url);
  
	  try {
		const socket = connectPolyfill(gopherAddr);
  
		const writer = socket.writable.getWriter()
		const encoder = new TextEncoder();
		const encoded = encoder.encode(url.pathname + "\r\n");
		await writer.write(encoded);
  
		return new Response(socket.readable, { headers: { "Content-Type": "text/plain" } });
	  } catch (error) {
		return new Response("Socket connection failed: " + error, { status: 500 });
	  }
	}
  };