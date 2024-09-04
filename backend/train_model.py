import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from keras.models import Sequential
from keras.layers import LSTM, Dense
from keras.models import save_model

# Load your data
data = pd.read_csv('user_data.csv')  # Replace with your actual file path
data.fillna(data.median(), inplace=True)
data['target'] = np.where(data['mouseX'] > 400, 1, 0)  # Dummy target

# Features and target
X = data[['mouseX', 'mouseY', 'timestamp']]
y = data['target']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize the features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# -------- Random Forest Model --------
# Train the Random Forest Classifier
rf_model = RandomForestClassifier(random_state=42)
rf_model.fit(X_train, y_train)

# Make predictions
y_pred_rf = rf_model.predict(X_test)

# Evaluate the Random Forest model
print("Random Forest Classification Report:\n", classification_report(y_test, y_pred_rf))
print("Random Forest Accuracy Score:", accuracy_score(y_test, y_pred_rf))

# Save the Random Forest model
import joblib
joblib.dump(rf_model, 'models/random_forest_model.pkl')  # Save the model
print("Random Forest model saved as random_forest_model.pkl")

# -------- LSTM Model --------
# Reshape the input to be [samples, time steps, features]
X_train_lstm = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))
X_test_lstm = X_test.reshape((X_test.shape[0], 1, X_test.shape[1]))

# Build the LSTM model
lstm_model = Sequential()
lstm_model.add(LSTM(50, activation='relu', input_shape=(X_train_lstm.shape[1], X_train_lstm.shape[2])))
lstm_model.add(Dense(1, activation='sigmoid'))

# Compile the model
lstm_model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train the LSTM model
lstm_model.fit(X_train_lstm, y_train, epochs=50, batch_size=10, verbose=1)

# Save the LSTM model
lstm_model.save('models/lstm_model.h5')  # Save the model in HDF5 format
print("LSTM model saved as lstm_model.h5")
