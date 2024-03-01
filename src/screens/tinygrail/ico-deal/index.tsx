/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-01 23:42:24
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import Initial from './component/initial'
import Scroll from './component/scroll'
import Slider from './component/slider'
import Header from './header'
import { useTinygrailICODealPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** ICO 详情 */
const TinygrailICODeal = (props, context: Ctx) => {
  useTinygrailICODealPage(context)

  const { $ } = context
  return (
    <>
      <Header />
      <Page style={_.container.tinygrail}>
        <Scroll onRefresh={$.refresh} />
      </Page>
    </>
  )
}

export default ic(Store, TinygrailICODeal)
