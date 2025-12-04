import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { FreezerItem } from '../src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'freezer-items.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
        console.error('Error creating data directory:', error);
    }
}

// Read items from JSON file
export async function readItems(): Promise<FreezerItem[]> {
    try {
        await ensureDataDir();
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return empty array
            return [];
        }
        throw error;
    }
}

// Write items to JSON file
export async function writeItems(items: FreezerItem[]): Promise<void> {
    try {
        await ensureDataDir();
        await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing to file:', error);
        throw error;
    }
}

// Add a new item
export async function addItem(item: FreezerItem): Promise<FreezerItem> {
    const items = await readItems();
    items.unshift(item);
    await writeItems(items);
    return item;
}

// Update an existing item
export async function updateItem(id: string, updates: Partial<FreezerItem>): Promise<FreezerItem | null> {
    const items = await readItems();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
        return null;
    }

    items[index] = { ...items[index], ...updates };
    await writeItems(items);
    return items[index];
}

// Delete an item
export async function deleteItem(id: string): Promise<boolean> {
    const items = await readItems();
    const filteredItems = items.filter(item => item.id !== id);

    if (filteredItems.length === items.length) {
        return false; // Item not found
    }

    await writeItems(filteredItems);
    return true;
}
