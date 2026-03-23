import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    upgradePro: 'Upgrade Pro',
    profile: 'Profile',
    nameLabel: 'Name',
    logout: 'Logout',
    notAvailable: 'N/A',
    home: 'Home',
    assessment: 'Assessment',
    roadmapDashboard: 'Roadmap Dashboard',
    resumeBuilder: 'Resume Builder',
    learningDashboard: 'Learning Dashboard',
    talkToAI: 'Talk to AI',
    consultant: 'Consultant',
    courses: 'Courses',
    prediction: 'Prediction',
    welcomeTitle: 'Welcome',
    welcomeSubtitle:
      "Let's help you discover your perfect career path. Start by taking our comprehensive assessment to get personalized recommendations.",
    readyTitle: 'Ready to Begin Your Journey?',
    readySubtitle:
      'Our assessment will help understand your interests, skills, and aspirations to guide you toward the most suitable engineering career path.',
    startAssessment: 'Start Assessment',
    partnersTitle: 'Our Partners',
    partnersSubtitle:
      'Our strategic partners help us deliver unmatched business value and unique experiences.',
    clientsTitle: 'Our Clients',
    footerAbout:
      'Empowering the next generation of tech professionals with cutting-edge courses and expert instruction.',
    footerQuickLinks: 'Quick Links',
    footerAllCourses: 'All Courses',
    footerAboutUs: 'About Us',
    footerContact: 'Contact',
    footerBlog: 'Blog',
    footerCourseCategories: 'Course Categories',
    footerWebDevelopment: 'Web Development',
    footerDataScience: 'Data Science',
    footerMobileDevelopment: 'Mobile Development',
    footerCloudComputing: 'Cloud Computing',
    footerArtificialIntelligence: 'Artificial Intelligence',
    footerContactUs: 'Contact Us',
    footerRights: 'All rights reserved.',
    learningRoadmap: 'Learning Roadmap',
    learningProgress: 'Track your progress from beginner to professional.',
    courseCompleted: 'Course Completed!',
    courseCompletedMsg:
      'Congratulations! You have successfully transitioned to a Professional Student.',
    close: 'Close',
    consultantsTitle: 'Meet Our Expert Consultants',
    consultantsSubtitle:
      'Get expert guidance from top professionals in their respective fields.',
    requestAppointment: 'Request Appointment',
    appointmentRequested: 'Appointment Requested',
    appointmentAlert:
      'Your appointment request with {name} has been sent. A confirmation email and schedule details will be shared soon.',
    perHour: '/hr',
    courseExploreTitle: 'Explore Our Technical Courses',
    courseExploreSubtitle:
      "Discover cutting-edge technical courses designed to help you master the skills needed for today's digital world.",
    noCoursesTitle: 'No courses found matching your criteria',
    noCoursesSubtitle: 'Try adjusting your filters or search term',
    filterCourses: 'Filter Courses',
    search: 'Search',
    searchCoursesPlaceholder: 'Search courses...',
    category: 'Category',
    allCategories: 'All Categories',
    level: 'Level',
    allLevels: 'All Levels',
    registerFreeDemo: 'Register for a Free Demo',
    demoSubtitle:
      'Experience our world-class courses with a free demo session. Fill out the form to get started.',
    success: 'Success!',
    demoSuccessStart: "We've received your registration for the free demo of",
    demoSuccessEnd: "We'll contact you shortly!",
    selectedCourse: 'Selected Course',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    registerButton: 'Register for Free Demo',
    students: 'students',
    enrollNow: 'Enroll Now',
    referralScreen: 'Referral',
    referralCode: 'Referral Code',
    copyCode: 'Copy Code',
    shareWhatsApp: 'Share on WhatsApp',
    earnPoints: 'Earn Points',
    earnPointsDesc: 'Invite your friends and earn 100 points for each successful referral',
    pointsPerReferral: 'Per Referral: 100 Points',
    pointsNeeded: 'Points Needed',
    redeemCourse: 'Redeem Course',
    redeemFreeCourse: 'Redeem Free Course',
    redeemedAt: 'Redeemed at',
    referralsCount: 'Total Referrals',
    referredByLabel: 'Referred by',
    myReferralCode: 'My Referral Code',
    shareWithFriends: 'Share with Friends',
    viewReferrals: 'View My Referrals',
    nothingYet: 'Nothing yet!',
    yourFriendsAssign: 'Your friends will appear here when they sign up using your code',
    startEarning: 'Start Earning Points',
    pointsRemaining: 'points remaining',
    selectedCourse: 'Selected Course',
    currentPoints: 'Current Points',
    selectCourseRedeem: 'Select a course to redeem',
    codeCopied: 'Code Copied!',
    redeemSuccess: 'Course redeemed successfully!',
    insufficientPoints: 'Insufficient Points',
    errorRedeeming: 'Error while redeeming',
    points: 'Points',
    cancel: 'Cancel',
    loading: 'Loading',
    referralFeedback: 'Referral Feedback',
    feedbackHelpText: 'Share your experience with the referral feature. Your feedback helps improve the app.',
    rating: 'Rating',
    message: 'Message',
    feedbackPlaceholder: 'Write your feedback here...',
    submitFeedback: 'Submit Feedback',
    feedbackSubmitting: 'Submitting...',
    feedbackSuccess: 'Feedback submitted successfully!',
    feedbackValidation: 'Please write your feedback message.',
  },
  hi: {
    upgradePro: 'प्रो अपग्रेड करें',
    profile: 'प्रोफाइल',
    nameLabel: 'नाम',
    logout: 'लॉगआउट',
    notAvailable: 'उपलब्ध नहीं',
    home: 'होम',
    assessment: 'मूल्यांकन',
    roadmapDashboard: 'रोडमैप डैशबोर्ड',
    resumeBuilder: 'रिज्यूमे बिल्डर',
    learningDashboard: 'लर्निंग डैशबोर्ड',
    talkToAI: 'AI से बात करें',
    consultant: 'कंसल्टेंट',
    courses: 'कोर्सेस',
    prediction: 'प्रेडिक्शन',
    welcomeTitle: 'स्वागत है',
    welcomeSubtitle:
      'हम आपकी सही करियर दिशा खोजने में मदद करेंगे। व्यक्तिगत सुझाव पाने के लिए हमारा विस्तृत मूल्यांकन शुरू करें।',
    readyTitle: 'अपनी यात्रा शुरू करने के लिए तैयार हैं?',
    readySubtitle:
      'हमारा मूल्यांकन आपकी रुचियों, कौशल और लक्ष्यों को समझकर आपके लिए सबसे उपयुक्त इंजीनियरिंग करियर पाथ सुझाएगा।',
    startAssessment: 'मूल्यांकन शुरू करें',
    partnersTitle: 'हमारे पार्टनर्स',
    partnersSubtitle:
      'हमारे रणनीतिक पार्टनर्स हमें बेहतर बिजनेस वैल्यू और अनूठे अनुभव देने में मदद करते हैं।',
    clientsTitle: 'हमारे क्लाइंट्स',
    footerAbout:
      'अत्याधुनिक कोर्स और विशेषज्ञ मार्गदर्शन के साथ अगली पीढ़ी के टेक प्रोफेशनल्स को सशक्त बनाना।',
    footerQuickLinks: 'त्वरित लिंक',
    footerAllCourses: 'सभी कोर्सेस',
    footerAboutUs: 'हमारे बारे में',
    footerContact: 'संपर्क',
    footerBlog: 'ब्लॉग',
    footerCourseCategories: 'कोर्स श्रेणियां',
    footerWebDevelopment: 'वेब डेवलपमेंट',
    footerDataScience: 'डेटा साइंस',
    footerMobileDevelopment: 'मोबाइल डेवलपमेंट',
    footerCloudComputing: 'क्लाउड कंप्यूटिंग',
    footerArtificialIntelligence: 'आर्टिफिशियल इंटेलिजेंस',
    footerContactUs: 'हमसे संपर्क करें',
    footerRights: 'सभी अधिकार सुरक्षित।',
    learningRoadmap: 'लर्निंग रोडमैप',
    learningProgress: 'शुरुआती स्तर से प्रोफेशनल तक अपनी प्रगति ट्रैक करें।',
    courseCompleted: 'कोर्स पूरा हुआ!',
    courseCompletedMsg:
      'बधाई हो! आपने सफलतापूर्वक प्रोफेशनल स्टूडेंट स्तर तक प्रगति की है।',
    close: 'बंद करें',
    consultantsTitle: 'हमारे विशेषज्ञ कंसल्टेंट्स से मिलें',
    consultantsSubtitle:
      'अपने क्षेत्र के शीर्ष विशेषज्ञों से मार्गदर्शन प्राप्त करें।',
    requestAppointment: 'अपॉइंटमेंट अनुरोध करें',
    appointmentRequested: 'अपॉइंटमेंट अनुरोध भेजा गया',
    appointmentAlert:
      '{name} के साथ आपका अपॉइंटमेंट अनुरोध भेज दिया गया है। पुष्टि ईमेल और शेड्यूल विवरण जल्द साझा किए जाएंगे।',
    perHour: '/घंटा',
    courseExploreTitle: 'हमारे टेक्निकल कोर्स एक्सप्लोर करें',
    courseExploreSubtitle:
      'आज की डिजिटल दुनिया के लिए जरूरी कौशल सीखने हेतु बनाए गए आधुनिक तकनीकी कोर्स खोजें।',
    noCoursesTitle: 'आपके मानदंड से मेल खाते कोर्स नहीं मिले',
    noCoursesSubtitle: 'अपने फ़िल्टर या खोज शब्द बदलकर देखें',
    filterCourses: 'कोर्स फ़िल्टर करें',
    search: 'खोज',
    searchCoursesPlaceholder: 'कोर्स खोजें...',
    category: 'श्रेणी',
    allCategories: 'सभी श्रेणियां',
    level: 'स्तर',
    allLevels: 'सभी स्तर',
    registerFreeDemo: 'फ्री डेमो के लिए रजिस्टर करें',
    demoSubtitle:
      'हमारे विश्वस्तरीय कोर्स का फ्री डेमो अनुभव करें। शुरू करने के लिए फॉर्म भरें।',
    success: 'सफलता!',
    demoSuccessStart: 'हमने आपके फ्री डेमो रजिस्ट्रेशन को प्राप्त कर लिया है:',
    demoSuccessEnd: 'हम आपसे जल्द संपर्क करेंगे!',
    selectedCourse: 'चयनित कोर्स',
    fullName: 'पूरा नाम',
    emailAddress: 'ईमेल पता',
    phoneNumber: 'फोन नंबर',
    registerButton: 'फ्री डेमो के लिए रजिस्टर करें',
    students: 'स्टूडेंट्स',
    enrollNow: 'अभी नामांकन करें',
    referralScreen: 'रेफरल',
    referralCode: 'रेफरल कोड',
    copyCode: 'कोड कॉपी करें',
    shareWhatsApp: 'WhatsApp पर शेयर करें',
    earnPoints: 'अंक अर्जित करें',
    earnPointsDesc: 'अपने दोस्तों को आमंत्रित करें और प्रत्येक सफल रेफरल के लिए 100 अंक अर्जित करें',
    pointsPerReferral: 'प्रति रेफरल: 100 अंक',
    pointsNeeded: 'आवश्यक अंक',
    redeemCourse: 'कोर्स भुनाएं',
    redeemFreeCourse: 'मुफ्त कोर्स भुनाएं',
    redeemedAt: 'से भुनाया गया',
    referralsCount: 'कुल रेफरल',
    referredByLabel: 'द्वारा संदर्भित',
    myReferralCode: 'मेरा रेफरल कोड',
    shareWithFriends: 'अपने दोस्तों के साथ शेयर करें',
    viewReferrals: 'मेरे रेफरल देखें',
    nothingYet: 'अभी कुछ नहीं!',
    yourFriendsAssign: 'जब आपके दोस्त आपके कोड का उपयोग करके साइन अप करेंगे तो वे यहां दिखाई देंगे',
    startEarning: 'अंक अर्जित करना शुरू करें',
    pointsRemaining: 'अंक बाकी हैं',
    selectedCourse: 'चयनित कोर्स',
    currentPoints: 'वर्तमान अंक',
    selectCourseRedeem: 'भुनाने के लिए कोर्स चुनें',
    codeCopied: 'कोड कॉपी किया गया!',
    redeemSuccess: 'कोर्स सफलतापूर्वक भुनाया गया!',
    insufficientPoints: 'अपर्याप्त अंक',
    errorRedeeming: 'भुनाते समय त्रुटि हुई',
    points: 'अंक',
    cancel: 'रद्द करें',
    loading: 'लोड हो रहा है',
    referralFeedback: 'रेफरल फीडबैक',
    feedbackHelpText: 'रेफरल फीचर के बारे में अपना अनुभव साझा करें। आपका फीडबैक ऐप को बेहतर बनाने में मदद करता है।',
    rating: 'रेटिंग',
    message: 'संदेश',
    feedbackPlaceholder: 'अपना फीडबैक यहां लिखें...',
    submitFeedback: 'फीडबैक सबमिट करें',
    feedbackSubmitting: 'सबमिट हो रहा है...',
    feedbackSuccess: 'फीडबैक सफलतापूर्वक सबमिट हुआ!',
    feedbackValidation: 'कृपया अपना फीडबैक संदेश लिखें।',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('appLanguage') || 'en');

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
