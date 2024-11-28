import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Vuexy</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/weddings">Wedding</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
