import { formatDistanceToNow } from 'date-fns';

export interface GithubActivity {
  repo: string;
  action: string;
  timeAgo: string;
}

export async function getLatestGithubActivity(): Promise<GithubActivity[]> {
  try {
    const res = await fetch('https://api.github.com/users/hk-dev13/events/public', {
      next: { revalidate: 300 }, // 5 minutes
    });

    if (!res.ok) {
      console.warn('Failed to fetch GitHub activity');
      return [];
    }

    const events = await res.json();
    if (!events || events.length === 0) return [];

    return events.slice(0, 3).map((event: any) => {
      let action = 'updated';
      if (event.type === 'PushEvent') action = 'pushed';
      else if (event.type === 'CreateEvent') action = 'created';
      else if (event.type === 'WatchEvent') action = 'starred';
      else if (event.type === 'PullRequestEvent') action = 'opened PR in';

      return {
        repo: event.repo.name.replace('hk-dev13/', ''),
        action,
        timeAgo: formatDistanceToNow(new Date(event.created_at), { addSuffix: true }),
      };
    });
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return [];
  }
}
