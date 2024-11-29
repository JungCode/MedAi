import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize OpenAI API
const openai = new OpenAI({
  baseURL: "http://localhost:1234/v1", // Adjust this base URL as needed
  apiKey: "lm-studio", // Replace with your actual API key
});

// Store user-specific personalInfo globally
let personalInfo = "";

// System message to guide the AI
const systemMessage = {
  role: "system",
  content: `
  You are a personal health assistant designed to provide accurate, reliable, and context-sensitive responses. 
  Your goals include:
    1. Providing actionable and friendly advice for users experiencing health symptoms.
    2. Delivering structured, scientific, and detailed answers for general medical or biological knowledge questions.
    3. Ensuring users receive clear, empathetic, and concise responses that are easy to understand.
  Always differentiate personal health inquiries from general knowledge questions, tailoring your response to the user's context.`,
};

// Helper function to classify query type
const classifyQueryType = (input) => {
  const symptomKeywords = /(pain|fever|cough|rash|nausea|ache|symptom|diagnose|treatment|health issue|medicine)/i;
  const knowledgeKeywords = /(how|why|what|explain|biology|science|function|process)/i;

  if (symptomKeywords.test(input)) {
    return "symptomQuery";
  } else if (knowledgeKeywords.test(input)) {
    return "knowledgeQuery";
  } else {
    return "ambiguousQuery"; // Fallback for unclear queries
  }
};

// Helper function to generate a prompt based on query type
const generatePrompt = (type, context, userProfile) => {
  const profileContext = userProfile
    ? `The user's health profile is: "${userProfile}". `
    : "";

  switch (type) {
    case "knowledgeQuery":
      return `${profileContext}The user asked: "${context}". Provide a detailed, structured, and accurate scientific explanation. Ensure the response is comprehensive and easy to understand.`;
    case "symptomQuery":
      return `${profileContext}The user described their symptoms as: "${context}". Provide actionable, simple, and friendly advice, such as first aid measures or lifestyle tips. If needed, recommend consulting a healthcare professional.`;
    default:
      return `${profileContext}The input is: "${context}". Please respond appropriately.`;
  }
};

// Store conversation history
let messages = [systemMessage];

// Endpoint to prepare user profile data
app.post("/api/prepare-data", (req, res) => {
  const { personalInfo: newPersonalInfo } = req.body;

  if (!newPersonalInfo) {
    return res.status(400).json({ error: "Personal information is required." });
  }

  // Update personalInfo
  personalInfo = newPersonalInfo;

  console.log("User profile updated:", personalInfo);
  res.status(200).json({ message: "User profile prepared successfully." });
});

// Endpoint to handle user queries
app.post("/api/query", async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "Input is required." });
  }

  try {
    // Automatically classify the query type
    const queryType = classifyQueryType(input);

    // Generate the appropriate prompt
    const prompt = generatePrompt(queryType, input, personalInfo);
    messages.push({ role: "user", content: prompt });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "openbiollm-llama3-8b", // Replace with the actual model
      stream: true,
      messages: messages,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let responseBuffer = "";

    for await (const chunk of completion) {
      const content = chunk.choices[0].delta.content || "";
      responseBuffer += content;

      res.write(content); // Stream content to the client
    }

    res.end();
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ error: "An error occurred while processing the query." });
  }
});

// Endpoint to reset the conversation
app.post("/api/reset", (req, res) => {
  messages = [systemMessage]; // Reset to only the system message
  console.log("Conversation reset.");
  res.status(200).json({ message: "Conversation reset successfully." });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
