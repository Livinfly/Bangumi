/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:01:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-18 02:20:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  cover: {
    marginLeft: _.sm,
    backgroundColor: _.select(_.colorBg, _.colorPlain)
  },
  relation: {
    paddingLeft: 2,
    marginTop: _.sm + 4,
    marginBottom: _.sm + 4
  },
  series: {
    width: _.r(180),
    paddingLeft: 2,
    paddingRight: _.sm,
    marginVertical: _.sm + 2,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  icon: {
    marginRight: -_.sm
  }
}))
