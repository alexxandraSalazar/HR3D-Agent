"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { GOOGLE_ACCESS_TOKEN } from "../token"
import { Loader2 } from "lucide-react"

function RedirectGoogleAuth() {
  const navigate = useNavigate()
  const [status, setStatus] = useState("Initializing...")
  const [error, setError] = useState(null)

  useEffect(() => {
    const processAuthentication = async () => {
      try {
        setStatus("Processing authentication...")
        console.log("RedirectHandler mounted successfully")

        const queryParams = new URLSearchParams(window.location.search)
        const accessToken = queryParams.get("access_token")
        console.log("QueryParams: ", window.location.search)

        if (accessToken) {
          setStatus("Access token received...")
          console.log("AccessToken found: ", accessToken)
          localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken)

          setStatus("Verifying token...")
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

          try {
            const response = await axios.get("http://localhost:8000/api/auth/user/")
            console.log("User data:", response.data)
            setStatus("Authentication successful! Redirecting...")

            setTimeout(() => {
              navigate("/")
            }, 1000)
          } catch (error) {
            console.error("Error verifying token:", error.response ? error.response.data : error.message)
            setError("Failed to verify authentication. Please try again.")

            setTimeout(() => {
              navigate("/login")
            }, 2000)
          }
        } else {
          console.log("No token found in URL")
          setError("No authentication token found. Please try again.")

          setTimeout(() => {
            navigate("/login")
          }, 2000)
        }
      } catch (err) {
        console.error("Unexpected error during authentication:", err)
        setError("An unexpected error occurred. Please try again.")

        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }
    }

    processAuthentication()
  }, [navigate])

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md p-8 rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center justify-center mb-2">
            <svg width="75" height="24" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path
                  d="M31.64 23.205c0-.639-.057-1.252-.164-1.841H23.4v3.481h4.644a3.983 3.983 0 0 1-1.718 2.605v2.167h2.784c1.629-1.5 2.53-3.722 2.53-6.412Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4 24c2.319 0 4.264-.768 5.688-2.065l-2.784-2.167c-.769.516-1.75.821-2.904.821-2.233 0-4.125-1.5-4.802-3.517h-2.879v2.24A8.997 8.997 0 0 0 23.4 24Z"
                  fill="#34A853"
                />
                <path
                  d="M18.598 17.072a5.501 5.501 0 0 1-.286-1.732c0-.593.104-1.17.286-1.732v-2.24h-2.879a8.996 8.996 0 0 0 0 8.944l2.879-2.24Z"
                  fill="#FBBC04"
                />
                <path
                  d="M23.4 15.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C27.741 12.802 25.796 12 23.4 12a8.997 8.997 0 0 0-7.681 4.296l2.879 2.24c.677-2.017 2.569-3.517 4.802-3.517Z"
                  fill="#EA4335"
                />
              </g>
            </svg>
          </div>

          {error ? (
            <div className="text-center">
              <div className="text-red-600 text-lg font-medium mb-2">Authentication Error</div>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 text-[color:var(--color-google-blue)] animate-spin mb-4" />
                <h2 className="text-xl font-medium text-gray-900 mb-2">Google Authentication</h2>
                <p className="text-gray-600 text-center">{status}</p>
              </div>

              <div className="flex space-x-2 mt-2">
                <div
                  className="h-2 w-2 bg-[color:var(--color-google-blue)] rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-[color:var(--color-google-red)] rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-[color:var(--color-google-yellow)] rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-[color:var(--color-google-green)] rounded-full animate-bounce"
                  style={{ animationDelay: "450ms" }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default RedirectGoogleAuth
