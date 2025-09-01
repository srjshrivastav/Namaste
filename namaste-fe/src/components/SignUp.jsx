import React, { useState } from "react";
import { useTheme } from "../theme";
import { Link } from "react-router-dom";

export default function SignUp() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if(password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Signing Up with:\nEmail: ${email}\nPassword: ${password}`);
    // Implement your signup logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Sign up</h2>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
            title="Toggle Light/Dark Mode"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm password
            </label>
            <input
              type="password"
              id="confirm"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm your password"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 text-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2 text-lg font-semibold drop-shadow-md transition"
          >
            Sign Up
          </button>
        </form>
         <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500 font-semibold"
        >
          Sign in
        </Link>
      </p>
      </div>
    </div>
  );
}
