from flask import Flask, render_template, request, redirect, url_for
from laurier_connect1 import create_user, find_all_in_collection
app = Flask(__name__)

@app.route('/laurierconnect/userCreate')
def userCreation():
   return render_template('usercreation.html')

@app.route('/laurierconnect/createuser',methods = ['POST', 'GET'])
def createuser():
   if request.method == 'POST':
      user_data = request.form
      create_user(user_data)
      return render_template(redirect(url_for('users')))


# @app.route('/laurierconnect/users', methods=['GET'])
# def users():
#     # myUsers = []
#     # myuser = {'f_name': 50, 'l_name': 60, 'user_id': 34, 'username': 'user1', 'email': "user1@gmail.com"}
#     # myUsers.append(myuser)
#     # myuser2 = {'f_name': "Michael", 'l_name': "Lin", 'user_id': 5, 'username': 'user2', 'email': "user2@gmail.com"}
#     # myUsers.append(myuser2)
#
#     myUsers = find_all_in_collection("User")
#     return render_template('users.html', users=myUsers)