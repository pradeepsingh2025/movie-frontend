import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-4">
          
          

          {/* Made By Section */}
          <div className="text-sm font-medium">
            Made with <span className="text-red-600 animate-pulse">❤</span> by{' '}
            <a 
              href="https://pradeepswork.space" // Replace with your actual link
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors underline decoration-dotted underline-offset-4"
            >
              Pradeep Singh
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
}