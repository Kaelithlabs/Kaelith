import React, { useState } from 'react';
import {
  Header,
  Button,
  Badge,
  Input,
  Switch,
  Checkbox,
  Card,
  Carousel,
  CarouselItem,
  Alert,
  Spinner,
  Skeleton,
} from '../components';
import { Heading, Text, Inline } from '../primitives';
import styles from './Showcase.module.css';

export interface ShowcaseProps {
  theme?: 'theme-a' | 'theme-b';
  onThemeChange?: (theme: 'theme-a' | 'theme-b') => void;
}

const THEME_A_SWATCHES = [
  { hex: '#000000', label: 'App Background' },
  { hex: '#2A2A2A', label: 'Surface Muted' },
  { hex: '#6E6E6E', label: 'Border Strong' },
  { hex: '#A0A0A0', label: 'Text Secondary' },
  { hex: '#FFFFFF', label: 'Text Primary' },
];

const THEME_B_SWATCHES = [
  { hex: '#EAF6FF', label: 'Surface Muted' },
  { hex: '#9BD4F5', label: 'Border Strong' },
  { hex: '#4FA8E0', label: 'Accent Primary' },
  { hex: '#1C6FA6', label: 'Badge Text' },
  { hex: '#1C2B36', label: 'Text Primary' },
  { hex: '#5B6B75', label: 'Text Secondary' },
];

const CAROUSEL_ITEMS: CarouselItem[] = [
  { id: 'spm', title: 'SPM', subtitle: 'Web Modernization' },
  { id: 'gatebridge', title: 'GateBridge', subtitle: 'Reverse Proxy' },
  { id: 'kuro', title: 'Kuro', subtitle: 'Modular Console' },
  { id: 'bitcast', title: 'Bitcast', subtitle: 'Under Definition' },
];

export const Showcase: React.FC<ShowcaseProps> = ({
  theme = 'theme-a',
  onThemeChange,
}) => {
  const [name, setName] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const activeSwatches =
    theme === 'theme-a' ? THEME_A_SWATCHES : THEME_B_SWATCHES;

  return (
    <div className={styles.container}>
      <header className={styles.toolbar}>
        <span className={styles.toolbarTitle}>Theme Switcher</span>
        <div className={styles.toolbarControls}>
          <Button
            variant={theme === 'theme-a' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onThemeChange?.('theme-a')}
          >
            Theme A
          </Button>
          <Button
            variant={theme === 'theme-b' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onThemeChange?.('theme-b')}
          >
            Theme B
          </Button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.headerWrapper}>
          <Header
            brandTitle="Kaelith"
            navItems={[
              { label: 'Products', href: '#products' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' },
            ]}
            actionLabel="Contact Us"
          />
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>TYPOGRAPHY</h2>
          <div className={styles.typographyList}>
            <div className={styles.typographyItem}>
              <span className={styles.typographyMeta}>Display (34 / 700)</span>
              <Heading as="h1" variant="display">
                Kaelith
              </Heading>
            </div>
            <div className={styles.typographyItem}>
              <span className={styles.typographyMeta}>Heading (20 / 600)</span>
              <Heading as="h2" variant="heading">
                Building with control
              </Heading>
            </div>
            <div className={styles.typographyItem}>
              <span className={styles.typographyMeta}>Body (14 / 500)</span>
              <Text variant="body">Body text for paragraphs and descriptions.</Text>
            </div>
            <div className={styles.typographyItem}>
              <span className={styles.typographyMeta}>Caption (12 / 500)</span>
              <Text variant="caption">Caption or auxiliary label</Text>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>COLORS</h2>
          <div className={styles.swatchGrid}>
            {activeSwatches.map((swatch) => (
              <div key={swatch.hex} className={styles.swatchCard}>
                <div
                  className={styles.swatchBox}
                  style={{ backgroundColor: swatch.hex }}
                />
                <span className={styles.swatchHex}>{swatch.hex}</span>
                <span className={styles.swatchLabel}>{swatch.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>BUTTONS AND BADGES</h2>
          <Inline gap="md" align="center" wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Badge variant="default">Infrastructure</Badge>
            <Badge variant="accent">Hardware</Badge>
          </Inline>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>FORM CONTROLS</h2>
          <div className={styles.formGrid}>
            <Input
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Switch
              label="Notifications"
              checked={notifications}
              onChange={setNotifications}
            />
            <Checkbox
              label="I accept the terms"
              checked={termsAccepted}
              onChange={setTermsAccepted}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>CARDS</h2>
          <div className={styles.cardsGrid}>
            <Card>
              <Card.Info
                title="GateBridge"
                description="Concurrent reverse proxy built with Java Loom."
              />
            </Card>
            <Card>
              <Card.Metric label="Active projects" value="4" />
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>CAROUSEL</h2>
          <div className={styles.carouselWrapper}>
            <Carousel items={CAROUSEL_ITEMS} />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>FEEDBACK & LOADERS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <Alert variant="info" title="Information">
              This is an informational alert message.
            </Alert>
            <Alert variant="success" title="Success" onClose={() => {}}>
              Operation completed successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
              Please double check your configuration.
            </Alert>
            <Alert variant="danger" title="Error">
              An unexpected error has occurred.
            </Alert>
            <Inline gap="md" align="center">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </Inline>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rectangular" height="80px" />
              <Inline gap="md" align="center">
                <Skeleton variant="circular" width="40px" height="40px" />
                <Skeleton variant="text" width="200px" />
              </Inline>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Showcase;
