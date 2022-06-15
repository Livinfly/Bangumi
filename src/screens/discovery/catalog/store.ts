/*
 * @Author: czy0729
 * @Date: 2020-01-02 20:28:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 23:25:33
 */
import { observable, computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import store from '@utils/store'
import { x18s } from '@utils/app'
import { info } from '@utils/ui'
import { t, queue } from '@utils/fetch'

const namespace = 'ScreenCatalog'

export default class ScreenCatalog extends store {
  state = observable({
    type: '',
    page: 1,
    show: true,
    ipt: '1',
    _loaded: false
  })

  init = async () => {
    this.setState({
      ...(await this.getStorage(undefined, namespace)),
      _loaded: true
    })

    return this.fetchCatalog()
  }

  // -------------------- fetch --------------------
  fetchCatalog = async () => {
    const { type, page } = this.state
    const res = discoveryStore.fetchCatalog({
      type,
      page
    })

    const data = await res
    queue(data.map(item => () => this.fetchCatalogDetail(item.id)))

    return res
  }

  fetchCatalogDetail = async id => {
    const { _loaded } = discoveryStore.catalogDetail(id)
    if (_loaded) {
      return true
    }

    return discoveryStore.fetchCatalogDetail({
      id
    })
  }

  // -------------------- get --------------------
  @computed get catalog() {
    const { type, page } = this.state
    const catalog = discoveryStore.catalog(type, page)
    if (userStore.isLimit) {
      return {
        ...catalog,
        list: catalog.list.filter(item => !x18s(item.title))
      }
    }
    return catalog
  }

  catalogDetail(id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  // -------------------- page --------------------
  onToggleType = async label => {
    const { type } = this.state

    // 是否热门
    const isCollect = type === 'collect'
    if (label) {
      if (label === '热门' && isCollect) return
      if (label === '最新' && type === '') return
    }

    t('目录.切换类型', {
      type: isCollect ? '最新' : '热门'
    })

    this.setState({
      type: isCollect ? '' : 'collect',
      page: 1,
      ipt: '1',
      show: false
    })

    await this.fetchCatalog()
    this.setState({
      show: true
    })
    this.setStorage(undefined, undefined, namespace)
  }

  onPrev = async () => {
    const { page } = this.state
    if (page === 1) {
      return
    }

    t('目录.上一页', {
      page: page - 1
    })

    this.setState({
      page: page - 1,
      show: false,
      ipt: String(page - 1)
    })
    this.fetchCatalog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }

  onNext = async () => {
    const { page } = this.state
    t('目录.下一页', {
      page: page + 1
    })

    this.setState({
      page: page + 1,
      show: false,
      ipt: String(page + 1)
    })
    this.fetchCatalog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }

  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  // -------------------- action --------------------
  doSearch = () => {
    const { ipt } = this.state
    const _ipt = ipt === '' ? 1 : parseInt(ipt)
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    t('目录.页码跳转', {
      page: _ipt
    })

    this.setState({
      page: _ipt,
      show: false,
      ipt: String(_ipt)
    })
    this.fetchCatalog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }
}