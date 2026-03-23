/**
 * API utility for Career Prediction ML Models
 * Calls Python Flask backend for predictions
 */

// Configuration
const ML_API_BASE_URL = process.env.REACT_APP_ML_API_URL || 'http://localhost:5000';

class CareerPredictionAPI {
  constructor(baseURL = ML_API_BASE_URL) {
    this.baseURL = baseURL;
    this.endpoints = {
      health: '/health',
      modelInfo: '/api/model-info',
      predictCareer: '/api/predict/career',
      predictSalary: '/api/predict/salary',
      predictComprehensive: '/api/predict/comprehensive'
    };
  }

  /**
   * Check API health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoints.health}`);
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      return { status: 'error', error: error.message };
    }
  }

  /**
   * Get model training status
   */
  async getModelInfo() {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoints.modelInfo}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting model info:', error);
      return { status: 'error', error: error.message };
    }
  }

  /**
   * Convert assessment responses to ML model input format
   */
  formatAssessmentData(assessmentResponses) {
    /**
     * Maps assessment question IDs to model feature names
     */
    const featureMapping = {
      'education_level': 'education_level',
      'subject_interest': 'subject_interest',
      'coding_experience': 'coding_experience_score',
      'tech_innovation': 'tech_innovation_interest',
      'ai_interest': 'ai_interest_score',
      'engineering_field': 'engineering_preference',
      'cybersecurity_interest': 'cybersecurity_interest',
      'robotics_interest': 'robotics_interest',
      'data_science': 'data_science_interest',
      'game_development': 'game_dev_interest',
      'entrepreneur_interest': 'entrepreneur_score',
      'communication_skill': 'communication_skill',
      'problem_solving': 'problem_solving_ability',
      'leadership': 'leadership_score',
      'teamwork': 'teamwork_score',
      'creativity': 'creativity_score',
      'analytical': 'analytical_skill',
      'experience': 'experience_years'
    };

    const formatted = {};

    // Handle array format responses from AssessmentForm
    let responsePairs = {};
    if (Array.isArray(assessmentResponses)) {
      assessmentResponses.forEach((item, index) => {
        if (item && item.answer) {
          responsePairs[`response_${index}`] = item.answer;
        }
      });
    } else {
      responsePairs = assessmentResponses;
    }

    // Map assessment responses to model features
    Object.entries(responsePairs).forEach(([key, value]) => {
      const featureKey = Object.keys(featureMapping).find(
        k => key.toLowerCase().includes(k.toLowerCase())
      );

      if (featureKey) {
        const featureName = featureMapping[featureKey];
        
        // Convert response to numeric value if needed
        if (typeof value === 'string') {
          // Keep categorical features as strings
          if (featureName === 'education_level' || 
              featureName === 'subject_interest' || 
              featureName === 'engineering_preference') {
            formatted[featureName] = value;
          } else {
            // Convert interest responses to numeric scores
            const scoreMap = {
              'yes': 4, 'very interested': 4, 'expert': 4,
              'maybe': 2, 'not sure': 2, 'somewhat interested': 2,
              'no': 0, 'not interested': 0, 'beginner': 1,
              'intermediate': 2, 'advanced': 3,
              'already working': 4, 'i am currently': 3
            };
            
            const score = scoreMap[value.toLowerCase()] ?? (value.length > 2 ? 2 : 0);
            formatted[featureName] = score;
          }
        } else {
          formatted[featureName] = value;
        }
      }
    });

    // Set default values for missing features
    const defaults = {
      'education_level': 'Bachelor\'s',
      'subject_interest': 'Science & Technology',
      'coding_experience_score': 2,
      'tech_innovation_interest': 2,
      'ai_interest_score': 2,
      'engineering_preference': 'Software',
      'cybersecurity_interest': 1,
      'robotics_interest': 1,
      'data_science_interest': 2,
      'game_dev_interest': 1,
      'entrepreneur_score': 1,
      'communication_skill': 3,
      'problem_solving_ability': 3,
      'leadership_score': 2,
      'teamwork_score': 3,
      'creativity_score': 2,
      'analytical_skill': 2,
      'experience_years': 0
    };

    Object.entries(defaults).forEach(([key, value]) => {
      if (!(key in formatted)) {
        formatted[key] = value;
      }
    });

    return formatted;
  }

  /**
   * Predict career path
   */
  async predictCareer(assessmentData) {
    try {
      const formattedData = this.formatAssessmentData(assessmentData);
      
      const response = await fetch(`${this.baseURL}${this.endpoints.predictCareer}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error predicting career:', error);
      return {
        success: false,
        error: error.message,
        predicted_career: 'Unable to predict'
      };
    }
  }

  /**
   * Predict salary range
   */
  async predictSalary(assessmentData) {
    try {
      const formattedData = this.formatAssessmentData(assessmentData);

      const response = await fetch(`${this.baseURL}${this.endpoints.predictSalary}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error predicting salary:', error);
      return {
        success: false,
        error: error.message,
        predicted_salary: 0
      };
    }
  }

  /**
   * Get comprehensive prediction (career + salary)
   */
  async predictComprehensive(assessmentData) {
    try {
      const formattedData = this.formatAssessmentData(assessmentData);

      const response = await fetch(`${this.baseURL}${this.endpoints.predictComprehensive}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error making comprehensive prediction:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }
}

// Export singleton instance
export const mlAPI = new CareerPredictionAPI();

// Also export class for custom instances
export default CareerPredictionAPI;
