import { formatDistanceToNow } from 'date-fns';

export interface GithubActivity {
  repo: string;
  action: string;
  timeAgo: string;
}

export async function getLatestGithubActivity(): Promise<GithubActivity | null> {
  try {
    const res = await fetch('https://api.github.com/users/hk-dev13/events/public', {
      next: { revalidate: 300 }, // 5 minutes
    });

    if (!res.ok) {
      console.warn('Failed to fetch GitHub activity');
      return null;
    }

    const events = await res.json();
    if (!events || events.length === 0) return null;

    // Filter to important events or just get the very latest
    const latestEvent = events[0];
    
    let action = 'Updated';
    if (latestEvent.type === 'PushEvent') action = 'Pushed to';
    else if (latestEvent.type === 'CreateEvent') action = 'Created';
    else if (latestEvent.type === 'WatchEvent') action = 'Starred';
    else if (latestEvent.type === 'PullRequestEvent') action = 'Opened PR in';

    return {
      repo: latestEvent.repo.name.replace('hk-dev13/', ''),
      action,
      timeAgo: formatDistanceToNow(new Date(latestEvent.created_at), { addSuffix: true }),
    };
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return null;
  }
}
