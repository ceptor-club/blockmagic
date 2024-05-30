import React, { useState } from "react";
import { useRouter } from "next/router";

const CreateWorld = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    vibe: "",
    ccId: "", // This should be set from the user's session
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/worlds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      if (!response.ok) throw new Error("World creation failed");
      // Redirect to a success page or the world details page
      router.push("/worlds/success");
    } catch (error) {
      console.error("Failed to create world:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formState.name} onChange={handleChange} required />
      <textarea name="description" value={formState.description} onChange={handleChange} required />
      <input type="text" name="vibe" value={formState.vibe} onChange={handleChange} required />
      <button type="submit">Create World</button>
    </form>
  );
};

export default CreateWorld;
