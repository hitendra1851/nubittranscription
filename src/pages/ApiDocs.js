import React, { useState } from 'react';

const ApiDocs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const codeExamples = {
    curl: `curl -X POST https://whisper-api-app-2025.azurewebsites.net/transcribe/ \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@audio.mp3" \\
  -F "language=en"`,
    
    python: `import requests

url = "https://whisper-api-app-2025.azurewebsites.net/transcribe/"
files = {"file": open("audio.mp3", "rb")}
data = {"language": "en"}

response = requests.post(url, files=files, data=data)
result = response.json()
print(result["text"])`,

    javascript: `const formData = new FormData();
formData.append('file', audioFile);
formData.append('language', 'en');

fetch('https://whisper-api-app-2025.azurewebsites.net/transcribe/', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data.text))
.catch(error => console.error('Error:', error));`,

    nodejs: `const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('file', fs.createReadStream('audio.mp3'));
form.append('language', 'en');

axios.post('https://whisper-api-app-2025.azurewebsites.net/transcribe/', form, {
  headers: form.getHeaders()
})
.then(response => console.log(response.data.text))
.catch(error => console.error(error));`
  };

  const supportedFormats = [
    'MP3', 'WAV', 'FLAC', 'M4A', 'AAC', 'OGG', 'WMA',
    'MP4', 'AVI', 'MOV', 'MKV', 'FLV', 'WEBM'
  ];

  const supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">API Documentation</h1>
          <p className="text-xl text-gray-600">
            Integrate powerful transcription capabilities into your applications with our simple REST API.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'authentication', label: 'Authentication' },
              { id: 'endpoints', label: 'Endpoints' },
              { id: 'examples', label: 'Code Examples' },
              { id: 'response', label: 'Response Format' },
              { id: 'errors', label: 'Error Handling' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#base-url" className="text-blue-600 hover:underline">Base URL</a></li>
                  <li><a href="#rate-limits" className="text-blue-600 hover:underline">Rate Limits</a></li>
                  <li><a href="#supported-formats" className="text-blue-600 hover:underline">Supported Formats</a></li>
                  <li><a href="#languages" className="text-blue-600 hover:underline">Languages</a></li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'overview' && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">API Overview</h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Base URL</h3>
                    <code className="text-blue-800 bg-blue-100 px-2 py-1 rounded">
                      https://whisper-api-app-2025.azurewebsites.net
                    </code>
                  </div>

                  <p className="text-gray-600 mb-6">
                    The TranscriptFlow API provides a simple REST interface for converting audio and video files 
                    into accurate text transcriptions. Built on advanced AI models, our API supports over 40 languages 
                    and various audio/video formats.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                    <li>High accuracy transcription (95%+ for clear audio)</li>
                    <li>Support for 40+ languages</li>
                    <li>Multiple audio and video format support</li>
                    <li>Fast processing times</li>
                    <li>Secure file handling (files not stored)</li>
                    <li>Simple REST API interface</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4" id="supported-formats">Supported File Formats</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
                    {supportedFormats.map((format) => (
                      <span key={format} className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm text-center">
                        {format}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4" id="languages">Supported Languages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {supportedLanguages.map((lang) => (
                      <div key={lang.code} className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-gray-800">{lang.name}</span>
                        <code className="text-blue-600">{lang.code}</code>
                      </div>
                    ))}
                    <div className="col-span-full text-center text-gray-500 text-sm mt-2">
                      ...and 28+ more languages supported
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'authentication' && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Authentication</h2>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">No Authentication Required</h3>
                    <p className="text-green-800">
                      Currently, our API does not require authentication for basic usage. 
                      This may change in the future for paid tiers.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4" id="rate-limits">Rate Limits</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                    <ul className="text-yellow-800 space-y-2">
                      <li><strong>Free Tier:</strong> 5 minutes of audio per day</li>
                      <li><strong>Pro Tier:</strong> 10 hours of audio per month</li>
                      <li><strong>Enterprise:</strong> Custom limits available</li>
                    </ul>
                  </div>

                  <p className="text-gray-600">
                    Rate limits are enforced per IP address. If you exceed your limit, 
                    you'll receive a 429 status code with details about when you can make your next request.
                  </p>
                </div>
              )}

              {activeTab === 'endpoints' && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">API Endpoints</h2>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">POST /transcribe/</h3>
                    <p className="text-gray-600 mb-4">Transcribe an audio or video file to text.</p>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">Parameters</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-2 text-sm font-mono text-blue-600">file</td>
                            <td className="px-4 py-2 text-sm text-gray-600">File</td>
                            <td className="px-4 py-2 text-sm text-green-600">Yes</td>
                            <td className="px-4 py-2 text-sm text-gray-600">Audio or video file to transcribe</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm font-mono text-blue-600">language</td>
                            <td className="px-4 py-2 text-sm text-gray-600">String</td>
                            <td className="px-4 py-2 text-sm text-yellow-600">Optional</td>
                            <td className="px-4 py-2 text-sm text-gray-600">Language code (e.g., 'en', 'es', 'fr')</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">File Size Limits</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li><strong>Free:</strong> 25MB maximum</li>
                      <li><strong>Pro:</strong> 500MB maximum</li>
                      <li><strong>Enterprise:</strong> No limit</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'examples' && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Code Examples</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">cURL</h3>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <code>{codeExamples.curl}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Python</h3>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <code>{codeExamples.python}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">JavaScript (Browser)</h3>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <code>{codeExamples.javascript}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Node.js</h3>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <code>{codeExamples.nodejs}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'response' && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Response Format</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Success Response</h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
                    <pre><code>{`{
  "text": "Hello, this is a sample transcription of your audio file.",
  "language": "en",
  "duration": 12.5,
  "confidence": 0.95
}`}</code></pre>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2">Response Fields</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm font-mono text-blue-600">text</td>
                          <td className="px-4 py-2 text-sm text-gray-600">String</td>
                          <td className="px-4 py-2 text-sm text-gray-600">The transcribed text</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-mono text-blue-600">language</td>
                          <td className="px-4 py-2 text-sm text-gray-600">String</td>
                          <td className="px-4 py-2 text-sm text-gray-600">Detected language code</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-mono text-blue-600">duration</td>
                          <td className="px-4 py-2 text-sm text-gray-600">Number</td>
                          <td className="px-4 py-2 text-sm text-gray-600">Audio duration in seconds</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-mono text-blue-600">confidence</td>
                          <td className="px-4 py-2 text-sm text-gray-600">Number</td>
                          <td className="px-4 py-2 text-sm text-gray-600">Confidence score (0-1)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">HTTP Status Codes</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">200</span>
                      <span className="text-gray-600">Success - Transcription completed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">400</span>
                      <span className="text-gray-600">Bad Request - Invalid file or parameters</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-mono">429</span>
                      <span className="text-gray-600">Too Many Requests - Rate limit exceeded</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">500</span>
                      <span className="text-gray-600">Internal Server Error - Processing failed</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'errors' && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Error Handling</h2>
                  
                  <p className="text-gray-600 mb-6">
                    When an error occurs, the API returns a JSON response with error details and an appropriate HTTP status code.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Error Response Format</h3>
                  <div className="bg-gray-900 text-red-400 p-4 rounded-lg mb-6">
                    <pre><code>{`{
  "error": {
    "code": "INVALID_FILE_FORMAT",
    "message": "Unsupported file format. Please use MP3, WAV, or MP4.",
    "details": "File extension '.xyz' is not supported"
  }
}`}</code></pre>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Error Codes</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-600 mb-2">INVALID_FILE_FORMAT</h4>
                      <p className="text-gray-600">The uploaded file format is not supported.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-600 mb-2">FILE_TOO_LARGE</h4>
                      <p className="text-gray-600">The uploaded file exceeds the size limit for your plan.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-600 mb-2">RATE_LIMIT_EXCEEDED</h4>
                      <p className="text-gray-600">You have exceeded your rate limit. Please wait before making another request.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-600 mb-2">PROCESSING_FAILED</h4>
                      <p className="text-gray-600">The audio file could not be processed. This may be due to corruption or unsupported encoding.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-600 mb-2">LANGUAGE_NOT_SUPPORTED</h4>
                      <p className="text-gray-600">The specified language code is not supported.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Best Practices</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Always check the HTTP status code before processing the response</li>
                    <li>Implement retry logic for 5xx errors with exponential backoff</li>
                    <li>Handle rate limiting gracefully by respecting the retry-after header</li>
                    <li>Validate file formats and sizes on the client side before uploading</li>
                    <li>Use appropriate error messages to inform users about issues</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Building?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get started with our API today and transform your audio content into searchable text.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Try the API Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default ApiDocs;