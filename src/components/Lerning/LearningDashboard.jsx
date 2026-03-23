import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LevelDetailView from './componets/LevelDetailView';
import { Check, Lock, Trophy, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LearningDashboard = () => {
  const { language, t } = useLanguage();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [activeLevel, setActiveLevel] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

const levels = language === 'hi' ? [
  {
    id: 1,
    title: 'सोच में बदलाव',
    subtitle: 'स्टूडेंट से प्रोफेशनल तक',
    info: 'ग्रोथ माइंडसेट, जिम्मेदारी और दैनिक अनुशासन बनाएं ताकि स्टूडेंट मोड से प्रोफेशनल मोड में आ सकें।',
    searchQuery: 'growth mindset for students and professionals',
    youtubeLink: 'https://www.youtube.com/embed/75d_29QWELk'
  },
  {
    id: 2,
    title: 'मुख्य आधार',
    subtitle: 'बेसिक तकनीकी समझ',
    info: 'एडवांस्ड टॉपिक्स से पहले मूलभूत डोमेन कॉन्सेप्ट मजबूत करें।',
    searchQuery: 'technical fundamentals for beginners',
    youtubeLink: 'https://www.youtube.com/embed/8PopR3x-VMY'
  },
  {
    id: 3,
    title: 'कम्युनिकेशन मास्टरी',
    subtitle: 'स्पष्ट अभिव्यक्ति की कला',
    info: 'इंटरव्यू, मीटिंग और लिखित संचार में विचार स्पष्ट रूप से रखना सीखें।',
    searchQuery: 'communication skills for workplace and interviews',
    youtubeLink: 'https://www.youtube.com/embed/HAnw168huqA'
  },
  {
    id: 4,
    title: 'मानव व्यवहार',
    subtitle: 'वर्कप्लेस मनोविज्ञान',
    info: 'बेहतर सहयोग के लिए भावनात्मक बुद्धिमत्ता, सहानुभूति और व्यवहार पैटर्न समझें।',
    searchQuery: 'workplace psychology emotional intelligence',
    youtubeLink: 'https://www.youtube.com/embed/Y7m9eNoB3NU'
  },
  {
    id: 5,
    title: 'बॉडी लैंग्वेज',
    subtitle: 'गैर-मौखिक प्रभाव',
    info: 'मजबूत प्रोफेशनल प्रभाव के लिए पॉश्चर, आई कॉन्टैक्ट और कॉन्फिडेंस संकेत सुधारें।',
    searchQuery: 'body language for interviews and presentations',
    youtubeLink: 'https://www.youtube.com/embed/4jwUXV4QaTw'
  },
  {
    id: 6,
    title: 'इंटरव्यू ब्लूप्रिंट',
    subtitle: 'सफलता का फॉर्मूला',
    info: 'सामान्य इंटरव्यू प्रश्न, संरचित उत्तर और दबाव में आत्मविश्वास की तैयारी करें।',
    searchQuery: 'interview preparation HR and technical rounds',
    youtubeLink: 'https://www.youtube.com/embed/1mHjMNZZvFo'
  },
  {
    id: 7,
    title: 'करियर रोडमैप',
    subtitle: 'दीर्घकालिक योजना',
    info: 'स्पष्ट माइलस्टोन, भूमिका बदलाव और नेटवर्किंग के साथ 3-5 साल की ग्रोथ योजना बनाएं।',
    searchQuery: 'career roadmap planning for students',
    youtubeLink: 'https://www.youtube.com/embed/d6wRkzCW5qI'
  },
  {
    id: 8,
    title: 'प्रोफेशनल एथिक्स',
    subtitle: 'कॉर्पोरेट एटीकेट्स',
    info: 'वर्कप्लेस एटीकेट, प्रोफेशनल लेखन और एथिकल निर्णय कौशल विकसित करें।',
    searchQuery: 'professional ethics and corporate etiquette',
    youtubeLink: 'https://www.youtube.com/embed/5Z3Yy1Yw9rA'
  },
  {
    id: 9,
    title: 'फाइनल लॉन्च',
    subtitle: 'पोर्टफोलियो और ब्रांडिंग',
    info: 'पोर्टफोलियो बनाएं, प्रोफाइल ऑप्टिमाइज़ करें और जॉब रेडीनेस के लिए स्पष्ट पर्सनल ब्रांड तैयार करें।',
    searchQuery: 'portfolio and personal branding for freshers',
    youtubeLink: 'https://www.youtube.com/embed/RVkXxLh2DaA'
  }
] : [
  { 
    id: 1, 
    title: "The Mindset Shift", 
    subtitle: "From Student to Professional", 
    info: "Build a growth mindset, accountability, and daily discipline to transition from student mode to professional mode.", 
    searchQuery: "growth mindset for students and professionals",
    youtubeLink: "https://www.youtube.com/embed/75d_29QWELk" // Growth Mindset by Carol Dweck (summary)
  },
  { 
    id: 2, 
    title: "Core Fundamentals", 
    subtitle: "Basic Technical Understanding", 
    info: "Strengthen your foundation in core domain concepts before moving to advanced topics.", 
    searchQuery: "technical fundamentals for beginners",
    youtubeLink: "https://www.youtube.com/embed/8PopR3x-VMY" // Learning fundamentals
  },
  { 
    id: 3, 
    title: "Communication Mastery", 
    subtitle: "The Art of Speaking", 
    info: "Learn how to explain ideas clearly in interviews, meetings, and written communication.", 
    searchQuery: "communication skills for workplace and interviews",
    youtubeLink: "https://www.youtube.com/embed/HAnw168huqA" // Communication skills
  },
  { 
    id: 4, 
    title: "Human Behaviour", 
    subtitle: "Psychology in Workplace", 
    info: "Understand emotional intelligence, empathy, and behavior patterns to collaborate effectively.", 
    searchQuery: "workplace psychology emotional intelligence",
    youtubeLink: "https://www.youtube.com/embed/Y7m9eNoB3NU" // Emotional Intelligence
  },
  { 
    id: 5, 
    title: "Body Language", 
    subtitle: "Non-Verbal Impact", 
    info: "Improve posture, eye contact, and confidence cues to make a strong professional impression.", 
    searchQuery: "body language for interviews and presentations",
    youtubeLink: "https://www.youtube.com/embed/4jwUXV4QaTw" // Body language tips
  },
  { 
    id: 6, 
    title: "Interview Blueprint", 
    subtitle: "Cracking the Code", 
    info: "Prepare for common interview questions, structured answers, and confidence under pressure.", 
    searchQuery: "interview preparation HR and technical rounds",
    youtubeLink: "https://www.youtube.com/embed/1mHjMNZZvFo" // Interview tips
  },
  { 
    id: 7, 
    title: "Career Roadmap", 
    subtitle: "Long-term Planning", 
    info: "Plan a 3-5 year growth path with clear milestones, role transitions, and network building.", 
    searchQuery: "career roadmap planning for students",
    youtubeLink: "https://www.youtube.com/embed/d6wRkzCW5qI" // Career planning
  },
  { 
    id: 8, 
    title: "Professional Ethics", 
    subtitle: "Corporate Etiquettes", 
    info: "Master workplace etiquette, professional writing, and ethical decision-making practices.", 
    searchQuery: "professional ethics and corporate etiquette",
    youtubeLink: "https://www.youtube.com/embed/5Z3Yy1Yw9rA" // Workplace etiquette
  },
  { 
    id: 9, 
    title: "Final Launch", 
    subtitle: "Portfolio & Branding", 
    info: "Build a portfolio, optimize your profile, and create a clear personal brand for job readiness.",
    searchQuery: "portfolio and personal branding for freshers",
    youtubeLink: "https://www.youtube.com/embed/RVkXxLh2DaA" // Personal branding
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
        <h1 className="text-3xl font-extrabold text-[#0F172A]">{t('learningRoadmap')}</h1>
        <p className="text-[#64748B] mt-1">{t('learningProgress')}</p>
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
              <h2 className="text-2xl font-bold text-[#0F172A]">{t('courseCompleted')}</h2>
              <p className="text-[#64748B] mt-2 mb-6">{t('courseCompletedMsg')}</p>
              <button onClick={() => setIsCompleted(false)} className="w-full bg-[#2563EB] text-white py-3 rounded-lg font-semibold hover:bg-[#1D4ED8] transition">
                {t('close')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningDashboard;