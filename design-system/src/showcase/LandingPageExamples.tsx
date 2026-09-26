import React from 'react';
import { Button, ToastProvider, useToast } from '../components';
import styles from './LandingPageExamples.module.css';

const BENEFITS = [
  {
    title: 'One source of truth',
    description: 'Shared tokens keep every product surface aligned as the system grows.',
    marker: 'TOKENS / 01',
  },
  {
    title: 'Less repeated work',
    description: 'Composable patterns let teams spend time on product decisions, not rework.',
    marker: 'WORKFLOW / 02',
  },
  {
    title: 'Ready for change',
    description: 'Accessible foundations make new features easier to ship with confidence.',
    marker: 'QUALITY / 03',
  },
];

const TESTIMONIALS = [
  {
    quote: 'We replaced a growing pile of one-off UI with a system the whole team can trust.',
    name: 'Maya Chen',
    role: 'Product Design Lead',
    company: 'Northstar',
  },
  {
    quote: 'New product surfaces now feel consistent without slowing down the people building them.',
    name: 'Jon Bell',
    role: 'Engineering Manager',
    company: 'Fieldwork',
  },
  {
    quote: 'The shared language made reviews shorter and the final experience much more coherent.',
    name: 'Ari Morgan',
    role: 'Frontend Platform',
    company: 'Relay',
  },
];

const STEPS = [
  { title: 'Set the foundation', description: 'Choose the tokens and principles that express your product.' },
  { title: 'Build the patterns', description: 'Compose accessible components for the workflows people use.' },
  { title: 'Ship with confidence', description: 'Document decisions, publish updates, and keep teams aligned.' },
];

const FAQS = [
  {
    question: 'Can we use the system with more than one product?',
    answer: 'Yes. Shared foundations can support multiple product surfaces while each product keeps its own patterns and voice.',
  },
  {
    question: 'How do teams propose a component change?',
    answer: 'Start with the user need and an example from the product. Review the proposal with design and engineering before adding it to the shared library.',
  },
  {
    question: 'Do the components support different themes?',
    answer: 'Components use semantic color tokens, so changing the theme updates their appearance without replacing the component.',
  },
  {
    question: 'Where should we start?',
    answer: 'Begin with the foundations your teams share most often: color, type, spacing, and the controls used in core workflows.',
  },
];

const LandingPageExamplesContent: React.FC = () => {
  const toast = useToast();

  return (
    <div className={styles.pageSections}>
      <section id="benefits" className={styles.benefits} aria-labelledby="benefits-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>BENEFITS</p>
            <h2 id="benefits-title">A system that makes good work repeatable.</h2>
            <p>Give product teams a shared foundation without flattening the character of each product.</p>
          </div>
          <div className={styles.benefitList}>
            {BENEFITS.map((benefit) => (
              <article className={styles.benefit} key={benefit.title}>
                <span className={styles.benefitMarker}>{benefit.marker}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.features} aria-labelledby="features-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>FEATURES</p>
            <h2 id="features-title">From a clear rule to a consistent interface.</h2>
            <p>Make the invisible decisions visible: tokens, components, and the guidance connecting them.</p>
          </div>

          <div className={styles.featureRow}>
            <div className={styles.featureCopy}>
              <span className={styles.featureIndex}>01 / FOUNDATIONS</span>
              <h3>Change the theme. Keep the language.</h3>
              <p>Semantic color roles let teams adapt the interface while preserving readable contrast and familiar behavior.</p>
              <a className={styles.textLink} href="#how-it-works">Explore the process <span aria-hidden="true">-&gt;</span></a>
            </div>
            <div className={styles.tokenArtwork} role="img" aria-label="A design token panel showing color roles, type scale, and spacing values">
              <div className={styles.artworkTopline}><span>FOUNDATIONS / COLOR</span><span>THEME B</span></div>
              <div className={styles.tokenRows}>
                <div><span className={styles.tokenSwatch} /><span>Surface</span><code>#FFFFFF</code></div>
                <div><span className={`${styles.tokenSwatch} ${styles.tokenAccent}`} /><span>Accent</span><code>#4FA8E0</code></div>
                <div><span className={`${styles.tokenSwatch} ${styles.tokenInk}`} /><span>Text primary</span><code>#1C2B36</code></div>
              </div>
              <div className={styles.artworkScale}><span>TYPE SCALE</span><strong>Ag</strong><span>Display / 34</span><span>Body / 14</span></div>
            </div>
          </div>

          <div className={`${styles.featureRow} ${styles.featureRowReverse}`}>
            <div className={styles.featureCopy}>
              <span className={styles.featureIndex}>02 / COMPONENTS</span>
              <h3>Useful patterns, ready for real work.</h3>
              <p>Document each component with its states, accessibility behavior, and the situations where it belongs.</p>
              <a className={styles.textLink} href="#faq">See common questions <span aria-hidden="true">-&gt;</span></a>
            </div>
            <div className={styles.componentArtwork} role="img" aria-label="A component specimen showing a form field, selected option, and primary button">
              <div className={styles.artworkTopline}><span>COMPONENT / FORM FIELD</span><span>READY</span></div>
              <span className={styles.mockLabel}>Workspace name</span>
              <div className={styles.mockInput}>Northstar Console <span>✓</span></div>
              <div className={styles.mockMeta}><span>Clear label</span><span>Visible state</span><span>Keyboard ready</span></div>
              <span className={styles.mockButton}>Save workspace</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-labelledby="proof-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>TEAMS, IN THEIR WORDS</p>
            <h2 id="proof-title">Consistency people can feel.</h2>
          </div>
          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map((item) => (
              <figure className={styles.testimonial} key={item.name}>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>
                  <strong>{item.name}</strong>
                  <span>{item.role}, {item.company}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className={styles.process} aria-labelledby="process-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>HOW IT WORKS</p>
            <h2 id="process-title">A practical path from idea to adoption.</h2>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((step, index) => (
              <li className={styles.step} key={step.title}>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.callToAction} aria-labelledby="cta-title">
        <div className={styles.ctaInner}>
          <div>
            <p className={styles.eyebrow}>START WITH THE NEXT RELEASE</p>
            <h2 id="cta-title">Make the next interface easier to build.</h2>
          </div>
          <Button onClick={() => toast.success('Your design system workspace is ready.', { title: 'Let’s get started' })}>
            Start a project
          </Button>
        </div>
      </section>

      <section id="faq" className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.faqInner}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>FAQ</p>
            <h2 id="faq-title">Good questions, clear answers.</h2>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((item) => (
              <details className={styles.faqItem} key={item.question}>
                <summary>{item.question}<span aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <a className={styles.brand} href="#benefits" aria-label="Kaelith, back to benefits">Kaelith<span>.</span></a>
          <p>Tools and patterns for building with care.</p>
          <nav aria-label="Footer navigation">
            <a href="#benefits">Benefits</a>
            <a href="#how-it-works">Process</a>
            <a href="#faq">FAQ</a>
          </nav>
          <small>© 2026 Kaelith</small>
        </div>
      </footer>
    </div>
  );
};

export const LandingPageExamples: React.FC = () => (
  <ToastProvider>
    <LandingPageExamplesContent />
  </ToastProvider>
);

export default LandingPageExamples;