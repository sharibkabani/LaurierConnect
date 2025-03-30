from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/laurierconnect', methods=['GET'])
def server():
    return jsonify({'message': 'Hello LaurierConnect!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)