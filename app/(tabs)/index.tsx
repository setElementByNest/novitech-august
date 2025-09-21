import Home from '@/screen/home/Home'
import React, { Component } from 'react'
import { View } from 'react-native'

export class index extends Component {
  render() {
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <Home />
      </View>
    )
  }
}

export default index