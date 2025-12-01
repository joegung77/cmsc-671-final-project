# Anime Recommender Agent Setup Instructions

## Backend
In the project folder, execute these commands
```bash
# Navigate to backend directory
cd backend

# Make sure you have python3 and pip installed
sudo apt install python3 pip

# Create python virtual environment for safe pip install
python3 -m venv cmsc-671-final-project-venv

# Navigate to environment
source cmsc-671-final-project-venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run uvicorn to load backend api
uvicorn anime-recommender-api:app --reload
```

Now the backend is running. You'll need to start the frontend now.

## Frontend
In another terminal in the project folder, execute these commands
```bash
# Navigate to frontend Anime recommender app
cd frontend/anime-recommender-app

# Make sure you have npm, vite, and nodejs installed
sudo apt install nodejs npm vite

# Install node packages
npm install

# Start web UI
npm run dev
```

Ctrl click the localhost link to open the Anime Recommender Agent in a webpage. Follow the instructions on the webpage.




