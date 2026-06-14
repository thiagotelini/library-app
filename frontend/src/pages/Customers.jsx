import { useState, useEffect, useCallback } from 'react';
import { customersApi } from '../api/api';
import './Books.css';

const emptyCustomer = { cpf: '', name: '', phone: '', address: { neighborhood: '', street: '', number: '' } };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCustomer);
  const [error, setError] = useState('');

  const fetchCustomers = useCallback(() => {
    customersApi.list().then(res => setCustomers(res.data || [])).catch(() => {});
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyCustomer);
    setError('');
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      cpf: c.cpf,
      name: c.name,
      phone: c.phone,
      address: { ...c.address },
    });
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (cpf) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    try {
      await customersApi.delete(cpf);
      fetchCustomers();
    } catch {
      setError('Erro ao excluir cliente');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.cpf || !form.name || !form.phone || !form.address.street || !form.address.neighborhood || !form.address.number) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      if (editing) {
        const { cpf, ...data } = form;
        await customersApi.update(cpf, data);
      } else {
        await customersApi.create(form);
      }
      setShowModal(false);
      fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar cliente');
    }
  };

  const setAddress = (field, value) => {
    setForm({ ...form, address: { ...form.address, [field]: value } });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Clientes</h1>
        <button className="btn btn-primary" onClick={openAdd}>Adicionar Cliente</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.cpf}>
              <td>{c.cpf}</td>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.address.street}, {c.address.number} - {c.address.neighborhood}</td>
              <td>
                <div className="actions">
                  <button className="btn btn-primary btn-sm" onClick={() => openEdit(c)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.cpf)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                Nenhum cliente encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editing ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>CPF *</label>
                <input
                  value={form.cpf}
                  onChange={e => setForm({...form, cpf: e.target.value})}
                  disabled={!!editing}
                />
              </div>
              <div className="form-group">
                <label>Nome *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Telefone *</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Rua *</label>
                <input value={form.address.street} onChange={e => setAddress('street', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Número *</label>
                <input value={form.address.number} onChange={e => setAddress('number', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Bairro *</label>
                <input value={form.address.neighborhood} onChange={e => setAddress('neighborhood', e.target.value)} />
              </div>
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
