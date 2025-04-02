from laurier_connect1 import (
    create_user, get_user_by_username, get_user_by_id, update_user, delete_user_by_username, delete_user_by_id,
    remove_course_from_user, validate_user_login,
    create_project, get_project_by_id, update_project, delete_project, search_projects_by_keywords,
    create_project_request, update_request_status,
    send_invitation, update_invitation_status,
    store_recommendation, get_recommendations_for_user,
    create_resume, get_resume_by_user_id, update_resume, delete_resume
)
from datetime import datetime

user = {
        "user_id": 12345,
        "f_name": "Michael",
        "l_name": "Lin",
        "username": "Mike",
        "password": "LaurierConnect",
        "email": "linx0250@gmail.com",
        "last_updated": datetime.utcnow()
    }
updated_user = {
    "f_name": "Mikhail",
    "l_name": "Linin",
    "email": "lininm@gmail.com"
}

project = {
    "project_id": 54321,
    "title": "AI Research",
    "description": "Developing a new AI model",
    "owner_id": 12345,
    "keywords": ["AI", "Machine Learning"],
    "created_at": datetime.utcnow()
}

# Create the user

def test_create_user(user):
        created_id = create_user(user)
        return created_id

def test_delete_user(user_id):
        delete_count =  delete_user_by_id(user_id)
        if delete_count > 0:
                print("Successfully removed.")
        else:
                print("No users to remove.")
        return delete_count
def test_update_user(username):
        mod_count = update_user(username, updated_user)
        return mod_count

#def test_remove_course(username, course):
#        modified_count =

#all_users = find_all_in_collection("User")
#print(all_users)

#user = get_user_by_username("FletchLo")
#print(user)

#user_count = test_delete_user(12345)
#print(user_count)

#created_id = test_create_user(user)
#print(created_id)

#updated = test_update_user("Mike")
#print(updated)


from pymongo import MongoClient

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client['LaurierConnect']

def score(skill, keyword):
    """Computes the match score between a skill and a project keyword."""
    if skill.lower() == keyword.lower():
        return 1.0
    elif skill.lower() in keyword.lower():
        return 0.5
    else:
        return 0.0

def generate_recommendations(resumes, project, num_of_participants):
    """Generates user recommendations based on skill matching with a project."""
    all_recommendations = []

    for resume in resumes:
        total_score = 0.0
        user_id = resume.get("user_id")
        skills = resume.get("skill_id", [])  # Assuming skills are stored as IDs or keywords

        for skill in skills:
            for keyword in project.get("keywords", []):
                total_score += score(skill, keyword)

        recommendation = {
            "user_id": user_id,
            "score": total_score
        }
        all_recommendations.append(recommendation)

    # Sort recommendations by score in descending order
    all_recommendations.sort(key=lambda r: r["score"], reverse=True)

    # Return top recommendations
    return all_recommendations[:num_of_participants]

def get_recommendations_for_user(user_id):
    """Fetches stored recommendations for a given user from the database."""
    recommendations = list(db.Recommendations.find({"user_id": user_id}, {"_id": 0}))
    return recommendations
