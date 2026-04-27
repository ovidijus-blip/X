/* global React, Icon, Button, IconButton, Tag */
const { useState: useStateI, useEffect: useEffectI, useRef: useRefI } = React;
const PI = window.PYT;

// ===========================================================================
// Tweakable defaults — edited via the "Tweaks" panel (persisted to disk)
// ===========================================================================
window.TWEAKS = window.TWEAKS || /*EDITMODE-BEGIN*/{
  "menuStyle": "simple",
  "showShortcuts": true,
  "dimBackdrop": false,
  "accentIcons": true
}/*EDITMODE-END*/;

// ===========================================================================
// Add Item menu — two visual variants, both trigger the same onPick callback
// ===========================================================================
function AddItemMenu({ anchor, onPick, onClose, style, showShortcuts, accentIcons }) {
  const ref = useRefI(null);
  useEffectI(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) onClose(); }
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const items = [
    {
      id: 'accommodation',
      title: 'Accommodation',
      icon: 'bed',
      desc: 'Hotel, guesthouse, or overnight stay',
      shortcut: 'A',
      tint: { bg: 'rgb(238, 237, 255)', fg: PI.color.brand500 }, // brand-50
    },
    {
      id: 'flight',
      title: 'Flight',
      icon: 'planeTakeoff',
      desc: 'Airline, route, and times',
      shortcut: 'F',
      tint: { bg: 'rgb(220, 234, 255)', fg: 'rgb(0, 92, 204)' }, // info-ish
    },
    {
      id: 'transfer',
      title: 'Transfer',
      icon: 'car',
      desc: 'Ground transport between locations',
      shortcut: 'T',
      tint: { bg: 'rgb(220, 245, 230)', fg: 'rgb(10, 120, 70)' }, // success-ish
    },
  ];

  if (style === 'cards') {
    return (
      <div ref={ref} style={{
        position: 'absolute', top: anchor.top, left: anchor.left,
        zIndex: 60, width: 480,
        background: PI.color.white, borderRadius: 12,
        border: `1px solid ${PI.color.ink200}`,
        boxShadow: '0 12px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
        padding: 12, animation: 'pytFadeDown 120ms ease-out',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '4px 6px 10px',
        }}>
          <span style={{ fontSize: 12, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase' }}>
            Add to this day
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {items.map(it => (
            <button key={it.id} onClick={() => onPick(it.id)}
              onMouseEnter={e => e.currentTarget.style.borderColor = PI.color.brand500}
              onMouseLeave={e => e.currentTarget.style.borderColor = PI.color.ink200}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
                padding: 12, borderRadius: 10,
                background: PI.color.white,
                border: `1px solid ${PI.color.ink200}`,
                cursor: 'pointer', textAlign: 'left',
                fontFamily: PI.font.sans,
                transition: 'border-color 120ms ease-out, background 120ms ease-out',
              }}>
              <span style={{
                width: 36, height: 36, borderRadius: 8,
                background: accentIcons ? it.tint.bg : PI.color.ink100,
                color: accentIcons ? it.tint.fg : PI.color.ink800,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={it.icon} size={20} strokeWidth={1.75} />
              </span>
              <span style={{ fontSize: 14, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
                {it.title}
              </span>
              <span style={{ fontSize: 12, color: PI.color.ink600, lineHeight: '16px', letterSpacing: PI.font.tracking.xs }}>
                {it.desc}
              </span>
              {showShortcuts && (
                <span style={{
                  marginTop: 2,
                  fontSize: 11, color: PI.color.ink600,
                  background: PI.color.ink100, border: `1px solid ${PI.color.ink200}`,
                  borderRadius: 4, padding: '1px 6px', letterSpacing: PI.font.tracking.xs,
                }}>{it.shortcut}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Simple dropdown (default)
  return (
    <div ref={ref} style={{
      position: 'absolute', top: anchor.top, left: anchor.left,
      zIndex: 60, width: 260,
      background: PI.color.white, borderRadius: 8,
      border: `1px solid ${PI.color.ink200}`,
      boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.04)',
      padding: 4, animation: 'pytFadeDown 120ms ease-out',
    }}>
      {items.map(it => (
        <button key={it.id} onClick={() => onPick(it.id)}
          onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: 6,
            background: 'transparent', border: 0, cursor: 'pointer',
            textAlign: 'left', fontFamily: PI.font.sans,
            color: PI.color.ink900,
            transition: 'background 100ms ease-out',
          }}>
          <span style={{
            width: 28, height: 28, borderRadius: 6,
            background: accentIcons ? it.tint.bg : PI.color.ink100,
            color: accentIcons ? it.tint.fg : PI.color.ink800,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon name={it.icon} size={16} strokeWidth={1.75} />
          </span>
          <span style={{ flex: 1, fontSize: 14, letterSpacing: PI.font.tracking.sm }}>
            {it.title}
          </span>
          {showShortcuts && (
            <span style={{
              fontSize: 11, color: PI.color.ink600,
              background: PI.color.ink100, border: `1px solid ${PI.color.ink200}`,
              borderRadius: 4, padding: '1px 6px', letterSpacing: PI.font.tracking.xs,
            }}>{it.shortcut}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ===========================================================================
// Item cards that appear after picking a type
// ===========================================================================
// ===========================================================================
// My Library — saved accommodations the operator re-uses across tours
// ===========================================================================
const DEFAULT_HOTEL_LIBRARY = [
  { id: 'h1', name: 'Park Hyatt Tokyo',       city: 'Shinjuku, Tokyo',   stars: 5, lastUsed: '2 days ago' },
  { id: 'h2', name: 'Hoshinoya Kyoto',        city: 'Arashiyama, Kyoto', stars: 5, lastUsed: '1 week ago' },
  { id: 'h3', name: 'Hotel Granvia Osaka',    city: 'Umeda, Osaka',      stars: 4, lastUsed: '3 weeks ago' },
  { id: 'h4', name: 'Ryokan Sanga',           city: 'Hakone',            stars: 4, lastUsed: '1 month ago' },
  { id: 'h5', name: 'The Tokyo Station Hotel',city: 'Marunouchi, Tokyo', stars: 5, lastUsed: '2 months ago' },
  { id: 'h6', name: 'Kagaya Wakura Onsen',    city: 'Ishikawa',          stars: 5, lastUsed: '3 months ago' },
];
let HOTEL_LIBRARY = DEFAULT_HOTEL_LIBRARY;

// System-wide hotel catalog — the "browse list" source. In a real app this
// would be fetched; here it's a static fixture to mock the UX.
const EXTERNAL_HOTEL_CATALOG = [
  { id: 'x1',  name: 'Mandarin Oriental Tokyo',   city: 'Nihonbashi, Tokyo',     stars: 5, rate: '$620/night',  rooms: 178 },
  { id: 'x2',  name: 'Aman Tokyo',                 city: 'Otemachi, Tokyo',       stars: 5, rate: '$1,240/night',rooms: 84 },
  { id: 'x3',  name: 'The Peninsula Tokyo',        city: 'Marunouchi, Tokyo',     stars: 5, rate: '$780/night',  rooms: 314 },
  { id: 'x4',  name: 'Shangri-La Tokyo',           city: 'Marunouchi, Tokyo',     stars: 5, rate: '$690/night',  rooms: 200 },
  { id: 'x5',  name: 'Hotel Gracery Shinjuku',     city: 'Shinjuku, Tokyo',       stars: 3, rate: '$145/night',  rooms: 970 },
  { id: 'x6',  name: 'Tokyu Stay Shibuya',         city: 'Shibuya, Tokyo',        stars: 3, rate: '$160/night',  rooms: 125 },
  { id: 'x7',  name: 'The Ritz-Carlton Kyoto',     city: 'Kamogawa, Kyoto',       stars: 5, rate: '$850/night',  rooms: 134 },
  { id: 'x8',  name: 'Four Seasons Kyoto',         city: 'Higashiyama, Kyoto',    stars: 5, rate: '$910/night',  rooms: 123 },
  { id: 'x9',  name: 'Kyoto Granbell Hotel',       city: 'Gion, Kyoto',           stars: 4, rate: '$215/night',  rooms: 105 },
  { id: 'x10', name: 'Conrad Osaka',               city: 'Nakanoshima, Osaka',    stars: 5, rate: '$440/night',  rooms: 164 },
  { id: 'x11', name: 'Cross Hotel Osaka',          city: 'Namba, Osaka',          stars: 4, rate: '$190/night',  rooms: 226 },
  { id: 'x12', name: 'Gora Kadan',                 city: 'Hakone',                stars: 5, rate: '$720/night',  rooms: 38 },
  { id: 'x13', name: 'Hakone Yumoto Onsen Tenseien',city: 'Hakone',               stars: 4, rate: '$260/night',  rooms: 97 },
  { id: 'x14', name: 'Tokyo Bay Ariake Washington', city: 'Koto, Tokyo',          stars: 3, rate: '$130/night',  rooms: 839 },
];

const libSubscribers = new Set();
function notifyLib() { libSubscribers.forEach(fn => fn()); }
function saveHotelToLibrary(hotel) {
  // dedupe by lowercase name
  const key = (hotel.name || '').toLowerCase().trim();
  if (!key) return null;
  const existing = HOTEL_LIBRARY.find(h => h.name.toLowerCase() === key);
  if (existing) return existing;
  const entry = {
    id: 'h' + Date.now().toString(36),
    name: hotel.name,
    city: hotel.city || '',
    stars: hotel.stars || 0,
    lastUsed: 'Just now',
  };
  HOTEL_LIBRARY = [entry, ...HOTEL_LIBRARY];
  notifyLib();
  return entry;
}
function removeHotelFromLibrary(id) {
  HOTEL_LIBRARY = HOTEL_LIBRARY.filter(h => h.id !== id);
  notifyLib();
}
function useLibrary() {
  const [, tick] = useStateI(0);
  useEffectI(() => {
    const fn = () => tick(t => t + 1);
    libSubscribers.add(fn);
    return () => libSubscribers.delete(fn);
  }, []);
  return HOTEL_LIBRARY;
}

function HotelCombobox({ value, onSelect, onChange }) {
  const [open, setOpen] = useStateI(false);
  const [query, setQuery] = useStateI(value || '');
  const ref = useRefI(null);
  const inputRef = useRefI(null);

  useEffectI(() => { setQuery(value || ''); }, [value]);
  useEffectI(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const q = query.trim().toLowerCase();
  const matches = HOTEL_LIBRARY.filter(h =>
    !q || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q)
  );
  const exactMatch = HOTEL_LIBRARY.some(h => h.name.toLowerCase() === q);

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      <input ref={inputRef}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
        placeholder="Search library or type a new hotel…"
        style={{
          width: '100%', border: 0, outline: 'none',
          padding: 0, background: 'transparent',
          fontFamily: PI.font.sans, fontSize: 14, fontWeight: 500,
          color: PI.color.ink900, letterSpacing: PI.font.tracking.sm,
        }} />
      {open && (
        <div style={{
          position: 'absolute', top: 26, left: -8, right: 0, zIndex: 50,
          minWidth: 340,
          background: PI.color.white, borderRadius: 10,
          border: `1px solid ${PI.color.ink200}`,
          boxShadow: '0 12px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
          padding: 4, animation: 'pytFadeDown 120ms ease-out',
          maxHeight: 360, overflowY: 'auto',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 10px 6px',
          }}>
            <span style={{ fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', fontWeight: 500 }}>
              My Library
            </span>
            <span style={{ fontSize: 11, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs }}>
              {matches.length} of {HOTEL_LIBRARY.length}
            </span>
          </div>
          {matches.length === 0 && (
            <div style={{ padding: '8px 10px', fontSize: 12, color: PI.color.ink600 }}>
              No matches in your library.
            </div>
          )}
          {matches.map(h => (
            <button key={h.id}
              onClick={() => { onSelect(h); setQuery(h.name); setOpen(false); }}
              onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 6, border: 0, cursor: 'pointer',
                background: 'transparent', textAlign: 'left', fontFamily: PI.font.sans,
              }}>
              <span style={{
                width: 32, height: 32, borderRadius: 6,
                background: 'rgb(238, 237, 255)', color: PI.color.brand500,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}><Icon name="bed" size={16} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {h.name}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
                  <Icon name="pin" size={10} /> {h.city}
                  <span style={{ color: PI.color.ink300 }}>•</span>
                  <span>{'★'.repeat(h.stars)}</span>
                  <span style={{ color: PI.color.ink300 }}>•</span>
                  <span>Last used {h.lastUsed}</span>
                </span>
              </span>
            </button>
          ))}
          {/* Footer: create new */}
          <div style={{ borderTop: `1px solid ${PI.color.ink200}`, marginTop: 4, paddingTop: 4 }}>
            {q && !exactMatch && (
              <button
                onClick={() => { onSelect({ id: null, name: query, city: '', stars: 0 }); setOpen(false); }}
                onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 6, border: 0, cursor: 'pointer',
                  background: 'transparent', textAlign: 'left', fontFamily: PI.font.sans,
                }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 6,
                  background: PI.color.ink100, color: PI.color.ink800,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}><Icon name="plus" size={16} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
                    Create "{query}"
                  </span>
                  <span style={{ display: 'block', marginTop: 2, fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
                    Saves to My Library for next time
                  </span>
                </span>
              </button>
            )}
            <button
              onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 6, border: 0, cursor: 'pointer',
                background: 'transparent', textAlign: 'left', fontFamily: PI.font.sans,
                color: PI.color.ink800,
              }}>
              <span style={{
                width: 32, height: 32, borderRadius: 6,
                color: PI.color.ink600,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}><Icon name="arrowRight" size={14} /></span>
              <span style={{ fontSize: 13, letterSpacing: PI.font.tracking.sm }}>
                Manage My Library…
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const MEAL_PLANS = [
  { id: 'ro',  label: 'Room only',             short: 'RO' },
  { id: 'bb',  label: 'Bed & breakfast',       short: 'BB' },
  { id: 'hb',  label: 'Half board',            short: 'HB' },
  { id: 'fb',  label: 'Full board',            short: 'FB' },
  { id: 'ai',  label: 'All inclusive',         short: 'AI' },
];

function AccommodationItem({ item, onRemove, onEdit, onMove, totalDays, dayN }) {
  const data = item.data || {};
  const startDay = data.startDay ?? dayN;
  const nights   = data.nights ?? 1;
  const mealPlan = data.mealPlan ?? 'bb';
  const name     = data.name ?? '';
  const city     = data.city ?? '';
  const meal = MEAL_PLANS.find(m => m.id === mealPlan) || MEAL_PLANS[1];
  const endDay = Math.min(totalDays, startDay + nights);
  const isEmpty = !name;

  return (
    <div onClick={onEdit}
      onMouseEnter={e => e.currentTarget.style.borderColor = PI.color.ink300}
      onMouseLeave={e => e.currentTarget.style.borderColor = PI.color.ink200}
      style={{
        border: `1px solid ${PI.color.ink200}`, borderRadius: 10,
        padding: 12, background: PI.color.white,
        display: 'flex', gap: 12, alignItems: 'flex-start',
        cursor: 'pointer', transition: 'border-color 120ms ease-out',
      }}>
      <span style={{
        width: 36, height: 36, borderRadius: 8,
        background: 'rgb(238, 237, 255)', color: PI.color.brand500,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}><Icon name="bed" size={20} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: PI.color.brand500, letterSpacing: 0.04, textTransform: 'uppercase', fontWeight: 500 }}>
            Accommodation
          </span>
          <Tag variant={isEmpty ? 'warning' : 'neutral'} dot={false} size="sm">
            {isEmpty ? 'Incomplete' : 'Draft'}
          </Tag>
        </div>
        <div style={{
          fontSize: 14, fontWeight: 500,
          color: isEmpty ? PI.color.ink500 : PI.color.ink900,
          letterSpacing: PI.font.tracking.sm,
        }}>
          {isEmpty ? 'Untitled stay — click to edit' : name}
        </div>
        {!isEmpty && (
          <div style={{
            fontSize: 12, color: PI.color.ink600, marginTop: 6,
            letterSpacing: PI.font.tracking.xs,
            display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          }}>
            {city && <><Icon name="pin" size={12} /> {city}<span style={{ color: PI.color.ink300 }}>•</span></>}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '3px 8px', borderRadius: 999,
              background: 'rgb(238, 237, 255)', color: PI.color.brand500,
              fontSize: 11, fontWeight: 500, letterSpacing: 0.04, textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              <Icon name="calendar" size={11} />
              {nights > 1
                ? `Check-in Day ${startDay}  →  Check-out Day ${endDay}`
                : `Day ${startDay}`}
              <span style={{ color: 'rgba(85, 75, 255, 0.4)' }}>•</span>
              {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
            <span style={{ color: PI.color.ink600 }}>{meal.label}</span>
          </div>
        )}
      </div>
      <div onClick={e => e.stopPropagation()}>
        <ItemActionsMenu dayN={dayN} totalDays={totalDays}
          onEdit={onEdit} onRemove={onRemove} onMove={onMove} />
      </div>
    </div>
  );
}

// ===========================================================================
// Accommodation Modal — opens on Add Item → Accommodation, or on item click
// ===========================================================================
function AccommodationModal({ initial, totalDays, dayN, onSave, onClose }) {
  const [data, setData] = useStateI(() => ({
    name:     initial?.name     ?? '',
    city:     initial?.city     ?? '',
    stars:    initial?.stars    ?? 0,
    libraryId: initial?.libraryId ?? null,
    startDay: initial?.startDay ?? dayN,
    nights:   initial?.nights   ?? 1,
    mealPlan: initial?.mealPlan ?? 'bb',
  }));
  // Library-save intent for a hotel not yet in the library
  const [saveToLibrary, setSaveToLibrary] = useStateI(false);
  const set = (patch) => setData(d => ({ ...d, ...patch }));
  const canSave = !!data.name.trim();

  function handleSave() {
    let finalData = data;
    if (!data.libraryId && saveToLibrary) {
      const entry = saveHotelToLibrary({
        name: data.name, city: data.city, stars: data.stars,
      });
      if (entry) finalData = { ...data, libraryId: entry.id };
    }
    onSave(finalData);
  }

  function removeFromLibrary() {
    if (!data.libraryId) return;
    removeHotelFromLibrary(data.libraryId);
    set({ libraryId: null });
  }

  useEffectI(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canSave) handleSave();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [data, canSave, saveToLibrary]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 80,
      background: 'rgba(15, 13, 36, 0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'pytFadeIn 120ms ease-out',
    }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: 560, maxWidth: 'calc(100vw - 40px)',
        background: PI.color.white, borderRadius: 16,
        border: `1px solid ${PI.color.ink200}`,
        boxShadow: '0 24px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 80px)',
        animation: 'pytModalIn 160ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '18px 20px', borderBottom: `1px solid ${PI.color.ink200}`,
        }}>
          <span style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'rgb(238, 237, 255)', color: PI.color.brand500,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Icon name="bed" size={20} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
              Add accommodation
            </div>
            <div style={{ fontSize: 12, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
              Day {data.startDay} — Day {dayN === data.startDay ? '' : dayN}
              {dayN !== data.startDay ? ' tour itinerary' : 'of your tour'}
            </div>
          </div>
          <IconButton name="x" onClick={onClose} size="sm" />
        </div>

        {/* Body */}
        <div style={{ padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: PI.color.ink700, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>
              Hotel
            </label>
            <HotelPicker
              data={data}
              set={set}
              saveToLibrary={saveToLibrary}
              setSaveToLibrary={setSaveToLibrary}
              onRemoveFromLibrary={(id) => {
                removeHotelFromLibrary(id);
                if (data.libraryId === id) set({ libraryId: null });
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: PI.color.ink700, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>
                Starting day
              </label>
              <NumStepper value={data.startDay} min={1} max={totalDays}
                onChange={v => set({ startDay: v, nights: Math.min(data.nights, totalDays - v + 1) })}
                format={v => `Day ${v}`} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: PI.color.ink700, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>
                Duration
              </label>
              <NumStepper value={data.nights} min={1} max={totalDays - data.startDay + 1}
                onChange={v => set({ nights: v })}
                format={v => `${v} night${v === 1 ? '' : 's'}`} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, color: PI.color.ink700, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>
              Meal plan
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {MEAL_PLANS.map(m => {
                const sel = data.mealPlan === m.id;
                return (
                  <button key={m.id} onClick={() => set({ mealPlan: m.id })}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      padding: '10px 6px', borderRadius: 8, cursor: 'pointer',
                      background: sel ? PI.color.brand50 : PI.color.white,
                      border: `1px solid ${sel ? PI.color.brand500 : PI.color.ink200}`,
                      color: sel ? PI.color.brand500 : PI.color.ink800,
                      fontFamily: PI.font.sans,
                      transition: 'all 120ms ease-out',
                    }}>
                    <span style={{
                      fontFamily: 'ui-monospace, Menlo, monospace',
                      fontSize: 12, fontWeight: 500,
                      padding: '2px 6px', borderRadius: 4,
                      background: sel ? PI.color.white : PI.color.ink100,
                      color: sel ? PI.color.brand500 : PI.color.ink800,
                    }}>{m.short}</span>
                    <span style={{ fontSize: 11, letterSpacing: PI.font.tracking.xs, textAlign: 'center', lineHeight: '13px' }}>
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          padding: '14px 20px', borderTop: `1px solid ${PI.color.ink200}`,
          background: PI.color.ink150,
        }}>
          <span style={{ fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
            ⌘↵ to save
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outlined" size="md" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="md" disabled={!canSave} onClick={handleSave}>
              {initial?.name ? 'Save changes' : 'Add to day'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// HotelPicker — two entry modes: Browse external catalog OR select from library
// ===========================================================================
function HotelPicker({ data, set, saveToLibrary, setSaveToLibrary, onRemoveFromLibrary }) {
  const library = useLibrary(); // subscribe so tab badge updates live
  // Initial mode based on context: editing an existing library hotel → library tab,
  // otherwise browse is the default.
  const [mode, setMode] = useStateI(() => data.libraryId ? 'library' : 'browse');

  // Switching mode clears the current selection so the two flows don't interfere.
  function switchMode(next) {
    if (next === mode) return;
    set({ name: '', city: '', stars: 0, libraryId: null });
    setSaveToLibrary(false);
    setMode(next);
  }

  // If user picks a browsed hotel then flips the Save toggle, silently update
  // the record. If user picks a library hotel, libraryId is already set.
  const selected = !!data.name.trim();

  return (
    <div>
      {/* Segmented tabs */}
      <div style={{
        display: 'inline-flex', padding: 3, borderRadius: 10,
        background: PI.color.ink100, border: `1px solid ${PI.color.ink200}`,
        marginBottom: 12,
      }}>
        <PickerTab
          active={mode === 'browse'} onClick={() => switchMode('browse')}
          icon="globe" label="Browse hotels"
          count={EXTERNAL_HOTEL_CATALOG.length} />
        <PickerTab
          active={mode === 'library'} onClick={() => switchMode('library')}
          icon="bed" label="From library"
          count={library.length} />
      </div>

      {mode === 'browse' && (
        <BrowseHotelList
          data={data}
          onSelect={(h) => set({ name: h.name, city: h.city, stars: h.stars, libraryId: null })}
        />
      )}
      {mode === 'library' && (
        <LibraryHotelList
          data={data}
          onSelect={(h) => set({ name: h.name, city: h.city, stars: h.stars, libraryId: h.id })}
          onRemove={onRemoveFromLibrary}
          onSwitchToBrowse={() => switchMode('browse')}
        />
      )}

      {/* Selection status footer (spans both modes) */}
      {selected && (
        <div style={{
          marginTop: 12, padding: '10px 12px', borderRadius: 8,
          background: data.libraryId ? 'rgb(238, 237, 255)' : PI.color.ink100,
          border: `1px solid ${data.libraryId ? PI.color.brand100 : PI.color.ink200}`,
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        }}>
          {data.libraryId ? (
            <>
              <Icon name="check2" size={14} color={PI.color.brand500} />
              <span style={{ fontSize: 13, color: PI.color.brand600, fontWeight: 500, letterSpacing: PI.font.tracking.sm }}>
                From your library
              </span>
              {data.city && (
                <span style={{ fontSize: 12, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="pin" size={11} /> {data.city}
                  {data.stars > 0 && <><span style={{ color: PI.color.ink300, margin: '0 4px' }}>•</span>{'★'.repeat(data.stars)}</>}
                </span>
              )}
              <button
                onClick={() => onRemoveFromLibrary(data.libraryId)}
                onMouseEnter={e => { e.currentTarget.style.background = PI.color.red100; e.currentTarget.style.color = PI.color.red600; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = PI.color.ink600; }}
                style={{
                  marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '4px 8px', borderRadius: 6, border: 0, cursor: 'pointer',
                  background: 'transparent', color: PI.color.ink600,
                  fontFamily: PI.font.sans, fontSize: 12, letterSpacing: PI.font.tracking.xs,
                  transition: 'background 120ms, color 120ms',
                }}>
                <Icon name="trash" size={12} /> Remove from library
              </button>
            </>
          ) : (
            <>
              <Icon name="globe" size={13} color={PI.color.ink600} />
              <span style={{ fontSize: 13, color: PI.color.ink800, letterSpacing: PI.font.tracking.sm, fontWeight: 500 }}>
                {data.name}
              </span>
              {data.city && (
                <span style={{ fontSize: 12, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  · <Icon name="pin" size={11} /> {data.city}
                </span>
              )}
              <label
                style={{
                  marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8,
                  cursor: 'pointer', userSelect: 'none', position: 'relative',
                }}>
                <span style={{
                  width: 32, height: 18, borderRadius: 999,
                  background: saveToLibrary ? PI.color.brand500 : PI.color.ink300,
                  position: 'relative', transition: 'background 120ms ease-out',
                  flexShrink: 0,
                }}>
                  <span style={{
                    position: 'absolute', top: 2, left: saveToLibrary ? 16 : 2,
                    width: 14, height: 14, borderRadius: '50%', background: PI.color.white,
                    transition: 'left 120ms ease-out',
                  }}/>
                </span>
                <input type="checkbox" checked={saveToLibrary}
                  onChange={e => setSaveToLibrary(e.target.checked)}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                <span style={{ fontSize: 13, color: PI.color.ink800, letterSpacing: PI.font.tracking.sm }}>
                  Save to library
                </span>
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function PickerTab({ active, onClick, icon, label, count }) {
  return (
    <button onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', borderRadius: 7, cursor: 'pointer',
        background: active ? PI.color.white : 'transparent',
        border: 0,
        boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
        color: active ? PI.color.ink900 : PI.color.ink600,
        fontFamily: PI.font.sans, fontSize: 13, fontWeight: active ? 500 : 400,
        letterSpacing: PI.font.tracking.sm,
        transition: 'all 120ms ease-out',
      }}>
      <Icon name={icon} size={14} />
      <span>{label}</span>
      <span style={{
        fontSize: 11, padding: '1px 6px', borderRadius: 999,
        background: active ? PI.color.ink100 : 'transparent',
        color: active ? PI.color.ink700 : PI.color.ink500,
        letterSpacing: PI.font.tracking.xs,
      }}>{count}</span>
    </button>
  );
}

function BrowseHotelList({ data, onSelect }) {
  const [query, setQuery] = useStateI('');
  const q = query.trim().toLowerCase();
  const results = EXTERNAL_HOTEL_CATALOG.filter(h =>
    !q || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q)
  );

  return (
    <div>
      <SearchBar value={query} onChange={setQuery}
        placeholder="Search hotels by name or city…" />
      <div style={{
        marginTop: 10, border: `1px solid ${PI.color.ink200}`, borderRadius: 10,
        maxHeight: 280, overflowY: 'auto', background: PI.color.white,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', borderBottom: `1px solid ${PI.color.ink200}`,
          background: PI.color.ink150,
          position: 'sticky', top: 0, zIndex: 1,
        }}>
          <span style={{ fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', fontWeight: 500 }}>
            System catalog
          </span>
          <span style={{ fontSize: 11, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs }}>
            {results.length} of {EXTERNAL_HOTEL_CATALOG.length}
          </span>
        </div>
        {results.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center', fontSize: 13, color: PI.color.ink600 }}>
            No hotels match "{query}".
          </div>
        ) : (
          results.map(h => {
            const sel = data.name === h.name && !data.libraryId;
            return (
              <button key={h.id} onClick={() => onSelect(h)}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.background = PI.color.ink100; }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'transparent'; }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', border: 0,
                  borderBottom: `1px solid ${PI.color.ink200}`,
                  cursor: 'pointer', textAlign: 'left',
                  background: sel ? PI.color.brand50 : 'transparent',
                  fontFamily: PI.font.sans, transition: 'background 120ms ease-out',
                }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 6, flexShrink: 0,
                  background: sel ? 'rgb(238, 237, 255)' : PI.color.ink100,
                  color: sel ? PI.color.brand500 : PI.color.ink700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name="hotel" size={18} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {h.name}
                    </span>
                    <span style={{ fontSize: 11, color: PI.color.ink700, letterSpacing: PI.font.tracking.xs }}>
                      {'★'.repeat(h.stars)}
                    </span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
                    <Icon name="pin" size={10} /> {h.city}
                    <span style={{ color: PI.color.ink300 }}>•</span>
                    <span>{h.rooms} rooms</span>
                    <span style={{ color: PI.color.ink300 }}>•</span>
                    <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: PI.color.ink800 }}>
                      {h.rate}
                    </span>
                  </span>
                </span>
                {sel && <Icon name="check2" size={16} color={PI.color.brand500} />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

function LibraryHotelList({ data, onSelect, onRemove, onSwitchToBrowse }) {
  const library = useLibrary();
  const [query, setQuery] = useStateI('');
  const q = query.trim().toLowerCase();
  const results = library.filter(h =>
    !q || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q)
  );

  return (
    <div>
      <SearchBar value={query} onChange={setQuery}
        placeholder="Search your saved hotels…" />
      <div style={{
        marginTop: 10, border: `1px solid ${PI.color.ink200}`, borderRadius: 10,
        maxHeight: 280, overflowY: 'auto', background: PI.color.white,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', borderBottom: `1px solid ${PI.color.ink200}`,
          background: PI.color.ink150,
          position: 'sticky', top: 0, zIndex: 1,
        }}>
          <span style={{ fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', fontWeight: 500 }}>
            My library
          </span>
          <span style={{ fontSize: 11, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs }}>
            {results.length} of {library.length}
          </span>
        </div>
        {library.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', fontSize: 13, color: PI.color.ink600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Icon name="bed" size={28} color={PI.color.ink400} />
            <span>Your library is empty.</span>
            <button onClick={onSwitchToBrowse}
              style={{
                marginTop: 4, padding: '6px 12px', borderRadius: 6,
                border: `1px solid ${PI.color.ink300}`, cursor: 'pointer',
                background: PI.color.white, color: PI.color.ink800,
                fontFamily: PI.font.sans, fontSize: 12, letterSpacing: PI.font.tracking.sm,
              }}>
              Browse hotels to add
            </button>
          </div>
        ) : results.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center', fontSize: 13, color: PI.color.ink600 }}>
            No matches in your library.
          </div>
        ) : (
          results.map(h => {
            const sel = data.libraryId === h.id;
            return (
              <div key={h.id}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.background = PI.color.ink100; }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'transparent'; }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  borderBottom: `1px solid ${PI.color.ink200}`,
                  background: sel ? PI.color.brand50 : 'transparent',
                  fontFamily: PI.font.sans, transition: 'background 120ms ease-out',
                }}>
                <button onClick={() => onSelect(h)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', border: 0, cursor: 'pointer',
                    background: 'transparent', textAlign: 'left', fontFamily: PI.font.sans,
                    minWidth: 0,
                  }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 6, flexShrink: 0,
                    background: sel ? PI.color.white : 'rgb(238, 237, 255)',
                    color: PI.color.brand500,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}><Icon name="bed" size={18} /></span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {h.name}
                      </span>
                      <span style={{ fontSize: 11, color: PI.color.ink700, letterSpacing: PI.font.tracking.xs }}>
                        {'★'.repeat(h.stars)}
                      </span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
                      <Icon name="pin" size={10} /> {h.city}
                      <span style={{ color: PI.color.ink300 }}>•</span>
                      <span>Last used {h.lastUsed}</span>
                    </span>
                  </span>
                  {sel && <Icon name="check2" size={16} color={PI.color.brand500} />}
                </button>
                <button
                  title="Remove from library"
                  onClick={(e) => { e.stopPropagation(); onRemove(h.id); }}
                  onMouseEnter={e => { e.currentTarget.style.background = PI.color.red100; e.currentTarget.style.color = PI.color.red500; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = PI.color.ink500; }}
                  style={{
                    width: 32, height: 32, border: 0, borderRadius: 6,
                    marginRight: 6,
                    background: 'transparent', cursor: 'pointer', flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: PI.color.ink500, transition: 'background 120ms, color 120ms',
                  }}>
                  <Icon name="trash" size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  const [focused, setFocused] = useStateI(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      height: 40, padding: '0 12px',
      borderRadius: 8, background: PI.color.white,
      border: `1px solid ${focused ? PI.color.brand500 : PI.color.ink200}`,
      boxShadow: focused ? '0 0 0 3px rgba(87,75,255,0.15)' : 'none',
      transition: 'border-color 120ms, box-shadow 120ms',
    }}>
      <Icon name="search" size={16} color={PI.color.ink600} />
      <input value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          flex: 1, border: 0, outline: 'none', background: 'transparent',
          fontFamily: PI.font.sans, fontSize: 14, color: PI.color.ink900,
          letterSpacing: PI.font.tracking.sm,
        }} />
      {value && (
        <button onClick={() => onChange('')}
          style={{
            width: 20, height: 20, border: 0, borderRadius: 4,
            background: PI.color.ink100, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: PI.color.ink700,
          }}>
          <Icon name="x" size={12} />
        </button>
      )}
    </div>
  );
}

// Inline version of HotelCombobox used inside the modal (no prior absolute-position)
function HotelSearchField({ value, onChange, onSelect, selectedLibraryId, onRemoveFromLibrary }) {
  const library = useLibrary();
  const [query, setQuery] = useStateI(value || '');
  const [focused, setFocused] = useStateI(false);
  const ref = useRefI(null);
  useEffectI(() => { setQuery(value || ''); }, [value]);
  useEffectI(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setFocused(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const q = query.trim().toLowerCase();
  const matches = library.filter(h =>
    !q || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q)
  );
  const exact = library.some(h => h.name.toLowerCase() === q);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: 40, padding: '0 12px',
        borderRadius: 8, background: PI.color.white,
        border: `1px solid ${focused ? PI.color.brand500 : PI.color.ink200}`,
        boxShadow: focused ? '0 0 0 3px rgba(87,75,255,0.15)' : 'none',
        transition: 'border-color 120ms, box-shadow 120ms',
      }}>
        <Icon name="search" size={16} color={PI.color.ink600} />
        <input
          value={query}
          onFocus={() => setFocused(true)}
          onChange={e => { setQuery(e.target.value); onChange(e.target.value); setFocused(true); }}
          placeholder="Search your library or type a new hotel name…"
          style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            fontFamily: PI.font.sans, fontSize: 14, color: PI.color.ink900,
            letterSpacing: PI.font.tracking.sm,
          }} />
      </div>
      {focused && (
        <div style={{
          position: 'absolute', top: 46, left: 0, right: 0, zIndex: 5,
          background: PI.color.white, borderRadius: 10,
          border: `1px solid ${PI.color.ink200}`,
          boxShadow: '0 12px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
          padding: 4, maxHeight: 280, overflowY: 'auto',
          animation: 'pytFadeDown 120ms ease-out',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 10px 6px',
          }}>
            <span style={{ fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', fontWeight: 500 }}>
              My Library
            </span>
            <span style={{ fontSize: 11, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs }}>
              {matches.length} of {library.length}
            </span>
          </div>
          {matches.length === 0 && (
            <div style={{ padding: '8px 10px', fontSize: 12, color: PI.color.ink600 }}>
              No matches in your library.
            </div>
          )}
          {matches.map(h => (
            <div key={h.id}
              onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 6px 4px 10px', borderRadius: 6,
                background: 'transparent', fontFamily: PI.font.sans,
              }}>
              <button
                onMouseDown={(e) => { e.preventDefault(); onSelect(h); setQuery(h.name); setFocused(false); }}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 4px', border: 0, cursor: 'pointer',
                  background: 'transparent', textAlign: 'left', fontFamily: PI.font.sans,
                  minWidth: 0,
                }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 6,
                  background: 'rgb(238, 237, 255)', color: PI.color.brand500,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}><Icon name="bed" size={16} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {h.name}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
                    <Icon name="pin" size={10} /> {h.city}
                    <span style={{ color: PI.color.ink300 }}>•</span>
                    <span>{'★'.repeat(h.stars)}</span>
                    <span style={{ color: PI.color.ink300 }}>•</span>
                    <span>Last used {h.lastUsed}</span>
                  </span>
                </span>
              </button>
              <button
                title="Remove from library"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onRemoveFromLibrary) onRemoveFromLibrary(h.id);
                  else removeHotelFromLibrary(h.id);
                }}
                onMouseEnter={e => e.currentTarget.style.background = PI.color.red100}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                style={{
                  width: 28, height: 28, border: 0, borderRadius: 6,
                  background: 'transparent', cursor: 'pointer', flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: PI.color.ink500, transition: 'background 120ms, color 120ms',
                }}
                onFocus={e => e.currentTarget.style.color = PI.color.red500}
                onBlur={e => e.currentTarget.style.color = PI.color.ink500}>
                <Icon name="trash" size={14} />
              </button>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${PI.color.ink200}`, marginTop: 4, paddingTop: 4 }}>
            {q && !exact && (
              <button
                onMouseDown={(e) => { e.preventDefault(); onSelect({ id: null, name: query, city: '', stars: 0 }); setFocused(false); }}
                onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 6, border: 0, cursor: 'pointer',
                  background: 'transparent', textAlign: 'left', fontFamily: PI.font.sans,
                }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 6,
                  background: PI.color.ink100, color: PI.color.ink800,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}><Icon name="plus" size={16} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
                    Use "{query}" as a one-off
                  </span>
                  <span style={{ display: 'block', marginTop: 2, fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
                    Not saved to library — toggle "Save to library" below to keep it
                  </span>
                </span>
              </button>
            )}
            <button
              onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 6, border: 0, cursor: 'pointer',
                background: 'transparent', textAlign: 'left', fontFamily: PI.font.sans,
                color: PI.color.ink800,
              }}>
              <span style={{
                width: 32, height: 32,
                color: PI.color.ink600,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}><Icon name="arrowRight" size={14} /></span>
              <span style={{ fontSize: 13, letterSpacing: PI.font.tracking.sm }}>
                Manage My Library…
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AccField({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <span style={{ fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase' }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function NumStepper({ value, min, max, onChange, format }) {
  const canDec = value > min;
  const canInc = value < max;
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      height: 32, borderRadius: 6,
      border: `1px solid ${PI.color.ink200}`, background: PI.color.white,
      overflow: 'hidden',
    }}>
      <button onClick={() => canDec && onChange(value - 1)} disabled={!canDec}
        style={stepperBtn(canDec)}>−</button>
      <div style={{
        flex: 1, textAlign: 'center', fontSize: 13,
        color: PI.color.ink900, letterSpacing: PI.font.tracking.sm,
        fontFamily: PI.font.sans, whiteSpace: 'nowrap',
      }}>{format(value)}</div>
      <button onClick={() => canInc && onChange(value + 1)} disabled={!canInc}
        style={stepperBtn(canInc)}>+</button>
    </div>
  );
}

function stepperBtn(enabled) {
  return {
    width: 28, height: '100%', border: 0, cursor: enabled ? 'pointer' : 'not-allowed',
    background: 'transparent', color: enabled ? PI.color.ink800 : PI.color.ink400,
    fontSize: 16, fontFamily: 'Helvetica Neue, Inter, sans-serif',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };
}

function MealSelect({ value, onChange }) {
  const [open, setOpen] = useStateI(false);
  const ref = useRefI(null);
  useEffectI(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const selected = MEAL_PLANS.find(m => m.id === value) || MEAL_PLANS[1];
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', height: 32, padding: '0 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
        borderRadius: 6, border: `1px solid ${open ? PI.color.brand500 : PI.color.ink200}`,
        background: PI.color.white, cursor: 'pointer',
        fontFamily: PI.font.sans, fontSize: 13, color: PI.color.ink900,
        letterSpacing: PI.font.tracking.sm,
        boxShadow: open ? '0 0 0 3px rgba(87,75,255,0.18)' : 'none',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
          <span style={{
            padding: '1px 6px', borderRadius: 4,
            background: PI.color.ink100,
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 11, color: PI.color.ink800,
          }}>{selected.short}</span>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected.label}</span>
        </span>
        <Icon name="chevDown" size={14} color={PI.color.ink600} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 36, left: 0, right: 0, zIndex: 40,
          background: PI.color.white, borderRadius: 8,
          border: `1px solid ${PI.color.ink200}`,
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          padding: 4, animation: 'pytFadeDown 120ms ease-out',
        }}>
          {MEAL_PLANS.map(m => (
            <button key={m.id} onClick={() => { onChange(m.id); setOpen(false); }}
              onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
              onMouseLeave={e => e.currentTarget.style.background = m.id === value ? PI.color.brand50 : 'transparent'}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 8px', borderRadius: 6, border: 0, cursor: 'pointer',
                background: m.id === value ? PI.color.brand50 : 'transparent',
                textAlign: 'left', fontFamily: PI.font.sans, fontSize: 13,
                color: m.id === value ? PI.color.brand500 : PI.color.ink900,
                letterSpacing: PI.font.tracking.sm,
              }}>
              <span style={{
                padding: '1px 6px', borderRadius: 4,
                background: m.id === value ? PI.color.white : PI.color.ink100,
                fontFamily: 'ui-monospace, Menlo, monospace',
                fontSize: 11,
                color: m.id === value ? PI.color.brand500 : PI.color.ink800,
                border: m.id === value ? `1px solid ${PI.color.brand100}` : 0,
              }}>{m.short}</span>
              <span>{m.label}</span>
              {m.id === value && <span style={{ marginLeft: 'auto' }}><Icon name="check2" size={14} /></span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FlightItem({ item, onRemove, onEdit, onMove, dayN, totalDays }) {
  const d = item.data || {};
  const from = d.from || '';
  const to   = d.to   || '';
  const isEmpty = !from && !to;
  const cabinLabel = { economy: 'Economy', premium: 'Prem. Economy', business: 'Business', first: 'First' }[d.cabin || 'economy'];
  return (
    <div onClick={onEdit}
      onMouseEnter={e => e.currentTarget.style.borderColor = PI.color.ink300}
      onMouseLeave={e => e.currentTarget.style.borderColor = PI.color.ink200}
      style={{
        border: `1px solid ${PI.color.ink200}`, borderRadius: 10,
        padding: 12, background: PI.color.white,
        display: 'flex', gap: 12, alignItems: 'flex-start',
        cursor: 'pointer', transition: 'border-color 120ms ease-out',
      }}>
      <span style={{
        width: 36, height: 36, borderRadius: 8,
        background: 'rgb(220, 234, 255)', color: 'rgb(0, 92, 204)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}><Icon name="planeTakeoff" size={20} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: 'rgb(0, 92, 204)', letterSpacing: 0.04, textTransform: 'uppercase', fontWeight: 500 }}>
            Flight
          </span>
          <Tag variant={isEmpty ? 'warning' : 'neutral'} dot={false} size="sm">
            {isEmpty ? 'Incomplete' : 'Draft'}
          </Tag>
        </div>
        {isEmpty ? (
          <div style={{ fontSize: 14, fontWeight: 500, color: PI.color.ink500, letterSpacing: PI.font.tracking.sm }}>
            Untitled flight — click to edit
          </div>
        ) : (
          <>
            <div style={{
              fontSize: 14, fontWeight: 500, color: PI.color.ink900,
              letterSpacing: PI.font.tracking.sm,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span>{from}</span>
              <Icon name="arrowRight" size={14} color={PI.color.ink400} />
              <span>{to}</span>
              {d.airline && (
                <span style={{ fontSize: 12, color: PI.color.ink600, fontWeight: 400 }}>
                  · {d.airline}{d.flightNum ? ` ${d.flightNum}` : ''}
                </span>
              )}
            </div>
            <div style={{
              fontSize: 12, color: PI.color.ink600, marginTop: 2,
              letterSpacing: PI.font.tracking.xs,
              display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
            }}>
              {(d.depTime || d.arrTime) && (
                <>
                  <Icon name="clock" size={12} />
                  {d.depTime && <>Dep {d.depTime}</>}
                  {d.depTime && d.arrTime && <> — </>}
                  {d.arrTime && <>Arr {d.arrTime}{d.nextDay ? ' (+1)' : ''}</>}
                  <span style={{ color: PI.color.ink300 }}>•</span>
                </>
              )}
              {cabinLabel}
              {d.stops != null && (
                <>
                  <span style={{ color: PI.color.ink300 }}>•</span>
                  {d.stops === 0 ? 'Non-stop' : `${d.stops} stop${d.stops === 1 ? '' : 's'}`}
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div onClick={e => e.stopPropagation()}>
        <ItemActionsMenu dayN={dayN} totalDays={totalDays}
          onEdit={onEdit} onRemove={onRemove} onMove={onMove} />
      </div>
    </div>
  );
}

// ===========================================================================
// Flight Modal
// ===========================================================================
const CABIN_OPTIONS = [
  { id: 'economy',  label: 'Economy' },
  { id: 'premium',  label: 'Prem. Economy' },
  { id: 'business', label: 'Business' },
  { id: 'first',    label: 'First' },
];

function FlightModal({ initial, onSave, onClose }) {
  const [data, setData] = useStateI(() => ({
    from:      initial?.from      ?? '',
    to:        initial?.to        ?? '',
    airline:   initial?.airline   ?? '',
    flightNum: initial?.flightNum ?? '',
    depTime:   initial?.depTime   ?? '',
    arrTime:   initial?.arrTime   ?? '',
    nextDay:   initial?.nextDay   ?? false,
    cabin:     initial?.cabin     ?? 'economy',
    stops:     initial?.stops     ?? 0,
  }));
  const set = (patch) => setData(d => ({ ...d, ...patch }));
  const canSave = !!data.from.trim() && !!data.to.trim();

  useEffectI(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canSave) onSave(data);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [data, canSave]);

  const fieldLabel = {
    display: 'block', fontSize: 12, color: PI.color.ink700,
    letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase',
    marginBottom: 6, fontWeight: 500,
  };
  const inputStyle = {
    width: '100%', height: 40, padding: '0 12px', borderRadius: 8,
    background: PI.color.white, border: `1px solid ${PI.color.ink200}`,
    fontFamily: PI.font.sans, fontSize: 14, color: PI.color.ink900,
    letterSpacing: PI.font.tracking.sm, outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 80,
      background: 'rgba(15, 13, 36, 0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'pytFadeIn 120ms ease-out',
    }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: 600, maxWidth: 'calc(100vw - 40px)',
        background: PI.color.white, borderRadius: 16,
        border: `1px solid ${PI.color.ink200}`,
        boxShadow: '0 24px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 80px)',
        animation: 'pytModalIn 160ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '18px 20px', borderBottom: `1px solid ${PI.color.ink200}`,
        }}>
          <span style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'rgb(220, 234, 255)', color: 'rgb(0, 92, 204)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Icon name="planeTakeoff" size={20} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
              {initial?.from ? 'Edit flight' : 'Add flight'}
            </div>
            <div style={{ fontSize: 12, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
              Airline, route, and times
            </div>
          </div>
          <IconButton name="x" onClick={onClose} size="sm" />
        </div>

        <div style={{ padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* From → To */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'end' }}>
            <div>
              <label style={fieldLabel}>From</label>
              <input value={data.from} onChange={e => set({ from: e.target.value.toUpperCase() })}
                placeholder="LHR" maxLength={4}
                style={{ ...inputStyle, fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 16, fontWeight: 500 }} />
            </div>
            <div style={{ padding: '0 4px 8px', color: PI.color.ink400 }}>
              <Icon name="arrowRight" size={18} />
            </div>
            <div>
              <label style={fieldLabel}>To</label>
              <input value={data.to} onChange={e => set({ to: e.target.value.toUpperCase() })}
                placeholder="HND" maxLength={4}
                style={{ ...inputStyle, fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 16, fontWeight: 500 }} />
            </div>
          </div>

          {/* Airline + flight number */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
            <div>
              <label style={fieldLabel}>Airline</label>
              <input value={data.airline} onChange={e => set({ airline: e.target.value })}
                placeholder="Japan Airlines" style={inputStyle} />
            </div>
            <div>
              <label style={fieldLabel}>Flight #</label>
              <input value={data.flightNum} onChange={e => set({ flightNum: e.target.value.toUpperCase() })}
                placeholder="JL44" style={{ ...inputStyle, fontFamily: 'ui-monospace, Menlo, monospace' }} />
            </div>
          </div>

          {/* Times */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, alignItems: 'end' }}>
            <div>
              <label style={fieldLabel}>Departure</label>
              <input value={data.depTime} onChange={e => set({ depTime: e.target.value })}
                placeholder="21:20" style={{ ...inputStyle, fontFamily: 'ui-monospace, Menlo, monospace' }} />
            </div>
            <div>
              <label style={fieldLabel}>Arrival</label>
              <input value={data.arrTime} onChange={e => set({ arrTime: e.target.value })}
                placeholder="17:30" style={{ ...inputStyle, fontFamily: 'ui-monospace, Menlo, monospace' }} />
            </div>
            <button onClick={() => set({ nextDay: !data.nextDay })}
              style={{
                height: 40, padding: '0 12px', borderRadius: 8,
                border: `1px solid ${data.nextDay ? PI.color.brand500 : PI.color.ink200}`,
                background: data.nextDay ? PI.color.brand50 : PI.color.white,
                color: data.nextDay ? PI.color.brand500 : PI.color.ink800,
                cursor: 'pointer', fontFamily: PI.font.sans, fontSize: 13,
                letterSpacing: PI.font.tracking.sm,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                transition: 'all 120ms ease-out',
              }}>
              {data.nextDay && <Icon name="check2" size={14} />}
              +1 day
            </button>
          </div>

          {/* Cabin + stops */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
            <div>
              <label style={fieldLabel}>Cabin</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {CABIN_OPTIONS.map(c => {
                  const sel = data.cabin === c.id;
                  return (
                    <button key={c.id} onClick={() => set({ cabin: c.id })}
                      style={{
                        padding: '10px 6px', borderRadius: 8, cursor: 'pointer',
                        background: sel ? PI.color.brand50 : PI.color.white,
                        border: `1px solid ${sel ? PI.color.brand500 : PI.color.ink200}`,
                        color: sel ? PI.color.brand500 : PI.color.ink800,
                        fontFamily: PI.font.sans, fontSize: 12,
                        letterSpacing: PI.font.tracking.xs, fontWeight: sel ? 500 : 400,
                        transition: 'all 120ms ease-out',
                      }}>{c.label}</button>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={fieldLabel}>Stops</label>
              <NumStepper value={data.stops} min={0} max={3}
                onChange={v => set({ stops: v })}
                format={v => v === 0 ? 'Non-stop' : `${v} stop${v === 1 ? '' : 's'}`} />
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          padding: '14px 20px', borderTop: `1px solid ${PI.color.ink200}`,
          background: PI.color.ink150,
        }}>
          <span style={{ fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
            ⌘↵ to save
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outlined" size="md" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="md" disabled={!canSave} onClick={() => onSave(data)}>
              {initial?.from ? 'Save changes' : 'Add to day'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Transfer Item card + Modal
// ===========================================================================
const TRANSFER_TYPES = [
  { id: 'private',   label: 'Private car',   icon: 'car', desc: 'Private driver' },
  { id: 'shuttle',   label: 'Shuttle',       icon: 'van', desc: 'Shared vehicle' },
  { id: 'taxi',      label: 'Taxi',          icon: 'car', desc: 'Metered taxi' },
  { id: 'train',     label: 'Train',         icon: 'arrowRight', desc: 'Rail transfer' },
  { id: 'ferry',     label: 'Ferry',         icon: 'swap', desc: 'Water transfer' },
  { id: 'other',     label: 'Other',         icon: 'more', desc: 'Custom' },
];

function TransferItem({ item, onRemove, onEdit, onMove, dayN, totalDays }) {
  const d = item.data || {};
  const from = d.from || '';
  const to   = d.to   || '';
  const isEmpty = !from && !to;
  const kind = TRANSFER_TYPES.find(t => t.id === (d.kind || 'private'));
  return (
    <div onClick={onEdit}
      onMouseEnter={e => e.currentTarget.style.borderColor = PI.color.ink300}
      onMouseLeave={e => e.currentTarget.style.borderColor = PI.color.ink200}
      style={{
        border: `1px solid ${PI.color.ink200}`, borderRadius: 10,
        padding: 12, background: PI.color.white,
        display: 'flex', gap: 12, alignItems: 'flex-start',
        cursor: 'pointer', transition: 'border-color 120ms ease-out',
      }}>
      <span style={{
        width: 36, height: 36, borderRadius: 8,
        background: 'rgb(220, 245, 230)', color: 'rgb(10, 120, 70)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}><Icon name={kind?.icon || 'car'} size={20} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: 'rgb(10, 120, 70)', letterSpacing: 0.04, textTransform: 'uppercase', fontWeight: 500 }}>
            Transfer
          </span>
          <Tag variant={isEmpty ? 'warning' : 'neutral'} dot={false} size="sm">
            {isEmpty ? 'Incomplete' : kind?.label || 'Transfer'}
          </Tag>
        </div>
        {isEmpty ? (
          <div style={{ fontSize: 14, fontWeight: 500, color: PI.color.ink500, letterSpacing: PI.font.tracking.sm }}>
            Untitled transfer — click to edit
          </div>
        ) : (
          <>
            <div style={{
              fontSize: 14, fontWeight: 500, color: PI.color.ink900,
              letterSpacing: PI.font.tracking.sm,
              display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
            }}>
              <span>{from}</span>
              <Icon name="arrowRight" size={14} color={PI.color.ink400} />
              <span>{to}</span>
            </div>
            <div style={{
              fontSize: 12, color: PI.color.ink600, marginTop: 2,
              letterSpacing: PI.font.tracking.xs,
              display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
            }}>
              {d.depTime && (
                <>
                  <Icon name="clock" size={12} />
                  <span>{d.depTime}</span>
                  {d.duration && <span>· {d.duration}</span>}
                  <span style={{ color: PI.color.ink300 }}>•</span>
                </>
              )}
              {d.pax != null && (
                <>
                  <Icon name="users" size={12} />
                  <span>{d.pax} pax</span>
                  <span style={{ color: PI.color.ink300 }}>•</span>
                </>
              )}
              {d.price != null && d.price !== '' && (
                <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: PI.color.ink800, fontWeight: 500 }}>
                  {formatPrice(d.price, d.currency)}
                </span>
              )}
            </div>
          </>
        )}
      </div>
      <div onClick={e => e.stopPropagation()}>
        <ItemActionsMenu dayN={dayN} totalDays={totalDays}
          onEdit={onEdit} onRemove={onRemove} onMove={onMove} />
      </div>
    </div>
  );
}

const CURRENCIES = [
  { id: 'USD', symbol: '$' },
  { id: 'EUR', symbol: '€' },
  { id: 'GBP', symbol: '£' },
  { id: 'JPY', symbol: '¥' },
  { id: 'AUD', symbol: 'A$' },
];

function formatPrice(amount, currency) {
  const cur = CURRENCIES.find(c => c.id === (currency || 'USD')) || CURRENCIES[0];
  const n = Number(amount);
  if (isNaN(n)) return `${cur.symbol}${amount}`;
  return `${cur.symbol}${n.toLocaleString(undefined, { maximumFractionDigits: cur.id === 'JPY' ? 0 : 2 })}`;
}

function TransferModal({ initial, onSave, onClose }) {
  const [data, setData] = useStateI(() => ({
    kind:     initial?.kind     ?? 'private',
    from:     initial?.from     ?? '',
    to:       initial?.to       ?? '',
    depTime:  initial?.depTime  ?? '',
    duration: initial?.duration ?? '',
    pax:      initial?.pax      ?? 2,
    price:    initial?.price    ?? '',
    currency: initial?.currency ?? 'USD',
    notes:    initial?.notes    ?? '',
  }));
  const set = (patch) => setData(d => ({ ...d, ...patch }));
  const canSave = !!data.from.trim() && !!data.to.trim();

  useEffectI(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canSave) onSave(data);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [data, canSave]);

  const fieldLabel = {
    display: 'block', fontSize: 12, color: PI.color.ink700,
    letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase',
    marginBottom: 6, fontWeight: 500,
  };
  const inputStyle = {
    width: '100%', height: 40, padding: '0 12px', borderRadius: 8,
    background: PI.color.white, border: `1px solid ${PI.color.ink200}`,
    fontFamily: PI.font.sans, fontSize: 14, color: PI.color.ink900,
    letterSpacing: PI.font.tracking.sm, outline: 'none',
    boxSizing: 'border-box',
  };

  function swapDirection() {
    set({ from: data.to, to: data.from });
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 80,
      background: 'rgba(15, 13, 36, 0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'pytFadeIn 120ms ease-out',
    }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: 600, maxWidth: 'calc(100vw - 40px)',
        background: PI.color.white, borderRadius: 16,
        border: `1px solid ${PI.color.ink200}`,
        boxShadow: '0 24px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 80px)',
        animation: 'pytModalIn 160ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '18px 20px', borderBottom: `1px solid ${PI.color.ink200}`,
        }}>
          <span style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'rgb(220, 245, 230)', color: 'rgb(10, 120, 70)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Icon name="car" size={20} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
              {initial?.from ? 'Edit transfer' : 'Add transfer'}
            </div>
            <div style={{ fontSize: 12, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
              Ground transport between two locations
            </div>
          </div>
          <IconButton name="x" onClick={onClose} size="sm" />
        </div>

        <div style={{ padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Transfer type */}
          <div>
            <label style={fieldLabel}>Transfer type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {TRANSFER_TYPES.map(t => {
                const sel = data.kind === t.id;
                return (
                  <button key={t.id} onClick={() => set({ kind: t.id })}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      padding: '10px 4px', borderRadius: 8, cursor: 'pointer',
                      background: sel ? PI.color.brand50 : PI.color.white,
                      border: `1px solid ${sel ? PI.color.brand500 : PI.color.ink200}`,
                      color: sel ? PI.color.brand500 : PI.color.ink800,
                      fontFamily: PI.font.sans,
                      transition: 'all 120ms ease-out',
                    }}>
                    <Icon name={t.icon} size={18} />
                    <span style={{ fontSize: 11, letterSpacing: PI.font.tracking.xs, textAlign: 'center', fontWeight: sel ? 500 : 400 }}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* From / To */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'end' }}>
            <div>
              <label style={fieldLabel}>From</label>
              <input value={data.from} onChange={e => set({ from: e.target.value })}
                placeholder="Haneda Airport (HND)" style={inputStyle} />
            </div>
            <button onClick={swapDirection} title="Swap from / to"
              onMouseEnter={e => { e.currentTarget.style.background = PI.color.ink100; e.currentTarget.style.borderColor = PI.color.ink300; }}
              onMouseLeave={e => { e.currentTarget.style.background = PI.color.white; e.currentTarget.style.borderColor = PI.color.ink200; }}
              style={{
                width: 40, height: 40, borderRadius: 8, marginBottom: 0,
                border: `1px solid ${PI.color.ink200}`, background: PI.color.white,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', color: PI.color.ink700,
                transition: 'background 120ms, border-color 120ms',
              }}>
              <Icon name="swap" size={16} />
            </button>
            <div>
              <label style={fieldLabel}>To</label>
              <input value={data.to} onChange={e => set({ to: e.target.value })}
                placeholder="Park Hyatt Tokyo" style={inputStyle} />
            </div>
          </div>

          {/* Time + duration + pax */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div>
              <label style={fieldLabel}>Pickup time</label>
              <input value={data.depTime} onChange={e => set({ depTime: e.target.value })}
                placeholder="14:30" style={{ ...inputStyle, fontFamily: 'ui-monospace, Menlo, monospace' }} />
            </div>
            <div>
              <label style={fieldLabel}>Duration</label>
              <input value={data.duration} onChange={e => set({ duration: e.target.value })}
                placeholder="45 min" style={inputStyle} />
            </div>
            <div>
              <label style={fieldLabel}>Passengers</label>
              <NumStepper value={data.pax} min={1} max={24}
                onChange={v => set({ pax: v })}
                format={v => `${v} pax`} />
            </div>
          </div>

          {/* Price */}
          <div>
            <label style={fieldLabel}>Price</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                height: 40, borderRadius: 8,
                border: `1px solid ${PI.color.ink200}`, background: PI.color.white,
                overflow: 'hidden',
              }}>
                {CURRENCIES.map((c, i) => {
                  const sel = data.currency === c.id;
                  return (
                    <button key={c.id} onClick={() => set({ currency: c.id })}
                      onMouseEnter={e => { if (!sel) e.currentTarget.style.background = PI.color.ink100; }}
                      onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'transparent'; }}
                      style={{
                        height: '100%', padding: '0 10px',
                        border: 0, borderLeft: i === 0 ? 0 : `1px solid ${PI.color.ink200}`,
                        cursor: 'pointer', fontFamily: PI.font.sans, fontSize: 12,
                        background: sel ? PI.color.brand50 : 'transparent',
                        color: sel ? PI.color.brand600 : PI.color.ink700,
                        fontWeight: sel ? 500 : 400, letterSpacing: PI.font.tracking.xs,
                        transition: 'background 120ms, color 120ms',
                      }}>{c.id}</button>
                  );
                })}
              </div>
              <input value={data.price}
                onChange={e => set({ price: e.target.value.replace(/[^\d.]/g, '') })}
                placeholder="0.00"
                style={{ ...inputStyle, flex: 1, fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 15 }} />
            </div>
            {data.price && (
              <div style={{ marginTop: 6, fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
                Shown as <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: PI.color.ink800 }}>
                  {formatPrice(data.price, data.currency)}
                </span> per transfer.
              </div>
            )}
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          padding: '14px 20px', borderTop: `1px solid ${PI.color.ink200}`,
          background: PI.color.ink150,
        }}>
          <span style={{ fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs }}>
            ⌘↵ to save
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outlined" size="md" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="md" disabled={!canSave} onClick={() => onSave(data)}>
              {initial?.from ? 'Save changes' : 'Add to day'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// ItemActionsMenu — "more" button on each item card: Edit / Delete /
// Move to previous day / Move to next day.
// ===========================================================================
function ItemActionsMenu({ dayN, totalDays, onEdit, onRemove, onMove }) {
  const [open, setOpen] = useStateI(false);
  const btnRef = useRefI(null);
  const menuRef = useRefI(null);
  const [anchor, setAnchor] = useStateI({ top: 0, right: 0 });

  useEffectI(() => {
    if (!open) return;
    function onDoc(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)
          && btnRef.current && !btnRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function toggle(e) {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setAnchor({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen(v => !v);
  }

  function run(fn) {
    setOpen(false);
    fn?.();
  }

  const canPrev = dayN > 1;
  const canNext = dayN < totalDays;

  const items = [
    { id: 'edit',   label: 'Edit',                icon: 'pencil',    onClick: onEdit, enabled: true },
    { id: 'prev',   label: 'Move to previous day', icon: 'chevLeft',  onClick: () => onMove(dayN - 1), enabled: canPrev,
      hint: canPrev ? `Day ${dayN - 1}` : null },
    { id: 'next',   label: 'Move to next day',     icon: 'chevRight', onClick: () => onMove(dayN + 1), enabled: canNext,
      hint: canNext ? `Day ${dayN + 1}` : null },
    { id: 'divider' },
    { id: 'delete', label: 'Delete',              icon: 'trash',     onClick: onRemove, enabled: true, danger: true },
  ];

  return (
    <>
      <button ref={btnRef} onClick={toggle}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = PI.color.ink100; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent'; }}
        style={{
          width: 28, height: 28, border: 0, borderRadius: 6,
          background: open ? PI.color.ink100 : 'transparent', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: PI.color.ink700, transition: 'background 120ms',
        }}>
        <Icon name="more" size={16} />
      </button>
      {open && ReactDOM.createPortal(
        <div ref={menuRef}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed', top: anchor.top, right: anchor.right,
            zIndex: 70, minWidth: 220,
            background: PI.color.white, borderRadius: 8,
            border: `1px solid ${PI.color.ink200}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)',
            padding: 4, fontFamily: PI.font.sans,
            animation: 'pytFadeDown 120ms ease-out',
          }}>
          {items.map(it => {
            if (it.id === 'divider') {
              return <div key="div" style={{ height: 1, background: PI.color.ink200, margin: '4px 0' }} />;
            }
            const disabled = !it.enabled;
            const color = it.danger
              ? (disabled ? PI.color.ink400 : PI.color.red600)
              : (disabled ? PI.color.ink400 : PI.color.ink900);
            return (
              <button key={it.id}
                onClick={() => !disabled && run(it.onClick)}
                disabled={disabled}
                onMouseEnter={e => {
                  if (disabled) return;
                  e.currentTarget.style.background = it.danger ? PI.color.red100 : PI.color.ink100;
                }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 6,
                  background: 'transparent', border: 0,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  textAlign: 'left', fontFamily: PI.font.sans, fontSize: 13,
                  color, letterSpacing: PI.font.tracking.sm,
                  transition: 'background 100ms ease-out',
                }}>
                <Icon name={it.icon} size={14} />
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.hint && (
                  <span style={{
                    fontSize: 11, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs,
                  }}>{it.hint}</span>
                )}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}

// ===========================================================================
// ItineraryOptionsMenu — tour-wide ⋯ menu next to the "Itinerary" heading.
// Actions operate on the whole itinerary (not a single day).
// ===========================================================================
function ItineraryOptionsMenu({ dayCount, totalItems, anyExpanded, allExpanded, onExpandAll, onCollapseAll, onAddDayStart, onAddDayEnd, onClearAllItems, onResetItinerary, onImport, onExport }) {
  const [open, setOpen] = useStateI(false);
  const btnRef = useRefI(null);
  const menuRef = useRefI(null);
  const [anchor, setAnchor] = useStateI({ top: 0, right: 0 });

  useEffectI(() => {
    if (!open) return;
    function onDoc(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)
          && btnRef.current && !btnRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function toggle(e) {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setAnchor({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen(v => !v);
  }

  function run(fn) { setOpen(false); fn?.(); }

  const groups = [
    [
      { id: 'addStart', label: 'Add day at start',    icon: 'insertAbove', onClick: onAddDayStart, enabled: true },
      { id: 'addEnd',   label: 'Add day at end',      icon: 'insertBelow', onClick: onAddDayEnd,   enabled: true },
    ],
    [
      { id: 'expandAll',   label: 'Expand all days',   icon: 'expandAll',   onClick: onExpandAll,   enabled: !allExpanded,
        hint: allExpanded ? 'All open' : null },
      { id: 'collapseAll', label: 'Collapse all days', icon: 'collapseAll', onClick: onCollapseAll, enabled: anyExpanded,
        hint: !anyExpanded ? 'All closed' : null },
    ],
    [
      { id: 'import', label: 'Import from another tour…', icon: 'download', onClick: onImport, enabled: true },
      { id: 'export', label: 'Export itinerary…',         icon: 'share',    onClick: onExport, enabled: totalItems > 0,
        hint: totalItems === 0 ? 'No items' : null },
    ],
    [
      { id: 'clearItems', label: 'Clear all items',     icon: 'eraser', onClick: onClearAllItems,  enabled: totalItems > 0,
        hint: totalItems > 0 ? `${totalItems} item${totalItems === 1 ? '' : 's'}` : 'Nothing to clear' },
      { id: 'reset',      label: 'Reset itinerary',     icon: 'trash',  onClick: onResetItinerary, enabled: true, danger: true,
        hint: `${dayCount} day${dayCount === 1 ? '' : 's'}` },
    ],
  ];

  return (
    <>
      <button ref={btnRef} onClick={toggle}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = PI.color.ink100; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent'; }}
        style={{
          width: 32, height: 32, border: 0, borderRadius: 6,
          background: open ? PI.color.ink100 : 'transparent', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: PI.color.ink700, transition: 'background 120ms',
        }}>
        <Icon name="more" size={18} />
      </button>
      {open && ReactDOM.createPortal(
        <div ref={menuRef}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed', top: anchor.top, right: anchor.right,
            zIndex: 70, minWidth: 280,
            background: PI.color.white, borderRadius: 8,
            border: `1px solid ${PI.color.ink200}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)',
            padding: 4, fontFamily: PI.font.sans,
            animation: 'pytFadeDown 120ms ease-out',
          }}>
          <div style={{
            padding: '6px 10px 8px', fontSize: 11, color: PI.color.ink500,
            letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', fontWeight: 500,
            borderBottom: `1px solid ${PI.color.ink150}`, marginBottom: 4,
          }}>
            Itinerary options
          </div>
          {groups.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <div style={{ height: 1, background: PI.color.ink150, margin: '4px 0' }} />}
              {group.map(it => {
                const disabled = !it.enabled;
                const color = it.danger
                  ? (disabled ? PI.color.ink400 : PI.color.red600)
                  : (disabled ? PI.color.ink400 : PI.color.ink900);
                return (
                  <button key={it.id}
                    onClick={() => !disabled && run(it.onClick)}
                    disabled={disabled}
                    onMouseEnter={e => {
                      if (disabled) return;
                      e.currentTarget.style.background = it.danger ? 'rgba(218, 30, 40, 0.08)' : PI.color.ink100;
                    }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 10px', borderRadius: 6,
                      background: 'transparent', border: 0,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      textAlign: 'left', fontFamily: PI.font.sans, fontSize: 13,
                      color, letterSpacing: PI.font.tracking.sm,
                      transition: 'background 100ms ease-out',
                    }}>
                    <Icon name={it.icon} size={14} />
                    <span style={{ flex: 1 }}>{it.label}</span>
                    {it.hint && (
                      <span style={{
                        fontSize: 11, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs,
                      }}>{it.hint}</span>
                    )}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}

// ===========================================================================
// DayOptionsMenu — "more options" dropdown on the day header.
// Actions: Edit title & description, Insert day above/below, Duplicate,
// Move up/down, Collapse others, Expand all, Clear items, Delete day.
// ===========================================================================
function DayOptionsMenu({ dayN, totalDays, hasTitle, itemCount, mediaCount = 0, onEditTitle, onEditMedia, onInsertAbove, onInsertBelow, onDuplicate, onMoveUp, onMoveDown, onCollapseOthers, onExpandAll, onClear, onDelete }) {
  const [open, setOpen] = useStateI(false);
  const btnRef = useRefI(null);
  const menuRef = useRefI(null);
  const [anchor, setAnchor] = useStateI({ top: 0, right: 0 });

  useEffectI(() => {
    if (!open) return;
    function onDoc(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)
          && btnRef.current && !btnRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function toggle(e) {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setAnchor({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen(v => !v);
  }

  function run(fn) { setOpen(false); fn?.(); }

  const canMoveUp   = dayN > 1;
  const canMoveDown = dayN < totalDays;
  const canDelete   = totalDays > 1;
  const canClear    = hasTitle || itemCount > 0;

  const groups = [
    [
      { id: 'edit',      label: hasTitle ? 'Edit title & description' : 'Add title & description', icon: 'pencil', onClick: onEditTitle, enabled: true },
      { id: 'media',     label: mediaCount > 0 ? 'Edit images & videos' : 'Add images & videos',  icon: 'image',  onClick: onEditMedia, enabled: true,
        hint: mediaCount > 0 ? `${mediaCount}` : null },
      { id: 'duplicate', label: 'Duplicate day',         icon: 'copy',        onClick: onDuplicate,  enabled: true },
    ],
    [
      { id: 'insertAbove', label: 'Insert day above',    icon: 'insertAbove', onClick: onInsertAbove, enabled: true },
      { id: 'insertBelow', label: 'Insert day below',    icon: 'insertBelow', onClick: onInsertBelow, enabled: true },
    ],
    [
      { id: 'moveUp',    label: 'Move up',               icon: 'chevUp',      onClick: onMoveUp,     enabled: canMoveUp,
        hint: canMoveUp ? `↔ Day ${dayN - 1}` : null },
      { id: 'moveDown',  label: 'Move down',             icon: 'chevDown',    onClick: onMoveDown,   enabled: canMoveDown,
        hint: canMoveDown ? `↔ Day ${dayN + 1}` : null },
    ],
    [
      { id: 'collapseOthers', label: 'Collapse other days', icon: 'collapseAll', onClick: onCollapseOthers, enabled: totalDays > 1 },
      { id: 'expandAll',      label: 'Expand all days',     icon: 'expandAll',   onClick: onExpandAll,      enabled: totalDays > 1 },
    ],
    [
      { id: 'clear',  label: 'Clear items & title', icon: 'eraser', onClick: onClear,  enabled: canClear },
      { id: 'delete', label: 'Delete day',          icon: 'trash',  onClick: onDelete, enabled: canDelete, danger: true,
        hint: canDelete ? null : 'Need 1+' },
    ],
  ];

  return (
    <>
      <button ref={btnRef} onClick={toggle}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = PI.color.ink100; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent'; }}
        style={{
          width: 32, height: 32, border: 0, borderRadius: 6,
          background: open ? PI.color.ink100 : 'transparent', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: PI.color.ink700, transition: 'background 120ms',
        }}>
        <Icon name="more" size={18} />
      </button>
      {open && ReactDOM.createPortal(
        <div ref={menuRef}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed', top: anchor.top, right: anchor.right,
            zIndex: 70, minWidth: 260,
            background: PI.color.white, borderRadius: 8,
            border: `1px solid ${PI.color.ink200}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)',
            padding: 4, fontFamily: PI.font.sans,
            animation: 'pytFadeDown 120ms ease-out',
          }}>
          {/* header */}
          <div style={{
            padding: '6px 10px 8px', fontSize: 11, color: PI.color.ink500,
            letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', fontWeight: 500,
            borderBottom: `1px solid ${PI.color.ink150}`, marginBottom: 4,
          }}>
            Day {dayN} options
          </div>
          {groups.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <div style={{ height: 1, background: PI.color.ink150, margin: '4px 0' }} />}
              {group.map(it => {
                const disabled = !it.enabled;
                const color = it.danger
                  ? (disabled ? PI.color.ink400 : PI.color.red600)
                  : (disabled ? PI.color.ink400 : PI.color.ink900);
                return (
                  <button key={it.id}
                    onClick={() => !disabled && run(it.onClick)}
                    disabled={disabled}
                    onMouseEnter={e => {
                      if (disabled) return;
                      e.currentTarget.style.background = it.danger ? 'rgba(218, 30, 40, 0.08)' : PI.color.ink100;
                    }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 10px', borderRadius: 6,
                      background: 'transparent', border: 0,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      textAlign: 'left', fontFamily: PI.font.sans, fontSize: 13,
                      color, letterSpacing: PI.font.tracking.sm,
                      transition: 'background 100ms ease-out',
                    }}>
                    <Icon name={it.icon} size={14} />
                    <span style={{ flex: 1 }}>{it.label}</span>
                    {it.hint && (
                      <span style={{
                        fontSize: 11, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs,
                      }}>{it.hint}</span>
                    )}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}

// ===========================================================================
// StayShadowRow — low-emphasis row surfaced on days that are mid-stay or
// checkout, so the accommodation span is visible across every affected day
// without duplicating the full accommodation card.
// Variants: "continues" (night 2 of 3 etc.), "checkout" (final day).
// ===========================================================================
function StayShadowRow({ stay, mode }) {
  const { name = '', startDay, nights } = stay.data || {};
  const endDay = startDay + nights;

  const isContinues = mode === 'continues';
  const nightNum = stay._dayN - startDay + 1; // 1-indexed night number for "continues"

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 12px',
      border: `1px dashed ${PI.color.ink200}`,
      borderRadius: 10,
      background: 'rgba(240, 240, 242, 0.35)',
      color: PI.color.ink600, fontSize: 12,
      letterSpacing: PI.font.tracking.xs,
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: 6,
        background: PI.color.white, border: `1px solid ${PI.color.ink200}`,
        color: PI.color.brand500,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name={isContinues ? 'bed' : 'arrowRight'} size={13} />
      </span>
      <span style={{
        fontSize: 10, fontWeight: 500, letterSpacing: 0.05, textTransform: 'uppercase',
        color: PI.color.ink500,
      }}>
        {isContinues ? 'Stay continues' : 'Check-out'}
      </span>
      <span style={{
        fontSize: 13, fontWeight: 500, color: PI.color.ink800,
        letterSpacing: PI.font.tracking.sm,
      }}>
        {name}
      </span>
      <span style={{ color: PI.color.ink300 }}>•</span>
      <span>
        {isContinues
          ? `Night ${nightNum} of ${nights}`
          : `After ${nights} night${nights === 1 ? '' : 's'}`}
      </span>
      <span style={{ marginLeft: 'auto', fontSize: 11, color: PI.color.ink500 }}>
        Day {startDay} → {endDay}
      </span>
    </div>
  );
}
// the day title+description. Matches the reference: rounded squares, a play
// overlay on videos, tight gaps.
// ===========================================================================
function MediaStrip({ items, size = 72, onClick }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
      {items.map(m => (
        <button key={m.id}
          onClick={onClick ? () => onClick(m) : undefined}
          style={{
            position: 'relative', width: size, height: size, padding: 0,
            borderRadius: 8, border: `1px solid ${PI.color.ink200}`,
            overflow: 'hidden', background: PI.color.ink100,
            cursor: onClick ? 'pointer' : 'default', flexShrink: 0,
          }}>
          <img src={m.url} alt={m.alt || ''}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          {m.kind === 'video' && (
            <span style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.22) 100%)',
              pointerEvents: 'none',
            }}>
              <span style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)', display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill={PI.color.ink900}>
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </span>
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ===========================================================================
// MediaEditorModal — upload / reorder / delete images & videos on a day.
// Accepts files via drag-drop or file input; creates object URLs locally
// (this is a UX-only prototype — uploads aren't persisted server-side).
// ===========================================================================
function MediaEditorModal({ dayN, initial, onSave, onClose }) {
  const [items, setItems] = useStateI(() => (initial || []).map(m => ({ ...m })));
  const [dragOver, setDragOver] = useStateI(false);
  const fileRef = useRefI(null);

  useEffectI(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) onSave(items);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [items]);

  function addFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;
    const next = files.map(f => ({
      id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      kind: f.type.startsWith('video/') ? 'video' : 'image',
      url: URL.createObjectURL(f),
      name: f.name,
      size: f.size,
      _local: true,
    }));
    setItems(arr => [...arr, ...next]);
  }

  function remove(id) {
    setItems(arr => arr.filter(m => m.id !== id));
  }

  function reorder(from, to) {
    if (from === to) return;
    setItems(arr => {
      const out = arr.slice();
      const [moved] = out.splice(from, 1);
      out.splice(to, 0, moved);
      return out;
    });
  }

  function fmtSize(b) {
    if (!b) return '';
    if (b < 1024) return `${b} B`;
    if (b < 1024*1024) return `${(b/1024).toFixed(0)} KB`;
    return `${(b/1024/1024).toFixed(1)} MB`;
  }

  const imageCount = items.filter(m => m.kind === 'image').length;
  const videoCount = items.filter(m => m.kind === 'video').length;

  return (
    <div onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: 'rgba(15, 13, 36, 0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, animation: 'pytFadeIn 160ms ease-out',
      }}>
      <div onClick={e => e.stopPropagation()}
        style={{
          width: 640, maxWidth: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column',
          background: PI.color.white, borderRadius: 12,
          boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 8px 16px rgba(0,0,0,0.08)',
          animation: 'pytModalIn 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: PI.font.sans,
        }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 22px 14px', borderBottom: `1px solid ${PI.color.ink200}`,
        }}>
          <div>
            <div style={{ fontSize: 11, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', fontWeight: 500 }}>
              Day {dayN} · Media
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: PI.color.ink900, marginTop: 2, letterSpacing: PI.font.tracking.sm }}>
              Images & videos
            </div>
          </div>
          <button onClick={onClose} aria-label="Close"
            style={{
              width: 32, height: 32, border: 0, borderRadius: 6, background: 'transparent',
              cursor: 'pointer', color: PI.color.ink700,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 22, overflowY: 'auto', flex: 1 }}>
          {/* Dropzone / upload */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => {
              e.preventDefault(); setDragOver(false);
              addFiles(e.dataTransfer?.files);
            }}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? PI.color.primary : PI.color.ink200}`,
              borderRadius: 10, padding: '28px 20px', textAlign: 'center',
              background: dragOver ? 'rgba(85, 75, 255, 0.04)' : PI.color.ink50,
              cursor: 'pointer', transition: 'background 120ms, border-color 120ms',
            }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: '50%', background: PI.color.white,
              border: `1px solid ${PI.color.ink200}`, marginBottom: 8, color: PI.color.ink700,
            }}>
              <Icon name="download" size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
              Drop files here or <span style={{ color: PI.color.primary }}>browse</span>
            </div>
            <div style={{ fontSize: 12, color: PI.color.ink500, marginTop: 4, letterSpacing: PI.font.tracking.xs }}>
              Images (JPG, PNG, WEBP) and videos (MP4, WEBM) · up to 20 MB each
            </div>
            <input ref={fileRef} type="file" multiple
              accept="image/*,video/*"
              onClick={e => e.stopPropagation()}
              onChange={e => { addFiles(e.target.files); e.target.value = ''; }}
              style={{ display: 'none' }} />
          </div>

          {/* Gallery */}
          {items.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                marginBottom: 10,
              }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
                  {items.length} item{items.length === 1 ? '' : 's'}
                </div>
                <div style={{ fontSize: 12, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs }}>
                  {imageCount} image{imageCount === 1 ? '' : 's'} · {videoCount} video{videoCount === 1 ? '' : 's'}
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(132px, 1fr))',
                gap: 10,
              }}>
                {items.map((m, i) => (
                  <MediaThumb key={m.id} m={m} index={i}
                    onRemove={() => remove(m.id)}
                    onReorder={reorder}
                    fmtSize={fmtSize} />
                ))}
              </div>
            </div>
          )}

          {items.length === 0 && (
            <div style={{
              marginTop: 18, padding: 18, textAlign: 'center',
              color: PI.color.ink500, fontSize: 13, letterSpacing: PI.font.tracking.xs,
            }}>
              No media yet. Upload the first image or video above.
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 22px', borderTop: `1px solid ${PI.color.ink200}`,
        }}>
          <div style={{ fontSize: 12, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs }}>
            Drag thumbnails to reorder · <kbd style={{
              fontFamily: PI.font.sans, fontSize: 11, background: PI.color.ink100,
              border: `1px solid ${PI.color.ink200}`, borderRadius: 4, padding: '1px 5px',
            }}>⌘</kbd> <kbd style={{
              fontFamily: PI.font.sans, fontSize: 11, background: PI.color.ink100,
              border: `1px solid ${PI.color.ink200}`, borderRadius: 4, padding: '1px 5px',
            }}>↵</kbd> to save
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outlined" size="sm" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => onSave(items)}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaThumb({ m, index, onRemove, onReorder, fmtSize }) {
  const [hovered, setHovered] = useStateI(false);
  return (
    <div
      draggable
      onDragStart={e => {
        e.dataTransfer.setData('text/plain', String(index));
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
      onDrop={e => {
        e.preventDefault();
        const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
        if (!Number.isNaN(from)) onReorder(from, index);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', borderRadius: 10, overflow: 'hidden',
        border: `1px solid ${PI.color.ink200}`, background: PI.color.ink100,
        cursor: 'grab',
      }}>
      <div style={{ aspectRatio: '1 / 1', width: '100%' }}>
        <img src={m.url} alt={m.alt || m.name || ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      {/* kind pill */}
      <div style={{
        position: 'absolute', top: 6, left: 6,
        padding: '2px 6px', borderRadius: 4,
        background: 'rgba(15,13,36,0.7)', color: PI.color.white,
        fontSize: 10, letterSpacing: PI.font.tracking.xs, textTransform: 'uppercase', fontWeight: 500,
      }}>
        {m.kind}
      </div>
      {/* video play badge */}
      {m.kind === 'video' && (
        <span style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(255,255,255,0.92)', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)', pointerEvents: 'none',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill={PI.color.ink900}>
            <path d="M8 5v14l11-7z"/>
          </svg>
        </span>
      )}
      {/* remove button */}
      <button onClick={onRemove} aria-label="Remove"
        style={{
          position: 'absolute', top: 6, right: 6,
          width: 24, height: 24, border: 0, borderRadius: '50%',
          background: hovered ? PI.color.red600 : 'rgba(15,13,36,0.7)',
          color: PI.color.white, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 120ms',
        }}>
        <Icon name="trash" size={12} />
      </button>
      {/* filename / size footer */}
      {(m.name || m.size) && (
        <div style={{
          padding: '6px 8px', background: PI.color.white, borderTop: `1px solid ${PI.color.ink200}`,
          fontSize: 11, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {m.name || `Image ${index + 1}`}
          {m.size ? <span style={{ color: PI.color.ink400 }}> · {fmtSize(m.size)}</span> : null}
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// DayTitleBlock — inline-editable title + description for a day
// ===========================================================================
function DayTitleBlock({ title, body, onSave, onClear, editing: editingProp, onEditingChange }) {
  const [editingInner, setEditingInner] = useStateI(false);
  const editing = editingProp !== undefined ? editingProp : editingInner;
  const setEditing = onEditingChange || setEditingInner;
  const [draftTitle, setDraftTitle] = useStateI(title || '');
  const [draftBody, setDraftBody] = useStateI(body || '');
  const [hovering, setHovering] = useStateI(false);
  const titleRef = useRefI(null);
  const textareaRef = useRefI(null);

  useEffectI(() => { setDraftTitle(title || ''); setDraftBody(body || ''); }, [title, body]);
  useEffectI(() => {
    if (editing && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, [editing]);

  // Auto-grow textarea
  useEffectI(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [editing, draftBody]);

  function startEdit() {
    setDraftTitle(title || '');
    setDraftBody(body || '');
    setEditing(true);
  }
  function cancel() {
    setEditing(false);
    setDraftTitle(title || '');
    setDraftBody(body || '');
  }
  function save() {
    const t = draftTitle.trim();
    const b = draftBody.trim();
    if (!t && !b) {
      // Nothing to save; treat as clear
      onClear?.();
    } else {
      onSave(t, b);
    }
    setEditing(false);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') { e.preventDefault(); cancel(); }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); save(); }
  }

  // Editing state
  if (editing) {
    return (
      <div style={{
        border: `1px solid ${PI.color.brand500}`, borderRadius: 10,
        padding: 12, background: PI.color.white,
        boxShadow: '0 0 0 3px rgba(87,75,255,0.15)',
      }}>
        <input
          ref={titleRef}
          value={draftTitle}
          onChange={e => setDraftTitle(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Day title (e.g. Arrival in Tokyo)"
          maxLength={120}
          style={{
            width: '100%', border: 0, outline: 'none', background: 'transparent',
            fontFamily: PI.font.sans, fontSize: 15, fontWeight: 500,
            color: PI.color.ink900, letterSpacing: PI.font.tracking.sm,
            padding: '2px 0',
          }}
        />
        <div style={{ height: 1, background: PI.color.ink150, margin: '6px 0' }} />
        <textarea
          ref={textareaRef}
          value={draftBody}
          onChange={e => setDraftBody(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Short description of the day… (optional)"
          rows={2}
          style={{
            width: '100%', border: 0, outline: 'none', background: 'transparent',
            fontFamily: PI.font.sans, fontSize: 13, color: PI.color.ink700,
            letterSpacing: PI.font.tracking.sm, lineHeight: '20px',
            padding: '2px 0', resize: 'none', minHeight: 40,
            boxSizing: 'border-box',
          }}
        />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 8,
        }}>
          <span style={{ fontSize: 11, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs }}>
            ⌘↵ to save · Esc to cancel
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button variant="outlined" size="sm" onClick={cancel}>Cancel</Button>
            <Button variant="primary" size="sm"
              disabled={!draftTitle.trim() && !draftBody.trim()}
              onClick={save}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Filled state (has title or body)
  if (title || body) {
    return (
      <div
        onClick={startEdit}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          padding: '8px 10px', margin: '-8px -10px',
          borderRadius: 8, cursor: 'text',
          background: hovering ? PI.color.ink100 : 'transparent',
          transition: 'background 120ms ease-out',
          position: 'relative',
        }}>
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
              {title}
            </span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: PI.color.red500, display: 'inline-block' }} />
          </div>
        )}
        {body && (
          <div style={{ fontSize: 13, color: PI.color.ink600, lineHeight: '20px', letterSpacing: PI.font.tracking.sm }}>
            {body}
          </div>
        )}
        {hovering && (
          <span style={{
            position: 'absolute', top: 8, right: 8,
            fontSize: 10, color: PI.color.ink600,
            background: PI.color.white, border: `1px solid ${PI.color.ink200}`,
            padding: '2px 6px', borderRadius: 4, letterSpacing: PI.font.tracking.xs,
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <Icon name="key" size={10} /> Click to edit
          </span>
        )}
      </div>
    );
  }

  // Empty state — clickable button
  return (
    <button
      onClick={startEdit}
      onMouseEnter={e => { e.currentTarget.style.color = PI.color.brand500; e.currentTarget.style.borderColor = PI.color.brand500; e.currentTarget.style.background = 'rgb(244, 243, 255)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = PI.color.ink500; e.currentTarget.style.borderColor = PI.color.ink200; e.currentTarget.style.background = PI.color.white; }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        alignSelf: 'flex-start',
        padding: '6px 10px', borderRadius: 6,
        background: PI.color.white, border: `1px dashed ${PI.color.ink200}`,
        color: PI.color.ink500, cursor: 'pointer',
        fontFamily: PI.font.sans, fontSize: 13, letterSpacing: PI.font.tracking.sm,
        transition: 'color 120ms, border-color 120ms, background 120ms',
      }}>
      <Icon name="plus" size={14} /> Add title & description
    </button>
  );
}

// ===========================================================================
// Day card
// ===========================================================================
function DayCard({ day, expanded, onToggle, onAddItem, addingHere, menuStyle, showShortcuts, accentIcons, onPick, onClosePicker, onRemoveItem, onUpdateItem, onUpdateMeta, onEditItem, onMoveItem, onDuplicateDay, onInsertAbove, onInsertBelow, onMoveDayUp, onMoveDayDown, onCollapseOthers, onExpandAll, onClearDay, onDeleteDay, onEditMedia, totalDays, stayShadows = [] }) {
  const addBtnRef = useRefI(null);
  const [menuAnchor, setMenuAnchor] = useStateI({ top: 0, left: 0 });
  const cardRef = useRefI(null);
  const [editingTitle, setEditingTitle] = useStateI(false);

  // Ensure the card is expanded when we open the title editor from the menu
  function startTitleEdit() {
    if (!expanded) onToggle();
    setEditingTitle(true);
  }

  useEffectI(() => {
    if (addingHere && addBtnRef.current && cardRef.current) {
      const btn = addBtnRef.current.getBoundingClientRect();
      const card = cardRef.current.getBoundingClientRect();
      setMenuAnchor({
        top: btn.bottom - card.top + 6,
        left: btn.left - card.left,
      });
    }
  }, [addingHere]);

  return (
    <div ref={cardRef} style={{
      position: 'relative',
      border: `1px solid ${PI.color.ink200}`, borderRadius: 12,
      background: PI.color.white, boxShadow: PI.shadow.card,
    }}>
      {/* Day header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '14px 16px',
        borderBottom: expanded ? `1px solid ${PI.color.ink200}` : 'none',
        cursor: 'pointer',
      }} onClick={onToggle}>
        <Icon name={expanded ? 'chevDown' : 'chevRight'} size={18} color={PI.color.ink800} />
        <span style={{ fontSize: 16, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
          Day {day.n}
        </span>
        {!expanded && day.items.length > 0 && (
          <span style={{ fontSize: 12, color: PI.color.ink600, marginLeft: 6, letterSpacing: PI.font.tracking.xs }}>
            · {day.items.length} item{day.items.length === 1 ? '' : 's'}
          </span>
        )}
        <div style={{ marginLeft: 'auto' }} onClick={e => e.stopPropagation()}>
          <DayOptionsMenu
            dayN={day.n}
            totalDays={totalDays}
            hasTitle={!!(day.title || day.body)}
            itemCount={day.items.length}
            mediaCount={(day.media || []).length}
            onEditTitle={startTitleEdit}
            onEditMedia={onEditMedia}
            onDuplicate={onDuplicateDay}
            onInsertAbove={onInsertAbove}
            onInsertBelow={onInsertBelow}
            onMoveUp={onMoveDayUp}
            onMoveDown={onMoveDayDown}
            onCollapseOthers={onCollapseOthers}
            onExpandAll={onExpandAll}
            onClear={onClearDay}
            onDelete={onDeleteDay}
          />
        </div>
      </div>

      {expanded && (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Title + description (inline-editable) */}
          <DayTitleBlock
            title={day.title}
            body={day.body}
            editing={editingTitle}
            onEditingChange={setEditingTitle}
            onSave={(title, body) => onUpdateMeta({ title, body })}
            onClear={() => onUpdateMeta({ title: '', body: '' })}
          />

          {/* Media strip (images & videos). Click any thumb to open the editor. */}
          {day.media && day.media.length > 0 && (
            <MediaStrip items={day.media} size={72} onClick={() => onEditMedia()} />
          )}

          {/* Stay-shadow rows: shown on days affected by an accommodation that
              started on an earlier day (mid-stay or check-out). */}
          {stayShadows.map((sh, idx) => (
            <StayShadowRow key={`shadow-${idx}`} stay={{ ...sh.stay, _dayN: day.n }} mode={sh.mode} />
          ))}

          {/* Items */}
          {day.items.map(item => {
            if (item.type === 'accommodation') {
              return <AccommodationItem key={item.id} item={item}
                dayN={day.n} totalDays={totalDays}
                onEdit={() => onEditItem(item)}
                onRemove={() => onRemoveItem(item.id)}
                onMove={(toDay) => onMoveItem(item.id, toDay)} />;
            }
            if (item.type === 'flight') {
              return <FlightItem key={item.id} item={item}
                dayN={day.n} totalDays={totalDays}
                onEdit={() => onEditItem(item)}
                onRemove={() => onRemoveItem(item.id)}
                onMove={(toDay) => onMoveItem(item.id, toDay)} />;
            }
            if (item.type === 'transfer') {
              return <TransferItem key={item.id} item={item}
                dayN={day.n} totalDays={totalDays}
                onEdit={() => onEditItem(item)}
                onRemove={() => onRemoveItem(item.id)}
                onMove={(toDay) => onMoveItem(item.id, toDay)} />;
            }
            return null;
          })}

          {/* Add item button */}
          <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
            <button ref={addBtnRef} onClick={e => { e.stopPropagation(); onAddItem(); }}
              onMouseEnter={e => e.currentTarget.style.background = PI.color.ink100}
              onMouseLeave={e => e.currentTarget.style.background = addingHere ? PI.color.ink100 : PI.color.white}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 6,
                background: addingHere ? PI.color.ink100 : PI.color.white,
                border: `1px solid ${addingHere ? PI.color.ink300 : PI.color.ink200}`,
                cursor: 'pointer', fontFamily: PI.font.sans,
                fontSize: 13, color: PI.color.ink800, letterSpacing: PI.font.tracking.sm,
                transition: 'background 120ms ease-out, border-color 120ms ease-out',
              }}>
              <Icon name="plus" size={14} />
              Add Item
            </button>
          </div>
        </div>
      )}

      {/* Menu (positioned relative to this card) */}
      {addingHere && (
        <AddItemMenu
          anchor={menuAnchor}
          style={menuStyle}
          showShortcuts={showShortcuts}
          accentIcons={accentIcons}
          onClose={onClosePicker}
          onPick={onPick}
        />
      )}
    </div>
  );
}

// ===========================================================================
// Itinerary page
// ===========================================================================
// ===========================================================================
// ConfirmDeleteDayModal — shown when the user presses "Delete day".
// Explains exactly what will happen: accommodations shortened / checkouts
// shifted / items removed. User must confirm to proceed.
// ===========================================================================
function ConfirmDeleteDayModal({ impacts, onCancel, onConfirm }) {
  useEffectI(() => {
    function onKey(e) {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Enter') onConfirm();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!impacts) return null;
  const { dayN, stayImpacts, otherItemsCount, accoOnDayCount, hasTitle, hasBody, mediaCount } = impacts;

  // Build a human-readable list of consequences.
  const bullets = [];
  stayImpacts.forEach((s, idx) => {
    if (s.kind === 'removed') {
      bullets.push({
        key: 'stay-rm-' + idx, severity: 'danger', icon: 'bed',
        title: `${s.name} will be deleted`,
        body: `This day is the check-in for a ${s.nights}-night stay. Removing the day removes the entire accommodation.`,
      });
    } else if (s.kind === 'shortened') {
      bullets.push({
        key: 'stay-sh-' + idx, severity: 'warn', icon: 'bed',
        title: `${s.name} will be shortened by 1 night`,
        body: `${s.oldNights} nights → ${s.newNights} nights. Check-out moves from Day ${s.oldCheckout} to Day ${s.newCheckout}.`,
      });
    } else if (s.kind === 'checkoutShifted') {
      bullets.push({
        key: 'stay-co-' + idx, severity: 'warn', icon: 'bed',
        title: `${s.name} check-out will shift`,
        body: `Still ${s.nights} night${s.nights === 1 ? '' : 's'}, but check-out moves from Day ${s.oldCheckout} to Day ${s.newCheckout}.`,
      });
    }
  });

  // Other items on the day (flights/transfers) — grouped into one line.
  if (otherItemsCount > 0) {
    bullets.push({
      key: 'items', severity: 'warn', icon: 'trash',
      title: `${otherItemsCount} item${otherItemsCount === 1 ? '' : 's'} on this day will be removed`,
      body: 'Flights, transfers, and other items scheduled on this day.',
    });
  }

  const hasContent = hasTitle || hasBody || mediaCount > 0;
  if (hasContent) {
    const parts = [];
    if (hasTitle) parts.push('title');
    if (hasBody)  parts.push('description');
    if (mediaCount > 0) parts.push(`${mediaCount} media file${mediaCount === 1 ? '' : 's'}`);
    bullets.push({
      key: 'content', severity: 'info', icon: 'image',
      title: 'Day content will be deleted',
      body: parts.join(', ').replace(/,([^,]*)$/, ' and$1'),
    });
  }

  // Also mention day renumbering — subtle but important.
  bullets.push({
    key: 'renumber', severity: 'info', icon: 'calendar',
    title: 'Remaining days will be renumbered',
    body: `Day ${dayN + 1} and later will each shift up by one.`,
  });

  const sevStyle = {
    danger: { bg: 'rgb(253, 237, 237)', fg: 'rgb(180, 40, 40)', border: 'rgb(245, 200, 200)' },
    warn:   { bg: 'rgb(254, 245, 231)', fg: 'rgb(165, 100, 20)',  border: 'rgb(240, 215, 175)' },
    info:   { bg: PI.color.ink100,      fg: PI.color.ink700,       border: PI.color.ink200 },
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 90,
      background: 'rgba(15, 13, 36, 0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'pytFadeIn 120ms ease-out',
    }} onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={{
        width: 480, maxWidth: 'calc(100vw - 40px)',
        background: PI.color.white, borderRadius: 16,
        border: `1px solid ${PI.color.ink200}`,
        boxShadow: '0 24px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 80px)',
        animation: 'pytModalIn 160ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '18px 20px', borderBottom: `1px solid ${PI.color.ink200}`,
        }}>
          <span style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'rgb(253, 237, 237)', color: 'rgb(180, 40, 40)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Icon name="trash" size={18} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
              Delete Day {dayN}?
            </div>
            <div style={{ fontSize: 12, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, marginTop: 2 }}>
              {bullets.length === 1 && bullets[0].key === 'renumber'
                ? 'This day is empty — removing it will only renumber later days.'
                : 'Review the consequences below before confirming.'}
            </div>
          </div>
          <IconButton name="x" onClick={onCancel} size="sm" />
        </div>

        {/* Body — grouped bullet list of impacts.
            "What will be lost" — destructive/warning impacts (accommodations
             shortened/removed, items deleted, day content gone).
            "After delete"     — neutral downstream effects (renumbering). */}
        <div style={{ padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(() => {
            const lossBullets  = bullets.filter(b => b.severity === 'danger' || b.severity === 'warn' || b.key === 'content');
            const afterBullets = bullets.filter(b => !(b.severity === 'danger' || b.severity === 'warn' || b.key === 'content'));
            const renderGroup = (title, desc, items) => items.length === 0 ? null : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: PI.color.ink700,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>{title}</div>
                  <div style={{
                    fontSize: 12, color: PI.color.ink600, marginTop: 3,
                    letterSpacing: PI.font.tracking.xs, lineHeight: 1.4,
                  }}>{desc}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map(b => {
                    const s = sevStyle[b.severity];
                    return (
                      <div key={b.key} style={{
                        display: 'flex', gap: 10, alignItems: 'flex-start',
                        padding: '10px 12px', borderRadius: 8,
                        background: s.bg, border: `1px solid ${s.border}`,
                      }}>
                        <span style={{
                          width: 24, height: 24, borderRadius: 6,
                          background: PI.color.white, color: s.fg,
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          border: `1px solid ${s.border}`,
                        }}>
                          <Icon name={b.icon} size={13} />
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 13, fontWeight: 500, color: s.fg,
                            letterSpacing: PI.font.tracking.sm,
                          }}>{b.title}</div>
                          <div style={{
                            fontSize: 12, color: PI.color.ink700, marginTop: 2,
                            letterSpacing: PI.font.tracking.xs, lineHeight: 1.45,
                          }}>{b.body}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
            return (
              <React.Fragment>
                {renderGroup(
                  'What will be lost',
                  'These items and changes cannot be undone without recreating them.',
                  lossBullets
                )}
                {renderGroup(
                  'What will shift',
                  'Automatic adjustments to the rest of your itinerary.',
                  afterBullets
                )}
              </React.Fragment>
            );
          })()}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8,
          padding: '14px 20px', borderTop: `1px solid ${PI.color.ink200}`,
          background: PI.color.ink050 || '#fafafc',
        }}>
          <Button variant="outlined" size="sm" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={onConfirm} style={{
            background: 'rgb(200, 45, 45)', borderColor: 'rgb(200, 45, 45)',
          }}>
            Delete Day {dayN}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Itinerary() {
  const [tweaks, setTweaks] = useStateI(window.TWEAKS);
  const [tweaksOn, setTweaksOn] = useStateI(false);

  // Tweak-host protocol
  useEffectI(() => {
    function onMsg(e) {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setTweaksOn(true);
      if (d.type === '__deactivate_edit_mode') setTweaksOn(false);
    }
    window.addEventListener('message', onMsg);
    // Announce availability AFTER listener is registered
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  function updateTweak(key, value) {
    const next = { ...tweaks, [key]: value };
    setTweaks(next);
    window.TWEAKS = next;
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
  }

  // State — days + keyboard listener
  const [days, setDays] = useStateI(() => [
    {
      n: 1, expanded: true,
      title: 'Arrival in Tokyo, Japan',
      body: 'Arrive in Tokyo, Japan\'s dynamic capital where ancient traditions meet futuristic cityscapes. After completing arrival formalities, enjoy a comfortab…',
      items: [
        { id: 'seed-1-flt', type: 'flight', data: {
          from: 'LHR', to: 'HND', airline: 'Japan Airlines', flightNum: 'JL44',
          depTime: '11:10', arrTime: '08:25', nextDay: true, cabin: 'premium', stops: 0,
        }},
        { id: 'seed-1-trf', type: 'transfer', data: {
          kind: 'private', from: 'Haneda Airport (HND)', to: 'Park Hyatt Tokyo',
          depTime: '10:00', duration: '55 min', pax: 2, price: '24000', currency: 'JPY',
        }},
        { id: 'seed-1-acc', type: 'accommodation', data: {
          name: 'Park Hyatt Tokyo', libraryId: 1, city: 'Shinjuku, Tokyo', stars: 5,
          startDay: 1, nights: 3, mealPlan: 'bb',
        }},
      ],
    },
    {
      n: 2, expanded: true,
      title: 'Tokyo — Imperial Palace & Asakusa',
      body: 'A full-day guided tour through old and new Tokyo. Morning at the Imperial Palace East Gardens, afternoon exploring Senso-ji Temple and Nakamise shopping street, with an evening cruise on the Sumida River.',
      media: [
        { id: 'med-2-1', kind: 'image', url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=400&fit=crop', alt: 'Tokyo street' },
        { id: 'med-2-2', kind: 'video', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&h=400&fit=crop', alt: 'City walk' },
        { id: 'med-2-3', kind: 'image', url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=400&fit=crop', alt: 'Traditional interior' },
      ],
      items: [
        { id: 'seed-2-trf1', type: 'transfer', data: {
          kind: 'shuttle', from: 'Park Hyatt Tokyo', to: 'Imperial Palace East Gardens',
          depTime: '09:00', duration: '25 min', pax: 2, price: '6500', currency: 'JPY',
        }},
        { id: 'seed-2-trf2', type: 'transfer', data: {
          kind: 'taxi', from: 'Asakusa', to: 'Park Hyatt Tokyo',
          depTime: '19:30', duration: '35 min', pax: 2, price: '4200', currency: 'JPY',
        }},
      ],
    },
    { n: 3, expanded: true, items: [] },
    { n: 4, expanded: true, items: [] },
    { n: 5, expanded: false, items: [] },
    { n: 6, expanded: false, items: [] },
    { n: 7, expanded: false, items: [] },
  ]);

  const [addingDay, setAddingDay] = useStateI(null); // day number or null
  // editor = { dayN, itemId?, kind } — itemId null means "new"
  const [editor, setEditor] = useStateI(null);
  const [mediaEditorDay, setMediaEditorDay] = useStateI(null); // day number or null
  // Day-deletion confirmation state. null when closed; { dayN, impacts } when open.
  const [confirmDelete, setConfirmDelete] = useStateI(null);

  useEffectI(() => {
    if (addingDay == null) return;
    function onKey(e) {
      if (e.key === 'a' || e.key === 'A') { e.preventDefault(); pick('accommodation'); }
      if (e.key === 'f' || e.key === 'F') { e.preventDefault(); pick('flight'); }
      if (e.key === 't' || e.key === 'T') { e.preventDefault(); pick('transfer'); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [addingDay]);

  function pick(kind) {
    // Instead of adding an empty item, open the editor modal for the chosen kind
    setEditor({ dayN: addingDay, itemId: null, kind });
    setAddingDay(null);
  }

  function saveEditor(data) {
    setDays(ds => ds.map(d => {
      if (d.n !== editor.dayN) return d;
      if (editor.itemId == null) {
        // Create new
        return { ...d, items: [...d.items, { id: Date.now() + Math.random(), type: editor.kind, data }] };
      }
      // Update existing
      return { ...d, items: d.items.map(i => i.id === editor.itemId ? { ...i, data } : i) };
    }));
    setEditor(null);
  }

  function openItemEditor(dayN, item) {
    setEditor({ dayN, itemId: item.id, kind: item.type });
  }

  function removeItem(dayN, itemId) {
    setDays(ds => ds.map(d => d.n === dayN
      ? { ...d, items: d.items.filter(i => i.id !== itemId) }
      : d));
  }

  function updateItem(dayN, itemId, data) {
    setDays(ds => ds.map(d => d.n === dayN
      ? { ...d, items: d.items.map(i => i.id === itemId ? { ...i, data } : i) }
      : d));
  }

  function updateDayMeta(dayN, patch) {
    setDays(ds => ds.map(d => d.n === dayN ? { ...d, ...patch } : d));
  }

  function setDayMedia(dayN, media) {
    setDays(ds => ds.map(d => d.n === dayN ? { ...d, media } : d));
  }

  function moveItem(fromDay, itemId, toDay) {
    if (fromDay === toDay) return;
    setDays(ds => {
      const src = ds.find(d => d.n === fromDay);
      const item = src?.items.find(i => i.id === itemId);
      if (!item) return ds;

      return ds.map(d => {
        if (d.n === fromDay) return { ...d, items: d.items.filter(i => i.id !== itemId) };
        if (d.n === toDay)   return { ...d, expanded: true, items: [...d.items, item] };
        return d;
      });
    });
  }

  // Build the editor's initial data
  const editorInitial = (() => {
    if (!editor) return null;
    if (editor.itemId == null) return null;
    const day = days.find(d => d.n === editor.dayN);
    const item = day?.items.find(i => i.id === editor.itemId);
    return item?.data || null;
  })();

  // For overnight-stay chip: a day "has accommodation" if any accommodation
  // starts there OR rolls over from an earlier day.
  function hasStay(dayN) {
    return days.some(d => d.items.some(i => {
      if (i.type !== 'accommodation') return false;
      const start = i.data?.startDay ?? d.n;
      const nights = i.data?.nights ?? 1;
      return dayN >= start && dayN < start + nights;
    }));
  }

  // Compute stay-shadow rows to render on days that are affected by a stay
  // without being the origin day: mid-stay ("continues") or checkout day.
  // Returns [{ mode, stay }] for the given dayN.
  function stayShadowsFor(dayN) {
    const out = [];
    days.forEach(d => {
      d.items.forEach(it => {
        if (it.type !== 'accommodation' || !it.data?.name) return;
        const start  = it.data.startDay ?? d.n;
        const nights = it.data.nights   ?? 1;
        if (nights <= 1) return;
        if (dayN > start && dayN < start + nights) out.push({ mode: 'continues', stay: it });
        else if (dayN === start + nights)          out.push({ mode: 'checkout',  stay: it });
      });
    });
    return out;
  }

  function toggleDay(n) {
    setDays(ds => ds.map(d => d.n === n ? { ...d, expanded: !d.expanded } : d));
  }

  // Re-number days after any structural change so `day.n` always matches the ordinal position.
  // We use freshly-generated ids so React reconciles cleanly across reorders.
  function renumber(arr) {
    return arr.map((d, i) => ({ ...d, n: i + 1 }));
  }

  function duplicateDay(n) {
    setDays(ds => {
      const idx = ds.findIndex(d => d.n === n);
      if (idx < 0) return ds;
      const src = ds[idx];
      const clone = {
        ...src,
        expanded: true,
        items: src.items.map((it, j) => ({ ...it, id: `${it.id}-c${Date.now()}${j}` })),
      };
      return renumber([...ds.slice(0, idx + 1), clone, ...ds.slice(idx + 1)]);
    });
  }

  function insertDay(n, where) {
    setDays(ds => {
      const idx = ds.findIndex(d => d.n === n);
      if (idx < 0) return ds;
      const blank = { expanded: true, items: [], title: '', body: '' };
      const at = where === 'above' ? idx : idx + 1;
      return renumber([...ds.slice(0, at), blank, ...ds.slice(at)]);
    });
  }

  function moveDay(n, dir) {
    setDays(ds => {
      const idx = ds.findIndex(d => d.n === n);
      const swap = idx + (dir === 'up' ? -1 : 1);
      if (idx < 0 || swap < 0 || swap >= ds.length) return ds;
      const out = ds.slice();
      [out[idx], out[swap]] = [out[swap], out[idx]];
      return renumber(out);
    });
  }

  // Compute all the consequences of deleting day `n` so the confirm modal
  // can explain what will happen. Considers accommodations that span this day,
  // items on the day, and title/body/media content.
  function computeDeleteImpacts(n) {
    const day = days.find(d => d.n === n);
    if (!day) return null;

    // Accommodation impacts — walk every accommodation across the itinerary.
    const stayImpacts = [];
    days.forEach(d => {
      d.items.forEach(it => {
        if (it.type !== 'accommodation' || !it.data?.name) return;
        const start  = it.data.startDay ?? d.n;
        const nights = it.data.nights   ?? 1;
        const endExclusive = start + nights; // checkout day

        if (n === start) {
          // Origin day is being deleted — whole stay disappears.
          stayImpacts.push({ kind: 'removed', name: it.data.name, startDay: start, nights });
        } else if (n > start && n < endExclusive) {
          // Mid-stay day: shortens the stay by one night, checkout moves 1 day earlier.
          stayImpacts.push({
            kind: 'shortened', name: it.data.name,
            oldNights: nights, newNights: nights - 1,
            startDay: start,
            oldCheckout: endExclusive, newCheckout: endExclusive - 1,
          });
        } else if (n === endExclusive) {
          // Checkout day: the stay itself is unchanged in nights, but the "checkout day"
          // label will now point at whatever day replaces this one (checkout moves up).
          stayImpacts.push({
            kind: 'checkoutShifted', name: it.data.name,
            startDay: start, nights,
            oldCheckout: endExclusive, newCheckout: endExclusive - 1,
          });
        }
      });
    });

    // Other-item impacts — flights, transfers on the deleted day.
    const otherItems = day.items.filter(it => it.type !== 'accommodation');

    // Content on the day itself.
    const hasTitle = !!(day.title || '').trim();
    const hasBody  = !!(day.body  || '').trim();
    const mediaCount = (day.media || []).length;

    // Accommodation items rooted on this day (already counted as 'removed' above) —
    // we count them here too so the summary reads "X items on this day".
    const accoOnDay = day.items.filter(it => it.type === 'accommodation').length;

    return {
      dayN: n,
      stayImpacts,
      otherItemsCount: otherItems.length,
      accoOnDayCount: accoOnDay,
      hasTitle, hasBody, mediaCount,
      willBeEmpty: days.length <= 1,
    };
  }

  function requestDeleteDay(n) {
    if (days.length <= 1) return; // can't delete the last day
    const impacts = computeDeleteImpacts(n);
    setConfirmDelete({ dayN: n, impacts });
  }

  function performDeleteDay(n) {
    setDays(ds => {
      if (ds.length <= 1) return ds;
      // Shorten any accommodation whose mid-stay or checkout day is being removed
      // so the data stays consistent with what the confirm modal previewed.
      const trimmed = ds.map(d => ({
        ...d,
        items: d.items.map(it => {
          if (it.type !== 'accommodation' || !it.data?.name) return it;
          const start  = it.data.startDay ?? d.n;
          const nights = it.data.nights   ?? 1;
          const endExclusive = start + nights;
          // Mid-stay or checkout day being deleted → nights--
          if (n > start && n <= endExclusive) {
            const newNights = Math.max(1, nights - 1);
            return { ...it, data: { ...it.data, nights: newNights } };
          }
          return it;
        }),
      }));
      return renumber(trimmed.filter(d => d.n !== n));
    });
    setConfirmDelete(null);
  }

  function deleteDay(n) {
    // Back-compat shim — routes through the confirm flow.
    requestDeleteDay(n);
  }

  function clearDay(n) {
    setDays(ds => ds.map(d => d.n === n ? { ...d, items: [], title: '', body: '', media: [] } : d));
  }

  function collapseOthers(n) {
    setDays(ds => ds.map(d => ({ ...d, expanded: d.n === n })));
  }

  function expandAll() {
    setDays(ds => ds.map(d => ({ ...d, expanded: true })));
  }

  function collapseAll() {
    setDays(ds => ds.map(d => ({ ...d, expanded: false })));
  }

  function addDayStart() {
    setDays(ds => renumber([{ expanded: true, items: [], title: '', body: '' }, ...ds]));
  }

  function addDayEnd() {
    setDays(ds => renumber([...ds, { expanded: true, items: [], title: '', body: '' }]));
  }

  function clearAllItems() {
    setDays(ds => ds.map(d => ({ ...d, items: [] })));
  }

  function resetItinerary() {
    if (!window.confirm('Reset itinerary? This removes all days, items, and titles.')) return;
    setDays([{ n: 1, expanded: true, items: [], title: '', body: '' }]);
  }

  function importItinerary() {
    alert('Import from another tour — coming soon');
  }

  function exportItinerary() {
    alert('Export itinerary — coming soon');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Full-width tab strip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        padding: '16px 28px', borderBottom: `1px solid ${PI.color.ink200}`,
        flexShrink: 0,
      }}>
        <TourTab label="General" done />
        <TourTab label="Itinerary" active />
        <TourTab label="Details" />
        <TourTab label="Pricing" />
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
            <Icon name="check2" size={12} /> Saved as draft
          </span>
          <IconButton name="more" size="sm" />
          <IconButton name="globe" size="sm" />
          <Button variant="outlined" size="sm">Preview</Button>
          <Button variant="primary" size="sm" disabled>Publish</Button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left pane */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500, color: PI.color.ink900, letterSpacing: PI.font.tracking.sm }}>
              Itinerary
            </h2>
            <ItineraryOptionsMenu
              dayCount={days.length}
              totalItems={days.reduce((s, d) => s + d.items.length, 0)}
              anyExpanded={days.some(d => d.expanded)}
              allExpanded={days.every(d => d.expanded)}
              onExpandAll={expandAll}
              onCollapseAll={collapseAll}
              onAddDayStart={addDayStart}
              onAddDayEnd={addDayEnd}
              onClearAllItems={clearAllItems}
              onResetItinerary={resetItinerary}
              onImport={importItinerary}
              onExport={exportItinerary}
            />
          </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {days.map((day, i) => (
            <React.Fragment key={day.n}>
              <DayCard
                day={day}
                expanded={day.expanded}
                onToggle={() => toggleDay(day.n)}
                onAddItem={() => setAddingDay(addingDay === day.n ? null : day.n)}
                addingHere={addingDay === day.n}
                menuStyle={tweaks.menuStyle}
                showShortcuts={tweaks.showShortcuts}
                accentIcons={tweaks.accentIcons}
                onPick={pick}
                onClosePicker={() => setAddingDay(null)}
                onRemoveItem={(id) => removeItem(day.n, id)}
                onUpdateItem={(id, data) => updateItem(day.n, id, data)}
                onUpdateMeta={(patch) => updateDayMeta(day.n, patch)}
                onEditItem={(item) => openItemEditor(day.n, item)}
                onMoveItem={(id, toDay) => moveItem(day.n, id, toDay)}
                onEditMedia={() => setMediaEditorDay(day.n)}
                onDuplicateDay={() => duplicateDay(day.n)}
                onInsertAbove={() => insertDay(day.n, 'above')}
                onInsertBelow={() => insertDay(day.n, 'below')}
                onMoveDayUp={() => moveDay(day.n, 'up')}
                onMoveDayDown={() => moveDay(day.n, 'down')}
                onCollapseOthers={() => collapseOthers(day.n)}
                onExpandAll={() => expandAll()}
                onClearDay={() => clearDay(day.n)}
                onDeleteDay={() => deleteDay(day.n)}
                totalDays={days.length}
                stayShadows={stayShadowsFor(day.n)}
              />
              {i < days.length - 1 && !hasStay(day.n) && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '2px 0' }}>
                  <span style={{
                    fontSize: 11, color: PI.color.ink500,
                    background: PI.color.ink100, border: `1px solid ${PI.color.ink200}`,
                    padding: '3px 12px', borderRadius: 999, letterSpacing: PI.font.tracking.xs,
                  }}>No overnight stay</span>
                </div>
              )}
            </React.Fragment>
          ))}

          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '14px 16px', borderRadius: 12,
            border: `1px dashed ${PI.color.ink300}`, background: 'transparent',
            cursor: 'pointer', fontFamily: PI.font.sans,
            fontSize: 14, color: PI.color.ink800, letterSpacing: PI.font.tracking.sm,
          }}>
            <Icon name="plus" size={16} /> Add Day
          </button>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <Button variant="outlined" size="md">Back</Button>
            <Button variant="primary" size="md">Next</Button>
          </div>
        </div>
      </div>

      {/* Right pane — map */}
      <div style={{
        width: 480, flexShrink: 0, position: 'sticky', top: 0, height: '100%',
        padding: '24px 28px 24px 0',
      }}>
        <ItineraryMap days={days} />
      </div>
      </div>

      {/* Editor modals */}
      {editor && editor.kind === 'accommodation' && (
        <AccommodationModal
          key={editor.itemId ?? 'new'}
          initial={editorInitial}
          dayN={editor.dayN}
          totalDays={days.length}
          onSave={saveEditor}
          onClose={() => setEditor(null)}
        />
      )}
      {editor && editor.kind === 'flight' && (
        <FlightModal
          key={editor.itemId ?? 'new'}
          initial={editorInitial}
          onSave={saveEditor}
          onClose={() => setEditor(null)}
        />
      )}
      {editor && editor.kind === 'transfer' && (
        <TransferModal
          key={editor.itemId ?? 'new'}
          initial={editorInitial}
          onSave={saveEditor}
          onClose={() => setEditor(null)}
        />
      )}

      {mediaEditorDay != null && (
        <MediaEditorModal
          key={`media-${mediaEditorDay}`}
          dayN={mediaEditorDay}
          initial={(days.find(d => d.n === mediaEditorDay) || {}).media || []}
          onSave={(m) => { setDayMedia(mediaEditorDay, m); setMediaEditorDay(null); }}
          onClose={() => setMediaEditorDay(null)}
        />
      )}

      {confirmDelete && (
        <ConfirmDeleteDayModal
          impacts={confirmDelete.impacts}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => performDeleteDay(confirmDelete.dayN)}
        />
      )}

      {/* Tweaks panel */}
      {tweaksOn && (
        <div style={{
          position: 'fixed', right: 16, bottom: 16, zIndex: 100,
          width: 280, background: PI.color.white, borderRadius: 12,
          border: `1px solid ${PI.color.ink200}`,
          boxShadow: '0 12px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
          padding: 16, fontFamily: PI.font.sans,
        }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: PI.color.ink900, marginBottom: 12, letterSpacing: PI.font.tracking.sm }}>
            Tweaks
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: PI.color.ink600, marginBottom: 6 }}>Menu style</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  { id: 'simple', label: 'Simple list' },
                  { id: 'cards', label: 'Card popover' },
                ].map(o => (
                  <button key={o.id} onClick={() => updateTweak('menuStyle', o.id)}
                    style={{
                      flex: 1, padding: '6px 10px', borderRadius: 6,
                      border: `1px solid ${tweaks.menuStyle === o.id ? PI.color.brand500 : PI.color.ink200}`,
                      background: tweaks.menuStyle === o.id ? PI.color.brand50 : PI.color.white,
                      color: tweaks.menuStyle === o.id ? PI.color.brand500 : PI.color.ink800,
                      fontSize: 12, cursor: 'pointer', fontFamily: PI.font.sans,
                      letterSpacing: PI.font.tracking.sm,
                    }}>{o.label}</button>
                ))}
              </div>
            </div>
            <TweakToggle label="Show keyboard shortcuts" value={tweaks.showShortcuts} onChange={v => updateTweak('showShortcuts', v)} />
            <TweakToggle label="Colored icon tints" value={tweaks.accentIcons} onChange={v => updateTweak('accentIcons', v)} />
          </div>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// ItineraryMap — shows every itinerary item as a marker on a stylized
// Tokyo-area map. Markers are color-coded by type (accommodation / flight /
// transfer) and stamped with the day number. Sequential items are connected
// by a dashed route polyline. A Japan overview inset keeps the broader
// context visible even when we're zoomed to the metro area.
// ===========================================================================

// Curated lookup of common tour locations → normalized coords (lon/lat-ish).
// Only the relative positions matter; the map renders a stylized plane, not
// a real projection. Keys are lowercase substrings we match against item
// strings (city names, hotel names, airport codes, free-text from/to).
const GEO_HINTS = [
  // Tokyo metro
  { k: 'park hyatt',         at: [139.690, 35.686], label: 'Park Hyatt',       region: 'tokyo' },
  { k: 'shinjuku',           at: [139.700, 35.690], label: 'Shinjuku',         region: 'tokyo' },
  { k: 'shibuya',            at: [139.701, 35.659], label: 'Shibuya',          region: 'tokyo' },
  { k: 'imperial palace',    at: [139.753, 35.685], label: 'Imperial Palace',  region: 'tokyo' },
  { k: 'marunouchi',         at: [139.764, 35.681], label: 'Marunouchi',       region: 'tokyo' },
  { k: 'nihonbashi',         at: [139.774, 35.683], label: 'Nihonbashi',       region: 'tokyo' },
  { k: 'otemachi',           at: [139.766, 35.688], label: 'Otemachi',         region: 'tokyo' },
  { k: 'asakusa',            at: [139.796, 35.714], label: 'Asakusa',          region: 'tokyo' },
  { k: 'ginza',              at: [139.764, 35.671], label: 'Ginza',            region: 'tokyo' },
  { k: 'tokyo station',      at: [139.767, 35.681], label: 'Tokyo Station',    region: 'tokyo' },
  { k: 'koto',               at: [139.817, 35.672], label: 'Koto',             region: 'tokyo' },
  { k: 'haneda',             at: [139.779, 35.553], label: 'HND',              region: 'tokyo' },
  { k: 'hnd',                at: [139.779, 35.553], label: 'HND',              region: 'tokyo' },
  { k: 'narita',             at: [140.386, 35.772], label: 'NRT',              region: 'tokyo' },
  { k: 'nrt',                at: [140.386, 35.772], label: 'NRT',              region: 'tokyo' },
  // Kyoto / Osaka
  { k: 'kyoto',              at: [135.768, 35.012], label: 'Kyoto',            region: 'kansai' },
  { k: 'arashiyama',         at: [135.676, 35.013], label: 'Arashiyama',       region: 'kansai' },
  { k: 'gion',               at: [135.775, 35.003], label: 'Gion',             region: 'kansai' },
  { k: 'higashiyama',        at: [135.780, 34.997], label: 'Higashiyama',      region: 'kansai' },
  { k: 'osaka',              at: [135.502, 34.694], label: 'Osaka',            region: 'kansai' },
  { k: 'umeda',              at: [135.497, 34.702], label: 'Umeda',            region: 'kansai' },
  { k: 'namba',              at: [135.501, 34.666], label: 'Namba',            region: 'kansai' },
  { k: 'nakanoshima',        at: [135.495, 34.692], label: 'Nakanoshima',      region: 'kansai' },
  // Hakone / other
  { k: 'hakone',             at: [139.026, 35.233], label: 'Hakone',           region: 'fuji' },
  { k: 'ishikawa',           at: [136.656, 36.561], label: 'Ishikawa',         region: 'japan' },
  { k: 'wakura',             at: [136.920, 37.103], label: 'Wakura Onsen',     region: 'japan' },
  // Distant airports
  { k: 'lhr',                at: [-0.454,  51.470], label: 'LHR',              region: 'overseas' },
  { k: 'heathrow',           at: [-0.454,  51.470], label: 'LHR',              region: 'overseas' },
];

function geocode(text) {
  if (!text) return null;
  const low = String(text).toLowerCase();
  for (const h of GEO_HINTS) if (low.includes(h.k)) return h;
  return null;
}

// Convert an item into one or two marker locations (e.g. a transfer has
// both `from` and `to`). Returns [{ id, kind, dayN, coord, label, sub }].
function itemLocations(days) {
  const out = [];
  days.forEach(d => {
    (d.items || []).forEach(it => {
      const data = it.data || {};
      if (it.type === 'accommodation') {
        const g = geocode(data.name) || geocode(data.city);
        if (g) out.push({
          id: it.id, kind: 'accommodation', dayN: d.n,
          coord: g.at, label: data.name || g.label,
          sub: `Day ${data.startDay ?? d.n} · ${data.nights ?? 1}n`,
        });
      } else if (it.type === 'flight') {
        const g1 = geocode(data.from);
        const g2 = geocode(data.to);
        if (g1) out.push({ id: it.id + '-dep', kind: 'flight', sub2: 'Dep',
          dayN: d.n, coord: g1.at, label: (data.from || g1.label) });
        if (g2) out.push({ id: it.id + '-arr', kind: 'flight', sub2: 'Arr',
          dayN: d.n, coord: g2.at, label: (data.to || g2.label) });
      } else if (it.type === 'transfer') {
        const g1 = geocode(data.from);
        const g2 = geocode(data.to);
        if (g1) out.push({ id: it.id + '-from', kind: 'transfer', sub2: 'From',
          dayN: d.n, coord: g1.at, label: data.from || g1.label });
        if (g2) out.push({ id: it.id + '-to', kind: 'transfer', sub2: 'To',
          dayN: d.n, coord: g2.at, label: data.to || g2.label });
      }
    });
  });
  return out;
}

function ItineraryMap({ days }) {
  const markers = itemLocations(days);
  // Filter out overseas markers from the main (Tokyo-scoped) projection;
  // they're represented on the Japan inset instead.
  const near = markers.filter(m => m.coord[0] > 130 && m.coord[0] < 145);
  const far  = markers.filter(m => !(m.coord[0] > 130 && m.coord[0] < 145));

  // Compute a bounding box around `near` markers and project to SVG space.
  const W = 480, H = 640;
  const pad = 64;
  let bbox = null;
  if (near.length > 0) {
    const xs = near.map(m => m.coord[0]);
    const ys = near.map(m => m.coord[1]);
    bbox = {
      minX: Math.min(...xs), maxX: Math.max(...xs),
      minY: Math.min(...ys), maxY: Math.max(...ys),
    };
    // Avoid zero-width box when all markers share a coord
    if (bbox.maxX - bbox.minX < 0.05) { bbox.minX -= 0.05; bbox.maxX += 0.05; }
    if (bbox.maxY - bbox.minY < 0.05) { bbox.minY -= 0.05; bbox.maxY += 0.05; }
    // Add breathing room
    const mx = (bbox.maxX - bbox.minX) * 0.25;
    const my = (bbox.maxY - bbox.minY) * 0.25;
    bbox.minX -= mx; bbox.maxX += mx;
    bbox.minY -= my; bbox.maxY += my;
  } else {
    // Default to Tokyo bbox
    bbox = { minX: 139.6, maxX: 140.0, minY: 35.5, maxY: 35.8 };
  }

  function project([lon, lat]) {
    const x = ((lon - bbox.minX) / (bbox.maxX - bbox.minX)) * (W - pad * 2) + pad;
    // lat grows up, SVG y grows down
    const y = H - (((lat - bbox.minY) / (bbox.maxY - bbox.minY)) * (H - pad * 2) + pad);
    return [x, y];
  }

  // Deduplicate markers that share (kind, coord, dayN) so a hotel and the
  // transfer's "to" field don't stack exactly on top of each other. Keep the
  // most informative one (accommodation > transfer/flight endpoints).
  const byKey = new Map();
  near.forEach(m => {
    const key = `${m.coord[0].toFixed(3)}:${m.coord[1].toFixed(3)}:${m.dayN}`;
    const existing = byKey.get(key);
    if (!existing) { byKey.set(key, m); return; }
    const rank = { accommodation: 3, flight: 2, transfer: 1 };
    if ((rank[m.kind] || 0) > (rank[existing.kind] || 0)) byKey.set(key, m);
  });
  const placed = Array.from(byKey.values());

  // Sequential route: sort by dayN then by projected x so we draw a sensible
  // daily path. Not a real route — just a visual hint of movement.
  const sorted = placed.slice().sort((a, b) => a.dayN - b.dayN);
  const pathPoints = sorted.map(m => project(m.coord));

  const tint = {
    accommodation: { bg: 'rgb(238, 237, 255)', fg: PI.color.brand500, ring: PI.color.brand500 },
    flight:        { bg: 'rgb(220, 234, 255)', fg: 'rgb(0, 92, 204)', ring: 'rgb(0, 92, 204)' },
    transfer:      { bg: 'rgb(220, 245, 230)', fg: 'rgb(10, 120, 70)', ring: 'rgb(10, 120, 70)' },
  };

  // Offset stacked markers on the same point: spread them in a small arc.
  const stacks = new Map();
  placed.forEach(m => {
    const key = `${Math.round(project(m.coord)[0])}:${Math.round(project(m.coord)[1])}`;
    if (!stacks.has(key)) stacks.set(key, []);
    stacks.get(key).push(m);
  });

  return (
    <div style={{
      width: '100%', height: '100%', borderRadius: 12,
      background: 'linear-gradient(180deg, rgb(222, 232, 242) 0%, rgb(208, 222, 238) 100%)',
      position: 'relative', overflow: 'hidden',
      border: `1px solid ${PI.color.ink200}`,
    }}>
      {/* Base map */}
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%"
           preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
        <defs>
          <pattern id="mapGrid" patternUnits="userSpaceOnUse" width="40" height="40">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="mapLand" cx="50%" cy="45%" r="70%">
            <stop offset="0%"  stopColor="rgb(246, 241, 228)"/>
            <stop offset="100%" stopColor="rgb(232, 222, 200)"/>
          </radialGradient>
        </defs>
        {/* Sea backdrop with subtle grid */}
        <rect width={W} height={H} fill="url(#mapGrid)"/>
        {/* Stylized land: a soft blob bounding the placed markers */}
        {placed.length > 0 && (() => {
          const xs = pathPoints.map(p => p[0]);
          const ys = pathPoints.map(p => p[1]);
          const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
          const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
          const rx = Math.max(120, (Math.max(...xs) - Math.min(...xs)) / 2 + 80);
          const ry = Math.max(120, (Math.max(...ys) - Math.min(...ys)) / 2 + 80);
          return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#mapLand)"
                          stroke="rgba(180, 160, 130, 0.5)" strokeWidth="0.8"/>;
        })()}
        {/* Dashed route connecting markers in order */}
        {pathPoints.length > 1 && (
          <polyline
            points={pathPoints.map(p => p.join(',')).join(' ')}
            fill="none" stroke={PI.color.brand500} strokeWidth="1.5"
            strokeDasharray="4 4" strokeLinecap="round" opacity="0.7"/>
        )}
      </svg>

      {/* Markers + labels — absolutely positioned so we can use HTML */}
      {placed.map((m, i) => {
        const [x, y] = project(m.coord);
        // If multiple markers share this pixel, offset them radially.
        const key = `${Math.round(x)}:${Math.round(y)}`;
        const stack = stacks.get(key);
        const idx = stack.indexOf(m);
        const offset = stack.length > 1
          ? { dx: Math.cos(idx * 2.0) * 14, dy: Math.sin(idx * 2.0) * 14 }
          : { dx: 0, dy: 0 };
        const t = tint[m.kind];
        const iconName = m.kind === 'accommodation' ? 'bed'
                       : m.kind === 'flight'        ? 'planeTakeoff'
                       : 'car';
        return (
          <div key={m.id + '-' + i} style={{
            position: 'absolute',
            left: `${((x + offset.dx) / W) * 100}%`,
            top:  `${((y + offset.dy) / H) * 100}%`,
            transform: 'translate(-50%, -100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            pointerEvents: 'none',
          }}>
            {/* Label chip */}
            <div style={{
              background: PI.color.white,
              border: `1px solid ${PI.color.ink200}`,
              borderRadius: 6, padding: '2px 6px',
              fontSize: 10, fontWeight: 500, color: PI.color.ink900,
              letterSpacing: PI.font.tracking.xs, whiteSpace: 'nowrap',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
              maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis',
              marginBottom: 4,
            }}>{m.label}</div>
            {/* Pin */}
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: t.bg, color: t.fg,
              border: `2px solid ${t.ring}`,
              boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <Icon name={iconName} size={13} strokeWidth={2} />
              {/* Day badge */}
              <span style={{
                position: 'absolute', top: -6, right: -8,
                minWidth: 16, height: 16, padding: '0 4px',
                borderRadius: 999,
                background: PI.color.ink900, color: PI.color.white,
                border: `1.5px solid ${PI.color.white}`,
                fontSize: 9, fontWeight: 600, letterSpacing: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1,
              }}>{m.dayN}</span>
            </div>
            {/* Pin stem */}
            <div style={{
              width: 2, height: 8, background: t.ring,
              marginTop: -1, borderRadius: 1,
              boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
            }}/>
          </div>
        );
      })}

      {/* Legend */}
      <div style={{
        position: 'absolute', left: 12, top: 12,
        background: PI.color.white, borderRadius: 8,
        border: `1px solid ${PI.color.ink200}`, padding: '8px 10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column', gap: 6,
        fontFamily: PI.font.sans,
      }}>
        <div style={{
          fontSize: 10, color: PI.color.ink500, letterSpacing: PI.font.tracking.xs,
          textTransform: 'uppercase', fontWeight: 500,
        }}>Tour Map · {placed.length} stops</div>
        {[
          { kind: 'accommodation', label: 'Accommodation', icon: 'bed' },
          { kind: 'flight',        label: 'Flight',        icon: 'planeTakeoff' },
          { kind: 'transfer',      label: 'Transfer',      icon: 'car' },
        ].map(row => {
          const count = placed.filter(m => m.kind === row.kind).length;
          const t = tint[row.kind];
          return (
            <div key={row.kind} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 11, color: count > 0 ? PI.color.ink800 : PI.color.ink400,
              letterSpacing: PI.font.tracking.xs,
            }}>
              <span style={{
                width: 16, height: 16, borderRadius: '50%',
                background: t.bg, color: t.fg,
                border: `1.5px solid ${count > 0 ? t.ring : PI.color.ink300}`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                opacity: count > 0 ? 1 : 0.5,
              }}><Icon name={row.icon} size={9} /></span>
              <span style={{ flex: 1 }}>{row.label}</span>
              <span style={{
                fontSize: 10, color: PI.color.ink500,
                background: PI.color.ink100, borderRadius: 4, padding: '0 5px',
              }}>{count}</span>
            </div>
          );
        })}
      </div>

      {/* Overseas badge (e.g. LHR → HND): note that overseas origins exist but
          live off this Tokyo-scale map. */}
      {far.length > 0 && (
        <div style={{
          position: 'absolute', left: 12, bottom: 12,
          background: PI.color.white, borderRadius: 8,
          border: `1px solid ${PI.color.ink200}`, padding: '6px 10px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 11, color: PI.color.ink700, letterSpacing: PI.font.tracking.xs,
          fontFamily: PI.font.sans,
        }}>
          <Icon name="globe" size={12} color={PI.color.ink600} />
          <span>{far.length} international {far.length === 1 ? 'stop' : 'stops'}:&nbsp;</span>
          <span style={{ fontWeight: 500, color: PI.color.ink900 }}>
            {far.map(m => m.label).join(', ')}
          </span>
        </div>
      )}

      {/* Empty state */}
      {placed.length === 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8,
          color: PI.color.ink600, fontFamily: PI.font.sans, textAlign: 'center',
          padding: 40,
        }}>
          <Icon name="pin" size={28} color={PI.color.ink500} />
          <div style={{ fontSize: 13, fontWeight: 500, color: PI.color.ink800, letterSpacing: PI.font.tracking.sm }}>
            No mappable items yet
          </div>
          <div style={{ fontSize: 12, color: PI.color.ink600, letterSpacing: PI.font.tracking.xs, maxWidth: 260 }}>
            Add accommodations, flights, or transfers with locations to see them appear on the map.
          </div>
        </div>
      )}

      {/* Zoom controls */}
      <div style={{
        position: 'absolute', right: 12, bottom: 12,
        display: 'flex', flexDirection: 'column',
        background: PI.color.white, borderRadius: 6,
        border: `1px solid ${PI.color.ink200}`, overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
      }}>
        <button style={mapBtn}>+</button>
        <div style={{ height: 1, background: PI.color.ink200 }} />
        <button style={mapBtn}>−</button>
      </div>
    </div>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 12, color: PI.color.ink800, letterSpacing: PI.font.tracking.sm }}>{label}</span>
      <button onClick={() => onChange(!value)} style={{
        width: 32, height: 18, borderRadius: 999,
        background: value ? PI.color.brand500 : PI.color.ink300,
        border: 0, cursor: 'pointer', position: 'relative',
        transition: 'background 120ms ease-out',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: value ? 16 : 2,
          width: 14, height: 14, borderRadius: '50%', background: PI.color.white,
          transition: 'left 120ms ease-out',
        }}/>
      </button>
    </div>
  );
}

function TourTab({ label, active, done }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '0 16px 14px', marginBottom: -1,
      borderBottom: active ? `2px solid ${PI.color.brand500}` : '2px solid transparent',
      cursor: 'pointer',
    }}>
      <span style={{
        width: 14, height: 14, borderRadius: '50%',
        background: active ? PI.color.brand500 : 'transparent',
        border: `1.5px solid ${active ? PI.color.brand500 : done ? PI.color.green500 : PI.color.ink300}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: active ? PI.color.white : PI.color.green500, fontSize: 8,
      }}>
        {done && !active && '✓'}
      </span>
      <span style={{
        fontSize: 14,
        color: active ? PI.color.brand500 : done ? PI.color.ink900 : PI.color.ink600,
        fontWeight: active ? 500 : 400,
        letterSpacing: PI.font.tracking.sm,
      }}>{label}</span>
    </div>
  );
}

const mapBtn = {
  width: 28, height: 28, border: 0, background: 'transparent',
  fontSize: 16, color: '#111', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: 'Helvetica Neue, Inter, sans-serif',
};

Object.assign(window, { Itinerary });
