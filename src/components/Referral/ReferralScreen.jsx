import React, { useState, useEffect } from 'react';
import { Copy, Share2, Gift, Users, CheckCircle, AlertCircle, TrendingUp, MessageCircle, Award, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { bass_URL } from '../../utils/api';

export default function ReferralScreen() {
  const { t, language } = useLanguage();
  const [referralStats, setReferralStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [redeeming, setRedeeming] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const token = localStorage.getItem('token');
  const API_URL = bass_URL;

  useEffect(() => {
    fetchReferralStats();
    fetchCourses();
  }, []);

  const fetchReferralStats = async () => {
    try {
      const response = await fetch(`${API_URL}/referral/stats`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch referral stats');
      }

      const data = await response.json();
      const statsData = data || {};
      setReferralStats({
        referralCode: statsData.referralCode,
        referralPoints: statsData.referralPoints || 0,
        totalReferrals: statsData.totalReferrals || 0,
        referredUsers: statsData.referredUsers || [],
      });
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/courses`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleCopyCode = async () => {
    if (referralStats?.referralCode) {
      try {
        await navigator.clipboard.writeText(referralStats.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleShareWhatsApp = () => {
    if (!referralStats?.referralCode) return;

    const message = encodeURIComponent(
      `🎯 Join Sarthi AI and start your career journey! 📚\n\nUse my referral code: ${referralStats.referralCode}\n\nEarn points with every referral and redeem free courses! 🎁\n\nSign up now and get started! 🚀`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleRedeemPoints = async () => {
    if (!selectedCourse) {
      setError(t('selectCourseRedeem'));
      return;
    }

    setRedeeming(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/referral/redeem`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse._id,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMsg = responseData.message || 'Failed to redeem course';
        throw new Error(errorMsg);
      }

      setSuccess(t('redeemSuccess'));
      setShowRedeemModal(false);
      setSelectedCourse(null);
      // Refresh stats to show updated points
      setTimeout(() => fetchReferralStats(), 1500);
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || t('errorRedeeming'));
    } finally {
      setRedeeming(false);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) {
      setError(t('feedbackValidation'));
      return;
    }

    try {
      setSubmittingFeedback(true);
      setError(null);
      const response = await fetch(`${API_URL}/referral/feedback`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: feedbackRating,
          message: feedbackMessage.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit feedback');
      }

      setSuccess(t('feedbackSuccess'));
      setFeedbackMessage('');
      setFeedbackRating(5);
      setTimeout(() => setSuccess(null), 3500);
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Gift className="w-12 h-12 text-blue-600" />
          </div>
          <p className="text-blue-900 text-lg font-semibold">{t('loading') || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.min(
    ((referralStats?.referralPoints || 0) / 1000) * 100,
    100
  );
  const pointsRemaining = Math.max(1000 - (referralStats?.referralPoints || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Error Alert */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-300 text-red-700 p-5 rounded-xl flex items-start gap-4 shadow-md">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {t('referralScreen')}
            </h1>
          </div>
          <p className="text-gray-600 text-lg ml-16 font-medium">{t('earnPointsDesc')}</p>
        </div>

        {/* Main Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Points Display Card */}
          <div className="md:col-span-2 bg-white rounded-2xl p-10 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">{t('currentPoints')}</p>
            </div>
            <div className="mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {referralStats?.referralPoints || 0}
              </div>
              <p className="text-gray-500 flex items-center gap-2">
                {pointsRemaining > 0 ? (
                  <>
                    <Zap className="w-4 h-4 text-yellow-500" />
                    {pointsRemaining} {t('pointsRemaining')}
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    🎉 Ready to redeem!
                  </>
                )}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Progress to 1000 Points</span>
                <span className="text-sm font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-sm">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="mt-3 text-xs text-gray-500 flex justify-between">
                <span>0 {t('points')}</span>
                <span>1000 {t('points')}</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-gray-700 font-medium mb-6">
              <span className="text-blue-600">💡</span> {t('pointsPerReferral')} • Earn more by inviting friends!
            </div>

            {/* Redeem Button */}
            {referralStats?.referralPoints >= 1000 && (
              <button
                onClick={() => setShowRedeemModal(true)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Award className="w-5 h-5" />
                {t('redeemFreeCourse')} →
              </button>
            )}
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="mb-8">
              <div className="p-3 bg-blue-100 rounded-lg mb-3 inline-block">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">{t('referralsCount')}</p>
              <p className="text-4xl font-bold text-blue-600">{referralStats?.totalReferrals || 0}</p>
            </div>
            <div className="pt-8 border-t border-blue-100">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-3">{t('myReferralCode')}</p>
              <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between border border-blue-200">
                <p className="text-xl font-mono font-bold text-blue-600">
                  {referralStats?.referralCode || 'N/A'}
                </p>
                <button
                  onClick={handleCopyCode}
                  className="p-2 hover:bg-blue-200 rounded-lg transition"
                  title="Copy code"
                >
                  <Copy className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-2xl p-10 mb-12 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t('shareWithFriends')}</h2>
          </div>

          <p className="text-gray-600 mb-6 flex items-center gap-2">
            <span className="text-lg">📱</span> Share your code with friends and earn points!
          </p>

          <div className="flex gap-4 flex-col md:flex-row">
            {/* Copy Code Button */}
            <button
              onClick={handleCopyCode}
              className={`flex-1 font-bold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg ${
                copied
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300'
              }`}
            >
              <Copy className="w-5 h-5" />
              <span>{copied ? '✓ ' + t('codeCopied') : t('copyCode')}</span>
            </button>

            {/* WhatsApp Share Button */}
            <button
              onClick={handleShareWhatsApp}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              <span>{t('shareWhatsApp')}</span>
            </button>
          </div>
        </div>

        {/* Referrals List */}
        <div className="bg-white rounded-2xl p-10 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t('viewReferrals')}</h2>
          </div>

          {referralStats?.referredUsers && referralStats.referredUsers.length > 0 ? (
            <div className="space-y-3">
              {referralStats.referredUsers.map((referral, index) => (
                <div
                  key={referral._id}
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-white rounded-xl hover:from-blue-100 hover:to-blue-50 transition border border-blue-100 hover:border-blue-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">{referral.name}</p>
                      <p className="text-gray-500 text-sm">{referral.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold text-lg flex items-center gap-1">
                      <CheckCircle className="w-5 h-5" />
                      +100
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(referral.createdAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="mb-3">
                <AlertCircle className="w-12 h-12 text-blue-400 mx-auto" />
              </div>
              <p className="text-gray-700 text-lg font-semibold mb-2">{t('nothingYet')}</p>
              <p className="text-gray-600">{t('yourFriendsAssign')}</p>
            </div>
          )}
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-2xl p-10 shadow-lg border border-blue-100 mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t('referralFeedback')}</h2>
          </div>

          <p className="text-gray-600 mb-6">
            {t('feedbackHelpText')}
          </p>

          <form onSubmit={handleSubmitFeedback} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('rating')}</label>
              <select
                value={feedbackRating}
                onChange={(e) => setFeedbackRating(Number(e.target.value))}
                className="w-full md:w-56 rounded-lg border border-blue-200 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Very Good</option>
                <option value={3}>3 - Good</option>
                <option value={2}>2 - Needs Improvement</option>
                <option value={1}>1 - Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('message')}</label>
              <textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                rows={4}
                maxLength={1000}
                placeholder={t('feedbackPlaceholder')}
                className="w-full rounded-lg border border-blue-200 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={submittingFeedback}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-6 py-3 rounded-xl transition"
            >
              {submittingFeedback ? t('feedbackSubmitting') : t('submitFeedback')}
            </button>
          </form>
        </div>
      </div>

      {/* Redeem Modal */}
      {showRedeemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 text-gray-900 max-h-96 overflow-y-auto shadow-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {t('redeemFreeCourse')}
              </h2>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <p className="text-gray-600 mb-4 font-medium">Select a course to redeem:</p>

            {courses && courses.length > 0 ? (
              <div className="space-y-3 mb-8">
                {courses.map((course) => (
                  <label
                    key={course._id}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition border-2 ${
                      selectedCourse?._id === course._id
                        ? 'bg-blue-50 border-blue-500 shadow-md'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="course"
                      checked={selectedCourse?._id === course._id}
                      onChange={() => setSelectedCourse(course)}
                      className="mr-4 w-5 h-5 accent-blue-600"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{course.title || course.name}</p>
                      <p className="text-sm text-gray-600">{course.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mb-8 p-4 bg-gray-50 rounded-lg">No courses available</p>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowRedeemModal(false);
                  setSelectedCourse(null);
                  setError(null);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-4 rounded-xl transition"
              >
                {t('cancel') || 'Cancel'}
              </button>
              <button
                onClick={handleRedeemPoints}
                disabled={!selectedCourse || redeeming}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-xl transition shadow-md hover:shadow-lg disabled:shadow-sm flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                {redeeming ? 'Redeeming...' : t('redeemCourse')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {success && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 border border-green-400 animate-pulse">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">{success}</span>
        </div>
      )}
    </div>
  );
}
