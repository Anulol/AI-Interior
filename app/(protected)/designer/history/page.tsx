"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDesignHistory } from "@/app/context/DesignHistoryContext";
import { TrashIcon, ArrowDownTrayIcon, EyeIcon } from "@heroicons/react/24/outline";
import { saveAs } from "file-saver";
import { useState } from "react";
import Link from "next/link";

export default function HistoryPage() {
  const { designs, removeDesign, clearHistory } = useDesignHistory();
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  const handleDownload = (imageUrl: string, name: string) => {
    saveAs(imageUrl, `${name}-${Date.now()}.png`);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 pb-20">
      {/* Fixed background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_80%)]"></div>
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.03]"></div>
        <div className="spotlight-blue absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
        <div className="spotlight-indigo absolute bottom-0 right-1/4 h-[600px] w-[600px] opacity-30"></div>
      </div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen flex-col py-10 lg:pl-72"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-4 mb-8 lg:mx-6 xl:mx-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Design History
              </h1>
              <p className="text-gray-400 mt-2">
                {designs.length} design{designs.length !== 1 ? "s" : ""} saved
              </p>
            </div>
            {designs.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear all designs?"
                    )
                  ) {
                    clearHistory();
                  }
                }}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-600/80 to-rose-600/80 hover:from-red-600 hover:to-rose-600 text-white text-sm font-medium transition-all"
              >
                Clear All
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Empty State */}
        {designs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex items-center justify-center mx-4 lg:mx-6 xl:mx-8"
          >
            <div className="text-center rounded-2xl border border-gray-700/50 bg-gray-900/40 p-12 backdrop-blur-xl max-w-md w-full">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mb-4">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m0 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No designs yet
              </h3>
              <p className="text-gray-400 mb-6">
                Create your first AI-generated interior design to see it appear
                here.
              </p>
              <Link href="/designer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium hover:from-indigo-700 hover:to-blue-700 transition-all"
                >
                  Create Design
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Grid of Designs */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-4 lg:mx-6 xl:mx-8"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {designs.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative rounded-xl overflow-hidden border border-gray-700/50 bg-gray-900/40 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden bg-gray-800">
                      <motion.img
                        src={design.imageUrl}
                        alt={design.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-2"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDesign(design.id)}
                          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                          title="View"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownload(design.imageUrl, design.name)}
                          className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white transition-all"
                          title="Download"
                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeDesign(design.id)}
                          className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-white truncate mb-1">
                        {design.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">
                        {formatDate(design.timestamp)}
                      </p>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300">
                          {design.theme}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                          {design.room}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </motion.main>

      {/* Modal for viewing full image */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDesign(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 lg:pl-72"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <div className="rounded-2xl border border-gray-700/50 bg-gray-900/90 backdrop-blur-xl overflow-hidden">
                <img
                  src={
                    designs.find((d) => d.id === selectedDesign)?.imageUrl || ""
                  }
                  alt="Design"
                  className="w-full h-auto"
                />
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {designs.find((d) => d.id === selectedDesign)?.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {formatDate(
                        designs.find((d) => d.id === selectedDesign)
                          ?.timestamp || 0
                      )}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDesign(null)}
                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
