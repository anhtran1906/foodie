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
} from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

export default class Login extends Component {
  _responseInfoCallback = (error: ?Object, result: ?Object) => {
    {
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    return (
      <View>
        <Text>Yelp App!</Text>
        <Button title='Login' onPress={this._responseInfoCallback} />
      </View>
    )
  }
}
