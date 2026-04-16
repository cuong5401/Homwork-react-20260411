// const cols = [
//   { key: "image", title: "Hình", render: function },
//   { key: "name", title: "Thông tin sản phẩm" },
//   { key: "category", title: "Danh mục" },
//   { key: "price", title: "Giá bán" },
//   { key: "stock", title: "Tồn kho" },
// ];

function TableHeader({ onFilterChange, filter, tableName }) {
    const filterData = filter.data;

    return (
        <div className="table-header">
            {tableName && <h3>{tableName}</h3>}
            {filter && (
                <select
                    onChange={(e) => {
                        onFilterChange(e.target.value);
                    }}
                >
                    {filterData.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.title}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default TableHeader;
