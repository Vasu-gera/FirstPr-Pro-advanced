from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import get_db

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])

@router.get("/", response_model=List[schemas.User])
def get_leaderboard(db: Session = Depends(get_db)):
    # Returns users ordered by score descending. Only return users who have solved at least 1 issue.
    # To encourage the dashboard showing everyone, we'll return all users sorted by score.
    users = db.query(models.User).order_by(models.User.score.desc()).all()
    return users
