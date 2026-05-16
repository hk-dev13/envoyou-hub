import BentoCard from '@/components/BentoCard';
import { ArrowUpRight, GitCommit, Activity, Target, Mail } from 'lucide-react';
import { LinkedinIcon, YoutubeIcon, InstagramIcon, DiscordIcon, GithubIcon } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestGithubActivity } from '@/lib/services/github';
import { getDiscordPresence } from '@/lib/services/lanyard';
import { getLatestPosts } from '@/lib/services/blog';

const BRAND = '#1D80C3';

export default async function Home() {
  const [githubActivity, discordPresence, posts] = await Promise.all([
    getLatestGithubActivity(),
    getDiscordPresence(),
    getLatestPosts(),
  ]);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full auto-rows-[200px]">

        {/* 1. Profile Card (Priority 2) - 2x2 */}
        <BentoCard
          className="row-span-2 md:col-span-2 md:row-span-2 p-6 md:p-8 flex flex-col justify-end"
          delay={0.1}
          glowColor="rgba(29, 128, 195, 0.15)"
        >
          <div className="absolute top-8 right-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[#1D80C3] to-[#2563eb] p-1 mb-4 relative overflow-hidden">
              <Image
                src="/me/husniKusumaEnvoyou.webp"
                alt="Husni Kusuma"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover rounded-full p-1 bg-slate-900"
              />
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-2 transition-all duration-300
              group-hover:text-transparent 
              group-hover:bg-clip-text 
              group-hover:bg-gradient-to-r 
              group-hover:from-white/40 
              group-hover:via-white 
              group-hover:to-white/40 
              group-hover:bg-[length:200%_auto] 
              animate-none 
              group-hover:animate-[metallic-shine_2s_linear_infinite]"
            >
              Husni Kusuma
            </h1>

            <p className="text-slate-400 text-lg">
              Building intelligent systems, editorial platforms, and digital ecosystems.
            </p>
          </div>

          <p className="text-slate-500 max-w-md leading-relaxed">
            Exploring the intersection of AI, technology, and digital media through intelligent systems,
            research-driven content, and ecosystem building.

            <Link
              href="https://blog.envoyou.com/about"
              target="_blank"
              className="text-slate-300 hover:text-[#1D80C3] hover:underline ml-2 font-medium transition-all"
            >
              Read more...
            </Link>
          </p>
        </BentoCard>

        {/* 2. Blog Card (Priority 1) - 2x3 */}
        <BentoCard
          className="row-span-2 md:col-span-2 md:row-span-3 p-0 flex flex-col relative overflow-hidden group/blog"
          delay={0.2}
          glowColor="rgba(29, 128, 195, 0.2)"
        >
          <Link href="https://blog.envoyou.com" target="_blank" className="absolute inset-0 z-20" />

          <div className="relative h-full flex flex-col">
            {/* Background & Overlay */}
            <div className="absolute inset-0 z-0">
              {posts[0]?.cover_image ? (
                <Image
                  src={posts[0].cover_image}
                  alt={posts[0].title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-20 group-hover/blog:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1D80C3]/20 to-slate-950" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden shadow-2xl">
                  <Image src="/brand/logo.svg" alt="Envoyou Logo" width={24} height={24} className="object-contain" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-xl tracking-tight">Envoyou Blog</h2>
                  <p className="text-[10px] font-bold text-[#1D80C3] uppercase tracking-[0.2em]">Ecosystem Core</p>
                </div>
              </div>

              <div className="mt-auto">
                {posts[0] ? (
                  <div className="space-y-4">
                    <div className="inline-flex px-2.5 py-1 rounded-md bg-[#1D80C3]/20 border border-[#1D80C3]/30 text-[#1D80C3] text-[10px] font-bold uppercase tracking-wider mb-2">
                      Featured Insight
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover/blog:text-[#1D80C3] transition-colors duration-300">
                      {posts[0].title}
                    </h3>
                    <p className="text-slate-400 text-base md:text-lg line-clamp-3 leading-relaxed max-w-xl">
                      {posts[0].excerpt}
                    </p>

                    <div className="pt-6 flex items-center justify-between border-t border-white/10">
                      <div className="flex items-center gap-2 text-slate-300 font-medium group-hover/blog:text-white transition-colors">
                        <span>Read full article</span>
                        <ArrowUpRight className="w-5 h-5 group-hover/blog:translate-x-1 group-hover/blog:-translate-y-1 transition-transform" />
                      </div>

                      {posts.length > 1 && (
                        <div className="text-xs text-slate-500 font-medium italic">
                          + {posts.length - 1} more recent updates
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Exploring the intersection of AI & Technology</h3>
                    <p className="text-slate-400 text-base">Read our latest research and digital ecosystem insights.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subtle animated light sweep for the whole card */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/blog:animate-[metallic-shine_3s_linear_infinite]" />
        </BentoCard>

        {/* 3. YouTube Card (Priority 3) - 2x1 */}
        <BentoCard
          className="md:col-span-2 md:row-span-1 p-0 overflow-hidden group/yt cursor-pointer relative"
          delay={0.3}
          glowColor="rgba(29, 128, 195, 0.12)"
        >
          <Link href="https://www.youtube.com/@digitalforfuturee" target="_blank" className="absolute inset-0 z-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30 z-10" />
          <div className="absolute inset-0 bg-[url('https://cdn.envoyou.com/brand/youtube.jpeg')] bg-cover bg-center group-hover/yt:scale-105 transition-transform duration-700 opacity-40" />

          <div className="absolute inset-y-0 left-8 z-10 flex flex-col justify-center max-w-[60%]">
            <div className="flex items-center gap-2 mb-1">
              <YoutubeIcon className="w-5 h-5 text-[#1D80C3]" />
              <span className="font-bold text-white text-sm tracking-wide">Gaming Channel</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">Side personality, highlights & streams</p>
          </div>

          <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-slate-600 group-hover/yt:text-white group-hover/yt:translate-x-1 group-hover/yt:-translate-y-1 transition-all z-20" />
        </BentoCard>

        {/* 4. Current Focus - 1x1 */}
        <BentoCard
          className="p-6 flex flex-col justify-center relative overflow-hidden"
          delay={0.4}
          glowColor="rgba(29, 128, 195, 0.12)"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-[#1D80C3]" />
            <span className="font-semibold text-[#1D80C3] text-[10px] tracking-widest uppercase">Focus</span>
          </div>
          <p className="font-medium text-white text-base leading-snug">
            Building Envoyou Ecosystem
          </p>
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Target className="w-24 h-24 text-[#1D80C3]" />
          </div>
        </BentoCard>

        {/* 5. Discord Presence - 1x1 */}
        <BentoCard
          className="p-6 flex flex-col justify-center relative overflow-hidden group/discord"
          delay={0.5}
          glowColor="rgba(29, 128, 195, 0.12)"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="relative flex h-2 w-2">
              {discordPresence?.status === 'online' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${discordPresence?.status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'}`} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Discord</span>
          </div>
          <p className="font-medium text-white text-base leading-snug line-clamp-2">
            {discordPresence?.activity || 'Researching AI systems'}
          </p>
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Activity className="w-24 h-24 text-[#1D80C3]" />
          </div>
        </BentoCard>

        {/* 6. GitHub Activity - 1x1 */}
        <BentoCard
          className="p-6 flex flex-col justify-center relative overflow-hidden group/github"
          delay={0.6}
          glowColor="rgba(29, 128, 195, 0.12)"
        >
          <div className="flex items-center gap-2 mb-2">
            <GitCommit className="w-4 h-4 text-slate-300" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">GitHub</span>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {githubActivity && githubActivity.length > 0 ? (
              githubActivity.map((activity, idx) => (
                <div key={idx} className="flex flex-col group/repo">
                  <p className="text-white font-medium text-sm leading-tight truncate flex items-center gap-1.5">
                    <span className="text-[#1D80C3] opacity-70 group-hover/repo:opacity-100 transition-opacity">→</span>
                    <span className="text-slate-400">{activity.action}</span>
                    <span className="text-white">{activity.repo}</span>
                  </p>
                  <span className="text-[9px] text-slate-500 ml-5 mt-0.5">{activity.timeAgo}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No recent activity.</p>
            )}
          </div>
        </BentoCard>

        {/* 7. Connect - 1x1 */}
        <BentoCard
          className="p-6 flex flex-col justify-between relative overflow-hidden group/connect"
          delay={0.7}
          glowColor="rgba(29, 128, 195, 0.12)"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D80C3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D80C3]"></span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available</span>
            </div>
            <p className="text-white font-medium text-sm leading-snug">
              Open for collaboration & new opportunities.
            </p>
          </div>

          <div className="flex gap-2.5 items-center justify-start relative z-10 mt-4">
            {[
              { href: 'https://github.com/hk-dev13', icon: <GithubIcon className="w-4 h-4" />, label: 'GitHub', color: 'hover:border-white hover:text-white hover:bg-white/10' },
              { href: 'https://www.linkedin.com/in/husni-kusuma', icon: <LinkedinIcon className="w-4 h-4" />, label: 'LinkedIn', color: 'hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10' },
              { href: 'https://www.instagram.com/bosanid13', icon: <InstagramIcon className="w-4 h-4" />, label: 'Instagram', color: 'hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/10' },
              { href: 'https://discord.gg/BQMGP3skmJ', icon: <DiscordIcon className="w-4 h-4" />, label: 'Discord', color: 'hover:border-[#5865F2] hover:text-[#5865F2] hover:bg-[#5865F2]/10' },
              { href: 'mailto:husnikusuma@envoyou.com', icon: <Mail className="w-4 h-4" />, label: 'Email', color: 'hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-500/10' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 ${item.color}`}
              >
                {item.icon}
              </Link>
            ))}
          </div>

          <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none transition-transform duration-500 group-hover/connect:scale-110 group-hover/connect:-rotate-12">
            <Mail className="w-32 h-32 text-white" />
          </div>
        </BentoCard>
      </div>
    </main>
  );
}