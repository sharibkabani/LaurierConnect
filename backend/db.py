from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from typing import Union, List, Dict
from bson.objectid import ObjectId
from bson.errors import InvalidId
from datetime import datetime
uri = "mongodb+srv://Fletch:LaurierConnect@laurierconnect.4nbgx.mongodb.net/?retryWrites=true&w=majority&appName=LaurierConnect"
client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# USER RELATED FUNCTIONS
# User Collection Shcema 
'''
 {
  "_id": "ObjectId",
  "user_id": "int",
  "f_name": "string",
  "l_name": "string",
  "username": "string",
  "password": "string",
  "email": "string",
  "last_updated": "ISODate"
} '
'''

def create_user(user):
    try:
        # Check if email already exists
        existing_email = client['LaurierConnect'].User.find_one({"email": user['email']})
        if existing_email:
            raise ValueError(f"Email '{user['email']}' is already in use.")

        # Check if username already exists
        existing_username = client['LaurierConnect'].User.find_one({"username": user['username']})
        if existing_username:
            raise ValueError(f"Username '{user['username']}' is already in use.")

        # Generate the next user_id
        user['user_id'] = get_next_sequence_value("user_id")
        if user['user_id'] is None:
            raise Exception("Failed to generate user_id")

        # Add timestamps
        user['creation_date'] = datetime.utcnow()
        user['last_updated'] = datetime.utcnow()

        # Insert the user into the database
        result = client['LaurierConnect'].User.insert_one(user)
        return str(result.inserted_id)  # Return the generated _id
    except ValueError as ve:
        print(f"Validation error in create_user: {ve}")
        return {"error": str(ve)}
    except Exception as e:
        print(f"Error in create_user: {e}")
        return None

def get_user_by_username(username):
    user = client['LaurierConnect'].User.find_one({"username": username}, {"_id": 0})  # exclude the _id field
    return user

def get_user_by_id(user_id):
    try:
        user = client['LaurierConnect'].User.find_one({"user_id": user_id}, {"_id": 0})  # exclude the _id field
        return user
    except ValueError:
        print(f"Invalid user_id: {user_id}. It must be an integer.")
        return None
    except Exception as e:
        print(f"Error in get_user_by_id: {e}")
        return None

def update_user(user_id, updated_data):
    result = client['LaurierConnect'].User.update_one(
        {"user_id": user_id},  # filter by username
        {"$set": updated_data}   # update fields
    )
    return result.modified_count  # return the number of documents updated

def delete_user_by_username(username):
    result = client['LaurierConnect'].User.delete_one({"username": username})
    return result.deleted_count  # return the number of documents deleted

def delete_user_by_id(user_id):
    from bson.objectid import ObjectId
    result = client['LaurierConnect'].User.delete_one({"user_id": user_id})
    return result.deleted_count

def remove_course_from_user(username, course):
    result = client['LaurierConnect'].User.update_one(
        {"username": username},
        {"$pull": {"profile.courses": course}}  # remove the course
    )
    return result.modified_count

#check if user exists
def validate_user_login(username, password):
    user = client['LaurierConnect'].User.find_one({"username": username, "password": password}, {"_id": 0})
    return user is not None


#PROJECT RELATED FUNCTIONS
# Projects Collection Schema
''''
'{
  "_id": "ObjectId",
  "project_id": "int",
  "owner_id": "int",
  "project_title": "string",
  "description": "string",
  "keywords": ["string"],
  "status": "string",
  "creation_date": "ISODate",
  "video_url": "string or null",
  "last_updated": "ISODate",
  "members" : [references objectid of users]
}'
'''

def create_project(project):
    try:
        # Validate that owner_id exists in the Users collection
        owner = client['LaurierConnect'].User.find_one({"user_id": project['owner_id']})
        if not owner:
            raise ValueError(f"Owner with user_id {project['owner_id']} does not exist.")

        # Add timestamps
        project['creation_date'] = datetime.utcnow()
        project['last_updated'] = datetime.utcnow()

        # Insert the project into the Projects collection
        result = client['LaurierConnect'].Projects.insert_one(project)
        return str(result.inserted_id)
    except Exception as e:
        print(f"Error in create_project: {e}")
        return None

def get_project_by_id(project_id):
    try:
        project_id = int(project_id)
        project = client['LaurierConnect'].Projects.find_one({"project_id": project_id})

        if project:
            if '_id' in project:
                project['_id'] = str(project['_id'])  # object id convert to string
            if 'members' in project and isinstance(project['members'], list):
                project['members'] = [str(member) for member in project['members']]  # object id in members to strings
        return project
    except ValueError:
        print(f"Invalid project_id: {project_id}")
        return None
    except Exception as e:
        print(f"Error in get_project_by_id: {e}")
        return None

def get_project(project_id: Union[str, int]):
    try:
        # find object id
        if isinstance(project_id, str) and len(project_id) == 24:
            try:
                return client['LaurierConnect'].Projects.find_one({'_id': ObjectId(project_id)})
            except InvalidId:
                pass

        # find project id
        return client['LaurierConnect'].Projects.find_one({'project_id': int(project_id)})
    except Exception:
        return None

def update_project(project_id, updated_data):
    result = client['LaurierConnect'].Projects.update_one(
        {"project_id": project_id},
        {"$set": updated_data}
    )
    return result.modified_count

def delete_project(project_id):
    result = client['LaurierConnect'].Projects.delete_one({"project_id": project_id})
    return result.deleted_count

def search_projects_by_keywords(keywords):
    try:
        # query to find matching keywords
        projects = client['LaurierConnect'].Projects.find({"keywords": {"$in": keywords}})
        result = []
        for project in projects:
            if '_id' in project:
                project['_id'] = str(project['_id'])

            # convert members array to strings
            if 'members' in project and isinstance(project['members'], list):
                project['members'] = [str(member) for member in project['members']]
            result.append(project)
        return result
    except Exception as e:
        return [] #if no matches, return here



#REQUEST RELATED FUNCTIONS
#Requests Collection Schema 
'''
{
  "_id": "ObjectId",
  "request_id": "int",
  "applicant_id": "int",
  "project_id": "int",
  "status": "string",
  "created_at": "ISODate"
}
'''

def create_project_request(request):
    result = client['LaurierConnect'].Requests.insert_one(request)
    return str(result.inserted_id)

def update_request_status(request_id, status):
    result = client['LaurierConnect'].Requests.update_one(
        {"request_id": request_id},
        {"$set": {"status": status}}
    )
    return result.modified_count


#INVITATION RELATED FUNCTIONS
#Invitations Collection Schema
'''
{
  "_id": "ObjectId",
  "invitation_id": "int",
  "sender_id": "int",
  "receiver_id": "int",
  "project_id": "int",
  "status": "string",
  "created_at": "ISODate"
}
'''
def send_invitation(invitation):
    result = client['LaurierConnect'].Invitations.insert_one(invitation)
    return str(result.inserted_id)

def update_invitation_status(invitation_id, status):
    result = client['LaurierConnect'].Invitations.update_one(
        {"invitation_id": invitation_id},
        {"$set": {"status": status}}
    )
    return result.modified_count




#RECCOMENDATION RELATED FUNCTIONS
#Reccomendations Collections Schema 
'''
{
  "_id": "ObjectId",
  "recommendation_id": "int",
  "user_id": "int",
  "project_id": "int",
  "match_score": "float",
  "created_at": "ISODate"
}
'''

def store_recommendation(recommendation):
    result = client['LaurierConnect'].Recommendations.insert_one(recommendation)
    return str(result.inserted_id)

def get_recommendations_for_user(user_id):
    recommendations = list(client['LaurierConnect'].Recommendations.find(
        {"user_id": user_id},
        {"_id": 0}
    ))
    return recommendations


def score_skill_match(skill_name: str, keyword: str) -> float:
    skill_lower = skill_name.lower()
    keyword_lower = keyword.lower()
    return 1.0 if skill_lower == keyword_lower else 0.5 if skill_lower in keyword_lower or keyword_lower in skill_lower else 0.0


def get_skills_by_ids(skill_ids: List[int]) -> List[Dict]:
    return list(client['LaurierConnect'].Skills.find({'skill_id': {'$in': skill_ids}}))


def generate_recommendations(project_id: Union[str, int], num_participants: int) -> List[Dict]:
    project = get_project(project_id)
    if not project:
        raise ValueError(f"Project {project_id} not found")

    recommendations = []
    for resume in client['LaurierConnect'].Resumes.find():
        skills = get_skills_by_ids(resume.get('skill_id', []))
        total_score = sum(
            score_skill_match(skill.get('skill_name', ''), keyword)
            for skill in skills
            for keyword in project.get('keywords', [])
        )
        recommendations.append({
            'user_id': resume['user_id'],
            'project_id': str(project['_id']),
            'match_score': total_score,
            'created_at': datetime.utcnow()
        })

    return sorted(recommendations, key=lambda x: x['match_score'], reverse=True)[:num_participants]


def save_recommendations(recommendations: List[Dict]) -> List[str]:
    if not recommendations:
        return []
    result = client['LaurierConnect'].Recommendations.insert_many(recommendations)
    return [str(id) for id in result.inserted_ids]


#RESUME RELATED FUNCTIONS
#Resumes Collections Schema 
''''
{
  "_id": "ObjectId",
  "resume_id": "int",
  "user_id": "int",
  "summary": "string",
  "skill_id": ["int"],
  "last_updated": "ISODate"
}
'''

def create_resume(resume):
    result = client['LaurierConnect'].Resumes.insert_one(resume)
    return str(result.inserted_id)

def get_resume_by_user_id(user_id):
    resume = client['LaurierConnect'].Resumes.find_one({"user_id": user_id}, {"_id": 0})
    return resume

def update_resume(resume_id, updated_data):
    result = client['LaurierConnect'].Resumes.update_one(
        {"resume_id": resume_id},
        {"$set": updated_data}
    )
    return result.modified_count

def delete_resume(resume_id):
    result = client['LaurierConnect'].Resumes.delete_one({"resume_id": resume_id})
    return result.deleted_count

# NOTIFICATION functions

def create_notification(notification):
    notification['created_at'] = datetime.utcnow()
    result = client['LaurierConnect'].Notifications.insert_one(notification)
    return str(result.inserted_id)

#def get_notifications_by_user(user_id):
#    return list(client['LaurierConnect'].Notifications.find({'user_id': user_id}))

def get_notifications_by_user(user_id):
    try:
        # Convert user_id to int if it's stored as integer in MongoDB
        user_id = int(user_id)
        notifications = list(client['LaurierConnect'].Notifications.find({'user_id': user_id}))

        # Convert ObjectId to string for JSON serialization
        for notification in notifications:
            notification['_id'] = str(notification['_id'])

        return notifications
    except ValueError:
        print(f"Error: user_id must be a number. Received: {user_id}")
        return []
    except Exception as e:
        print(f"Error fetching notifications: {str(e)}")
        return []

def delete_notification(notification_id):
    result = client['LaurierConnect'].Notifications.delete_one({'notification_id': notification_id})
    return result.deleted_count > 0

def find_all_in_collection(collection_name, filter_query={}, projection={}):
    try:
        collection = client['LaurierConnect'][collection_name]
        cursor = collection.find(filter_query, projection)
        result = []
        for doc in cursor:
            # Convert _id to string
            if '_id' in doc:
                doc['_id'] = str(doc['_id'])
            # Convert members array to string if it exists
            if 'members' in doc and isinstance(doc['members'], list):
                doc['members'] = [str(member) for member in doc['members']]
            result.append(doc)
        return result
    except Exception as e:
        print(f"Error accessing collection {collection_name}: {e}")
        return []

def create_profile(profile_data):
    profile_data['last_updated'] = datetime.utcnow()
    result = client['LaurierConnect'].Profiles.insert_one(profile_data)
    return str(result.inserted_id)

def get_profile_by_user_id(user_id):
    profile = client['LaurierConnect'].Profiles.find_one({'user_id': user_id})
    if profile:
        profile['_id'] = str(profile['_id'])
    return profile

def update_profile(profile_id, update_data):
    update_data['last_updated'] = datetime.utcnow()
    result = client['LaurierConnect'].Profiles.update_one(
        {'profile_id': profile_id},
        {'$set': update_data}
    )
    return result.modified_count > 0

def delete_profile(profile_id):
    result = client['LaurierConnect'].Profiles.delete_one({'profile_id': profile_id})
    return result.deleted_count > 0

def get_profile_by_id(profile_id):
    try:
        profile = client['LaurierConnect'].Profiles.find_one({'profile_id': profile_id})
        if profile:
            profile['_id'] = str(profile['_id'])
        return profile
    except:
        return None

def get_next_sequence_value(sequence_name):
    try:
        # Increment the sequence value and return the new value
        result = client['LaurierConnect'].Counters.find_one_and_update(
            {"_id": sequence_name},
            {"$inc": {"sequence_value": 1}},
            return_document=True,
            upsert=True  # Create the counter if it doesn't exist
        )
        return result['sequence_value']
    except Exception as e:
        print(f"Error in get_next_sequence_value: {e}")
        return None
