"use client";

import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { Sidebar } from "@/app/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Sidebar />
      {children}
    </ProtectedRoute>
  );
}
