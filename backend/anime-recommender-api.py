from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import csv

class AnimeRecommendationRequest(BaseModel):
    genres: List[str]
    minimum_score: int
    maximum_score: int
    minimum_episodes: int
    maximum_episodes: int
    minimum_year: int
    maximum_year: int
    types: List[str]
    minimum_members: int
    maximum_members: int
    liked_anime_ids: List[int]
    disliked_anime_ids: List[int]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/test")
def test(data: AnimeRecommendationRequest):
    print(data)
    return {"success": True}


@app.get("/anime")
def get_anime():
    anime_list = []
    with open("anime-dataset-2023.csv", newline="", encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        
        # skip header
        next(reader)

        for row in reader:
            id = row[0]
            name = row[1]
            english_name = row[2]
            image_url = row[23]
            anime_list.append({"id": id, "name": name, "english_name": english_name, "image_url": image_url})
    
    return anime_list

@app.get("/genre")
def get_genre():
    genre_list = []
    with open("anime-dataset-2023.csv", newline="", encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)

        # skip header
        next(reader)

        for row in reader:
            genres = row[5].split(",")
            for genre in genres:
                # remove spaces at beginning and end of genre string
                genre_stripped = genre.strip()
                if (genre_stripped not in genre_list):
                    genre_list.append(genre_stripped)

    return genre_list

@app.get("/type")
def get_type():
    type_list = []
    with open("anime-dataset-2023.csv", newline="", encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)

        # skip header
        next(reader)

        for row in reader:
            types = row[7].split(",")
            for type in types:
                # remove spaces at beginning and end of type string
                type_stripped = type.strip()
                if (type not in type_list):
                    type_list.append(type_stripped)

    return type_list