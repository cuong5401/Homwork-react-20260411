import { useState, useEffect } from "react";
import customerApi from "./api/customerApi/customerApi";

import TableData from "./components/TableData";
import CustomerModal from "./components/CustomerModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
    const [customerList, setCustomerList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customers = await customerApi.getAll();
                setCustomerList(customers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCustomers();
    }, []);

    const renderOperation = (id) => {
        const handleEditCust = () => {
            const customer = customerList.find((c) => c.id === id);
            setSelectedCustomer(customer);
            setModalMode("edit");
            setModalOpen(true);
        };

        const handleDeleteCust = async () => {
            const customer = customerList.find((c) => c.id === id);
            if (!customer) return;
            const isDelete = confirm(` bạn có muốn xóa khách hàng ${customer.name} không?`);
            if (isDelete) {
                await customerApi.deleteById(customer.id);
                setCustomerList((pre) => pre.filter((c) => c.id !== id));
                console.log(`đã xóa ${customer.name}`);
            }
        };

        return (
            <>
                <EditIcon onClick={handleEditCust} style={{ marginRight: "8px", cursor: "pointer" }} />
                <DeleteIcon onClick={handleDeleteCust} color="error" style={{ cursor: "pointer" }} />
            </>
        );
    };

    const handleAddCustomer = () => {
        setSelectedCustomer(null);
        setModalMode("add");
        setModalOpen(true);
    };

    const handleModalSubmit = async (data) => {
        try {
            if (modalMode === "add") {
                // Gọi API thêm mới
                const res = await customerApi.create(data);
                console.log("Thêm khách hàng:", res);
            } else {
                // Gọi API cập nhật
                await customerApi.editById(data.id, data);
                console.log("Cập nhật khách hàng:", data);
            }
            // Refresh danh sách sau khi thêm/sửa
            const customers = await customerApi.getAll();
            setCustomerList(customers);
        } catch (error) {
            console.error(error);
        }
    };

    const cols = [
        { key: "id", title: "id" },
        { key: "name", title: "Tên" },
        { key: "address", title: "Địa chỉ" },
        { key: "email", title: "Email" },
        { key: "phone", title: "Số điện thoại" },
        { key: "rank", title: "hạng" },
        {
            key: "operation",
            title: "thao tác",
            render: (id) => renderOperation(id),
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
                + Thêm khách hàng
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
