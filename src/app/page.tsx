import BentoCard from '@/components/BentoCard';
import { ArrowUpRight, MapPin, Code2, ShoppingCart } from 'lucide-react';
import { LinkedinIcon, YoutubeIcon } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';

// Simple fetch for blog posts (runs on server, bypasses CORS)
async function getLatestPosts() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.envoyou.com/api';
    const res = await fetch(`${API_URL}/posts?limit=2`, { 
      next: { revalidate: 3600 } 
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full auto-rows-[200px]">
        
        {/* Profile Card */}
        <BentoCard className="md:col-span-2 md:row-span-2 p-8 flex flex-col justify-end" delay={0.1}>
          <div className="absolute top-8 right-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div className="mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 p-1 mb-4 relative overflow-hidden">
              <Image 
                src="/me/husniKusumaEnvoyou.webp" 
                alt="Husni Kusuma" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover rounded-full p-1 bg-slate-900"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Husni Kusuma</h1>
            <p className="text-slate-400 text-lg">Fullstack Developer & Data Analyst</p>
          </div>
          <p className="text-slate-500 max-w-md">
            Building scalable web applications and analyzing complex data to drive business decisions. Founder of Envoyou.
          </p>
        </BentoCard>

        {/* Map Card */}
        <BentoCard className="p-0 relative" delay={0.2} glowColor="rgba(16, 185, 129, 0.15)">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] z-10 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-50">Banyuwangi, ID</span>
            </div>
          </div>
          {/* A simple decorative map background (replace with an actual map component if desired) */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale" />
        </BentoCard>

        {/* Socials: LinkedIn */}
        <BentoCard className="p-6 flex flex-col items-center justify-center group/link cursor-pointer" delay={0.3} glowColor="rgba(10, 102, 194, 0.2)">
          <Link href="https://linkedin.com/in/husnikusuma" target="_blank" className="absolute inset-0 z-20" />
          <LinkedinIcon className="w-10 h-10 text-slate-400 group-hover/link:text-[#0A66C2] transition-colors mb-4" />
          <span className="font-semibold text-slate-300">LinkedIn</span>
          <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-slate-600 group-hover/link:text-white group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
        </BentoCard>

        {/* Blog Highlight Card */}
        <BentoCard className="md:col-span-2 md:row-span-2 p-6 flex flex-col relative overflow-hidden group/blog" delay={0.4} glowColor="rgba(59, 130, 246, 0.15)">
          <Link href="https://blog.envoyou.com" target="_blank" className="absolute inset-0 z-20" />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-400" />
              </div>
              <h2 className="font-bold text-white text-lg">Envoyou Blog</h2>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover/blog:text-white transition-colors" />
          </div>
          
          <div className="flex flex-col gap-4 relative z-10 flex-1 justify-center">
            {posts.length > 0 ? (
              posts.map((post: any) => (
                <div key={post.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h3 className="font-semibold text-slate-200 line-clamp-1 mb-1">{post.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
                </div>
              ))
            ) : (
              <div className="text-slate-500 text-center text-sm">No recent posts</div>
            )}
          </div>
          
          {/* Subtle gradient background for blog card */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-600/20 blur-3xl rounded-full pointer-events-none" />
        </BentoCard>

        {/* Kaggle */}
        <BentoCard className="p-6 flex flex-col items-center justify-center group/link cursor-pointer" delay={0.5} glowColor="rgba(32, 190, 255, 0.2)">
          <Link href="https://kaggle.com" target="_blank" className="absolute inset-0 z-20" />
          <div className="w-10 h-10 mb-4 text-slate-400 group-hover/link:text-[#20BEFF] transition-colors flex items-center justify-center font-bold text-2xl">
            K
          </div>
          <span className="font-semibold text-slate-300">Kaggle</span>
          <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-slate-600 group-hover/link:text-white group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
        </BentoCard>

        {/* Digital Store */}
        <BentoCard className="p-6 flex flex-col items-center justify-center group/store cursor-pointer relative overflow-hidden" delay={0.55} glowColor="rgba(217, 70, 239, 0.3)">
          <Link href="https://store.envoyou.com" target="_blank" className="absolute inset-0 z-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 group-hover/store:opacity-100 opacity-50 transition-opacity" />
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 flex items-center justify-center mb-3 shadow-lg shadow-fuchsia-500/30 group-hover/store:scale-110 transition-transform relative z-10">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-white text-lg relative z-10">Digital Store</span>
          <span className="text-[10px] text-fuchsia-100 mt-1 relative z-10 font-semibold px-2.5 py-0.5 bg-fuchsia-500/40 border border-fuchsia-400/30 rounded-full tracking-wide uppercase">Shop Assets</span>
          <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-fuchsia-400/50 group-hover/store:text-white group-hover/store:translate-x-1 group-hover/store:-translate-y-1 transition-all z-10" />
        </BentoCard>

        {/* YouTube Gaming */}
        <BentoCard className="md:col-span-2 p-0 overflow-hidden group/yt cursor-pointer relative" delay={0.6} glowColor="rgba(255, 0, 0, 0.2)">
          <Link href="https://youtube.com" target="_blank" className="absolute inset-0 z-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center group-hover/yt:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-6 left-6 z-10">
            <div className="flex items-center gap-2 mb-2">
              <YoutubeIcon className="w-6 h-6 text-red-500" />
              <span className="font-bold text-white tracking-wide">Gaming Channel</span>
            </div>
            <p className="text-sm text-slate-300">Watch my latest highlights & streams</p>
          </div>
        </BentoCard>
      </div>
    </main>
  );
}
