"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  SparklesIcon,
  PhotoIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to designer if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/designer");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Fixed background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_80%)]"></div>
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.03]"></div>
        <div className="spotlight-blue absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
        <div className="spotlight-indigo absolute bottom-0 right-1/4 h-[600px] w-[600px] opacity-30"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-40 border-b border-gray-800/30 backdrop-blur-xl bg-gray-900/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent"
          >
            Interior Designer AI
          </motion.h1>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium hover:from-indigo-700 hover:to-blue-700 transition-all"
            >
              Sign In
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Transform Your Space
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">
              With AI-Powered Interior Design in Seconds
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Reimagine your room with cutting-edge artificial intelligence.
              Upload a photo, choose your style, and watch as our AI generates
              stunning design suggestions instantly.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRightIcon className="h-5 w-5" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 rounded-lg border border-gray-600 text-white font-bold text-lg hover:border-gray-400 hover:bg-gray-800/50 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {/* Feature 1 */}
            <div className="rounded-2xl border border-gray-700/50 bg-gray-900/40 p-8 backdrop-blur-xl hover:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mb-4">
                <PhotoIcon className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload</h3>
              <p className="text-gray-400">
                Simply upload a photo of your room and let our AI analyze the
                space.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-gray-700/50 bg-gray-900/40 p-8 backdrop-blur-xl hover:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 mb-4">
                <svg
                  className="h-7 w-7 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Customize</h3>
              <p className="text-gray-400">
                Choose your preferred design style and room type for
                personalized results.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-gray-700/50 bg-gray-900/40 p-8 backdrop-blur-xl hover:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 mb-4">
                <SparklesIcon className="h-7 w-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Transform</h3>
              <p className="text-gray-400">
                Get AI-generated design suggestions in seconds with stunning
                visualizations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.section
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800/30"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Benefit 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex gap-4"
            >
              <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Instant Results
                </h3>
                <p className="text-gray-400">
                  Get professional design suggestions in just seconds, not
                  hours or days.
                </p>
              </div>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex gap-4"
            >
              <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Multiple Styles
                </h3>
                <p className="text-gray-400">
                  Choose from modern, vintage, minimalist, and professional
                  designs.
                </p>
              </div>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-4"
            >
              <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Any Room Type
                </h3>
                <p className="text-gray-400">
                  Works with living rooms, bedrooms, bathrooms, offices, and
                  more.
                </p>
              </div>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-4"
            >
              <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Download & Share
                </h3>
                <p className="text-gray-400">
                  Save your designs as high-quality images and share with
                  friends and designers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-gray-700/50 bg-gradient-to-b from-gray-900/60 to-gray-900/30 p-12 backdrop-blur-xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg mb-8"
          >
            Start designing your dream room today with just a few clicks.
          </motion.p>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all inline-flex items-center gap-2"
            >
              Get Started Now
              <ArrowRightIcon className="h-5 w-5" />
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-t border-gray-800/30 py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500"
      >
        <p>© 2024 Interior Designer AI. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
