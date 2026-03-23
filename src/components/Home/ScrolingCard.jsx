import React from 'react';
import './ScrolingCard.css';
import CustomWebsiteDevelopmentCard from './CustomWebsiteDevelopmentCard';
import app from '../../Asset/imagesWeb/scrolingCard/Rectangle1.png';
import digital from '../../Asset/imagesWeb/scrolingCard/Rectangle2.png';
import whatapp from '../../Asset/imagesWeb/scrolingCard/Rectangle3.png';
import anylesis from '../../Asset/imagesWeb/scrolingCard/Rectangle4.png';
import bigData from '../../Asset/imagesWeb/scrolingCard/Rectangle5.png';
import website from '../../Asset/imagesWeb/scrolingCard/Rectangle6.png';
import { useLanguage } from '../../context/LanguageContext';

export default function ScrolingCard() {
  const { language, t } = useLanguage();

  const cardDetail = language === 'hi' ? [
    {
      title: 'स्मार्ट करियर मूल्यांकन',
      description:
        'हमारे मूल्यांकन इंजन से शुरुआत करें और टेक्नोलॉजी क्षेत्रों में अपनी ताकत, रुचि और करियर फिट पहचानें।',
      bulletPoints: [
        'सटीक स्किल और रुचि मैपिंग के लिए रोल-आधारित प्रश्न।',
        'उच्च संभावनाओं वाले करियर विकल्पों के लिए तुरंत विश्लेषण।',
        'रोडमैप और लर्निंग प्लानिंग से पहले एक मजबूत पहला कदम।',
      ],
      image: website,
      bgColor: 'yellow',
    },
    {
      title: 'पर्सनलाइज्ड रोडमैप बिल्डर',
      description:
        'अपने प्रोफाइल के अनुसार स्पष्ट माइलस्टोन, टूल्स और अगले कदमों के साथ स्टेप-बाय-स्टेप रोडमैप बनाएं।',
      bulletPoints: [
        'शुरुआत से जॉब-रेडी स्तर तक AI द्वारा तैयार पाथ।',
        'फाउंडेशन, प्रोजेक्ट्स और परिणामों के साथ संरचित लक्ष्य।',
        'रोडमैप डैशबोर्ड से आसान ट्रैकिंग।',
      ],
      image: app,
      bgColor: 'red',
    },
    {
      title: 'लर्निंग डैशबोर्ड',
      description:
        'हर स्तर के लिए विषय-आधारित मार्गदर्शन और वीडियो सपोर्ट के साथ क्यूरेटेड लर्निंग चरणों का पालन करें।',
      bulletPoints: [
        'प्रोग्रेस-आधारित स्तर, चरण-दर-चरण अनलॉक।',
        'करियर ग्रोथ और इंटरव्यू-केंद्रित प्रैक्टिकल कंटेंट।',
        'बेसिक्स से एडवांस्ड तैयारी तक निरंतर लर्निंग फ्लो।',
      ],
      image: digital,
      bgColor: 'pink',
    },
    {
      title: 'GenModels AI मार्गदर्शन',
      description:
        'आधुनिक भूमिकाओं के लिए AI-सहायता प्राप्त करियर सुझाव और तैयारी पाथ खोजने के लिए GenModels सेक्शन उपयोग करें।',
      bulletPoints: [
        'रोल चयन और प्लानिंग के लिए डेटा-आधारित सुझाव।',
        'व्यावहारिक दिशा के साथ करियर-केंद्रित सिफारिशें।',
        'भ्रम कम करने और निर्णय क्षमता बढ़ाने के लिए निर्मित।',
      ],
      image: whatapp,
      bgColor: 'orange',
    },
    {
      title: 'रिज्यूमे और पोर्टफोलियो सपोर्ट',
      description:
        'अपने लक्ष्य रोल के अनुसार रिज्यूमे-रेडी मार्गदर्शन और पोर्टफोलियो प्लानिंग के साथ प्रोफेशनल प्रोफाइल मजबूत करें।',
      bulletPoints: [
        'फ्रेशर्स और शुरुआती करियर उम्मीदवारों के लिए रोल-विशिष्ट पोजिशनिंग।',
        'बेहतर दृश्यता के लिए प्रोजेक्ट और स्किल प्रस्तुति टिप्स।',
        'हायरिंग और इंटर्नशिप अवसरों के लिए केंद्रित तैयारी।',
      ],
      image: bigData,
      bgColor: 'blue',
    },
    {
      title: 'कंसल्टेंट और करियर मेंटरिंग',
      description:
        'रोडमैप सुधार, इंटरव्यू तैयारी और व्यावहारिक करियर निर्णयों के लिए विशेषज्ञ सहायता प्राप्त करें।',
      bulletPoints: [
        'वास्तविक करियर चुनौतियों के लिए मेंटर-ड्रिवन मार्गदर्शन।',
        'लर्निंग और प्लेसमेंट तैयारी के लिए लागू करने योग्य सुधार।',
        'अपने लक्ष्यों पर बने रहने के लिए निरंतर सपोर्ट।',
      ],
      image: anylesis,
      bgColor: 'green',
    },
  ] : [
    {
      title: "Smart Career Assessment",
      description:
        "Start with our assessment engine to identify your strengths, interests, and career fit across technology domains.",
      bulletPoints: [
        "Role-aligned questions for accurate skill and interest mapping.",
        "Instant analysis to suggest high-potential career directions.",
        "A strong first step before roadmap and learning planning.",
      ],
      image: website,
      bgColor: "yellow", // Yellow background
    },
    {
      title: "Personalized Roadmap Builder",
      description:
        "Generate a step-by-step career roadmap with clear milestones, tools, and next actions based on your profile.",
      bulletPoints: [
        "AI-generated path from beginner level to job-ready stage.",
        "Structured goals across foundations, projects, and outcomes.",
        "Easy tracking through your roadmap dashboard.",
      ],
      image: app,
      bgColor: "red", // Red background
    },
    {
      title: "Learning Dashboard",
      description:
        "Follow curated learning stages with topic-focused guidance and direct video-based support for each level.",
      bulletPoints: [
        "Progress-based levels to unlock learning step by step.",
        "Practical content focused on career growth and interviews.",
        "Consistent learning flow from basics to advanced readiness.",
      ],
      image: digital,
      bgColor: "pink", // Pink background
    },
    {
      title: "GenModels AI Guidance",
      description:
        "Use the GenModels section to explore AI-supported career suggestions and preparation paths for modern roles.",
      bulletPoints: [
        "Data-backed suggestions for role selection and planning.",
        "Career-focused recommendations with practical direction.",
        "Built to reduce confusion and improve decision confidence.",
      ],
      image: whatapp,
      bgColor: "orange", // Orange background
    },
    {
      title: "Resume and Portfolio Support",
      description:
        "Build a stronger professional profile with resume-ready guidance and portfolio planning aligned to your target role.",
      bulletPoints: [
        "Role-specific positioning for fresher and early-career candidates.",
        "Project and skill presentation tips for better visibility.",
        "Focused preparation for hiring and internship opportunities.",
      ],
      image: bigData,
      bgColor: "blue", // Blue background
    },
    {
      title: "Consultant and Career Mentoring",
      description:
        "Get expert support for roadmap refinement, interview preparation, and practical career decisions.",
      bulletPoints: [
        "Mentor-driven guidance for real-world career challenges.",
        "Actionable improvements for learning and placement readiness.",
        "Continuous support to stay on track with your goals.",
      ],
      image: anylesis,
      bgColor: "green", // Green background
    },
  ];

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-blue-950 mb-8">
        {t('partnersTitle').toUpperCase()}
      </h1>

      <p className="w-1/2 m-auto text-center text-xl text-gray-600 mb-8">
        {t('partnersSubtitle')}
      </p>
      <div className="container">
        <ul id="cards">
          {cardDetail.map((card, index) => (
            <li className="card" key={index} id={`card${index + 1}`}>
              <CustomWebsiteDevelopmentCard
                title={card.title}
                description={card.description}
                bulletPoints={card.bulletPoints}
                image={card.image}
                bgColor= {card.bgColor}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
