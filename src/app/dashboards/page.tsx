"use client";

import React, { useState, useEffect } from "react";
import { FiHome, FiSettings, FiBookOpen, FiCreditCard, FiCode, FiStar, FiPlus, FiEdit2, FiTrash2, FiEye, FiCopy } from "react-icons/fi";
import { supabase } from "../lib/supabaseClient";
import Notification from "./Notification";
import Sidebar from "./Sidebar";
import ApiKeysTable from "./ApiKeysTable";
import ApiKeyModal from "./ApiKeyModal";
import { useApiKeys } from "./hooks/useApiKeys";

interface ApiKey {
  id: number;
  name: string;
  type: string;
  usage: number;
  key: string;
  limit: number;
}

function maskKey(key: string) {
  if (!key) return "";
  const visible = key.slice(0, 9);
  return visible + "-" + "*".repeat(Math.max(0, key.length - visible.length - 1));
}

export default function Dashboards() {
  const {
    apiKeys, loading, error,
    setApiKeys, setLoading, setError,
    addKey, updateKey, deleteKey
  } = useApiKeys();

  const [editRow, setEditRow] = useState<ApiKey | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showKeyId, setShowKeyId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [showCopied, setShowCopied] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Modal form state
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState("dev");
  const [formUsage, setFormUsage] = useState(0);



  // Fetch API keys from Supabase
  useEffect(() => {
    const fetchKeys = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("api_keys")
        .select("id, name, type, usage, key, limit")
        .order("id", { ascending: true });
      if (error) {
        setError("Failed to fetch API keys");
      } else {
        setApiKeys(data as ApiKey[]);
      }
      setLoading(false);
    };
    fetchKeys();
  }, []);

  // Handlers
  const handleOpenCreate = () => {
    setModalMode("create");
    setFormName("");
    setFormType("dev");
    setFormUsage(0);
    setEditRow(null);
    setShowAdd(true);
  };

  const handleOpenEdit = (key: ApiKey) => {
    setModalMode("edit");
    setFormName(key.name);
    setFormType(key.type);
    setFormUsage(key.usage);
    setEditRow(key);
    setShowAdd(true);
  };

  const handleModalSubmit = async () => {
    if (modalMode === "create") {
      await addKey({
        name: formName,
        type: formType,
        limit: formUsage,
        usage: 0,
        key: "tvly-" + formType + "-" + Math.random().toString(36).slice(2, 18),
      });
      setNotificationMessage("API Key created");
    } else if (modalMode === "edit" && editRow) {
      await updateKey(editRow.id, { name: formName, type: formType, usage: formUsage });
      setNotificationMessage("API Key updated");
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    setShowAdd(false);
  };

  const handleDelete = async (id: number) => {
    await deleteKey(id);
    setNotificationMessage("API Key deleted");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="mb-8">
          <div className="text-sm text-gray-400 mb-1">Pages / Overview</div>
          <h1 className="text-3xl font-bold mb-6">Overview</h1>
          <div className="rounded-2xl p-8 mb-8 bg-gradient-to-tr from-[#e0c3fc] via-[#8ec5fc] to-[#f093fb] shadow-md relative">
            <div className="absolute top-4 right-4">
              <button className="bg-white/60 hover:bg-white/80 text-sm px-4 py-2 rounded-lg font-medium shadow">Manage Plan</button>
            </div>
            <div className="text-xs font-semibold text-white/80 mb-2">CURRENT PLAN</div>
            <div className="text-4xl font-bold text-white mb-4">Researcher</div>
            <div className="flex items-center gap-4">
              <div className="text-white/90 font-medium">API Usage</div>
              <span className="text-white/60 text-xs">Plan</span>
            </div>
            <div className="w-full h-2 bg-white/30 rounded-full mt-2 mb-2">
              <div className="h-2 bg-white/80 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-xs">0 / 1,000 Credits</span>
              <label className="flex items-center gap-2 ml-4">
                <input type="checkbox" className="accent-white" />
                <span className="text-white/80 text-xs">Pay as you go</span>
              </label>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl font-bold">API Keys</div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow flex items-center justify-center"
              onClick={handleOpenCreate}
            >
              <FiPlus size={20} />
            </button>
          </div>
          <div className="text-gray-500 text-sm mb-4">
            The key is used to authenticate your requests to the <a href="#" className="text-blue-600 underline">Research API</a>. To learn more, see the <a href="#" className="text-blue-600 underline">documentation</a> page.
          </div>
          <ApiKeysTable
            apiKeys={apiKeys}
            loading={loading}
            error={error}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onCopy={handleCopy}
            showKeyId={showKeyId}
            setShowKeyId={setShowKeyId}
          />
          <ApiKeyModal
            show={showAdd}
            mode={modalMode}
            name={formName}
            type={formType}
            usage={formUsage}
            onNameChange={setFormName}
            onTypeChange={setFormType}
            onUsageChange={setFormUsage}
            onClose={() => {
              setShowAdd(false);
              setEditRow(null);
              setFormName("");
              setFormType("dev");
              setFormUsage(0);
            }}
            onSubmit={handleModalSubmit}
          />
        </div>
      </main>
      <Notification
        show={showCopied}
        message="Copied API Key to clipboard"
        onClose={() => setShowCopied(false)}
      />
      <Notification
        show={showNotification}
        message={notificationMessage}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
} 