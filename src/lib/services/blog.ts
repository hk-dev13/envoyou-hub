export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
}

export async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.envoyou.com/api';
    const res = await fetch(`${API_URL}/posts?limit=2`, { 
      next: { revalidate: 300 } // 5 minutes
    });
    
    if (!res.ok) throw new Error('Failed to fetch posts');
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
