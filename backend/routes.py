from bson import ObjectId
from flask import Flask, request, jsonify, url_for
from flask_cors import CORS
import os
from datetime import datetime
from db import (
    find_all_in_collection, create_user, get_user_by_username, get_user_by_id, update_user, delete_user_by_username, delete_user_by_id,
    create_project, get_project_by_id, update_project, delete_project, search_projects_by_keywords,
    create_resume, get_resume_by_user_id, update_resume, delete_resume,
    create_notification, get_notifications_by_user, delete_notification,
    create_profile, get_profile_by_user_id, update_profile, delete_profile, get_profile_by_id,
    create_project_request, update_request_status,
    send_invitation, update_invitation_status,
    store_recommendation, get_recommendations_for_user
)


app = Flask(__name__)
CORS(app)

@app.route('/', methods = ['GET'])
def server():
    return jsonify({'message': 'Hello LaurierConnect!'})


# USER ROUTES
@app.route('/users', methods=['GET'])
def getusers():
        myUsers = find_all_in_collection('User')
        return jsonify(myUsers)


@app.route('/create-user', methods=['POST'])
def createuser():
    try:
        # Parse form data
        user_data = request.form.to_dict()

        # Ensure required fields are present
        required_fields = ['f_name', 'l_name', 'username', 'password', 'email']
        for field in required_fields:
            if field not in user_data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Create the user in the database
        result = create_user(user_data)
        if isinstance(result, dict) and "error" in result:
            return jsonify(result), 400  # Return validation error
        elif result:
            return jsonify({"message": "User created successfully", "user_id": user_data['user_id']})
        else:
            return jsonify({"error": "Failed to create user"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
    
@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.form.get('username')
        password = request.form.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        user = get_user_by_username(username)
        if user and user['password'] == password:
            return jsonify({"user_id": user['user_id']})
        else:
            return jsonify({"error": "Invalid username or password"}), 401
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/get-user/<int:user_id>', methods=['GET'])
def getuserbyid(user_id):
    try:
        user = get_user_by_id(user_id)
        if user:
            return jsonify(user)
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/update-user/<int:user_id>', methods=['PUT'])
def updateuser(user_id):
    try:
        updated_data = request.form.to_dict()
        modified_count = update_user(user_id, updated_data)
        if modified_count > 0:
            return jsonify({"message": "User updated successfully"})
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/delete-user/<int:user_id>', methods=['DELETE'])
def deleteuserbyid(user_id):
    try:
        deleted_count = delete_user_by_id(user_id)
        if deleted_count > 0:
            return jsonify({"message": "User deleted successfully"})
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# PROJECT ROUTES
@app.route('/projects', methods=['GET'])
def getprojects():
    try:
        projects = find_all_in_collection('Projects')
        for project in projects:
            if '_id' in project:
                project['_id'] = str(project['_id'])
        return jsonify(projects)
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/create-project', methods=['POST'])
def createproject():
    try:
        # Parse form data
        project_data = request.form.to_dict()

        # Ensure required fields are present 
        required_fields = ['project_title', 'description', 'keywords', 'status']
        for field in required_fields:
            if field not in project_data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Predefined allowed status options
        allowed_statuses = ['open', 'closed', 'in progress']

        # Validate the status field
        if project_data['status'] not in allowed_statuses:
            return jsonify({"error": f"Invalid status. Allowed values are: {', '.join(allowed_statuses)}"}), 400

        # Retrieve the owner_id from the authenticated user (session)
        owner_id = session.get('user_id')
        if not owner_id:
            return jsonify({"error": "User not authenticated"}), 401

        # Convert keywords to an array if provided as a string
        if isinstance(project_data['keywords'], str):
            project_data['keywords'] = [keyword.strip() for keyword in project_data['keywords'].split(',')]

        # Convert members to an array of integers if provided as a string
        if 'members' in project_data and isinstance(project_data['members'], str):
            project_data['members'] = [int(member.strip()) for member in project_data['members'].split(',')]
        else:
            project_data['members'] = []  # Default to an empty array

        # Automatically add timestamps
        project_data['creation_date'] = datetime.now(timezone.utc)
        project_data['last_updated'] = datetime.now(timezone.utc)

        # Assign the owner_id to the project
        project_data['owner_id'] = owner_id

        # Create the project in the database
        project_id = create_project(project_data)  # Pass only project_data
        if project_id:
            return jsonify({"message": "Project created successfully", "project_id": project_id})
        else:
            return jsonify({"error": "Failed to create project"}), 500
    except ValueError as e:
        return jsonify({"error": f"Invalid data format: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/get-project/<int:project_id>', methods=['GET'])
def getprojectbyid(project_id):
    try:
        project = get_project_by_id(project_id)
        if project:
            return jsonify(project)
        else:
            return jsonify({"error": "Project not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/update-project/<int:project_id>', methods=['PUT'])
def updateproject(project_id):
    try:
        updated_data = request.form.to_dict()
        modified_count = update_project(project_id, updated_data)
        if modified_count > 0:
            return jsonify({"message": "Project updated successfully"})
        else:
            return jsonify({"error": "Project not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/delete-project/<int:project_id>', methods=['DELETE'])
def deleteproject(project_id):
    try:
        deleted_count = delete_project(project_id)
        if deleted_count > 0:
            return jsonify({"message": "Project deleted successfully"})
        else:
            return jsonify({"error": "Project not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/search-project-by-keywords', methods=['POST'])
def searchprojectsbykeywords():
    try:
        keywords = request.form.getlist('keywords')
        projects = search_projects_by_keywords(keywords)
        return jsonify(projects)
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/project-status-options', methods=['GET'])
def get_project_status_options():
    try:
        # Predefined allowed status options
        allowed_statuses = ['open', 'closed', 'in progress']
        return jsonify({"status_options": allowed_statuses})
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
@app.route('/add-member', methods=['POST'])
def add_member():
    try:
        project_id = int(request.form.get('project_id'))
        user_id = int(request.form.get('user_id'))

        # Validate project_id
        project = client['LaurierConnect'].Projects.find_one({"project_id": project_id})
        if not project:
            return jsonify({"error": f"Project with ID {project_id} not found."}), 404

        # Validate user_id
        user = client['LaurierConnect'].User.find_one({"user_id": user_id})
        if not user:
            return jsonify({"error": f"User with ID {user_id} not found."}), 404

        # Check if the current user is the project owner
        owner_id = session.get('user_id')
        if str(owner_id) != str(project['owner_id']):
            return jsonify({"error": "Only the project owner can add members."}), 403

        # Add the member to the project
        result = client['LaurierConnect'].Projects.update_one(
            {"project_id": project_id},
            {"$addToSet": {"members": user_id}}  # $addToSet ensures no duplicates
        )
        if result.modified_count > 0:
            return jsonify({"message": f"User {user_id} added to project {project_id} successfully."})
        else:
            return jsonify({"error": f"Failed to add user {user_id} to project {project_id}."}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/remove-member', methods=['POST'])
def remove_member():
    try:
        project_id = int(request.form.get('project_id'))
        user_id = int(request.form.get('user_id'))

        # Validate project_id
        project = client['LaurierConnect'].Projects.find_one({"project_id": project_id})
        if not project:
            return jsonify({"error": f"Project with ID {project_id} not found."}), 404

        # Check if the user is a member of the project
        if user_id not in project.get('members', []):
            return jsonify({"error": f"User {user_id} is not a member of project {project_id}."}), 400

        # Check if the current user is the project owner
        owner_id = session.get('user_id')
        if str(owner_id) != str(project['owner_id']):
            return jsonify({"error": "Only the project owner can remove members."}), 403

        # Remove the member from the project
        result = client['LaurierConnect'].Projects.update_one(
            {"project_id": project_id},
            {"$pull": {"members": user_id}}  # $pull removes the user_id from the array
        )
        if result.modified_count > 0:
            return jsonify({"message": f"User {user_id} removed from project {project_id} successfully."})
        else:
            return jsonify({"error": f"Failed to remove user {user_id} from project {project_id}."}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5001) 

