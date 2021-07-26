const path = require('path');
const router = require('express').Router();

const engine = require('../db/engine')


// GET requests to /notes get the JSON object of the saved notes
router.get("/notes", (req, res) => {
  console.info(`${req.method} request received to /api/notes`);
  // read the notes db and return it to the client as JSON data
  engine.getNotes().then((data) => res.json(JSON.parse(data)));
});
// POST requests 
router.post("/notes", (req, res) => {
  // incoming param is stringified note object {title: ,text: } from front end
  console.info(`${req.method} request received to /api/notes`);
  // create a new note object using the note title and text (req.body) from client http POST
  engine.addNote(req.body);
  res.json(`${req.method} request received adding note`);
});

router.delete("/notes/:id", (req, res) => {
  // incoming param in the URL is the note id in JSON format
  console.info(`${req.method} request received to /api/notes`);
  // delete note with matching id from db
  engine
    // read the notes db and return it as data
    .getNotes()
    // pass parsed db array to deleteNote along with the note's id from url param
    .then((data) => engine.deleteNote(JSON.parse(data), req.params.id))
  res.json(`${req.method} request received deleting note ${req.params.id}`);

});

// send all other requests to /api/notes a 404 error
router.get("*", (req, res) => {
  console.error("404 bad request");
  res.json('404 bad request');
});

module.exports = router;