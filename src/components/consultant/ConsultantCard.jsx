import { useState } from "react";
import { bass_URL } from "../../utils/api";
import { useLanguage } from '../../context/LanguageContext';

export default function ConsultantCard({ consultant, user }) {
  const [bookedOption, setBookedOption] = useState(null);
  const { t } = useLanguage();

  const sendEmail = async () => {
    try {
      await fetch(`${bass_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          consultantName: consultant.name,
          meetingType: "Appointment Request",
          meetingPrice: consultant.price,
        }),
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleBooking = () => {
    setBookedOption(t('appointmentRequested'));
    alert(
      t('appointmentAlert').replace('{name}', consultant.name)
    );

    sendEmail(); // Send confirmation email
  };

  return (
    <div
      className={`w-72 shadow-md rounded-lg overflow-hidden p-4 border border-gray-200 transition ${
        bookedOption ? "bg-green-100" : "bg-white"
      }`}
    >
      <img
        src={consultant.image}
        alt={consultant.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{consultant.name}</h3>
        <p className="text-sm text-gray-600">
          {consultant.education} - {consultant.degree}
        </p>
        <p className="text-sm text-gray-500 mt-2">{consultant.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-yellow-500 font-semibold">⭐ {consultant.rating}</span>
          <span className="text-gray-800 font-bold">₹{consultant.price}{t('perHour')}</span>
        </div>

        {bookedOption ? (
          <button
            className="mt-4 w-full py-2 rounded-lg bg-green-600 text-white"
            disabled
          >
            {bookedOption}
          </button>
        ) : (
          <button
            onClick={handleBooking}
            className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {t('requestAppointment')}
          </button>
        )}
      </div>
    </div>
  );
}
