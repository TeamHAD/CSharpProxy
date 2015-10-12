CsharpProxy
===========
This is a basic web service endpoint to simulate a C# web service in order to test API calls from a Node.js server.

Installation
------------
### Prequisites
Node.js – see [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager) for installation instructions

Express.js - see [http://expressjs.com/starter/installing.html](http://expressjs.com/starter/installing.html) for installation instructions

Clone the project from Git

    git clone https://github.com/TeamHAD/CSharpProxy.git ./CSharpProxy
    cd CSharpProxy
    node index.js

This will start a web server running on port 3000. Access it from your browser at http://localhost:3000.

The service contains information about three hypothetical devices. You can get a collection of all the devices in JSON format by requesting

http://localhost:3000/getDevices

or get a specific device's info by querying for its id
http://localhost:3000/getDevice/981e65d74c75aeb439b25fb89f6360b2.

Any changes you make to the code require the server to be restarted.
