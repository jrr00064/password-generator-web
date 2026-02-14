import { PasswordCard } from './components/PasswordCard';
import { usePasswordGenerator } from './hooks/usePasswordGenerator';

function App() {
  const {
    password,
    history,
    isGenerating,
    options,
    strength,
    isValid,
    generatePassword,
    updateOption,
    copyToClipboard,
  } = usePasswordGenerator();

  return (
    <>
      <div className="background-gradient" />
      <div className="background-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="app-container">
        <PasswordCard
          password={password}
          history={history}
          isGenerating={isGenerating}
          options={options}
          strength={strength}
          isValid={isValid}
          onGenerate={generatePassword}
          onUpdateOption={updateOption}
          onCopy={copyToClipboard}
        />
      </div>
    </>
  );
}

export default App;
