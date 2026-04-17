// import type { TableHeaderProps } from "../units";

// function TableHeader({ onFilterChange, filter, tableName }: TableHeaderProps) {
//     const filterData = filter?.data ?? [];

//     return (
//         <div className="table-header">
//             {tableName && <h3>{tableName}</h3>}
//             {filter && (
//                 <select
//                     onChange={(e) => {
//                         onFilterChange?.(e.target.value);
//                     }}
//                 >
//                     {filterData.map((item) => (
//                         <option key={item.value} value={item.value}>
//                             {item.title}
//                         </option>
//                     ))}
//                 </select>
//             )}
//         </div>
//     );
// }

// export default TableHeader;
