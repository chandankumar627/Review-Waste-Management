from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import random
from model.waste_classifier import predict_waste_category

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'message': 'AI Service is running'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        if 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image']
        
        # Call AI model (mock implementation)
        category, confidence = predict_waste_category(image_data)
        
        return jsonify({
            'category': category,
            'confidence': round(confidence, 2)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print('AI Service starting on port 5001...')
    app.run(host='0.0.0.0', port=5001, debug=True)
