from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def server():
    return jsonify({'message': 'Hello World!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)