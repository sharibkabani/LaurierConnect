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
def test_create_user(user):
    return create_user(user)

def test_get_user_by_username(username):
    return get_user_by_username(username)

def test_get_user_by_id(user_id):
    return get_user_by_id(user_id)

def test_update_user(username):
    return update_user(username, updated_user)

def test_delete_user_by_username(username):
    return delete_user_by_username(username)

def test_delete_user_by_id(user_id):
    return delete_user_by_id(user_id)

def test_remove_course(username, course):
    return remove_course_from_user(username, course)

def test_validate_user_login(username, password):
    return validate_user_login(username, password)

# Project Functions
def test_create_project(project):
    return create_project(project)

def test_get_project_by_id(project_id):
    return get_project_by_id(project_id)

def test_update_project(project_id, updates):
    return update_project(project_id, updates)

def test_delete_project(project_id):
    return delete_project(project_id)

def test_search_projects_by_keywords(keywords):
    return search_projects_by_keywords(keywords)

# Requests and Invitations
def test_create_project_request(request_data):
    return create_project_request(request_data)

def test_update_request_status(request_id, status):
    return update_request_status(request_id, status)



def test_send_invitation(invitation_data):
    return send_invitation(invitation_data)

def test_update_invitation_status(invite_id, status):
    return update_invitation_status(invite_id, status)

# Recommendations
def test_store_recommendation(recommendation_data):
    return store_recommendation(recommendation_data)

def test_get_recommendations_for_user(user_id):
    return get_recommendations_for_user(user_id)

# Resume Functions
def test_create_resume(resume_data):
    return create_resume(resume_data)

def test_get_resume_by_user_id(user_id):
    return get_resume_by_user_id(user_id)

def test_update_resume(user_id, updates):
    return update_resume(user_id, updates)

def test_delete_resume(user_id):
    return delete_resume(user_id)

def test_create_notification(notification):
    return create_notification(notification)

def test_get_notifications_by_user(user_id):
    return get_notifications_by_user(user_id)

def test_delete_notification(notification_id):
    return delete_notification(notification_id)

def test_create_profile():
    new_profile = {
        'profile_id': 2,
        'user_id': 2,
        'bio': "Business Administration student at Laurier",
        'skills': [1, 6, 7],
        'courses': ["BU111", "BU127", "EC120"]
    }
    profile_id = create_profile(new_profile)
    print(f"Created profile with ID: {profile_id}")
    return profile_id

def test_get_profile_by_user_id(user_id):
    print(f"\nFetching profile for user ID: {user_id}")
    profile = get_profile_by_user_id(user_id)
    if profile:
        print("Profile found:")
        print(profile)
    else:
        print("Profile not found")
    return profile

def test_update_profile(profile_id):
    print(f"\nUpdating profile with ID: {profile_id}")
    updates = {
        'bio': "Updated bio - now in third year",
        'skills': [1, 2, 3, 4, 6, 7, 8],
        'courses': ["BU111", "BU127", "EC120", "BU288"]
    }
    if update_profile(profile_id, updates):
        print("Profile updated successfully")
        # Show the updated profile
        return get_profile_by_id(profile_id)
    else:
        print("Failed to update profile")
        return None

def test_delete_profile(profile_id):
    print(f"\nDeleting profile with ID: {profile_id}")
    if delete_profile(profile_id):
        print("Profile deleted successfully")
    else:
        print("Failed to delete profile")

def test_get_profile_by_id(profile_id):
    print(f"\nFetching profile with ID: {profile_id}")
    profile = get_profile_by_id(profile_id)
    if profile:
        print("Profile found:")
        print(profile)
    else:
        print("Profile not found")
    return profile

def print_project_details(project):
    if project:
        print("\nProject Details:")
        print(f"ObjectID: {project['_id']}")
        print(f"Project ID: {project.get('project_id')}")
        print(f"Title: {project.get('project_title')}")
        print(f"Description: {project.get('description')}")
        print("Keywords:", ", ".join(project.get('keywords', [])))
    else:
        print("Project not found")

def test_get_project_details(project_id):
    print(f"\nLooking up project: {project_id}")
    print_project_details(get_project(project_id))

def test_get_user_skills(user_id: int):
    print(f"\nChecking skills for user {user_id}")
    resume = client['LaurierConnect'].Resumes.find_one({'user_id': user_id})
    if resume:
        skills = get_skills_by_ids(resume.get('skill_id', []))
        if skills:
            print("User Skills:")
            for skill in skills:
                print(f"- {skill.get('skill_name')} (ID: {skill.get('skill_id')})")
        else:
            print("No skills found for this user")
    else:
        print("No resume found for this user")

def test_generate_recommendations(project_id):
    print("\n=== Testing Recommendations ===")
    try:
        project = get_project(project_id)
        if not project:
            print(f"Project {project_id} not found")
            return []

        print_project_details(project)
        test_get_user_skills(1)  # Test with user_id 1

        recommendations = generate_recommendations(project_id, 3)
        print(f"\nGenerated {len(recommendations)} recommendations:")
        for i, rec in enumerate(recommendations, 1):
            print(f"{i}. User {rec['user_id']}: Score {rec['match_score']:.1f}")

        saved_ids = save_recommendations(recommendations)
        print(f"\nSaved recommendation IDs: {saved_ids}")
        return recommendations
    except Exception as e:
        print(f"Error: {str(e)}")
        return []
# Example Runs
if __name__ == "__main__":

    #created_id = test_create_user(user)
    #print("Created User ID:", created_id)

    #fetched_user = test_get_user_by_username("Mike")
    #print("Fetched User:", fetched_user)

    #updated_count = test_update_user("Mike")
    #print("Updated User Count:", updated_count)

    #deleted_count = test_delete_user_by_id(12345)
    #print("Deleted User Count:", deleted_count)

    # Test Project Functions
    #created_project_id = test_create_project(project)
    #print("Created Project ID:", created_project_id)

    #fetched_project = test_get_project_by_id(54321)
    #print("Fetched Project:", fetched_project)

    # Test Resume Functions
    #created_resume_id = test_create_resume(resume)
    #print("Created Resume ID:", created_resume_id)

    #fetched_resume = test_get_resume_by_user_id(12345)
    #print("Fetched Resume:", fetched_resume)

    #notification_id = test_create_notification(new_notification)
    #print(notification_id)

    #user_notifications = test_get_notifications_by_user(1)
    #print(user_notifications)

    #test_delete_notification(2)

    #new_id = test_create_profile()
    #test_get_profile_by_id(2)
    #test_get_profile_by_user_id(1)  # Using user_id from created profile

    # Update
    #test_update_profile(2)
    # Example usage with either format:
     #test_project = '67e5aa710c28aa121158f343'  # ObjectId string
    #test_project = 54321  # Numeric project_id

#test_get_project_details(test_project)
#test_get_user_skills(12345)
#test_generate_recommendations(test_project)


