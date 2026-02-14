import { useState, useCallback, useMemo } from 'react';

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong';

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export function usePasswordGenerator() {
  const [password, setPassword] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const activeCharSets = useMemo(() => {
    const sets: string[] = [];
    if (options.includeUppercase) sets.push(CHAR_SETS.uppercase);
    if (options.includeLowercase) sets.push(CHAR_SETS.lowercase);
    if (options.includeNumbers) sets.push(CHAR_SETS.numbers);
    if (options.includeSymbols) sets.push(CHAR_SETS.symbols);
    return sets;
  }, [options]);

  const poolSize = useMemo(() => {
    return activeCharSets.join('').length;
  }, [activeCharSets]);

  const isValid = useMemo(() => {
    return activeCharSets.length > 0;
  }, [activeCharSets]);

  const entropy = useMemo(() => {
    if (poolSize === 0 || options.length === 0) return 0;
    return Math.log2(Math.pow(poolSize, options.length));
  }, [poolSize, options.length]);

  const strength: StrengthLevel = useMemo(() => {
    if (entropy < 40) return 'weak';
    if (entropy < 60) return 'fair';
    if (entropy < 80) return 'good';
    return 'strong';
  }, [entropy]);

  const generatePassword = useCallback(() => {
    if (!isValid) return;

    setIsGenerating(true);

    setTimeout(() => {
      const charset = activeCharSets.join('');
      const array = new Uint32Array(options.length);
      crypto.getRandomValues(array);

      let result = '';
      for (let i = 0; i < options.length; i++) {
        result += charset[array[i] % charset.length];
      }

      setPassword(result);
      setHistory((prev) => {
        const newHistory = [result, ...prev].slice(0, 5);
        return newHistory;
      });
      setIsGenerating(false);
    }, 150);
  }, [isValid, activeCharSets, options.length]);

  const updateOption = useCallback(<K extends keyof PasswordOptions>(
    key: K,
    value: PasswordOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    password,
    history,
    isGenerating,
    options,
    strength,
    entropy,
    isValid,
    generatePassword,
    updateOption,
    copyToClipboard,
  };
}
