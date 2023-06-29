/*
 * @Author: czy0729
 * @Date: 2022-11-22 20:40:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-29 16:28:31
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconActions({ style = undefined, children = null }, { $, navigation }: Ctx) {
  const data = [...$.actions.map(item => item.name), '跳转管理'] as const
  return (
    <Popover
      style={!children && stl(styles.touch, style)}
      data={data}
      onSelect={title => $.onActionsPress(title, navigation)}
    >
      {children || (
        <Flex style={styles.btn} justify='center'>
          <Iconfont name='md-read-more' color={_.colorIcon} size={25} />
        </Flex>
      )}
    </Popover>
  )
}

export default obc(IconActions)

const styles = _.create({
  touch: {
    marginRight: 4,
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 38,
    height: 38
  }
})
