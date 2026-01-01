export interface User {
    email: string;
    password: string;
    confirm_password: string;
}

export interface Option {
    id: number;
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