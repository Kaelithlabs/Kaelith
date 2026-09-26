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
  ToastProvider,
  useToast,
  Progress,
  EmptyState,
  DropdownMenu,
  DropdownTrigger,
  Menu,
  MenuItem,
  MenuSeparator,
  Popover,
  Drawer,
  Breadcrumbs,
  BreadcrumbItem,
  Pagination,
  Sidebar,
  SidebarNav,
  SidebarItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '../components';
import { Heading, Text, Inline, Grid, Divider, Box, Stack } from '../primitives';
import { LandingPageExamples } from './LandingPageExamples';
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

const FEATURED_PROJECTS = [
  {
    id: 'gatebridge',
    title: 'GateBridge',
    category: 'EDGE NETWORK',
    description: 'Concurrent reverse proxy routing traffic across resilient services.',
    throughput: '8.4k',
    availability: '99.98%',
    region: 'US EAST / EU WEST',
    routes: [
      { label: 'Public API', tone: 'success' },
      { label: 'Identity', tone: 'success' },
      { label: 'Events', tone: 'warning' },
    ],
  },
  {
    id: 'spm',
    title: 'SPM',
    category: 'WEB PLATFORM',
    description: 'A modernization workspace for services moving to the web.',
    throughput: '2.1k',
    availability: '99.95%',
    region: 'GLOBAL EDGE',
    routes: [
      { label: 'Applications', tone: 'success' },
      { label: 'Identity', tone: 'success' },
      { label: 'Assets', tone: 'info' },
    ],
  },
  {
    id: 'kuro',
    title: 'Kuro Console',
    category: 'OPERATIONS',
    description: 'A modular control surface for teams running critical systems.',
    throughput: '640',
    availability: '99.99%',
    region: '3 ACTIVE ZONES',
    routes: [
      { label: 'Control plane', tone: 'success' },
      { label: 'Metrics', tone: 'info' },
      { label: 'Workers', tone: 'success' },
    ],
  },
];

const SPOTLIGHTS = [
  { id: 'availability', label: 'PLATFORM HEALTH', value: '99.98%', title: 'Availability held steady', detail: '30-day production uptime', tone: 'success' },
  { id: 'latency', label: 'EDGE NETWORK', value: '42 ms', title: 'Requests stay responsive', detail: 'p95 response time', tone: 'info' },
  { id: 'deployments', label: 'DELIVERY', value: '128', title: 'Changes shipped safely', detail: 'successful deployments', tone: 'warning' },
];

const CUSTOMER_NOTES = [
  { id: 'northstar', quote: 'We can trace every release from the first change to production.', name: 'Maya Chen', role: 'Platform Engineering' },
  { id: 'fieldwork', quote: 'The operational view is finally as clear as the system is complex.', name: 'Jon Bell', role: 'Infrastructure Lead' },
  { id: 'relay', quote: 'One workspace replaced a stack of disconnected status pages.', name: 'Ari Morgan', role: 'Site Reliability' },
  { id: 'signal', quote: 'Our teams spot a risky rollout before it reaches customers.', name: 'Noor Patel', role: 'Release Operations' },
];

const ToastDemo: React.FC = () => {
  const toast = useToast();

  return (
    <Inline gap="sm" wrap>
      <Button variant="primary" onClick={() => toast.success('Your changes are saved.', { title: 'Saved' })}>
        Show success toast
      </Button>
      <Button variant="secondary" onClick={() => toast.warning('Review the remaining settings.', { title: 'Needs attention' })}>
        Show warning toast
      </Button>
    </Inline>
  );
};

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
  const [selectedProject, setSelectedProject] = useState<(typeof FEATURED_PROJECTS)[number] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(4);

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
          <h2 className={styles.sectionTitle}>CAROUSEL VARIATIONS</h2>
          <Stack gap="xl">
            <div className={styles.carouselExample}>
              <div className={styles.carouselExampleHeading}>
                <Heading as="h3" variant="heading">Single slide</Heading>
                <Text variant="caption">One project at a time, with direct slide navigation.</Text>
              </div>
              <Carousel items={CAROUSEL_ITEMS} ariaLabel="Featured projects" />
            </div>

            <Divider />

            <div className={styles.carouselExample}>
              <div className={styles.carouselExampleHeading}>
                <Heading as="h3" variant="heading">Featured project card</Heading>
                <Text variant="caption">Cover, category, summary, live routes, and a project action.</Text>
              </div>
              <Carousel ariaLabel="Featured Kaelith projects">
                {FEATURED_PROJECTS.map((project) => (
                  <article key={project.id} className={styles.projectFeatureSlide}>
                    <div className={styles.projectCover} aria-label={`${project.title} service routing overview`}>
                      <div className={styles.coverTopline}>
                        <span className={styles.coverBrand}>KAELITH / SYSTEM MAP</span>
                        <span className={styles.coverLive}><span /> LIVE</span>
                      </div>
                      <div className={styles.coverMap} aria-hidden="true">
                        <div className={styles.coverIngress}>
                          <span>INGRESS</span>
                          <strong>{project.throughput}</strong>
                          <small>req / min</small>
                        </div>
                        <div className={styles.coverBranches}>
                          {project.routes.map((route) => (
                            <span key={route.label} />
                          ))}
                        </div>
                        <div className={styles.coverTargets}>
                          {project.routes.map((route) => (
                            <div key={route.label} className={styles.coverTarget}>
                              <span>{route.label}</span>
                              <i className={styles[`route${route.tone}`]} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.coverFooter}>
                        <span>{project.region}</span>
                        <strong>{project.availability} uptime</strong>
                      </div>
                    </div>
                    <div className={styles.projectFeatureContent}>
                      <Badge variant="accent">{project.category}</Badge>
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedProject(project);
                          setIsModalOpen(true);
                        }}
                      >
                        View project
                      </Button>
                    </div>
                  </article>
                ))}
              </Carousel>
            </div>

            <Divider />

            <div className={styles.carouselExample}>
              <div className={styles.carouselExampleHeading}>
                <Heading as="h3" variant="heading">Centered peek</Heading>
                <Text variant="caption">Adjacent highlights stay in view to invite browsing.</Text>
              </div>
              <Carousel variant="peek" ariaLabel="Platform health highlights">
                {SPOTLIGHTS.map((item) => (
                  <article key={item.id} className={`${styles.spotlightSlide} ${styles[item.tone]}`}>
                    <span className={styles.slideEyebrow}>{item.label}</span>
                    <strong className={styles.slideValue}>{item.value}</strong>
                    <div>
                      <h4 className={styles.slideTitle}>{item.title}</h4>
                      <p className={styles.slideDetail}>{item.detail}</p>
                    </div>
                  </article>
                ))}
              </Carousel>
            </div>

            <Divider />

            <div className={styles.carouselExample}>
              <div className={styles.carouselExampleHeading}>
                <Heading as="h3" variant="heading">Two-up stories</Heading>
                <Text variant="caption">Compare two customer notes in the same viewport.</Text>
              </div>
              <Carousel variant="multi" ariaLabel="Customer stories">
                {CUSTOMER_NOTES.map((item) => (
                  <article key={item.id} className={styles.quoteSlide}>
                    <span className={styles.slideEyebrow}>CUSTOMER NOTE</span>
                    <blockquote>{item.quote}</blockquote>
                    <div className={styles.quoteByline}>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </article>
                ))}
              </Carousel>
            </div>
          </Stack>
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
                <Button variant="primary" onClick={() => {
                  setSelectedProject(null);
                  setIsModalOpen(true);
                }}>
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
              title={selectedProject?.title ?? 'Interactive Dialog Modal'}
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
                {selectedProject?.description ?? 'This is a modal dialog powered by accessible React Portals. It supports focus trapping, keyboard navigation (ESC key), and custom overlays.'}
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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>APPLICATION COMPONENTS</h2>
          <Stack gap="md">
            <Heading as="h3" variant="heading">Toast Notifications</Heading>
            <ToastProvider>
              <ToastDemo />
            </ToastProvider>

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Progress</Heading>
            <Stack gap="sm">
              <Progress value={68} showValue aria-label="Deployment progress" />
              <Progress value={100} variant="success" size="sm" aria-label="Build progress" />
            </Stack>

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Empty State</Heading>
            <EmptyState
              title="No deployments yet"
              description="Create a deployment to see its status and history here."
              action={<Button variant="secondary">Create deployment</Button>}
            />

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Dropdown Menu & Popover</Heading>
            <Inline gap="md" align="center" wrap>
              <DropdownMenu>
                <DropdownTrigger>Project actions</DropdownTrigger>
                <Menu>
                  <MenuItem onClick={() => {}}>Rename project</MenuItem>
                  <MenuSeparator />
                  <MenuItem disabled>Archive project</MenuItem>
                </Menu>
              </DropdownMenu>
              <Popover
                trigger={<Button variant="secondary">Quick details</Button>}
                content={<Text variant="body">The latest deployment completed successfully.</Text>}
              />
              <Button variant="tertiary" onClick={() => setIsDrawerOpen(true)}>
                Open drawer
              </Button>
            </Inline>
            <Drawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              title="Deployment details"
              footer={<Button onClick={() => setIsDrawerOpen(false)}>Done</Button>}
            >
              <Text variant="body">Production deployment completed successfully.</Text>
            </Drawer>

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Breadcrumbs & Pagination</Heading>
            <Breadcrumbs>
              <BreadcrumbItem href="#workspace">Workspace</BreadcrumbItem>
              <BreadcrumbItem href="#projects">Projects</BreadcrumbItem>
              <BreadcrumbItem active>Kaelith Console</BreadcrumbItem>
            </Breadcrumbs>
            <Pagination currentPage={currentPage} totalPages={12} onPageChange={setCurrentPage} />

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Sidebar</Heading>
            <div className={styles.sidebarDemo}>
              <Sidebar
                collapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
              >
                <SidebarNav>
                  <SidebarItem label="Overview" active href="#overview" />
                  <SidebarItem label="Deployments" badge="3" href="#deployments" />
                  <SidebarItem label="Settings" href="#settings" />
                </SidebarNav>
              </Sidebar>
              <Box className={styles.sidebarContent}>
                <Text variant="body">Workspace content</Text>
              </Box>
            </div>

            <Divider margin="md" />

            <Heading as="h3" variant="heading">Table</Heading>
            <Table striped hoverable>
              <Thead>
                <Tr><Th scope="col">Service</Th><Th scope="col">Status</Th><Th scope="col">Region</Th></Tr>
              </Thead>
              <Tbody>
                <Tr><Td>Gateway API</Td><Td>Healthy</Td><Td>us-east-1</Td></Tr>
                <Tr><Td>Event worker</Td><Td>Deploying</Td><Td>eu-west-1</Td></Tr>
                <Tr><Td>Metrics store</Td><Td>Healthy</Td><Td>ap-southeast-1</Td></Tr>
              </Tbody>
            </Table>
          </Stack>
        </section>

        <LandingPageExamples />
      </main>
    </div>
  );
};

export default Showcase;
