import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our service',
      features: [
        '5 minutes of transcription daily',
        'Basic accuracy (90%+)',
        'English language only',
        'Standard processing speed',
        'Download as TXT',
        'Email support'
      ],
      limitations: [
        'File size limit: 25MB',
        'No API access',
        'Basic support only'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For professionals and small teams',
      features: [
        '10 hours of transcription monthly',
        'High accuracy (95%+)',
        '40+ languages supported',
        'Priority processing',
        'Multiple export formats (TXT, SRT, VTT)',
        'Speaker identification',
        'Timestamp precision',
        'API access (1000 requests/month)',
        'Priority email support'
      ],
      limitations: [
        'File size limit: 500MB'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with custom needs',
      features: [
        'Unlimited transcription',
        'Premium accuracy (98%+)',
        'Custom language models',
        'Dedicated processing power',
        'All export formats',
        'Advanced speaker diarization',
        'Custom integrations',
        'Unlimited API access',
        'White-label options',
        'Dedicated account manager',
        '24/7 phone support',
        'SLA guarantees'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
    },
    {
      question: 'What happens if I exceed my monthly limit?',
      answer: 'For Pro users, additional usage is billed at $0.10 per minute. Free users will need to wait until the next day or upgrade to continue.'
    },
    {
      question: 'Do you offer annual discounts?',
      answer: 'Yes! Annual subscribers save 20% compared to monthly billing. Contact us for enterprise annual pricing.'
    },
    {
      question: 'Is there a free trial for Pro?',
      answer: 'Yes, we offer a 14-day free trial of Pro features. No credit card required to start.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and wire transfers for enterprise accounts.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact support for assistance.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                  plan.popular ? 'ring-2 ring-blue-600 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-2">/{plan.period}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-500 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button 
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Feature Comparison</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Pro</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Monthly transcription</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">5 min/day</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">10 hours</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Accuracy</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">90%+</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">95%+</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">98%+</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Languages supported</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">English only</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">40+</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">40+ & Custom</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">API access</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Speaker identification</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Pricing FAQ</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust TranscriptFlow for their transcription needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;