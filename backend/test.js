import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "http://localhost:1234/v1",
  apiKey: "lm-studio",
});

const run = async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama-3.1-8b-instruct",
      stream: true,
      messages: [
        {
          role: "system",
          content: `you are my cute girlfriend`,
        },
        {
          role: "user",
          content: `hi baby`,
        },
      ],
    });

    let fullResponse = "";
    for await (const chunk of completion) {
      const content = chunk.choices[0].delta.content || "";
      process.stdout.write(content);
      fullResponse += content;
    }

    console.log("\nFinal response:", fullResponse);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

run();