import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LevelDetailView from './componets/LevelDetailView';
import { Check, Lock, Trophy, ArrowRight } from 'lucide-react';

const LearningDashboard = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [activeLevel, setActiveLevel] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

const levels = [
  { 
    id: 1, 
    title: "The Mindset Shift", 
    subtitle: "From Student to Professional", 
    info: "Professional world me enter karne ke liye sabse pehle mindset badalna zaroori hai. Yahan hum discipline aur goal-setting seekhenge.", 
    videoId: "dQw4w9WgXcQ" 
  },
  { 
    id: 2, 
    title: "Core Fundamentals", 
    subtitle: "Basic Technical Understanding", 
    info: "Aapke domain ki core knowledge. Bina mazboot foundation ke building nahi khadi hoti.", 
    videoId: "dQw4w9WgXcQ" 
  },
  { 
    id: 3, 
    title: "Communication Mastery", 
    subtitle: "The Art of Speaking", 
    info: "Sirf kaam aana kaafi nahi hai, use explain karna bhi aana chahiye. Verbal aur written communication ki depth.", 
    videoId: "dQw4w9WgXcQ" 
  },
  { 
    id: 4, 
    title: "Human Behaviour", 
    subtitle: "Psychology in Workplace", 
    info: "Empathy, emotional intelligence, aur ye samajhna ki log kaise react karte hain. Teamwork ke liye sabse important.", 
    videoId: "dQw4w9WgXcQ" 
  },
  { 
    id: 5, 
    title: "Body Language", 
    subtitle: "Non-Verbal Impact", 
    info: "Aapka posture, eye contact aur hand gestures 70% communication handle karte hain. Confidence kaise dikhayein.", 
    videoId: "dQw4w9WgXcQ" 
  },
  { 
    id: 6, 
    title: "Interview Blueprint", 
    subtitle: "Cracking the Code", 
    info: "Common questions ko handle kaise karein, pressure me calm kaise rahein aur HR rounds ko kaise clear karein.", 
    videoId: "dQw4w9WgXcQ" 
  },
  { 
    id: 7, 
    title: "Career Roadmap", 
    subtitle: "Long-term Planning", 
    info: "Sirf job nahi, career kaise build karein. 5 saal ka vision aur networking strategies.", 
    videoId: "dQw4w9WgXcQ" 
  },
  { 
    id: 8, 
    title: "Professional Ethics", 
    subtitle: "Corporate Etiquettes", 
    info: "Email writing, meeting manners aur office politics ko professional tarike se handle karna.", 
    videoId: "dQw4w9WgXcQ" 
  },
  { 
    id: 9, 
    title: "Final Launch", 
    subtitle: "Portfolio & Branding", 
    info: "Apne saare skills ko ek jagah lakar apni personal branding karna aur market ke liye ready hona.", 
    videoId: "dQw4w9WgXcQ" 
  }
];

  const handleComplete = (id) => {
    if (id === levels.length) {
      setIsCompleted(true);
      setActiveLevel(null);
    } else {
      setCurrentLevel(id + 1);
      setActiveLevel(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-[#1E293B]">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-extrabold text-[#0F172A]">Learning Roadmap</h1>
        <p className="text-[#64748B] mt-1">Track your progress from beginner to professional.</p>
      </div>

      {/* Roadmap Path */}
      <div className="max-w-4xl mx-auto relative">
        {levels.map((lvl, idx) => {
          const isLocked = lvl.id > currentLevel;
          const isDone = lvl.id < currentLevel;

          return (
            <div key={lvl.id} className="relative flex items-start gap-6 mb-12">
              {/* Connecting Line */}
              {idx !== levels.length - 1 && (
                <div className={`absolute left-[23px] top-12 w-0.5 h-full ${isDone ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`} />
              )}

              {/* Status Icon */}
              <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm
                ${isDone ? 'bg-[#2563EB] border-[#2563EB] text-white' : 
                  isLocked ? 'bg-white border-[#E2E8F0] text-[#94A3B8]' : 'bg-white border-[#2563EB] text-[#2563EB] ring-4 ring-blue-50'}
              `}>
                {isDone ? <Check size={20} /> : isLocked ? <Lock size={18} /> : <span>{lvl.id}</span>}
              </div>

              {/* Card */}
              <motion.div 
                whileHover={!isLocked ? { y: -4 } : {}}
                onClick={() => !isLocked && setActiveLevel(lvl)}
                className={`flex-1 bg-white p-6 rounded-xl border transition-all cursor-pointer
                  ${isLocked ? 'border-[#E2E8F0] opacity-70' : 'border-[#E2E8F0] hover:border-[#2563EB] shadow-md'}
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-lg font-bold ${isLocked ? 'text-[#64748B]' : 'text-[#0F172A]'}`}>{lvl.title}</h3>
                    <p className="text-sm text-[#64748B]">{lvl.subtitle}</p>
                  </div>
                  {!isLocked && <ArrowRight size={20} className="text-[#2563EB]" />}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Sub-Component: Details */}
      <AnimatePresence>
        {activeLevel && (
          <LevelDetailView 
            level={activeLevel} 
            onClose={() => setActiveLevel(null)} 
            onComplete={() => handleComplete(activeLevel.id)}
          />
        )}
      </AnimatePresence>

      {/* Final Celebration Card */}
      <AnimatePresence>
        {isCompleted && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm text-center">
              <div className="w-20 h-20 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy size={40} />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A]">Course Completed!</h2>
              <p className="text-[#64748B] mt-2 mb-6">Congratulations! You have successfully transitioned to a Professional Student.</p>
              <button onClick={() => setIsCompleted(false)} className="w-full bg-[#2563EB] text-white py-3 rounded-lg font-semibold hover:bg-[#1D4ED8] transition">
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningDashboard;