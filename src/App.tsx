import { useState } from 'react';
import './App.css';
import { ItemList } from './components/ItemList';
import { ItemForm } from './components/ItemForm';
import { useFreezerItems } from './useFreezerItems';
import type { FreezerItem, NewFreezerItem } from './types';

function App() {
  const { items, loading, error, addItem, updateItem, deleteItem } = useFreezerItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FreezerItem | undefined>(undefined);

  const handleAddNew = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (item: FreezerItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteItem(id);
    }
  };

  const handleSubmit = (itemData: NewFreezerItem) => {
    if (editingItem) {
      updateItem(editingItem.id, itemData);
    } else {
      addItem(itemData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Freezer Manager</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: '0.5rem 0 0 0' }}>Keep track of your frozen items.</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}>
          + Add Item
        </button>
      </header>

      <main>
        {loading && <p style={{ textAlign: 'center', padding: '2rem' }}>Loading items...</p>}
        {error && <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-error)' }}>Error: {error}</p>}
        {!loading && !error && <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />}
      </main>

      {isModalOpen && (
        <ItemForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
