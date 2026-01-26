"use client";

import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
    children: React.ReactNode;
    header: React.ReactNode;
    footer: React.ReactNode;
}

export default function ConditionalLayout({
    children,
    header,
    footer,
}: ConditionalLayoutProps) {
    const pathname = usePathname();
    const hideHeaderFooter = pathname === "/auth/login" || pathname === "/auth/signup";

    return (
        <>
            {!hideHeaderFooter && header}
            {children}
            {!hideHeaderFooter && footer}
        </>
    );
}
