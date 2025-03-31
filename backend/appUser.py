from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from flask import Flask, render_template, request, redirect, url_for
from laurier_connect1 import find_all_in_collection, create_user
app = Flask(__name__)
CORS(app)

@app.route('/laurierconnect/userCreate')
def userCreation():
   return render_template('usercreation.html')

@app.route('/laurierconnect/createuser',methods = ['POST', 'GET'])
def createuser():
   if request.method == 'POST':
      print("------------------inside post-------------")
      user_data = request.form
      my_user_data = {
          "f_name" : user_data.get("f_name"),
          "l_name" : user_data.get("l_name"),
          "user_id": user_data.get("user_id"),
          "username": user_data.get("username"),
          "email": user_data.get("email"),
          "password": user_data.get("password")
      }
      print(my_user_data)
      create_user(my_user_data)
      print("---------------user created-----------------")
      return redirect(url_for('users'))

@app.route('/laurierconnect/users', methods=['GET'])
def users():
    # myUsers = []
    # myuser = {'f_name': 50, 'l_name': 60, 'user_id': 34, 'username': 'user1', 'email': "user1@gmail.com"}
    # myUsers.append(myuser)
    # myuser2 = {'f_name': "Michael", 'l_name': "Lin", 'user_id': 5, 'username': 'user2', 'email': "user2@gmail.com"}
    # myUsers.append(myuser2)

    myUsers = find_all_in_collection("User")
    return render_template('users.html', users = myUsers)

if __name__ == '__main__':
    app.run(debug=True, port=5000)