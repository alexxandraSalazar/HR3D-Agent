import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setHasScrolled(scrollPosition > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll("a[href^='#']")
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")?.substring(1)
        setActiveSection(targetId || "home")
        const targetElement = document.getElementById(targetId || "")
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          })
        }
        setIsMenuOpen(false)
      })
    })
  }, [])

  useEffect(() => {
    const handleSectionVisibility = () => {
      const sections = ["home", "about", "features", "how-it-works", "team"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop - 100
          const bottom = top + element.offsetHeight
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleSectionVisibility)
    return () => window.removeEventListener("scroll", handleSectionVisibility)
  }, [])
  
const navigationItems = [
  { id: "home", label: "Home", color: "var(--color-google-blue)" },
  { id: "about", label: "About", color: "var(--color-google-red)" },
  { id: "features", label: "Features", color: "var(--color-google-yellow)" },
  { id: "how-it-works", label: "How It Works", color: "var(--color-google-green)" },
  { id: "team", label: "Team", color: "var(--color-google-yellow)" }, // ← actualizado
]


  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    const targetElement = document.getElementById(sectionId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`w-full py-2 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"
      }`}
      style={{ fontFamily: 'var(--font-sans, "Open Sans", sans-serif)' }}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/favicon.svg" alt="Logo" className="w-full h-full" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold">
              <span style={{ color: "#4285F4" }}>H</span>
              <span style={{ color: "#EA4335" }}>R</span>
              <span style={{ color: "#FBBC05" }}>3</span>
              <span style={{ color: "#34A853" }}>D</span>
              <span style={{ color: "#5F6368" }}> Agent</span>
            </h1>
            <p className="text-xs text-gray-600">Powered by Harold</p>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="bg-gray-100 rounded-full px-6 py-2 flex items-center space-x-4">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-medium px-4 py-1 rounded-full transition-colors duration-300 text-sm ${
                activeSection === item.id ? "text-white" : "text-gray-700 hover:text-black"
              }`}
              style={{
                backgroundColor: activeSection === item.id ? item.color : "transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Login Button */}
      <div className="hidden md:block">
        <button
          className="text-white font-medium rounded-full px-6 py-2 flex items-center transition-colors duration-300 hover:opacity-90"
          style={{ backgroundColor: "var(--color-google-blue)" }}
        >
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 lg:hidden z-10">
          <div className="flex flex-col space-y-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-medium px-4 py-2 rounded-full text-center transition-colors duration-300 ${
                  activeSection === item.id ? "text-white" : "text-gray-700 hover:text-black"
                }`}
                style={{
                  backgroundColor: activeSection === item.id ? item.color : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              className="text-white font-medium rounded-full px-6 py-2 mt-2 transition-colors duration-300 hover:opacity-90"
              style={{ backgroundColor: "var(--color-google-blue)" }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
