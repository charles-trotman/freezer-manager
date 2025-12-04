export interface FreezerItem {
    id: string;
    name: string;
    frozenDate: string; // ISO date string YYYY-MM-DD
    useByDate: string; // ISO date string YYYY-MM-DD
    category: string;
    notes?: string;
}

export type NewFreezerItem = Omit<FreezerItem, 'id'>;
