/* global React */
const { useState } = React;
const P = window.PYT;

// ---------- Icon (lucide-style inline stroke) ----------
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.75 }) {
  const paths = {
    plus: <><path d="M12 5v14M5 12h14"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    chevDown: <><path d="M6 9l6 6 6-6"/></>,
    chevLeft: <><path d="M15 18l-6-6 6-6"/></>,
    chevRight: <><path d="M9 6l6 6-6 6"/></>,
    more: <><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></>,
    filter: <><path d="M3 6h18M6 12h12M10 18h4"/></>,
    columns: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/></>,
    itinerary: <><path d="M3 7h13M3 12h18M3 17h10"/><circle cx="20" cy="7" r="1"/><circle cx="18" cy="17" r="1"/></>,
    orders: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></>,
    users: <><circle cx="9" cy="8" r="4"/><path d="M2 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/><path d="M22 20c0-2.9-1.8-5.5-4.5-6.5"/></>,
    gear: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>,
    hideMenu: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></>,
    plane: <><path d="M2 16l20-8-9 12-2-6-9-4z"/></>,
    hotel: <><path d="M3 21V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13"/><path d="M3 13h18M7 9v4M17 9v4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></>,
    x: <><path d="M18 6L6 18M6 6l12 12"/></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    google: <><path d="M21.35 11.1H12v3.8h5.37c-.23 1.46-1.8 4.3-5.37 4.3a6.2 6.2 0 0 1 0-12.4 5.5 5.5 0 0 1 3.9 1.5l2.65-2.55A9.5 9.5 0 0 0 12 3a9 9 0 1 0 0 18c5.2 0 8.6-3.65 8.6-8.78 0-.6-.07-1.04-.15-1.52z" fill="currentColor" stroke="none"/></>,
    shield:  <><path d="M12 3l8 3v6c0 4.5-3.2 8.5-8 9-4.8-.5-8-4.5-8-9V6l8-3z"/></>,
    trash:   <><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14"/></>,
    send:    <><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></>,
    check2:  <><path d="M20 6L9 17l-5-5"/></>,
    key:     <><circle cx="7" cy="15" r="4"/><path d="M10 12l10-10 3 3-3 3 2 2-2 2-2-2-3 3"/></>,
    info:    <><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M12 11v5"/></>,
    bed:     <><path d="M3 18v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"/><path d="M3 14h18"/><path d="M7 10h3"/><path d="M3 21v-3M21 21v-3"/></>,
    planeTakeoff: <><path d="M22 17H2"/><path d="M6.36 13.5l-3.1-5.36 1.9-.5 2.31 2.05 4.84-1.3-3.2-5.53 2.26-.6 5.3 5.06 4.25-1.14a1.73 1.73 0 0 1 .91 3.34L6.36 13.5z"/></>,
    globe:   <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    sparkles: <><path d="M12 3l1.9 4.6L18 9.5l-4.1 1.9L12 16l-1.9-4.6L6 9.5l4.1-1.9z"/><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></>,
    pin:     <><path d="M12 22s-7-7.5-7-13a7 7 0 0 1 14 0c0 5.5-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/></>,
    drag:    <><circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/></>,
    clock:   <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    car:     <><path d="M4 15h16"/><path d="M5 15l1.5-5a2 2 0 0 1 2-1.5h7a2 2 0 0 1 2 1.5L19 15v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4z"/><circle cx="7.5" cy="16.5" r="0.8"/><circle cx="16.5" cy="16.5" r="0.8"/></>,
    van:     <><path d="M2 16V9a2 2 0 0 1 2-2h9l5 4h2a2 2 0 0 1 2 2v3"/><path d="M2 16h20"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
    swap:    <><path d="M7 10h14M7 10l4-4M7 10l4 4"/><path d="M17 14H3M17 14l-4-4M17 14l-4 4"/></>,
    dollar:  <><path d="M12 2v20"/><path d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    pencil:  <><path d="M17 3l4 4-12 12H5v-4L17 3z"/><path d="M14 6l4 4"/></>,
    copy:    <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></>,
    chevUp:  <><path d="M18 15l-6-6-6 6"/></>,
    insertAbove: <><path d="M12 20v-8"/><path d="M8 16l4 4 4-4"/><rect x="4" y="4" width="16" height="4" rx="1"/></>,
    insertBelow: <><path d="M12 4v8"/><path d="M8 8l4-4 4 4"/><rect x="4" y="16" width="16" height="4" rx="1"/></>,
    expandAll: <><path d="M4 4h16"/><path d="M4 20h16"/><path d="M9 10l3-3 3 3"/><path d="M9 14l3 3 3-3"/></>,
    collapseAll: <><path d="M4 12h16"/><path d="M9 8l3 3 3-3"/><path d="M9 16l3-3 3 3"/></>,
    eraser:  <><path d="M18 13l-6-6-9 9 4 4h9l8-8-6-6"/><path d="M10 21H7"/></>,
    image:   <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5-11 11"/></>,
    close:   <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>,
    download: <><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></>,
    share:   <><path d="M12 3v13"/><path d="M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

// ---------- Button ----------
function Button({ variant = 'primary', size = 'md', icon, iconRight, children, onClick, style, disabled }) {
  const sizes = {
    lg: { padding: '10px 16px', fontSize: 14, lineHeight: '20px' },
    md: { padding: '6px 12px',  fontSize: 14, lineHeight: '20px' },
    sm: { padding: '4px 10px',  fontSize: 12, lineHeight: '16px' },
  };
  const variants = {
    primary: {
      color: '#fff',
      background: `linear-gradient(${P.color.brand500} 0%, ${P.color.brand600} 100%)`,
      boxShadow: P.shadow.primary,
      border: 0,
    },
    outlined: {
      color: P.color.ink900,
      background: P.color.white,
      border: `1px solid ${P.color.ink300}`,
    },
    subtle: { color: P.color.ink900, background: 'transparent', border: 0 },
    danger: { color: '#fff', background: P.color.red600, border: 0 },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: P.font.sans, letterSpacing: P.font.tracking.sm,
        opacity: disabled ? 0.5 : 1,
        ...sizes[size], ...variants[variant], ...style,
      }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
    </button>
  );
}

// ---------- Input ----------
function Input({ label, required, value, onChange, placeholder, helper, error, leftIcon, style }) {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: P.font.sans, ...style }}>
      {label && (
        <span style={{ fontSize: 14, color: P.color.ink800, letterSpacing: P.font.tracking.sm, display:'flex', gap:4 }}>
          {label}{required && <span style={{ color: P.color.red600, fontWeight: 500 }}>*</span>}
        </span>
      )}
      <div style={{
        position:'relative',
        display: 'flex', alignItems: 'center', gap: 6,
        height: 40, padding: `0 12px 0 ${leftIcon ? 34 : 12}px`,
        borderRadius: 6, background: '#fff',
        border: `1px solid ${error ? P.color.red600 : focused ? P.color.brand500 : P.color.ink200}`,
        boxShadow: focused ? P.shadow.focus : 'none',
      }}>
        {leftIcon && <span style={{ position: 'absolute', left: 10, color: P.color.ink600, display:'flex' }}>
          <Icon name={leftIcon} size={16} />
        </span>}
        <input value={value ?? ''} onChange={onChange}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            fontFamily: P.font.sans, fontSize: 14, color: P.color.ink900,
            letterSpacing: P.font.tracking.sm,
          }} />
      </div>
      {helper && <span style={{ fontSize: 12, color: error ? P.color.red600 : P.color.ink600, letterSpacing: P.font.tracking.xs, lineHeight: '16px' }}>{helper}</span>}
    </label>
  );
}

// ---------- Tag ----------
function Tag({ variant = 'neutral', dot = true, children, size = 'sm' }) {
  const variants = {
    success:   { bg: P.color.green100, fg: P.color.green800, dot: P.color.green600 },
    warning:   { bg: '#FFF0C2',       fg: '#6b4a00',         dot: '#d9a400' },
    danger:    { bg: '#FFDCDD',        fg: '#7c1318',         dot: P.color.red600 },
    info:      { bg: '#DCEAFF',        fg: '#003D82',         dot: P.color.blue500 },
    neutral:   { bg: P.color.ink150,  fg: P.color.ink800,    dot: P.color.ink500 },
    brand:     { bg: P.color.brand50, fg: P.color.brand600,  dot: P.color.brand500 },
  };
  const v = variants[variant];
  const sz = size === 'md' ? { fontSize: 13, padding: '4px 10px' } : { fontSize: 12, padding: '2px 10px', lineHeight: '16px' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      borderRadius: 999, background: v.bg, color: v.fg,
      letterSpacing: P.font.tracking.xs, fontFamily: P.font.sans,
      paddingLeft: dot ? 6 : sz.padding.split(' ')[1], ...sz,
    }}>
      {dot && <span style={{ width: 8, height: 8, borderRadius: '50%', background: v.dot }} />}
      {children}
    </span>
  );
}

// ---------- Avatar ----------
function Avatar({ initials, size = 32, palette = 0 }) {
  const palettes = [
    { bg: 'rgb(233,233,233)', fg: P.color.ink900 },
    { bg: '#FFE4B8',          fg: '#6b4200' },
    { bg: '#DCEAFF',          fg: '#003D82' },
    { bg: '#F5D9F2',          fg: '#6a2764' },
    { bg: '#D6F5DB',          fg: P.color.green800 },
  ];
  const p = palettes[palette % palettes.length];
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%',
      background: p.bg, color: p.fg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: P.font.sans, fontSize: size <= 32 ? 14 : 20,
      fontWeight: size >= 48 ? 500 : 400, letterSpacing: P.font.tracking.sm,
      flexShrink: 0,
    }}>{initials}</span>
  );
}

// ---------- IconButton ----------
function IconButton({ name, onClick, size = 'md', variant = 'subtle' }) {
  const box = size === 'sm' ? 28 : 32;
  const iconSize = size === 'sm' ? 14 : 16;
  const bg = variant === 'outlined' ? P.color.white : 'transparent';
  const border = variant === 'outlined' ? `1px solid ${P.color.ink300}` : '0';
  return (
    <button onClick={onClick} style={{
      width: box, height: box, borderRadius: 6, border, background: bg,
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      cursor:'pointer', color: P.color.ink800,
    }}>
      <Icon name={name} size={iconSize} />
    </button>
  );
}

Object.assign(window, { Icon, Button, Input, Tag, Avatar, IconButton });
