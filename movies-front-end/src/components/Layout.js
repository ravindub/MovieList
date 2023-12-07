// Importing Outlet from react-router-dom
import { Outlet } from 'react-router-dom';

import React from 'react';

// Layout component acting as a container for nested routes
const Layout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Layout;
