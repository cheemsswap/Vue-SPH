//引入mock
import Mock from 'mockjs'

//引入json数据
import bannder from './bannder.json'
import floor from './floor.json'
//设置mock延迟
Mock.setup({
    timeout: '1000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})
Mock.mock(
    "/api/bannder", { code: 200, data: bannder }
)
Mock.mock(
    "/api/floor", { code: 200, data: floor }
)
