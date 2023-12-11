/*
 * @Author: czy0729
 * @Date: 2022-06-13 07:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 17:26:20
 */
import { Override, ViewStyle, ImageStyle, SubjectTypeCn, Source } from '@types'
import { ImageProps } from '../image'

export type Props = Override<
  ImageProps,
  {
    /** 图片样式 */
    style?: ImageStyle

    /** 容器样式 */
    containerStyle?: ViewStyle

    /** 拟物容器样式 */
    bodyStyle?: ViewStyle

    /** 拟物容器箭头样式 */
    angleStyle?: ViewStyle

    /** 封面地址 */
    src?: Source | string

    /** 大小 */
    size?: number

    /** 高度 */
    height?: number

    /** 不需要错误占位图片 */
    noDefault?: boolean

    /** 条目类型 */
    type?: SubjectTypeCn | '目录' | ''

    /** 强制是否使用拟物封面 */
    useType?: boolean

    /** 是否匹配 CDN 地址 */
    cdn?: boolean

    /** 是否 text-only */
    textOnly?: boolean

    /** 封面加载失败后是否回退到 bgm 原地址 */
    fallback?: boolean
  }
>

export type CoverSize = 100 | 200 | 400 | 600

export type CoverPrefix = 'bgm_poster' | `bgm_poster_${100 | 200 | 400}`
