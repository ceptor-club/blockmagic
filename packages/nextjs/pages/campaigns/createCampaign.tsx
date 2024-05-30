import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User, World } from "../../types/types";
import { useSession } from "next-auth/react";

const CreateCampaign = () => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user as User | undefined; // Cast session data to your User type
  const router = useRouter();
  const [worlds, setWorlds] = useState<World[]>([]);

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    worldId: "",
    ccId: user?.ccId || "", // Initially empty, will be set when the component mounts and we have the session data
    numCharacters: 0,
    numGmMadeCharacters: 0,
    numPlayerMadeCharacters: 0,
    sessionZero: false,
    frequency: "one_shot",
    scheduledSessions: [],
    notifications: [],
  });

  useEffect(() => {
    // When the component mounts, set the ccId if the user is authenticated
    if (user?.ccId) {
      setFormState(prevState => ({
        ...prevState,
        ccId: user.ccId || "", // Provide a default empty string if user.ccId is undefined
      }));
    }
    // Fetch worlds and check if the user is the owner or has permissions
    fetch("/api/worlds")
      .then(response => response.json())
      .then((worldsData: World[]) => {
        // Add explicit type annotation here
        const userWorlds = worldsData.filter(
          (world: World) => world.ccId === user?.ccId || world.permissions?.includes(user?.ccId ?? ""),
        );
        setWorlds(userWorlds);
      })
      .catch(error => {
        // Handle errors more specifically here
        console.error("Failed to fetch worlds:", error);
        // Consider setting an error state and displaying it to the user
      });
  }, [user]);

  useEffect(() => {
    // Fetch worlds from the backend and set them in state
    fetch("/api/worlds")
      .then(response => response.json())
      .then(setWorlds)
      .catch(console.error); // Handle errors appropriately
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      if (!response.ok) throw new Error("Campaign creation failed");
      // Redirect to a success page or the campaign details page
      router.push("/campaigns/success");
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  return (
    <div>
      {worlds.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formState.name} onChange={handleChange} required />
          <textarea name="description" value={formState.description} onChange={handleChange} required />
          <select name="worldId" value={formState.worldId} onChange={handleChange} required>
            {worlds.map(world => (
              <option key={world.externalId} value={world._id}>
                {world.name}
              </option>
            ))}
          </select>
          <input type="number" name="numCharacters" value={formState.numCharacters} onChange={handleChange} required />
          <input
            type="number"
            name="numGmMadeCharacters"
            value={formState.numGmMadeCharacters}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="numPlayerMadeCharacters"
            value={formState.numPlayerMadeCharacters}
            onChange={handleChange}
            required
          />
          <label>
            Session Zero:
            <input
              type="checkbox"
              name="sessionZero"
              checked={formState.sessionZero}
              onChange={e => setFormState(prev => ({ ...prev, sessionZero: e.target.checked }))}
            />
          </label>
          <select name="frequency" value={formState.frequency} onChange={handleChange} required>
            <option value="one_shot">One Shot</option>
            <option value="regular_cadence">Regular Cadence</option>
            <option value="custom_cadence">Custom Cadence</option>
          </select>
          {/* For scheduledSessions and notifications, you'll need to implement a way to handle array inputs */}
          <button type="submit">Create Campaign</button>
        </form>
      ) : (
        <div>You do not have permission to create campaigns in any worlds.</div>
      )}
    </div>
  );
};

export default CreateCampaign;
