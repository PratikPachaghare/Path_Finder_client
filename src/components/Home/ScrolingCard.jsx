import React from 'react';
import './ScrolingCard.css';
import CustomWebsiteDevelopmentCard from './CustomWebsiteDevelopmentCard';
import app from '../../Asset/imagesWeb/scrolingCard/Rectangle1.png';
import digital from '../../Asset/imagesWeb/scrolingCard/Rectangle2.png';
import whatapp from '../../Asset/imagesWeb/scrolingCard/Rectangle3.png';
import anylesis from '../../Asset/imagesWeb/scrolingCard/Rectangle4.png';
import bigData from '../../Asset/imagesWeb/scrolingCard/Rectangle5.png';
import website from '../../Asset/imagesWeb/scrolingCard/Rectangle6.png';

export default function ScrolingCard() {
  const cardDetail = [
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
        OUR PARTNERS
      </h1>

      <p className="w-1/2 m-auto text-center text-xl text-gray-600 mb-8">
        Our strategic partners help us deliver unmatched business value and
        unique experiences.
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
