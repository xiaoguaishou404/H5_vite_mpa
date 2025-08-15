const notWebviewCaller = (...args) => {
  console.log(`不是flutter_inappwebview环境,执行了参数:`, args)
}

const webviewCaller = window.flutter_inappwebview?.callHandler

export const webviewController = {
  isWebview: !!webviewCaller,
  webviewCaller: webviewCaller || notWebviewCaller,
}


