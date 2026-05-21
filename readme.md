AIPasta project
1. multiple llms
2. streaming effect with SSE
3. conversation history redis
4. 


Things that I did not do intentionally
1. memory layer tools like mem0 - this is because further projects are going to be on that, in this project i want to focus upon openrouter and streaming responses, redis part(i have never done this before absolutely 0 knowledge abuot it)
2. not using vectorDBs - we have 2 things here
    A. conversational context engineering - thats what we are building here
    B. knowledge based context - pdf chats, notionAI, codex, cursor where vector search, retreival chunks are more needed
    we just want to have users' prompt + summary + system prompt and no knowledge based system, 
    knowledge based systems require heavy embeddings and vector operations so it makes sense to use vectorDBs.
3. Auth - its just waste of time, already have done it thousands of times, doesnt make sense to do it every single time 




only install commands will add prisma and prisma.config.ts 
in prisma.config.ts change process.env["DATABASE_URL"], to  process.env["DIRECT_URL"],
new file in src/db.ts


lets just focus on fewer models
gpt, anthropic, gemini thats it 


how much ai did i use
- for making openrouter calls
- for context formatting
- 