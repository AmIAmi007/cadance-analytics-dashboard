import { X } from "lucide-react";

const DetailViewModal = ({ detail, onClose }) => {
  // If there's no detail data, don't render anything
  if (!detail) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{detail.title}</h2>
          <button onClick={onClose} className="text-white hover:text-red-400">
            <X size={24} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2 text-left">Key</th>
                <th className="p-2 text-left">Ticket</th>
                <th className="p-2 text-left">RSU</th>
                <th className="p-2 text-left">Escalation</th>
                <th className="p-2 text-left">Priority</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">ProdLevel2</th>
              </tr>
            </thead>
            <tbody>
              {detail.data.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="p-2 font-semibold">{item.Key}</td>
                  <td className="p-2">{item.Ticket}</td>
                  <td className="p-2">{item.RSU}</td>
                  <td className="p-2">
                    {item.Escalation && (
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          item.Escalation === "RED"
                            ? "bg-red-500"
                            : "bg-blue-500"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailViewModal;
