/*
 * @Author: czy0729
 * @Date: 2022-11-24 05:43:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-29 17:44:53
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, SwitchPro, Divider } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import Item from '../item'
import { Ctx } from '../types'
import { styles } from './styles'

function List(props, { $ }: Ctx) {
  const { focusOrigin, focusAction } = systemStore.setting
  return (
    <View>
      <Flex style={styles.setting}>
        <Flex.Item>
          <Text size={15} bold>
            突出显示源头按钮
          </Text>
        </Flex.Item>
        <SwitchPro
          style={styles.switch}
          value={focusOrigin}
          onSyncPress={() => {
            t('设置.切换', {
              title: ' 突出源头按钮',
              checked: !focusOrigin
            })

            systemStore.switchSetting('focusOrigin')
          }}
        />
      </Flex>
      <Flex style={styles.setting}>
        <Flex.Item>
          <Text size={15} bold>
            若有自定义跳转隐藏通用源头按钮
          </Text>
          <Text style={_.mt.xs} type='sub' size={12} bold>
            需要开启上面的设置才会生效
          </Text>
        </Flex.Item>
        <SwitchPro
          style={styles.switch}
          value={focusAction}
          onSyncPress={() => {
            t('设置.切换', {
              title: '隐藏通用源头按钮',
              checked: !focusAction
            })

            systemStore.switchSetting('focusAction')
          }}
        />
      </Flex>
      <Divider />
      {$.data.map(item => (
        <Item key={item.uuid} {...item} />
      ))}
    </View>
  )
}

export default obc(List)
