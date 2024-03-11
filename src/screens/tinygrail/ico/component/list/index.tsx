/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 10:33:30
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import { Ctx, TabsKey } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(
  {
    id
  }: {
    id: TabsKey
  },
  { $ }: Ctx
) {
  const list = $.list(id)
  if (!list._loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

  return (
    <PaginationList2
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={refreshControlProps}
      footerTextType='tinygrailText'
      data={list.list}
      limit={24}
      scrollToTop
      renderItem={renderItem}
      onHeaderRefresh={() => $.fetchList(id)}
    />
  )
}

export default obc(List, COMPONENT)
