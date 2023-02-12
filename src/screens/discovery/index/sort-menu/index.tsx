/*
 * @Author: czy0729
 * @Date: 2021-10-18 11:59:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-13 05:21:31
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import SortMenu from './sort-menu'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  rerender('Discovery.SortMenu')

  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <SortMenu
        navigation={navigation}
        styles={styles}
        orientation={_.orientation}
        dragging={$.state.dragging}
        discoveryMenu={$.discoveryMenu}
        discoveryTodayOnair={$.discoveryTodayOnair}
        discoveryMenuNum={$.discoveryMenuNum}
        onToggle={$.toggleDragging}
        onSubmit={$.saveDiscoveryMenu}
      />
    </View>
  )
})
