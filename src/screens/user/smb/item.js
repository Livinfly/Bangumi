/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:31:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-06 06:22:38
 */
import React, { useState } from 'react'
import { Alert, View, Linking } from 'react-native'
import { Flex, Image, Text, Touchable, Iconfont } from '@components'
import { Cover, Rank, Stars, Tag } from '@_'
import { _ } from '@stores'
import { copy, desc } from '@utils'
import { memo, obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { info } from '@utils/ui'
import { IMG_DEFAULT, IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { icons } from './utils'

const defaultProps = {
  navigation: {},
  styles: {},
  loaded: false,
  subjectId: 0,
  name: '',
  name_cn: '',
  images: {},
  type: '',
  eps_count: 0,
  air_date: '',
  rank: '',
  rating: {},
  collection: '',
  folder: {},
  smb: {},
  url: Function.prototype
}

const sortOrder = {
  folder: 110,
  video: 100,
  music: 90,
  pic: 80,
  zip: 70,
  origin: 11,
  file: 10
}

const Item = memo(
  ({
    navigation,
    styles,
    subjectId,
    loaded,
    name,
    name_cn,
    images,
    type,
    eps_count,
    air_date,
    rank,
    rating,
    collection,
    folder,
    smb,
    url
  }) => {
    const [showFolder, setShowFolder] = useState(false)
    const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
    const path = []
    if (showFolder) {
      path.push(smb.port ? `${smb.ip}:${smb.port}` : smb.ip, smb.sharedFolder)
    }
    if (folder.path) path.push(folder.path)
    if (subjectId || showFolder) path.push(folder.name)
    return (
      <View style={[_.container.plain, styles.container]}>
        <View style={styles.wrap}>
          {/* subject */}
          <Flex align={loaded ? 'start' : 'center'}>
            {loaded ? (
              <Cover
                style={styles.image}
                src={images?.medium || IMG_DEFAULT}
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                radius
                shadow
                type={typeCn}
                onPress={() => {
                  navigation.push('Subject', {
                    subjectId,
                    _name: name,
                    _name_cn: name_cn,
                    _image: images?.medium,
                    _type: typeCn
                  })
                }}
              />
            ) : (
              <Image
                src={icons.folder}
                size={IMG_WIDTH}
                placeholder={false}
                resizeMode='contain'
              />
            )}
            <Flex.Item style={styles.body}>
              <View>
                {loaded ? (
                  <>
                    <Text itemStyle={styles.katakanas} size={15} numberOfLines={2}>
                      {collection ? '　　 ' : ''}
                      <Text size={15} bold>
                        {HTMLDecode(name_cn || name)}
                      </Text>
                      {!!name && name !== name_cn && (
                        <Text type='sub' size={11} lineHeight={15} bold>
                          {'  '}
                          {HTMLDecode(name)}
                        </Text>
                      )}
                    </Text>

                    <Text style={styles.desc} size={11} numberOfLines={2}>
                      {!!eps_count && `${eps_count}话 / `}
                      {air_date}
                    </Text>

                    <Flex style={styles.rating}>
                      {!!rank && <Rank style={_.mr.sm} value={rank} />}
                      {!!rating?.score && (
                        <Stars style={_.mr.sm} value={rating.score} color='warning' />
                      )}
                      {!!rating.total && (
                        <Text size={10} type='sub'>
                          ({rating.total}人评分)
                        </Text>
                      )}
                    </Flex>
                  </>
                ) : (
                  <Text size={15} bold>
                    {folder.name}
                  </Text>
                )}

                {!!folder.tags.length && (
                  <Flex style={_.mt.sm} wrap='wrap'>
                    {folder.tags.map(item => (
                      <Tag key={item} style={styles.tag} value={item} />
                    ))}
                  </Flex>
                )}

                {!showFolder && (
                  <Flex style={styles.folderRoot}>
                    <Touchable onPress={() => setShowFolder(!showFolder)}>
                      <View style={styles.folder}>
                        <Flex>
                          <Text size={12} bold numberOfLines={1}>
                            {path.join('/') || '/'}
                          </Text>
                          <Iconfont style={_.ml.xs} name='md-navigate-next' />
                        </Flex>
                      </View>
                    </Touchable>
                  </Flex>
                )}
              </View>
              {!!collection && <Tag style={styles.collection} value={collection} />}
            </Flex.Item>
          </Flex>

          {/* folder */}
          {showFolder && (
            <View style={[styles.folder, styles.folderList]}>
              <Touchable
                onPress={() => setShowFolder(!showFolder)}
                onLongPress={() => {
                  copy(path.join('/'))
                  info('已复制smb地址')
                }}
              >
                <Flex align='start'>
                  <Image
                    style={_.mr.sm}
                    src={icons.open}
                    size={16}
                    placeholder={false}
                    resizeMode='contain'
                  />
                  <Flex.Item>
                    <Text size={12} bold>
                      {path.join('/') || '/'}
                    </Text>
                  </Flex.Item>
                  <Iconfont style={styles.up} name='md-keyboard-arrow-up' />
                </Flex>
              </Touchable>
              <View style={styles.path}>
                {folder.list.length ? (
                  folder.list
                    .sort((a, b) =>
                      desc(sortOrder[a.type] || 0, sortOrder[b.type] || 0)
                    )
                    .map(item => (
                      <Touchable
                        key={item.name}
                        style={styles.item}
                        onPress={() => {
                          copy(
                            url(smb.sharedFolder, folder.path, folder.name, item.name)
                          )
                          info('已复制smb地址')
                          console.log(
                            url(smb.sharedFolder, folder.path, folder.name, item.name)
                          )
                        }}
                        onLongPress={async () => {
                          const link = url(
                            smb.sharedFolder,
                            folder.path,
                            folder.name,
                            item.name
                          )
                          if (!(await Linking.canOpenURL(link))) {
                            Alert.alert('本机不支持打开此链接', link, [
                              {
                                text: '确定',
                                onPress: () => {}
                              }
                            ])
                            return
                          }
                          Linking.openURL(link)
                        }}
                      >
                        <Flex align='start'>
                          <Image
                            src={icons[item.type]}
                            size={16}
                            placeholder={false}
                            resizeMode='contain'
                          />
                          <Flex.Item style={_.ml.sm}>
                            <Text size={12}>{item.name}</Text>
                          </Flex.Item>
                        </Flex>
                      </Touchable>
                    ))
                ) : (
                  <Text size={10}>(空)</Text>
                )}
                {!!folder.list.length && (
                  <Text style={_.mt.sm} size={10} type='sub' align='right'>
                    点击复制地址，长按跳转
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    )
  },
  defaultProps
)

export default obc(({ subjectId, ...folder }, { $, navigation }) => {
  const { _loaded, name, name_cn, images, type, eps_count, rank, rating } =
    $.subject(subjectId)
  const { status = { name: '' } } = $.collection(subjectId)
  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      loaded={_loaded}
      subjectId={subjectId}
      name={name}
      name_cn={name_cn}
      images={images}
      type={type}
      eps_count={eps_count}
      air_date={$.airDate(subjectId)}
      rank={rank}
      rating={rating}
      collection={status.name}
      folder={folder}
      smb={$.current.smb}
      url={$.url}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  body: {
    marginTop: -1,
    marginLeft: _.md
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 1 * _.lineHeightRatio,
    left: 0
  },
  desc: {
    marginTop: 8
  },
  rating: {
    marginTop: 12,
    marginBottom: 4
  },
  up: {
    marginTop: -3,
    marginRight: -4,
    marginLeft: _.xs
  },
  tag: {
    paddingRight: 6,
    paddingLeft: 6,
    marginRight: _.sm,
    marginBottom: _.sm
  },
  folder: {
    paddingRight: 4,
    paddingVertical: 5,
    paddingLeft: 12,
    marginTop: 13,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  folderRoot: {
    marginRight: _._wind + _.md
  },
  folderList: {
    paddingRight: 12,
    paddingVertical: _.sm
  },
  path: {
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  },
  item: {
    paddingVertical: _.xs
  }
}))
