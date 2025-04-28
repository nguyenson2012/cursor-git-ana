import React from "react";

export default function ApiKeyModal({
  show,
  mode,
  name,
  type,
  usage,
  onNameChange,
  onTypeChange,
  onUsageChange,
  onClose,
  onSubmit,
}: {
  show: boolean;
  mode: "create" | "edit";
  name: string;
  type: string;
  usage: number;
  onNameChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onUsageChange: (v: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md flex flex-col">
        <h2 className="text-2xl font-bold mb-2 text-center">{mode === "edit" ? "Edit API key" : "Create a new API key"}</h2>
        <p className="text-gray-500 text-center mb-6">Enter a name and limit for the {mode === "edit" ? "API key" : "new API key"}.</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
          <input
            className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg w-full outline-none"
            placeholder="Key Name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <span className="text-xs text-gray-400 mt-1 block">A unique name to identify this key</span>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Type</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 cursor-not-allowed opacity-60">
              <input type="radio" name="keyType" value="prod" disabled checked={type === "prod"} readOnly />
              <span className="font-semibold">Production</span>
              <span className="text-xs text-gray-400 ml-2">Rate limited to 1,000 requests/minute</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-lg border ${type === "dev" ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"} cursor-pointer transition`}>
              <input type="radio" name="keyType" value="dev" checked={type === "dev"} onChange={() => onTypeChange("dev")} />
              <span className="font-semibold">Development</span>
              <span className="text-xs text-gray-400 ml-2">Rate limited to 100 requests/minute</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!usage} onChange={e => onUsageChange(e.target.checked ? 1000 : 0)} />
            <span className="text-sm font-medium text-gray-700">Limit monthly usage</span>
          </label>
          <input
            type="number"
            className="border border-gray-200 px-4 py-2 rounded-lg w-full mt-2 disabled:bg-gray-100"
            placeholder="1000"
            value={usage || ""}
            onChange={e => onUsageChange(Number(e.target.value))}
            disabled={!usage}
          />
          <span className="text-xs text-gray-400 mt-1 block">If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.</span>
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-50" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow" onClick={onSubmit}>
            {mode === "edit" ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}