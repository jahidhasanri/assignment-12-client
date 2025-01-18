import React from "react";
import { Link } from "react-router-dom";

const HealthTips = () => {
  const tips = [
    "Drink at least 8 glasses of water daily to stay hydrated.",
    "Get at least 7-8 hours of sleep to maintain good health.",
    "Exercise regularly for at least 30 minutes a day.",
    "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
    "Wash your hands frequently to prevent infections.",
    "Avoid smoking and limit alcohol consumption.",
  ];

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Stay Healthy with Expert Tips
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Here are some quick health tips to help you live a better and
          healthier life.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                Tip {index + 1}
              </h3>
              <p className="text-gray-600 mt-2">{tip}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to={
              "https://www.niddk.nih.gov/health-information/weight-management/healthy-eating-physical-activity-for-life/health-tips-for-adults"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Read More Health Tips
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
