from flask import Flask, render_template, jsonify
from database import get_dashboard_data
import time

app = Flask(__name__)

@app.route('/')
def index():
    initial_data = get_dashboard_data()
    if initial_data is None:
        initial_data = {
            "error": "No se pudieron obtener los datos"
        }
    return render_template('index.html', initial_data=initial_data)

@app.route('/api/data')
def get_data():
    data = get_dashboard_data()
    if data is None:
        return jsonify({"error": "No se pudieron obtener los datos"}), 500
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)