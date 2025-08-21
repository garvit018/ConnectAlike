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

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    console.log(isLogin ? "Login successful" : "Signup successful", formData);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", confirmPassword: "", fullName: "" });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const passwordStrength = !isLogin
    ? getPasswordStrength(formData.password)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-300">
              {isLogin
                ? "Sign in to your account"
                : "Join us today and get started"}
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 bg-black text-white hover:bg-gray-700 py-3 px-4 rounded-xl transition-all duration-200 shadow">
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-700 py-3 px-4 rounded-xl transition-all duration-200 shadow">
                <Chrome className="w-4 h-4" />
                <span className="text-sm">Google</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 py-3 px-4 rounded-xl transition-all duration-200 shadow">
                <Facebook className="w-4 h-4" />
                <span className="text-sm">Facebook</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className={`w-full bg-white/10 border ${errors.fullName ? "border-red-500" : "border-white/20"} text-white placeholder-gray-400 py-4 pl-12 pr-4 rounded-xl focus:outline-none`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-400 text-sm">{errors.fullName}</p>
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
                  className={`w-full bg-white/10 border ${errors.email ? "border-red-500" : "border-white/20"} text-white placeholder-gray-400 py-4 pl-12 pr-4 rounded-xl focus:outline-none`}
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
                  className={`w-full bg-white/10 border ${errors.password ? "border-red-500" : "border-white/20"} text-white placeholder-gray-400 py-4 pl-12 pr-12 rounded-xl focus:outline-none`}
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
                      className={`${passwordStrength.strength >= 75 ? "text-green-400" : passwordStrength.strength >= 50 ? "text-yellow-400" : "text-red-400"}`}
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
                    className={`w-full bg-white/10 border ${errors.confirmPassword ? "border-red-500" : "border-white/20"} text-white placeholder-gray-400 py-4 pl-12 pr-12 rounded-xl focus:outline-none`}
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
                    className="w-4 h-4 text-black bg-white/10 border-white/20 rounded focus:ring-black"
                  />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white hover:bg-gray-800 py-4 px-6 rounded-xl font-semibold shadow transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
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
          </form>

          {/* Toggle Auth */}
          <div className="text-center mt-6">
            <p className="text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-white bg-black px-3 py-1 rounded-lg shadow hover:bg-gray-700 font-semibold"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>🔒 Your information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Login;