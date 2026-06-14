import { useState, useEffect, useCallback } from 'react';
import { booksApi, customersApi } from '../api/api';
import './Books.css';

function TagsInput({ tags, onChange }) {
  const [input, setInput] = useState('');

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const removeTag = (tag) => onChange(tags.filter(t => t !== tag));

  return (
    <div className="tags-input" onClick={() => document.getElementById('tag-input')?.focus()}>
      {tags.map(tag => (
        <span key={tag} className="tag">
          {tag}
          <button type="button" onClick={() => removeTag(tag)}>&times;</button>
        </span>
      ))}
      <input
        id="tag-input"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
        placeholder="Adicionar tag..."
      />
    </div>
  );
}

const emptyBook = { title: '', author: '', publisher: '', tags: [], shelf: '' };

export default function Books() {
  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyBook);
  const [assignedCpf, setAssignedCpf] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');

  const fetchBooks = useCallback(() => {
    booksApi.list().then(res => setBooks(res.data || [])).catch(() => {});
  }, []);

  const fetchCustomers = useCallback(() => {
    customersApi.list().then(res => setCustomers(res.data || [])).catch(() => {});
  }, []);

  useEffect(() => { fetchBooks(); fetchCustomers(); }, [fetchBooks, fetchCustomers]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyBook);
    setAssignedCpf('');
    setReturnDate('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (book) => {
    setEditing(book);
    setForm({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      tags: [...book.tags],
      shelf: book.shelf,
    });
    setAssignedCpf(book.status?.customerCpf || '');
    setReturnDate(book.returnDate || '');
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;
    try {
      await booksApi.delete(id);
      fetchBooks();
    } catch {
      setError('Erro ao excluir livro');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title || !form.author || !form.publisher || !form.shelf) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      if (editing) {
        const status = assignedCpf
          ? { availability: 'loaned', customerCpf: assignedCpf }
          : { availability: 'available' };
        await booksApi.update(editing.bookId, { ...form, status, returnDate });
      } else {
        await booksApi.create(form);
      }
      setShowModal(false);
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar livro');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Livros</h1>
        <button className="btn btn-primary" onClick={openAdd}>Adicionar Livro</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>Prateleira</th>
            <th>Status</th>
            <th>Cliente</th>
            <th>Previsão Devolução</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.shelf}</td>
              <td>
                <span className={`badge ${book.status?.availability === 'available' ? 'badge-available' : 'badge-loaned'}`}>
                  {book.status?.availability === 'available' ? 'Disponível' : 'Emprestado'}
                </span>
              </td>
              <td>{book.status?.customerCpf || '-'}</td>
              <td>{book.returnDate || '-'}</td>
              <td>
                <div className="actions">
                  <button className="btn btn-primary btn-sm" onClick={() => openEdit(book)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.bookId)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                Nenhum livro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editing ? 'Editar Livro' : 'Adicionar Livro'}</h2>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Autor *</label>
                <input value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Editora *</label>
                <input value={form.publisher} onChange={e => setForm({...form, publisher: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Prateleira *</label>
                <input value={form.shelf} onChange={e => setForm({...form, shelf: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Tags</label>
                <TagsInput tags={form.tags} onChange={tags => setForm({...form, tags})} />
              </div>
              {editing && (
                <>
                  <div className="form-group">
                    <label>Atribuir Cliente</label>
                    <select value={assignedCpf} onChange={e => setAssignedCpf(e.target.value)}>
                      <option value="">-- Sem cliente (disponível) --</option>
                      {customers.map(c => (
                        <option key={c.cpf} value={c.cpf}>{c.name} ({c.cpf})</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Previsão de Devolução</label>
                    <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
                  </div>
                </>
              )}
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Atualizar' : 'Criar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
