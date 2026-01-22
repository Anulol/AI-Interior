import { usePathname, useRouter } from "next/navigation";
import { navigation } from "@/common";
import { classNames } from "@/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/app/context/AuthContext";

export function DesktopSidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-800/30 bg-gray-900/70 shadow-lg backdrop-blur-xl">
        <div className="flex h-16 shrink-0 items-center px-6">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-xl font-bold tracking-tight text-transparent drop-shadow-sm"
          >
            Interior Designer
          </motion.h1>
        </div>

        {/* Decorative element */}
        <div className="px-6">
          <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        </div>

        <nav className="flex flex-1 flex-col px-6">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={classNames(
                        "group relative flex gap-x-3 overflow-hidden rounded-xl p-2 text-sm font-medium leading-6 transition-all duration-300",
                        pathName === item.href
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      )}
                    >
                      {pathName === item.href && (
                        <motion.span
                          layoutId="sidebar-indicator"
                          className="absolute inset-0 rounded-xl border border-indigo-700/30 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"
                          transition={{ type: "spring", bounce: 0.2 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center">
                        <span className="relative mr-3">
                          <item.icon
                            className={`h-5 w-5 transition-colors duration-200 ${
                              pathName === item.href
                                ? "text-blue-400"
                                : "text-gray-400 group-hover:text-gray-300"
                            }`}
                            aria-hidden="true"
                          />

                          {/* Glow effect for active icon */}
                          {pathName === item.href && (
                            <span className="absolute inset-0 rounded-full bg-blue-400 opacity-40 blur-sm"></span>
                          )}
                        </span>

                        {item.name}

                        {/* Active indicator dot */}
                        {pathName === item.href && (
                          <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
                        )}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </li>

            {/* Bottom section with user info and logout */}
            <li className="mt-auto">
              <div className="space-y-3">
                {/* User info */}
                <div className="rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                      <span className="text-lg font-bold text-white">
                        {user?.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600/80 to-rose-600/80 hover:from-red-600 hover:to-rose-600 text-white text-sm font-medium transition-all duration-200"
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                  Sign Out
                </motion.button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
