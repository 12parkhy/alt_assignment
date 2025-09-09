import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Product Store</h1>
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <p>&copy; 2025 Product Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
