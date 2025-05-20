// class NoteForm extends HTMLElement {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.innerHTML = `
//       <form id="note-form" class="note-form">
//         <input type="text" id="title" placeholder="Judul Catatan" required />
//         <textarea id="body" placeholder="Isi Catatan" required></textarea>
//         <button type="submit" id="button-submit">Tambah Catatan</button>
//       </form>
//     `;

//     const form = this.querySelector("#note-form");
//     const button = this.querySelector("#button-submit");

//     form.addEventListener("submit", async (e) => {
//       e.preventDefault(); // Mencegah reload halaman setelah submit
//       const title = this.querySelector("#title").value;
//       const body = this.querySelector("#body").value;

//       // Nonaktifkan tombol setelah submit
//       button.disabled = true;
//       button.textContent = "Menambahkan..."; // Menampilkan pesan loading

//       // POST request to create a note
//       try {
//         const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ title, body }),
//         });
//         const data = await response.json();
//         if (data.status === "success") {
//           this.dispatchEvent(
//             new CustomEvent("note-added", {
//               detail: { title, body, id: data.data.id, createdAt: data.data.createdAt },
//               bubbles: true,
//             })
//           );

//           // Reset form dan beri tahu komponen lain untuk refresh
//           form.reset();
//           button.disabled = false; // Aktifkan kembali tombol
//           button.textContent = "Tambah Catatan"; // Kembalikan teks tombol ke awal

//           // Kirim event refresh-notes ke komponen lain untuk me-refresh daftar catatan
//           this.dispatchEvent(new CustomEvent('refresh-notes', { bubbles: true }));
//         }
//       } catch (error) {
//         console.error("Error creating note:", error);
//         // Jika terjadi error, aktifkan tombol dan beri pesan error
//         button.disabled = false;
//         button.textContent = "Tambah Catatan (Gagal)";
//       }
//     });
//   }
// }

// customElements.define("note-form", NoteForm);


class NoteForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <form id="note-form" class="note-form">
        <input type="text" id="title" placeholder="Judul Catatan" required />
        <textarea id="body" placeholder="Isi Catatan" required></textarea>
        <button type="submit" id="button-submit">Tambah Catatan</button>
      </form>
    `;

    const form = this.querySelector("#note-form");
    const button = this.querySelector("#button-submit");

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Mencegah reload halaman setelah submit
      const title = this.querySelector("#title").value;
      const body = this.querySelector("#body").value;

      // Nonaktifkan tombol setelah submit
      button.disabled = true;
      button.textContent = "Menambahkan..."; // Menampilkan pesan loading

      // POST request to create a note
      try {
        const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body }),
        });
        const data = await response.json();
        if (data.status === "success") {
          this.dispatchEvent(
            new CustomEvent("note-added", {
              detail: { title, body, id: data.data.id, createdAt: data.data.createdAt },
              bubbles: true,
            })
          );

          // Reset form dan beri tahu komponen lain untuk langsung menampilkan catatan baru
          form.reset();
          button.disabled = false;
          button.textContent = "Tambah Catatan"; // Kembalikan teks tombol ke awal

        }
      } catch (error) {
        console.error("Error creating note:", error);
        // Jika terjadi error, aktifkan tombol dan beri pesan error
        button.disabled = false;
        button.textContent = "Tambah Catatan (Gagal)";
      }
    });
  }
}

customElements.define("note-form", NoteForm);
