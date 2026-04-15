import { useState, useEffect } from "react";
import customerApi from "./api/customerApi/customerApi";

import TableData from "./components/table/TableData";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const handleEditCust = () => {
    console.log("haha");
};

const handleDeleteCust = () => {
    console.log("delete");
};

const renderOperation = () => {
    return (
        <>
            <EditIcon onClick={handleEditCust} style={{ marginRight: "8px" }} />
            <DeleteIcon onClick={handleDeleteCust} color="error" />
        </>
    );
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
        render: renderOperation,
    },
];

function App() {
    const [customerList, setCustomerList] = useState([]);

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

    return (
        <>
            <TableData cols={cols} rows={customerList} />
            {console.log(customerList)}
        </>
    );
}

export default App;
