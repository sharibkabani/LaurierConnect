from flask import request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.security import generate_password_hash, check_password_hash

# MongoDB connection
uri = "mongodb://localhost:9999/LaurierConnect"
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
    user_id = int(user_id)
    user = users_collection.find_one({"user_id": user_id}, {"_id": 0})
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404


def create_user():
    # Check if the request has JSON content
    if request.is_json:
        data = request.get_json()
    else:
        data = request.form.to_dict()

    # Validate username
    if users_collection.find_one({"username": data.get("username")}):
        return jsonify({"error": "Username already exists"}), 400

    # Validate email
    if users_collection.find_one({"email": data.get("email")}):
        return jsonify({"error": "Email already exists"}), 400

    # Hash password if provided
    if "password" in data:
        data["password"] = generate_password_hash(data["password"])

    # Generate user_id
    data["user_id"] = get_next_sequence_value("user_id")
    if data["user_id"] is None:
        return jsonify({"error": "Failed to generate user ID"}), 500

    # Process skills array if it's a string
    if "skills" in data and isinstance(data["skills"], str):
        try:
            import json

            data["skills"] = json.loads(data["skills"])
        except:
            # If parsing fails, treat as a single skill in array
            data["skills"] = [data["skills"]]

    # Initialize empty arrays for projects
    data["projects_owned"] = []
    data["joined_projects"] = []

    # Insert into database
    users_collection.insert_one(data)

    return (
        jsonify({"message": "User created successfully", "user_id": data["user_id"]}),
        201,
    )

def login():
    # print(request.form)
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
    # Check if the request has JSON content
    if request.is_json:
        data = request.get_json()
    else:
        data = request.form.to_dict()

    # Validate owner_id
    if "owner_id" not in data:
        return jsonify({"error": "owner_id is required"}), 400

    try:
        # Convert owner_id to integer
        owner_id = int(data["owner_id"])
        data["owner_id"] = owner_id
    except ValueError:
        return jsonify({"error": "owner_id must be an integer"}), 400

    # Verify owner exists
    owner = users_collection.find_one({"user_id": owner_id})
    if not owner:
        return jsonify({"error": f"User with ID {owner_id} not found"}), 404

    # Generate project_id
    data["project_id"] = get_next_sequence_value("project_id")
    if data["project_id"] is None:
        return jsonify({"error": "Failed to generate project ID"}), 500

    # Add owner to members list
    data["members"] = [owner_id]

    # Initialize empty applications array
    data["applications"] = []

    # Process tags array if it's a string
    if "tags" in data and isinstance(data["tags"], str):
        try:
            import json

            data["tags"] = json.loads(data["tags"])
        except:
            # If parsing fails, treat as a single tag in array
            data["tags"] = [data["tags"]]

    # Insert project into database
    projects_collection.insert_one(data)
    project_id = data["project_id"]

    # Update owner's projects_owned field
    result = users_collection.update_one(
        {"user_id": owner_id}, {"$push": {"projects_owned": project_id}}
    )

    # If user doesn't have projects_owned array yet, create it
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
    # First, find the project to be deleted
    project = projects_collection.find_one({"project_id": project_id})
    if not project:
        return jsonify({"error": "Project not found"}), 404
    
    # Extract owner_id and members
    owner_id = project.get("owner_id")
    members = project.get("members", [])
    
    # Remove project from owner's projects_owned array
    if owner_id:
        users_collection.update_one(
            {"user_id": owner_id}, {"$pull": {"projects_owned": project_id}}
        )
    
    # Remove project from joined_projects array of all members
    if members:
        users_collection.update_many(
            {"user_id": {"$in": members}}, {"$pull": {"joined_projects": project_id}}
        )
    
    # Delete the project itself
    projects_collection.delete_one({"project_id": project_id})
    return jsonify({"message": "Project deleted successfully"}), 200


def apply_for_project():
    data = request.form.to_dict()
    if "user_id" not in data or "project_id" not in data:
        return jsonify({"error": "user_id and project_id are required"}), 400
    try:
        user_id = int(data["user_id"])
        project_id = int(data["project_id"])
    except ValueError:
        return jsonify({"error": "user_id and project_id must be integers"}), 400

    # Check if user exists
    user = users_collection.find_one({"user_id": user_id})
    if not user:
        return jsonify({"error": f"User with ID {user_id} not found"}), 404

    # Check if project exists
    project = projects_collection.find_one({"project_id": project_id})
    if not project:
        return jsonify({"error": f"Project with ID {project_id} not found"}), 404

    # Check if user has already applied
    if "applications" in project and user_id in project["applications"]:
        return jsonify({"error": "User has already applied for this project"}), 400

    # Add user to the applications array
    projects_collection.update_one(
        {"project_id": project_id}, {"$push": {"applications": user_id}}
    )
    return jsonify({"message": "Application submitted successfully"}), 200


def handle_application():
    data = request.form.to_dict()
    if "user_id" not in data or "project_id" not in data or "action" not in data:
        return jsonify({"error": "user_id, project_id, and action are required"}), 400
    try:
        user_id = int(data["user_id"])
        project_id = int(data["project_id"])
    except ValueError:
        return jsonify({"error": "user_id and project_id must be integers"}), 400

    action = data["action"].lower()

    # Check if user exists
    user = users_collection.find_one({"user_id": user_id})
    if not user:
        return jsonify({"error": f"User with ID {user_id} not found"}), 404

    # Check if project exists
    project = projects_collection.find_one({"project_id": project_id})
    if not project:
        return jsonify({"error": f"Project with ID {project_id} not found"}), 404

    # Check if user has applied
    if "applications" not in project or user_id not in project["applications"]:
        return jsonify({"error": "User has not applied for this project"}), 400

    if action == "accept":
        # Add user to the project's members array
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

        # Add project to the user's joined_projects array
        users_collection.update_one(
            {"user_id": user_id}, {"$push": {"joined_projects": project_id}}
        )

        # Remove user from the applications array
        projects_collection.update_one(
            {"project_id": project_id}, {"$pull": {"applications": user_id}}
        )
        return jsonify({"message": "Application accepted"}), 200

    elif action == "deny":
        # Remove user from the applications array
        projects_collection.update_one(
            {"project_id": project_id}, {"$pull": {"applications": user_id}}
        )
        return jsonify({"message": "Application denied"}), 200

    else:
        return jsonify({"error": "Invalid action. Use 'accept' or 'deny'"}), 400
