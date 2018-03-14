/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  AppState,
  Animated,
  Easing,
} from 'react-native';

const Dimensions = require('Dimensions');
const screenWidth = Dimensions.get('window').width;


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu,',
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
          <ScrollViewSwipe/>
        </View>
        <View>
          <TextInputViewSearch />
        </View>
        <View>
          <AnimationRotateScene/>
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
          onPressIn={ this.onPressIn }
          onPressOut={ this.onPressOut }
          onPress={ this.onPress }
          onLongPress={ this.onLongPress }>
          <Text>{this.state.str}</Text>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={ this.alert.bind(this, 'hello Marszed') }>
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

class TextInputViewSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      show: false
    };
    this._onChangeText = this._onChangeText.bind(this);
  }

  _hide(value) {
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
              <Text onPress={this._hide.bind(this, this.state.value + '车站')}
                    numberOfLines={1}>{this.state.value}车站</Text>
            </View> : null
        }
      </View>
    );
  }
}

class ScrollViewSwipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: ['https://pic.wozaijia.com/upload/main/banner/aa6cfd366766cf39baa002f3146d7a5df8b3c6a5.jpg', 'https://pic.wozaijia.com/upload/main/banner/1804658d1ebe53d187e682c713928fd3f690ea59.jpg', 'https://pic.wozaijia.com/upload/main/banner/8a8fc8d5cbc4c483bebe17219d88c4a7bc7e3333.png'],
      currentPage: 0
    };
  }

  _renderImage() {
    const {imageData} = this.state;
    let allImage = [];
    for (let i = 0, len = imageData.length; i < len; i++) {
      allImage.push(<Image key={i} source={{uri: imageData[i]}} style={ScrollViewSwipeStyle.imageStyle}></Image>);
    }
    return  allImage;
  }
  _renderPagingIndicator() {
    const {imageData, currentPage} = this.state;
    let indicatorArray = [];
    let _style;
    for (let i = 0, len = imageData.length; i < len; i++) {
      _style = (i === currentPage) ? {color: 'orange'} : {color: 'white'};
      indicatorArray.push(<Text key={i} style={[{fontSize: 30}, _style]}>·</Text>);
    }
    return indicatorArray;
  }
  _onAnimationEnd(e) {
    let offsetX = e.nativeEvent.contentOffset.x;
    let pageIndex = Math.floor(offsetX / screenWidth);
    this.setState({
      currentPage: pageIndex
    });
  }

  render() {
    return (
      <View style={ScrollViewSwipeStyle.container}>
        <ScrollView horizontal={ true }
                    ref="swipe"
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(e) => {
                      this._onAnimationEnd(e);
                    }}
        >
          {this._renderImage()}
        </ScrollView>
        <View style={ScrollViewSwipeStyle.pagingIndicatorStyle}>
          {this._renderPagingIndicator()}
        </View>
      </View>
    );
  }
}

const ScrollViewSwipeStyle = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: 'red'
  },
  scrollViewStyle: {
    backgroundColor: 'yellow'
  },
  imageStyle: {
    width: screenWidth,
    height: 200,
  },
  pagingIndicatorStyle: {
    height: 25,
    width: screenWidth,
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class AnimationRotateScene extends Component{
  constructor(props){
    super(props);
    this.spinValue = new Animated.Value(0);
  }
  componentDidMount() {
    //this.spin();
  }
  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start(() => this.spin());
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return(
      <View style={AnimationRotateSceneStyle.container}>
        <Animated.Image className="Image" style={{width: 100, height: 100, transform: [{rotate: spin}] }}
        source={{uri: 'https://pic.wozaijia.com/h5-static/img/h5/play.png'}}/>
        <TouchableOpacity onPress={this.spin.bind(this)} style={AnimationRotateSceneStyle.button}>
          <Text>启动动画</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const AnimationRotateSceneStyle = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'red',
  }
});
