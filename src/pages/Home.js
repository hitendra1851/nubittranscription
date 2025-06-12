import React from 'react';
import TranscriptionTool from '../components/TranscriptionTool';

const Home = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'Get your transcriptions in seconds, not minutes. Our optimized AI processes files at incredible speed.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Highly Accurate',
      description: 'Powered by advanced AI models, achieving 95%+ accuracy across multiple languages and accents.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure & Private',
      description: 'Your files are encrypted in transit and never stored. Complete privacy guaranteed.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      title: '40+ Languages',
      description: 'Support for over 40 languages including English, Spanish, French, German, and many more.'
    }
  ];

  const useCases = [
    {
      title: 'Legal Professionals',
      description: 'Transcribe depositions, court proceedings, and client meetings with legal-grade accuracy.',
      icon: '⚖️'
    },
    {
      title: 'Media & Journalism',
      description: 'Convert interviews, podcasts, and video content into searchable, editable text.',
      icon: '📺'
    },
    {
      title: 'Education',
      description: 'Transform lectures, seminars, and educational content for better accessibility.',
      icon: '🎓'
    },
    {
      title: 'Customer Support',
      description: 'Analyze call recordings and improve service quality with detailed transcripts.',
      icon: '🎧'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Legal Assistant',
      company: 'Johnson & Associates',
      content: 'NubitTranscribe.AI has revolutionized our workflow. What used to take hours now takes minutes.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Mike Chen',
      role: 'Podcast Producer',
      company: 'TechTalk Media',
      content: 'The accuracy is incredible. It handles technical jargon and multiple speakers flawlessly.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Research Director',
      company: 'University Medical Center',
      content: 'Perfect for transcribing research interviews. The multi-language support is outstanding.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const faqs = [
    {
      question: 'What file formats do you support?',
      answer: 'We support all major audio and video formats including MP3, WAV, MP4, MOV, AVI, M4A, FLAC, and more.'
    },
    {
      question: 'How accurate is the transcription?',
      answer: 'Our AI achieves 95%+ accuracy for clear audio in supported languages. Accuracy may vary based on audio quality, background noise, and speaker clarity.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. All files are encrypted during upload and processing. We never store your files or transcriptions on our servers.'
    },
    {
      question: 'What languages do you support?',
      answer: 'We support over 40 languages including English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, and many more.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Free accounts can upload files up to 25MB. Pro accounts support files up to 500MB, and Enterprise accounts have no limits.'
    },
    {
      question: 'Can I use this for commercial purposes?',
      answer: 'Yes! Our Pro and Enterprise plans are designed for commercial use with appropriate licensing and support.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Audio to Text with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Precision</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Drop a file and get your transcript in seconds. Powered by advanced AI for unmatched accuracy across 40+ languages.
            </p>
          </div>
          
          <TranscriptionTool />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose NubitTranscribe.AI?</h2>
            <p className="text-xl text-gray-600">Built for professionals who demand accuracy, speed, and security</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect for Every Industry</h2>
            <p className="text-xl text-gray-600">Trusted by professionals across diverse sectors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Thousands</h2>
            <p className="text-xl text-gray-600">See what our customers are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our service</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
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
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of professionals who trust NubitTranscribe.AI</p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Start Transcribing Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;