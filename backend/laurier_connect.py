from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://Fletch:LaurierConnect@laurierconnect.4nbgx.mongodb.net/?retryWrites=true&w=majority&appName=LaurierConnect"
client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# USER RELATED FUNCTIONS
def create_user(user):
    result = client['LaurierConnect'].users.insert_one(user)
    return str(result.inserted_id)  # Return the generated _id

def get_user_by_username(username):
    user = client['LaurierConnect'].User.find_one({"username": username}, {"_id": 0})  # Exclude the _id field
    return user

def get_user_by_id(user_id):
    from bson.objectid import ObjectId
    user = client['LaurierConnect'].users.find_one({"_id": ObjectId(user_id)})
    return user

def update_user(username, updated_data):
    result = client['LaurierConnect'].users.update_one(
        {"username": username},  # Filter by username
        {"$set": updated_data}   # Update fields
    )
    return result.modified_count  # Return the number of documents updated

def delete_user_by_username(username):
    result = client['LaurierConnect'].users.delete_one({"username": username})
    return result.deleted_count  # Return the number of documents deleted

def delete_user_by_id(user_id):
    from bson.objectid import ObjectId
    result = client['LaurierConnect'].users.delete_one({"_id": ObjectId(user_id)})
    return result.deleted_count

def remove_course_from_user(username, course):
    result = client['LaurierConnect'].users.update_one(
        {"username": username},
        {"$pull": {"profile.courses": course}}  # Remove the course
    )
    return result.modified_count

#check if user exists
def validate_user_login(username, password):
    user = client['LaurierConnect'].users.find_one({"username": username, "password": password}, {"_id": 0})
    return user is not None  


#PROJECT RELATED FUNCTIONS
def create_project(project):
    result = client['LaurierConnect'].projects.insert_one(project)
    return str(result.inserted_id)

def get_project_by_id(project_id):
    project = client['LaurierConnect'].projects.find_one({"project_id": project_id}, {"_id": 0})
    return project

def update_project(project_id, updated_data):
    result = client['LaurierConnect'].projects.update_one(
        {"project_id": project_id},
        {"$set": updated_data}
    )
    return result.modified_count

def delete_project(project_id):
    result = client['LaurierConnect'].projects.delete_one({"project_id": project_id})
    return result.deleted_count

def search_projects_by_keywords(keywords):
    projects = list(client['LaurierConnect'].projects.find(
        {"keywords": {"$in": keywords}},
        {"_id": 0}
    ))
    return projects



#REQUEST RELATED FUNCTIONS
def create_project_request(request):
    result = client['LaurierConnect'].requests.insert_one(request)
    return str(result.inserted_id)

def update_request_status(request_id, status):
    result = client['LaurierConnect'].requests.update_one(
        {"request_id": request_id},
        {"$set": {"status": status}}
    )
    return result.modified_count


#INVITATION RELATED FUNCTIONS
def send_invitation(invitation):
    result = client['LaurierConnect'].invitations.insert_one(invitation)
    return str(result.inserted_id)

def update_invitation_status(invitation_id, status):
    result = client['LaurierConnect'].invitations.update_one(
        {"invitation_id": invitation_id},
        {"$set": {"status": status}}
    )
    return result.modified_count




#RECCOMENDATION RELATED FUNCTIONS

def store_recommendation(recommendation):
    result = client['LaurierConnect'].recommendations.insert_one(recommendation)
    return str(result.inserted_id)

def get_recommendations_for_user(user_id):
    recommendations = list(client['LaurierConnect'].recommendations.find(
        {"user_id": user_id},
        {"_id": 0}
    ))
    return recommendations


#RESUME RELATED FUNCTIONS

def create_resume(resume):
    result = client['LaurierConnect'].resumes.insert_one(resume)
    return str(result.inserted_id)

def get_resume_by_user_id(user_id):
    resume = client['LaurierConnect'].resumes.find_one({"user_id": user_id}, {"_id": 0})
    return resume

def update_resume(resume_id, updated_data):
    result = client['LaurierConnect'].resumes.update_one(
        {"resume_id": resume_id},
        {"$set": updated_data}
    )
    return result.modified_count

def delete_resume(resume_id):
    result = client['LaurierConnect'].resumes.delete_one({"resume_id": resume_id})
    return result.deleted_count


def find_all_in_collection(collection_name, filter_query={}, projection={"_id": 0}):
    """
    Retrieve all documents from a specified collection

    Args:
        collection_name (str): Name of the collection to query
        filter_query (dict): Optional filter criteria (default empty dict returns all)
        projection (dict): Optional projection to include/exclude fields (default excludes _id)

    Returns:
        list: List of documents matching the query
    """
    try:
        collection = client['LaurierConnect'][collection_name]
        cursor = collection.find(filter_query, projection)
        return list(cursor)
    except Exception as e:
        print(f"Error accessing collection {collection_name}: {e}")
        return []