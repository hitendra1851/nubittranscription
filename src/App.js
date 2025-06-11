import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult('');
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult('');
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', 'en');

    try {
      setLoading(true);
      setResult('');
      setError(null);

      const response = await axios.post('/transcribe/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.text || 'No result returned.');
    } catch (err) {
      setError('Transcription failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-black text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">NubitTranscribe.AI</h1>
          <nav className="space-x-6">
            <a href="#features" className="hover:text-blue-400">Features</a>
            <a href="#how" className="hover:text-blue-400">How It Works</a>
            <a href="#pricing" className="hover:text-blue-400">Pricing</a>
            <a href="#contact" className="hover:text-blue-400">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">AI-Powered Transcription by NubitTranscribe.AI</h2>
          <p className="mb-8 text-lg">Seamlessly transcribe your audio & video into precise text using our Whisper-based secure AI engine.</p>

          <div
            className={`bg-gray-800 p-6 rounded shadow-md w-full max-w-xl mx-auto border-2 ${dragActive ? 'border-blue-500' : 'border-gray-700'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <label htmlFor="upload" className="block w-full cursor-pointer">
              <div className="w-full py-8 border-dashed border-2 rounded-lg text-gray-400 hover:text-white hover:border-blue-500 transition text-center">
                {file ? file.name : 'Drag & Drop or Click to Upload Audio/Video File'}
              </div>
              <input
                id="upload"
                type="file"
                accept="audio/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Transcribing...' : 'Transcribe'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </section>

      {/* Remaining sections are unchanged */}
      {/* Result Section */}
      {result && (
        <section className="py-12 bg-gray-950">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-xl font-semibold mb-4">Transcription Result</h3>
            <div className="bg-gray-800 p-4 rounded shadow text-sm whitespace-pre-wrap text-white">
              {result}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-6">Why NubitTranscribe.AI?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800 rounded shadow-sm">
              <h4 className="text-xl font-bold mb-2">State-of-the-Art Accuracy</h4>
              <p>Powered by Whisper AI, ensuring high-precision transcription for your content.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded shadow-sm">
              <h4 className="text-xl font-bold mb-2">Lightning Fast</h4>
              <p>Instant output for short clips, and robust performance for long recordings.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded shadow-sm">
              <h4 className="text-xl font-bold mb-2">Privacy First</h4>
              <p>Your data is encrypted and never stored, offering full confidentiality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-6">How It Works</h3>
          <ol className="space-y-4 text-left max-w-2xl mx-auto">
            <li><span className="font-bold">Step 1:</span> Upload your audio or video file.</li>
            <li><span className="font-bold">Step 2:</span> Click "Transcribe" to start processing.</li>
            <li><span className="font-bold">Step 3:</span> Get your text results instantly.</li>
            <li><span className="font-bold">Step 4:</span> Copy or download your transcription.</li>
          </ol>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-6">Simple Pricing</h3>
          <p className="mb-8">Transcribe without limits. Affordable options tailored for your needs.</p>
          <div className="flex justify-center">
            <div className="p-6 bg-gray-800 rounded shadow-sm max-w-sm">
              <h4 className="text-2xl font-bold mb-2">Free Plan</h4>
              <p className="mb-4">Get started with 5 minutes of transcription daily.</p>
              <p className="text-xl font-semibold">$0</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-6">Get in Touch</h3>
          <p className="mb-4">Have a custom use case or need support? Let's talk.</p>
          <a href="mailto:contact@nubitsaitech.com" className="text-blue-400 hover:underline">contact@nubitsaitech.com</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Nubits.AI Technology LLP. All rights reserved. | <a href="https://nubitsaitech.com" className="text-blue-400 hover:underline">nubitsaitech.com</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
