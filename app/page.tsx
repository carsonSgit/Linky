"use client";

import Welcome from './components/Welcome/Welcome';
import Navbar from './components/Nav/Navbar';
import './page.css';

export default function HomePage() {
  return (
    <>
      <Navbar text="" />
      <Welcome />
    </>
  );
}