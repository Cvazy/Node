const fs = require("node:fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    id: Date.now().toString(),
    title,
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added!"));
}

async function editNote(noteId, newTitle) {
  const notes = await getNotes();

  const noteIndex = notes.findIndex(({ id }) => id === noteId);

  notes[noteIndex].title = newTitle;

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(
    chalk.bgGreen(
      `The title of the note with id=${noteId} has been successfully changed to the ${newTitle}`,
    ),
  );
}

async function removeNote(noteId) {
  const notes = await getNotes();

  const noteIndex = notes.findIndex(({ id }) => id === noteId);

  notes.splice(noteIndex, 1);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgRed(`Note with id=${noteId} was removed!`));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  const notesJSON = JSON.parse(notes);

  return Array.isArray(notesJSON) ? notesJSON : [];
}

async function printNotes() {
  const notes = await getNotes();

  if (notes.length) {
    console.log(chalk.bgBlue("Here is the list of notes:"));

    notes.forEach((el) => {
      console.log(chalk.blue(`${el.id} ${el.title}`));
    });
  } else {
    console.log(chalk.bgYellow("Notes list is empty"));
  }
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
