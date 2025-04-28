"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "../dashboards/Notification";
import { supabase } from "../../../lib/supabaseClient";

export default function Playground() {
  const [apiKey, setApiKey] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate API key against Supabase
    const { data } = await supabase
      .from("api_keys")
      .select("id")
      .eq("key", apiKey)
      .single();

    if (data) {
      // Valid key, proceed
      router.push(`/protected?apiKey=${encodeURIComponent(apiKey)}`);
    } else {
      // Invalid key, show notification
      setNotificationMessage("Invalid API Key");
      setNotificationType("error");
      setShowNotification(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-4 w-96">
        <label className="font-semibold text-lg">Enter your API Key</label>
        <input
          type="text"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          className="border rounded-lg px-4 py-2"
          placeholder="API Key"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <Notification
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}