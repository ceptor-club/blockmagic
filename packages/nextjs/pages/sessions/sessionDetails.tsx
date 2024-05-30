import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Session } from "../../types/types";

const SessionDetails = () => {
  const router = useRouter();
  const { externalId } = router.query;
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!externalId) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/sessions/${externalId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch session details");
        }
        const data = await response.json();
        setSession(data);
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

    fetchSessionDetails();
  }, [externalId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!session) return <div>No session found</div>;

  return (
    <div>
      <h1>Session Details</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {session && (
        <>
          <p>Session Number: {session.sessionNumber}</p>
          <p>Date and Time: {new Date(session.date).toLocaleString()}</p>
          <p>Description: {session.description}</p>
          {/* Additional session details */}
          {session.characters && (
            <div>
              <h2>Attending Characters</h2>
              <ul>
                {session.characters.map(character => (
                  <li key={character.externalId}>
                    {character.name} (ID: {character.externalId})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SessionDetails;
