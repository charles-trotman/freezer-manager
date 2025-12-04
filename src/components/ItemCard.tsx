import type { FreezerItem } from '../types';

interface ItemCardProps {
    item: FreezerItem;
    onEdit: (item: FreezerItem) => void;
    onDelete: (id: string) => void;
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
    const isExpired = new Date(item.useByDate) < new Date();
    const isExpiringSoon = !isExpired && new Date(item.useByDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return (
        <div className="card" style={{
            borderLeft: isExpired ? '4px solid var(--color-danger)' : isExpiringSoon ? '4px solid var(--color-warning)' : '4px solid var(--color-success)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{item.name}</h3>
                    <span style={{
                        fontSize: '0.875rem',
                        backgroundColor: 'var(--color-surface-hover)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        color: 'var(--color-text-muted)'
                    }}>
                        {item.category}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn" style={{ backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text)' }} onClick={() => onEdit(item)}>
                        Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(item.id)}>
                        Delete
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                <div>
                    <div style={{ color: 'var(--color-text-muted)' }}>Frozen On</div>
                    <div>{new Date(item.frozenDate).toLocaleDateString()}</div>
                </div>
                <div>
                    <div style={{ color: 'var(--color-text-muted)' }}>Use By</div>
                    <div style={{
                        color: isExpired ? 'var(--color-danger)' : isExpiringSoon ? 'var(--color-warning)' : 'inherit',
                        fontWeight: isExpired || isExpiringSoon ? 'bold' : 'normal'
                    }}>
                        {new Date(item.useByDate).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {item.notes && (
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-surface-hover)', paddingTop: '0.5rem' }}>
                    {item.notes}
                </div>
            )}
        </div>
    );
}
