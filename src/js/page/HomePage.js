import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, Image, DeviceEventEmitter,
} from 'react-native'
// libs
import TabNavigator from 'react-native-tab-navigator'
// images
import IMG_POPULAR from '../../assets/images/ic_polular.png'
import IMG_TRENDING from '../../assets/images/ic_trending.png'
import IMG_FAVORITE from '../../assets/images/ic_favorite.png'
import IMG_MY from '../../assets/images/ic_my.png'
// utils
import NavigatorUtils from '../utils/NavigatorUtils'
// pages
import PopularPage from './popular/PopularPage'
import TrendingPage from './trending/TrendingPage'
import FavoritePage from './favorite/FavoritePage'
import MyPage from './my/MyPage'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#f3f3f4',
  },
  image: {
    height: 22,
    width: 22,
  },
  page1: {
    flex: 1,
    backgroundColor: 'pink',
  },
  page2: {
    flex: 1,
    backgroundColor: 'green',
  },
})

export default class HomePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props)
    const selectedTab = this.props.navigation.getParam('selectedTab', 'tb_my')
    this.state = {
      selectedTab, // 初始化 默认选中的 tab 页
    }
  }

  componentDidMount = () => {
    // this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
    //   console.log(text)
    // })
    const { navigation } = this.props
    const { selectedTab } = this.state
    this.listener = DeviceEventEmitter.addListener('update_home', () => {
      NavigatorUtils.resetToHomePage({ navigation, selectedTab })
    })
  }

  componentWillUnmount = () => {
    if (this.listener) {
      this.listener.remove()
    }
  }

  /**
   * 渲染 当前 tab 页内容
   *
   * @param {*} PageComponent
   * @param {*} selectedTab
   * @param {*} title
   * @param {*} iconImg
   * @returns
   * @memberof HomePage
   */
  renderTabItem(PageComponent, selectedTab, title, iconImg) {
    return (
      <TabNavigator.Item
        selected={this.state.selectedTab === selectedTab}
        selectedTitleStyle={{ color: '#2196F3' }}
        title={title}
        renderIcon={() => <Image style={styles.image} source={iconImg} />}
        renderSelectedIcon={() => <Image style={[styles.image, { tintColor: '#2196F3' }]} source={iconImg} />}
        // badgeText="1"
        onPress={() => this.setState({ selectedTab })}
      >
        <PageComponent navigation={this.props.navigation} />
      </TabNavigator.Item>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          {this.renderTabItem(PopularPage, 'tb_popular', '最热', IMG_POPULAR)}
          {this.renderTabItem(TrendingPage, 'tb_trending', '趋势', IMG_TRENDING)}
          {this.renderTabItem(FavoritePage, 'tb_favorite', '收藏', IMG_FAVORITE)}
          {this.renderTabItem(MyPage, 'tb_my', '我的', IMG_MY)}
        </TabNavigator>
      </View>
    )
  }
}
