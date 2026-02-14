import type { StrengthLevel } from '../hooks/usePasswordGenerator';

interface StrengthBarProps {
  strength: StrengthLevel;
}

const strengthOrder: StrengthLevel[] = ['weak', 'fair', 'good', 'strong'];

export function StrengthBar({ strength }: StrengthBarProps) {
  const activeIndex = strengthOrder.indexOf(strength);

  return (
    <div className="strength-section">
      <div className="strength-header">
        <span className="strength-label">Password Strength</span>
        <span className={`strength-text ${strength}`}>{strength}</span>
      </div>
      <div className="strength-bar">
        {strengthOrder.map((level, index) => (
          <div
            key={level}
            className={`strength-segment ${index <= activeIndex ? `active ${strength}` : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
