import { openai } from "../../lib/openai";


export interface PromptData {
  headline: string,
  context: string,
  author: string,
  topic: string,
  narrative: string
}

export async function composeThread(promptData: PromptData) {

  // Send the data to the server in JSON format.
  const JSONdata = JSON.stringify({ prompt: promptData })

  // API endpoint where we send form data.
  const endpoint = '/api/compose'

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: 'POST',
    // Tell the server we're sending JSON.
    headers: {
      'Content-Type': 'application/json',
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  }

  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, options)

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const data = await response.json();
  const { output } = data;
  return { thread: output.text.trim() };
}

export async function openApiCall(promptData: PromptData) {

  const prompt =
    `
    Act as a Twitter thread generator. I want you to generate a series of tweets on a specific topic. The topic should be related to current events or trending topics. Each tweet should be a self-contained thought and should build upon the previous tweets in the thread. The tweets should be concise and to the point, using no more than 280 characters. The tweets must be written in the style of the provided author. Use hashtags and include images or videos if possible to make the thread more engaging. Start your thread with a catchy headline that summarizes the topic.

      Headline: ${promptData.headline}
      Context: ${promptData.context}
      ${promptData.author ? (`Author Style: ${promptData.author}`) : (``)}
      ${promptData.topic ? (`Topic: ${promptData.topic}`) : (``)}
      ${promptData.narrative ? (`Narrative: ${promptData.narrative}`) : (``)}

      Thread:
      `

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt.trim(),
    stop: 'Thread:',
    max_tokens: 1000,
    temperature: 0.95,
    best_of: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    echo: false,
  });

  return completion.data;
}