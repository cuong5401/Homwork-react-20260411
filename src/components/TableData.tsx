import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { TableDataProps } from "../units";

function TableData({ colsData, rowsData }: TableDataProps) {
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
                    {rowsData.map((row) => (
                        <TableRow key={row.id}>
                            {colsData.map((col) => {
                                if (col.render) {
                                    return <TableCell key={col.key}>{col.render(row.id, row)}</TableCell>;
                                }

                                return <TableCell key={col.key}>{row[col.key as keyof typeof row] ?? ""}</TableCell>;
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableData;
