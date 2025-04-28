import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export interface ApiKey {
    id: number;
    name: string;
    type: string;
    usage: number;
    key: string;
}

export function useApiKeys() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchKeys();
    }, []);

    async function fetchKeys() {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
            .from("api_keys")
            .select("id, name, type, usage, key")
            .order("id", { ascending: true });
        if (error) setError("Failed to fetch API keys");
        else setApiKeys(data as ApiKey[]);
        setLoading(false);
    }

    async function addKey(newKey: Omit<ApiKey, "id">) {
        const { data, error } = await supabase
            .from("api_keys")
            .insert([newKey])
            .select();
        if (error) throw error;
        if (data && data.length > 0) setApiKeys((prev) => [...prev, data[0]]);
    }

    async function updateKey(id: number, updates: Partial<ApiKey>) {
        const { data, error } = await supabase
            .from("api_keys")
            .update(updates)
            .eq("id", id)
            .select();
        if (error) throw error;
        if (data && data.length > 0)
            setApiKeys((prev) =>
                prev.map((k) => (k.id === id ? { ...k, ...updates } : k))
            );
    }

    async function deleteKey(id: number) {
        const { error } = await supabase.from("api_keys").delete().eq("id", id);
        if (error) throw error;
        setApiKeys((prev) => prev.filter((k) => k.id !== id));
    }

    return { apiKeys, loading, error, setApiKeys, setLoading, setError, fetchKeys, addKey, updateKey, deleteKey };
}