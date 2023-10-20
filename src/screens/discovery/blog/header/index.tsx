/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 08:02:47
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { STORYBOOK, URL_SPA } from '@constants'

const TEXT_BROWSER = '浏览器查看'
const TEXT_SPA = '网页版查看'
const DATA = [TEXT_BROWSER]
if (!STORYBOOK) DATA.push(TEXT_SPA)

function Header() {
  return (
    <CompHeader
      title='日志'
      alias='全站日志'
      hm={['discovery/blog', 'DiscoveryBlog']}
      headerRight={() => (
        <CompHeader.Popover
          data={DATA}
          onSelect={key => {
            t('全站日志.右上角菜单', {
              key
            })

            if (key === TEXT_BROWSER) {
              open('https://bgm.tv/blog')
            } else if (key === TEXT_SPA) {
              const url = `${URL_SPA}/${getSPAParams('DiscoveryBlog')}`
              open(url)
            }
          }}
        >
          <Heatmap id='全站日志.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default ob(Header)
