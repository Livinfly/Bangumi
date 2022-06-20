/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:42:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-20 22:56:50
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import Info from '../info'

function List({ renderItem, onScroll }, { $ }) {
  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.monoComments}
      scrollEventThrottle={16}
      scrollToTop
      ListHeaderComponent={<Info />}
      progressViewOffset={_.ios(_.statusBarHeight, 0)}
      removeClippedSubviews={false}
      renderItem={renderItem}
      onScroll={onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchMono}
    />
  )
}

export default obc(List)