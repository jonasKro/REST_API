const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;

const people = [
  { id: 1, name: "hans" },
  { id: 2, name: "sepp" },
  { id: 3, name: "susi" },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/people/:id", function (req, res) {
  let id = req.params.id;
  res.send(people[id]);
});

app.get("/people", function (req, res) {
  res.send(people);
});

app.post("/people", function (req, res) {
  let person = req.body;
  people.push(person);
  res.send(person);
  console.log(req.body);
});

app.put("/people/:name", function (req, res) {
  const newName = req.params.name;
  const newPerson = { id: people.length + 1, name: newName };
  people.push(newPerson);
  res.send(newPerson);
});

app.delete("/people/:id", function (req, res) {
  const id = req.params.id;

  if (id >= 0 && id < people.length) {
    const deletedPerson = people.splice(id, 1);
    res.send(deletedPerson[0]);
  } else {
    res.status(404).send("Person not found");
  }
});

app.listen(3001);
