"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, Float, useGLTF } from "@react-three/drei"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative">
        {/* Spinning circle with Google colors */}
        <div className="w-16 h-16 relative">
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
            style={{
              borderTopColor: "#4285F4",
              borderRightColor: "#EA4335",
              borderBottomColor: "#FBBC05",
              borderLeftColor: "#34A853",
              animationDuration: "1s",
            }}
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent animate-spin"
            style={{
              borderTopColor: "#4285F4",
              animationDuration: "1.5s",
              animationDirection: "reverse",
            }}
          />
        </div>
        <p className="mt-4 text-sm font-medium text-gray-600 text-center">Loading Harold...</p>
      </div>
    </div>
  )
}

function HaroldModel() {
  const gltf = useGLTF("/harold.glb")

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8} floatingRange={[0, 0.5]}>
      <primitive object={gltf.scene} scale={2.0} position={[0, -1, 0]} />
    </Float>
  )
}

export default function Hero() {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
      {/* Plain white background */}
      <div className="absolute inset-0 bg-white" />

      {/* Decorative elements */}

      <div className="container mx-auto px-6 pt-10 pb-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {!showIframe ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-5xl lg:text-6xl font-bold" style={{ fontFamily: "var(--font-sans)" }}>
                      <span style={{ color: "#4285F4" }}>H</span>
                      <span style={{ color: "#EA4335" }}>R</span>
                      <span style={{ color: "#FBBC05" }}>3</span>
                      <span style={{ color: "#34A853" }}>D</span>
                      <span style={{ color: "#5F6368" }}> Agent</span>
                    </h1>
                  </div>

                  <p className="text-xl lg:text-2xl text-gray-600 font-medium">
                    The intelligent 3D assistant for human resource automation.
                  </p>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Meet Harold, a smart virtual assistant designed to revolutionize human resource management through the
                  automation of complex workflows.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="px-6 py-3 rounded-full text-white font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: "var(--color-google-blue)" }}
                      onClick={() => setShowIframe(true)}
                    >
                      Get Started Free
                    </button>




                  <button
                    className="px-6 py-3 rounded-full font-semibold text-base border-2 transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: "var(--color-google-green)",
                      color: "var(--color-google-green)",
                    }}
                  >
                    Watch Demo
                  </button>
                </div>
              </>
            ) : (
              <iframe
                src="http://localhost:8000"
                width="100%"
                height="500"
                allow="microphone"
                loading="lazy"
                title="Get Started"
              ></iframe>
            )}
          </div>



          {/* Right Content - 3D Harold GLB */}
          <div className="relative h-[600px] lg:h-[700px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />

                <Suspense fallback={null}>
                  <HaroldModel />
                </Suspense>

                <Environment preset="city" />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={1}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 3}
                />
              </Canvas>

              {/* Loading overlay */}
              <Suspense fallback={<LoadingSpinner />}>
                <HaroldModelLoader />
              </Suspense>
            </div>

            {/* 3D Scene Info */}
            <div className="absolute bottom-40 left-52 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <p className="text-sm font-medium text-gray-800">👆 Interact with Harold!</p>
              <p className="text-xs text-gray-600">Drag to rotate • Auto-rotating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Component to handle loading state
function HaroldModelLoader() {
  useGLTF("/harold.glb") // This will trigger Suspense
  return null
}

// Preload the model
useGLTF.preload("/harold.glb")
