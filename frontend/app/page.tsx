"use client";

import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [length, setLength] = useState(16);

  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function generatePassword() {
    setLoading(true);
    setCopied(false);
    setError("");

    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          length,
          use_upper: useUpper,
          use_lower: useLower,
          use_digits: useDigits,
          use_symbols: useSymbols,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to generate password."
        );
      }

      setPassword(data.password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function copyPassword() {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy password.");
    }
  }

  function toggleOption(
    currentValue: boolean,
    setter: (value: boolean) => void
  ) {
    if (currentValue) {
      const selectedCount = [
        useUpper,
        useLower,
        useDigits,
        useSymbols,
      ].filter(Boolean).length;

      if (selectedCount === 1) {
        setError("At least one character type must be selected.");
        return;
      }
    }

    setError("");
    setter(!currentValue);
  }

  function calculateStrength() {
    let characterPool = 0;

    if (useUpper) characterPool += 26;
    if (useLower) characterPool += 26;
    if (useDigits) characterPool += 10;
    if (useSymbols) characterPool += 32;

    if (characterPool === 0) {
      return {
        label: "Weak",
        level: 1,
      };
    }

    const entropy = length * Math.log2(characterPool);

    if (entropy < 40) {
      return {
        label: "Weak",
        level: 1,
      };
    }

    if (entropy < 60) {
      return {
        label: "Fair",
        level: 2,
      };
    }

    if (entropy < 80) {
      return {
        label: "Strong",
        level: 3,
      };
    }

    return {
      label: "Very Strong",
      level: 4,
    };
  }

  const strength = calculateStrength();

  return (
    <main className="page">
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      <section className="app-card">

        {/* HEADER */}

        <div className="header">
          <div className="brand">
            <div className="brand-icon">✦</div>
            <span>SECUREGEN</span>
          </div>

          <div className="status">
            <span className="status-dot" />
            Secure
          </div>
        </div>


        {/* HERO */}

        <div className="hero">
          <p className="eyebrow">
            PASSWORD GENERATOR
          </p>

          <h1>
            Generate something
            <br />
            <span>hard to guess.</span>
          </h1>

          <p className="hero-description">
            Create strong, random passwords tailored to
            your security requirements.
          </p>
        </div>


        {/* PASSWORD */}

        <div className="password-section">

          {error && (
            <div className="error-message">
              ⚠ {error}
            </div>
          )}

          <div className="password-box">

            <div
              className="password-display"
              title={password}
            >
              {password || "Your password will appear here"}
            </div>

            <div className="password-actions">

              {password && (
                <button
                  className="icon-button"
                  onClick={generatePassword}
                  aria-label="Generate another password"
                  title="Generate another password"
                >
                  ↻
                </button>
              )}

              <button
                className="copy-button"
                onClick={copyPassword}
                disabled={!password}
              >
                {copied ? "✓ COPIED" : "COPY"}
              </button>

            </div>

          </div>


          {/* STRENGTH */}

          {password && (
            <div className="strength">

              <div className="strength-info">

                <span>
                  Estimated strength
                </span>

                <strong>
                  {strength.label}
                </strong>

              </div>

              <div className="strength-bars">

                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`strength-bar ${
                      strength.level >= bar
                        ? "active"
                        : ""
                    }`}
                  />
                ))}

              </div>

            </div>
          )}

        </div>


        {/* SETTINGS */}

        <div className="settings">

          <div className="setting-header">

            <span>
              PASSWORD LENGTH
            </span>

            <div className="length-value">
              {length}
            </div>

          </div>


          <input
            className="length-slider"
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => {
              setLength(Number(e.target.value));
              setError("");
            }}
            aria-label="Password length"
          />


          <div className="character-header">
            CHARACTER SET
          </div>


          <div className="options">

            <CharacterOption
              label="Uppercase"
              description="A — Z"
              checked={useUpper}
              onChange={() =>
                toggleOption(useUpper, setUseUpper)
              }
            />

            <CharacterOption
              label="Lowercase"
              description="a — z"
              checked={useLower}
              onChange={() =>
                toggleOption(useLower, setUseLower)
              }
            />

            <CharacterOption
              label="Numbers"
              description="0 — 9"
              checked={useDigits}
              onChange={() =>
                toggleOption(useDigits, setUseDigits)
              }
            />

            <CharacterOption
              label="Symbols"
              description="! @ # $"
              checked={useSymbols}
              onChange={() =>
                toggleOption(useSymbols, setUseSymbols)
              }
            />

          </div>

        </div>


        {/* GENERATE */}

        <button
          className="generate-button"
          onClick={generatePassword}
          disabled={loading}
        >

          <span>
            {loading
              ? "GENERATING..."
              : password
              ? "GENERATE NEW PASSWORD"
              : "GENERATE PASSWORD"}
          </span>

          {!loading && (
            <span className="arrow">
              →
            </span>
          )}

        </button>


        {/* FOOTER */}

        <div className="footer">

          <span>
            🔒 Generated through your secure API
          </span>

          <span>
            No passwords stored
          </span>

        </div>

      </section>
    </main>
  );
}


function CharacterOption({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      className={`character-option ${
        checked ? "selected" : ""
      }`}
      onClick={onChange}
      aria-pressed={checked}
    >

      <div className="option-left">

        <div
          className={`checkbox ${
            checked ? "checked" : ""
          }`}
        >
          {checked && "✓"}
        </div>

        <div>

          <div className="option-label">
            {label}
          </div>

          <div className="option-description">
            {description}
          </div>

        </div>

      </div>

    </button>
  );
}