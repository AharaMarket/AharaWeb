import React from 'react';

export const AppHeader = ({ menuToggleEnabled, title, toggleMenu, className }) => (
  <header className={className}>
    <h1>{title}</h1>
    {menuToggleEnabled && <button onClick={toggleMenu}>Toggle Menu</button>}
  </header>
);

export const SideNavigationMenu = ({ selectedItemChanged, openMenu, compactMode, onMenuReady }) => (
  <nav>
    <ul onClick={selectedItemChanged} onPointerDown={openMenu}>
      {/* Menu items here */}
    </ul>
    {compactMode ? <div>Compact Mode</div> : <div>Full Mode</div>}
    <div onReady={onMenuReady}>Menu Content</div>
  </nav>
);

export const UserPanel = ({ menuMode }) => (
  <div>
    {menuMode === 'context' ? <div>Context Menu</div> : <div>List Menu</div>}
  </div>
);

export const UserMenuSection = ({ showAvatar, listRef }) => (
  <section ref={listRef}>
    {showAvatar && <div>Avatar</div>}
    {/* User Menu Items */}
  </section>
);

export const AuthContext = React.createContext({
  user: undefined,
  signIn: async (email, password) => ({ isOk: false, data: undefined, message: '' }),
  signOut: () => {},
  loading: false,
});

export const SideNavToolbar = ({ title }) => (
  <div className="side-nav-toolbar">
    <h2>{title}</h2>
  </div>
);

export const SingleCard = ({ title, description }) => (
  <div className="single-card">
    {title && <h3>{title}</h3>}
    {description && <p>{description}</p>}
  </div>
);

export const NavigationContext = React.createContext({
  setNavigationData: ({ currentPath }) => {},
  navigationData: { currentPath: '' },
});
