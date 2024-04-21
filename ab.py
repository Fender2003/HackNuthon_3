import sqlite3

from flask import Flask, request, jsonify
import ollama
from flask_cors import CORS
import sqlite3
app = Flask(__name__)
CORS(app)
msg = []


def add_msg(content, role='user'):
    if role=='user':
        content+=". Give me SQL query for this and dont give any other text other than the SQL query. Don't give any \\n characters."
    x = {'role': role, 'content': content}
    print(content)
    print("123")
    msg.append(x)


def clear_msg():
    msg.clear()


def chat():
    return ollama.chat(model='mistral', messages=msg)


@app.route('/chat', methods=['POST'])
def handle_chat(i=0):
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()

    data = request.get_json()
    print(data)
    if 'content' not in data or 'role' not in data:
        return jsonify({"error": "content and role are required"}), 400

    content = data['content']
    role = data['role']

    add_msg(content, role)
    response = chat()
    # op = response[content]
    query = response['message']['content']
    role='assistant'
    add_msg(query,role)
    print(query)

    try:
        cursor.execute(query)

    # if query.startswith(' SELECT'):

        qry_result = cursor.fetchall()
        print(qry_result)


        final_result = {"query": response,
                        "qry_result": qry_result}

        print(response['message']['content'])
        response['message']['content'] = response['message']['content'].replace('\n', ' ')
        response['message']['content'] = response['message']['content'].replace("'''", ' ')
        response['message']['content'] = response['message']['content'].replace("", ' ')

    # clear_msg()
    except(Exception):
        if (i < 3):
            return handle_chat(i + 1)
        final_result = {"query": response,
                            "qry_result": None}

    return jsonify(final_result)


@app.route('/clear', methods=['POST'])
def clear():
    clear_msg()


@app.route('/schema_input', methods=['POST'])
def schema_input():
    data = request.get_json()
    print(data)
    if 'content' not in data or 'role' not in data:
        return jsonify({"error": "content and role are required"}), 400

    content = data['content']
    # content += " This is the schema for the database, and keep in mind the column names, and the table names for the questions. Dont add extra underscores in the column names. Use the exact column names and table name in the query which have been provided here in the schema"
    role = data['role']

    add_msg(content, role)

    return "kavya3"


if __name__ == '__main__':
    app.run(port=9000)
