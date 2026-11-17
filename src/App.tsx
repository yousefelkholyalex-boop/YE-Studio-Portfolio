import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams
} from 'react-router-dom';

import { useL } from './i18n';
import {
  projects,
  cats,
  Cat,
  WHATSAPP,
  EMAIL,
  FORM_ENDPOINT
} from './data';

const Logo = () => (
  <span className="font-display text-2xl tracking-tight">
    YE<span className="text-gold">.</span>
    <span className="ms-2 text-xs font-sans tracking-[.3em] text-mute">
      STUDIO
    </span>
  </span>
);

function useTitle(s: string) {
  useEffect(() => {
    document.title = `${s} — YE Studio`;
    window.scrollTo(0, 0);
  }, [s]);
}

function Img({
  src,
  label,
  className = ''
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const [bad, setBad] = useState(false);

  if (bad) {
    return (
      <div
        role="img"
        aria-label={label}
        className={`flex items-end bg-char border border-line p-4 text-xs tracking-widest text-mute ${className}`}
      >
        <span>{label}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      loading="lazy"
      onError={() => setBad(true)}
      className={`object-cover ${className}`}
    />
  );
}

function Header() {
  const { t, toggle } = useL();
  const [o, setO] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setO(false);
  }, [loc]);

  const nav = [
    ['/', 'home'],
    ['/portfolio', 'portfolio'],
    ['/about', 'about'],
    ['/services', 'services'],
    ['/contact', 'contact']
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" aria-label="YE Studio">
          <Logo />
        </Link>

        <nav
          className="hidden gap-8 text-sm md:flex"
          aria-label="Main"
        >
          {nav.map(([p, k]) => (
            <NavLink
              key={p}
              to={p}
              end={p === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-gold'
                  : 'text-white/70 hover:text-white'
              }
            >
              {t(k)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="border border-line px-3 py-1 text-xs hover:border-gold"
          >
            {t('lang')}
          </button>

          <button
            className="md:hidden"
            aria-expanded={o}
            onClick={() => setO(!o)}
          >
            {t('menu')}
          </button>
        </div>
      </div>

      {o && (
        <nav className="flex flex-col gap-4 border-t border-line px-5 py-5 md:hidden">
          {nav.map(([p, k]) => (
            <Link key={p} to={p}>
              {t(k)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const { t } = useL();

  return (
    <footer className="border-t border-line px-5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-mute">
            {t('tagline')}
          </p>
        </div>

        <div className="text-sm text-mute">
          <a
            className="block hover:text-white"
            href={`https://wa.me/${WHATSAPP}`}
          >
            WhatsApp
          </a>

          <a
            className="block hover:text-white"
            href={`mailto:${EMAIL}`}
          >
            {EMAIL}
          </a>

          <p className="mt-4">
            © {new Date().getFullYear()} YE Studio. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

function Card({ p }: { p: typeof projects[0] }) {
  const { l, t } = useL();
  const d = p[l];

  return (
    <Link
      to={`/portfolio/${p.slug}`}
      className="group block"
    >
      <div className="overflow-hidden">
        <Img
          src={`/images/projects/${p.slug}/cover.jpg`}
          label={d[0]}
          className="aspect-[4/5] w-full transition duration-700 group-hover:scale-105"
        />
      </div>

      <p className="mt-4 text-xs tracking-widest text-gold">
        {t('cat_' + p.cat).toUpperCase()}
      </p>

      <h3 className="mt-1 font-display text-xl">
        {d[0]}
      </h3>

      <p className="mt-1 text-sm text-mute">
        {d[1]}
      </p>
    </Link>
  );
}

function Cta() {
  const { t } = useL();

  return (
    <div className="flex flex-wrap gap-4">
      <Link to="/portfolio" className="btn">
        {t('explore')}
      </Link>

      <Link to="/contact" className="btn btn-g">
        {t('start')}
      </Link>
    </div>
  );
}

function ServiceList({ full }: { full?: boolean }) {
  const { t } = useL();

  return (
    <div className="divide-y divide-line border-y border-line">
      {cats.map((c, i) => (
        <div
          key={c}
          className="grid gap-4 py-8 md:grid-cols-12"
        >
          <span className="text-gold md:col-span-1">
            0{i + 1}
          </span>

          <div className="md:col-span-5">
            <h3 className="font-display text-2xl">
              {t('cat_' + c)}
            </h3>

            <p className="mt-2 text-mute">
              {t('sd_' + c)}
            </p>
          </div>

          {full && (
            <div className="md:col-span-4">
              <p className="mb-2 text-xs tracking-widest text-mute">
                {t('inc').toUpperCase()}
              </p>

              <ul className="space-y-1 text-sm">
                {t('si_' + c).split('|').map(x => (
                  <li key={x}>— {x}</li>
                ))}
              </ul>
            </div>
          )}

          {full && (
            <div className="md:col-span-2">
              <Link
                to={`/contact?service=${c}`}
                className="text-sm text-gold underline-offset-4 hover:underline"
              >
                {t('talk')}
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Home() {
  const { t } = useL();
  useTitle(t('home'));

  return (
    <div className="page">
      <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-5 py-20">
        <p className="mb-6 text-xs tracking-[.4em] text-gold">
          YE STUDIO
        </p>

        <h1 className="max-w-4xl font-display text-5xl font-light leading-[1.05] md:text-8xl">
          {t('tagline')}
        </h1>

        <p
          className="mt-4 text-lg text-mute"
          lang="ar"
          dir="rtl"
        >
          {t('ar_tag')}
        </p>

        <p className="mt-8 max-w-xl text-white/70">
          {t('intro')}
        </p>

        <div className="mt-10">
          <Cta />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-5xl">
            {t('featured')}
          </h2>

          <Link
            className="text-sm text-gold"
            to="/portfolio"
          >
            {t('viewall')}
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map(p => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="mb-10 font-display text-3xl md:text-5xl">
          {t('services')}
        </h2>
        <ServiceList />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-2">
        <h2 className="font-display text-3xl md:text-5xl">
          {t('aboutTitle')}
        </h2>

        <div>
          <p className="text-white/70">
            {t('aboutShort')}
          </p>

          <Link to="/about" className="btn mt-6">
            {t('more')}
          </Link>
        </div>
      </section>

      <section className="border-t border-line px-5 py-24 text-center">
        <h2 className="font-display text-4xl md:text-6xl">
          {t('contactTitle')}
        </h2>

        <p className="mx-auto mt-4 max-w-md text-mute">
          {t('contactText')}
        </p>

        <div className="mt-8 flex justify-center">
          <Link to="/contact" className="btn btn-g">
            {t('start')}
          </Link>
        </div>
      </section>
    </div>
  );
}

function Portfolio() {
  const { t } = useL();
  useTitle(t('portfolio'));

  const [f, setF] = useState<'all' | Cat>('all');

  const list = projects.filter(
    p => f === 'all' || p.cat === f
  );

  return (
    <div className="page mx-auto max-w-7xl px-5 py-16">
      <h1 className="font-display text-5xl md:text-7xl">
        {t('portfolio')}
      </h1>

      <p className="mt-3 text-xs text-mute">
        {t('sample')}
      </p>

      <div
        className="my-10 flex flex-wrap gap-2"
        role="group"
      >
        {(['all', ...cats] as const).map(c => (
          <button
            key={c}
            aria-pressed={f === c}
            onClick={() => setF(c)}
            className={`border px-4 py-2 text-sm transition ${
              f === c
                ? 'border-gold text-gold'
                : 'border-line text-mute hover:text-white'
            }`}
          >
            {c === 'all' ? t('all') : t('cat_' + c)}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => (
          <Card key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}

function Project() {
  const { slug } = useParams();
  const { l, t } = useL();

  const i = projects.findIndex(p => p.slug === slug);
  const p = projects[i];

  useTitle(p ? p[l][0] : t('notfound'));

  if (!p) {
    return (
      <div className="px-5 py-32 text-center">
        <p>{t('notfound')}</p>

        <Link to="/portfolio" className="btn mt-6">
          {t('back')}
        </Link>
      </div>
    );
  }

  const d = p[l];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="page mx-auto max-w-7xl px-5 py-16">
      <p className="text-xs tracking-widest text-gold">
        {t('cat_' + p.cat).toUpperCase()}
      </p>

      <h1 className="mt-2 font-display text-4xl md:text-7xl">
        {d[0]}
      </h1>

      <dl className="mt-8 grid gap-4 border-y border-line py-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-mute">{t('client')}</dt>
          <dd>{t('placeholder')}</dd>
        </div>

        <div>
          <dt className="text-mute">{t('category')}</dt>
          <dd>{t('cat_' + p.cat)}</dd>
        </div>
      </dl>

      <Img
        src={`/images/projects/${p.slug}/cover.jpg`}
        label={d[0]}
        className="mt-10 aspect-[16/9] w-full"
      />

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">
            {t('overview')}
          </h2>

          <p className="mt-3 text-white/70">{d[1]}</p>

          <p className="mt-3 text-xs text-mute">
            {t('sample')}
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl">
            {t('objectives')}
          </h2>

          <p className="mt-3 text-white/70">{d[2]}</p>
        </div>
      </div>

      <h2 className="mb-6 mt-16 font-display text-2xl">
        {t('gallery')}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3].map(n => (
          <Img
            key={n}
            src={`/images/projects/${p.slug}/${n}.jpg`}
            label={`${d[0]} — ${n}`}
            className={`aspect-[4/3] w-full ${
              n === 3 ? 'sm:col-span-2 sm:aspect-[16/9]' : ''
            }`}
          />
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <Link
          className="hover:text-gold"
          to={`/portfolio/${prev.slug}`}
        >
          {l === 'ar' ? '→' : '←'} {t('prev')}
        </Link>

        <Link className="btn" to="/portfolio">
          {t('back')}
        </Link>

        <Link
          className="hover:text-gold"
          to={`/portfolio/${next.slug}`}
        >
          {t('next')} {l === 'ar' ? '←' : '→'}
        </Link>
      </div>
    </article>
  );
}

function About() {
  const { t } = useL();
  useTitle(t('about'));

  return (
    <div className="page mx-auto max-w-7xl px-5 py-16">
      <h1 className="max-w-3xl font-display text-4xl md:text-7xl">
        {t('aboutTitle')}
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-white/70">
        {t('aboutText')}
      </p>

      <h2 className="mt-20 font-display text-2xl text-gold">
        {t('philosophy')}
      </h2>

      <p className="mt-3 max-w-2xl text-xl">
        {t('philo')}
      </p>

      <h2 className="mt-20 font-display text-2xl text-gold">
        {t('approach')}
      </h2>

      <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {['a1', 'a2', 'a3', 'a4'].map((k, i) => {
          const [h, b] = t(k).split('|');

          return (
            <div key={k} className="bg-ink p-6">
              <span className="text-gold">0{i + 1}</span>

              <h3 className="mt-3 font-display text-xl">
                {h}
              </h3>

              <p className="mt-2 text-sm text-mute">
                {b}
              </p>
            </div>
          );
        })}
      </div>

      <h2 className="mb-6 mt-20 font-display text-2xl text-gold">
        {t('services')}
      </h2>

      <ServiceList />
    </div>
  );
}

function Services() {
  const { t } = useL();
  useTitle(t('services'));

  return (
    <div className="page mx-auto max-w-7xl px-5 py-16">
      <h1 className="mb-12 font-display text-5xl md:text-7xl">
        {t('servTitle')}
      </h1>

      <ServiceList full />
    </div>
  );
}

function Contact() {
  const { t } = useL();
  useTitle(t('contact'));

  const q = new URLSearchParams(
    useLocation().search
  ).get('service') || '';

  const [done, setDone] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    // Read form values without entries() or Object.fromEntries()
    const get = (key: string) =>
      String(fd.get(key) ?? '');

    const name = get('name');
    const email = get('email');
    const wa = get('wa');
    const company = get('company');
    const service = get('service');
    const budget = get('budget');
    const deadline = get('deadline');
    const desc = get('desc');

    if (FORM_ENDPOINT) {
      try {
        const r = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: fd,
          headers: {
            Accept: 'application/json'
          }
        });

        if (r.ok) {
          setDone(true);
          return;
        }
      } catch (error) {
        console.error('Form submission failed:', error);
      }
    }

    const msg = `YE Studio inquiry
Name: ${name}
Email: ${email}
WhatsApp: ${wa}
Company: ${company || '-'}
Service: ${service}
Budget (EGP): ${budget || '-'}
Deadline: ${deadline || '-'}

${desc}`;

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const L = ({
    id,
    children
  }: {
    id: string;
    children: string;
  }) => (
    <label
      htmlFor={id}
      className="mb-1 mt-6 block text-xs tracking-widest text-mute"
    >
      {children}
    </label>
  );

  return (
    <div className="page mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <h1 className="font-display text-5xl md:text-7xl">
          {t('contactTitle')}
        </h1>

        <p className="mt-6 text-mute">
          {t('contactText')}
        </p>

        <a
          className="btn btn-g mt-8"
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noreferrer"
        >
          {t('waDirect')}
        </a>
      </div>

      {done ? (
        <p className="text-gold lg:col-span-3">
          {t('sent')}
        </p>
      ) : (
        <form
          onSubmit={submit}
          className="lg:col-span-3"
        >
          <L id="name">{t('name')}</L>
          <input
            id="name"
            name="name"
            required
            className="in"
          />

          <L id="email">{t('email')}</L>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="in"
          />

          <L id="wa">{t('wa')}</L>
          <input
            id="wa"
            name="wa"
            type="tel"
            required
            className="in"
            dir="ltr"
          />

          <L id="company">{t('company')}</L>
          <input
            id="company"
            name="company"
            className="in"
          />

          <L id="service">{t('service')}</L>
          <select
            id="service"
            name="service"
            required
            defaultValue={q}
            className="in bg-ink"
          >
            <option value="" disabled>
              {t('select')}
            </option>

            {cats.map(c => (
              <option key={c} value={t('cat_' + c)}>
                {t('cat_' + c)}
              </option>
            ))}
          </select>

          <L id="desc">{t('desc')}</L>
          <textarea
            id="desc"
            name="desc"
            rows={4}
            required
            className="in"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <L id="budget">{t('budget')}</L>
              <input
                id="budget"
                name="budget"
                type="number"
                min="0"
                className="in"
                dir="ltr"
              />
            </div>

            <div>
              <L id="deadline">{t('deadline')}</L>
              <input
                id="deadline"
                name="deadline"
                type="date"
                className="in"
              />
            </div>
          </div>

          <button className="btn btn-g mt-10" type="submit">
            {t('send')}
          </button>

          {!FORM_ENDPOINT && (
            <p className="mt-4 text-xs text-mute">
              {t('formNote')}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default function App() {
  const loc = useLocation();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only"
      >
        Skip
      </a>

      <Header />

      <main id="main" key={loc.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Project />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
