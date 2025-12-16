import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Bird from './src/components/Bird';
import { useEffect, useState } from 'react';
import Obstacles from './src/components/Obstacle';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth / 2 + 30);
  
  const [obstacleNegHeight, setObstacleNegHeight] = useState(0);
  const [obstacleNegHeightTwo, setObstacleNegHeightTwo] = useState(0);
  let obstacleHeight = 300;
  let obstacleWidht = 60;
  let gap = 200;

  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const gravity = 3;

  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstacleNegHeight(-Math.random() * 100);
    }
  }, [obstaclesLeft]);

  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerIdTwo);
      };
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstacleNegHeightTwo(-Math.random() * 100);
    }
  });

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
    }
    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom]);

  return (
    <View style={styles.container}>
      <Bird birdBottom={birdBottom} birdLeft={birdLeft} color="blue" />

      <Obstacles 
        color= {'green'}
        obstacleWidht = {obstacleWidht}
        obstacleHeight = {obstacleHeight}
        randomBottom = {obstacleNegHeight}
        gap = {gap}
        obstaclesLeft = {obstaclesLeft}
      />

      <Obstacles 
        color= {'yellow'}
        obstacleWidht = {obstacleWidht}
        obstacleHeight = {obstacleHeight}
        randomBottom = {obstacleNegHeightTwo}
        gap = {gap}
        obstaclesLeft = {obstaclesLeftTwo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
