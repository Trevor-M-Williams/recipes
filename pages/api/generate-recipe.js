import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const { prompt } = req.body;
  const fullPrompt = `
    Generate a recipe given the following information: ${prompt}

    The response should be in JSON format with no extra text as follows:

    {
      "name": //recipe name, string
      "ingredients": [
        {
          "name": //name of ingredient, string
          "quantity": //quantity - integer or fraction, string
          "unit": //unit of measurement if applicable, string
        }
      ],
      "directions": [
        // detailed list of instructions, array of strings
      ],
      "servings": //serving size, number
      "timeToCook": //cook time in minutes, number
      "category": //category: breakfast, lunch, dinner, dessert, or snack, string
    } 
  `;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: fullPrompt,
      max_tokens: 2000,
    });

    res.status(200).json({ data: completion.data.choices[0].text });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "An error occured" });
  }
}
