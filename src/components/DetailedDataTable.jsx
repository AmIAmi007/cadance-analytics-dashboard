import { Edit2, Save, X, Eye, EyeOff } from "lucide-react";

// A small sub-component to clean up the main table's JSX
const EditableRemarkCell = ({
  item,
  rowIndex,
  editingCell,
  editValue,
  onEditValueChange,
  onSave,
  onCancelEdit,
}) => {
  const isEditing =
    editingCell?.rowIndex === rowIndex && editingCell?.field === "Remarks";

  if (isEditing) {
    return (
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={editValue}
          onChange={(e) => onEditValueChange(e.target.value)}
          className="px-2 py-1 rounded bg-white/20 text-white border border-white/30 w-full"
          autoFocus
        />
        <button
          onClick={() => onSave(rowIndex, "Remarks")}
          className="text-green-400 hover:text-green-300"
        >
          <Save size={16} />
        </button>
        <button
          onClick={onCancelEdit}
          className="text-red-400 hover:text-red-300"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return <span className="truncate max-w-xs">{item.Remarks || "-"}</span>;
};

const DetailedDataTable = (props) => {
  const {
    data,
    sortConfig,
    onSort,
    showRemarks,
    onToggleRemarks,
    onEdit,
    editingCell,
    editValue,
    onEditValueChange,
    onSave,
    onCancelEdit,
  } = props;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Detailed Data Table</h2>
        <button
          onClick={onToggleRemarks}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30"
        >
          {showRemarks ? <EyeOff size={20} /> : <Eye size={20} />}
          {showRemarks ? "Hide" : "Show"} Remarks
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-white text-sm">
          <thead>
            <tr className="border-b border-white/20">
              <th
                className="p-2 text-left cursor-pointer"
                onClick={() => onSort("Key")}
              >
                Key{" "}
                {sortConfig.key === "Key" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 text-left cursor-pointer"
                onClick={() => onSort("Ticket")}
              >
                Ticket{" "}
                {sortConfig.key === "Ticket" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-2 text-left">RSU</th>
              <th className="p-2 text-left">Escalation</th>
              <th
                className="p-2 text-left cursor-pointer"
                onClick={() => onSort("Priority")}
              >
                Priority{" "}
                {sortConfig.key === "Priority" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">ProdLevel2</th>
              <th className="p-2 text-left">Remark Exists</th>
              {showRemarks && <th className="p-2 text-left">Remarks</th>}
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.Ticket}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="p-2 font-semibold">{item.Key}</td>
                <td className="p-2">{item.Ticket}</td>
                <td className="p-2">{item.RSU}</td>
                <td className="p-2">
                  {item.Escalation && (
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.Escalation === "RED" ? "bg-red-500" : "bg-blue-500"
                      }`}
                    >
                      {item.Escalation}
                    </span>
                  )}
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.Priority === 0
                        ? "bg-red-600"
                        : item.Priority === 1
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    P{item.Priority}
                  </span>
                </td>
                <td className="p-2">{item.Date}</td>
                <td className="p-2">{item.ProdLevel2}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.RemarkExists === "Y" ? "bg-green-600" : "bg-gray-600"
                    }`}
                  >
                    {item.RemarkExists}
                  </span>
                </td>
                {showRemarks && (
                  <td className="p-2">
                    <EditableRemarkCell
                      item={item}
                      rowIndex={idx}
                      editingCell={editingCell}
                      editValue={editValue}
                      onEditValueChange={onEditValueChange}
                      onSave={onSave}
                      onCancelEdit={onCancelEdit}
                    />
                  </td>
                )}
                <td className="p-2">
                  <button
                    onClick={() => onEdit(idx, "Remarks", item.Remarks)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedDataTable;
