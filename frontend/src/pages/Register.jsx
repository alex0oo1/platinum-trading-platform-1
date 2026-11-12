
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  Globe2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import "../styles/Auth.css";

const countries = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Zambia",
  "Botswana",
  "Cameroon",
  "Senegal",
  "Côte d'Ivoire",
  "Other",
];

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setNotice("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.country) {
      nextErrors.country = "Select your country.";
    }

    if (form.password.length < 12) {
      nextErrors.password =
        "Your password must contain at least 12 characters.";
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword =
        "Your passwords do not match.";
    }

    if (!form.acceptTerms) {
      nextErrors.acceptTerms =
        "You must accept the terms before continuing.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setNotice(
      "Registration is not available yet. Your details have not been submitted or saved."
    );
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
              YOUR TRADING JOURNEY
            </div>

            <h1>
              The next level
              <br />
              of trading
              <br />
              <span>starts here.</span>
            </h1>

            <p>
              Discover a refined platform experience
              designed for market exploration, trading
              tools, and financial intelligence.
            </p>

            <div className="auth-brand-features">
              <div>
                <ShieldCheck size={19} />
                <span>Security-focused development</span>
              </div>

              <div>
                <TrendingUp size={19} />
                <span>Advanced market intelligence</span>
              </div>

              <div>
                <LockKeyhole size={19} />
                <span>Personal trading workspace</span>
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
                CREATE YOUR ACCOUNT
              </div>

              <h2>Join PLATINUM.</h2>

              <p>
                Create your account to begin your
                PLATINUM experience.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="auth-field">
                <label htmlFor="register-name">
                  Full name
                </label>

                <div className="auth-input-wrap">
                  <UserRound size={18} />

                  <input
                    id="register-name"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.fullName)}
                  />
                </div>

                {errors.fullName && (
                  <span className="auth-error">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="register-email">
                  Email address
                </label>

                <div className="auth-input-wrap">
                  <Mail size={18} />

                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                  />
                </div>

                {errors.email && (
                  <span className="auth-error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="register-country">
                  Country of residence
                </label>

                <div className="auth-input-wrap">
                  <Globe2 size={18} />

                  <select
                    id="register-country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.country)}
                    className="auth-select"
                  >
                    <option value="">
                      Select your country
                    </option>

                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {errors.country && (
                  <span className="auth-error">
                    {errors.country}
                  </span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="register-password">
                  Password
                </label>

                <div className="auth-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 12 characters"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.password)}
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <span className="auth-error">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="register-confirm">
                  Confirm password
                </label>

                <div className="auth-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    id="register-confirm"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    aria-invalid={
                      Boolean(errors.confirmPassword)
                    }
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirmation password"
                        : "Show confirmation password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <span className="auth-error">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <div className="auth-terms">
                <label>
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={form.acceptTerms}
                    onChange={handleChange}
                  />

                  <span>
                    I understand this platform is under
                    development and agree to review its
                    terms and privacy information when
                    available.
                  </span>
                </label>

                {errors.acceptTerms && (
                  <span className="auth-error">
                    {errors.acceptTerms}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="auth-submit-button"
              >
                Create PLATINUM account
                <ArrowRight size={19} />
              </button>

              {notice && (
                <div
                  className="auth-development-notice"
                  role="status"
                >
                  {notice}
                </div>
              )}

              <div className="auth-development-notice">
                Account registration is not connected yet.
              </div>
            </form>

            <div className="auth-switch">
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </div>

            <div className="auth-security-note">
              <ShieldCheck size={16} />
              Secure account creation is being prepared.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
