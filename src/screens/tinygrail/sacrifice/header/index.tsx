/*
 * @Author: czy0729
 * @Date: 2022-11-11 05:52:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-06 02:11:08
 */
import React from 'react'
import { Flex, Header as CompHeader, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $, navigation }: Ctx) {
  return (
    <CompHeader
      title='资产重组'
      hm={[`tinygrail/sacrifice/${$.monoId}`, 'TinygrailSacrifice']}
      statusBarEvents={false}
      statusBarEventsType='Tinygrail'
      headerRight={() => (
        <Flex>
          <Touchable
            style={[
              {
                paddingVertical: _.sm
              },
              _.mr.md
            ]}
            onPress={() => {
              const { form, monoId } = $.params
              t('资产重组.跳转', {
                to: 'TinygrailDeal',
                monoId: $.monoId
              })

              if (form === 'deal') {
                navigation.goBack()
                return
              }

              navigation.push('TinygrailDeal', {
                monoId,
                form: 'sacrifice'
              })
            }}
          >
            <Iconfont name='md-attach-money' color={_.colorTinygrailPlain} />
          </Touchable>
          <Touchable
            style={[
              {
                paddingVertical: _.sm
              },
              _.mr.sm
            ]}
            onPress={() => {
              const { form, monoId } = $.params
              t('资产重组.跳转', {
                to: 'TinygrailTrade',
                monoId: $.monoId
              })

              if (form === 'trade') {
                navigation.goBack()
                return
              }

              navigation.push('TinygrailTrade', {
                monoId,
                form: 'sacrifice'
              })
            }}
          >
            <Iconfont name='md-waterfall-chart' color={_.colorTinygrailPlain} />
          </Touchable>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
