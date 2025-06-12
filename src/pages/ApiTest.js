import React, { useState } from 'react';
import Anthropic from '@anthropic-ai/sdk';

const ApiTest = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKeyStatus, setApiKeyStatus] = useState('checking');

  // Get API key from environment variables
  const anthropicApiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

  React.useEffect(() => {
    console.log('API Key Check:', {
      hasApiKey: !!anthropicApiKey,
      apiKeyLength: anthropicApiKey ? anthropicApiKey.length : 0,
      apiKeyPreview: anthropicApiKey ? `${anthropicApiKey.substring(0, 15)}...` : 'Not found',
      nodeEnv: process.env.NODE_ENV
    });

    if (!anthropicApiKey || anthropicApiKey === 'your_anthropic_api_key_here') {
      setApiKeyStatus('missing');
    } else if (anthropicApiKey.startsWith('sk-ant-')) {
      setApiKeyStatus('ready');
    } else {
      setApiKeyStatus('invalid');
    }
  }, [anthropicApiKey]);

  const testApi = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to test');
      return;
    }

    if (!anthropicApiKey || anthropicApiKey === 'your_anthropic_api_key_here') {
      setError('No API key configured');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setResponse('');

      const anthropic = new Anthropic({
        apiKey: anthropicApiKey,
        dangerouslyAllowBrowser: true
      });

      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: inputText }],
      });

      setResponse(msg.content[0].text);
      setApiKeyStatus('working');
    } catch (err) {
      console.error('API Test failed:', err);
      setError(`API Error: ${err.message}`);
      
      if (err.message.includes('401') || err.message.includes('authentication') || err.message.includes('invalid x-api-key')) {
        setApiKeyStatus('invalid');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (apiKeyStatus) {
      case 'working': return 'green';
      case 'ready': return 'blue';
      case 'invalid': return 'red';
      case 'missing': return 'yellow';
      default: return 'gray';
    }
  };

  const getStatusMessage = () => {
    switch (apiKeyStatus) {
      case 'working': return 'API Key is working correctly!';
      case 'ready': return 'API Key format looks correct, ready to test';
      case 'invalid': return 'API Key is invalid or expired';
      case 'missing': return 'No API Key configured';
      default: return 'Checking API Key...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Anthropic API Test</h1>
          
          {/* API Key Status */}
          <div className={`mb-8 p-4 rounded-lg border-2 ${
            getStatusColor() === 'green' ? 'bg-green-50 border-green-200' :
            getStatusColor() === 'blue' ? 'bg-blue-50 border-blue-200' :
            getStatusColor() === 'red' ? 'bg-red-50 border-red-200' :
            getStatusColor() === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
            'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                getStatusColor() === 'green' ? 'bg-green-500' :
                getStatusColor() === 'blue' ? 'bg-blue-500' :
                getStatusColor() === 'red' ? 'bg-red-500' :
                getStatusColor() === 'yellow' ? 'bg-yellow-500' :
                'bg-gray-500'
              }`}></div>
              <span className={`font-medium ${
                getStatusColor() === 'green' ? 'text-green-800' :
                getStatusColor() === 'blue' ? 'text-blue-800' :
                getStatusColor() === 'red' ? 'text-red-800' :
                getStatusColor() === 'yellow' ? 'text-yellow-800' :
                'text-gray-800'
              }`}>
                {getStatusMessage()}
              </span>
            </div>
            
            {anthropicApiKey && (
              <div className="mt-2 text-sm text-gray-600">
                <p>API Key: {anthropicApiKey.substring(0, 15)}...{anthropicApiKey.substring(anthropicApiKey.length - 4)}</p>
                <p>Length: {anthropicApiKey.length} characters</p>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <label htmlFor="testInput" className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to send to Claude:
            </label>
            <textarea
              id="testInput"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your message here... (e.g., 'Hello, how are you?' or 'Explain quantum physics in simple terms')"
            />
          </div>

          {/* Test Button */}
          <button
            onClick={testApi}
            disabled={loading || !inputText.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Testing API...</span>
              </div>
            ) : (
              'Test Anthropic API'
            )}
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
              <p className="text-red-700">{error}</p>
              
              {error.includes('401') && (
                <div className="mt-3 p-3 bg-red-100 rounded text-sm">
                  <p className="font-medium text-red-800">Common causes for 401 errors:</p>
                  <ul className="text-red-700 mt-1 list-disc list-inside">
                    <li>API key is invalid or expired</li>
                    <li>API key doesn't have the correct permissions</li>
                    <li>API key format is incorrect</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Response Display */}
          {response && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-lg font-medium text-green-800 mb-2">API Response</h3>
              <div className="bg-white p-4 rounded border">
                <pre className="whitespace-pre-wrap text-gray-800">{response}</pre>
              </div>
              <div className="mt-2 text-sm text-green-700">
                ✅ API is working correctly!
              </div>
            </div>
          )}

          {/* Debug Info */}
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Debug Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
              <p><strong>Has API Key:</strong> {anthropicApiKey ? 'Yes' : 'No'}</p>
              <p><strong>API Key Status:</strong> {apiKeyStatus}</p>
              <p><strong>Current URL:</strong> {window.location.href}</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-lg font-medium text-blue-800 mb-2">How to Use This Test</h3>
            <ol className="text-blue-700 list-decimal list-inside space-y-1">
              <li>Enter any text in the input field above</li>
              <li>Click "Test Anthropic API" to send the request</li>
              <li>Check if you get a response or an error</li>
              <li>If you get a 401 error, your API key needs to be updated</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;