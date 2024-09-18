const cookieName = '领克'
const cookieKey = 'fisher_cookie_lynkco'
const fisher = init()
const cookieVal = $request.headers['Cookie']
const cookieVals = $request.headers
if (cookieVals) {
  fisher.log(`[${cookieName}] 获取Cookies: 成功, cookies: ${cookieVals}`)
  for (const key in cookieVals) {
    if (cookieVals.hasOwnProperty(key)) {
      fisher.log(`<key======>value====> ${key}: ${cookieVals[key]}`);
    }
  }
}
if (cookieVal) {
  if (fisher.setdata(cookieVal, cookieKey)) {
    fisher.msg(`${cookieName}`, '获取Cookie: 成功', '')
    fisher.log(`[${cookieName}] 获取Cookie: 成功, cookie: ${cookieVal}`)
  }
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
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
fisher.done()
