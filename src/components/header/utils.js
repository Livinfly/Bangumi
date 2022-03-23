/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:55:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-23 01:23:15
 */
import React, { useState, useCallback } from 'react'
import { _, systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/cn-char'
import { IOS } from '@constants'
import Back from './back'
import { headerTransitionHeight } from './transition'

export const colors = {
  Subject: fixed => (_.isDark || !fixed ? '#fff' : '#000'),
  Tinygrail: () => _.colorTinygrailPlain
}
export const backgroundColors = {
  Tinygrail: () => _.colorTinygrailContainer
}

export const updateHeader = ({
  // 必要
  navigation,
  title = '',
  headerTitleAlign,
  headerTitleStyle,
  headerRight,

  // 非必要
  mode,
  fixed = false,
  statusBarEventsType
}) => {
  if (!navigation) return

  const _title = systemStore.setting.s2t ? s2t(title) : title
  const color = colors[statusBarEventsType]
    ? colors[statusBarEventsType](fixed)
    : undefined
  const backgroundColor = backgroundColors[statusBarEventsType]
    ? backgroundColors[statusBarEventsType](fixed)
    : undefined
  const options = {
    // header
    headerTransparent: false,
    headerShown: true,
    headerStyle: {
      backgroundColor: backgroundColor || (mode ? 'transparent' : _.colorPlain),
      borderBottomWidth: 0,
      elevation: 0
    },

    // headerTitle
    headerTitle: mode ? '' : _title,
    headerTitleAlign: headerTitleAlign || (mode ? 'left' : 'center'),
    headerTitleStyle: {
      fontSize: 15,
      fontWeight: 'normal',
      ...headerTitleStyle
    },
    headerTintColor: color || _.colorTitle,

    // headerBack
    headerBackTitleVisible: false,
    headerLeftContainerStyle: {
      paddingLeft: 5
    },
    headerLeft: () => <Back navigation={navigation} color={color} />
  }

  if (headerRight) {
    options.headerRightContainerStyle = {
      paddingRight: 6
    }
    options.headerRight = headerRight
  }

  /**
   * 部分vivo 华为机型有非常诡异的bug
   * headerTransparent不能为true, height不能为0, position不能为absolute, 背景不能为透明
   * 只要有上述任何一个条件达成了, 就会触发页面背景色丢失, 看见前一个页面文字的bug!
   * 现在只能自己模拟一个<Header />去避免这个问题
   */
  if (mode) {
    options.headerStyle = {
      ...options.headerStyle,
      height: 1
    }
    options.headerLeft = () => null
    options.headerRight = () => null
  }

  // platform fixed
  if (IOS) {
  } else {
    options.headerTitleStyle.fontFamily = ''
  }

  navigation.setOptions(options)
}

export const useOnScroll = () => {
  const [y, setY] = useState(0)
  const [fixed, setFixed] = useState(false)
  const onScroll = useCallback(
    ({ nativeEvent }) => {
      const { y } = nativeEvent.contentOffset
      if (y <= headerTransitionHeight) {
        setY(y)
      }

      const offset = headerTransitionHeight
      if ((fixed && y > offset) || (!fixed && y <= offset)) return
      setY(headerTransitionHeight)
      setFixed(y > offset)
    },
    [fixed]
  )

  return {
    y,
    fixed,
    onScroll
  }
}