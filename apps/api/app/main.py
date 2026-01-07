import io
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfMerger
from typing import List

app = FastAPI()

origins = [
    "https://pidief-app-web.vercel.app",
    "http://localhost:5173",
    "http://localhost:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def read_root():
    return {"status": "ok"}

@app.get("/api")
def read_root():
    return {"message": "Welcome to the Pidief API"}

@app.post("/api/unir-pdf")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    merger = PdfMerger()
    for file in files:
        merger.append(file.file)
    
    pdf_buffer = io.BytesIO()
    merger.write(pdf_buffer)
    merger.close()
    pdf_buffer.seek(0)
    
    return StreamingResponse(pdf_buffer, media_type="application/pdf", headers={
        "Content-Disposition": "attachment; filename=merged.pdf"
    })
