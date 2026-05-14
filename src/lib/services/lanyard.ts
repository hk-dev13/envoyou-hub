export interface DiscordPresence {
  status: 'online' | 'idle' | 'dnd' | 'offline';
  activity: string | null;
  activityType: 'playing' | 'researching' | 'active' | null;
}

export async function getDiscordPresence(): Promise<DiscordPresence | null> {
  const discordId = process.env.DISCORD_USER_ID;
  
  if (!discordId) {
    // Fallback if no ID is set in .env
    return {
      status: 'offline',
      activity: null,
      activityType: null
    };
  }

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, {
      next: { revalidate: 30 }, // 30 seconds
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (!json.success || !json.data) return null;

    const data = json.data;
    const status = data.discord_status; // online, idle, dnd, offline

    // Find the first activity that is NOT Spotify
    const nonSpotifyActivity = data.activities?.find((act: any) => act.id !== 'spotify:1' && act.name !== 'Spotify');

    let activity = null;
    let activityType: DiscordPresence['activityType'] = null;

    if (nonSpotifyActivity) {
      activity = nonSpotifyActivity.name;
      // 0 = Playing, 1 = Streaming, 2 = Listening, 3 = Watching, 4 = Custom Status, 5 = Competing
      if (nonSpotifyActivity.type === 0) activityType = 'playing';
      else activityType = 'active';

      // If it's a custom status, use the state/details if available
      if (nonSpotifyActivity.type === 4 && nonSpotifyActivity.state) {
        activity = nonSpotifyActivity.state;
        activityType = 'researching'; // Custom mapping for professional look
      }
    }

    return {
      status,
      activity,
      activityType: activityType || (status === 'online' ? 'active' : null)
    };
  } catch (error) {
    console.error('Error fetching Discord presence:', error);
    return null;
  }
}
