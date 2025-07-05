# The Doms Chatbot Server

## Setup Instructions

1. Install Node.js and npm if not already installed.
2. Run the following commands:

   npm install
   npm start

3. Your chatbot backend will run on http://localhost:3000

To deploy on Render:
- Push this code to a GitHub repo.
- Connect your GitHub to Render.
- Create a new Web Service.
- Use `node server.js` as the start command.
- Add an environment variable: OPENAI_API_KEY = your actual API key.
