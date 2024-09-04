from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import os
import joblib  # For loading the Random Forest model
from keras.models import load_model  # For loading the LSTM model

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Define the file path for storing user data
file_path = 'user_data.csv'

# Load your models
rf_model = joblib.load('models/random_forest_model.pkl')  # Load the Random Forest model
lstm_model = load_model('models/lstm_model.h5')  # Load the LSTM model

@app.route('/api/collect-data', methods=['POST'])
def collect_data():
    data = request.json
    print("Received data:", data)  # Log the incoming data to the console

    # Check if the data contains required fields
    required_fields = ['mouseX', 'mouseY', 'timestamp']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400  # Return error if a field is missing

    # Create a DataFrame from the incoming data
    df = pd.DataFrame([data])

    # Append data to the CSV file if it already exists
    if os.path.isfile(file_path):
        df.to_csv(file_path, mode='a', header=False, index=False)
        print(f"Appended data to {file_path}")
    else:
        df.to_csv(file_path, mode='w', header=True, index=False)
        print(f"Created new file and wrote data to {file_path}")

    # Prepare features for prediction (only mouse data)
    features = np.array([[data['mouseX'], data['mouseY'], data['timestamp']]])

    # Predict using the Random Forest model
    rf_prediction = rf_model.predict(features)

    # Reshape features for LSTM model (if required, based on your LSTM input shape)
    lstm_features = features.reshape((features.shape[0], 1, features.shape[1]))  # Example reshaping
    lstm_prediction = lstm_model.predict(lstm_features)

    # Assume lstm_prediction returns probabilities; convert to class labels if necessary
    lstm_class = np.argmax(lstm_prediction, axis=1)

    return jsonify({
        "rf_prediction": int(rf_prediction[0]),  # Convert to int if classification
        "lstm_prediction": int(lstm_class[0])  # Convert to int if classification
    })

if __name__ == '__main__':
    app.run(debug=True)
