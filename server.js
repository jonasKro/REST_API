const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require("./db");

const people = [
  { id: 1, name: "hans" },
  { id: 2, name: "sepp" },
  { id: 3, name: "susi" },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/people/:id", async function (req, res) {
  let id = parseInt(req.params.id, 10);
  try {
    const [rows] = await db.query("SELECT * FROM people WHERE id = ?", [id]);
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send("Person not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/people", async function (req, res) {
  try {
    let rows = await db.query("select * from people");
    res.send(rows);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/people", async function (req, res) {
  let person = req.body;
  let sql = "insert into people values(?,?,?)";
  try {
    let result = await db.query(sql, [
      person.id,
      person.firstname,
      person.lastname,
    ]);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.put("/people/:id", async function (req, res) {
  let id = parseInt(req.params.id, 10);
  let newName = req.body.name;
  let sql = "UPDATE people SET firstname = ? WHERE id = ?";
  try {
    const [result] = await db.query(sql, [newName, id]);
    if (result.affectedRows > 0) {
      res.send({ id, firstname: newName });
    } else {
      res.status(404).send("Person not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/people/:id", async function (req, res) {
  let id = parseInt(req.params.id, 10);
  let sql = "DELETE FROM people WHERE id = ?";
  try {
    const [result] = await db.query(sql, [id]);
    if (result.affectedRows > 0) {
      res.send(`Person with ID ${id} deleted successfully`);
    } else {
      res.status(404).send("Person not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3001);
