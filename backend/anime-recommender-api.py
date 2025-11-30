from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from anime_constraint_satisfaction_problem.anime_csp import run_csp, AnimeFilters
from anime_conditional_probability.anime_conditional_probability import conditional_probability
import csv
import random

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
    minimum_scored_by: int
    liked_anime_ids: List[int]
    disliked_anime_ids: List[int]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/anime_recommendations")
def get_anime_recommendations(data: AnimeRecommendationRequest):
    animeFilters = AnimeFilters(
        genres=data.genres,
        min_score=data.minimum_score,
        max_score=data.maximum_score,
        min_episodes=data.minimum_episodes,
        max_episodes=data.maximum_episodes,
        min_year=data.minimum_year,
        max_year=data.maximum_year,
        type_in=data.types,
        min_members=data.minimum_members,
        min_scored_by=data.minimum_scored_by
    )

    liked_anime_ids = data.liked_anime_ids
    disliked_anime_ids = data.disliked_anime_ids

    # Run CSP to find set of anime solutions
    anime_solutions = run_csp("anime-dataset-2023.csv", animeFilters, 20)

    # Filter ones out that the user already likes/dislikes
    filtered_anime_solutions = [anime for anime in anime_solutions if anime["anime_id"] not in liked_anime_ids and anime["anime_id"] not in disliked_anime_ids]

    top_anime_solutions = []

    # if i have liked/disliked animes, then rank the top 5 based on conditional probability
    if (len(liked_anime_ids) > 0 or len(disliked_anime_ids) > 0):
        anime_conditional_probability_dict = {}
        for anime in filtered_anime_solutions:
            anime_id = anime["anime_id"]

            queried_anime_ids = [anime_id]
            observed_anime_ids = []

            for liked_anime_id in liked_anime_ids:
                observed_anime_ids.append(liked_anime_id)

            for disliked_anime_id in disliked_anime_ids:
                observed_anime_ids.append(-1 * disliked_anime_id)
            
            anime_conditional_probability_dict[anime_id] = conditional_probability(queried_anime_ids, observed_anime_ids)
        
        sorted_anime_dict = dict(sorted(anime_conditional_probability_dict.items(), key=lambda x: x[1], reverse=True))

        counter = 0
        for key in sorted_anime_dict:
            for anime in filtered_anime_solutions:
                if anime["anime_id"] == key:
                    top_anime_solutions.append(anime)
                    counter += 1
                    break
            if counter == 5:
                break
    elif len(filtered_anime_solutions) > 5:
        top_anime_solutions = random.sample(list(filtered_anime_solutions), 5)
    else:
        top_anime_solutions = filtered_anime_solutions

    return top_anime_solutions


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