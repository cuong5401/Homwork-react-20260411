import type { ReactNode } from "react";

interface CusTomer {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    rank: string;
    totalSpending?: string;
}

interface CustomerFormData {
    name: string;
    address: string;
    email: string;
    phone: string;
    rank: string;
}

interface Column {
    key: keyof CusTomer | "operation";
    title: string;
    render?: (id: number, row: CusTomer) => ReactNode;
}

interface TableDataProps {
    colsData: Column[];
    rowsData: CusTomer[];
}

// interface TableFilterOption {
//     value: string;
//     title: string;
// }

// interface TableFilter {
//     data: TableFilterOption[];
// }

// interface TableHeaderProps {
//     onFilterChange?: (value: string) => void;
//     filter?: TableFilter;
//     tableName?: string;
// }

interface CustomerModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CustomerFormData) => void | Promise<void>;
    initialData: CusTomer | null;
    mode: "add" | "edit";
}

type CustomerFormErrors = Partial<Record<keyof CustomerFormData, string>>;

export type { Column, CusTomer, CustomerFormData, CustomerFormErrors, CustomerModalProps, TableDataProps };
