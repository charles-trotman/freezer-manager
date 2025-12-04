import { useState, useEffect } from 'react';
import type { FreezerItem, NewFreezerItem } from './types';

const API_BASE = '/api';

export function useFreezerItems() {
    const [items, setItems] = useState<FreezerItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch items from server on mount
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/items`);
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItems(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching items:', err);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (newItem: NewFreezerItem) => {
        try {
            setError(null);
            const response = await fetch(`${API_BASE}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error('Failed to add item');
            }

            const item = await response.json();
            setItems(prev => [item, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add item');
            console.error('Error adding item:', err);
            throw err;
        }
    };

    const updateItem = async (id: string, updates: Partial<FreezerItem>) => {
        try {
            setError(null);
            const response = await fetch(`${API_BASE}/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            const updatedItem = await response.json();
            setItems(prev => prev.map(item =>
                item.id === id ? updatedItem : item
            ));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update item');
            console.error('Error updating item:', err);
            throw err;
        }
    };

    const deleteItem = async (id: string) => {
        try {
            setError(null);
            const response = await fetch(`${API_BASE}/items/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            setItems(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete item');
            console.error('Error deleting item:', err);
            throw err;
        }
    };

    return { items, loading, error, addItem, updateItem, deleteItem };
}

