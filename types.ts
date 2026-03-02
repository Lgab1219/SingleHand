export interface User {
    email: string;
    password: string;
    confirm_password: string;
}

export interface Option {
    id: number | string;
    label: string;
    value: string;
}

export interface PickerProps {
    optionList: Option[];
    value?: Option | string;
    onSelect: (option: Option) => void;
}

export interface Expense {
    title: string;
    category: Option | string;
    budgetType: Option | string;
    amount: number;
}

export interface Budget {
    budget_id: string;
    name: string;
    category: Option | string;
    total_amount: number;
    remaining_amount: number;
}