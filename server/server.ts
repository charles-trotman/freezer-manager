import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { readItems, addItem, updateItem, deleteItem } from './storage.js';
import type { FreezerItem, NewFreezerItem } from '../src/types.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET /api/items - Fetch all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await readItems();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// POST /api/items - Add new item
app.post('/api/items', async (req, res) => {
    try {
        const newItemData: NewFreezerItem = req.body;

        // Validate required fields
        if (!newItemData.name || !newItemData.frozenDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const item: FreezerItem = {
            ...newItemData,
            id: randomUUID(),
        };

        const savedItem = await addItem(item);
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Failed to add item' });
    }
});

// PUT /api/items/:id - Update existing item
app.put('/api/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates: Partial<FreezerItem> = req.body;

        const updatedItem = await updateItem(id, updates);

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// DELETE /api/items/:id - Delete item
app.delete('/api/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const success = await deleteItem(id);

        if (!success) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
