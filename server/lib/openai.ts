// Check for API key
const apiKey = process.env.GROQ_API_KEY || "";

if (!apiKey) {
  console.warn("Warning: GROQ_API_KEY is not set. AI responses will not work.");
}

// Define Groq API interface to match the expected structure
export const groq = {
  chat: {
    completions: {
      create: async (params: any) => {
        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Groq API error:', errorData);
            throw new Error(`Groq API error: ${response.status}`);
          }
          
          return await response.json();
        } catch (error) {
          console.error('Error calling Groq API:', error);
          throw error;
        }
      }
    }
  }
};

// Function to generate embeddings for RAG
export async function generateEmbedding(text: string): Promise<number[] | null> {
  // Note: Groq currently doesn't offer a direct embedding API
  // For a production app, you might use another service for embeddings
  // or implement a different RAG approach
  console.log("Embedding generation requested but not available with current Groq implementation");
  return null;
}
