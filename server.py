#!/usr/bin/env python3
import http.server
import socketserver
import os

# Set the port based on the environment
PORT = 12001  # Using the second available port from runtime information

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

def run_server():
    handler = CORSHTTPRequestHandler
    
    # Allow the server to be accessed from any host
    with socketserver.TCPServer(("0.0.0.0", PORT), handler) as httpd:
        print(f"Server running at http://0.0.0.0:{PORT}/")
        print(f"You can access it at https://work-2-fvyunpcypjmjnbik.prod-runtime.all-hands.dev")
        httpd.serve_forever()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    run_server()