const cookieName = '领克'
const signurlKey = 'signurl_lynkco'
const signheaderKey = 'signheader_lynkco'
const fishersyu = init()
const signurlVal = fishersyu.getdata(signurlKey)
const signheaderVal = fishersyu.getdata(signheaderKey)

sign()

function sign() {
    fishersyu.log(`${signurlVal} signapp - 签到test: ${JSON.parse(signheaderVal)}`)
    fishersyu.log(`signapp - token: ${signurlToken}`)
    fishersyu.msg("测试", "签到测试", "签到中。。。。。。。")
    fishersyu.done()
    // const url = { url: signurlVal, headers: JSON.parse(signheaderVal) }
    // fishersyu.post(url, (error, response, data) => {
    // fishersyu.log(`${cookieName}, data: ${data}`)
    // const title = `${cookieName}`
    // let subTitle = ''
    // let detail = ''
    // const result = JSON.parse(data)
    // if (result.result_code == "success") {
    //     subTitle = `签到结果: 成功`
    //     detail = `签到积分: ${result.data.stats.credit_amount}, 连签: ${result.data.stats.continuous_checkin_days}天`
    // } else if (result.result_code == "credit_limit_reached") {
    //     subTitle = `签到结果: 成功 (重复签到)`
    // } else {
    //     subTitle = `签到结果: 失败`
    //     detail = `说明: ${result.debug_msg}, 请重新获取`
    // }
    // fishersyu.msg(title, subTitle, detail)
    // fishersyu.done()
    // })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  put = (url, cb) => {
    if (isSurge()) {
      $httpClient.put(url, cb)
    }
    if (isQuanX()) {
      url.method = 'PUT'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, put, done }
}
