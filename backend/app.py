from flask import Flask, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from api_functions import (
    get_users,
    get_user,
    create_user,
    login,
    update_user,
    delete_user,
    get_user_projects,
    get_projects,
    get_project,
    create_project,
    join_project,
    delete_project,
    apply_for_project,
    handle_application,
)

app = Flask(__name__)
CORS(app)

# User Routes
app.add_url_rule("/users", "get_users", get_users, methods=["GET"])
app.add_url_rule("/users/<int:user_id>", "get_user", get_user, methods=["GET"])
app.add_url_rule("/register", "create_user", create_user, methods=["POST"])
app.add_url_rule("/login", "login", login, methods=["POST"])
app.add_url_rule("/users/<int:user_id>", "update_user", update_user, methods=["PUT"])
app.add_url_rule("/users/<int:user_id>", "delete_user", delete_user, methods=["DELETE"])
app.add_url_rule(
    "/users/<int:user_id>/projects",
    "get_user_projects",
    get_user_projects,
    methods=["GET"],
)

# Project Routes
app.add_url_rule("/projects", "get_projects", get_projects, methods=["GET"])
app.add_url_rule(
    "/projects/<int:project_id>", "get_project", get_project, methods=["GET"]
)
app.add_url_rule("/create-project", "create_project", create_project, methods=["POST"])
app.add_url_rule("/join-project", "join_project", join_project, methods=["POST"])
app.add_url_rule(
    "/projects/<int:project_id>", "delete_project", delete_project, methods=["DELETE"]
)

# Application Routes
app.add_url_rule(
    "/apply-project", "apply_for_project", apply_for_project, methods=["POST"]
)
app.add_url_rule(
    "/handle-application", "handle_application", handle_application, methods=["POST"]
)

@app.route("/", methods=["GET"])
def server():
    return jsonify({"message": "Hello LaurierConnect!"})


if __name__ == "__main__":
    app.run(debug=True, port=5001)
