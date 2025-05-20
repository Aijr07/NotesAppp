import './components/NoteForm.js';
import './components/NoteList.js';

const app = document.querySelector('main');
app.innerHTML = `
  <note-form></note-form>
  <note-list></note-list>
`;
