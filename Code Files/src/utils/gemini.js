const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Classifies ticket content using Gemini AI.
 * Map results directly to ServiceNow choices: network, hardware, access, performance.
 */
const classifyTicket = async (shortDescription, description) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Analyze the following incident ticket details:
      Short Description: "${shortDescription}"
      Description: "${description}"

      Categorize into EXACTLY one of these categories: [network, hardware, access, performance].
      Suggest an appropriate Subcategory and Assignment Group (e.g., Network Admin, IT Support, Service Desk).

      Respond ONLY in valid JSON format:
      {
        "category": "<category>",
        "subcategory": "<subcategory>",
        "assignedGroup": "<group>"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Gemini Classification Error:', error.message);
    return {
      category: 'network', // Default fallback based on ServiceNow XML schema
      subcategory: 'general',
      assignedGroup: 'Service Desk'
    };
  }
};

module.exports = { classifyTicket };