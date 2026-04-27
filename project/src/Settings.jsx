/* global React, Icon, Button, Input, Tag, Avatar, IconButton */
const { useState: useStateSet } = React;
const PSet = window.PYT;

// ---------- shared bits ----------
function SectionHeader({ title, subtitle, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 24, paddingBottom: 16, borderBottom: `1px solid ${PSet.color.ink200}`,
    }}>
      <div>
        <h2 style={{ margin: 0, fontFamily: PSet.font.sans, fontSize: 20, fontWeight: 500, color: PSet.color.ink900, letterSpacing: '-0.005em' }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ margin: '4px 0 0', fontFamily: PSet.font.sans, fontSize: 13, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.sm, lineHeight: '20px', maxWidth: 560 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>{action}</div>}
    </div>
  );
}

function FieldRow({ label, helper, children, columns = '220px 1fr' }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: columns, gap: 32,
      padding: '20px 0', borderBottom: `1px solid ${PSet.color.ink150}`,
      alignItems: 'flex-start',
    }}>
      <div>
        <div style={{ fontFamily: PSet.font.sans, fontSize: 14, fontWeight: 500, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>
          {label}
        </div>
        {helper && (
          <div style={{ marginTop: 4, fontFamily: PSet.font.sans, fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs, lineHeight: '16px', maxWidth: 220 }}>
            {helper}
          </div>
        )}
      </div>
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );
}

// ---------- Toggle ----------
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange && onChange(!checked)}
      role="switch"
      aria-checked={checked}
      style={{
        width: 36, height: 20, borderRadius: 999, padding: 2, border: 0,
        background: checked ? PSet.color.brand500 : PSet.color.ink300,
        position: 'relative', cursor: 'pointer', transition: 'background 120ms ease-out',
        flexShrink: 0,
      }}>
      <span style={{
        position: 'absolute', top: 2, left: checked ? 18 : 2,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        transition: 'left 120ms ease-out',
      }} />
    </button>
  );
}

// ---------- Select (lightweight) ----------
function Select({ value, onChange, options, style }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <select value={value} onChange={(e) => onChange && onChange(e.target.value)}
        style={{
          width: '100%', height: 40, padding: '0 36px 0 12px',
          borderRadius: 6, border: `1px solid ${PSet.color.ink200}`,
          background: '#fff', fontFamily: PSet.font.sans, fontSize: 14,
          color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm,
          appearance: 'none', cursor: 'pointer', outline: 'none',
        }}>
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 10, top: 11, color: PSet.color.ink600, pointerEvents: 'none' }}>
        <Icon name="chevDown" size={16} />
      </span>
    </div>
  );
}

// ---------- Settings nav ----------
function SettingsNav({ active, onSelect }) {
  const groups = [
    {
      label: 'Personal',
      items: [
        { id: 'profile',       label: 'Profile',         icon: 'user' },
        { id: 'notifications', label: 'Notifications',   icon: 'mail' },
        { id: 'security',      label: 'Security',        icon: 'shield' },
      ],
    },
    {
      label: 'Workspace',
      items: [
        { id: 'company',       label: 'Company',         icon: 'globe' },
        { id: 'team',          label: 'Team members',    icon: 'users' },
        { id: 'roles',         label: 'Roles & permissions', icon: 'shield' },
        { id: 'billing',       label: 'Billing & plan',  icon: 'dollar' },
      ],
    },
  ];
  return (
    <div style={{
      width: 240, flexShrink: 0, padding: '24px 12px 24px 24px',
      borderRight: `1px solid ${PSet.color.ink200}`, overflowY: 'auto',
    }}>
      {groups.map((g, gi) => (
        <div key={g.label} style={{ marginBottom: 20 }}>
          <div className="caps" style={{
            padding: '0 10px 8px', fontSize: 11, color: PSet.color.ink500,
            letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
            fontFamily: PSet.font.sans,
          }}>
            {g.label}
          </div>
          {g.items.map(it => {
            const on = active === it.id;
            return (
              <button key={it.id} onClick={() => onSelect(it.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '8px 10px', marginBottom: 2,
                  borderRadius: 6, border: 0, cursor: 'pointer',
                  background: on ? PSet.color.brand50 : 'transparent',
                  color: on ? PSet.color.brand500 : PSet.color.ink800,
                  fontFamily: PSet.font.sans, fontSize: 14,
                  fontWeight: on ? 500 : 400, letterSpacing: PSet.font.tracking.sm,
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = PSet.color.ink100; }}
                onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
                <Icon name={it.icon} size={18} />
                <span>{it.label}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ---------- Profile section ----------
function ProfileSection() {
  const [first, setFirst] = useStateSet('Matas');
  const [last, setLast] = useStateSet('Jonėnas');
  const [email, setEmail] = useStateSet('matas@packyourtour.com');
  const [phone, setPhone] = useStateSet('+370 612 34567');
  const [title, setTitle] = useStateSet('Tour operations lead');
  const [tz, setTz] = useStateSet('Europe/Vilnius');
  const [lang, setLang] = useStateSet('en');

  return (
    <div style={{ maxWidth: 880 }}>
      <SectionHeader
        title="Profile"
        subtitle="This is how teammates and clients see you across Pack Your Tour. Public details appear on shared itineraries and email signatures."
        action={<Button variant="primary" size="md">Save changes</Button>}
      />

      <FieldRow label="Photo" helper="PNG or JPG, 400×400 minimum. Used on shared itineraries.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar initials="MJ" size={64} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outlined" size="md">Upload new</Button>
              <Button variant="subtle" size="md">Remove</Button>
            </div>
            <div style={{ fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs }}>
              Max file size 4 MB.
            </div>
          </div>
        </div>
      </FieldRow>

      <FieldRow label="Name">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" />
          <Input value={last}  onChange={(e) => setLast(e.target.value)}  placeholder="Last name" />
        </div>
      </FieldRow>

      <FieldRow label="Job title" helper="Shown next to your name on outbound emails.">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FieldRow>

      <FieldRow label="Email" helper="Used to sign in. Changing it requires verification.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1 }} />
          <Tag variant="success">Verified</Tag>
        </div>
      </FieldRow>

      <FieldRow label="Phone">
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </FieldRow>

      <FieldRow label="Time zone" helper="Used when scheduling itinerary reminders.">
        <Select value={tz} onChange={setTz} options={[
          { value: 'Europe/Vilnius',  label: '(UTC+02:00) Vilnius' },
          { value: 'Europe/London',   label: '(UTC+00:00) London'  },
          { value: 'Europe/Berlin',   label: '(UTC+01:00) Berlin'  },
          { value: 'America/New_York',label: '(UTC−05:00) New York'},
          { value: 'Asia/Tokyo',      label: '(UTC+09:00) Tokyo'   },
        ]} style={{ maxWidth: 360 }} />
      </FieldRow>

      <FieldRow label="Language" helper="Changes the entire interface — menus, buttons, and emails sent to you.">
        <Select value={lang} onChange={setLang} options={[
          { value: 'en', label: 'English (US)' },
          { value: 'en-GB', label: 'English (UK)' },
          { value: 'lt', label: 'Lietuvių' },
          { value: 'de', label: 'Deutsch' },
          { value: 'fr', label: 'Français' },
          { value: 'es', label: 'Español' },
          { value: 'it', label: 'Italiano' },
          { value: 'pt', label: 'Português' },
          { value: 'pl', label: 'Polski' },
          { value: 'nl', label: 'Nederlands' },
          { value: 'sv', label: 'Svenska' },
          { value: 'ja', label: '日本語' },
        ]} style={{ maxWidth: 320 }} />
      </FieldRow>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 24 }}>
        <Button variant="subtle" size="md">Discard</Button>
        <Button variant="primary" size="md">Save changes</Button>
      </div>
    </div>
  );
}

// ---------- Company section ----------
function CompanySection() {
  const [company, setCompany] = useStateSet('Pack Your Tour Ltd.');
  const [website, setWebsite] = useStateSet('packyourtour.com');
  const [vat, setVat] = useStateSet('LT100012345678');
  const [address, setAddress] = useStateSet('Gedimino pr. 9, Vilnius, 01103');
  const [currency, setCurrency] = useStateSet('EUR');
  const [accent, setAccent] = useStateSet('#574BFF');

  const swatches = ['#574BFF', '#0A7AE4', '#0E6027', '#A55067', '#3A3A3C', '#DA1E28'];

  return (
    <div style={{ maxWidth: 880 }}>
      <SectionHeader
        title="Company"
        subtitle="Branding and legal details applied to itineraries, invoices, and client-facing emails."
        action={<Button variant="primary" size="md">Save changes</Button>}
      />

      <FieldRow label="Logo" helper="Appears at the top of shared itineraries and PDFs.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 12,
            border: `1px solid ${PSet.color.ink200}`, background: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="assets/logo-mark.svg" height="32" />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outlined" size="md" icon="image">Replace logo</Button>
            <Button variant="subtle" size="md">Remove</Button>
          </div>
        </div>
      </FieldRow>

      <FieldRow label="Company name">
        <Input value={company} onChange={(e) => setCompany(e.target.value)} />
      </FieldRow>

      <FieldRow label="Website">
        <Input value={website} onChange={(e) => setWebsite(e.target.value)} leftIcon="globe" />
      </FieldRow>

      <FieldRow label="VAT / Tax ID">
        <Input value={vat} onChange={(e) => setVat(e.target.value)} />
      </FieldRow>

      <FieldRow label="Registered address">
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
      </FieldRow>

      <FieldRow label="Default currency" helper="Quoted on new itineraries and invoices.">
        <Select value={currency} onChange={setCurrency} options={[
          { value: 'EUR', label: 'Euro (EUR)' },
          { value: 'USD', label: 'US Dollar (USD)' },
          { value: 'GBP', label: 'Pound Sterling (GBP)' },
          { value: 'JPY', label: 'Japanese Yen (JPY)' },
        ]} style={{ maxWidth: 280 }} />
      </FieldRow>

      <FieldRow label="Brand accent" helper="Used for buttons and links in shared itineraries.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {swatches.map(s => (
            <button key={s} onClick={() => setAccent(s)} style={{
              width: 32, height: 32, borderRadius: 8, cursor: 'pointer',
              background: s, border: 0,
              boxShadow: accent === s
                ? `0 0 0 2px #fff, 0 0 0 4px ${s}`
                : `inset 0 0 0 1px rgba(0,0,0,0.08)`,
            }} />
          ))}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            height: 32, padding: '0 12px', borderRadius: 6,
            border: `1px solid ${PSet.color.ink200}`, background: '#fff',
            fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, color: PSet.color.ink800,
          }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: accent }} />
            {accent}
          </div>
        </div>
      </FieldRow>
    </div>
  );
}

// ---------- Notifications section ----------
function NotificationsSection() {
  const initial = {
    bookingNew:        { email: true,  inapp: true  },
    bookingChange:     { email: true,  inapp: true  },
    paymentReceived:   { email: false, inapp: true  },
    paymentFailed:     { email: true,  inapp: true  },
    taskAssigned:      { email: false, inapp: true  },
    taskMention:       { email: true,  inapp: true  },
    weeklyDigest:      { email: true,  inapp: false },
    productUpdates:    { email: false, inapp: false },
  };
  const [prefs, setPrefs] = useStateSet(initial);
  const set = (key, ch, v) => setPrefs(p => ({ ...p, [key]: { ...p[key], [ch]: v } }));

  const groups = [
    {
      title: 'Bookings & itineraries',
      rows: [
        { key: 'bookingNew',     label: 'New booking received',          desc: 'When a client confirms a tour.' },
        { key: 'bookingChange',  label: 'Itinerary changed',             desc: 'When a teammate edits a confirmed tour.' },
      ],
    },
    {
      title: 'Payments',
      rows: [
        { key: 'paymentReceived', label: 'Payment received',             desc: 'Confirmation of incoming client payments.' },
        { key: 'paymentFailed',   label: 'Payment failed',               desc: 'Card declines or bank rejections.' },
      ],
    },
    {
      title: 'Team',
      rows: [
        { key: 'taskAssigned',   label: 'Task assigned to me',           desc: 'Someone hands off a task on a tour.' },
        { key: 'taskMention',    label: 'Mentions in comments',          desc: 'A teammate @-mentions you anywhere.' },
      ],
    },
    {
      title: 'Updates',
      rows: [
        { key: 'weeklyDigest',   label: 'Weekly digest',                 desc: 'Monday summary of upcoming tours.' },
        { key: 'productUpdates', label: 'Product news',                  desc: 'New features and changelog highlights.' },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 880 }}>
      <SectionHeader
        title="Notifications"
        subtitle="Choose where you'd like to be notified. In-app shows in the bell menu; email is delivered to matas@packyourtour.com."
      />

      {/* Channel header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 80px 80px',
        padding: '16px 0 8px', alignItems: 'center',
        fontFamily: PSet.font.sans, fontSize: 12, color: PSet.color.ink500,
        letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
      }}>
        <span />
        <span style={{ textAlign: 'center' }}>Email</span>
        <span style={{ textAlign: 'center' }}>In-app</span>
      </div>

      {groups.map(g => (
        <div key={g.title} style={{ marginBottom: 8 }}>
          <div style={{
            padding: '12px 0 6px',
            fontFamily: PSet.font.sans, fontSize: 13, fontWeight: 500,
            color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm,
          }}>{g.title}</div>
          {g.rows.map(r => (
            <div key={r.key} style={{
              display: 'grid', gridTemplateColumns: '1fr 80px 80px',
              padding: '14px 0', alignItems: 'center',
              borderTop: `1px solid ${PSet.color.ink150}`,
            }}>
              <div>
                <div style={{ fontSize: 14, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>
                  {r.label}
                </div>
                <div style={{ marginTop: 2, fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs }}>
                  {r.desc}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Toggle checked={prefs[r.key].email} onChange={(v) => set(r.key, 'email', v)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Toggle checked={prefs[r.key].inapp} onChange={(v) => set(r.key, 'inapp', v)} />
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 24 }}>
        <Button variant="subtle" size="md">Reset to defaults</Button>
        <Button variant="primary" size="md">Save preferences</Button>
      </div>
    </div>
  );
}

// ---------- Security section ----------
function SecuritySection() {
  return (
    <div style={{ maxWidth: 880 }}>
      <SectionHeader
        title="Security"
        subtitle="Manage how you sign in and review devices that have access to your account."
      />

      <FieldRow label="Password" helper="Last changed 3 months ago.">
        <Button variant="outlined" size="md" icon="key">Change password</Button>
      </FieldRow>

      <FieldRow label="Danger zone" helper="Permanently delete your account and all owned tours.">
        <Button variant="outlined" size="md" icon="trash"
          style={{ color: PSet.color.red600, borderColor: 'rgb(255,200,202)' }}>
          Delete account
        </Button>
      </FieldRow>
    </div>
  );
}

// ---------- Team section (compact) ----------
function TeamSection() {
  const team = [
    { initials: 'MJ', name: 'Matas Jonėnas',   email: 'matas@packyourtour.com',   role: 'Owner',  status: 'Active', palette: 0 },
    { initials: 'AL', name: 'Aušra Liutkutė',  email: 'ausra@packyourtour.com',   role: 'Admin',  status: 'Active', palette: 3 },
    { initials: 'TK', name: 'Tomas Kazlauskas',email: 'tomas@packyourtour.com',   role: 'Editor', status: 'Active', palette: 4 },
    { initials: 'EP', name: 'Eglė Paulauskaitė',email:'egle@packyourtour.com',    role: 'Editor', status: 'Active', palette: 1 },
    { initials: 'NB', name: 'Nora Brazauskaitė',email:'nora@packyourtour.com',    role: 'Viewer', status: 'Invited', palette: 2 },
  ];

  return (
    <div style={{ maxWidth: 880 }}>
      <SectionHeader
        title="Team members"
        subtitle="Invite teammates and assign roles. Manage role permissions in Roles & permissions."
        action={<Button variant="primary" size="md" icon="plus">Invite teammate</Button>}
      />

      <div style={{
        marginTop: 16,
        border: `1px solid ${PSet.color.ink200}`, borderRadius: 8, overflow: 'hidden', background: '#fff',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 32px',
          padding: '10px 16px', background: PSet.color.ink100,
          fontFamily: PSet.font.sans, fontSize: 12, color: PSet.color.ink600,
          letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
        }}>
          <span>Member</span><span>Role</span><span>Status</span><span />
        </div>
        {team.map((m, i) => (
          <div key={m.email} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 32px',
            padding: '12px 16px', alignItems: 'center',
            borderTop: `1px solid ${PSet.color.ink150}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
              <Avatar initials={m.initials} size={32} palette={m.palette} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                <div style={{ fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.email}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>{m.role}</div>
            <div>
              <Tag variant={m.status === 'Active' ? 'success' : 'warning'}>{m.status}</Tag>
            </div>
            <div>
              <IconButton name="more" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Billing email helper ----------
function BillingEmailField() {
  const [v, setV] = useStateSet('billing@packyourtour.com');
  return <Input value={v} onChange={(e) => setV(e.target.value)} leftIcon="mail" style={{ maxWidth: 360 }} />;
}

// ---------- Billing (lightweight stub) ----------
function BillingSection() {
  const currentPlanId = 'studio';
  const plans = [
    {
      id: 'starter', name: 'Starter', price: 29, blurb: 'For solo operators just getting started.',
      seats: '1 seat', features: ['Up to 25 active tours', 'Client portal', 'Email support', 'Basic templates'],
    },
    {
      id: 'studio', name: 'Studio', price: 89, blurb: 'Built for small teams running tours full-time.',
      seats: 'Up to 10 seats', features: ['Unlimited tours', 'Custom branding', 'Stripe payments', 'Priority support', 'API access'],
      popular: true,
    },
    {
      id: 'agency', name: 'Agency', price: 249, blurb: 'For tour agencies with multiple operators.',
      seats: 'Up to 50 seats', features: ['Everything in Studio', 'Multi-brand workspaces', 'SSO (SAML)', 'Audit log', 'Dedicated success manager'],
    },
    {
      id: 'enterprise', name: 'Enterprise', price: null, blurb: 'For organisations with custom needs.',
      seats: 'Unlimited seats', features: ['Everything in Agency', 'Custom contracts', 'Onboarding & training', '99.9% uptime SLA', 'Security review'],
    },
  ];

  return (
    <div style={{ maxWidth: 1080 }}>
      <SectionHeader
        title="Billing & plan"
        subtitle="Manage your subscription, payment method, and download invoices."
      />

      {/* Current plan card */}
      <div style={{
        marginTop: 24,
        border: `1px solid ${PSet.color.ink200}`, borderRadius: 12, padding: 24,
        background: `linear-gradient(135deg, ${PSet.color.brand50} 0%, #fff 60%)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <Tag variant="brand" dot={false}>Current plan</Tag>
            <div style={{ marginTop: 10, fontFamily: PSet.font.sans, fontSize: 24, fontWeight: 500, color: PSet.color.ink900 }}>
              Studio
            </div>
            <div style={{ marginTop: 4, fontSize: 13, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.sm }}>
              €89 / month · Renews on May 14, 2026 · 5 of 10 seats used
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <Button variant="outlined" size="md" style={{ whiteSpace: 'nowrap' }}>Manage seats</Button>
            <Button variant="subtle"  size="md" style={{ whiteSpace: 'nowrap', color: PSet.color.red600 }}>Cancel plan</Button>
          </div>
        </div>
      </div>

      {/* Compare plans */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginTop: 32, paddingBottom: 12,
      }}>
        <div>
          <h3 style={{ margin: 0, fontFamily: PSet.font.sans, fontSize: 18, fontWeight: 500, color: PSet.color.ink900 }}>
            Compare plans
          </h3>
          <div style={{ marginTop: 4, fontSize: 13, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.sm }}>
            Switch any time. Upgrades are prorated against your current cycle.
          </div>
        </div>
        <div style={{
          display: 'inline-flex', padding: 4, borderRadius: 8,
          background: PSet.color.ink100, fontFamily: PSet.font.sans, fontSize: 13,
        }}>
          <span style={{ padding: '6px 12px', borderRadius: 6, background: '#fff', boxShadow: PSet.shadow.card, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>Monthly</span>
          <span style={{ padding: '6px 12px', borderRadius: 6, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.sm, cursor: 'pointer' }}>Yearly · save 20%</span>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'stretch',
      }}>
        {plans.map(p => {
          const current = p.id === currentPlanId;
          return (
            <div key={p.id} style={{
              display: 'flex', flexDirection: 'column',
              padding: 20, borderRadius: 12, background: '#fff',
              border: `1px solid ${current ? PSet.color.brand500 : PSet.color.ink200}`,
              boxShadow: current ? PSet.shadow.focus : 'none',
              position: 'relative',
            }}>
              {p.popular && !current && (
                <div style={{ position: 'absolute', top: -10, left: 16 }}>
                  <Tag variant="brand" dot={false}>Most popular</Tag>
                </div>
              )}
              {current && (
                <div style={{ position: 'absolute', top: -10, left: 16 }}>
                  <Tag variant="success" dot={false}>Current</Tag>
                </div>
              )}
              <div style={{ fontFamily: PSet.font.sans, fontSize: 16, fontWeight: 500, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>
                {p.name}
              </div>
              <div style={{ marginTop: 4, fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs, lineHeight: '16px', minHeight: 32 }}>
                {p.blurb}
              </div>
              <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                {p.price === null ? (
                  <span style={{ fontFamily: PSet.font.sans, fontSize: 24, fontWeight: 500, color: PSet.color.ink900 }}>Custom</span>
                ) : (
                  <>
                    <span style={{ fontFamily: PSet.font.sans, fontSize: 28, fontWeight: 500, color: PSet.color.ink900, letterSpacing: '-0.01em' }}>€{p.price}</span>
                    <span style={{ fontSize: 13, color: PSet.color.ink600 }}>/ month</span>
                  </>
                )}
              </div>
              <div style={{ marginTop: 4, fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs }}>
                {p.seats}
              </div>
              <div style={{ height: 1, background: PSet.color.ink150, margin: '16px 0' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {p.features.map(f => (
                  <li key={f} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    fontFamily: PSet.font.sans, fontSize: 13, color: PSet.color.ink800,
                    letterSpacing: PSet.font.tracking.sm, lineHeight: '18px',
                  }}>
                    <span style={{ color: PSet.color.brand500, marginTop: 2, flexShrink: 0 }}>
                      <Icon name="check2" size={14} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 20 }}>
                {current ? (
                  <Button variant="outlined" size="md" disabled style={{ width: '100%', justifyContent: 'center' }}>Current plan</Button>
                ) : p.price === null ? (
                  <Button variant="outlined" size="md" style={{ width: '100%', justifyContent: 'center' }}>Contact sales</Button>
                ) : (
                  <Button variant={p.popular ? 'primary' : 'outlined'} size="md" style={{ width: '100%', justifyContent: 'center' }}>
                    {plans.findIndex(x => x.id === p.id) > plans.findIndex(x => x.id === currentPlanId) ? 'Upgrade' : 'Switch'}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <FieldRow label="Payment method" helper="Card on file for monthly billing.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '10px 14px', borderRadius: 8,
            border: `1px solid ${PSet.color.ink200}`, background: '#fff',
          }}>
            <span style={{
              width: 36, height: 24, borderRadius: 4,
              background: 'linear-gradient(135deg,#1a1f71,#3949ab)', color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: PSet.font.sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
            }}>VISA</span>
            <div>
              <div style={{ fontSize: 14, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>Visa ending in 4242</div>
              <div style={{ fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs }}>Expires 09/27</div>
            </div>
          </div>
          <Button variant="subtle" size="md">Update</Button>
        </div>
      </FieldRow>

      <FieldRow label="Billing email" helper="Invoices and receipts are sent here.">
        <BillingEmailField />
      </FieldRow>

      <FieldRow label="Invoices">
        <div style={{ border: `1px solid ${PSet.color.ink200}`, borderRadius: 8, overflow: 'hidden' }}>
          {[
            { d: 'Apr 14, 2026', a: '€89.00', n: 'INV-2026-04' },
            { d: 'Mar 14, 2026', a: '€89.00', n: 'INV-2026-03' },
            { d: 'Feb 14, 2026', a: '€89.00', n: 'INV-2026-02' },
          ].map((inv, i) => (
            <div key={inv.n} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto',
              padding: '12px 16px', alignItems: 'center', gap: 12,
              borderTop: i === 0 ? 0 : `1px solid ${PSet.color.ink150}`,
              background: '#fff',
            }}>
              <span style={{ fontSize: 14, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>{inv.d}</span>
              <span style={{ fontSize: 14, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>{inv.n}</span>
              <span style={{ fontSize: 14, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>{inv.a}</span>
              <Button variant="subtle" size="sm" icon="download">PDF</Button>
            </div>
          ))}
        </div>
      </FieldRow>
    </div>
  );
}

// ---------- Roles & permissions section ----------
function RolesSection() {
  const roleList = [
    { id: 'Owner',  desc: 'Full access. Cannot be removed or restricted.',         members: 1, locked: true },
    { id: 'Admin',  desc: 'Manages the workspace, team, and billing.',             members: 1, locked: false },
    { id: 'Editor', desc: 'Builds and runs tours, but cannot manage the team.',    members: 2, locked: false },
    { id: 'Viewer', desc: 'Read-only access to tours and clients.',                members: 1, locked: false },
  ];

  const groups = [
    {
      label: 'Tours',
      perms: [
        { key: 'View tours',          desc: 'See itineraries owned by anyone in the workspace.' },
        { key: 'Create & edit tours', desc: 'Build new tours and modify drafts and active tours.' },
        { key: 'Publish tours',       desc: 'Mark a tour as confirmed and visible to clients.' },
        { key: 'Delete tours',        desc: 'Permanently remove tours from the workspace.' },
      ],
    },
    {
      label: 'Clients',
      perms: [
        { key: 'Manage clients',      desc: 'Add, edit, and archive client records.' },
        { key: 'Send client emails',  desc: 'Send itineraries and reminders from your domain.' },
      ],
    },
    {
      label: 'Workspace',
      perms: [
        { key: 'Invite teammates',    desc: 'Send invitations to new team members.' },
        { key: 'Manage roles',        desc: 'Edit role permissions and assign roles.' },
        { key: 'Manage billing',      desc: 'Change plan, update payment, view invoices.' },
        { key: 'View audit log',      desc: 'Review every change made in the workspace.' },
      ],
    },
  ];

  const initial = {
    'View tours':            { Owner: true, Admin: true,  Editor: true,  Viewer: true  },
    'Create & edit tours':   { Owner: true, Admin: true,  Editor: true,  Viewer: false },
    'Publish tours':         { Owner: true, Admin: true,  Editor: false, Viewer: false },
    'Delete tours':          { Owner: true, Admin: true,  Editor: false, Viewer: false },
    'Manage clients':        { Owner: true, Admin: true,  Editor: true,  Viewer: false },
    'Send client emails':    { Owner: true, Admin: true,  Editor: true,  Viewer: false },
    'Invite teammates':      { Owner: true, Admin: true,  Editor: false, Viewer: false },
    'Manage roles':          { Owner: true, Admin: false, Editor: false, Viewer: false },
    'Manage billing':        { Owner: true, Admin: true,  Editor: false, Viewer: false },
    'View audit log':        { Owner: true, Admin: true,  Editor: false, Viewer: false },
  };
  const [perms, setPerms] = useStateSet(initial);
  const [selected, setSelected] = useStateSet('Editor');

  const totalPerms = Object.keys(perms).length;
  const onCount = (role) => Object.values(perms).filter(p => p[role]).length;

  const toggle = (perm) => {
    if (selected === 'Owner') return;
    setPerms(p => ({ ...p, [perm]: { ...p[perm], [selected]: !p[perm][selected] } }));
  };

  const selRole = roleList.find(r => r.id === selected);
  const isOwner = selected === 'Owner';

  return (
    <div style={{ maxWidth: 1080 }}>
      <SectionHeader
        title="Roles & permissions"
        subtitle="Pick a role on the left, then toggle what people in that role can do. Changes apply immediately to everyone with that role."
        action={<Button variant="outlined" size="md" icon="plus">New role</Button>}
      />

      <div style={{
        marginTop: 20, display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16,
        alignItems: 'flex-start',
      }}>
        {/* Left: role list */}
        <div style={{
          border: `1px solid ${PSet.color.ink200}`, borderRadius: 10, overflow: 'hidden', background: '#fff',
        }}>
          <div style={{
            padding: '10px 14px', background: PSet.color.ink100,
            fontFamily: PSet.font.sans, fontSize: 11, color: PSet.color.ink600,
            letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
          }}>
            Roles
          </div>
          {roleList.map((r, i) => {
            const on = selected === r.id;
            return (
              <button key={r.id} onClick={() => setSelected(r.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '14px 14px', cursor: 'pointer', border: 0,
                  borderTop: i === 0 ? 0 : `1px solid ${PSet.color.ink150}`,
                  background: on ? PSet.color.brand50 : '#fff',
                  borderLeft: on ? `3px solid ${PSet.color.brand500}` : '3px solid transparent',
                  fontFamily: PSet.font.sans,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: on ? PSet.color.brand600 : PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>
                    {r.id}
                  </span>
                  {r.locked
                    ? <Tag variant="neutral" dot={false}>Locked</Tag>
                    : <span style={{ fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs }}>
                        {onCount(r.id)}/{totalPerms}
                      </span>}
                </div>
                <div style={{ marginTop: 4, fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs, lineHeight: '16px' }}>
                  {r.desc}
                </div>
                <div style={{ marginTop: 6, fontSize: 12, color: PSet.color.ink500, letterSpacing: PSet.font.tracking.xs }}>
                  {r.members} {r.members === 1 ? 'member' : 'members'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: permissions detail */}
        <div style={{
          border: `1px solid ${PSet.color.ink200}`, borderRadius: 10, background: '#fff',
        }}>
          <div style={{
            padding: '16px 20px', borderBottom: `1px solid ${PSet.color.ink150}`,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
          }}>
            <div>
              <div style={{ fontFamily: PSet.font.sans, fontSize: 16, fontWeight: 500, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>
                {selected} permissions
              </div>
              <div style={{ marginTop: 2, fontSize: 13, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.sm, lineHeight: '18px' }}>
                {selRole.desc} {isOwner && 'This role always has every permission.'}
              </div>
            </div>
            <div style={{ flexShrink: 0, fontSize: 13, color: PSet.color.ink600, whiteSpace: 'nowrap' }}>
              <span style={{ color: PSet.color.ink900, fontWeight: 500 }}>{onCount(selected)}</span> of {totalPerms} enabled
            </div>
          </div>

          {groups.map(g => (
            <div key={g.label} style={{ padding: '8px 20px 4px' }}>
              <div className="caps" style={{
                padding: '12px 0 4px', fontFamily: PSet.font.sans,
                fontSize: 11, color: PSet.color.ink500, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontWeight: 500,
              }}>
                {g.label}
              </div>
              {g.perms.map(p => {
                const on = perms[p.key][selected];
                return (
                  <div key={p.key} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    padding: '12px 0', alignItems: 'center', gap: 16,
                    borderTop: `1px solid ${PSet.color.ink150}`,
                  }}>
                    <div>
                      <div style={{ fontFamily: PSet.font.sans, fontSize: 14, color: PSet.color.ink900, letterSpacing: PSet.font.tracking.sm }}>
                        {p.key}
                      </div>
                      <div style={{ marginTop: 2, fontSize: 12, color: PSet.color.ink600, letterSpacing: PSet.font.tracking.xs, lineHeight: '16px' }}>
                        {p.desc}
                      </div>
                    </div>
                    <div style={{ opacity: isOwner ? 0.5 : 1, pointerEvents: isOwner ? 'none' : 'auto' }}>
                      <Toggle checked={on} onChange={() => toggle(p.key)} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          <div style={{
            display: 'flex', justifyContent: 'flex-end', gap: 8,
            padding: '16px 20px', borderTop: `1px solid ${PSet.color.ink150}`,
          }}>
            <Button variant="subtle" size="md">Reset to defaults</Button>
            <Button variant="primary" size="md" disabled={isOwner}>Save permissions</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Settings root ----------
function Settings() {
  const [active, setActive] = useStateSet('profile');
  const sections = {
    profile:       <ProfileSection />,
    notifications: <NotificationsSection />,
    security:      <SecuritySection />,
    company:       <CompanySection />,
    team:          <TeamSection />,
    roles:         <RolesSection />,
    billing:       <BillingSection />,
  };
  return (
    <div data-screen-label="Settings" style={{ display: 'flex', height: '100%' }}>
      <SettingsNav active={active} onSelect={setActive} />
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        {sections[active]}
      </div>
    </div>
  );
}

Object.assign(window, { Settings, ProfileSection, NotificationsSection, SecuritySection, CompanySection, TeamSection, RolesSection, BillingSection });
