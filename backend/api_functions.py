from flask import request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.security import generate_password_hash, check_password_hash

# MongoDB connection
uri = "mongodb+srv://Fletch:LaurierConnect@laurierconnect.4nbgx.mongodb.net/?retryWrites=true&w=majority&appName=LaurierConnect"
client = MongoClient(uri, server_api=ServerApi("1"))

# Test MongoDB connection
try:
    client.admin.command("ping")
    print("Connected to MongoDB!")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")

db = client["LaurierConnect"]  # Database name
users_collection = db["users"]
projects_collection = db["projects"]


def get_next_sequence_value(sequence_name):
    try:
        result = client["LaurierConnect"].Counters.find_one_and_update(
            {"_id": sequence_name},
            {"$inc": {"sequence_value": 1}},
            return_document=True,
            upsert=True,
        )
        return result["sequence_value"]
    except Exception as e:
        print(f"Error in get_next_sequence_value: {e}")
        return None


def get_users():
    users = list(users_collection.find({}, {"_id": 0}))
    return jsonify(users)


def get_user(user_id):
    user = users_collection.find_one({"user_id": user_id}, {"_id": 0})
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404


def create_user():
    data = request.form.to_dict()
    if users_collection.find_one({"username": data.get("username")}):
        return jsonify({"error": "Username already exists"}), 400
    if users_collection.find_one({"email": data.get("email")}):
        return jsonify({"error": "Email already exists"}), 400
    if "password" in data:
        data["password"] = generate_password_hash(data["password"])
    data["user_id"] = get_next_sequence_value("user_id")
    if data["user_id"] is None:
        return jsonify({"error": "Failed to generate user ID"}), 500
    users_collection.insert_one(data)
    return (
        jsonify({"message": "User created successfully", "user_id": data["user_id"]}),
        201,
    )


def login():
    username = request.form.get("username")
    password = request.form.get("password")
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    user = users_collection.find_one({"username": username})
    if user and check_password_hash(user.get("password", ""), password):
        return jsonify({"user_id": user["user_id"]})
    return jsonify({"error": "Invalid username or password"}), 401


def update_user(user_id):
    data = request.form.to_dict()
    result = users_collection.update_one({"user_id": user_id}, {"$set": data})
    if result.matched_count:
        return jsonify({"message": "User updated successfully"})
    return jsonify({"error": "User not found"}), 404


def delete_user(user_id):
    result = users_collection.delete_one({"user_id": user_id})
    if result.deleted_count:
        return jsonify({"message": "User deleted successfully"})
    return jsonify({"error": "User not found"}), 404


def get_user_projects(user_id):
    user = users_collection.find_one({"user_id": user_id}, {"_id": 0})
    if user:
        projects_owned = user.get("projects_owned", [])
        joined_projects = user.get("joined_projects", [])
        return jsonify(
            {"projects_owned": projects_owned, "joined_projects": joined_projects}
        )
    return jsonify({"error": "User not found"}), 404


def get_projects():
    projects = list(projects_collection.find({}, {"_id": 0}))
    return jsonify(projects)


def get_project(project_id):
    project = projects_collection.find_one({"project_id": project_id}, {"_id": 0})
    if project:
        return jsonify(project)
    return jsonify({"error": "Project not found"}), 404


def create_project():
    data = request.form.to_dict()
    if "owner_id" not in data:
        return jsonify({"error": "owner_id is required"}), 400
    try:
        owner_id = int(data["owner_id"])
        data["owner_id"] = owner_id
    except ValueError:
        return jsonify({"error": "owner_id must be an integer"}), 400
    owner = users_collection.find_one({"user_id": owner_id})
    if not owner:
        return jsonify({"error": f"User with ID {owner_id} not found"}), 404
    data["project_id"] = get_next_sequence_value("project_id")
    if data["project_id"] is None:
        return jsonify({"error": "Failed to generate project ID"}), 500
    data["members"] = [owner_id]
    projects_collection.insert_one(data)
    project_id = data["project_id"]
    result = users_collection.update_one(
        {"user_id": owner_id}, {"$push": {"projects_owned": project_id}}
    )
    if result.modified_count == 0:
        users_collection.update_one(
            {"user_id": owner_id}, {"$set": {"projects_owned": [project_id]}}
        )
    return (
        jsonify({"message": "Project created successfully", "project_id": project_id}),
        201,
    )


def join_project():
    data = request.form.to_dict()
    if "user_id" not in data or "project_id" not in data:
        return jsonify({"error": "user_id and project_id are required"}), 400
    try:
        user_id = int(data["user_id"])
        project_id = int(data["project_id"])
    except ValueError:
        return jsonify({"error": "user_id and project_id must be integers"}), 400
    user = users_collection.find_one({"user_id": user_id})
    if not user:
        return jsonify({"error": f"User with ID {user_id} not found"}), 404
    project = projects_collection.find_one({"project_id": project_id})
    if not project:
        return jsonify({"error": f"Project with ID {project_id} not found"}), 404
    if "members" in project and user_id in project["members"]:
        return jsonify({"error": "User is already a member of this project"}), 400
    if "members" in project and len(project["members"]) >= 4:
        return (
            jsonify({"error": "Project has reached maximum capacity of 4 members"}),
            400,
        )
    projects_collection.update_one(
        {"project_id": project_id}, {"$push": {"members": user_id}}
    )
    result_user = users_collection.update_one(
        {"user_id": user_id}, {"$push": {"joined_projects": project_id}}
    )
    if result_user.modified_count == 0:
        users_collection.update_one(
            {"user_id": user_id}, {"$set": {"joined_projects": [project_id]}}
        )
    return (
        jsonify(
            {
                "message": "Successfully joined the project",
                "user_id": user_id,
                "project_id": project_id,
            }
        ),
        200,
    )


def delete_project(project_id):
    project = projects_collection.find_one({"project_id": project_id})
    if not project:
        return jsonify({"error": "Project not found"}), 404
    owner_id = project.get("owner_id")
    members = project.get("members", [])
    if owner_id:
        users_collection.update_one(
            {"user_id": owner_id}, {"$pull": {"projects_owned": project_id}}
        )
    if members:
        users_collection.update_many(
            {"user_id": {"$in": members}}, {"$pull": {"joined_projects": project_id}}
        )
    projects_collection.delete_one({"project_id": project_id})
    return jsonify({"message": "Project deleted successfully"}), 200
