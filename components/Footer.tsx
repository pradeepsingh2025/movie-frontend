import Link from 'next/link';
import { Film, Heart } from 'lucide-react';

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

        {/* Top section — Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="text-red-600 text-xl">🎬</span>
              <span className="text-xl font-bold text-white tracking-tight group-hover:opacity-80 transition-opacity">
                BookYourShow
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              This is a demo project for discovering movies, exploring showtimes, and booking the perfect seats for you haha.
            </p>
          </div>

          {/* Navigation columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-1">
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
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-gray-800/60">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600 xl:w-1/3 xl:text-left text-center">
              © {new Date().getFullYear()} BookYourShow. All rights reserved.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 xl:w-1/3">
              <span className="opacity-70">Contributors:</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {contributors.map((c, i) => (
                  <span key={c.name} className="flex items-center gap-2">
                    <a href={c.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                      {c.name}
                    </a>
                    {i < contributors.length - 1 && <span className="opacity-40">•</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex xl:justify-end xl:w-1/3 justify-center">
              <p className="text-xs text-gray-600 flex items-center gap-1">
                Built with <Heart className="w-3 h-3 text-red-600 fill-red-600" /> using Next.js & Spring Boot
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}