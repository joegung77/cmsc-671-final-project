import pickle

def main():
    print(conditional_probability([3,-4,5], [6,7,-8]))


def conditional_probability(queried_anime_ids, observed_anime_ids):

    with open("user_dict.pkl", "rb") as f:
        user_dict = pickle.load(f)
        print(user_dict)
        # get array of users that are invalid for the query
        invalid_users = []
        for user_id in user_dict:
            rating_dict = user_dict[user_id]
            
            has_queried_observed_animes = True
            
            for observed_anime_id in observed_anime_ids:
                abs_anime_id = abs(observed_anime_id)
                if abs_anime_id not in rating_dict or (rating_dict[abs_anime_id] < 7 and observed_anime_id > 0) or (rating_dict[abs_anime_id] >= 7 and observed_anime_id < 0):
                    has_queried_observed_animes = False
                    break
            
            if not has_queried_observed_animes:
                invalid_users.append(user_id)

        # remove invalid users from the dict
        for user_id in invalid_users:
            user_dict.pop(user_id)



        is_query = 0
        is_not_query = 0

        # count all the users that meet the query and don't meet the query
        for user_id in user_dict:
            rating_dict = user_dict[user_id]
            for queried_anime_id in queried_anime_ids:
                abs_anime_id = abs(queried_anime_id)
                if abs_anime_id not in rating_dict:
                    continue
                elif (rating_dict[abs_anime_id] >= 7 and queried_anime_id > 0) or (rating_dict[abs_anime_id] < 7 and queried_anime_id < 0):
                    is_query += 1
                else:
                    is_not_query += 1

        if is_query > 0 or is_not_query > 0:
            return is_query/(is_query + is_not_query)
        else:
            return 0.0
if __name__ == "__main__":
    main()