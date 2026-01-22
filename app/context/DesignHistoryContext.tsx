"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type DesignItem = {
  id: string;
  imageUrl: string;
  theme: string;
  room: string;
  timestamp: number;
  name: string;
};

type DesignHistoryContextType = {
  designs: DesignItem[];
  addDesign: (design: Omit<DesignItem, "id" | "timestamp">) => void;
  removeDesign: (id: string) => void;
  clearHistory: () => void;
  isLoading: boolean;
};

const DesignHistoryContext = createContext<DesignHistoryContextType | undefined>(undefined);

export function DesignHistoryProvider({ children }: { children: React.ReactNode }) {
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load designs from localStorage on mount
  useEffect(() => {
    const storedDesigns = localStorage.getItem("designHistory");
    if (storedDesigns) {
      try {
        setDesigns(JSON.parse(storedDesigns));
      } catch {
        localStorage.removeItem("designHistory");
      }
    }
    setIsLoading(false);
  }, []);

  // Save designs to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("designHistory", JSON.stringify(designs));
    }
  }, [designs, isLoading]);

  const addDesign = (design: Omit<DesignItem, "id" | "timestamp">) => {
    const newDesign: DesignItem = {
      ...design,
      id: `design_${Date.now()}`,
      timestamp: Date.now(),
    };
    setDesigns((prev) => [newDesign, ...prev]);
  };

  const removeDesign = (id: string) => {
    setDesigns((prev) => prev.filter((design) => design.id !== id));
  };

  const clearHistory = () => {
    setDesigns([]);
  };

  return (
    <DesignHistoryContext.Provider
      value={{
        designs,
        addDesign,
        removeDesign,
        clearHistory,
        isLoading,
      }}
    >
      {children}
    </DesignHistoryContext.Provider>
  );
}

export function useDesignHistory() {
  const context = useContext(DesignHistoryContext);
  if (context === undefined) {
    throw new Error("useDesignHistory must be used within a DesignHistoryProvider");
  }
  return context;
}
