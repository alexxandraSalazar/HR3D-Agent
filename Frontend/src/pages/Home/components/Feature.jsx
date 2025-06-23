"use client";

import { useState, useEffect, useRef } from "react";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);

  const features = [
    {
      title: "Automatic Schedule Generation",
      description:
        "Harold automates employee scheduling, saving time and reducing conflicts.",
      icon: "📅",
      color: "var(--color-google-blue)",
    },
    {
      title: "Team Coordination",
      description:
        "Coordinates tasks and responsibilities across HR teams with intelligent delegation.",
      icon: "👥",
      color: "var(--color-google-red)",
    },
    {
      title: "Software Development Lifecycle (SDLC) Management",
      description:
        "Assists in managing the software development lifecycle by tracking progress and assigning roles.",
      icon: "⚙️",
      color: "var(--color-google-yellow)",
    },
    {
      title: "Interactive 3D Avatar",
      description:
        "Provides a unique, human-like interface to interact with, making operations intuitive and engaging.",
      icon: "🤖",
      color: "var(--color-google-green)",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-in-element");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 fade-in-element">
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: "var(--color-google-yellow)" }}
          >
            Features
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: "var(--color-google-yellow)" }}
          ></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Discover the powerful capabilities that make Harold your ultimate
            HR assistant
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`fade-in-element bg-white rounded-2xl p-8 shadow-lg border border-gray-200 cursor-pointer transition-all duration-500 hover:shadow-xl ${activeFeature === index ? "ring-2 ring-opacity-50" : ""
                }`}
              style={{
                transform:
                  activeFeature === index ? "scale(1.02)" : "scale(1)",
                boxShadow:
                  activeFeature === index
                    ? `0 0 0 4px ${feature.color}40`
                    : undefined,
              }}
              onClick={() => setActiveFeature(index)}
            >
              <div className="flex items-start space-x-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor:
                      activeFeature === index ? feature.color : "#f3f4f6",
                  }}
                >
                  <span
                    className={`text-2xl ${activeFeature === index ? "animate-bounce" : ""
                      }`}
                  >
                    {feature.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Progress indicator */}
              {activeFeature === index && (
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="h-1 rounded-full animate-progress"
                      style={{
                        backgroundColor: feature.color,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
