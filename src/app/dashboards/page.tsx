"use client";

import React, { useState, useEffect } from "react";
import { FiHome, FiSettings, FiBookOpen, FiCreditCard, FiCode, FiStar, FiPlus, FiEdit2, FiTrash2, FiEye, FiCopy } from "react-icons/fi";
import { supabase } from "../../../lib/supabaseClient";
import Notification from "./Notification";

interface ApiKey {
    id: number;
    name: string;
    type: string;
    usage: number;
    key: string;
}

function maskKey(key: string) {
    if (!key) return "";
    const visible = key.slice(0, 9);
    return visible + "-" + "*".repeat(Math.max(0, key.length - visible.length - 1));
}

export default function Dashboards() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newName, setNewName] = useState("");
    const [newType, setNewType] = useState("dev");
    const [newKey, setNewKey] = useState("");
    const [newUsage, setNewUsage] = useState(0);
    const [showAdd, setShowAdd] = useState(false);
    const [showKeyId, setShowKeyId] = useState<number | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [showCopied, setShowCopied] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    // Fetch API keys from Supabase
    useEffect(() => {
        const fetchKeys = async () => {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from("api_keys")
                .select("id, name, type, usage, key")
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

    // Create
    const handleAdd = async () => {
        if (!newName) return;
        const newApiKey = {
            name: newName,
            type: newType,
            usage: newUsage,
            key: "tvly-" + newType + "-" + Math.random().toString(36).slice(2, 18),
        };
        const { data, error } = await supabase
            .from("api_keys")
            .insert([newApiKey])
            .select();
        if (error) {
            console.log("error: " + error);
            setError("Failed to create API key");
        } else if (data && data.length > 0) {
            setApiKeys((prev) => [...prev, data[0]]);
            setShowAdd(false);
            setModalMode('create');
            setNewName("");
            setNewType("dev");
            setNewKey("");
            setNewUsage(0);
            setNotificationMessage("API Key created");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
        }
    };

    // Delete
    const handleDelete = async (id: number) => {
        const { error } = await supabase
            .from("api_keys")
            .delete()
            .eq("id", id);
        if (error) {
            setError("Failed to delete API key");
        } else {
            setApiKeys((prev) => prev.filter((k) => k.id !== id));
            setNotificationMessage("API Key deleted");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
        }
    };

    // Edit (open modal)
    const handleEdit = (key: ApiKey) => {
        setEditRowId(key.id);
        setNewName(key.name);
        setNewType(key.type);
        setNewUsage(key.usage);
        setNewKey(key.key);
        setModalMode('edit');
        setShowAdd(true);
    };

    // Update
    const handleUpdate = async () => {
        if (editRowId === null) return;
        const { data, error } = await supabase
            .from("api_keys")
            .update({ name: newName, type: newType, usage: newUsage })
            .eq("id", editRowId)
            .select();
        if (error) {
            setError("Failed to update API key");
        } else if (data && data.length > 0) {
            setApiKeys((prev) => prev.map((k) => k.id === editRowId ? { ...k, name: newName, type: newType, usage: newUsage } : k));
            setShowAdd(false);
            setModalMode('create');
            setEditRowId(null);
            setNewName("");
            setNewType("dev");
            setNewKey("");
            setNewUsage(0);
            setNotificationMessage("API Key updated");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
        }
    };

    const handleCopy = (key: string) => {
        navigator.clipboard.writeText(key);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg rounded-2xl flex flex-col justify-between py-6 px-4 min-h-screen">
                <div>
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-2xl font-bold text-gray-800">tavily</span>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <SidebarLink icon={<FiHome />} label="Overview" active />
                        <SidebarLink icon={<FiCode />} label="API Playground" />
                        <SidebarLink icon={<FiStar />} label="Use Cases" />
                        <SidebarLink icon={<FiCreditCard />} label="Billing" />
                        <SidebarLink icon={<FiSettings />} label="Settings" />
                        <SidebarLink icon={<FiBookOpen />} label="Documentation" external />
                    </nav>
                </div>
                <div className="flex items-center gap-2 mt-8">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
                    <span className="text-gray-700 font-medium">sơn nguyễn</span>
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-10">
                <div className="mb-8">
                    <div className="text-sm text-gray-400 mb-1">Pages / Overview</div>
                    <h1 className="text-3xl font-bold mb-6">Overview</h1>
                    {/* Gradient Card */}
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
                {/* API Keys Card */}
                <div className="bg-white rounded-2xl shadow-md p-8 relative">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-xl font-bold">API Keys</div>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow flex items-center justify-center"
                            onClick={() => {
                                setShowAdd(true);
                                setModalMode('create');
                                setNewName("");
                                setNewType("dev");
                                setNewKey("");
                                setNewUsage(0);
                                setEditRowId(null);
                            }}
                        >
                            <FiPlus size={20} />
                        </button>
                    </div>
                    <div className="text-gray-500 text-sm mb-4">
                        The key is used to authenticate your requests to the <a href="#" className="text-blue-600 underline">Research API</a>. To learn more, see the <a href="#" className="text-blue-600 underline">documentation</a> page.
                    </div>
                    {loading ? (
                        <div className="text-center py-8 text-gray-400">Loading...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">{error}</div>
                    ) : (
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
                                            <td className="px-4 py-2 font-medium text-gray-800">
                                                {key.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${key.type === "dev" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}>{key.type}</span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span>{key.usage}</span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="inline-block font-mono bg-gray-50 border border-gray-200 rounded-full px-4 py-1 text-gray-700 select-all min-w-[220px]">
                                                    {showKeyId === key.id ? key.key : maskKey(key.key)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 flex gap-2 items-center">
                                                <button
                                                    className="hover:bg-gray-100 p-2 rounded"
                                                    onClick={() => setShowKeyId(showKeyId === key.id ? null : key.id)}
                                                    title={showKeyId === key.id ? "Hide" : "Show"}
                                                >
                                                    <FiEye size={18} />
                                                </button>
                                                <button
                                                    className="hover:bg-gray-100 p-2 rounded"
                                                    onClick={() => handleCopy(key.key)}
                                                    title="Copy"
                                                >
                                                    <FiCopy size={18} />
                                                </button>
                                                <button
                                                    className="hover:bg-gray-100 p-2 rounded"
                                                    onClick={() => handleEdit(key)}
                                                    title="Edit"
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button
                                                    className="hover:bg-gray-100 p-2 rounded"
                                                    onClick={() => handleDelete(key.id)}
                                                    title="Delete"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* Add/Edit API Key Modal */}
                    {showAdd && (
                        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md flex flex-col">
                                <h2 className="text-2xl font-bold mb-2 text-center">{modalMode === 'edit' ? 'Edit API key' : 'Create a new API key'}</h2>
                                <p className="text-gray-500 text-center mb-6">Enter a name and limit for the {modalMode === 'edit' ? 'API key' : 'new API key'}.</p>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                                    <input
                                        className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg w-full outline-none"
                                        placeholder="Key Name"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                    <span className="text-xs text-gray-400 mt-1 block">A unique name to identify this key</span>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Key Type</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 cursor-not-allowed opacity-60">
                                            <input type="radio" name="keyType" value="prod" disabled checked={newType === 'prod'} readOnly />
                                            <span className="font-semibold">Production</span>
                                            <span className="text-xs text-gray-400 ml-2">Rate limited to 1,000 requests/minute</span>
                                        </label>
                                        <label className={`flex items-center gap-3 p-3 rounded-lg border ${newType === 'dev' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'} cursor-pointer transition`}>
                                            <input type="radio" name="keyType" value="dev" checked={newType === 'dev'} onChange={() => setNewType('dev')} />
                                            <span className="font-semibold">Development</span>
                                            <span className="text-xs text-gray-400 ml-2">Rate limited to 100 requests/minute</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={!!newUsage}
                                            onChange={e => setNewUsage(e.target.checked ? 1000 : 0)}
                                        />
                                        <span className="text-sm font-medium text-gray-700">Limit monthly usage</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="border border-gray-200 px-4 py-2 rounded-lg w-full mt-2 disabled:bg-gray-100"
                                        placeholder="1000"
                                        value={newUsage || ''}
                                        onChange={e => setNewUsage(Number(e.target.value))}
                                        disabled={!newUsage}
                                    />
                                    <span className="text-xs text-gray-400 mt-1 block">If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.</span>
                                </div>
                                <div className="flex gap-3 justify-end mt-6">
                                    <button
                                        className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-50"
                                        onClick={() => {
                                            setShowAdd(false);
                                            setModalMode('create');
                                            setEditRowId(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow"
                                        onClick={modalMode === 'edit' ? handleUpdate : handleAdd}
                                    >
                                        {modalMode === 'edit' ? 'Save' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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

function SidebarLink({ icon, label, active, external }: { icon: React.ReactNode; label: string; active?: boolean; external?: boolean }) {
    return (
        <a
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 font-medium ${active ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
        >
            <span className="text-lg">{icon}</span>
            {label}
            {external && <span className="ml-auto text-xs text-gray-400">↗</span>}
        </a>
    );
} 