import React, { useState } from 'react';
import { ThemeProvider } from './theme';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

export default function App() {
  return (
    <ThemeProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/signin" />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
            </Routes>
    </ThemeProvider>
  );
}
