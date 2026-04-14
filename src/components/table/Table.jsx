import { useState, useMemo } from "react";

import "./Table.scss";

import TableHeader from "./TableHeader";
import TableData from "./TableData";

// const cols = [
//   { key: "image", title: "Hình", render: function },
//   { key: "name", title: "Thông tin sản phẩm" },
//   { key: "category", title: "Danh mục" },
//   { key: "price", title: "Giá bán" },
//   { key: "stock", title: "Tồn kho" },
// ];

function Table({ cols, data, filter = null, tableName = null }) {
    const [filtedData, setfiltedData] = useState("all");

    let renderData = useMemo(() => {
        if (filtedData === "all") return data;
        return data.filter((item) => item[filter.key] === filtedData);
    }, [filtedData]);

    return (
        <div className="table-container">
            {(tableName || filter) && <TableHeader tableName={tableName} onFilterChange={setfiltedData} filter={filter}></TableHeader>}
            <TableData cols={cols} rows={renderData}></TableData>
        </div>
    );
}

export default Table;
