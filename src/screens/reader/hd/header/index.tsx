/*
 * @Author: czy0729
 * @Date: 2022-03-16 18:17:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 06:33:43
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { IconHeader } from '@_'
import { alert } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.params?.cn || 'HD'}
      alias='HD'
      hm={['hd', 'HD']}
      headerRight={() => (
        <IconHeader
          name='md-info-outline'
          onPress={() => {
            t('HD.提示')

            alert(
              '一般只提供高清单行本数据\n会不定时添加数据\n所有数据来源于互联网请支持正版\n若因不可抗力原因功能会随时下线\n若想收录想要的单行本可留言私聊',
              '高清高速源头'
            )
          }}
        />
      )}
    />
  )
}

export default obc(Header)
