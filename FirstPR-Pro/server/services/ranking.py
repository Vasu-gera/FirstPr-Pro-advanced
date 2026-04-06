from datetime import datetime

def rank_issues(issues, skills):
    user_skills = set(skills.replace(',', ' ').lower().split())
    ranked_issues = []
    
    total_skills = max(len(user_skills), 1)
    title_match_weight = 40.0 / total_skills
    body_match_weight = 30.0 / total_skills
    
    for issue in issues:
        score = 0
        title = issue.get("title", "")
        title = title.lower() if title else ""
            
        body = issue.get("body", "")
        body = body.lower() if body else ""
            
        labels = issue.get("labels", [])
        
        for skill in user_skills:
            if skill in title:
                score += title_match_weight
            elif skill in body:
                score += body_match_weight
                
        # Label / Title 'good first issue'
        is_good_first = "good first issue" in title
        if not is_good_first:
            for label in labels:
                if isinstance(label, dict) and "good first issue" in str(label.get("name", "")).lower():
                    is_good_first = True
                    break
                elif isinstance(label, str) and "good first issue" in label.lower():
                    is_good_first = True
                    break
                
        if is_good_first:
            score += 10
            
        # Recency
        created_at_str = issue.get("created_at", "")
        if created_at_str:
            try:
                issue_date = datetime.strptime(created_at_str[:10], "%Y-%m-%d")
                delta_days = (datetime.now() - issue_date).days
                if delta_days <= 7:
                    score += 10
                elif delta_days <= 30:
                    score += 5
            except ValueError:
                pass
                
        # Comments
        comments = issue.get("comments", 0)
        if isinstance(comments, int):
            if comments == 0:
                score += 10
            elif comments < 5:
                score += 5
            
        issue_copy = issue.copy()
        # Ensure score is bound to 100 max
        issue_copy["score"] = min(round(score), 100)
        ranked_issues.append(issue_copy)
        
    ranked_issues.sort(key=lambda x: x.get("score", 0), reverse=True)
    return ranked_issues
