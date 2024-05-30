import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Character } from "../../types/types";

const CharacterDetails = () => {
  const router = useRouter();
  const { externalId } = router.query;
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (externalId) {
      setLoading(true);
      fetch(`/api/characters/${externalId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch character details");
          }
          return res.json();
        })
        .then(data => {
          setCharacter(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [externalId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>No character found</div>;

  return (
    <div>
      <h1>{character.name}</h1>
      <p>{character.campaignId}</p>
      <p>{character.class}</p>
      <p>{character.race}</p>
      <p>{character.createdBy}</p>
      <p>{character.isCampaignLocked}</p>
    </div>
  );
};

export default CharacterDetails;
