import pandas
import pickle

# run this to initialize the user score map. Otherwise other python files will not work
# takes about 30 seconds

print("Initializing user score dict...")

df = pandas.read_csv("users-score-2023.csv")

user_dict = {
    user: dict(zip(group["anime_id"], group["rating"]))
    for user, group in df.groupby("user_id")
}

with open("user_dict.pkl", "wb") as f:
    pickle.dump(user_dict, f)
    print("Done!")
    