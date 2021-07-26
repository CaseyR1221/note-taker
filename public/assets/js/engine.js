const fs = require("fs");
const path = require("path");
const util = require("util");
const dbPath = path.join(__dirname,"db.json");
// promisified version of fs.readFile so we can use it in the middleware promise chains
const readFromFile = util.promisify(fs.readFile);

// Read db and return array of notes
const getNotes = () => {
  const notes = readFromFile(dbPath);
  return notes;
}

// new note constructor creates an Note object with name, text, and id
// format of notes for db
class Note {
  constructor(title, text, id) {
    this.title = title;
    this.text = text;
    this.id = id;
  }
}

// write the saved notes list array to file
const writeToFile = (destination, content) =>
// stringify the array/object, format it to look like JS, write to db
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// helper function which parses JSON into savedNotes array and pushes new note, then stringifies it again for the front end
const readAndAppend = (content, file) => {
  // get the db file
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // parse db json file back into js array of note objects
      const savedNotes = JSON.parse(data);
      // push the new note object to the array
      savedNotes.push(content);
      // write to file and stringify it for transport to front end over http
      writeToFile(file, savedNotes);
    }
  });
};

// takes in note object from front end and prepares it for the db using the Note constructor and random unique id generator
const addNote = (note) => {
  // pull in random uuid generator from npm
  const { v4: uuidv4 } = require("uuid");
  console.log('adding new note');
  // use class to create a new note using the object passed from the front end
  const newNote = new Note(note.title, note.text, uuidv4());
  // write new note to the db
  readAndAppend(newNote, dbPath);
}

// find selected note in the db using id from front end
const deleteNote = (notes, noteId) => {
  console.log(notes);
  // create new array with everything except the matching note id (deleting that note object essentially)
  const updatedDb = notes.filter((note) => note.id !== noteId);
  // write that new array to the file updating the db
  writeToFile(dbPath, updatedDb);
  };
  

// export these functions as methods within the module 
// requiring these functions in apiRoutes gives these functions access to req, res objects (middleware)
module.exports = {getNotes, addNote, deleteNote};