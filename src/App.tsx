import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customerApi from "./api/customerApi/customerApi";
import TableData from "./components/TableData";
import CustomerModal from "./components/CustomerModal";
import type { Column, CusTomer, CustomerFormData } from "./units";

function App() {
    const [customerList, setCustomerList] = useState<CusTomer[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedCustomer, setSelectedCustomer] = useState<CusTomer | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customers = await customerApi.getAll();
                setCustomerList(customers);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchCustomers();
    }, []);

    const renderOperation = (id: number) => {
        const handleEditCustomer = () => {
            const customer = customerList.find((item) => item.id === id);
            if (!customer) return;

            setSelectedCustomer(customer);
            setModalMode("edit");
            setModalOpen(true);
        };

        const handleDeleteCustomer = async () => {
            const customer = customerList.find((item) => item.id === id);
            if (!customer) return;

            const isDelete = confirm(`Ban co muon xoa khach hang ${customer.name} khong?`);
            if (!isDelete) return;

            await customerApi.deleteById(customer.id);
            setCustomerList((prev) => prev.filter((item) => item.id !== id));
        };

        return (
            <>
                <EditIcon onClick={handleEditCustomer} style={{ marginRight: "8px", cursor: "pointer" }} />
                <DeleteIcon onClick={handleDeleteCustomer} color="error" style={{ cursor: "pointer" }} />
            </>
        );
    };

    const handleAddCustomer = () => {
        setSelectedCustomer(null);
        setModalMode("add");
        setModalOpen(true);
    };

    const handleModalSubmit = async (data: CustomerFormData) => {
        try {
            if (modalMode === "add") {
                await customerApi.create(data);
            } else {
                if (!selectedCustomer) return;
                await customerApi.editById(selectedCustomer.id, data);
            }

            const customers = await customerApi.getAll();
            setCustomerList(customers);
        } catch (error) {
            console.error(error);
        }
    };

    const cols: Column[] = [
        { key: "id", title: "id" },
        { key: "name", title: "Ten" },
        { key: "address", title: "Dia chi" },
        { key: "email", title: "Email" },
        { key: "phone", title: "So dien thoai" },
        { key: "rank", title: "Hang" },
        {
            key: "operation",
            title: "Thao tac",
            render: (id: number) => renderOperation(id),
        },
    ];

    return (
        <>
            <button
                onClick={handleAddCustomer}
                style={{
                    padding: "8px 16px",
                    marginBottom: "16px",
                    cursor: "pointer",
                }}
            >
                + Them khach hang
            </button>

            <TableData colsData={cols} rowsData={customerList} />

            <CustomerModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={selectedCustomer}
                mode={modalMode}
            />
        </>
    );
}

export default App;
