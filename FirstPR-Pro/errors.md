# 🧪 Testing Report (Initial Findings) — FirstPR Pro

## 👤 Role

Security & Testing Team Member

---

## 🔴 Problem 1: Match Score Not Working Properly

### Issue:
The match score does not accurately reflect the relevance between user skills and GitHub issues. Many unrelated issues receive similar scores.

### Impact:
- Poor recommendation accuracy
- Users cannot trust ranking

### Cause:
- Weak keyword matching logic
- No weighting based on number of matched skills

### Suggested Fix:
- Implement weighted scoring system
- Match skills against both title and description
- Normalize score between 0–100%
