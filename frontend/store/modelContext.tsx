import React, { createContext, useState, useContext } from "react";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useAuth } from "./context";

interface Product {
  id: number;
  Category: string;
  quantity: number;
}



interface ModelContextType {
  predictionResult: Product[] | null;
  isPredicting: boolean;
  error: string | null;
  predictFromImage: (imageUri: string) => Promise<void>;
  clearPrediction: () => void;
}

const BASE_URL = "http://192.168.1.4:8080/";

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [predictionResult, setPredictionResult] = useState<Product[] | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authUser } = useAuth();

  const predictFromImage = async (imageUri: string) => {
    if (!authUser) {
      Toast.show({
        text1: "Authentication required",
        text2: "Please login to use the prediction feature",
        type: "error",
      });
      return;
    }

    setIsPredicting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'prediction-image.jpg',
      } as any);

      const response = await axios.post<Product[]>(
        `${BASE_URL}/predict`,
        formData,
      );

      setPredictionResult(response.data);
      
      const labelCount = response.data.length;
      Toast.show({
        text1: "Prediction successful",
        text2: `Detected ${labelCount} different types of items`,
        type: "success",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to get prediction";
      setError(errorMessage);
      Toast.show({
        text1: "Prediction failed",
        text2: errorMessage,
        type: "error",
      });
    } finally {
      setIsPredicting(false);
    }
  };

  const clearPrediction = () => {
    setPredictionResult(null);
    setError(null);
  };

  return (
    <ModelContext.Provider
      value={{
        predictionResult,
        isPredicting,
        error,
        predictFromImage,
        clearPrediction,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
};
