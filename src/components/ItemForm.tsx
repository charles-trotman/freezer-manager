import { useState, useEffect } from 'react';
import type { FreezerItem, NewFreezerItem } from '../types';

interface ItemFormProps {
    initialData?: FreezerItem;
    onSubmit: (item: NewFreezerItem) => void;
    onCancel: () => void;
}

const CATEGORIES = ['Meat', 'Vegetables', 'Fruit', 'Prepared Meals', 'Dessert', 'Other'];

export function ItemForm({ initialData, onSubmit, onCancel }: ItemFormProps) {
    const [formData, setFormData] = useState<NewFreezerItem>({
        name: '',
        category: 'Other',
        frozenDate: new Date().toISOString().split('T')[0],
        originalExpiryDate: '',
        useByDate: '',
        notes: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                category: initialData.category,
                frozenDate: initialData.frozenDate,
                originalExpiryDate: initialData.originalExpiryDate || '',
                useByDate: initialData.useByDate,
                notes: initialData.notes || ''
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 style={{ marginTop: 0 }}>{initialData ? 'Edit Item' : 'Add New Item'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Name</label>
                        <input
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Chicken Breast"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Category</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Frozen Date</label>
                            <input
                                type="date"
                                required
                                value={formData.frozenDate}
                                onChange={e => setFormData({ ...formData, frozenDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Original Expiry (Opt)</label>
                            <input
                                type="date"
                                value={formData.originalExpiryDate}
                                onChange={e => setFormData({ ...formData, originalExpiryDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Use By Date</label>
                            <input
                                type="date"
                                required
                                value={formData.useByDate}
                                onChange={e => setFormData({ ...formData, useByDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Notes</label>
                        <textarea
                            rows={3}
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Optional notes..."
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" className="btn" style={{ flex: 1, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text)' }} onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                            {initialData ? 'Save Changes' : 'Add Item'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
