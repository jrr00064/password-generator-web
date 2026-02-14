import { useState, useEffect } from 'react';
import { Toggle } from './Toggle';
import { StrengthBar } from './StrengthBar';
import { CopyButton } from './CopyButton';
import type { PasswordOptions, StrengthLevel } from '../hooks/usePasswordGenerator';

interface PasswordCardProps {
  password: string;
  history: string[];
  isGenerating: boolean;
  options: PasswordOptions;
  strength: StrengthLevel;
  isValid: boolean;
  onGenerate: () => void;
  onUpdateOption: <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => void;
  onCopy: (text: string) => Promise<boolean>;
}

export function PasswordCard({
  password,
  history,
  isGenerating,
  options,
  strength,
  isValid,
  onGenerate,
  onUpdateOption,
  onCopy,
}: PasswordCardProps) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isGenerating) {
      setAnimating(true);
    } else if (password) {
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, password]);

  const handleGenerate = () => {
    if (isValid) {
      onGenerate();
    }
  };

  return (
    <div className="password-card">
      <h1 className="app-title">Password Generator</h1>

      <div className="password-display-container">
        <span className={`password-text ${animating ? 'animating' : ''}`}>
          {password || 'Click generate to create password'}
        </span>
        {password && (
          <CopyButton onCopy={() => onCopy(password)} />
        )}
      </div>

      <button
        className={`generate-button ${isGenerating ? 'generating' : ''}`}
        onClick={handleGenerate}
        disabled={!isValid || isGenerating}
      >
        <svg className="generate-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {isGenerating ? 'Generating...' : 'Generate Password'}
      </button>

      {!isValid && (
        <div className="warning-message">
          Please select at least one character type
        </div>
      )}

      <div className="options-section">
        <div className="options-header">
          <span className="options-title">Options</span>
          <span className="length-value">{options.length} chars</span>
        </div>

        <div className="length-slider-container">
          <input
            type="range"
            min="8"
            max="64"
            value={options.length}
            onChange={(e) => onUpdateOption('length', parseInt(e.target.value, 10))}
            className="length-slider"
          />
        </div>

        <div className="toggles-grid">
          <Toggle
            label="Uppercase (A-Z)"
            checked={options.includeUppercase}
            onChange={(checked) => onUpdateOption('includeUppercase', checked)}
          />
          <Toggle
            label="Lowercase (a-z)"
            checked={options.includeLowercase}
            onChange={(checked) => onUpdateOption('includeLowercase', checked)}
          />
          <Toggle
            label="Numbers (0-9)"
            checked={options.includeNumbers}
            onChange={(checked) => onUpdateOption('includeNumbers', checked)}
          />
          <Toggle
            label="Symbols (!@#$%)"
            checked={options.includeSymbols}
            onChange={(checked) => onUpdateOption('includeSymbols', checked)}
          />
        </div>
      </div>

      {password && <StrengthBar strength={strength} />}

      {history.length > 0 && (
        <div className="history-section">
          <h2 className="history-title">Recent Passwords</h2>
          <div className="history-list">
            {history.map((pwd, index) => (
              <div key={`${pwd}-${index}`} className="history-item">
                <span className="history-password">{pwd}</span>
                <CopyButton onCopy={() => onCopy(pwd)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
