import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  Facebook,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    fullName: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6)
      return { strength: 25, label: "Weak", color: "bg-red-500" };
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])/.test(password))
      return { strength: 50, label: "Fair", color: "bg-yellow-500" };
    if (!/(?=.*\d)/.test(password))
      return { strength: 75, label: "Good", color: "bg-blue-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin && !formData.username)
      newErrors.username = "Username is required";

    if (!isLogin) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/users/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const endpoint = isLogin
        ? "http://localhost:8000/api/v1/users/login"
        : "http://localhost:8000/api/v1/users/register";

      const loggiinn = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            fullName: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          };

      const res = await axios.post(endpoint, loggiinn, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setMessage(
        res.data.message ||
          (isLogin ? "Login successful!" : "Registered successful!")
      );
      setStatus("success");
      const token = res.data?.data?.accessToken;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      username: "",
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setMessage("");
    setStatus(null);
  };

  const passwordStrength = !isLogin
    ? getPasswordStrength(formData.password)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-black to-[#1a1a1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="bg-[#111111] border border-[#E50914] rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E50914] text-white rounded-full mb-4 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-400">
              {isLogin
                ? "Sign in to your account"
                : "Join us today and get started"}
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 bg-[#1c1c1c] text-white hover:bg-[#E50914] py-3 px-4 rounded-xl transition-all duration-200 shadow">
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
            <div className="flex gap-3">
              <button
                onClick={handleGoogleLogin}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1c1c1c] text-white hover:bg-[#E50914] py-3 px-4 rounded-xl transition-all duration-200 shadow"
              >
                <Chrome className="w-4 h-4" />
                <span className="text-sm">Google</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#1c1c1c] text-white hover:bg-[#E50914] py-3 px-4 rounded-xl transition-all duration-200 shadow">
                <Facebook className="w-4 h-4" />
                <span className="text-sm">Facebook</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#111111] text-gray-500">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                {/* Full Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className={`w-full bg-[#1a1a1a] border ${
                      errors.fullName ? "border-red-500" : "border-gray-700"
                    } text-white placeholder-gray-400 py-4 pl-12 pr-4 rounded-xl focus:outline-none`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-400 text-sm">{errors.fullName}</p>
                )}

                {/* Username */}
                <div className="relative mt-4">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className={`w-full bg-[#1a1a1a] border ${
                      errors.username ? "border-red-300" : "border-gray-700"
                    } text-white placeholder-gray-400 py-4 pl-12 pr-4 rounded-xl focus:outline-none`}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-400 text-sm">{errors.username}</p>
                )}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full bg-[#1a1a1a] border ${
                    errors.email ? "border-red-300" : "border-gray-700"
                  } text-white placeholder-gray-400 py-4 pl-12 pr-4 rounded-xl focus:outline-none`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full bg-[#1a1a1a] border ${
                    errors.password ? "border-red-300" : "border-gray-700"
                  } text-white placeholder-gray-400 py-4 pl-12 pr-12 rounded-xl focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password}</p>
              )}

              {!isLogin && passwordStrength && formData.password && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Password Strength</span>
                    <span
                      className={`${
                        passwordStrength.strength >= 75
                          ? "text-green-400"
                          : passwordStrength.strength >= 50
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`w-full bg-[#1a1a1a] border ${
                      errors.confirmPassword ? "border-red-300" : "border-gray-700"
                    } text-white placeholder-gray-400 py-4 pl-12 pr-12 rounded-xl focus:outline-none`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Remember Me */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#bc0710] bg-[#1a1a1a] border-gray-700 rounded focus:ring-[#E50914]"
                  />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-[#E50914]"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#6d0308] text-white hover:bg-[#f31520] py-4 px-6 rounded-xl font-semibold shadow transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            {message && (
              <div
                className={`mt-4 text-center text-sm font-medium ${
                  status === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          {/* Toggle Auth */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-[#6e070c] hover:text-white font-semibold"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>🔒 Your information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
