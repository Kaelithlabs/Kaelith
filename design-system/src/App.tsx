import React, { useState, useEffect } from 'react';
import { Showcase } from './showcase';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'theme-a' | 'theme-b'>('theme-a');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-app)', color: 'var(--color-text-primary)' }}>
      <Showcase theme={theme} onThemeChange={setTheme} />
    </div>
  );
};

export default App;
