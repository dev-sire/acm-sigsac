
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: string;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [endDate]);

  if (isExpired) {
    return (
      <div className={`text-white ${className} flex justify-center`}>
        <span className="text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-md border border-red-500/30 animate-pulse">
          Registrations Full! 
        </span>
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className={`text-white ${className}`}>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-cyber-dark/80 border border-cyber-neon/30 rounded-md px-2 py-1 min-w-[45px] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-neon/5 animate-pulse-glow pointer-events-none"></div>
      <span className="text-lg font-mono text-cyber-neon relative z-10">{value.toString().padStart(2, '0')}</span>
    </div>
    <span className="text-xs text-white/60 mt-1">{label}</span>
  </div>
);

export default CountdownTimer;