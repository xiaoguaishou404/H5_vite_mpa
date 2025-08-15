import { webviewController } from './webviewController.js'

const baseUrl = 'https://api.52bub.com'

const getHeaderAndBody = async (params) => {
  if (webviewController.isWebview) {
    let HeaderAndBody = await webviewController.webviewCaller('onRequest', params)
    HeaderAndBody = JSON.parse(HeaderAndBody)
    HeaderAndBody.headers = JSON.parse(HeaderAndBody.headers)
    return HeaderAndBody
  } else {
    return {
      headers: {
        token: 'a8ac642418724f3dbf8ec25bdea11375#3',
        timestamp: String(Date.now()),
        os: 'android',
        sign: 'fsdf35fasdfsa5432f',
        appVersion: '1.0.0',
        device: 'AN01',
        deviceId: '4123f',
        ft: '5',
      },
      params,
    }
  }
}
const useFetch = async (path, { method, headers, body }) => {
  const headerAndBody = await getHeaderAndBody(body)

  return await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...headerAndBody.headers,
      ...headers,
    },
    body: JSON.stringify(headerAndBody.params),
  })
}

export default useFetch
