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
  FormField,
  Textarea,
  Select,
  Radio,
  RadioGroup,
  Tabs,
  Tooltip,
  Modal,
  Avatar,
} from '../components';
import { Heading, Text, Inline, Grid, Divider, Box, Stack } from '../primitives';
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
  const [role, setRole] = useState('developer');
  const [bio, setBio] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('all');
  const [notifications, setNotifications] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h2 className={styles.sectionTitle}>LAYOUT PRIMITIVES</h2>
          <Stack gap="md">
            <Heading as="h3" variant="heading">Grid System</Heading>
            <Grid columns={{ sm: 1, md: 3 }} gap="md">
              <Box className={styles.demoBox}>Grid Item 1</Box>
              <Box className={styles.demoBox}>Grid Item 2</Box>
              <Box className={styles.demoBox}>Grid Item 3</Box>
            </Grid>
            <Divider margin="md" />
            <Heading as="h3" variant="heading">Divider Orientation</Heading>
            <Inline gap="md" align="center">
              <Text variant="body">Left Content Block</Text>
              <Divider orientation="vertical" />
              <Text variant="body">Right Content Block</Text>
            </Inline>
          </Stack>
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
          <h2 className={styles.sectionTitle}>FORM FIELDS & INPUTS</h2>
          <div className={styles.formGrid}>
            <FormField label="Full Name" helperText="Enter your display name" required>
              <Input
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormField>

            <FormField label="Role" helperText="Select your primary system role">
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: 'developer', label: 'Software Developer' },
                  { value: 'designer', label: 'UI/UX Designer' },
                  { value: 'manager', label: 'Product Manager' },
                ]}
              />
            </FormField>

            <FormField label="Biography" helperText="Brief personal introduction">
              <Textarea
                placeholder="Write a few words about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
              />
            </FormField>

            <RadioGroup
              label="Notification Preference"
              value={selectedRadio}
              onChange={setSelectedRadio}
            >
              <Radio value="all" label="All Notifications" />
              <Radio value="important" label="Important Only" />
              <Radio value="none" label="Mute All" />
            </RadioGroup>

            <Inline gap="md" align="center">
              <Switch
                label="Email Updates"
                checked={notifications}
                onChange={setNotifications}
              />
              <Checkbox
                label="I accept the terms of service"
                checked={termsAccepted}
                onChange={setTermsAccepted}
              />
            </Inline>
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
          <Stack gap="md">
            <Heading as="h3" variant="heading">Alert Variants</Heading>
            <Stack gap="sm">
              <Alert variant="info" title="Information">
                System updates will take place tonight at 02:00 UTC.
              </Alert>
              <Alert variant="success" title="Success" onClose={() => {}}>
                Configuration saved successfully.
              </Alert>
              <Alert variant="warning" title="Warning">
                API rate limit threshold reached (85%).
              </Alert>
              <Alert variant="danger" title="Error">
                Failed to establish database connection.
              </Alert>
            </Stack>

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Spinner Sizes</Heading>
            <Inline gap="lg" align="center">
              <Inline gap="xs" align="center">
                <Spinner size="sm" />
                <Text variant="caption">Small (sm)</Text>
              </Inline>
              <Inline gap="xs" align="center">
                <Spinner size="md" />
                <Text variant="caption">Medium (md)</Text>
              </Inline>
              <Inline gap="xs" align="center">
                <Spinner size="lg" />
                <Text variant="caption">Large (lg)</Text>
              </Inline>
            </Inline>

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Skeleton Loading Shapes</Heading>
            <Stack gap="xs">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rectangular" height="80px" />
              <Inline gap="md" align="center">
                <Skeleton variant="circular" width="40px" height="40px" />
                <Skeleton variant="text" width="200px" />
              </Inline>
            </Stack>
          </Stack>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>INTERACTIVE OVERLAYS & NAVIGATION</h2>
          <Stack gap="md">
            <Heading as="h3" variant="heading">Tabs Component</Heading>
            <Tabs defaultValue="overview">
              <Tabs.TabList aria-label="Showcase Navigation Tabs">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
                <Tabs.Tab value="settings">Settings</Tabs.Tab>
              </Tabs.TabList>
              <Tabs.TabPanel value="overview">
                <Box className={styles.tabContent}>
                  <Text variant="body">Overview panel content showing key system metrics and summary info.</Text>
                </Box>
              </Tabs.TabPanel>
              <Tabs.TabPanel value="analytics">
                <Box className={styles.tabContent}>
                  <Text variant="body">Analytics panel data displaying real-time traffic statistics.</Text>
                </Box>
              </Tabs.TabPanel>
              <Tabs.TabPanel value="settings">
                <Box className={styles.tabContent}>
                  <Text variant="body">Settings panel allowing user configuration of preference options.</Text>
                </Box>
              </Tabs.TabPanel>
            </Tabs>

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Tooltips & Modal Trigger</Heading>
            <Inline gap="md" align="center" wrap>
              <Tooltip content="Click to launch interactive dialog modal" position="top">
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Open Modal
                </Button>
              </Tooltip>
              <Tooltip content="Secondary action tooltip help text" position="right">
                <Button variant="secondary">Hover Me (Right)</Button>
              </Tooltip>
              <Tooltip content="Bottom aligned helper text" position="bottom">
                <Button variant="tertiary">Hover Me (Bottom)</Button>
              </Tooltip>
            </Inline>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Interactive Dialog Modal"
              footer={
                <Inline gap="sm" align="end">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                    Confirm
                  </Button>
                </Inline>
              }
            >
              <Text variant="body">
                This is a modal dialog powered by accessible React Portals. It supports focus trapping, keyboard navigation (ESC key), and custom overlays.
              </Text>
            </Modal>

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Avatar Sizes & Variants</Heading>
            <Inline gap="lg" align="center" wrap>
              <Inline gap="sm" align="center">
                <Avatar name="Alice Smith" size="sm" />
                <Avatar name="Alice Smith" size="md" />
                <Avatar name="Alice Smith" size="lg" />
              </Inline>
              <Divider orientation="vertical" />
              <Inline gap="sm" align="center">
                <Avatar name="Bob Johnson" size="sm" variant="square" />
                <Avatar name="Bob Johnson" size="md" variant="square" />
                <Avatar name="Bob Johnson" size="lg" variant="square" />
              </Inline>
            </Inline>
          </Stack>
        </section>
      </main>
    </div>
  );
};

export default Showcase;
