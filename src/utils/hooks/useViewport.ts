/*
 * @Author: czy0729
 * @Date: 2023-04-19 10:25:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 10:53:57
 */
import { useCallback, useState } from 'react'

export default function useViewport() {
  const [visibleTop, setVisibleTop] = useState(false)
  const [visibleBottom, setVisibleBottom] = useState(false)
  const onScroll = useCallback(({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent
    const screenHeight = layoutMeasurement.height
    setVisibleTop(contentOffset.y)
    setVisibleBottom(contentOffset.y + screenHeight)
  }, [])

  return {
    visibleTop,
    visibleBottom,
    onScroll
  }
}
