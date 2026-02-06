import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, Sparkles, ChevronLeft, ChevronRight, FileCheck, Info, AlertCircle } from 'lucide-react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';

// Import Templates
import Template1 from './tamplets/Template1';
import Template2 from './tamplets/Template2';
import Template3 from './tamplets/Template3';
import Template4 from './tamplets/Template4';
import Template5 from './tamplets/Template5';
import Template6 from './tamplets/Template6';
import Template7 from './tamplets/Template7';
import Template8 from './tamplets/Template8';
import Template9 from './tamplets/Template9';
import { bass_URL } from '../../utils/api';

const DUMMY_DATA = {
  personalInfo: {
    fullName: "TAYLOR SWIFT",
    jobTitle: "Music Producer & Entrepreneur",
    email: "taylor.swift@example.com",
    phone: "+1 (615) 555-0123",
    linkedin: "linkedin.com/in/taylorswift",
    github: "github.com/taylorswift",
    summary: "Award-winning music producer and songwriter with over 15 years of experience in the entertainment industry. Known for innovative album production, songwriting excellence, and successful business ventures. Expertise in brand development, digital marketing, and music technology. Passionate about mentoring emerging artists and leveraging technology for creative expression."
  },
  experience: [
    { 
      title: "Founder & CEO", 
      company: "Taylor Swift Productions", 
      year: "2015 - Present", 
      desc: "Founded and manage independent music production company with focus on artist development, album production, and innovative music technology integration. Led strategic expansion into multiple entertainment verticals including film production and music publishing." 
    },
    { 
      title: "Lead Artist & Songwriter", 
      company: "Republic Records", 
      year: "2008 - 2014", 
      desc: "Wrote and produced multiple Grammy-winning albums, achieving unprecedented commercial success. Pioneered new songwriting techniques and collaborated with industry-leading producers and artists worldwide." 
    }
  ],
  education: [
    { school: "Hendersonville High School", degree: "High School Diploma", year: "2008" },
    { school: "Belmont University", degree: "Music Industry Studies (Online)", year: "2010" }
  ],
  skills: ["Music Production", "Songwriting", "Business Management", "Digital Marketing", "Brand Strategy", "Audio Engineering", "Video Direction", "Performance", "Public Speaking", "Entrepreneurship"],
  projects: [
    { title: "Folklore Album", desc: "Grammy Award-winning surprise album release with innovative marketing strategy during pandemic" },
     { title: "Re-recordings Project", desc: "Strategic artist ownership initiative re-recording all catalog albums for maximum creative and financial control" },
  ],
  certifications: [
    { name: "Grammy Award - Best Album", issuer: "The Recording Academy", year: "2021" },
    { name: "Music Business Professional Certification", issuer: "Berklee College of Music", year: "2015" },
  ],
  strengths: [
    "Exceptional songwriting and storytelling ability",
    "Strong leadership and team management skills",
    ]
};

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [atsReport, setAtsReport] = useState(null);

  const [resumeData, setResumeData] = useState({
    personalInfo: { fullName: '', jobTitle: '', email: '', phone: '', linkedin: '', github: '', summary: '' },
    experience: [],
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    strengths: []
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleAIEnhance = async () => {
    setIsEnhancing(true);
    try {
      const payload = {
        resumeData: resumeData,
        jobDescription: resumeData.personalInfo.jobTitle || "Professional role matching this profile"
      };

      const response = await axios.post(`${bass_URL}/career-paths/enhanceResume`, payload);

      if (response.data && response.data.enhancedData) {
        setResumeData(response.data.enhancedData);
        setAtsReport({
          beforeScore: response.data.atsscore,
          afterScore: response.data.atsScore,
          analysis: response.data.summary || "Your resume has been optimized for ATS compatibility."
        });
        alert("AI Optimization Complete!");
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("Failed to reach AI server.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const renderTemplate = (customData = null) => {
    const props = { data: customData || resumeData };
    const templates = {
      template1: <Template1 {...props} />,
      template2: <Template2 {...props} />,
      template3: <Template3 {...props} />,
      template4: <Template4 {...props} />,
      template5: <Template5 {...props} />,
      template6: <Template6 {...props} />,
      template7: <Template7 {...props} />,
      template8: <Template8 {...props} />,
      template9: <Template9 {...props} />,
    };
    return templates[selectedTemplate] || templates.template1;
  };

  const templateList = [
    { id: 'template1', name: 'Classic Professional', comp: Template1 },
    { id: 'template2', name: 'Modern Sidebar', comp: Template2 },
    { id: 'template3', name: 'Executive Minimalist', comp: Template3 },
    { id: 'template4', name: 'Bold Creative', comp: Template4 },
    { id: 'template5', name: 'Tech Modern', comp: Template5 },
    { id: 'template6', name: 'Structured Grid', comp: Template6 },
    { id: 'template7', name: 'Timeline Left', comp: Template7 },
    { id: 'template8', name: 'Ivy League', comp: Template8 },
    { id: 'template9', name: 'Right Sidebar', comp: Template9 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      
      {/* LOADER */}
      {isEnhancing && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
          <h2 className="text-2xl font-bold mt-6 text-gray-800">AI is Optimizing Your Resume</h2>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Progress Stepper */}
        <div className="mb-12 flex justify-center items-center space-x-4">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {num}
              </div>
              {num < 3 && <div className={`w-12 h-1 ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1: FORM */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-extrabold mb-8">Professional Details</h2>
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            <div className="mt-10 flex justify-end">
              <button onClick={nextStep} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
                Choose Template <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TEMPLATE SELECTION (FIXED - Show User Data) */}
        {step === 2 && (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-extrabold mb-10 text-center">Select a Layout</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templateList.map((tmp) => (
                <div 
                  key={tmp.id}
                  onClick={() => { setSelectedTemplate(tmp.id); nextStep(); }}
                  className={`group relative cursor-pointer rounded-2xl border-2 transition-all overflow-hidden ${selectedTemplate === tmp.id ? 'border-blue-600 shadow-lg' : 'border-gray-100'}`}
                >
                  <div className="relative w-full aspect-[1/1.4] bg-gray-50 overflow-hidden">
                    <div className="absolute top-0 left-0 w-[210mm] transform origin-top-left scale-[0.38] p-4 pointer-events-none">
                      {/* FIXED: Passing actual resumeData instead of DUMMY_DATA */}
                      <tmp.comp data={resumeData.personalInfo.fullName ? resumeData : DUMMY_DATA} />
                    </div>
                  </div>
                  <div className="p-4 bg-white text-center font-bold">{tmp.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: PREVIEW & AI ACTIONS */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
               <div>
                  <h2 className="text-2xl font-black">Final Review</h2>
                  <p className="text-gray-500">Enhance your resume with AI before downloading.</p>
               </div>
               <div className="flex gap-3">
                 <button onClick={handleAIEnhance} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
                   <Sparkles size={18} /> AI Optimize
                 </button>
                 <button onClick={prevStep} className="px-6 py-3 text-gray-600 border rounded-xl">Edit</button>
               </div>
            </div>

            {/* --- ATS ANALYSIS (FIXED) --- */}
            {atsReport && (
               <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-lg">{atsReport.beforeScore}%</div>
                      <div>
                        <p className="text-sm font-bold text-gray-500 uppercase">Initial Score</p>
                        <p className="text-xs text-gray-400">Basic & missing keywords</p>
                      </div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">{atsReport.afterScore}%</div>
                      <div>
                        <p className="text-sm font-bold text-emerald-700 uppercase">AI Enhanced Score</p>
                        <p className="text-xs text-emerald-600">Keyword rich & impact oriented</p>
                      </div>
                    </div>
                 </div>

                 {/* WHY OLD RESUME WAS NOT GOOD */}
                 <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-3 text-blue-800 font-bold">
                      <AlertCircle size={20} />
                      <h3>AI Optimization Analysis</h3>
                    </div>
                    <p className="text-blue-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {atsReport.analysis}
                    </p>
                 </div>
               </div>
            )}
            
            <div className="flex justify-center">
               <ResumePreview>
                  {renderTemplate()}
               </ResumePreview>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;