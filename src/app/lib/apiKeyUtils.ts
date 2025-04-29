import { supabase } from "./supabaseClient";

export interface ApiKeyData {
    id: string;
    usage: number;
    limit: number;
}

export async function getApiKeyData(apiKey: string): Promise<{ valid: boolean; data?: ApiKeyData; error?: string }> {
    try {
        if (!apiKey) {
            return { valid: false, error: "API key is required" };
        }

        const { data, error } = await supabase
            .from("api_keys")
            .select("id, usage, limit")
            .eq("key", apiKey)
            .single();
        console.log(data, error);

        if (error || !data) {
            return { valid: false };
        }

        return {
            valid: true,
            data: {
                id: data.id,
                usage: data.usage,
                limit: data.limit
            }
        };
    } catch (err) {
        return { valid: false, error: "Server error" };
    }
}

export async function incrementApiKeyUsage(apiKeyData: ApiKeyData): Promise<{ success: boolean; error?: string }> {
    try {
        // Check if usage would exceed limit
        if (apiKeyData.usage >= apiKeyData.limit) {
            return { 
                success: false, 
                error: `Rate limit exceeded. Usage: ${apiKeyData.usage}, Limit: ${apiKeyData.limit}`
            };
        }

        // Increment usage
        const { error } = await supabase
            .from("api_keys")
            .update({ usage: apiKeyData.usage + 1 })
            .eq("id", apiKeyData.id);

        if (error) {
            return { success: false, error: "Failed to update usage" };
        }

        return { success: true };
    } catch (err) {
        return { success: false, error: "Server error" };
    }
}