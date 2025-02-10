'use client';

import { useState } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

interface ProgressData {
  dailyGoal: number;
  earnedToday: number;
  completedRides: number;
}

interface ProgressDashboardProps {
  progress: ProgressData;
  onUpdateDailyGoal?: (newGoal: number) => void;
}

export default function ProgressDashboard({ progress, onUpdateDailyGoal }: ProgressDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(progress.dailyGoal.toString());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleSave = () => {
    const parsedGoal = parseInt(newGoal);
    if (!isNaN(parsedGoal) && parsedGoal > 0 && onUpdateDailyGoal) {
      onUpdateDailyGoal(parsedGoal);
      setIsEditing(false);
    }
  };

  const progressPercentage = (progress.earnedToday / progress.dailyGoal) * 100;
  return (
    <div className="space-y-4 p-4 bg-bleu-nuit rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Today's Progress</h2>
        <div className="text-sm text-blue-200">
          {progress.completedRides} rides completed
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-blue-200">Daily Goal</p>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FaEdit />
              </button>
            )}
          </div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter goal amount"
              />
              <button
                onClick={handleSave}
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewGoal(progress.dailyGoal.toString());
                }}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <p className="text-2xl font-bold text-white">{formatPrice(progress.dailyGoal)}</p>
          )}
        </div>
  
        <div className="space-y-2">
          <p className="text-blue-200">Earned Today</p>
          <p className="text-2xl font-bold text-white">{formatPrice(progress.earnedToday)}</p>
        </div>
      </div>
  
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-blue-200">Progress</span>
          <span className="text-white font-medium">{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}  
