import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function SuccessCard() {
  const [copied, setCopied] = useState(false);

  const code = "const express = require";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#020617] via-[#0f172a] to-[#020617]">
      {/* Glow background */}
      <div className="absolute w-[400px] h-[200px] bg-purple-600 blur-[120px] opacity-40"></div>

      {/* Card */}
      <div className="relative bg-[#1e293b]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-[420px] shadow-2xl">
        {/* Title */}
        <h2 className="text-white text-xl font-semibold text-center mb-6">
          Quiz Successfully Created 🎉
        </h2>

        {/* Code Box */}
        <div className="flex items-center justify-between bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 mb-6">
          <code className="text-blue-400 text-sm font-mono">{code}</code>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition text-sm"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-400" />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          {/* Continue */}
          <button className="px-6 py-2 rounded-lg bg-linear-to-r from-purple-600 to-purple-500 text-white font-medium hover:scale-105 transition shadow-lg">
            Continue
          </button>

          {/* Dashboard */}
          <button className="px-6 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 transition">
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
