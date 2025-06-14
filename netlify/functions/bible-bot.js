const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message || "Hello";

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a friendly, helpful Christian assistant called Bible Bot. You love Jesus and encourage others using scripture and kindness."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.9,
      max_tokens: 200,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.data.choices[0].message.content
      })
    };
  } catch (error) {
    console.error("Bible Bot error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Bible Bot failed to respond." })
    };
  }
};
