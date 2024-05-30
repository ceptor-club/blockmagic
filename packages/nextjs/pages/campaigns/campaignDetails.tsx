import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Campaign } from "../../types/types";

const CampaignDetails = () => {
  const router = useRouter();
  const { externalId } = router.query;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchCampaignDetails = async () => {
      if (!externalId) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/campaigns/${externalId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch campaign details");
        }
        const data = await response.json();
        setCampaign(data);
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

    fetchCampaignDetails();
  }, [externalId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!campaign) return <div>No campaign found</div>;

  return (
    <div>
      <h1>{campaign.name}</h1>
      <p>{campaign.description}</p>
      <p>{campaign.worldId}</p>
      <p>{campaign.numCharacters}</p>
      <p>{campaign.frequency}</p>
      <p>{campaign.scheduledSessions.map(session => session.toLocaleString()).join(", ")}</p>
    </div>
  );
};

export default CampaignDetails;
