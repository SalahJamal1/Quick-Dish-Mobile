import React, { useEffect } from "react";
import { Animated, Easing, useAnimatedValue, TextStyle } from "react-native";

type Props = {
  uri: string;
  image: any;
};

export default function ImageAnimated({ uri, image }: Props) {
  const anim = useAnimatedValue(0);
  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [anim]);
  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const blur = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });
  return (
    <Animated.Image
      source={{ uri: uri }}
      style={[image, { opacity }]}
      resizeMode="cover"
      blurRadius={blur}
    />
  );
}
