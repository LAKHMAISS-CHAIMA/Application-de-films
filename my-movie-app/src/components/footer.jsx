import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-amber-800 text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} MovieAPP. All rights reserved.</p>
    </footer>
  );
}