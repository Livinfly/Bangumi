/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-07 20:31:28
 */
import React from 'react'
import { Text } from '@components'
import { tinygrailStore, _ } from '@stores'
import { formatNumber, getTimestamp, lastDate, toFixed } from '@utils'
import { formatTime, tinygrailFixedTime } from '@utils/app'
import { ob } from '@utils/decorators'
import { decimal, calculateRate, calculateTotalRate } from '@tinygrail/_/utils'
import Stars from '@tinygrail/_/stars'

const types = ['bid', 'asks', 'chara', 'merge']
const colorMap = {
  bid: 'bid',
  asks: 'ask',
  chara: 'warning',
  ico: 'primary',
  auction: 'warning',
  merge: 'warning'
}

let timezone = new Date().getTimezoneOffset() / -60
if (String(timezone).length === 1) timezone = `0${timezone}`

function Detail({
  assets,
  end,
  lastOrder,
  marketValue,
  price,
  rank,
  rate,
  sa,
  sacrifices,
  starForces,
  stars,
  state,
  total,
  type,
  users
}) {
  // 用show判断是否精简模式
  const { _stockPreview: show } = tinygrailStore.state
  const isICO = users !== undefined // 有users为ico中
  const isDeal = !!type // 有此值为用户委托单
  const isAuction = type === 'auction'
  const isValhall = type === 'valhall'

  let marketValueText // 总市场价
  let totalText // 总量
  if (show || isICO) {
    if (marketValue) marketValueText = decimal(marketValue)
    if (total) totalText = decimal(total)
  }

  const extra = []
  const extra2 = []
  const extra3 = []
  const extra4 = []
  if (isICO) {
    let _end = end
    if (!String(_end).includes('+')) _end = `${end}+${timezone}:00`
    extra.push(`剩余${formatTime(_end)}`) // ICO结束时间
    extra.push(`已筹${totalText || '-'}`) // ICO已筹资金
  } else {
    extra.push(
      `+${toFixed(rate, 1)}(${Number(
        toFixed(calculateRate(rate, rank, stars), 1)
      )})`
    )

    if (show && (state || sacrifices)) {
      extra2.push(
        `+${decimal(
          calculateTotalRate(
            {
              rate,
              rank,
              stars,
              state,
              sacrifices,
              assets
            },
            true
          )
        )}(${decimal(
          calculateTotalRate({
            rate,
            rank,
            stars,
            state,
            sacrifices,
            assets
          })
        )})`
      )
    }

    if (isValhall) {
      extra2.push(`底价${toFixed(price, 1)}`) // 英灵殿底价
      extra2.push(`数量${formatNumber(state, 0)}`) // 英灵殿数量
    } else {
      if ((show || isAuction) && lastOrder) {
        extra4.push(`${lastDate(getTimestamp(tinygrailFixedTime(lastOrder)))}`) // 最近交易或拍卖出价时间
      }
      if (totalText) extra4.push(`流通量${totalText}`) // 市场流通量
      if (marketValueText) extra4.push(`总值${marketValueText}`) // 市场总值
    }
  }

  if (show) {
    if (sa) extra3.push(`献祭${decimal(sa)}`) // 市场总献祭量
    if (starForces) extra3.push(`通天塔${decimal(starForces)}`) // 市场通天塔献祭量
  }

  let icoUser
  let icoHighlight
  if (users && users !== 'ico') {
    icoUser = users
    icoHighlight = Number(icoUser || 0) > 9 && Number(icoUser || 0) < 15
  }

  let prevText
  if (types.includes(type) && state) {
    prevText = `${state}股`
  } else if (type === 'ico') {
    prevText = `注资${decimal(state)}`
  }

  const size = show ? 10 : 11
  return (
    <>
      <Text style={_.mt.xs} type='tinygrailText' size={size} lineHeight={12}>
        {isDeal && (
          <Text type={colorMap[type]} size={size} bold lineHeight={12}>
            {prevText}
          </Text>
        )}
        {!!prevText && !!sacrifices && ' / '}
        {!!sacrifices && (
          <Text type='bid' size={size} bold lineHeight={12}>
            塔
            {!show || !assets || assets === sacrifices
              ? sacrifices
              : `${sacrifices}(${assets})`}
          </Text>
        )}
        {isDeal && !isAuction && !isValhall && ' / '}
        {extra.join(' / ')}
        {!!icoUser && (
          <Text
            size={size}
            lineHeight={12}
            type={icoHighlight ? 'warning' : 'tinygrailText'}
            bold={icoHighlight}
          >
            {' / '}
            当前{icoUser}人
          </Text>
        )}{' '}
        {!show && <Stars value={stars} />}
      </Text>
      {!!extra2.length && (
        <Text type='tinygrailText' size={size} lineHeight={12}>
          {extra2.join(' / ')}
        </Text>
      )}
      {!!extra3.length && (
        <Text type='tinygrailText' size={size} lineHeight={12}>
          {extra3.join(' / ')}
          {!!stars && ' / '}
          <Stars value={stars} />
        </Text>
      )}
      {!!extra4.length && (
        <Text type='tinygrailText' size={size} lineHeight={12}>
          {extra4.join(' / ')}
        </Text>
      )}
    </>
  )
}

export default ob(Detail)
