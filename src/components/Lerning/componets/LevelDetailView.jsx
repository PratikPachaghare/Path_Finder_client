import React from 'react';
import { motion } from 'framer-motion';
import { X, PlayCircle, Info, CheckCircle } from 'lucide-react';

const LevelDetailView = ({ level, onClose, onComplete }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex flex-col md:flex-row"
    >
      {/* Sidebar Info (Blue Accent) */}
      <div className="w-full md:w-80 bg-[#F1F5F9] border-r border-[#E2E8F0] p-8 flex flex-col">
        <button onClick={onClose} className="flex items-center text-[#2563EB] font-semibold mb-8 hover:underline">
          <X size={18} className="mr-2" /> Close Level
        </button>
        
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Current Level</span>
          <h2 className="text-2xl font-black text-[#0F172A] mt-1">{level.title}</h2>
        </div>

        <div className="space-y-6">
          <div className="flex gap-3">
            <div className="text-[#2563EB] mt-1"><Info size={20} /></div>
            <p className="text-[#475569] text-sm leading-relaxed">{level.info}</p>
          </div>
          <div className="flex gap-3">
            <div className="text-green-500 mt-1"><CheckCircle size={20} /></div>
            <p className="text-[#475569] text-sm leading-relaxed">Complete the video to unlock the next stage.</p>
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="mt-auto w-full bg-[#2563EB] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#1D4ED8] transition-all flex items-center justify-center gap-2"
        >
          Mark as Complete
        </button>
      </div>

      {/* Content Area (Video) */}
      <div className="flex-1 bg-white p-6 md:p-12 flex flex-col">
        <div className="flex items-center gap-2 mb-6 text-[#64748B]">
          <PlayCircle size={20} />
          <span className="font-medium">Curriculum Video</span>
        </div>
        
        <div className="flex-1 bg-slate-100 rounded-3xl overflow-hidden shadow-inner border border-[#E2E8F0]">
          <iframe 
            className="w-full h-full" 
            src={`https://www.youtube.com/embed/${level.videoId}`}
            title="Learning Content"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
};

export default LevelDetailView;