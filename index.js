const http = require("http");

const app = require("./src/config/express.config");

const server = http.createServer(app);

const PORT = 8005;
const HOST = "localhost";

server.listen(PORT, HOST, (err) => {
    if(!err) {
        console.log("Server is running on port", PORT);
        console.log("Press ctrl+c to discontinue server.....");
        
        
    }
});
