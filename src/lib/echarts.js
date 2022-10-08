import * as echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

import { calcPX } from '@/utils/utils'

const themeConfigData = require('@/assets/config/customed.project.json')

_.set(themeConfigData, 'textStyle.fontSize', calcPX(12))
_.set(themeConfigData, 'grid', { right: 0, bottom: calcPX(20) })
echarts.registerTheme('customed-jdl', themeConfigData)

export default echarts
