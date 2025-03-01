import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

  // Early Return pattern
  if (!isMenuOpen) return null;
  return (
    <div className="p-5 shadow-lg w-48 mt-16">
      <ul>
        <li><Link to="/"> Home </Link></li>
        <li>Shorts</li>
        <li>Subscriptions</li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
      <h1 className="font-bold pt-5">Explore</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
      <h1 className="font-bold pt-5">More From YT</h1>
      <ul>
        <li>YT Premium</li>
        <li>YT Studio</li>
        <li>YT Kids</li>
      </ul>
    </div>
  );
};

export default Sidebar;
