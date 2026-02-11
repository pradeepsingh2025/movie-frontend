# Movie Ticket Booking System Frontend

A modern, responsive web application for browsing movies, checking showtimes, and booking tickets. Built with Next.js 16 and Tailwind CSS 4, this frontend interfaces with a separate JAVA backend API to provide a seamless movie-going experience.

## ✨ Key Features

- **🎬 Browse Movies**: View a list of currently showing movies with ratings and details.
- **🔍 Movie Details**: In-depth information about movies, including cast, plot, and duration.
- **📅 Showtimes & Booking**: Select dates and showtimes for your favorite movies.
- **💺 Interactive Seat Map**: Visual seat selection interface to pick your preferred spots.
- **🔐 User Authentication**: Secure Login and Signup functionality using JWT, access and refresh tokens.
- **👤 User Dashboard**: Manage your bookings and view reservation history.
- **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: Built with Radix UI primitives and styled with Tailwind (Shadcn/UI pattern).
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management & Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: React Hook Form + Zod validation.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd movie-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and configure your backend API URL and other necessary variables:
   
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080 # or your backend URL
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages and layouts
│   ├── auth/             # Authentication pages (Login, Signup)
│   ├── movies/           # Movie listing and details
│   ├── reservations/     # User bookings
│   ├── showTimes/        # Showtime selection
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components (buttons, cards, etc.)
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Application footer
│   └── ...
├── lib/                  # Utility functions and API clients
│   ├── apiClient.ts      # Centralized API fetcher
│   └── ...
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
