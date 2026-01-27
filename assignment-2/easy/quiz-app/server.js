require("http").createServer((req, res) =>{
    console.log(req.url)
    const filepath = req.url.endsWith("/") ? "./index.html": "."+req.url
    require("fs").readFile(filepath, (e, f) => {
        res.writeHead(200, {"content-type": req.url.endsWith("/") ? "text/html": req.url.endsWith(".css") ? "text/css": req.url.endsWith(".js") ? "text/javascript": "text/html"}).end(f)
    })
}).listen(3000, ()=>console.log("server listening on 3000"));