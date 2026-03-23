/**
 * Example usage of Career Prediction ML API in React components
 */

import { mlAPI } from './mlApi';

/**
 * Example: Call ML API after assessment completion
 * Place this in assessment submission handler
 */
export async function handleAssessmentSubmit(assessmentResponses, userId) {
  try {
    console.log('Calling ML API with assessment data...');
    
    // Get comprehensive prediction
    const prediction = await mlAPI.predictComprehensive(assessmentResponses);
    
    if (prediction.success) {
      const { career_prediction, salary_prediction } = prediction.data;
      
      console.log('Career Prediction:', career_prediction);
      console.log('Salary Prediction:', salary_prediction);
      
      // You can now use these predictions to:
      // 1. Show recommendations to user
      // 2. Pre-fill roadmap suggestions
      // 3. Update user profile with predicted career
      // 4. Display salary expectations
      
      return {
        success: true,
        careerPrediction: career_prediction,
        salaryPrediction: salary_prediction
      };
    } else {
      console.warn('Prediction failed:', prediction.error);
      return {
        success: false,
        error: prediction.error
      };
    }
  } catch (error) {
    console.error('Error in assessment submission:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Example React Hook for ML predictions
 */
export function useCareePrediction() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [prediction, setPrediction] = React.useState(null);

  const predictCareer = async (assessmentData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await mlAPI.predictCareer(assessmentData);
      if (result.success) {
        setPrediction(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { predictCareer, loading, error, prediction };
}

/**
 * Example component using ML API
 */
/*
import { mlAPI } from '../utils/mlApi';

function CareerRecommendation({ assessmentData }) {
  const [recommendation, setRecommendation] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true);
      const result = await mlAPI.predictComprehensive(assessmentData);
      if (result.success) {
        setRecommendation(result.data);
      }
      setLoading(false);
    };

    if (assessmentData) {
      fetchRecommendation();
    }
  }, [assessmentData]);

  if (loading) return <div>Loading predictions...</div>;
  if (!recommendation) return null;

  return (
    <div className="recommendation-card">
      <h3>AI-Powered Career Recommendation</h3>
      <p>
        Career: {recommendation.career_prediction.predicted_career}
        ({recommendation.career_prediction.confidence}% confidence)
      </p>
      <p>
        Expected Salary: {recommendation.salary_prediction.salary_range}
      </p>
      <h4>Top Matching Careers:</h4>
      <ul>
        {recommendation.career_prediction.top_careers.map((career) => (
          <li key={career.career}>
            {career.career} - {career.probability.toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CareerRecommendation;
*/
