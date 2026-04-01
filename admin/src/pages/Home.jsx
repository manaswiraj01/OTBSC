import React, { useEffect } from "react";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

const Home = () => {

  // 🖱 cursor glow effect
  useEffect(() => {
    const move = (e) => {
      const glow = document.getElementById("cursor-glow");
      if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🖱 CURSOR GLOW */}
      <div
        id="cursor-glow"
        className="fixed w-40 h-40 bg-blue-500 opacity-20 blur-3xl rounded-full pointer-events-none z-0 transition-all duration-200"
      ></div>

      {/* 🔥 BACKGROUND BLOBS */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-blue-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>

      {/* 🔥 MAIN CONTENT */}
      <div className="relative z-10">

        {/* HERO */}
        <div className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Control Everything <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              From One Dashboard
            </span>
          </h1>

          <p className="text-gray-400 max-w-xl mb-8 text-lg">
            Powerful admin tools to manage bookings, users, and analytics — fast, secure, and beautiful.
          </p>

          {/* 🔐 BUTTONS */}
          <SignedOut>
            <div className="flex gap-4">
 
              <SignInButton>
                <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-110 transition duration-300 shadow-xl">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="px-7 py-3 rounded-xl border border-gray-600 hover:bg-gray-800 hover:scale-110 transition duration-300">
                  Sign Up
                </button>
              </SignUpButton>

            </div>
          </SignedOut>

        </div>

        {/* 🚀 FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto pb-20">

          {[
            {
              title: "📊 Smart Analytics",
              desc: "Interactive charts to track bookings, revenue, and growth trends.",
            },
            {
              title: "⚡ Fast Management",
              desc: "Quickly manage users, bookings, and places with minimal effort.",
            },
            {
              title: "🔐 Secure Access",
              desc: "Clerk-powered authentication with admin-level security.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:scale-105 hover:border-blue-500 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}

        </div>

        {/* 💎 EXTRA CTA */}
        <div className="text-center pb-24 px-6">

          <h2 className="text-2xl font-semibold mb-4">
            Built for Admin Power ⚡
          </h2>

          <p className="text-gray-400 max-w-md mx-auto">
            Everything you need to control your platform — clean, fast, and scalable.
          </p>

          <div className="mt-6">
            <span className="border border-gray-700 px-5 py-2 rounded-full text-sm text-gray-400">
              🔐 Admin Access Only
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;