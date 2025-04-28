import React from "react";
import { FiEdit2, FiTrash2, FiEye, FiCopy } from "react-icons/fi";
import { ApiKey } from "./hooks/useApiKeys";

export default function ApiKeysTable({
  apiKeys,
  loading,
  error,
  onEdit,
  onDelete,
  onCopy,
  showKeyId,
  setShowKeyId,
}: {
  apiKeys: ApiKey[];
  loading: boolean;
  error: string | null;
  onEdit: (key: ApiKey) => void;
  onDelete: (id: number) => void;
  onCopy: (key: string) => void;
  showKeyId: number | null;
  setShowKeyId: (id: number | null) => void;
}) {
  function maskKey(key: string) {
    if (!key) return "";
    const visible = key.slice(0, 9);
    return visible + "-" + "*".repeat(Math.max(0, key.length - visible.length - 1));
  }

  if (loading) return <div className="text-center py-8 text-gray-400">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-50">
            <th className="border-b px-4 py-2 text-left text-xs text-gray-500">NAME</th>
            <th className="border-b px-4 py-2 text-left text-xs text-gray-500">TYPE</th>
            <th className="border-b px-4 py-2 text-left text-xs text-gray-500">USAGE</th>
            <th className="border-b px-4 py-2 text-left text-xs text-gray-500">KEY</th>
            <th className="border-b px-4 py-2 text-left text-xs text-gray-500">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((key) => (
            <tr key={key.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-medium text-gray-800">{key.name}</td>
              <td className="px-4 py-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${key.type === "dev" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}>{key.type}</span>
              </td>
              <td className="px-4 py-2">{key.usage}</td>
              <td className="px-4 py-2">
                <span className="inline-block font-mono bg-gray-50 border border-gray-200 rounded-full px-4 py-1 text-gray-700 select-all min-w-[220px]">
                  {showKeyId === key.id ? key.key : maskKey(key.key)}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2 items-center">
                <button className="hover:bg-gray-100 p-2 rounded" onClick={() => setShowKeyId(showKeyId === key.id ? null : key.id)} title={showKeyId === key.id ? "Hide" : "Show"}>
                  <FiEye size={18} />
                </button>
                <button className="hover:bg-gray-100 p-2 rounded" onClick={() => onCopy(key.key)} title="Copy">
                  <FiCopy size={18} />
                </button>
                <button className="hover:bg-gray-100 p-2 rounded" onClick={() => onEdit(key)} title="Edit">
                  <FiEdit2 size={18} />
                </button>
                <button className="hover:bg-gray-100 p-2 rounded" onClick={() => onDelete(key.id)} title="Delete">
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}