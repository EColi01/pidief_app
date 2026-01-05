from fastapi import FastAPI

app = FastAPI()

@app.get("/api/health")
def read_root():
    return {"status": "ok"}

@app.get("/api")
def read_root():
    return {"message": "Welcome to the Pidief API"}
