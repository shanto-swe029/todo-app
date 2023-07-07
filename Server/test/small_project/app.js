
/**
 * Step-1
 * The first thing to do is to pull the HTTP module from Node.js using require() method.
 * This way, we make the necessary methods and functions available to set up a server.
 */

const http = require("http");

/**
 * Step-2
 * Once available, define the port you want the server to run on, as shown below.
 */
const PORT = process.env.PORT || 5000;

/**
 * Step-3
 * To create the server, you need to call the createServer method from the HTTP module. i.e, http.createServer. 
 * Pass a response and a request that serves up your information.
 */
const server = http.createServer(async (req, res) => {
    //set the request route
    if (req.url === "/api" && req.method === "GET") {
        //response headers
        res.writeHead(200, { "Content-Type": "application/json" });
        //set the response
        res.write("Hi there, This is a Vanilla Node.js API");
        //end the response
        res.end();
    }

    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

/**
 * Step-4
 * Call the listen() method and pass in the PORT variable. 
 * Then add a console.log() message that will indicate the server is up and running.
 */
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

/**
 * Step-5
 * The server is well set. Run node app.js to test it. 
 * This will log the console.log() message on your command screen.
 */

/**
 * Step-6
 * If you open http://localhost:5000/api on a browser, 
 * you’ll be served the response as defined in the res.write()
 */