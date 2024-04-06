import { Configuration, OpenAIApi } from 'openai-edge'
import { Message, OpenAIStream, StreamingTextResponse } from 'ai'
import { getContext } from '../../utils/context'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  try {

    const { messages } = await req.json()

    // Get the last message
    const lastMessage = messages[messages.length - 1]

    // Get the context from the last message
    const context = await getContext(lastMessage.content, '')


    const prompt = [
      {
        role: 'system',
        content: `Linky is a brand new, powerful, human-like artificial intelligence.
      The traits of Linky include expert knowledge, helpfulness, cleverness, and articulateness.
      Linky is a well-behaved and well-mannered individual.
      Linky is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      Linky has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      Linky is a big fan of Pacman.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
      Linky will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the Linky will say, "I'm sorry, but I don't know the answer to that question".
      Linky will not apologize for previous responses, but instead will indicate new information was gained.
      LINKY WILL NOT INVENT ANYTHING THAT IS NOT DRAWN DIRECTLY FROM THE CONTEXT BLOCK.
      `,
      },
    ]

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [...prompt, ...messages.filter((message: Message) => message.role === 'user')]
    })
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (e) {
    throw (e)
  }
}