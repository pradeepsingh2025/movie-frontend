import Link from 'next/link';
import { Film, Heart, Github, Globe } from 'lucide-react';

const contributors = [
  {
    name: 'Pradeep Singh',
    role: 'Full Stack Developer',
    url: 'https://pradeepswork.space',
    github: 'https://github.com/pradeepsingh2025',
    avatar: 'PS',
  },
  {
    name: 'Srijan Pusp',
    role: 'Full Stack Developer',
    url: 'https://github.com/srijanpusp',
    github: 'https://github.com/srijanpusp',
    avatar: 'SP',
  },
];

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Movies', href: '/movies' },
      { label: 'Showtimes', href: '/showTimes' },
      { label: 'My Reservations', href: '/reservations' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', href: '/auth/login' },
      { label: 'Sign Up', href: '/auth/signup' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">

        {/* Top section — Brand + Links + Contributors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="text-red-600 text-xl">🎬</span>
              <span className="text-xl font-bold text-white tracking-tight group-hover:opacity-80 transition-opacity">
                BookYourShow
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Your one-stop destination for discovering movies, exploring showtimes, and booking the perfect seats.
            </p>
          </div>

          {/* Navigation columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contributors column */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Contributors
            </h3>
            <div className="space-y-3">
              {contributors.map((contributor) => (
                <div key={contributor.name} className="flex items-center gap-3 group">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 flex items-center justify-center text-xs font-bold text-white shrink-0 ring-2 ring-gray-800 group-hover:ring-slate-600/40 transition-all duration-300">
                    {contributor.avatar}
                  </div>
                  {/* Info */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">
                      {contributor.name}
                    </span>
                    <span className="text-xs text-gray-600">{contributor.role}</span>
                  </div>
                  {/* Social links */}
                  <div className="ml-auto flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={contributor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                      aria-label={`${contributor.name} GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={contributor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                      aria-label={`${contributor.name} Website`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-gray-800/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} BookYourShow. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-600 fill-red-600" /> using Next.js & Spring Boot
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}