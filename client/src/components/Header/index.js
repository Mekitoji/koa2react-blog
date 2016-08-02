import React from 'react';

// Header container represect page header
// If user doesn't auth - show the sign in form username/password =>
// open more with social network auth
// Link to sign up form for new user
// Need something like isAuth() (bool)
const Header = () => (
  <ul>
    <li>Index</li>
    <li>User</li>
    <li>Admin</li>
    <li>Profile</li>
  </ul>
);

export default Header;
