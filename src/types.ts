export interface FreezerItem {
    id: string;
    name: string;
    frozenDate: string;
    originalExpiryDate?: string;
    useByDate?: string;
    category: string;
    notes?: string;
}

export interface NewFreezerItem {
    name: string;
    frozenDate: string;
    originalExpiryDate?: string;
    useByDate?: string;
    category: string;
    notes?: string;
}
