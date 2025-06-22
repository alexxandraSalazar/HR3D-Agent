import { Youtube, Linkedin, Github } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="border-t border-gray-200 mx-4" />
      <div className="flex flex-col items-center justify-center py-6 gap-4 px-4 text-center">
        <div className="flex items-center justify-center gap-6">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition-colors"
          >
            <Youtube size={20} className="text-gray-500" />
            <span className="sr-only">YouTube</span>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition-colors"
          >
            <Linkedin size={20} className="text-gray-500" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://github.com/alexxandraSalazar/HR3D-Agent"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition-colors"
          >
            <Github size={20} className="text-gray-500" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
        <p className="text-sm text-gray-600 max-w-xs mx-auto">
          © 2025 Selenyon feat Danny Chávez. All rights reserved.
        </p>
      </div>
      <div className="border-t border-gray-200 mx-4" />
    </footer>
  )
}

export default Footer
