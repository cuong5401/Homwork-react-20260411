import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// const cols = [
//   { key: "image", title: "Hình", render: function },
//   { key: "name", title: "Thông tin sản phẩm" },
//   { key: "category", title: "Danh mục" },
//   { key: "price", title: "Giá bán" },
//   { key: "stock", title: "Tồn kho" },
// ];

function TableData({ colsData, rowsData }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {colsData.map((col) => (
                            <TableCell key={col.key}>{col.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsData.map((row) => {
                        return (
                            <TableRow key={row.id}>
                                {colsData.map((col) => {
                                    if (typeof col.render === "function") {
                                        return <TableCell key={col.key}>{col.render(row.id)}</TableCell>;
                                    }
                                    return <TableCell key={col.key}>{row[col.key] ?? ""} </TableCell>;
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableData;
