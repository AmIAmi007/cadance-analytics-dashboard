import { Eye, EyeOff } from "lucide-react";

const RsuBreakdown = ({ data, onDrillDown, isVisible, onToggleVisibility }) => {
  if (!isVisible) {
    return null; 
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">RSU Breakdown</h2>
        <button onClick={onToggleVisibility} className="text-white">
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <table className="w-full text-white text-sm">
        <thead>
          <tr className="border-b border-white/20">
            <th className="p-2 text-left">R</th>
            <th className="p-2 text-left">S</th>
            <th className="p-2 text-left">U</th>
            <th className="p-2 text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-2">{item.R}</td>
              <td className="p-2">{item.S}</td>
              <td className="p-2">{item.U}</td>
              <td className="p-2">
                <button
                  onClick={() => onDrillDown("RSU", item)}
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  {item.Count}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RsuBreakdown;
