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


#user apis
@app.route('/users', methods=['GET'])
def getusers():
    myUsers = find_all_in_collection('User')
    return jsonify(myUsers)

@app.route('/create-user', methods=['POST'])
def createuser():
    user_data = request.form.to_dict()
    return jsonify(create_user(user_data))

@app.route('/get-user/<username>', methods=['GET'])
def getuserbyusername(username):
    return jsonify(get_user_by_username(username))

@app.route('/get-user/<user_id>', methods=['GET']) #not working
def getuserbyid(user_id):
    return jsonify(get_user_by_id(user_id))

@app.route('/update-user/<username>', methods=['PUT'])
def updateuser(username):
    updated_data = request.form
    return jsonify({"modified_count": update_user(username, updated_data)})

@app.route('/delete-user/<username>', methods=['DELETE'])
def deleteuserbyusername(username):
    return jsonify({"deleted_count": delete_user_by_username(username)})

@app.route('/delete-user/<user_id>', methods=['DELETE']) #not working
def deleteuserbyid(user_id):
    return jsonify({"deleted_count": delete_user_by_id(user_id)})

# PROJECT ROUTES
@app.route('/projects', methods=['GET'])
def getprojects():
    projects = find_all_in_collection('Projects')
    for project in projects:
        if '_id' in project:
            project['_id'] = str(project['_id'])

    return jsonify(projects)

@app.route('/create-project', methods=['POST'])
def createproject():
    try:
        project_data = request.form.to_dict()

        # check required fields
        if 'project_id' not in project_data or 'owner_id' not in project_data:
            return jsonify({"error": "Missing required fields: project_id or owner_id"}), 400

        #id's to integers
        project_data['project_id'] = int(project_data['project_id'])
        project_data['owner_id'] = int(project_data['owner_id'])

        #keywords to an array
        if 'keywords' in project_data:
            project_data['keywords'] = [keyword.strip() for keyword in project_data['keywords'].split(',')]

        # convert creation_date and last_updated to ISODate
        if 'creation_date' in project_data:
            project_data['creation_date'] = datetime.fromisoformat(project_data['creation_date'])
        if 'last_updated' in project_data:
            project_data['last_updated'] = datetime.fromisoformat(project_data['last_updated'])

        # members to an array of object ids
        if 'members' in project_data:
            project_data['members'] = [ObjectId(member.strip()) for member in project_data['members'].split(',')]


        return jsonify(create_project(project_data))
    except ValueError as e:
        return jsonify({"error": f"Invalid data format: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/get-project/<int:project_id>', methods=['GET'])
def getprojectbyid(project_id):
    project = get_project_by_id(project_id)
    if project:
        return jsonify(project)
    else:
        return jsonify({"error": "Project not found"}), 404

@app.route('/update-project/<int:project_id>', methods=['PUT'])
def updateproject(project_id):
    updated_data = request.form
    return jsonify({"modified_count": update_project(project_id, updated_data)})

@app.route('/delete-project/<int:project_id>', methods=['DELETE'])
def deleteproject(project_id):
    return jsonify({"deleted_count": delete_project(project_id)})

@app.route('/search-project-by-keywords', methods=['POST'])
def searchprojectsbykeywords():
    keywords = request.form.getlist('keywords')
    return jsonify(search_projects_by_keywords(keywords))

if __name__ == '__main__':
    app.run(debug=True, port=5000)

