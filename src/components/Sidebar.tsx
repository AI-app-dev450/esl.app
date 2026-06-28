import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Star, Layers, HelpCircle, Puzzle,
  Keyboard, Settings, Flame, LogOut, Shield, User, TrendingUp, Mic, ClipboardList,
} from 'lucide-react';
import type { UserProfile } from '@/types/vocabulary';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps { profile: UserProfile; currentStreak: number; }

function SideNavLink({ to, icon: Icon, label, end = false, accent = false }: {
  to: string; icon: React.ElementType; label: string; end?: boolean; accent?: boolean;
}) {
  const { pathname } = useLocation();
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(to + '/');
  return (
    <NavLink to={to} end={end}
      className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all
        ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white/90'}`}
    >
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-[#F5A623]" />}
      <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${accent ? 'text-[#F5A623]' : isActive ? 'text-white' : 'text-white/50'}`}
        strokeWidth={isActive ? 2 : 1.5} />
      <span className={accent ? 'text-[#F5A623] font-semibold' : ''}>{label}</span>
    </NavLink>
  );
}

export function Sidebar({ profile, currentStreak }: SidebarProps) {
  const { currentUser, logout } = useAuth();
  return (
    <aside className="flex h-full w-[210px] flex-col bg-[#1A1A2E] text-white overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-1.5 px-5 py-5 flex-shrink-0">
        <span className="text-[15px] font-bold tracking-tight leading-snug">Master of English</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623] self-start mt-1 flex-shrink-0" />
      </div>

      <nav className="flex-1 px-3 overflow-y-auto overscroll-contain space-y-4 pb-2">
        {/* Library */}
        <div>
          <div className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/25">Library</div>
          <div className="space-y-0.5">
            <SideNavLink to="/"          icon={LayoutDashboard} label="Dashboard"  end />
            <SideNavLink to="/words"     icon={BookOpen}        label="My Words" />
            <SideNavLink to="/favorites" icon={Star}            label="Favorites" />
            <SideNavLink to="/pretest"   icon={ClipboardList}   label="Pre-Test" />
          </div>
        </div>

        {/* Study */}
        <div>
          <div className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/25">Study</div>
          <div className="space-y-0.5">
            <SideNavLink to="/study/level"      icon={TrendingUp}  label="Level Journey"  accent />
            <SideNavLink to="/study/flashcards" icon={Layers}      label="Flashcards" />
            <SideNavLink to="/study/quiz"       icon={HelpCircle}  label="Quiz" />
            <SideNavLink to="/study/matching"   icon={Puzzle}      label="Matching" />
            <SideNavLink to="/study/spelling"   icon={Keyboard}    label="Spelling" />
            <SideNavLink to="/roleplay"         icon={Mic}         label="Speaking"  accent />
          </div>
        </div>

        {/* Account */}
        <div>
          <div className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/25">Account</div>
          <div className="space-y-0.5">
            <SideNavLink to="/settings"   icon={Settings} label="Settings" />
            <SideNavLink to="/my-account" icon={User}     label="My Account" />
            {currentUser?.role === 'admin' && (
              <SideNavLink to="/admin" icon={Shield} label="Admin Panel" accent />
            )}
          </div>
        </div>
      </nav>

      {/* User footer */}
      <div className="flex-shrink-0 border-t border-white/10 px-3 py-3">
        <NavLink to="/my-account"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 mb-1 transition-colors ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`
          }
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white flex-shrink-0
            ${currentUser?.role === 'admin' ? 'bg-[#F5A623]' : 'bg-[#4A90E2]'}`}>
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{profile.username}</div>
            <div className="flex items-center gap-1 text-[11px] text-white/40">
              <Flame className="h-3 w-3 text-[#F5A623]" />
              <span>{currentStreak}d streak</span>
            </div>
          </div>
        </NavLink>
        <button onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors">
          <LogOut className="h-4 w-4" /><span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
