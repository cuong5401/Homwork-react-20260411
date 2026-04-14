// const cols = [
//   { key: "image", title: "Hình", render: function },
//   { key: "name", title: "Thông tin sản phẩm" },
//   { key: "category", title: "Danh mục" },
//   { key: "price", title: "Giá bán" },
//   { key: "stock", title: "Tồn kho" },
// ];

function TableData({ cols, rows }) {
    return (
        <table>
            <thead>
                <tr>
                    {cols.map((col) => (
                        <th key={col.key}>{col.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {cols.map((col) => {
                                if (typeof col.render === "function") {
                                    return <td key={col.key}>{col.render(row)}</td>;
                                }
                                return <td key={col.key}>{row[col.key] ?? ""} </td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default TableData;
