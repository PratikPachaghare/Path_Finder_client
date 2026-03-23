import ConsultantCard from "./ConsultantCard";
import defaultProfile from "../../Assete/consultant/profile-image.jpg";
import ashishProfile from "../../Assete/consultant/asihsh_shinde.jpeg";

const consultants = [
  {
    id: 1,
    name: "Kaustubh Nilkanth Teware",
    education: "Current Company: TCS, Manila, Philippines",
    degree: "IT Infrastructure Manager",
    image: defaultProfile,
    rating: 4.8,
    description:
      "Contact: +91 8208236534 | knteware@gmail.com",
    price: 1200,
    chatCallPrice: 900,
    videoMeetPrice: 1600,
  },
  {
    id: 2,
    name: "Mr. Ashish Shende",
    education: "Current Company: Emergys Solutions Private Limited, Pune",
    degree: "Application Development Architect",
    image: ashishProfile,
    rating: 4.7,
    description:
      "Contact: ashishpshende@gmail.com",
    price: 1500,
    chatCallPrice: 1000,
    videoMeetPrice: 1800,
  },
  {
    id: 3,
    name: "Dr. Vaibhav Khandare",
    education: "Sri Sri Ravishankar Research Lab, Bangalor",
    degree: "Sr. Research Manager",
    image: defaultProfile,
    rating: 4.9,
    description:
      "Contact: +91 98192 66123",
    price: 1300,
    chatCallPrice: 950,
    videoMeetPrice: 1700,
  },
  {
    id: 4,
    name: "Sachin Manohar Dandage",
    education: "PLITMS Buldhana",
    degree: "Vice-Principal (Cosmetics Engineering)",
    image: defaultProfile,
    rating: 4.6,
    description:
      "Contact: 9921394713 | dandage.sachin@gmail.com",
    price: 1400,
    chatCallPrice: 1000,
    videoMeetPrice: 1750,
  },
];

export default function Consultant({user}) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Meet Our Expert Consultants
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Get expert guidance from top professionals in their respective fields.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {consultants.map((consultant) => (
          <ConsultantCard key={consultant.id} consultant={consultant} user={user}/>
        ))}
      </div>
    </div>
  );
}
