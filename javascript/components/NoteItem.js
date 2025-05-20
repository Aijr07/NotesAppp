

// export default class NoteItem extends HTMLElement {
//   set noteData(data) {
//     this.innerHTML = `
//       <div class="note-item">
//         <h3>${data.title}</h3>
//         <p>${data.body}</p>
//         <small>${data.date}</small>
//         <button class="delete-btn">Hapus</button>
//         <button class="archive-btn">${data.archived ? 'Unarchive' : 'Archive'}</button>
//       </div>
//     `;

//     // Hapus catatan
//     this.querySelector(".delete-btn").addEventListener("click", async () => {
//       try {
//         const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${data.id}`, {
//           method: 'DELETE',
//         });
//         const result = await response.json();
//         if (result.status === "success") {
//           this.remove();
//         }
//       } catch (error) {
//         console.error("Error deleting note:", error);
//       }
//     });

//     // Archive / Unarchive catatan
//     this.querySelector(".archive-btn").addEventListener("click", async () => {
//       const method = data.archived ? 'unarchive' : 'archive';
//       try {
//         const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${data.id}/${method}`, {
//           method: 'POST',
//         });
//         const result = await response.json();
//         if (result.status === "success") {
//           // Perbarui status archived dan render ulang komponen
//           data.archived = !data.archived;
//           this.querySelector(".archive-btn").textContent = data.archived ? 'Unarchive' : 'Archive';
//         }
//       } catch (error) {
//         console.error(`Error ${method} note:`, error);
//       }
//     });
//   }
// }

// customElements.define("note-item", NoteItem);

export default class NoteItem extends HTMLElement {
  set noteData(data) {
    this.innerHTML = `
      <div class="note-item">
        <h3>${data.title}</h3>
        <p>${data.body}</p>
        <small>${data.date}</small>
        <button class="delete-btn">Hapus</button>
        <button class="archive-btn">${data.archived ? 'Unarchive' : 'Archive'}</button>
      </div>
    `;

    // Hapus catatan
    this.querySelector(".delete-btn").addEventListener("click", async () => {
      try {
        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${data.id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.status === "success") {
          this.remove();
        }
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    });

    // Archive / Unarchive catatan
    this.querySelector(".archive-btn").addEventListener("click", async () => {
      const method = data.archived ? 'unarchive' : 'archive';
      try {
        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${data.id}/${method}`, {
          method: 'POST',
        });
        const result = await response.json();
        if (result.status === "success") {
          // Perbarui status archived dan render ulang komponen
          data.archived = !data.archived;
          this.querySelector(".archive-btn").textContent = data.archived ? 'Unarchive' : 'Archive';
          // Refresh halaman setelah perubahan
          window.location.reload();
        }
      } catch (error) {
        console.error(`Error ${method} note:`, error);
      }
    });
  }
}

customElements.define("note-item", NoteItem);
