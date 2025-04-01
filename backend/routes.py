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
        user_data = request.form.to_dict()

        # check required fields
        if 'user_id' not in user_data:
            return jsonify({"error": "Missing required field: user_id"}), 400

        # convert user_id to an integer
        try:
            user_data['user_id'] = int(user_data['user_id'])
        except ValueError:
            return jsonify({"error": "Invalid user_id format. It must be an integer."}), 400

        # create the user in the database
        user_id = create_user(user_data)
        return jsonify({"message": "User created successfully", "user_id": user_id})
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/get-user/username/<username>', methods=['GET'])
def getuserbyusername(username):
    try:
        user = get_user_by_username(username)
        if user:
            return jsonify(user)
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/get-user/userid/<int:user_id>', methods=['GET'])
def getuserbyid(user_id):
    try:
        user = get_user_by_id(user_id)
        if user:
            return jsonify(user)
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/update-user/<username>', methods=['PUT'])
def updateuser(username):
    try:
        updated_data = request.form.to_dict()
        modified_count = update_user(username, updated_data)
        if modified_count > 0:
            return jsonify({"message": "User updated successfully"})
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/delete-user/username/<username>', methods=['DELETE'])
def deleteuserbyusername(username):
    try:
        deleted_count = delete_user_by_username(username)
        if deleted_count > 0:
            return jsonify({"message": "User deleted successfully"})
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/delete-user/userid/<int:user_id>', methods=['DELETE'])
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
        project_data = request.form.to_dict()

        # Check required fields
        if 'project_id' not in project_data or 'owner_id' not in project_data:
            return jsonify({"error": "Missing required fields: project_id or owner_id"}), 400

        # Convert IDs to integers
        try:
            project_data['project_id'] = int(project_data['project_id'])
            project_data['owner_id'] = int(project_data['owner_id'])
        except ValueError:
            return jsonify({"error": "Invalid ID format. IDs must be integers."}), 400

        # Convert keywords to an array
        if 'keywords' in project_data:
            project_data['keywords'] = [keyword.strip() for keyword in project_data['keywords'].split(',')]

        # Convert creation_date and last_updated to ISODate
        if 'creation_date' in project_data:
            project_data['creation_date'] = datetime.fromisoformat(project_data['creation_date'])
        if 'last_updated' in project_data:
            project_data['last_updated'] = datetime.fromisoformat(project_data['last_updated'])

        # Convert members to an array of ObjectId
        if 'members' in project_data:
            project_data['members'] = [ObjectId(member.strip()) for member in project_data['members'].split(',')]

        # Create the project in the database
        project_id = create_project(project_data)
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


if __name__ == '__main__':
    app.run(debug=True, port=5000)

