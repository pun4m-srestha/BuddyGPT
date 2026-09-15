import dotenv from "dotenv";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;


const getOpenAIAPIResponse = async (messages) => {

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          model: "openrouter/free",

          messages: messages
        })
      }
    );


    const data = await response.json();
     console.log("FULL OPENROUTER RESPONSE:");
    console.log(JSON.stringify(data, null, 2));


    if (!response.ok) {
      throw new Error(
        data.error?.message || "OpenRouter Error"
      );
    }


    return data.choices[0].message.content;
   

  } catch (err) {

    console.log("OpenAI Error:", err.message);

    throw err;

  }

};


export default getOpenAIAPIResponse;