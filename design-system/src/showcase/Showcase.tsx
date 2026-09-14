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
  { id: 'spm', title: 'SPM', subtitle: 'Modernizacao web' },
  { id: 'gatebridge', title: 'GateBridge', subtitle: 'Proxy reverso' },
  { id: 'kuro', title: 'Kuro', subtitle: 'Console modular' },
  { id: 'bitcast', title: 'Bitcast', subtitle: 'Em definicao' },
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
              { label: 'Produtos', href: '#produtos' },
              { label: 'Sobre', href: '#sobre' },
              { label: 'Contato', href: '#contato' },
            ]}
            actionLabel="Fale conosco"
          />
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>TIPOGRAFIA</h2>
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
                Construindo com controle
              </Heading>
            </div>
            <div className={styles.typographyItem}>
              <span className={styles.typographyMeta}>Body (14 / 500)</span>
              <Text variant="body">Texto de corpo para paragrafos e descricoes.</Text>
            </div>
            <div className={styles.typographyItem}>
              <span className={styles.typographyMeta}>Caption (12 / 500)</span>
              <Text variant="caption">Legenda ou rotulo auxiliar</Text>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>CORES</h2>
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
          <h2 className={styles.sectionTitle}>BOTOES E BADGES</h2>
          <Inline gap="md" align="center" wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Badge variant="default">Infraestrutura</Badge>
            <Badge variant="accent">Hardware</Badge>
          </Inline>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>FORMULARIO</h2>
          <div className={styles.formGrid}>
            <Input
              label="Nome"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Switch
              label="Notificacoes"
              checked={notifications}
              onChange={setNotifications}
            />
            <Checkbox
              label="Aceito os termos"
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
                description="Proxy reverso concorrente construido com Java Loom."
              />
            </Card>
            <Card>
              <Card.Metric label="Projetos ativos" value="4" />
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>CARROSSEL</h2>
          <div className={styles.carouselWrapper}>
            <Carousel items={CAROUSEL_ITEMS} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Showcase;
