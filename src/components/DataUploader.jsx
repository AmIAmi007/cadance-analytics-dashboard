import { useState } from "react";
import { UploadCloud, CheckCircle, AlertTriangle } from "lucide-react";

const DataUploader = ({ onUploadSuccess }) => {
  const [status, setStatus] = useState("idle"); // idle, uploading, success, error
  const [message, setMessage] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setStatus("success");
      setMessage(result.message);
      onUploadSuccess(); // Refresh the dashboard data
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Upload failed.");
    } finally {
      event.target.value = null; // Allow re-uploading the same file
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-white">Data Management</h3>
        {status === "idle" && (
          <p className="text-sm text-purple-200">
            Upload a new XLSX file to add or update records.
          </p>
        )}
        {status === "success" && (
          <p className="text-sm text-green-400 flex items-center gap-2">
            <CheckCircle size={16} /> {message}
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400 flex items-center gap-2">
            <AlertTriangle size={16} /> {message}
          </p>
        )}
      </div>
      <label className="group inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
        <UploadCloud size={16} />
        {status === "uploading" ? "Uploading..." : "Upload File"}
        <input
          type="file"
          className="hidden"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          disabled={status === "uploading"}
        />
      </label>
    </div>
  );
};

export default DataUploader;
