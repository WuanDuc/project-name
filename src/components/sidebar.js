import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard" exact activeClassName="active-tab" className="tab">Dashboard</Link>
      <Link to="/score" activeClassName="active-tab" className="tab">Score</Link>
      <Link to="/report" activeClassName="active-tab" className="tab">Report</Link>
      <Link to="/setting" activeClassName="active-tab" className="tab">Setting</Link>
    </div>
  );
};

export default Sidebar;
