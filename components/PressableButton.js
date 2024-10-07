import React from 'react'
import { Pressable } from 'react-native';

function PressableButton({children, pressedFunction}) {
  return (
    <Pressable onPress={pressedFunction}>
      {children}
    </Pressable>
  )
}

export default PressableButton;