from flask import Flask, request, jsonify
import os
from PIL import Image
import io
import torch
import pathlib
temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath


class WasteYOLOModel:
    def __init__(self, model_path="best.pt", yolo_repo_path="yolov5"):
        self.model = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Using device: {self.device}")

        try:
            abs_model_path = os.path.abspath(model_path)
            abs_yolo_repo_path = os.path.abspath(yolo_repo_path)

            print(f"Attempting to load YOLOv5 model using torch.hub from local repository.")
            print(f"Absolute Model Path: {abs_model_path}")
            print(f"Absolute YOLOv5 Repo Path: {abs_yolo_repo_path}")

            if not os.path.exists(abs_model_path):
                raise FileNotFoundError(f"Model file not found at: {abs_model_path}")
            if not os.path.isdir(abs_yolo_repo_path):
                raise FileNotFoundError(f"YOLOv5 repository directory not found at: {abs_yolo_repo_path}. "
                                        "Please ensure it's cloned and the path is correct.")

            self.model = torch.hub.load(
                repo_or_dir=abs_yolo_repo_path,
                model='custom',
                path=abs_model_path,
                force_reload=False,
                trust_repo=True,
                source='local'
            )
            self.model.to(self.device)
            self.model.eval()  # Set the model to evaluation mode
            print(
                f"Model {abs_model_path} loaded successfully using torch.hub from {abs_yolo_repo_path} on {self.device}.")

        except FileNotFoundError as fnf_error:
            print(f"File Not Found Error during model loading: {fnf_error}")
            self.model = None
        except Exception as e:
            print(f"Error loading model with torch.hub: {e}")
            print(
                "Ensure your local YOLOv5 repository path and model path are correct, and Git is accessible if required by hub internals, or that trust_repo=True helps.")
            self.model = None

    def predict(self, image_bytes):
        if not self.model:
            return [{"error": "Model not loaded properly. Check server logs."}]

        try:
            img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            results = self.model(img)
            detections = results.pandas().xyxy[0]

            label_count = {}
            for _, row in detections.iterrows():
                class_name = str(row['name']) if 'name' in row and row['name'] else str(
                    self.model.names[int(row['class'])])
                label_count[class_name] = label_count.get(class_name, 0) + 1

            response = []
            for idx, (category, count) in enumerate(label_count.items(), start=1):
                response.append({
                    "id": idx,
                    "Category": category,
                    "quantity": count
                })

            return response
        except Exception as e:
            print(f"Error during prediction: {e}")
            return [{"error": f"Prediction error: {str(e)}"}]


MODEL_PATH = os.environ.get("MODEL_PATH", "best.pt")
LOCAL_YOLO_REPO_PATH = "yolov5"
yolo_model = WasteYOLOModel(model_path=MODEL_PATH, yolo_repo_path=LOCAL_YOLO_REPO_PATH)


app = Flask(__name__)


@app.route('/')
def home():
    return "YOLO Waste Classification Server is running!"


@app.route('/predict', methods=['POST'])
def predict_route():
    if not yolo_model or not yolo_model.model:  # Check if model object or model attribute is None
        return jsonify({"error": "Model is not available or failed to load. Check server logs."}), 500

    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        try:
            img_bytes = file.read()
            predictions = yolo_model.predict(img_bytes)
            # print(predictions[0])
            if not predictions:  # Handles case where model runs but finds no objects
                return jsonify({"predictions": [], "message": "No objects detected"}), 200
            # if "error" in predictions[0] and len(predictions) == 1:  # Check if only an error was returned
            #     error_detail = predictions[0].get("error", "Unknown")
            #     return jsonify({"error": "Prediction failed",
            #                     "details": error_detail}), 500

            return jsonify(predictions), 200
        except Exception as e:
            app.logger.error(f"Error processing image in route: {e}")
            return jsonify({"error": "Error processing image", "details": str(e)}), 500

    return jsonify({"error": "Unknown error in predict route"}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
