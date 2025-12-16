import React from 'react';
import { Text, View } from 'react-native';

const Obstacles = ({ 
    color,
    obstacleWidht,
    obstacleHeight,
    randomBottom,
    gap,
    obstaclesLeft,
}) => (
    <>
        <View style={{
            position: 'absolute',
            backgroundColor: color,
            width: obstacleWidht,
            height: 500,
            left: obstaclesLeft,
            bottom: randomBottom + obstacleHeight + gap,
        }}
        ></View>
        <View style={{
            position: 'absolute',
            backgroundColor: color,
            width: obstacleWidht,
            height: obstacleHeight,
            left: obstaclesLeft,
            bottom: randomBottom,
        }}
        ></View>
    </>
);

export default Obstacles;
