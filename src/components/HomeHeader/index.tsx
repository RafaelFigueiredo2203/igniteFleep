import React from 'react'
import { View } from 'react-native'
import { Greeting, Message, Name } from './styles'

export function HomeHeader() {
  return (
    <View>
      <Greeting>
        <Message>
          Olá
        </Message>

        <Name>
          Rodrigo
        </Name>
      </Greeting>
    </View>
  )
}