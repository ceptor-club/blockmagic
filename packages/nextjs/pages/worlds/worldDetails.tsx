import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Campaign } from "../../types/types";

const WorldDetails = () => {
  const router = useRouter();
  const { externalId } = router.query;
  const [world, setWorld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchWorldDetails = async () => {
      if (!externalId) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/worlds/${externalId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch world details");
        }
        const worldData = await response.json();
        setWorld(worldData);
        // Now fetch campaigns associated with this world
        const campaignsResponse = await fetch(`/api/campaigns?worldId=${worldData._id}`);
        if (!campaignsResponse.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        const campaignsData = await campaignsResponse.json();
        setCampaigns(campaignsData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (externalId) {
      fetchWorldDetails();
    }
  }, [externalId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!world) return <div>No world found</div>;

  return (
    <div>
      {/* ... (existing world details display code remains unchanged) */}
      {campaigns.length > 0 && (
        <div>
          <h2>Current Campaigns</h2>
          <ul>
            {campaigns.map(campaign => (
              <li key={campaign.externalId}>
                {campaign.name} (ID: {campaign.externalId})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorldDetails;
