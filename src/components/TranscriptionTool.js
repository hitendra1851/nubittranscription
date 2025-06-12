import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Anthropic from '@anthropic-ai/sdk';
import { performFallbackAnalysis } from '../utils/fallbackAnalysis';

const TranscriptionTool = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('transcript');
  const [apiKeyStatus, setApiKeyStatus] = useState('checking');
  const [apiKeyTested, setApiKeyTested] = useState(false);
  const [analysisType, setAnalysisType] = useState('ai'); // 'ai' or 'basic'

  // Get API key from environment variables
  const anthropicApiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  const isProduction = process.env.NODE_ENV === 'production';

  // Check API key status on component mount
  useEffect(() => {
    console.log('Environment check:', {
      hasApiKey: !!anthropicApiKey,
      apiKeyLength: anthropicApiKey ? anthropicApiKey.length : 0,
      apiKeyPreview: anthropicApiKey ? `${anthropicApiKey.substring(0, 10)}...` : 'Not found',
      isProduction: isProduction,
      nodeEnv: process.env.NODE_ENV
    });

    if (!anthropicApiKey || anthropicApiKey === 'your_anthropic_api_key_here') {
      setApiKeyStatus('missing');
    } else if (anthropicApiKey.startsWith('sk-ant-')) {
      // Don't assume it's valid until we test it
      setApiKeyStatus('untested');
    } else {
      setApiKeyStatus('invalid');
    }
  }, [anthropicApiKey, isProduction]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult('');
      setAnalysis('');
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult('');
      setAnalysis('');
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

  const testApiKey = async () => {
    if (!anthropicApiKey || anthropicApiKey === 'your_anthropic_api_key_here') {
      return false;
    }

    try {
      const anthropic = new Anthropic({
        apiKey: anthropicApiKey,
        dangerouslyAllowBrowser: true
      });

      // Test with a minimal request
      await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 10,
        messages: [{ role: "user", content: "Hi" }],
      });

      return true;
    } catch (err) {
      console.error('API key test failed:', err);
      return false;
    }
  };

  const performBasicAnalysis = (transcriptionText) => {
    try {
      setAnalysisLoading(true);
      setAnalysisType('basic');
      
      const analysisResult = performFallbackAnalysis(transcriptionText);
      
      // Format the analysis result for display
      const formattedAnalysis = `
# Basic Text Analysis Report

## Summary
${analysisResult.summary}

## Topic Analysis
**Sentiment:** ${analysisResult.topicModeling.sentiment}

**Top Keywords:**
${analysisResult.topicModeling.keywords.map(k => `• ${k.word} (${k.count} times)`).join('\n')}

## Key Moments
${analysisResult.keyMoments.length > 0 
  ? analysisResult.keyMoments.map((moment, i) => `${i + 1}. ${moment.text}`).join('\n\n')
  : 'No significant key moments detected.'
}

## Potential Anomalies
${analysisResult.anomalies.length > 0 
  ? analysisResult.anomalies.map(anomaly => `• ${anomaly.type}: ${anomaly.description}`).join('\n')
  : 'No anomalies detected.'
}

## Statistics
• **Words:** ${analysisResult.statistics.wordCount}
• **Sentences:** ${analysisResult.statistics.sentenceCount}
• **Paragraphs:** ${analysisResult.statistics.paragraphCount}
• **Average words per sentence:** ${analysisResult.statistics.avgWordsPerSentence}
• **Estimated reading time:** ${analysisResult.statistics.estimatedReadingTime} minutes

---
${analysisResult.note}
      `;
      
      setAnalysis(formattedAnalysis);
    } catch (err) {
      console.error('Basic analysis failed:', err);
      setAnalysis('Basic analysis encountered an error. Please try again.');
    } finally {
      setAnalysisLoading(false);
    }
  };

  const analyzeTranscription = async (transcriptionText, forceBasic = false) => {
    // If forced to use basic analysis or no API key available
    if (forceBasic || !anthropicApiKey || anthropicApiKey === 'your_anthropic_api_key_here') {
      performBasicAnalysis(transcriptionText);
      return;
    }

    // If we haven't tested the API key yet, test it first
    if (!apiKeyTested && apiKeyStatus === 'untested') {
      setAnalysisLoading(true);
      const isValid = await testApiKey();
      setApiKeyTested(true);
      
      if (!isValid) {
        setApiKeyStatus('invalid');
        setAnalysisLoading(false);
        // Fall back to basic analysis
        performBasicAnalysis(transcriptionText);
        return;
      } else {
        setApiKeyStatus('valid');
      }
    }

    if (apiKeyStatus === 'invalid') {
      // Fall back to basic analysis
      performBasicAnalysis(transcriptionText);
      return;
    }

    try {
      setAnalysisLoading(true);
      setAnalysisType('ai');
      
      const anthropic = new Anthropic({
        apiKey: anthropicApiKey,
        dangerouslyAllowBrowser: true // Note: In production, this should be done server-side
      });

      const prompt = `You are an AI assistant helping with transcription analysis.

Below is a transcribed testimony:
"""${transcriptionText}"""

1. Categorize the content by subject matter (Topic Modeling)
2. Highlight any key moments or significant statements
3. Identify any anomalies or unusual patterns in the text

Provide the response in structured format (JSON or bullet points).`;

      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      });

      setAnalysis(msg.content[0].text);
      setApiKeyStatus('valid');
    } catch (err) {
      console.error('Analysis failed:', err);
      
      // More specific error handling - fall back to basic analysis
      if (err.message.includes('401') || err.message.includes('authentication') || err.message.includes('invalid x-api-key')) {
        setApiKeyStatus('invalid');
        setApiKeyTested(true);
        // Fall back to basic analysis
        performBasicAnalysis(transcriptionText);
      } else if (err.message.includes('429') || err.message.includes('rate_limit')) {
        setAnalysis('AI Analysis temporarily unavailable: Rate limit exceeded. Falling back to basic analysis...');
        setTimeout(() => performBasicAnalysis(transcriptionText), 1000);
      } else if (err.message.includes('network') || err.message.includes('fetch')) {
        setAnalysis('AI Analysis temporarily unavailable: Network connection issue. Falling back to basic analysis...');
        setTimeout(() => performBasicAnalysis(transcriptionText), 1000);
      } else {
        setAnalysis(`AI Analysis encountered an error. Falling back to basic analysis...`);
        setTimeout(() => performBasicAnalysis(transcriptionText), 1000);
      }
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', 'en');

    try {
      setLoading(true);
      setResult('');
      setAnalysis('');
      setError(null);
      setProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await axios.post(
        '/transcribe/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      clearInterval(progressInterval);
      setProgress(100);
      const transcriptionResult = response.data.text || 'No result returned.';
      setResult(transcriptionResult);
      
      // Don't auto-analyze in production to avoid unnecessary API calls that might fail
      // Users can manually trigger analysis if they want
    } catch (err) {
      setError('Transcription failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const downloadTxt = (content, filename) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderApiKeyStatus = () => {
    switch (apiKeyStatus) {
      case 'checking':
        return (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="text-gray-800 font-medium">Checking AI Configuration...</p>
              </div>
            </div>
          </div>
        );
      
      case 'valid':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-green-800 font-medium">AI Analysis Available</p>
                <p className="text-green-700 text-sm mt-1">
                  Click "AI Analysis" below to get advanced AI-powered insights including topic modeling, key moments, and anomaly detection.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'invalid':
        return (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-orange-800 font-medium">AI Analysis Unavailable - Using Basic Analysis</p>
                <p className="text-orange-700 text-sm mt-1">
                  Advanced AI features are not available, but you can still get basic text analysis including keyword extraction, sentiment analysis, and statistics.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'untested':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-blue-800 font-medium">AI Analysis Ready to Test</p>
                <p className="text-blue-700 text-sm mt-1">
                  Click "AI Analysis" to test advanced features, or use "Basic Analysis" for immediate insights.
                </p>
              </div>
            </div>
          </div>
        );
      
      default: // missing
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-yellow-800 font-medium">Basic Analysis Available</p>
                <p className="text-yellow-700 text-sm mt-1">
                  Advanced AI features are not configured, but basic text analysis is available including keyword extraction, sentiment analysis, and content statistics.
                </p>
                {!isProduction && (
                  <div className="mt-3 p-3 bg-yellow-100 rounded text-xs">
                    <p className="font-medium text-yellow-800">For developers:</p>
                    <ol className="text-yellow-700 mt-1 list-decimal list-inside">
                      <li>Get your API key from <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="underline">console.anthropic.com</a></li>
                      <li>Add REACT_APP_ANTHROPIC_API_KEY to your environment variables</li>
                      <li>Restart the development server</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : file 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          
          {file ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <label htmlFor="file-upload" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                Choose Different File
              </label>
            </div>
          ) : (
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-medium text-gray-900">Drop your audio or video file here</p>
                  <p className="text-gray-500">or click to browse</p>
                </div>
                <p className="text-sm text-gray-400">Supports MP3, WAV, MP4, MOV, AVI and more</p>
              </div>
            </label>
          )}
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Transcribing...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Transcribe Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {loading ? 'Transcribing...' : 'Transcribe Now'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Tab Navigation */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('transcript')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'transcript'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Transcript
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'analysis'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Analysis
                {analysisLoading && (
                  <span className="ml-2 inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                )}
                {analysisType === 'basic' && analysis && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Basic</span>
                )}
                {analysisType === 'ai' && analysis && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">AI</span>
                )}
              </button>
            </div>
          </div>

          {/* Transcript Tab */}
          {activeTab === 'transcript' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Transcription Result</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => copyToClipboard(result)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => downloadTxt(result, 'transcription.txt')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{result}</p>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Language: English • Words: {result.split(' ').length} • Characters: {result.length}</p>
              </div>
            </>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Text Analysis</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => copyToClipboard(analysis)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    disabled={!analysis || analysisLoading}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => downloadTxt(analysis, 'analysis.txt')}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    disabled={!analysis || analysisLoading}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download</span>
                  </button>
                  {!analysisLoading && !analysis && (
                    <div className="flex space-x-2">
                      {(apiKeyStatus === 'valid' || apiKeyStatus === 'untested') && (
                        <button
                          onClick={() => analyzeTranscription(result, false)}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <span>AI Analysis</span>
                        </button>
                      )}
                      <button
                        onClick={() => analyzeTranscription(result, true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Basic Analysis</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {analysisLoading ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="inline-flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Analyzing transcription...</span>
                  </div>
                </div>
              ) : analysis ? (
                <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <pre className="text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">{analysis}</pre>
                </div>
              ) : (
                renderApiKeyStatus()
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TranscriptionTool;