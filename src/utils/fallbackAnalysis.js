/**
 * Fallback text analysis utilities
 * Provides basic text analysis when external AI APIs are unavailable
 */

export const analyzeTopic = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  const wordCount = {};
  
  // Count word frequency (excluding common words)
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
    'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'ours', 'theirs', 'myself', 'yourself',
    'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves'
  ]);

  words.forEach(word => {
    const cleanWord = word.replace(/[^\w]/g, '');
    if (cleanWord.length > 3 && !commonWords.has(cleanWord)) {
      wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
    }
  });

  // Get top keywords
  const topKeywords = Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  return topKeywords;
};

export const detectSentiment = (text) => {
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome', 'perfect',
    'love', 'like', 'enjoy', 'happy', 'pleased', 'satisfied', 'delighted', 'thrilled',
    'success', 'successful', 'achievement', 'accomplish', 'win', 'victory', 'triumph'
  ];

  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'dislike', 'angry', 'frustrated',
    'disappointed', 'sad', 'upset', 'annoyed', 'problem', 'issue', 'error', 'fail', 'failure',
    'wrong', 'difficult', 'hard', 'impossible', 'never', 'nothing', 'nobody'
  ];

  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    const cleanWord = word.replace(/[^\w]/g, '');
    if (positiveWords.includes(cleanWord)) positiveCount++;
    if (negativeWords.includes(cleanWord)) negativeCount++;
  });

  const total = positiveCount + negativeCount;
  if (total === 0) return 'Neutral';
  
  const positiveRatio = positiveCount / total;
  if (positiveRatio > 0.6) return 'Positive';
  if (positiveRatio < 0.4) return 'Negative';
  return 'Neutral';
};

export const extractKeyMoments = (text) => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const keyMoments = [];

  // Look for sentences with question words
  const questionWords = ['what', 'when', 'where', 'who', 'why', 'how'];
  const importantWords = ['important', 'significant', 'key', 'main', 'primary', 'crucial', 'essential'];
  const actionWords = ['decided', 'concluded', 'agreed', 'announced', 'declared', 'stated'];

  sentences.forEach((sentence, index) => {
    const lowerSentence = sentence.toLowerCase();
    let score = 0;

    // Score based on content
    if (questionWords.some(word => lowerSentence.includes(word))) score += 2;
    if (importantWords.some(word => lowerSentence.includes(word))) score += 3;
    if (actionWords.some(word => lowerSentence.includes(word))) score += 2;
    if (sentence.length > 100) score += 1; // Longer sentences might be more detailed
    if (lowerSentence.includes('because') || lowerSentence.includes('therefore')) score += 1;

    if (score >= 2) {
      keyMoments.push({
        text: sentence.trim(),
        position: index + 1,
        score: score
      });
    }
  });

  return keyMoments.sort((a, b) => b.score - a.score).slice(0, 5);
};

export const detectAnomalies = (text) => {
  const anomalies = [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 5);
  
  sentences.forEach((sentence, index) => {
    const trimmed = sentence.trim();
    
    // Check for very short sentences (might be incomplete)
    if (trimmed.length < 20 && trimmed.length > 5) {
      anomalies.push({
        type: 'Short Fragment',
        text: trimmed,
        position: index + 1,
        description: 'Unusually short sentence or fragment'
      });
    }
    
    // Check for very long sentences (might be run-on)
    if (trimmed.length > 200) {
      anomalies.push({
        type: 'Long Sentence',
        text: trimmed.substring(0, 100) + '...',
        position: index + 1,
        description: 'Unusually long sentence'
      });
    }
    
    // Check for repeated words
    const words = trimmed.toLowerCase().split(/\s+/);
    const wordSet = new Set(words);
    if (words.length > 10 && wordSet.size < words.length * 0.7) {
      anomalies.push({
        type: 'Repetitive Content',
        text: trimmed.substring(0, 100) + '...',
        position: index + 1,
        description: 'High word repetition detected'
      });
    }
  });

  return anomalies.slice(0, 5);
};

export const generateBasicStats = (text) => {
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  const avgWordsPerSentence = sentences.length > 0 ? Math.round(words.length / sentences.length) : 0;
  const avgSentencesPerParagraph = paragraphs.length > 0 ? Math.round(sentences.length / paragraphs.length) : 0;
  
  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    avgWordsPerSentence,
    avgSentencesPerParagraph,
    estimatedReadingTime: Math.ceil(words.length / 200) // Assuming 200 words per minute
  };
};

export const performFallbackAnalysis = (text) => {
  const topKeywords = analyzeTopic(text);
  const sentiment = detectSentiment(text);
  const keyMoments = extractKeyMoments(text);
  const anomalies = detectAnomalies(text);
  const stats = generateBasicStats(text);

  return {
    summary: `Basic Text Analysis (${stats.wordCount} words)`,
    topicModeling: {
      keywords: topKeywords,
      sentiment: sentiment
    },
    keyMoments: keyMoments,
    anomalies: anomalies,
    statistics: stats,
    note: "This analysis was performed using built-in text processing algorithms. For more advanced AI-powered insights, please configure the Anthropic API key."
  };
};