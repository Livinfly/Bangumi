/*
 * @Author: czy0729
 * @Date: 2019-08-08 09:59:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 06:07:00
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Flex, Text, Touchable, UserStatus } from '@components'
import { _, timelineStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar, InView, Name, Tag } from '../../base'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemNotifyProps } from './types'

export { ItemNotifyProps }

export const ItemNotify = ob(
  ({
    navigation,
    index,
    avatar,
    userId,
    userName,
    title,
    message,
    message2,
    href,
    repeat,
    event = EVENT,
    children
  }: ItemNotifyProps) => {
    const styles = memoStyles()

    let sayTitle: string
    const notifyId = String(href).split('/status/')?.[1]
    if (notifyId) {
      const say = timelineStore.say(notifyId)
      if (say.list.length) sayTitle = say.list[0]?.text
    }

    return (
      <Component id='item-notify' data-key={notifyId}>
        <Touchable
          animate
          onPress={() => {
            appNavigate(
              href,
              navigation,
              {
                _title: title
              },
              event
            )
          }}
        >
          <Flex style={styles.container} align='start'>
            <View style={styles.avatar}>
              <UserStatus userId={userId}>
                <InView style={styles.inView} y={ITEM_HEIGHT * index + 1}>
                  <Avatar
                    key={String(avatar)}
                    navigation={navigation}
                    userId={userId}
                    name={userName}
                    src={avatar}
                    event={event}
                  />
                </InView>
              </UserStatus>
            </View>
            <Flex.Item style={styles.item}>
              <Name userId={userId} showFriend size={13} type='title' bold>
                {userName}
              </Name>
              <Flex style={styles.message} align='start'>
                <Flex.Item>
                  <Text size={13} lineHeight={15}>
                    {message}
                    <Text size={13} lineHeight={15} type='main' bold>
                      {title}
                    </Text>
                    {message2}
                  </Text>
                  {!!sayTitle && (
                    <Text style={_.mt.xs} type='sub' size={11} numberOfLines={1} bold>
                      描述：{sayTitle}
                    </Text>
                  )}
                </Flex.Item>
                <Flex style={styles.tag} justify='end'>
                  {!!repeat && <Tag value={`x${repeat + 1}`} />}
                </Flex>
              </Flex>
            </Flex.Item>
            {children}
          </Flex>
        </Touchable>
      </Component>
    )
  },
  COMPONENT
)
