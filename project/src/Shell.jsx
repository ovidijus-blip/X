/* global React, Icon, Avatar */
const { useState: useStateS } = React;
const PS = window.PYT;

function Sidebar({ page, onNav, collapsed, onToggleCollapse }) {
  const items = [
    { id: 'itinerary', label: 'Itinerary', icon: 'itinerary', sub: ['Public Tours', 'Private Tours', 'Drafts'] },
    { id: 'orders',    label: 'Orders',    icon: 'orders',    badge: true },
    { id: 'tasks',     label: 'My tasks',  icon: 'check',     badge: true },
    { id: 'clients',   label: 'Clients',   icon: 'users' },
    { id: 'settings',  label: 'Settings',  icon: 'gear' },
  ];
  const isActive = (id) => {
    if (id === 'itinerary') return page === 'tours';
    if (id === 'orders') return page === 'orders' || page === 'order-details';
    return page === id;
  };
  const W = collapsed ? 72 : 260;
  return (
    <div style={{
      width: W, flexShrink: 0, padding: collapsed ? '20px 12px' : '20px 16px',
      display: 'flex', flexDirection: 'column', gap: 4, background: PS.color.ink150,
      transition: 'width 150ms ease-out',
    }}>
      <div style={{ padding: '4px 4px 18px 4px' }}>
        {collapsed ? <img src="assets/logo-mark.svg" height="28" /> : <img src="assets/logo-lockup.svg" height="28" />}
      </div>
      <button onClick={() => onNav('tours')} style={{
        marginBottom: 10, height: 40, padding: collapsed ? 0 : '0 12px',
        borderRadius: 6, border: 0, cursor: 'pointer', color: '#fff',
        background: `linear-gradient(${PS.color.brand500}, ${PS.color.brand600})`,
        boxShadow: PS.shadow.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: PS.font.sans, fontSize: 14, letterSpacing: PS.font.tracking.sm,
      }}>
        <Icon name="plus" size={16} />
        {!collapsed && 'Create'}
      </button>
      {items.map(item => (
        <div key={item.id}>
          <div onClick={() => onNav(item.id === 'itinerary' ? 'tours' : item.id === 'orders' ? 'orders' : item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: collapsed ? '10px' : '8px 10px',
              borderRadius: 8, cursor: 'pointer',
              color: isActive(item.id) ? PS.color.brand500 : 'rgba(15,13,36,0.7)',
              fontFamily: PS.font.sans, fontSize: 14, letterSpacing: PS.font.tracking.sm,
              fontWeight: isActive(item.id) ? 500 : 400,
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}>
            <Icon name={item.icon} size={20} />
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && item.badge && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: PS.color.brand500 }}/>}
          </div>
          {!collapsed && item.sub && isActive(item.id) && (
            <div style={{ display:'flex', flexDirection:'column', paddingTop: 4 }}>
              {item.sub.map((s, i) => (
                <div key={s} style={{
                  padding: '6px 10px 6px 34px', fontSize: 14, borderRadius: 8,
                  letterSpacing: PS.font.tracking.sm, cursor: 'pointer',
                  background: i === 0 ? PS.color.brand50 : 'transparent',
                  color: i === 0 ? PS.color.brand500 : 'rgba(15,13,36,0.7)',
                  fontWeight: i === 0 ? 500 : 400,
                }}>{s}</div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{ marginTop: 'auto', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 13, color: PS.color.ink600, cursor: 'pointer', letterSpacing: PS.font.tracking.sm }}
        onClick={onToggleCollapse}>
        <Icon name="hideMenu" size={18} />
        {!collapsed && 'Hide menu'}
      </div>
    </div>
  );
}

function Topbar({ title, breadcrumb }) {
  return (
    <div style={{
      height: 64, padding: '16px 32px', borderBottom: `1px solid ${PS.color.ink200}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {breadcrumb && (
          <div style={{ color: PS.color.ink600, fontSize: 14, letterSpacing: PS.font.tracking.sm, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ cursor: 'pointer' }}>{breadcrumb.parent}</span>
            <Icon name="chevRight" size={14} color={PS.color.ink400} />
          </div>
        )}
        <h1 style={{ margin: 0, fontFamily: PS.font.sans, fontSize: 24, fontWeight: 500, color: PS.color.ink900 }}>
          {title}
        </h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar initials="M" />
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: PS.font.sans }}>
          <span style={{ fontSize: 14, color: PS.color.ink900, letterSpacing: PS.font.tracking.sm }}>Matas Jonėnas</span>
          <span style={{ fontSize: 12, color: PS.color.ink600, letterSpacing: PS.font.tracking.xs }}>Admin</span>
        </div>
      </div>
    </div>
  );
}

function Shell({ page, onNav, title, breadcrumb, children }) {
  const [collapsed, setCollapsed] = useStateS(false);
  return (
    <div style={{ height: '100vh', display: 'flex', background: PS.color.ink150, fontFamily: PS.font.sans }}>
      <Sidebar page={page} onNav={onNav} collapsed={collapsed} onToggleCollapse={() => setCollapsed(c => !c)} />
      <div style={{ flex: 1, padding: '12px 12px 12px 0', minWidth: 0 }}>
        <div style={{
          height: '100%', background: PS.color.white, borderRadius: 16,
          border: `1px solid ${PS.color.ink200}`, boxShadow: PS.shadow.card,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <Topbar title={title} breadcrumb={breadcrumb} />
          <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, Topbar, Shell });
