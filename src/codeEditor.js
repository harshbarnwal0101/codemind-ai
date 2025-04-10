import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { basicSetup } from 'codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import './CodeEditor.css'; // ← Import CSS

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here...');
  const [reviewMode, setReviewMode] = useState('general');
  const [customPrompt, setCustomPrompt] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    setFeedback('');

    try {
      const response = await fetch('http://localhost:8000/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          mode: reviewMode,
          custom_prompt: reviewMode === 'custom' ? customPrompt : null,
        }),
      });

      const data = await response.json();
      setFeedback(data.feedback || 'No feedback returned.');
    } catch (error) {
      console.error('Error reviewing code:', error);
      setFeedback('Error reviewing code. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4 bg-[#0d1117] text-white rounded-xl shadow-xl">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Select Review Mode:</label>
        <select
          value={reviewMode}
          onChange={(e) => setReviewMode(e.target.value)}
          className="w-full p-2 bg-[#161b22] border border-gray-600 rounded text-white"
        >
          <option value="general">General Review</option>
          <option value="security">Security Audit</option>
          <option value="style">Code Style Only</option>
          <option value="custom">Custom Prompt</option>
        </select>

        {reviewMode === 'custom' && (
          <textarea
            placeholder="Enter your custom prompt here..."
            className="w-full p-2 mt-2 bg-[#161b22] border border-gray-600 rounded text-white"
            rows={3}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
        )}
      </div>

      <CodeMirror
        value={code}
        height="300px"
        extensions={[basicSetup, javascript(), oneDark]}
        theme={oneDark}
        onChange={(value) => setCode(value)}
      />

      <button
        onClick={handleReview}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
      >
        {loading ? 'Reviewing...' : 'Review Code'}
      </button>

      {feedback && (
        <div className="mt-4 p-4 border border-gray-600 rounded bg-[#161b22]">
          <h2 className="text-lg font-semibold mb-2">AI Feedback</h2>
          <pre className="whitespace-pre-wrap">{feedback}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
