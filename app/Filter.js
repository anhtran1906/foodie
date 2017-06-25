/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Button,
  Switch,
  Picker,
} from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

export default class Filter extends Component {

  render() {
    return (
      <View>
        <Text>Filter!</Text>
        <Text>Offfering a Deal
          <Switch></Switch>
        </Text>
        <Text>Distance</Text>
        <Picker selectedValue={0.5}></Picker>
      </View>
    )
  }
}
