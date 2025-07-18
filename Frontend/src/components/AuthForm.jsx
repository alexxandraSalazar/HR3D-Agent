"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AuthForm({ method }) {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/accounts/google/login/"
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {method === "register" ? "Create an Account" : "Welcome Back"}
          </h2>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{error}</div>}

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium py-3 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 shadow-sm"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              {method === "register" ? "Sign up with Google" : "Continue with Google"}
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            {method === "login" ? (
              <p className="text-gray-600">
                Don't have an account?{" "}
                <span
                  className="text-[color:var(--color-google-blue)] cursor-pointer font-medium hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-[color:var(--color-google-blue)] cursor-pointer font-medium hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
