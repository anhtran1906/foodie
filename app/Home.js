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
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

export default class Home extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
    };
  }
  componentDidMount() {
    this.getPostsFromApiAsync();
    this.fetchToken();
  }
  onRefresh = () => {
    this.setState({
      refreshing: true,
    })
    this.getPostsFromApiAsync().then(() => {
      this.setState({
        refreshing: false
      })
    })
  }
  fetchToken() {
    const params = {
      client_id: '5ePm_vMFsbpFLftX97trOg',
      client_secret: 'vWLvn1VFgSxUhFNZo5PVDXXVWXa5Hcroj5cQHAxWAvb9jCOOwsHZHiLDqMaO8AjY',
      grant_type: 'client_credentials'
    }

    const request = new Request('https://api.yelp.com/oauth2/token', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      }),
      body: `client_id=${params.client_id}&client_secret=${params.client_secret}&grant_type=${params.grant_type}`
    });

    return fetch(request)
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json);
        return json; //Token
      })
  }

  getPostsFromApiAsync = (kw) => {
    const request = new Request(`https://api.yelp.com/v3/businesses/search?term=${kw}&location=San%20Francisco`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer dEUloKBqt4SnBbladfTrWtt5-nyUXh7v4KDEXxQrnf-3kUcqXxJFpekkU9R1A5mL6XP3RJ_Rz3Lq-MFHRGeNSLclpeIl-ubmbBBo_39O2yUojGO8348L69oyTCNPWXYx',
        'Content-type': 'application/json',
      }),
    })

    return fetch(request)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.businesses)
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onEndReached  = () => {
   this.getPostsFromApiAsync();
 }
  renderRow(rowData) {
    return (
      <View style={styles.header}>
        <Image
          style={{width:100, height:100}}
          source={{uri: rowData.image_url}}
        />
        <ScrollView style={{flexDirection: 'column'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          {rowData.name}
        </Text>
        <Text>
          {rowData.review_count} Reviews
        </Text>
        <Text>
          {rowData.location.display_address[0] + ' ' + rowData.location.display_address[1]}
        </Text>
        <View>
          {
            rowData.categories.map((c,i) =>{
              return <Text key={i}>{c.title}</Text>
            }
          )}
        </View>
        </ScrollView>
      </View >
    )
  }

  handleChangeText = (text) => {
    if (!text) {
      this.getPostsFromApiAsync('restaurants');
    }
    else {
      this.getPostsFromApiAsync(text);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.button}>
            <Button
              title='filter'
              color='white'
            />
          </View>
          <View style={styles.searchBar}>
          <TextInput
            style={{flex:1, height: 50}}
            placeholder="Restaurants"
            placeholderTextColor="grey"
            returnKeyType="search"
            onChangeText={this.handleChangeText}
          />
          </View>
        </View>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          enableEmptySections
          pageSize={2}
          refreshControl={
           <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this.onRefresh.bind(this)}
           />}
          onEndReached={this.onEndReached.bind(this)}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#B40404',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchBar: {
    height:50,
    width: 250,
    marginTop:20,
    borderColor:'grey',
    borderWidth:1,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 8,
  },
  button: {
    padding: 8,
    height: 50,
    width: 100,
    marginTop: 20,
    borderColor:'black',
    borderWidth: 1,
    borderRadius:10,
    overflow:'hidden',
  },
  list: {
    flex: 1,
    padding: 8,
    backgroundColor: 'white',
    borderRadius:10,
    marginTop: 10,
  },
});
