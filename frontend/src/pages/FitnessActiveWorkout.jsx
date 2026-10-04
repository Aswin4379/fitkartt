import React, { useState, useEffect } from 'react';
import FitnessActiveWorkoutPremium from './FitnessActiveWorkoutPremium.jsx';
import FitnessActiveWorkoutClassic from './FitnessActiveWorkoutClassic.jsx';

export default function FitnessActiveWorkout() {
  // Load saved theme preference, default to 'premium'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('fitkart_workout_theme') || 'premium';
  });

  // Save theme preference whenever it changes
  useEffect(() => {
    localStorage.setItem('fitkart_workout_theme', theme);
  }, [theme]);

  const handleSwitchToClassic = () => setTheme('classic');
  const handleSwitchToPremium = () => setTheme('premium');

  if (theme === 'classic') {
    return <FitnessActiveWorkoutClassic onSwitchTheme={handleSwitchToPremium} />;
  }

  return <FitnessActiveWorkoutPremium onSwitchTheme={handleSwitchToClassic} />;
}
