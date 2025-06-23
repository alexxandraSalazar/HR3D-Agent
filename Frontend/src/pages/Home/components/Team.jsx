"use client"

import { useEffect, useRef } from "react"

export default function Team() {
  const sectionRef = useRef(null)

  const teamMembers = [
    {
      firstName: "Alexandra",
      lastName: "Salazar",
      role: "Frontend Dev | UI/UX Designer",
      color: "var(--color-google-yellow)", 
      svgCode: `<img src="/Alexandra.svg" alt="Alexandra" />`,
    },
    {
      firstName: "Alexa",
      lastName: "Reynosa",
      role: "Backend Dev",
      color: "var(--color-google-red)", 
      svgCode: `<img src="/Alexa.svg" alt="Alexa" />`,
    },
    {
      firstName: "Danny",
      lastName: "Chávez",
      role: "Developer",
      color: "var(--color-google-blue)", 
      svgCode: `<img src="/danny.webp" alt="Danny" />`,
    },
    {
      firstName: "Adilia",
      lastName: "Moreno",
      role: "Backend Dev",
      color: "var(--color-google-green)", 
      svgCode: `<img src="/Adilia.svg" alt="Adilia" />`,
    },
  ]

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
    <section
      id="team"
      ref={sectionRef}
      className="min-h-screen  px-6 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-white)", fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-in-element">
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: "var(--color-google-green)" }}
          >
            Our Team
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: "var(--color-google-green)" }}
          ></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Meet the talented individuals behind HR3D Agent
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="fade-in-element bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-center">
                <div
                  className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: member.svgCode }}
                />

                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {member.firstName}{" "}
                  <span className="block sm:inline">{member.lastName}</span>
                </h3>
                <div
                  className="w-12 h-1 mx-auto my-3 rounded-full"
                  style={{ backgroundColor: member.color }}
                ></div>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
