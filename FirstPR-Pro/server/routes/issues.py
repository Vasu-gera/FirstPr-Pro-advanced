from fastapi import APIRouter
from services import github
from services.ranking import rank_issues

router = APIRouter()

@router.get("/issues")
def get_issues(skills: str = "", level: str = "beginner"):
    """
    Fetches issues from GitHub based on skills.
    """
    # Fetch real issues from GitHub
    issues = github.fetch_github_issues(skills, level)

    # Apply ranking logic to calculate match scores
    if issues:
        issues = rank_issues(issues, skills, level)

    return issues
