const express = require("express")
const port = 3001
const app = express()

app.use(express.static(__dirname + "/dist/"))
app.get(/.*/, function(req, res) {
  res.sendfile(__dirname + "/dist/index.html")
})
app.listen(port)
