import React, { useState, useMemo } from 'react';
import { 
  Briefcase, GraduationCap, Brain, 
  ChevronRight, CheckCircle, ArrowLeft,
  ShieldCheck, Zap, BarChart3, Target, Info,DollarSign,TrendingUp ,BookOpen 
} from 'lucide-react';

// Importing your data from local files
import { companies } from './data/companies';
import { branchData } from './data/branchData';

function GenModelsAi() {
  const [activeSection, setActiveSection] = useState('company');
  const [step, setStep] = useState(1); 
  const [branch, setBranch] = useState('');
  const [academicScore, setAcademicScore] = useState({ cgpa: '' });
  const [answers, setAnswers] = useState({});

  // Calculation Logic using your imported companies.js
  const predictedCompanies = useMemo(() => {
    if (!branch || !academicScore.cgpa) return [];
    
    // Get list of skills user checked based on questions
    const studentSkills = branchData[branch]?.questions
      .filter(q => answers[q.id])
      .map(q => q.skill) || [];

    return companies
      .filter(company => Number(academicScore.cgpa) >= (company.minCGPA || 6.0))
      .map(company => {
        const matchedSkills = company.requiredSkills.filter(s => studentSkills.includes(s));
        const skillMatchScore = (matchedSkills.length / company.requiredSkills.length) * 100;
        
        // 70% skill weight + 30% CGPA weight
        const finalScore = Math.round(skillMatchScore * 0.7 + (Number(academicScore.cgpa) / 10) * 30);
        
        return { 
          ...company, 
          matchScore: finalScore || 45,
          matchedSkills: matchedSkills,
          missingSkills: company.requiredSkills.filter(s => !studentSkills.includes(s))
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6); // Display top 6 matches
  }, [branch, academicScore.cgpa, answers]);

  const toggleAnswer = (id) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Premium Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Brain className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-800">Career<span className="text-indigo-600">Sync AI</span></span>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveSection('company')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeSection === 'company' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Placement Match
            </button>
            <button 
              onClick={() => setActiveSection('college')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeSection === 'college' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              College Finder
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-10 px-6">
        {activeSection === 'company' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar: Profile Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  Live Profile Analysis
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                      <span>Academic CGPA</span>
                      <span>{academicScore.cgpa || '0.0'}/10</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${(academicScore.cgpa || 0) * 10}%` }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-indigo-600 mt-1" />
                      <p className="text-xs text-indigo-800 leading-relaxed font-medium">
                        Matching your profile against <b>{companies.length} global enterprises</b> and startup benchmarks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Stepper Content */}
            <div className="lg:col-span-8">
              {step === 1 && (
                <div className="bg-white p-8 md:p-12 rounded-[32px] border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Build Your Profile</h2>
                  <p className="text-slate-500 mb-10">Select your specialization to start the matching process.</p>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-3 block">Engineering Specialization</label>
<select
  value={branch || ""}
  onChange={(e) => setBranch(e.target.value)}
  className="w-full p-4 bg-white border border-slate-300 rounded-xl 
             text-slate-900 font-semibold 
             focus:outline-none focus:ring-2 focus:ring-indigo-200 
             focus:border-indigo-400 cursor-pointer"
>
  <option value="">Choose your branch...</option>

  {Object.keys(branchData || {}).map((k) => (
    <option key={k} value={k}>
      {k}
    </option>
  ))}
</select>

                    </div>
                    
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-3 block">Current CGPA</label>
                      <input 
                        type="number" 
                        step="0.01"
                        value={academicScore.cgpa}
                        onChange={(e) => setAcademicScore({...academicScore, cgpa: e.target.value})}
                        placeholder="e.g. 8.5"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={!branch || !academicScore.cgpa}
                    onClick={() => setStep(2)}
                    className="mt-12 w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-xl shadow-indigo-100 disabled:opacity-20 transition-all active:scale-95"
                  >
                    Next: Verify Technical Skills <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white p-8 md:p-12 rounded-[32px] border border-slate-200 shadow-sm animate-in slide-in-from-right">
                  <button onClick={() => setStep(1)} className="text-slate-400 hover:text-indigo-600 flex items-center gap-2 mb-8 font-bold text-sm">
                    <ArrowLeft className="w-4 h-4" /> Go Back
                  </button>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Skill Verification</h2>
                  
                  <div className="grid gap-4">
                    {branchData[branch]?.questions.map(q => (
                      <div 
                        key={q.id}
                        onClick={() => toggleAnswer(q.id)}
                        className={`p-6 border-2 rounded-2xl cursor-pointer transition-all flex items-center justify-between group ${
                          answers[q.id] ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${answers[q.id] ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
                            <Target className="w-5 h-5" />
                          </div>
                          <span className={`font-bold text-lg ${answers[q.id] ? 'text-indigo-900' : 'text-slate-600'}`}>{q.text}</span>
                        </div>
                        {answers[q.id] && <CheckCircle className="text-indigo-600 w-6 h-6" />}
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setStep(3)} className="mt-12 w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                    Generate Placement Report
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Top Matches Found</h2>
                      <p className="text-sm text-slate-400 font-medium">Based on {Object.keys(answers).length} verified skill points</p>
                    </div>
                    <button onClick={() => setStep(1)} className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors">Retake Test</button>
                  </div>
                  
                  <div className="grid gap-6">
                    {predictedCompanies.map((company) => (
  <div key={company.name} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden group mb-8">
    <div className="p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-50 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center border border-slate-100 shadow-sm">
            <img 
              src={company.logo} 
              alt={company.name} 
              className="max-h-full max-w-full object-contain"
              onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=" + company.name; }}
            />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800">{company.name}</h3>
            <div className="flex gap-2 mt-1">
              <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md uppercase">
                {company.category}
              </span>
              <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase">
                Min CGPA: {company.minCGPA}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black text-indigo-600">{company.matchScore}%</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Profile Match</div>
        </div>
      </div>

      {/* Student Guide Section: New Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Freshman Package
          </p>
          <p className="text-lg font-bold text-slate-800">{company.package || 'N/A'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Selection Rate
          </p>
          <p className="text-lg font-bold text-slate-800">{company.selectionRate || 'N/A'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <GraduationCap className="w-3 h-3" /> Eligible Branches
          </p>
          <p className="text-sm font-bold text-slate-600">{company.branch.join(', ')}</p>
        </div>
      </div>

      {/* Syllabus / Preparation Roadmap */}
      <div className="bg-slate-50 rounded-2xl p-6">
        <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-500" /> Preparation Syllabus
        </h4>
        <div className="flex flex-wrap gap-2">
          {company.syllabus?.map((item, idx) => (
            <span key={idx} className="bg-white px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
              {item}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all">
        Download Full Interview Guide
      </button>
    </div>
  </div>
))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default GenModelsAi;