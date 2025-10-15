import React, { useState, useMemo } from "react";

import { initialData } from "./data/mockData";
import Header from "./components/Header";
import FilterControls from "./components/FilterControls";
import OverviewTable from "./components/OverviewTable";
import DataVisualization from "./components/DataVisualization";
import RsuBreakdown from "./components/RsuBreakdown";
import KeyDistribution from "./components/KeyDistribution";
import DetailedDataTable from "./components/DetailedDataTable";
import DetailViewModal from "./components/DetailViewModal";
import DataUploader from "./components/DataUploader";

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

const Dashboard = ({ initialData, reloadData }) => {
  const [data, setData] = useState(initialData);
  const [selectedKey, setSelectedKey] = useState("All");
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showRemarks, setShowRemarks] = useState(true);
  const [showRSU, setShowRSU] = useState(true);
  const [showKeyDist, setShowKeyDist] = useState(true);
  const [chartType, setChartType] = useState("bar");
  const [detailView, setDetailView] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const availableKeys = useMemo(() => {
    return [...new Set(data.map((item) => item.Key))].sort();
  }, [data]);

  const filteredData = useMemo(() => {
    return selectedKey === "All"
      ? data
      : data.filter((item) => item.Key === selectedKey);
  }, [data, selectedKey]);

  const overviewStats = useMemo(() => {
    const stats = {};
    filteredData.forEach((item) => {
      if (!stats[item.Key]) {
        stats[item.Key] = { Key: item.Key, P0: 0, P1: 0, Total: 0 };
      }
      if (item.Priority === 0) {
        stats[item.Key].P0++;
      } else {
        stats[item.Key].P1++;
      }
      stats[item.Key].Total++;
    });
    return Object.values(stats).sort((a, b) => a.Key.localeCompare(b.Key));
  }, [filteredData]);

  const rsuBreakdown = useMemo(() => {
    const breakdown = {};
    filteredData.forEach((item) => {
      const r = item.RSU[0];
      const s = item.RSU[1];
      const u = item.RSU[2];

      const key = `${r}-${s}-${u}`;
      breakdown[key] = (breakdown[key] || 0) + 1;
    });
    return Object.entries(breakdown).map(([key, count]) => {
      const [r, s, u] = key.split("-");
      return { R: r, S: s, U: u, Count: count };
    });
  }, [filteredData]);

  const keyDistribution = useMemo(() => {
    const dist = {};
    filteredData.forEach((item) => {
      dist[item.Key] = (dist[item.Key] || 0) + 1;
    });
    return Object.entries(dist).map(([key, count]) => ({
      Key: key,
      Count: count,
    }));
  }, [filteredData]);

  const chartData = useMemo(() => {
    return overviewStats.map((stat) => ({
      name: stat.Key,
      P0: stat.P0,
      P1: stat.P1,
    }));
  }, [overviewStats]);

  const pieData = useMemo(() => {
    const total = filteredData.reduce(
      (acc, item) => {
        acc[item.Priority === 0 ? "P0" : "P1"]++;
        return acc;
      },
      { P0: 0, P1: 0 }
    );
    return [
      { name: "P0", value: total.P0 },
      { name: "P1", value: total.P1 },
    ];
  }, [filteredData]);

  const handleEdit = (rowIndex, field, value) => {
    setEditingCell({ rowIndex, field });
    setEditValue(value);
  };

  const handleSave = (rowIndex, field) => {
    const newData = [...data];
    const dataIndex = data.findIndex(
      (item) => item.Ticket === filteredData[rowIndex].Ticket
    );

    if (field === "Remarks") {
      const oldRemark = newData[dataIndex].Remarks;
      const timestamp = new Date()
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
      const auditEntry = `${timestamp} (User) - Previous: "${oldRemark}"`;

      newData[dataIndex].Remarks = editValue;
      newData[dataIndex].RemarkExists = editValue ? "Y" : "N";
      newData[dataIndex].AuditTrail =
        auditEntry +
        (newData[dataIndex].AuditTrail
          ? "\n" + newData[dataIndex].AuditTrail
          : "");
    } else {
      newData[dataIndex][field] = editValue;
    }

    setData(newData);
    setEditingCell(null);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const showDetailedView = (category, value) => {
    let filtered = [];
    if (category === "P0") {
      filtered = data.filter(
        (item) => item.Key === value && item.Priority === 0
      );
    } else if (category === "P1") {
      filtered = data.filter(
        (item) =>
          item.Key === value && (item.Priority === 1 || item.Priority === 2)
      );
    } else if (category === "RSU") {
      filtered = data.filter(
        (item) =>
          item.RSU[0] === value.R &&
          item.RSU[1] === value.S &&
          item.RSU[2] === value.U
      );
    } else if (category === "KeyDist") {
      filtered = data.filter((item) => item.Key === value);
    }
    setDetailView({
      category,
      data: filtered,
      title: `${category} - ${JSON.stringify(value)}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />
        <DataUploader onUploadSuccess={reloadData} />
        <FilterControls
          availableKeys={availableKeys}
          selectedKey={selectedKey}
          onKeyChange={setSelectedKey}
        />

        <OverviewTable stats={overviewStats} onDrillDown={showDetailedView} />

        <DataVisualization
          chartType={chartType}
          onChartTypeChange={setChartType}
          chartData={chartData}
          pieData={pieData}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <RsuBreakdown
            data={rsuBreakdown}
            onDrillDown={showDetailedView}
            isVisible={showRSU}
            onToggleVisibility={() => setShowRSU(!showRSU)}
          />

          <KeyDistribution
            data={keyDistribution}
            onDrillDown={showDetailedView}
            isVisible={showKeyDist}
            onToggleVisibility={() => setShowKeyDist(!showKeyDist)}
          />
        </div>

        <DetailedDataTable
          data={sortedData}
          sortConfig={sortConfig}
          onSort={handleSort}
          showRemarks={showRemarks}
          onToggleRemarks={() => setShowRemarks(!showRemarks)}
          onEdit={handleEdit}
          editingCell={editingCell}
          editValue={editValue}
          onEditValueChange={setEditValue}
          onSave={handleSave}
          onCancelEdit={() => setEditingCell(null)}
        />
        <DetailViewModal
          detail={detailView}
          onClose={() => setDetailView(null)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
