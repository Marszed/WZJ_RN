/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  static defaultProps = {
    text: 'click me'
  };
  constructor(props) {
    super(props);
    this.state = {
      str: 0,
      searchText: ''
    };
    this.onPressIn = this.onPressIn.bind(this);
  };
  onPressIn = () => {
    console.log('onPressIn');
    console.log(this.state.str);
    this.setState({
      str: this.state.str + 1
    });
  };
  onPressOut = () => {
    console.log('onPressOut');
  };
  onPress = () => {
    console.log('onPress');
  };
  onLongPress = () => {
    console.log('onLongPress');
  };
  alert = (text) => {
    alert(text);
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInputVIew />
        </View>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <TouchableOpacity
          onPressIn = { this.onPressIn }
          onPressOut = { this.onPressOut }
          onPress = { this.onPress }
          onLongPress = { this.onLongPress }>
          <Text>{this.state.str}</Text>
        </TouchableOpacity>
        <TouchableHighlight
          onPress = { this.alert.bind(this, 'hello Marszed') }>
          <Text>{this.props.text}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'green',
    marginBottom: 5,
  },
});

class TextInputVIew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      show: false
    };
    this._onChangeText = this._onChangeText.bind(this);
  }
  _hide(value){
    this.setState({
      show: false,
      value
    });
  }
  _onChangeText(value) {
    this.setState({
      show: true,
      value
    });
  }
  render() {
    return (
      <View>
        <TextInput placeholder="请输入搜索关键字"
        maxLength={100}
        value={this.state.value}
        onChangeText={this._onChangeText}
        onEndEditing={this._hide.bind(this, this.state.value)}></TextInput>
        <Text>搜索结果: </Text>
        {
          this.state.show ? <View>
              <Text onPress={this._hide.bind(this, this.state.value + '街')} numberOfLines={1}>{this.state.value}街</Text>
              <Text onPress={this._hide.bind(this, this.state.value + '车站')} numberOfLines={1}>{this.state.value}车站</Text>
            </View> : null
        }
      </View>
    );
  }
}
