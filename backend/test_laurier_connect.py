from datetime import datetime
from laurier_connect1 import (
    create_user, get_user_by_username, get_user_by_id, update_user, delete_user_by_username, delete_user_by_id,
    remove_course_from_user, validate_user_login,
    create_project, get_project_by_id, update_project, delete_project, search_projects_by_keywords,
    create_project_request, update_request_status,
    send_invitation, update_invitation_status,
    store_recommendation, get_recommendations_for_user,
    create_resume, get_resume_by_user_id, update_resume, delete_resume, create_notification, get_notifications_by_user,
    delete_notification, create_profile, update_profile, delete_profile, get_profile_by_user_id, get_profile_by_id,
    score_skill_match, get_skills_by_ids, generate_recommendations, save_recommendations, get_project
)
from pprint import pprint
from bson import ObjectId
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://Fletch:LaurierConnect@laurierconnect.4nbgx.mongodb.net/?retryWrites=true&w=majority&appName=LaurierConnect"
client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)
db = client['LaurierConnect']
# Sample Data
user = {
    "user_id": 1986,
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
    "owner_id": 12345,
    "project_title": "AI Research",
    "description": "Developing a new AI model",
    "keywords": ["AI", "Machine Learning", "Python"],
    "status": "open",
    "creation_date": datetime.utcnow(),
    "video_url": "",
    "last_updated": datetime.utcnow()
}

resume = {
    "resume_id": 2,
    "user_id": 12345,
    "summary": "Computer Science (Big Data Stream) student specializing in data mining and Database Management. ",
    "skill_id": [1,2,3,6,7,8],
    "last_updated": datetime.utcnow()
}

new_notification = {
    'notification_id': 2,
    'user_id': 1,
    'message': "You have received an invitation to join the project 'E-commerce Website'.",
    'type': 'invitation'
}

# User Functions
def test_create_user():
    user_id =  create_user(user)
    print("new user_id: "+ str(user_id))
    assert (user_id is not None)

# User Functions
def test_get_user_by_username():
    username = "test_user"
    result = get_user_by_username(username)
    assert result is not None, f"User with username {username} should exist"

def test_get_user_by_id():
    user_id = 1
    result = get_user_by_id(user_id)
    assert result is not None, f"User with ID {user_id} should exist"

def test_update_user():
    username = "test_user"
    updated_user = {"name": "Updated Name"}
    result = update_user(username, updated_user)
    assert result is True, f"User {username} should be updated successfully"

def test_delete_user_by_username():
    username = "test_user"
    result = delete_user_by_username(username)
    assert result is True, f"User {username} should be deleted successfully"

def test_delete_user_by_id():
    user_id = 1
    result = delete_user_by_id(user_id)
    assert result is True, f"User with ID {user_id} should be deleted successfully"

def test_remove_course():
    username = "test_user"
    course = "CS101"
    result = remove_course_from_user(username, course)
    assert result is True, f"Course {course} should be removed for {username}"

def test_validate_user_login():
    username = "test_user"
    password = "test_pass"
    result = validate_user_login(username, password)
    assert result is True, f"Login for {username} should be valid"

# Project Functions
def test_create_project():
    project = {"title": "Test Project"}
    result = create_project(project)
    assert result is not None, "Project should be created with a valid ID"

def test_get_project_by_id():
    project_id = 1
    result = get_project_by_id(project_id)
    assert result is not None, f"Project with ID {project_id} should exist"

def test_update_project():
    project_id = 1
    updates = {"title": "Updated Project"}
    result = update_project(project_id, updates)
    assert result is True, f"Project {project_id} should be updated successfully"

def test_delete_project():
    project_id = 1
    result = delete_project(project_id)
    assert result is True, f"Project {project_id} should be deleted successfully"

def test_search_projects_by_keywords():
    keywords = ["test", "project"]
    result = search_projects_by_keywords(keywords)
    assert isinstance(result, list), "Search should return a list of projects"
    assert len(result) > 0, "Search should return at least one project"

# Requests and Invitations
def test_create_project_request():
    request_data = {"project_id": 1, "user_id": 1}
    result = create_project_request(request_data)
    assert result is not None, "Project request should be created with a valid ID"

def test_update_request_status():
    request_id = 1
    status = "approved"
    result = update_request_status(request_id, status)
    assert result is True, f"Request {request_id} status should be updated to {status}"

def test_send_invitation():
    invitation_data = {"user_id": 1, "project_id": 1}
    result = send_invitation(invitation_data)
    assert result is not None, "Invitation should be sent with a valid ID"

def test_update_invitation_status():
    invite_id = 1
    status = "accepted"
    result = update_invitation_status(invite_id, status)
    assert result is True, f"Invitation {invite_id} status should be updated to {status}"

# Recommendations
def test_store_recommendation():
    recommendation_data = {"user_id": 1, "project_id": 1, "match_score": 0.9}
    result = store_recommendation(recommendation_data)
    assert result is not None, "Recommendation should be stored with a valid ID"

def test_get_recommendations_for_user():
    user_id = 1
    result = get_recommendations_for_user(user_id)
    assert isinstance(result, list), "Recommendations should be returned as a list"
    assert len(result) > 0, f"User {user_id} should have recommendations"

# Resume Functions
def test_create_resume():
    resume_data = {"user_id": 1, "skills": [1, 2]}
    result = create_resume(resume_data)
    assert result is not None, "Resume should be created with a valid ID"

def test_get_resume_by_user_id():
    user_id = 1
    result = get_resume_by_user_id(user_id)
    assert result is not None, f"Resume for user {user_id} should exist"

def test_update_resume():
    user_id = 1
    updates = {"skills": [1, 2, 3]}
    result = update_resume(user_id, updates)
    assert result is True, f"Resume for user {user_id} should be updated successfully"

def test_delete_resume():
    user_id = 1
    result = delete_resume(user_id)
    assert result is True, f"Resume for user {user_id} should be deleted successfully"

def test_create_notification():
    notification = {"user_id": 1, "message": "Test notification"}
    result = create_notification(notification)
    assert result is not None, "Notification should be created with a valid ID"

def test_get_notifications_by_user():
    user_id = 1
    result = get_notifications_by_user(user_id)
    assert isinstance(result, list), "Notifications should be returned as a list"
    assert len(result) > 0, f"User {user_id} should have notifications"

def test_delete_notification():
    notification_id = 1
    result = delete_notification(notification_id)
    assert result is True, f"Notification {notification_id} should be deleted successfully"

# Profile Functions
def test_create_profile():
    new_profile = {
        "profile_id": 2,
        "user_id": 2,
        "bio": "Business Administration student at Laurier",
        "skills": [1, 6, 7],
        "courses": ["BU111", "BU127", "EC120"]
    }
    profile_id = create_profile(new_profile)
    assert profile_id is not None, "Profile should be created with a valid ID"

def test_get_profile_by_user_id():
    user_id = 2
    profile = get_profile_by_user_id(user_id)
    assert profile is not None, f"Profile for user {user_id} should exist"

def test_update_profile():
    profile_id = 2
    updates = {
        "bio": "Updated bio - now in third year",
        "skills": [1, 2, 3, 4, 6, 7, 8],
        "courses": ["BU111", "BU127", "EC120", "BU288"]
    }
    result = update_profile(profile_id, updates)
    assert result is True, f"Profile {profile_id} should be updated successfully"

def test_delete_profile():
    profile_id = 2
    result = delete_profile(profile_id)
    assert result is True, f"Profile {profile_id} should be deleted successfully"

def test_get_profile_by_id():
    profile_id = 2
    profile = get_profile_by_id(profile_id)
    assert profile is not None, f"Profile with ID {profile_id} should exist"

# Note: Skipping print_project_details as it’s a helper function, not a test

def test_get_project_details():
    project_id = 1
    project = get_project(project_id)
    assert project is not None, f"Project {project_id} should exist"

def test_get_user_skills():
    user_id = 1
    resume = client['LaurierConnect'].Resumes.find_one({'user_id': user_id})
    assert resume is not None, f"Resume for user {user_id} should exist"
    skills = get_skills_by_ids(resume.get('skill_id', []))
    assert isinstance(skills, list), "Skills should be returned as a list"

def test_generate_recommendations():
    project_id = 1
    project = get_project(project_id)
    assert project is not None, f"Project {project_id} should exist"
    recommendations = generate_recommendations(project_id, 3)
    assert isinstance(recommendations, list), "Recommendations should be a list"
    assert len(recommendations) <= 3, "Should generate up to 3 recommendations"




