import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Volume2, VolumeX, BellRing, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const HeaderClockCalendar: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [showClassroomTimer, setShowClassroomTimer] = useState<boolean>(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(40 * 60); // 40 minutes lesson
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            soundManager.playVictory();
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  const toggleMute = () => {
    const newMuted = soundManager.toggleMuted();
    setIsMuted(newMuted);
    if (!newMuted) {
      soundManager.playClick();
    }
  };

  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const dayName = dayNames[time.getDay()];
  const dayNum = time.getDate();
  const monthName = monthNames[time.getMonth()];
  const year = time.getFullYear();

  const timerMin = Math.floor(timerSecondsLeft / 60);
  const timerSec = (timerSecondsLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-3">
      {/* Sound Mute Toggle */}
      <button
        onClick={toggleMute}
        title={isMuted ? 'Sesleri Aç' : 'Sesi Kapat (Sessiz Mod)'}
        className={`p-2 rounded-xl border transition-all cursor-pointer ${
          isMuted
            ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
            : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
        }`}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Classroom Bell / Quick Lesson Timer Trigger */}
      <div className="relative">
        <button
          onClick={() => {
            soundManager.playClick();
            setShowClassroomTimer(!showClassroomTimer);
          }}
          title="Ders & Teneffüs Sayacı"
          className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
            isTimerRunning
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 animate-pulse'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BellRing className={`w-3.5 h-3.5 ${isTimerRunning ? 'text-emerald-600' : 'text-slate-500'}`} />
          <span className="hidden sm:inline">
            {isTimerRunning ? `${timerMin}:${timerSec}` : 'Ders Sayacı'}
          </span>
        </button>

        {showClassroomTimer && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-40 animate-fade-in">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Sınıf Ders Zamanlayıcı
              </span>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {timerMin}:{timerSec}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setTimerSecondsLeft(40 * 60);
                  setIsTimerRunning(true);
                }}
                className="py-1.5 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                40 dk (Ders)
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setTimerSecondsLeft(10 * 60);
                  setIsTimerRunning(true);
                }}
                className="py-1.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors cursor-pointer"
              >
                10 dk (Teneffüs)
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setTimerSecondsLeft(5 * 60);
                  setIsTimerRunning(true);
                }}
                className="py-1.5 text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-colors cursor-pointer"
              >
                5 dk (Etkinlik)
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsTimerRunning(!isTimerRunning);
                }}
                className="py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                {isTimerRunning ? 'Duraklat' : 'Devam Et'}
              </button>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                setIsTimerRunning(false);
                setTimerSecondsLeft(40 * 60);
                setShowClassroomTimer(false);
              }}
              className="w-full py-1 text-center text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Kapat ve Sıfırla
            </button>
          </div>
        )}
      </div>

      {/* Date & Calendar Widget */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-slate-200 rounded-xl shadow-xs">
        <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
        <div className="text-left leading-tight">
          <div className="text-xs font-bold text-slate-800">
            {dayNum} {monthName} {year}
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            {dayName} · 2024-2025
          </div>
        </div>
      </div>

      {/* Real-time Clock Widget */}
      <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl shadow-xs border border-slate-800">
        <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
        <div className="text-left font-mono">
          <div className="text-sm font-black tracking-wider flex items-center gap-0.5">
            <span>{hours}</span>
            <span className="text-amber-400 font-normal">:</span>
            <span>{minutes}</span>
            <span className="text-slate-400 text-xs ml-0.5 font-normal">:{seconds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
