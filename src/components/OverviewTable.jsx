const OverviewTable = ({ stats, onDrillDown }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4">Dashboard Overview</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-3 text-left">S.NO</th>
              <th className="p-3 text-left">Key</th>
              <th className="p-3 text-left">P0</th>
              <th className="p-3 text-left">P1</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, idx) => (
              <tr
                key={stat.Key}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 font-semibold">{stat.Key}</td>
                <td className="p-3">
                  <button
                    onClick={() => onDrillDown("P0", stat.Key)}
                    className="text-red-400 hover:text-red-300 underline"
                  >
                    {stat.P0}
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => onDrillDown("P1", stat.Key)}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {stat.P1}
                  </button>
                </td>
                <td className="p-3 font-semibold">{stat.Total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewTable;
