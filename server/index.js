const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
}) 

const db = mysql.createConnection({
    user: "b3e64cd0bc5867",
    host: "eu-cdbr-west-03.cleardb.net",
    password: "72b84fbd",
    database: "heroku_ff81b32c2f22ba0"
})


app.post("/create", (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const wage = req.body.wage

    db.query("INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)", [name, age, country, position, wage], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send("Values Inserted")
        }
    })
})

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

app.put("/update", (req, res) => {
    const id = req.body.id
    const wage = req.body.wage
    db.query("UPDATE employees SET wage = ? WHERE id = ?", [wage, id], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`Yay, your server is running ...`)
})

