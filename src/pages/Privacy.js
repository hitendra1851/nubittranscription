import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: January 1, 2025
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Our Privacy Commitment</h3>
              <p className="text-blue-800">
                At NubitTranscribe.AI, we are committed to protecting your privacy. We do not store your audio files 
                or transcriptions on our servers. All processing is done in real-time, and your data is immediately 
                deleted after transcription.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">1.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Account information (name, email address, password)</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Audio and video files you upload for transcription</li>
              <li>Communications with our support team</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">1.2 Information We Collect Automatically</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Usage data (API calls, transcription requests, processing times)</li>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Log data (access times, pages viewed, errors encountered)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Provide and maintain our transcription services</li>
              <li>Process your audio and video files to generate transcriptions</li>
              <li>Manage your account and provide customer support</li>
              <li>Process payments and prevent fraud</li>
              <li>Improve our services and develop new features</li>
              <li>Send you service-related communications</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Processing and Storage</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Audio/Video Files</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800">
                <strong>Important:</strong> Your audio and video files are processed in real-time and are 
                <strong> never stored</strong> on our servers. Files are immediately deleted after transcription is complete.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Transcription Results</h3>
            <p className="text-gray-600 mb-4">
              Transcription results are temporarily held in memory during processing and are not permanently stored 
              unless you explicitly save them to your account (Pro and Enterprise plans only).
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Account Data</h3>
            <p className="text-gray-600 mb-6">
              Account information and usage data are stored securely on servers located in the United States, 
              with appropriate security measures in place.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-600 mb-4">We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Service Providers</h3>
            <p className="text-gray-600 mb-4">
              We may share information with trusted third-party service providers who assist us in operating our service, 
              such as payment processors, cloud hosting providers, and customer support tools.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Legal Requirements</h3>
            <p className="text-gray-600 mb-4">
              We may disclose information if required by law, court order, or government request, or to protect our 
              rights, property, or safety.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-6">4.3 Business Transfers</h3>
            <p className="text-gray-600 mb-6">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred as part 
              of that transaction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-600 mb-4">We implement appropriate security measures to protect your information:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Encryption in transit using TLS/SSL protocols</li>
              <li>Secure data centers with physical access controls</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication for our systems</li>
              <li>Employee training on data protection practices</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Access and Correction</h3>
            <p className="text-gray-600 mb-4">
              You can access and update your account information at any time through your account settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Data Deletion</h3>
            <p className="text-gray-600 mb-4">
              You can request deletion of your account and associated data by contacting our support team. 
              Note that some information may be retained for legal or business purposes.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Marketing Communications</h3>
            <p className="text-gray-600 mb-6">
              You can opt out of marketing communications at any time by clicking the unsubscribe link in emails 
              or updating your preferences in your account settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze usage patterns and improve our service</li>
              <li>Provide personalized content and features</li>
              <li>Measure the effectiveness of our marketing campaigns</li>
            </ul>
            <p className="text-gray-600 mb-6">
              You can control cookies through your browser settings, but disabling cookies may affect the functionality of our service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
            <p className="text-gray-600 mb-6">
              Our services are hosted in the United States. If you are accessing our service from outside the United States, 
              please be aware that your information may be transferred to, stored, and processed in the United States where 
              our servers are located and our central database is operated.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600 mb-6">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and believe your child has provided 
              us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this 
              Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-800 font-medium">Nubits.AI Technology LLP</p>
              <p className="text-gray-600">Email: privacy@nubitsaitech.com</p>
              <p className="text-gray-600">Address: 123 Tech Street, San Francisco, CA 94105</p>
              <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;