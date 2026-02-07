import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, DollarSign, BookOpen, Briefcase, 
  Award, Zap, Cpu, Globe, GraduationCap, Library, Users 
} from 'lucide-react';

export default function RoadmapComparison() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data passed from Dashboard
  const { roadmaps } = location.state || { roadmaps: [] };

  if (!roadmaps || roadmaps.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-4">No roadmaps selected.</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">Go Back</button>
      </div>
    );
  }

  // Helper to render columns safely
  const renderCell = (renderFn) => {
    return (
      <div className={`grid grid-cols-${roadmaps.length} divide-x divide-gray-100`}>
        {roadmaps.map((rm, idx) => (
          <div key={idx} className="p-4 md:p-5 flex flex-col justify-center min-w-0 break-words">
            {renderFn(rm)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      
      {/* --- Sticky Header --- */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Career Battle: Comparison</h1>
          </div>
          <div className="hidden sm:block">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {roadmaps.length} Selected
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-6 py-2">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* --- 1. Roadmap Titles (Sticky below header) --- */}
          <div className="bg-gray-50 border-b border-gray-200 sticky top-[2px] z-30 shadow-sm">
             <div className={`grid grid-cols-${roadmaps.length} divide-x divide-gray-200`}>
              {roadmaps.map((rm, idx) => (
                <div key={idx} className="p-6 text-center bg-gray-50">
                  <h2 className="text-lg md:text-xl font-extrabold text-gray-900 leading-tight mb-2">
                    {rm.title}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="px-2 py-0.5 bg-white border border-gray-300 rounded text-[10px] font-bold text-gray-500 uppercase">
                      {rm.job_market_trends?.demand || "N/A"} Demand
                    </span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">
                      {rm.job_market_trends?.growth_rate || "0%"} Growth
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- 2. Future Trends & AI --- */}
          <SectionHeader icon={<Zap />} title="Future & AI Trends" />
          <Row label="Current Demand">
            {renderCell((rm) => (
              <p className="text-sm font-medium text-slate-700">
                {rm.CurrentWorld_and_Future_World_Requrment?.current_trends?.industry_demand}
              </p>
            ))}
          </Row>
          <Row label="AI & Emerging Skills" bg="bg-blue-50/30">
            {renderCell((rm) => (
               <div className="flex flex-wrap gap-1">
                 {rm.CurrentWorld_and_Future_World_Requrment?.future_requirements?.emerging_skills?.map((s, i) => (
                   <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200">
                     ✨ {s}
                   </span>
                 ))}
               </div>
            ))}
          </Row>
          <Row label="Future Industries">
            {renderCell((rm) => (
               <div className="flex flex-wrap gap-1">
                 {rm.CurrentWorld_and_Future_World_Requrment?.future_requirements?.future_industries?.map((ind, i) => (
                   <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{ind}</span>
                 ))}
               </div>
            ))}
          </Row>

          {/* --- 3. Financials --- */}
          <SectionHeader icon={<DollarSign />} title="Earning Potential" />
          <Row label="Entry Level (Year 1)">
            {renderCell((rm) => (
              <span className="font-semibold text-slate-600">{rm.career_growth?.year1?.salary_range}</span>
            ))}
          </Row>
          <Row label="Senior Level (Year 5)" bg="bg-green-50/30">
            {renderCell((rm) => (
              <div className="flex flex-col">
                <span className="font-bold text-green-700 text-lg">{rm.career_growth?.year5?.salary_range}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">{rm.career_growth?.year5?.title}</span>
              </div>
            ))}
          </Row>
          <Row label="Freelancing Scope">
            {renderCell((rm) => (
               <div className="space-y-2">
                 {rm.freelancing_opportunities?.map((f, i) => (
                   <div key={i} className="bg-gray-50 p-2 rounded border border-gray-100">
                     <div className="flex items-center gap-1 font-bold text-xs text-blue-600 mb-1">
                       <Globe className="w-3 h-3"/> {f.platform}
                     </div>
                     <div className="text-xs text-gray-600">{f.earning_potential}</div>
                   </div>
                 ))}
               </div>
            ))}
          </Row>

          {/* --- 4. Skills & Tools --- */}
          <SectionHeader icon={<Cpu />} title="Skills & Tech Stack" />
          <Row label="Tools & Tech">
             {renderCell((rm) => (
               <div className="flex flex-wrap gap-1">
                 {rm.tools_technologies?.map((t, i) => (
                   <span key={i} className="text-xs bg-slate-800 text-white px-2 py-1 rounded shadow-sm">{t}</span>
                 ))}
               </div>
             ))}
          </Row>
          <Row label="Technical Skills" bg="bg-gray-50">
             {renderCell((rm) => (
               <div className="flex flex-wrap gap-1">
                 {rm.skills?.technical?.map((s, i) => (
                   <span key={i} className="text-xs bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded">{s}</span>
                 ))}
               </div>
             ))}
          </Row>
           <Row label="Soft Skills">
             {renderCell((rm) => (
               <div className="flex flex-wrap gap-1">
                 {rm.skills?.soft?.map((s, i) => (
                   <span key={i} className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-1 rounded">{s}</span>
                 ))}
               </div>
             ))}
          </Row>

          {/* --- 5. Learning Path --- */}
          <SectionHeader icon={<GraduationCap />} title="Learning Path" />
          <Row label="Recommended Courses" bg="bg-indigo-50/20">
             {renderCell((rm) => (
               <div className="space-y-3">
                 {rm.recommended_courses?.map((c, i) => (
                   <a key={i} href={c.url} target="_blank" rel="noreferrer" className="group block bg-white border border-indigo-100 p-2 rounded hover:shadow-md transition-all">
                     <div className="text-xs font-bold text-indigo-600 group-hover:underline mb-1 truncate">{c.name}</div>
                     <div className="flex justify-between text-[10px] text-gray-400">
                       <span>{c.platform}</span>
                       <span>{c.duration}</span>
                     </div>
                   </a>
                 ))}
               </div>
             ))}
          </Row>
          <Row label="Certifications">
             {renderCell((rm) => (
               <ul className="space-y-1">
                 {rm.certifications?.map((c, i) => (
                   <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700 leading-snug">
                     <Award className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" /> 
                     <span>{c}</span>
                   </li>
                 ))}
               </ul>
             ))}
          </Row>

          {/* --- 6. Resources --- */}
          <SectionHeader icon={<Library />} title="Resources & Community" />
          <Row label="Books to Read">
             {renderCell((rm) => (
               <ul className="list-disc list-inside text-xs text-gray-600">
                 {rm.additional_resources?.books?.map((b, i) => <li key={i}>{b}</li>)}
               </ul>
             ))}
          </Row>
           <Row label="Communities" bg="bg-gray-50">
             {renderCell((rm) => (
               <div className="space-y-1">
                 {rm.additional_resources?.communities?.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                      <Users className="w-3 h-3"/> {c}
                    </div>
                 ))}
               </div>
             ))}
          </Row>

        </div>
      </main>
    </div>
  );
}

// --- Reusable Components ---

const SectionHeader = ({ icon, title }) => (
  <div className="bg-slate-900 text-white px-4 md:px-6 py-3 flex items-center gap-2 font-bold tracking-wide uppercase text-sm border-b border-slate-700 mt-0">
    {React.cloneElement(icon, { className: "w-5 h-5 text-indigo-400" })}
    {title}
  </div>
);

const Row = ({ label, children, bg = "bg-white" }) => (
  <div className={`${bg} border-b border-gray-100 grid grid-cols-[100px_1fr] md:grid-cols-[160px_1fr]`}>
    <div className="p-3 md:p-5 text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-wider border-r border-gray-200 flex items-center bg-white/50">
      {label}
    </div>
    <div className="w-full">
      {children}
    </div>
  </div>
);