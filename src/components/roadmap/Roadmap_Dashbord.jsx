import { PlusCircle, Trash2, GitCompare, CheckCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bass_URL } from "../../utils/api";

export default function RoadmapDashboard({ user, setResponsess }) {
  const [roadmaps, setRoadmaps] = useState([]);
  const [hoveredDelete, setHoveredDelete] = useState(null);
  
  // --- New States for Comparison ---
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  
  const navigate = useNavigate();

  const allRoadmap = async () => {
    try {
      // Assuming user._id is available. If not, handle gracefully.
      if (!user?._id) return;
      console.log(user._id);
      let response = await fetch(`${bass_URL}/career-paths/All/${user._id}`);
      if (!response.ok) return;
      response = await response.json();
      setRoadmaps(response.data);
    } catch (error) {
      console.log("Error fetching roadmaps:", error);
    }
  };

  useEffect(() => {
    allRoadmap();
  }, [user]);

  const deleteRoadmap = async (id) => {
    try {
      const response = await fetch(`${bass_URL}/career-paths/delete/${id}`);
      if (response.ok) {
        // Optimistic update
        setRoadmaps(roadmaps.filter(r => r._id !== id));
      }
    } catch (error) {
      console.log("Failed to delete roadmap:", error);
    }
  };

  // --- Comparison Logic ---
  const toggleSelection = (roadmap) => {
    if (selectedForCompare.find((r) => r._id === roadmap._id)) {
      setSelectedForCompare(prev => prev.filter((r) => r._id !== roadmap._id));
    } else {
      if (selectedForCompare.length >= 3) {
        alert("You can compare up to 3 roadmaps at a time.");
        return;
      }
      setSelectedForCompare(prev => [...prev, roadmap]);
    }
  };

  const handleCardClick = (roadmap, index) => {
    if (isCompareMode) {
      toggleSelection(roadmap);
    } else {
      setResponsess(roadmap); // Existing logic
      navigate("/roadmapView");
    }
  };

  const handleProceedToCompare = () => {
    if (selectedForCompare.length < 2) {
      alert("Please select at least 2 roadmaps to compare.");
      return;
    }
    // Navigate and pass the data via state
    navigate("/compare-roadmaps", { state: { roadmaps: selectedForCompare } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center relative">
      
      {/* Header Actions */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">📌 My Roadmaps</h2>
        
        <div className="flex gap-3">
          {/* Compare Toggle Button */}
          <button
            onClick={() => {
              setIsCompareMode(!isCompareMode);
              setSelectedForCompare([]);
            }}
            className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${
              isCompareMode 
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            }`}
          >
            {isCompareMode ? <X className="w-5 h-5"/> : <GitCompare className="w-5 h-5"/>}
            {isCompareMode ? "Cancel Compare" : "Compare"}
          </button>

          <button
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 flex items-center gap-2"
            onClick={() => navigate("/assessment")}
          >
            <PlusCircle className="w-5 h-5" /> New Roadmap
          </button>
        </div>
      </div>

      {/* Comparison Sticky Bar (Shows when selecting) */}
      {isCompareMode && (
        <div className="fixed bottom-6 z-50 bg-white border border-indigo-100 shadow-2xl rounded-full px-6 py-3 flex items-center gap-6 animate-slide-up">
          <span className="font-semibold text-gray-700">
            {selectedForCompare.length} selected (Max 3)
          </span>
          <button 
            onClick={handleProceedToCompare}
            disabled={selectedForCompare.length < 2}
            className={`px-6 py-2 rounded-full font-bold text-white transition-all ${
              selectedForCompare.length >= 2 
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30" 
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Compare Now
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-23 gap-6 w-full max-w-6xl pb-24">
        {roadmaps.map((roadmap, index) => {
          const isSelected = selectedForCompare.find(r => r._id === roadmap._id);
          
          return (
            <div
              key={index}
              onClick={() => handleCardClick(roadmap, index)}
              className={`
                relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group
                ${isCompareMode 
                    ? (isSelected ? "border-indigo-500 bg-indigo-50 shadow-indigo-100" : "border-gray-200 bg-white hover:border-indigo-200") 
                    : "border-transparent bg-white shadow-lg hover:shadow-xl hover:-translate-y-1"
                }
              `}
            >
              {/* Selection Checkbox (Visible only in Compare Mode) */}
              {isCompareMode && (
                <div className={`absolute top-4 right-4 transition-all ${isSelected ? "text-indigo-600" : "text-gray-300"}`}>
                  <CheckCircle className={`w-8 h-8 ${isSelected ? "fill-indigo-100" : ""}`} />
                </div>
              )}

              {/* Delete Button (Hidden in Compare Mode) */}
              {!isCompareMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteRoadmap(roadmap._id);
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              <h3 className="text-xl font-bold text-gray-900 pr-8">{roadmap.title}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                Created: {new Date(roadmap.createdAt).toLocaleDateString()}
              </p>

              <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 h-28 overflow-hidden">
                 <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                   {roadmap.description}
                 </p>
              </div>

              {/* Mini Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">
                   Trend: {roadmap.job_market_trends?.growth_rate || "N/A"}
                </span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md font-medium">
                   Salary: {roadmap.career_growth?.year1?.salary_range || "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



// import { PlusCircle, Trash2, GitCompare, CheckCircle, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { bass_URL } from "../../utils/api";

// export default function RoadmapDashboard({ user, setResponsess }) {
//   const [roadmaps, setRoadmaps] = useState([]);
//   const [hoveredDelete, setHoveredDelete] = useState(null);
  
//   // --- New Logic for Comparison ---
//   const [isCompareMode, setIsCompareMode] = useState(false);
//   const [selectedForCompare, setSelectedForCompare] = useState([]);
  
//   const navigate = useNavigate();

//   const allRoadmap = async () => {
//     try {
//       if (!user?._id) return;
//       let response = await fetch(`${bass_URL}/career-paths/All/${user._id}`);
//       if (!response.ok) {
//         console.log("Failed to fetch data.");
//         return;
//       }
//       response = await response.json();
//       setRoadmaps(response.data);
//     } catch (error) {
//       console.log("Error fetching roadmaps:", error);
//     }
//   };

//   useEffect(() => {
//     if (user) allRoadmap();
//   }, [user]);

//   const deleteRoadmap = async (id) => {
//     try {
//       const response = await fetch(`${bass_URL}/career-paths/delete/${id}`);
//       if (!response.ok) console.log("Failed to delete");
//       alert("Roadmap deleted successfully");
//       allRoadmap();
//     } catch (error) {
//       console.log("Failed to delete roadmap:", error);
//     }
//   };

//   // --- Comparison Handlers ---
//   const toggleSelection = (roadmap) => {
//     const exists = selectedForCompare.find((r) => r._id === roadmap._id);
//     if (exists) {
//       setSelectedForCompare(prev => prev.filter((r) => r._id !== roadmap._id));
//     } else {
//       if (selectedForCompare.length >= 3) {
//         alert("You can only compare up to 3 roadmaps.");
//         return;
//       }
//       setSelectedForCompare(prev => [...prev, roadmap]);
//     }
//   };

//   const handleCardClick = (roadmap, index) => {
//     if (isCompareMode) {
//       toggleSelection(roadmap);
//     } else {
//       setResponsess(roadmap);
//       navigate("/roadmapView");
//     }
//   };

//   const handleProceedToCompare = () => {
//     if (selectedForCompare.length < 2) {
//       alert("Please select at least 2 roadmaps.");
//       return;
//     }
//     navigate("/compare-roadmaps", { state: { roadmaps: selectedForCompare } });
//   };

//   return (
//     <div className="p-6 flex flex-col items-center relative min-h-screen">
      
//       {/* 1. Header Section with "Compare" Toggle */}
//       <div className="w-full max-w-5xl flex justify-between items-center mb-8 relative">
//         <h2 className="text-3xl font-bold text-gray-800">📌 My Roadmaps</h2>
        
//         <div className="flex gap-4">
//             {/* The Compare Button */}
//             <button
//                 onClick={() => {
//                 setIsCompareMode(!isCompareMode);
//                 setSelectedForCompare([]);
//                 }}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all shadow-sm ${
//                 isCompareMode 
//                     ? "bg-red-100 text-red-600 border border-red-200" 
//                     : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
//                 }`}
//             >
//                 {isCompareMode ? <X className="w-5 h-5" /> : <GitCompare className="w-5 h-5" />}
//                 {isCompareMode ? "Cancel Comparison" : "Compare Roadmaps"}
//             </button>

//             {/* Original Create Button (Top Right) */}
//             <button
//                 className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center gap-2"
//                 onClick={() => navigate("/assessment")}
//             >
//                 <PlusCircle className="w-5 h-5" /> Create
//             </button>
//         </div>
//       </div>

//       {/* 2. Floating Action Bar (Visible only when selecting) */}
//       {isCompareMode && selectedForCompare.length > 0 && (
//         <div className="fixed bottom-10 z-50 animate-bounce-in">
//             <button 
//                 onClick={handleProceedToCompare}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-2xl font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105"
//             >
//                 <GitCompare className="w-6 h-6" />
//                 Compare ({selectedForCompare.length}) Items
//             </button>
//         </div>
//       )}

//       {/* 3. The Grid (Your Original UI Style) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl pb-20">
//         {roadmaps.map((roadmap, index) => {
//             const isSelected = selectedForCompare.find(r => r._id === roadmap._id);

//             return (
//                 <div
//                     key={index}
//                     onClick={() => handleCardClick(roadmap, index)}
//                     className={`
//                         relative p-8 rounded-2xl border transform transition-all duration-300 cursor-pointer shadow-lg
//                         ${isCompareMode && isSelected 
//                             ? "bg-indigo-100 border-indigo-500 scale-105 ring-4 ring-indigo-200" // Highlight style
//                             : "bg-blue-100 hover:bg-green-200 border-gray-300 hover:scale-105 hover:shadow-xl" // Your Original Style
//                         }
//                         ${isCompareMode && !isSelected ? "opacity-60 hover:opacity-100" : ""}
//                     `}
//                 >
//                     {/* Compare Checkbox (Only shows in Compare Mode) */}
//                     {isCompareMode && (
//                         <div className="absolute top-4 right-4">
//                             {isSelected ? (
//                                 <CheckCircle className="w-8 h-8 text-indigo-600 fill-white" />
//                             ) : (
//                                 <div className="w-8 h-8 rounded-full border-2 border-gray-400 bg-white/50" />
//                             )}
//                         </div>
//                     )}

//                     {/* Delete Icon (Only shows in Normal Mode) */}
//                     {!isCompareMode && (
//                         <div className="absolute top-4 right-4 flex flex-col items-center group">
//                             <button
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     deleteRoadmap(roadmap._id);
//                                 }}
//                                 onMouseEnter={() => setHoveredDelete(roadmap._id)}
//                                 onMouseLeave={() => setHoveredDelete(null)}
//                                 className="text-gray-600 hover:text-red-500 transition-all duration-300"
//                             >
//                                 <Trash2 className="w-6 h-6" />
//                             </button>
//                             {hoveredDelete === roadmap._id && (
//                                 <span className="absolute -top-7 bg-black text-white text-xs px-2 py-1 rounded-lg opacity-90 w-max">
//                                     Delete permanently
//                                 </span>
//                             )}
//                         </div>
//                     )}

//                     <h3 className="text-2xl font-semibold text-gray-800 pr-10">{roadmap.title}</h3>
//                     <p className="text-md text-gray-600 mb-4">
//                         🗓️ Created on {new Date(roadmap.createdAt).toISOString().split("T")[0]}
//                     </p>

//                     <div className="bg-white p-5 rounded-lg shadow-sm">
//                         <h4 className="text-lg font-medium text-gray-700 mb-2">🚀 Roadmap Description:</h4>
//                         <p className="text-gray-800 line-clamp-3">{roadmap.description}</p>
//                     </div>
//                 </div>
//             );
//         })}
//       </div>

//       {/* 4. Your Original Bottom Button */}
//       {!isCompareMode && (
//         <button
//             className="mt-10 px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-110 flex items-center gap-3"
//             onClick={() => navigate("/assessment")}
//         >
//             <PlusCircle className="w-8 h-8" /> Create New Roadmap
//         </button>
//       )}
//     </div>
//   );
// }