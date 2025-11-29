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