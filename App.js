import { Dimensions, StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
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
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gravity = 3;

  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

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

  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setScore(score => score + 1);
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
      setScore(score => score + 1);
      setObstaclesLeftTwo(screenWidth);
      setObstacleNegHeightTwo(-Math.random() * 100);
    }
  }, [obstaclesLeftTwo]);

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }
  };

  useEffect(() => { 
    if (
      ((birdBottom < (obstacleNegHeight + obstacleHeight +30) ||
      birdBottom > (obstacleNegHeight + obstacleHeight + gap -30)) &&
      (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30)
    )
    ||
    ((birdBottom < (obstacleNegHeightTwo + obstacleHeight +30) ||
    birdBottom > (obstacleNegHeightTwo + obstacleHeight + gap -30)) &&
    (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
    )
    )
    {
      console.log("Game Over")
      gameOver()
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesTimerId)
    clearInterval(obstaclesTimerIdTwo)
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Text style={styles.score}>Score: {score}</Text>
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 32,
    top: 50,
    position: 'absolute',
    zIndex: 1,
    color: 'white'
  },
    /*backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  } */
});
