```javascript
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';

const DimensionsBugSolution = () => {
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setScreenHeight(screen.height);
      setScreenWidth(screen.width);
    });

    // Check if onLayout is supported to ensure that dimensions are set only after layout completion
    const handleLayout = (event) => {
      setScreenHeight(Dimensions.get('window').height);
      setScreenWidth(Dimensions.get('window').width);
    };

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View onLayout={handleLayout}>
      <Text>Screen Height: {screenHeight}</Text>
      <Text>Screen Width: {screenWidth}</Text>
    </View>
  );
};

export default DimensionsBugSolution;
```