import { useEffect } from "react";
import customerApi from "./api/customerApi/customerApi";

function App() {
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customers = await customerApi.getAll();
                console.log(customers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <>
            <h1>Hello AE</h1>
        </>
    );
}

export default App;
