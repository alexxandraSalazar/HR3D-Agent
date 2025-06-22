"use client"

import { CheckCircle, MessageSquare, Shield, Zap } from "lucide-react"

export default function WorkFlow() {
  const steps = [
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Sign in with Google",
      description:
        "Authenticate securely using your Google account. No additional passwords or complex registration required.",
      detail: "Our Google OAuth2 integration ensures your data stays secure while providing seamless access.",
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-red-500" />,
      title: "Meet Harold",
      description: "Once authenticated, you'll be connected to Harold, your intelligent assistant ready to help.",
      detail: "Harold understands your needs and can assist with various tasks through natural conversation.",
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "Ask for What You Need",
      description: "Simply tell Harold what you're looking for or what task you need to accomplish.",
      detail: "Whether it's data analysis, document processing, or workflow automation, Harold is here to help.",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      title: "Get Results",
      description: "Harold processes your request and delivers results through our integrated Google ecosystem.",
      detail: "Seamless integration with Google Sheets and other Google services for efficient data handling.",
    },
  ]

  return (
    <section id="how-it-works" className="min-h-screen px-6 py-20 relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: "var(--color-google-green)" }}>
            How it works
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: "var(--color-google-green)" }}></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Get started in minutes with our Google-integrated platform. Simply sign in with your Google account and let
            Harold handle the rest. No complex setup, no learning curve – just results.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up border border-gray-100"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              <p className="text-sm text-gray-500">{step.detail}</p>
            </div>
          ))}
        </div>

        {/* Technology Integration */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 md:p-12 animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Powered by Google Ecosystem</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform is built from the ground up to work seamlessly with Google's suite of tools, ensuring
              reliability, security, and familiar user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-white">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Secure Authentication</h4>
              <p className="text-sm text-gray-600">Google OAuth2 ensures your account stays protected</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-white">
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Google Sheets Integration</h4>
              <p className="text-sm text-gray-600">Direct integration for seamless data management</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-white">
                <CheckCircle className="w-8 h-8 text-yellow-500 " />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Cloud-Powered</h4>
              <p className="text-sm text-gray-600">Built on Google Cloud Platform for reliability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
