# 🧠 Pokémon MCP Server

A powerful web application that allows users to:
- 🔍 Search Pokémon by name, type, or generation  
- ⚔️ Compare two Pokémon side by side  
- 🧩 Generate competitive teams from natural language descriptions

Built with **FastAPI** (backend) and **React** (frontend).

---

## 📁 Project Structure
root/                                                                                                         
├── backend/ # FastAPI backend                                                                                                                 
│ ├── main.py # FastAPI app entry                                                                                                                          
│ ├── team_builder.py                                                                                                                                        
│ ├── information_retrieval.py                                                                                                                                  
│ ├── comparison.py                                                                                                                                            
│ └── test_api.py # Basic tests                                                                                                                                
├── frontend/ # React frontend                                                                                                                                       
│ ├── src/                                                                                                                                                          
│ │ ├── App.jsx                                                                                                                                                 
│ │ ├── pages/                                                                                                                                                 
│ │ │ ├── SearchPage.jsx                                                                                                                                             
│ │ │ ├── ComparePage.jsx                                                                                                                                               
│ │ │ └── TeamBuilderPage.jsx                                                                                                                                     
│ │ └── services/api.js                                                                                                                                          
├── README.md # Project guide                                                                                                                                    
└── .gitignore                                                                                                                                                   



---

## ⚙️ How to Run

### 🔙 Backend (FastAPI)

1. **Navigate to the backend folder**:

   ```bash
   cd backend

2 **Create a virtual environment (optional but recommended)**:

    python -m venv venv
    source venv/bin/activate  # or venv\Scripts\activate on Windows

3 **Install dependencies**:

    pip install -r requirements.txt


4 **Run the FastAPI server**:

    uvicorn main:app --reload

Server runs on: http://127.0.0.1:8000


### 🖼 Frontend (React)

1 **Navigate to the frontend folder**:

    cd frontend

2 **Install dependencies**:

    npm install

3 **Start the React app**:

    npm run dev

App runs on: http://localhost:5173 (or as shown in terminal)


## 🧪 Testing

### Backend

**Run tests using**:                                                                                                          
   cd backend                                                                                                                                                                
   pytest test_api.py                                                                                                      

### Frontend

**Manual testing**: 
✅ Search Pokémon by name/type/gen                                                                                              

✅ Compare any two Pokémon                                                                                               

✅ Generate teams based on description                                                                                       



## ✅ Features
Get Pokémon by name or ID

Filter by type and generation

Compare two Pokémon side by side

Generate a team based on your strategy description (NLP)

FastAPI backend + React frontend



## 📦 Future Improvements
User login & team saving

More advanced NLP team generation

Add visual type effectiveness charts

Deploy on Render / Vercel

Save favorite teams

Add advanced filtering options

Pokédex-styled UI

Dark mode toggle

## 🧑‍💻 Author

Nitin Kandpal                                                                                                                                      
GitHub: @Nitin-kandpal17



## 📄 License

MIT License. See `LICENSE` file for details.
