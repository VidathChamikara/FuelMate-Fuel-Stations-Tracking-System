const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({ "user": ["userOne", "userTwo", "userThree"] }) //hardcode data with api
})

app.listen(5000, () => { console.log("Server started on port 5000")}) //define which port to run server(npm run dev)