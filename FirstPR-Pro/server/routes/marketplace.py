from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import get_db

router = APIRouter(prefix="/marketplace", tags=["Marketplace"])

# Helper to get or create a mock user
def get_or_create_user(db: Session, username: str):
    user = db.query(models.User).filter(models.User.name == username).first()
    if not user:
        user = models.User(name=username)
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

@router.get("/issues", response_model=List[schemas.MarketplaceIssue])
def get_issues(difficulty: str = None, status: str = None, db: Session = Depends(get_db)):
    query = db.query(models.MarketplaceIssue)
    if difficulty:
        query = query.filter(models.MarketplaceIssue.difficulty == difficulty)
    if status:
        query = query.filter(models.MarketplaceIssue.status == status)
    return query.all()

@router.post("/issues", response_model=schemas.MarketplaceIssue)
def create_issue(issue: schemas.MarketplaceIssueCreate, db: Session = Depends(get_db)):
    user = get_or_create_user(db, issue.creator_name)
    
    db_issue = models.MarketplaceIssue(
        title=issue.title,
        description=issue.description,
        repo_link=issue.repo_link,
        difficulty=issue.difficulty,
        status="open",
        created_by_id=user.id
    )
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue

@router.get("/issues/{issue_id}", response_model=schemas.MarketplaceIssue)
def get_issue(issue_id: int, db: Session = Depends(get_db)):
    issue = db.query(models.MarketplaceIssue).filter(models.MarketplaceIssue.id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue

@router.post("/issues/{issue_id}/claim", response_model=schemas.MarketplaceIssue)
def claim_issue(issue_id: int, username: str, db: Session = Depends(get_db)):
    issue = db.query(models.MarketplaceIssue).filter(models.MarketplaceIssue.id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    if issue.status != "open":
        raise HTTPException(status_code=400, detail="Issue is not open to claim")
    
    # Claiming sets status
    issue.status = "in-progress"
    
    # Ensures user exists
    get_or_create_user(db, username)
    
    db.commit()
    db.refresh(issue)
    return issue

@router.post("/issues/{issue_id}/submit", response_model=schemas.Submission)
def submit_solution(issue_id: int, username: str, submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    issue = db.query(models.MarketplaceIssue).filter(models.MarketplaceIssue.id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    if issue.status != "in-progress":
        raise HTTPException(status_code=400, detail="Issue must be 'in-progress' to submit a solution")
    
    user = get_or_create_user(db, username)
    
    db_sub = models.Submission(
        issue_id=issue.id,
        solved_by_id=user.id,
        solution=submission.solution
    )
    
    db.add(db_sub)
    db.commit()
    db.refresh(db_sub)
    return db_sub

@router.post("/issues/{issue_id}/rate")
def rate_submission(issue_id: int, submission_id: int, rating_data: schemas.RateSubmission, db: Session = Depends(get_db)):
    issue = db.query(models.MarketplaceIssue).filter(models.MarketplaceIssue.id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    
    sub = db.query(models.Submission).filter(models.Submission.id == submission_id, models.Submission.issue_id == issue_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Submission not found")
        
    rating = rating_data.rating
    if rating < 1 or rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
        
    sub.rating = rating
    
    # Calculate score
    diff_weight = {"Easy": 1, "Medium": 2, "Hard": 3}.get(issue.difficulty, 1)
    points_earned = rating * diff_weight
    
    # Update Solver stats
    solver = db.query(models.User).filter(models.User.id == sub.solved_by_id).first()
    if solver:
        solver.score += points_earned
        
        # update rolling average rating
        current_total_rating = solver.avgRating * solver.totalSolved
        solver.totalSolved += 1
        solver.avgRating = (current_total_rating + rating) / solver.totalSolved
        
    # Close issue
    issue.status = "closed"
    
    db.commit()
    return {"message": "Success", "points_earned": points_earned}
