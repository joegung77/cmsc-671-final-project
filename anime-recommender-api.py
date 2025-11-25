from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import csv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/anime")
def get_anime():
    anime_list = []
    with open("anime-dataset-2023.csv", newline="", encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        
        # skip header
        next(reader)

        for row in reader:
            name = row[1]
            english_name = row[2]
            image_url = row[23]
            anime_list.append({"name": name, "english_name": english_name, "image_url": image_url})
    return anime_list
