import { NextRequest, NextResponse } from 'next/server';

// AI Model configurations for OpenRouter (Free models)
const AI_MODELS = [
  {
    name: 'ChatGPT',
    id: 'qwen/qwen3-235b-a22b:free', // Using Qwen as ChatGPT alternative
    icon: '🤖',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Claude',
    id: 'deepseek/deepseek-chat-v3.1:free', // Using DeepSeek as Claude alternative
    icon: '🧠',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Gemini',
    id: 'google/gemini-2.0-flash-exp:free', // Using actual Gemini free model
    icon: '💎',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Llama',
    id: 'meta-llama/llama-3.3-70b-instruct:free', // Using actual Llama free model
    icon: '🦙',
    color: 'from-orange-500 to-red-500',
  },
];

// Rate limiting (simple in-memory store - in production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = requestCounts.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count += 1;
  return true;
}

async function callOpenRouter(prompt: string, model: string): Promise<string> {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key not configured');
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ai-mantra.vercel.app',
        'X-Title': 'Ai-Mantra',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant. Please provide complete, well-structured responses. Keep your response concise but comprehensive, ensuring you finish all your thoughts and sentences within the token limit. Structure your response with clear paragraphs, use bullet points for lists when appropriate, and make sure to conclude your response properly without cutting off mid-sentence.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 750,
        temperature: 0.7,
        stop: null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`OpenRouter API error for model ${model}:`, response.status, errorData);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      let content = data.choices[0].message.content;
      const finishReason = data.choices[0].finish_reason;
      
      // Check if response was cut off due to length
      if (finishReason === 'length') {
        // Try to end at the last complete sentence
        const lastSentenceEnd = Math.max(
          content.lastIndexOf('.'),
          content.lastIndexOf('!'),
          content.lastIndexOf('?')
        );
        
        if (lastSentenceEnd > content.length * 0.7) {
          // If we can find a sentence end in the last 30% of text, use it
          content = content.substring(0, lastSentenceEnd + 1);
        } else {
          // Otherwise add an indication that the response was truncated
          content = content.trim();
          if (!content.endsWith('.') && !content.endsWith('!') && !content.endsWith('?')) {
            content += '...';
          }
        }
      }
      
      // Improve formatting for better readability
      content = content
        // Add line breaks before numbered lists
        .replace(/(\d+\.)\s/g, '\n$1 ')
        // Add line breaks before bullet points
        .replace(/([.!?])\s*([-*•])\s/g, '$1\n\n$2 ')
        // Add line breaks before headers (lines ending with :)
        .replace(/([.!?])\s*([A-Z][^.!?]*:)/g, '$1\n\n$2')
        // Add spacing between paragraphs
        .replace(/([.!?])\s*([A-Z][^.!?]*[.!?])/g, '$1\n\n$2')
        // Clean up multiple line breaks
        .replace(/\n{3,}/g, '\n\n')
        // Trim whitespace
        .trim();
      
      return content;
    }
    
    throw new Error('Invalid response format from OpenRouter');
  } catch (error) {
    console.error(`Error calling ${model}:`, error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'anonymous';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: '1 hour'
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { prompt } = body;

    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
      );
    }

    if (prompt.length > 800) {
      return NextResponse.json(
        { error: 'Prompt too long. Maximum 800 characters allowed for complete responses.' },
        { status: 400 }
      );
    }

    // Check for inappropriate content (basic filter)
    const inappropriateKeywords = ['hack', 'exploit', 'malware', 'virus'];
    const lowerPrompt = prompt.toLowerCase();
    
    if (inappropriateKeywords.some(keyword => lowerPrompt.includes(keyword))) {
      return NextResponse.json(
        { error: 'Inappropriate content detected' },
        { status: 400 }
      );
    }

    // If OpenRouter is not configured, return demo responses
    if (!process.env.OPENROUTER_API_KEY) {
      console.log('OpenRouter API key not found, returning demo responses');
      
      const demoResponses = [
        {
          model: 'ChatGPT',
          response: `I understand you're asking about: "${prompt}". This is a comprehensive approach that considers multiple perspectives and provides actionable insights. In my analysis, I would recommend considering the various factors involved and taking a structured approach to address your question effectively.`,
          icon: '🤖',
          color: 'from-green-500 to-emerald-500',
        },
        {
          model: 'Claude',
          response: `Regarding your question: "${prompt}". I'd like to break this down into clear, manageable steps. From my perspective, it's important to consider both the immediate and long-term implications. Here's a thoughtful analysis that addresses your specific needs and requirements.`,
          icon: '🧠',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          model: 'Gemini',
          response: `Thank you for asking about: "${prompt}". This is an interesting question that deserves a detailed analysis. Based on current understanding and best practices, I would suggest taking a multi-faceted approach that considers various perspectives and potential outcomes.`,
          icon: '💎',
          color: 'from-purple-500 to-pink-500',
        },
        {
          model: 'Llama',
          response: `I see you're inquiring about: "${prompt}". This is a topic that benefits from careful consideration. In my experience, the most effective approach involves understanding the context, analyzing the options, and implementing a solution that addresses the core requirements while remaining adaptable.`,
          icon: '🦙',
          color: 'from-orange-500 to-red-500',
        },
      ];

      return NextResponse.json({
        success: true,
        responses: demoResponses,
        demo: true,
      });
    }

    // Call multiple AI models in parallel
    const responsePromises = AI_MODELS.map(async (model) => {
      try {
        const response = await callOpenRouter(prompt, model.id);
        return {
          model: model.name,
          response,
          icon: model.icon,
          color: model.color,
        };
      } catch (error) {
        console.error(`Error with ${model.name}:`, error);
        return {
          model: model.name,
          response: `Sorry, ${model.name} is currently unavailable. Please try again later.`,
          icon: model.icon,
          color: model.color,
          error: true,
        };
      }
    });

    const responses = await Promise.all(responsePromises);

    return NextResponse.json({
      success: true,
      responses,
      demo: false,
    });

  } catch (error) {
    console.error('API Error:', error);
    
    // Type-safe error message extraction
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to compare AI models.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to compare AI models.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to compare AI models.' },
    { status: 405 }
  );
}