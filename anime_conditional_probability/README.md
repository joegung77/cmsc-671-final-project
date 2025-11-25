# Conditional Probability
The **anime_conditional_probability.py** file has a function **conditional_probability(queried_anime_ids, observed_anime_ids)** that returns the probability of liking (rating of 7 and higher) or not liking (rating of 6 and lower) given the animes that are already liked or disliked. To use the function, pass in two array of positive/negative values of anime ids for the **queried_anime_ids** and the **observed_anime_ids**, in which positive value means liking the anime and a negative value means disliking the anime. The anime ids can be found in **anime-dataset-2023.csv** dataset and the conditional probabilities were derived from **users-scores-2023.csv** dataset from [Anime Dataset 2023](https://www.kaggle.com/datasets/dbdmobile/myanimelist-dataset?select=users-score-2023.csv).
<br>
<br>
<br>
### Example: ###
**conditional_probability([3,-4,5], [6,7,-8])** returns the probability of liking animes with id 3 and 5, and disliking anime with id 4 given that the user likes anime with id 6 and 7, and dislikes anime with id 8.
<br>
<br>
### Note: ###
The **user_dict.pkl** file must be in the same folder as the **anime_conditional_probability.py** python file or the conditional probability function will not work.
