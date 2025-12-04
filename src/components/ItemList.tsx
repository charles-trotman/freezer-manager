import type { FreezerItem } from '../types';
import { ItemCard } from './ItemCard';

interface ItemListProps {
    items: FreezerItem[];
    onEdit: (item: FreezerItem) => void;
    onDelete: (id: string) => void;
}

export function ItemList({ items, onEdit, onDelete }: ItemListProps) {
    if (items.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
                <p>Your freezer is empty. Add some items!</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {items.map(item => (
                <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}
