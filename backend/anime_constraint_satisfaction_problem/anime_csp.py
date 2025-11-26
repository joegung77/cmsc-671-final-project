

from __future__ import annotations
import argparse
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict, Iterable, List, Optional
import pandas as pd
import re



# 1. Generic CSP Framework


class Constraint(ABC):
    def __init__(self, variables: Iterable[str]):
        self.variables = list(variables)

    @abstractmethod
    def satisfied(self, assignment: Dict[str, Any]) -> bool:
        ...


class CSP:
    """Backtracking CSP + MRV heuristic."""

    def __init__(self, variables: List[str], domains: Dict[str, List[Any]]):
        self.variables = variables
        self.domains = {v: list(domains[v]) for v in variables}
        self.constraints = {v: [] for v in variables}

    def add_constraint(self, constraint: Constraint):
        for v in constraint.variables:
            if v not in self.variables:
                raise ValueError(f"Variable {v} not in CSP.")
            self.constraints[v].append(constraint)

    def _consistent(self, var, assignment):
        return all(constraint.satisfied(assignment) for constraint in self.constraints[var])

    def solve(self, max_solutions=None):
        solutions = []

        def backtrack(assign):
            if len(assign) == len(self.variables):
                solutions.append(dict(assign))
                if max_solutions and len(solutions) >= max_solutions:
                    return True
                return False

            unassigned = [v for v in self.variables if v not in assign]
            var = min(unassigned, key=lambda v: len(self.domains[v]))

            for value in self.domains[var]:
                assign[var] = value
                if self._consistent(var, assign):
                    if backtrack(assign):
                        return True
                del assign[var]
            return False

        backtrack({})
        return solutions


class UnaryConstraint(Constraint):
    """Unary constraint: predicate(value) must be True."""

    def __init__(self, variable, pred):
        super().__init__([variable])
        self.pred = pred

    def satisfied(self, assignment):
        v = self.variables[0]
        if v not in assignment:
            return True
        return bool(self.pred(assignment[v]))



# 2. Anime CSP – tuned for anime-dataset-2023.csv


@dataclass
class AnimeFilters:
    genres: Optional[List[str]] = None
    min_score: Optional[float] = None
    max_score: Optional[float] = None
    min_episodes: Optional[int] = None
    max_episodes: Optional[int] = None
    min_year: Optional[int] = None
    max_year: Optional[int] = None
    type_in: Optional[List[str]] = None
    min_members: Optional[int] = None
    min_scored_by: Optional[int] = None


def normalize_list(raw):
    if raw is None:
        return None
    return [x.strip() for x in raw.split(",") if x.strip()]


def extract_year(aired):
    if not isinstance(aired, str):
        return None
    match = re.search(r"(19\d{2}|20\d{2})", aired)
    return int(match.group(1)) if match else None


def load_dataset(path):
    df = pd.read_csv(path)
    df["Year"] = df["Aired"].apply(extract_year)
    return df


def build_csp(df: pd.DataFrame, filters: AnimeFilters):
    records = df.to_dict("records")
    csp = CSP(["anime"], {"anime": records})

    def num(row, key):
        v = row.get(key)
        if pd.isna(v):
            return None
        try:
            return float(v)
        except:
            return None

    #  GENRES 
    if filters.genres:
        wanted = {g.lower() for g in filters.genres}

        def genre_ok(row):
            genre_raw = str(row.get("Genres", ""))
            row_gen = {g.strip().lower() for g in genre_raw.split(",")}
            return bool(row_gen & wanted)

        csp.add_constraint(UnaryConstraint("anime", genre_ok))

    #  SCORE 
    if filters.min_score is not None or filters.max_score is not None:
        def score_ok(row):
            s = num(row, "Score")
            if s is None:
                return False
            if filters.min_score and s < filters.min_score:
                return False
            if filters.max_score and s > filters.max_score:
                return False
            return True

        csp.add_constraint(UnaryConstraint("anime", score_ok))

    #  EPISODES 
    if filters.min_episodes or filters.max_episodes:
        def ep_ok(row):
            ep = num(row, "Episodes")
            if ep is None:
                return False
            ep = int(ep)
            if filters.min_episodes and ep < filters.min_episodes:
                return False
            if filters.max_episodes and ep > filters.max_episodes:
                return False
            return True

        csp.add_constraint(UnaryConstraint("anime", ep_ok))

    #  YEAR 
    if filters.min_year or filters.max_year:
        def year_ok(row):
            y = row.get("Year")
            if y is None:
                return False
            if filters.min_year and y < filters.min_year:
                return False
            if filters.max_year and y > filters.max_year:
                return False
            return True

        csp.add_constraint(UnaryConstraint("anime", year_ok))

    #  TYPE 
    if filters.type_in:
        allowed = {t.lower() for t in filters.type_in}

        def type_ok(row):
            return str(row.get("Type", "")).lower() in allowed

        csp.add_constraint(UnaryConstraint("anime", type_ok))

    #  MEMBERS 
    if filters.min_members:
        def members_ok(row):
            m = num(row, "Members")
            return m is not None and m >= filters.min_members

        csp.add_constraint(UnaryConstraint("anime", members_ok))

    #  SCORED BY 
    if filters.min_scored_by:
        def scored_ok(row):
            s = num(row, "Scored By")
            return s is not None and s >= filters.min_scored_by

        csp.add_constraint(UnaryConstraint("anime", scored_ok))

    return csp


def run_csp(path, filters: AnimeFilters, limit=50):
    df = load_dataset(path)
    csp = build_csp(df, filters)
    sols = csp.solve(max_solutions=limit)
    return [s["anime"] for s in sols]



# 3. CLI


def main():
    parser = argparse.ArgumentParser(description="Anime CSP Filter")
    parser.add_argument("--data", required=True)
    parser.add_argument("--genres")
    parser.add_argument("--min-score", type=float)
    parser.add_argument("--max-score", type=float)
    parser.add_argument("--min-episodes", type=int)
    parser.add_argument("--max-episodes", type=int)
    parser.add_argument("--min-year", type=int)
    parser.add_argument("--max-year", type=int)
    parser.add_argument("--type-in")
    parser.add_argument("--min-members", type=int)
    parser.add_argument("--min-scored-by", type=int)
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--out")

    args = parser.parse_args()

    filters = AnimeFilters(
        genres=normalize_list(args.genres),
        min_score=args.min_score,
        max_score=args.max_score,
        min_episodes=args.min_episodes,
        max_episodes=args.max_episodes,
        min_year=args.min_year,
        max_year=args.max_year,
        type_in=normalize_list(args.type_in),
        min_members=args.min_members,
        min_scored_by=args.min_scored_by,
    )

    results = run_csp(args.data, filters, args.limit)

    print(f"\nFound {len(results)} anime:\n")
    for i, row in enumerate(results, 1):
        print(f"{i:3d}. {row['Name']} (Score={row['Score']}, Type={row['Type']}, Year={row['Year']})")

    if args.out:
        pd.DataFrame(results).to_csv(args.out, index=False)
        print(f"\nSaved output to {args.out}")


if __name__ == "__main__":
    main()