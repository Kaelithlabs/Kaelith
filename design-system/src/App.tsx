import React from 'react';
import { Button, Badge, Header } from './components';

export const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1>Core Components</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="tertiary">Tertiary Button</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Badge variant="default">Default Badge</Badge>
          <Badge variant="accent">Accent Badge</Badge>
        </div>
      </div>
    </div>
  );
};

export default App;
