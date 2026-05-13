import { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api";

function App() {
  const [notes, setNotes] = useState([]);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [editId, setEditId] = useState(null); // Menyimpan ID jika sedang mode edit

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    if (!judul || !isi) return alert("Isi semua bidang!");

    try {
      if (editId) {
        await updateNote(editId, { judul, isi });
      } else {
        await createNote({ judul, isi });
      }
      resetForm();
      fetchNotes(); // Ambil data terbaru
    } catch (error) {
      console.error("Gagal menyimpan catatan", error);
      alert("Gagal menyimpan catatan");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus catatan ini?")) return;
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Gagal menghapus catatan", error);
    }
  };

  const prepareEdit = (note) => {
    setEditId(note.id);
    setJudul(note.judul);
    setIsi(note.isi);
  };

  const resetForm = () => {
    setEditId(null);
    setJudul("");
    setIsi("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Notes App</h1>

      {/* Bagian Form */}
      <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Judul Catatan..."
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            style={{ padding: "8px", fontSize: "16px" }}
          />
          <textarea
            placeholder="Isi catatan..."
            rows="4"
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            required
            style={{ padding: "8px", fontSize: "16px" }}
          ></textarea>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              {editId ? "Perbarui Catatan" : "Tambah Catatan"}
            </button>
            
            {editId && (
              <button type="button" onClick={resetForm} style={{ padding: "10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <hr />

      <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", marginTop: "20px" }}>
        {notes.length === 0 ? (
          <p>Belum ada catatan.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ marginTop: 0 }}>{note.judul}</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{note.isi}</p>
              <small style={{ color: "#666" }}>
                Dibuat: {new Date(note.tanggal_dibuat).toLocaleString("id-ID")}
              </small>
              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button onClick={() => prepareEdit(note)} style={{ padding: "5px 10px", backgroundColor: "#ffc107", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(note.id)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;