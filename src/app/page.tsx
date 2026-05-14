import BentoCard from '@/components/BentoCard';
import { ArrowUpRight, MapPin, GitCommit, Activity, Target, Mail } from 'lucide-react';
import { LinkedinIcon, YoutubeIcon, InstagramIcon } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestGithubActivity } from '@/lib/services/github';
import { getDiscordPresence } from '@/lib/services/lanyard';
import { getLatestPosts } from '@/lib/services/blog';

export default async function Home() {
  // Aggregate all API requests in parallel!
  const [githubActivity, discordPresence, posts] = await Promise.all([
    getLatestGithubActivity(),
    getDiscordPresence(),
    getLatestPosts(),
  ]);

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
            <p className="text-slate-400 text-lg">Software Engineer & Digital Builder</p>
          </div>
          <p className="text-slate-500 max-w-md">
            I design and build full-stack applications, create intelligent systems with AI, and craft digital experiences that make a difference.
          </p>
        </BentoCard>

        {/* Current Focus Card */}
        <BentoCard className="p-6 flex flex-col justify-center relative overflow-hidden" delay={0.2} glowColor="rgba(234, 179, 8, 0.15)">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-yellow-500/90 text-sm tracking-wide uppercase">Current Focus</span>
          </div>
          <p className="font-medium text-white text-lg leading-snug">
            Building Envoyou Ecosystem
          </p>
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Target className="w-32 h-32" />
          </div>
        </BentoCard>

        {/* Discord / Steam Presence Card */}
        <BentoCard className="p-6 flex flex-col justify-center relative overflow-hidden group/discord" delay={0.3} glowColor="rgba(34, 197, 94, 0.15)">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                {discordPresence?.status === 'online' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${discordPresence?.status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
              </div>
              <span className="font-semibold text-slate-400 text-sm tracking-wide uppercase">
                {discordPresence?.activityType === 'playing' ? 'Currently Playing' : 'Currently Active'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest group-hover/discord:text-emerald-500 transition-colors">Discord</span>
          </div>
          <p className="font-medium text-white text-lg leading-snug">
            {discordPresence?.activity || 'Researching AI systems'}
          </p>
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Activity className="w-32 h-32" />
          </div>
        </BentoCard>

        {/* GitHub Activity Card */}
        <BentoCard className="p-6 flex flex-col justify-center relative overflow-hidden group/github cursor-pointer" delay={0.4} glowColor="rgba(255, 255, 255, 0.15)">
          <Link href="https://github.com/hk-dev13" target="_blank" className="absolute inset-0 z-20" />
          <div className="flex items-center gap-2 mb-3">
            <GitCommit className="w-5 h-5 text-slate-300 group-hover/github:text-white transition-colors" />
            <span className="font-semibold text-slate-400 text-sm tracking-wide uppercase group-hover/github:text-slate-300 transition-colors">Latest Activity</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-300 font-medium text-lg leading-snug truncate">
              {githubActivity?.action || 'Updated'} <span className="text-white">{githubActivity?.repo || 'envoyou-hub'}</span>
            </span>
            <span className="text-slate-500 text-sm mt-1">
              {githubActivity?.timeAgo || 'Recently'}
            </span>
          </div>
          <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-slate-600 group-hover/github:text-white group-hover/github:translate-x-1 group-hover/github:-translate-y-1 transition-all" />
        </BentoCard>

        {/* Connect / Socials */}
        <BentoCard className="p-6 flex flex-col justify-center relative overflow-hidden" delay={0.5} glowColor="rgba(59, 130, 246, 0.15)">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-slate-300 text-sm tracking-wide uppercase">Let's Connect</span>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="https://www.linkedin.com/in/husni-kusuma" target="_blank" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 hover:text-[#0A66C2] text-slate-400 transition-all relative z-20" aria-label="LinkedIn">
              <LinkedinIcon className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/bosanid13" target="_blank" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-500 text-slate-400 transition-all relative z-20" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </Link>
            <Link href="mailto:husnikusuma@envoyou.com" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-500 text-slate-400 transition-all relative z-20" aria-label="Email">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none">
            <Mail className="w-32 h-32" />
          </div>
        </BentoCard>

        {/* Blog Highlight Card */}
        <BentoCard className="md:col-span-2 md:row-span-2 p-6 flex flex-col relative overflow-hidden group/blog" delay={0.6} glowColor="rgba(59, 130, 246, 0.15)">
          <Link href="https://blog.envoyou.com" target="_blank" className="absolute inset-0 z-20" />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                <Image src="/brand/logo.svg" alt="Envoyou Logo" width={20} height={20} className="object-contain" />
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

        {/* YouTube Gaming */}
        <BentoCard className="md:col-span-2 md:row-span-2 p-0 overflow-hidden group/yt cursor-pointer relative" delay={0.7} glowColor="rgba(255, 0, 0, 0.2)">
          <Link href="https://www.youtube.com/@digitalforfuturee" target="_blank" className="absolute inset-0 z-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://cdn.envoyou.com/brand/youtube.jpeg')] bg-cover bg-center group-hover/yt:scale-105 transition-transform duration-700" />
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
