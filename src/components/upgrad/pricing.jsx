import React, { useState } from 'react';
import { Check, X, CreditCard, Lock, ArrowLeft, Crown, Zap, Shield } from 'lucide-react';

// --- Data Configuration ---
const pricingPlans = [
  {
    id: 'free',
    title: 'Free',
    price: '$0',
    period: '/forever',
    description: 'Perfect for getting started.',
    icon: <Shield className="w-6 h-6 text-gray-500" />,
    color: 'border-gray-200 hover:border-gray-400',
    btnColor: 'bg-gray-800 hover:bg-gray-900',
    features: [
      { text: 'Create 1 Roadmap', available: true },
      { text: 'Basic Resume Builder', available: true },
      { text: 'Free Learning Resources', available: true },
      { text: 'Standard Consultant Access', available: true },
      { text: '100% courcess Fees', available: true },
       {text: 'Limited Chatbot', available: true },
      { text: 'Company Predictions', available: false },
      { text: 'Resume Enhancer', available: false },
      { text: 'premium resouces', available: false },
      { text: 'Ads free', available: false },
    ]
  },
  {
    id: 'premium',
    title: 'Premium',
    price: '$5',
    period: '/month',
    description: 'For serious job seekers.',
    popular: true,
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    color: 'border-blue-200 hover:border-blue-500 shadow-blue-100',
    btnColor: 'bg-blue-600 hover:bg-blue-700',
    features: [
      { text: 'Ads free', available: true },
      { text: 'Create up to 5 Roadmaps', available: true },
      { text: 'Resume Builder Pro', available: true },
      { text: 'Resume Enhancer', available: true },
      { text: '40% Off Consultant Fees', available: true },
      { text: '30% Off courcess Fees', available: true },
      { text: 'Company Prediction', available: true },
      { text: 'Full Chatbot Access', available: true },
      { text: 'Compare Roadmaps', available: true },
    ]
  },
  {
    id: 'gold',
    title: 'Gold',
    price: '$10',
    period: '/month',
    description: 'The ultimate career toolkit.',
    icon: <Crown className="w-6 h-6 text-yellow-500" />,
    color: 'border-yellow-200 hover:border-yellow-500 shadow-yellow-100',
    btnColor: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700',
    features: [
      { text: 'Unlimited Roadmaps', available: true },
      { text: 'Compare Roadmaps', available: true },
      { text: 'Resume Builder Pro', available: true },
      { text: '60% Off Consultant Fees', available: true },
      { text: '60% Off courcess Fees', available: true },
      { text: 'Access All Resources', available: true },
      { text: 'Unlimited Company Prediction + Resources', available: true },
      { text: 'Proper Guidance & Mentorship', available: true },
      { text: 'Unlimited Chatbot Taking', available: true },
    ]
  }
];

export default function Pricing() {
  const [currentScreen, setCurrentScreen] = useState('pricing'); // 'pricing' or 'payment'
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Handle navigation to payment
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setCurrentScreen('payment');
  };

  // Handle back to pricing
  const handleBack = () => {
    setCurrentScreen('pricing');
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      
      {/* --- Main Content Area --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* SCREEN 1: PRICING */}
        {currentScreen === 'pricing' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Choose your path to success</h2>
              <p className="mt-4 text-xl text-gray-600">Unlock roadmaps, resume tools, and expert guidance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`relative bg-white rounded-2xl border-2 ${plan.color} p-8 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-gray-50 rounded-lg">{plan.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 font-medium">{plan.period}</span>
                    <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {feature.available ? (
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mr-2 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.available ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3 px-4 rounded-xl text-white font-semibold shadow-md transition-all ${plan.btnColor}`}
                  >
                    {plan.id === 'free' ? 'Get Started Free' : 'Choose ' + plan.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 2: PAYMENT */}
        {currentScreen === 'payment' && selectedPlan && (
          <div className="max-w-4xl mx-auto animate-fade-in">
             <button 
                onClick={handleBack}
                className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Plans
              </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left: Summary */}
              <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-semibold opacity-80 mb-6">Order Summary</h3>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold">{selectedPlan.title} Plan</h2>
                    <p className="text-slate-400 mt-1">{selectedPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold">{selectedPlan.price}</span>
                    <span className="text-slate-400">{selectedPlan.period}</span>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                   <h4 className="font-medium mb-4">What's included:</h4>
                   <ul className="space-y-3">
                     {selectedPlan.features.filter(f => f.available).slice(0, 5).map((f, i) => (
                       <li key={i} className="flex items-center text-sm text-slate-300">
                         <Check className="w-4 h-4 text-blue-400 mr-2" /> {f.text}
                       </li>
                     ))}
                     <li className="text-sm text-slate-500 italic">+ And more...</li>
                   </ul>
                </div>

                <div className="mt-12 flex justify-between items-center text-sm text-slate-400">
                  <span>Total due today:</span>
                  <span className="text-xl font-bold text-white">{selectedPlan.price}</span>
                </div>
              </div>

              {/* Right: Payment Form */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
                  <div className="flex space-x-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" placeholder="you@example.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Information</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" placeholder="MM / YY" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input type="text" placeholder="123" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex justify-center items-center">
                      <Lock className="w-4 h-4 mr-2" /> Pay {selectedPlan.price}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4 flex justify-center items-center">
                      <Shield className="w-3 h-3 mr-1" /> Secure 256-bit SSL encrypted payment
                    </p>
                  </div>
                </form>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}