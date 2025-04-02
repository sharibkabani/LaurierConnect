from laurier_connect1 import (
    create_user, get_user_by_username, get_user_by_id, update_user, delete_user_by_username, delete_user_by_id,
    remove_course_from_user, validate_user_login,
    create_project, get_project_by_id, update_project, delete_project, search_projects_by_keywords,
    create_project_request, update_request_status,
    send_invitation, update_invitation_status,
    store_recommendation, get_recommendations_for_user,
    create_resume, get_resume_by_user_id, update_resume, delete_resume
)

def test_user_functions():
    print("Testing User Functions...")
    
    # Create a user
    user = {
        "user_id": 3,
        "f_name": "Test",
        "l_name": "User",
        "username": "test_user",
        "password": "test_password",
        "email": "test_user@example.com",
        "profile": {"courses": ["CP101", "CP102"]},
        "last_updated": "2025-03-24T00:00:00.000+00:00"
    }
    user_id = create_user(user)
    print(f"User created with ID: {user_id}")
    
    user_data = get_user_by_username("test_user")
    print(f"User fetched by username: {user_data}")

    updated_count = update_user("test_user", {"email": "updated_user@example.com"})
    print(f"Number of users updated: {updated_count}")
  
    is_valid = validate_user_login("test_user", "test_password")
    print(f"User login valid: {is_valid}")
    
    modified_count = remove_course_from_user("test_user", "CP101")
    print(f"Number of courses removed: {modified_count}")

    
if __name__ == "__main__":
    test_user_functions()
    
