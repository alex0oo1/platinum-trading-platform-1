
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import "../styles/Auth.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Please enter your password.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

  }

  return (
    <main className="auth-page">
      <div className="auth-layout">
        <section className="auth-brand-panel">
          <Link to="/" className="auth-logo">
            <span className="auth-logo-mark">P</span>
            <span className="auth-logo-name">PLATINUM</span>
          </Link>

          <div className="auth-brand-content">
            <div className="auth-eyebrow">
              <TrendingUp size={16} />
              THE PLATINUM EXPERIENCE
            </div>

            <h1>
              Your markets.
              <br />
              Your ambition.
              <br />
              <span>One platform.</span>
            </h1>

            <p>
              A refined trading workspace designed to bring
              powerful tools, market intelligence, and a
              seamless experience together.
            </p>

            <div className="auth-brand-features">
              <div>
                <ShieldCheck size={19} />
                <span>Security-first design</span>
              </div>

              <div>
                <TrendingUp size={19} />
                <span>Advanced market tools</span>
              </div>

              <div>
                <LockKeyhole size={19} />
                <span>Private account experience</span>
              </div>
            </div>
          </div>

          <div className="auth-brand-footer">
            PLATINUM · PLATFORM IN DEVELOPMENT
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-wrapper">
            <Link to="/" className="auth-back-link">
              ← Back to homepage
            </Link>

            <div className="auth-form-header">
              <div className="auth-form-eyebrow">
                MEMBER ACCESS
              </div>

              <h2>Welcome back.</h2>

              <p>
                Enter your details to access your PLATINUM
                trading workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="auth-field">
                <label htmlFor="login-email">
                  Email address
                </label>

                <div className="auth-input-wrap">
                  <Mail size={18} />

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? "login-email-error"
                        : undefined
                    }
                  />
                </div>

                {errors.email && (
                  <span
                    className="auth-error"
                    id="login-email-error"
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="login-password">
                    Password
                  </label>

                  <span className="auth-forgot-link">
                    Recovery coming soon
                  </span>
                </div>

                <div className="auth-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password
                        ? "login-password-error"
                        : undefined
                    }
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <span
                    className="auth-error"
                    id="login-password-error"
                  >
                    {errors.password}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="auth-submit-button"
              >
                Sign in to PLATINUM
                <ArrowRight size={19} />
              </button>

              <div className="auth-development-notice">
                Authentication is not connected yet.

              </div>
            </form>

            <div className="auth-switch">
              New to PLATINUM?{" "}
              <Link to="/register">Create an account</Link>
            </div>

            <div className="auth-security-note">
              <ShieldCheck size={16} />
              Secure authentication is being prepared.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
