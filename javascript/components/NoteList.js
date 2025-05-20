

// // customElements.define("note-list", NoteList);
// export default class NoteList extends HTMLElement {
//   constructor() {
//     super();
//     this.notes = []; // Catatan yang tidak diarsipkan
//     this.archivedNotes = []; // Catatan yang diarsipkan
//     // Ambil status isArchived dari localStorage, jika tidak ada, set default false
//     this.isArchived = JSON.parse(localStorage.getItem('isArchived')) || false;
//   }

//   connectedCallback() {
//     // Memuat catatan pertama kali
//     this.loadNotesFromAPI();
//   }

//   // Memuat catatan dari API
//   async loadNotesFromAPI() {
//     try {
//       const nonArchivedResponse = await fetch('https://notes-api.dicoding.dev/v2/notes');
//       const nonArchivedData = await nonArchivedResponse.json();

//       const archivedResponse = await fetch('https://notes-api.dicoding.dev/v2/notes/archived');
//       const archivedData = await archivedResponse.json();

//       if (nonArchivedData.status === "success" && archivedData.status === "success") {
//         // Menyimpan catatan yang tidak diarsipkan
//         this.notes = nonArchivedData.data.map((note) => ({
//           id: note.id,
//           title: note.title,
//           body: note.body,
//           date: new Date(note.createdAt).toLocaleString(),
//           archived: note.archived,
//         }));

//         // Menyimpan catatan yang diarsipkan
//         this.archivedNotes = archivedData.data.map((note) => ({
//           id: note.id,
//           title: note.title,
//           body: note.body,
//           date: new Date(note.createdAt).toLocaleString(),
//           archived: note.archived,
//         }));

//         this.render(); // Render catatan yang sesuai dengan status isArchived
//       }
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   }

//   // Render catatan ke halaman
//   render() {
//     this.innerHTML = ""; // Bersihkan daftar yang lama
//     this.classList.add("notes-container");

//     // Tombol untuk switch antara melihat archived dan unarchived
//     const toggleButton = document.createElement("button");
//     toggleButton.textContent = this.isArchived ? 'Show Unarchived' : 'Show Archived';

//     toggleButton.addEventListener("click", () => {
//       this.isArchived = !this.isArchived; // Toggle status archive
//       toggleButton.textContent = this.isArchived ? 'Show Unarchived' : 'Show Archived'; // Update tombol
//       // Simpan status isArchived ke localStorage agar tetap bertahan setelah reload
//       localStorage.setItem('isArchived', JSON.stringify(this.isArchived));
//       this.render(); // Render ulang tampilan sesuai status
//     });

//     this.appendChild(toggleButton); // Menambahkan tombol toggle ke halaman

//     // Menampilkan catatan sesuai dengan status isArchived
//     const notesToDisplay = this.isArchived ? this.archivedNotes : this.notes;

//     // Loop melalui catatan yang akan ditampilkan dan masukkan ke dalam halaman
//     notesToDisplay.forEach((note) => {
//       const item = document.createElement("note-item");
//       item.noteData = note; // Memberikan data catatan ke note-item
//       this.appendChild(item);
//     });
//   }
// }

// customElements.define("note-list", NoteList);


export default class NoteList extends HTMLElement {
  constructor() {
    super();
    this.notes = []; // Catatan yang tidak diarsipkan
    this.archivedNotes = []; // Catatan yang diarsipkan
    this.isArchived = JSON.parse(localStorage.getItem('isArchived')) || false;
  }

  connectedCallback() {
    this.loadNotesFromAPI(); // Memuat catatan pertama kali

    // Mendengarkan event untuk menambahkan catatan baru
    this.addEventListener("note-added", (e) => {
      const { title, body, id, createdAt } = e.detail;
      this.addNewNoteToList(title, body, id, createdAt); // Menambahkan catatan baru
    });
  }

  // Memuat catatan dari API
  async loadNotesFromAPI() {
    try {
      const nonArchivedResponse = await fetch('https://notes-api.dicoding.dev/v2/notes');
      const nonArchivedData = await nonArchivedResponse.json();

      const archivedResponse = await fetch('https://notes-api.dicoding.dev/v2/notes/archived');
      const archivedData = await archivedResponse.json();

      if (nonArchivedData.status === "success" && archivedData.status === "success") {
        this.notes = nonArchivedData.data.map((note) => ({
          id: note.id,
          title: note.title,
          body: note.body,
          date: new Date(note.createdAt).toLocaleString(),
          archived: note.archived,
        }));

        this.archivedNotes = archivedData.data.map((note) => ({
          id: note.id,
          title: note.title,
          body: note.body,
          date: new Date(note.createdAt).toLocaleString(),
          archived: note.archived,
        }));

        this.render(); // Render catatan yang sesuai dengan status isArchived
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // Menambahkan catatan baru ke dalam daftar
  addNewNoteToList(title, body, id, createdAt) {
    const newNote = {
      id,
      title,
      body,
      date: new Date(createdAt).toLocaleString(),
      archived: false, // Default saat penambahan adalah belum diarsipkan
    };
    this.notes.push(newNote); // Menambahkan catatan ke list notes
    this.render(); // Render ulang dengan catatan yang baru
  }

  // Render catatan ke halaman
  render() {
    this.innerHTML = ""; // Bersihkan daftar yang lama
    this.classList.add("notes-container");

    // Tombol untuk switch antara melihat archived dan unarchived
    const toggleButton = document.createElement("button");
    toggleButton.textContent = this.isArchived ? 'Show Unarchived' : 'Show Archived';

    toggleButton.addEventListener("click", () => {
      this.isArchived = !this.isArchived;
      toggleButton.textContent = this.isArchived ? 'Show Unarchived' : 'Show Archived';
      localStorage.setItem('isArchived', JSON.stringify(this.isArchived));
      this.render();
    });

    this.appendChild(toggleButton);

    const notesToDisplay = this.isArchived ? this.archivedNotes : this.notes;

    notesToDisplay.forEach((note) => {
      const item = document.createElement("note-item");
      item.noteData = note;
      this.appendChild(item);
    });
  }
}

customElements.define("note-list", NoteList);
