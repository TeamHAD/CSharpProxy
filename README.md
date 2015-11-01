DeviceSimulator
===========
This is a basic web service endpoint to simulate a Advantech ADAM 6066 web service in order to test API calls from a Node.js server.

Installation
------------
### Prequisites
Node.js – see [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager) for installation instructions

Express.js - see [http://expressjs.com/starter/installing.html](http://expressjs.com/starter/installing.html) for installation instructions

Clone the project from Git

    git clone https://github.com/TeamHAD/DeviceSimulator.git ./DeviceSimulator
    cd DeviceSimulator
    node index.js

This will start a web server running on port 3000. Access it from your browser at http://localhost:3000.

The service simulates calls to a networked ADAM 6066 device's web server. You can get a specific device's channel info by querying for its id
http://localhost:3000/digitaloutput/0/value.

Any changes you make to the code require the server to be restarted.
