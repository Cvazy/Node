const yargs = require("yargs");
const {
  addNote,
  editNote,
  printNotes,
  removeNote,
} = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  async handler({ title }) {
    await addNote(title);
  },
});

yargs.command({
  command: "edit",
  describe: "Change note title",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
    newTitle: {
      type: "string",
      describe: "New note title",
      demandOption: true,
    },
  },
  async handler({ id, newTitle }) {
    await editNote(id, newTitle);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
  },
  async handler({ id }) {
    await removeNote(id);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    await printNotes();
  },
});

yargs.parse();
