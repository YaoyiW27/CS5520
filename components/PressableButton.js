import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PressableButton({
  children,
  componentStyle,
  onPress,
  pressedStyle,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        return [styles.defaultStyle, componentStyle, pressed && pressedStyle];
      }}
    >
      <View>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    margin: 10,
    padding: 5
  },
});