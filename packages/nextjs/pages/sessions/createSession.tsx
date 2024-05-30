import React, { useState } from "react";
import { useRouter } from "next/router";

const CreateSession = () => {
  const [formState, setFormState] = useState({
    campaignId: "",
    sessionNumber: 1,
    date: "",
    description: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      if (!response.ok) throw new Error("Session creation failed");
      // Redirect to a success page or the session details page
      router.push("/sessions/success");
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="campaignId" value={formState.campaignId} onChange={handleChange} required />
      <input type="number" name="sessionNumber" value={formState.sessionNumber} onChange={handleChange} required />
      <input type="datetime-local" name="date" value={formState.date} onChange={handleChange} required />
      <textarea name="description" value={formState.description} onChange={handleChange} />
      <button type="submit">Schedule Session</button>
    </form>
  );
};

export default CreateSession;
