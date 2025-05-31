"use client"

import { useEffect, useRef } from "react"

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".fade-in-element")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="min-h-screen  px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 fade-in-element">
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: "var(--color-google-red)" }}>
            About
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: "var(--color-google-red)" }}></div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8 fade-in-element">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span style={{ color: "#4285F4" }}>H</span>
                <span style={{ color: "#EA4335" }}>R</span>
                <span style={{ color: "#FBBC05" }}>3</span>
                <span style={{ color: "#34A853" }}>D</span>
                <span style={{ color: "#5F6368" }}> Agent</span>
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                HR3D Agent is an intelligent 3D assistant built to automate and enhance human resource processes. At the
                heart of the system is{" "}
                <span className="font-semibold" style={{ color: "var(--color-google-yellow)" }}>
                  Harold
                </span>
                , a virtual agent powered by Google's Agent Development Kit (ADK) and a multi-agent architecture.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                This assistant redefines how organizations manage workflows by combining advanced automation with a
                visually interactive 3D experience.
              </p>
            </div>

            {/* Key features */}
            <div className="grid md:grid-cols-2 gap-4 fade-in-element">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  
                >
                  <span className="text-white font-bold text-xl">🤖</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">AI-Powered</h4>
                <p className="text-sm text-gray-600">Advanced automation with Google's ADK technology</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                >
                  <span className="text-white font-bold text-xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">3D Interactive</h4>
                <p className="text-sm text-gray-600">Immersive visual experience for better engagement</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                >
                  <span className="text-white font-bold text-xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Multi-Agent</h4>
                <p className="text-sm text-gray-600">Sophisticated architecture for complex workflows</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                >
                  <span className="text-white font-bold text-xl">🚀</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">HR Focused</h4>
                <p className="text-sm text-gray-600">Specifically designed for human resource processes</p>
              </div>
            </div>
          </div>

{/* Right side - Visual element */}
<div className="fade-in-element">
  <div className="relative">
    {/* Main card */}
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 transform hover:scale-105 transition-transform duration-500">
      <div className="text-center">
        <div
          className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg bg-white"
        >
          <img
            src="/favicon.svg"
            alt="Harold Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Meet Harold</h4>
        <p className="text-gray-600 mb-6">Your intelligent 3D HR assistant</p>


                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-2xl font-bold" style={{ color: "var(--color-google-red)" }}>
                        24/7
                      </div>
                      <div className="text-sm text-gray-600">Available</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-2xl font-bold" style={{ color: "var(--color-google-red)" }}>
                        AI
                      </div>
                      <div className="text-sm text-gray-600">Powered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fade-in-element {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
