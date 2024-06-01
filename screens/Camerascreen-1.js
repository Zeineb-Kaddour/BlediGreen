import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useCameraPermission, useCameraDevice, Camera } from "react-native-vision-camera";
import { useTensorflowModel, useResizePlugin } from 'react-native-fast-tflite';
import { loadTensorflowModel } from '../components/load_tensorflow_model';

const CameraScreen1 = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');
  const [isActive, setIsActive] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await loadTensorflowModel();
      setModel(loadedModel);
    };
    loadModel();
  }, []);


  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const onTakePicturePressed = async () => {
    const capturedPhoto = await cameraRef.current?.takePhoto();
    setPhoto(capturedPhoto);

    if (model && capturedPhoto) {
      // Resize plugin
      const { resize } = useResizePlugin();

      // Resize and preprocess the captured photo
      const data = resize(capturedPhoto, {
        scale: {
          width: 416,
          height: 416,
        },
        pixelFormat: 'rgb',
        dataType: 'uint8'
      });

      // Run inference on the preprocessed photo
      const output = model.runSync([data]);
      const numDetections = output[0];
      console.log(`Detected ${numDetections} objects!`);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive && !photo}
        photo={true}
      />

      {photo ? (
        <>
          <Image source={{ uri: photo.path }} style={StyleSheet.absoluteFill} />
          <Pressable onPress={() => setPhoto(null)} style={{ position: 'absolute', top: 50, left: 30 }}>
            <Text style={{ color: 'white' }}>Retake</Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={onTakePicturePressed} style={{ position: 'absolute', alignSelf: 'center', bottom: 10 }}>
          <View style={{ width: 75, height: 65, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../assets/images/camera.png')}
              style={{ width: 70, height: 70, marginBottom: 135 }}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default CameraScreen1;
