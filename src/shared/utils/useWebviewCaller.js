import { inject, provide } from 'vue'

const webviewCallerSymbol = Symbol('webviewCaller')

const notWebviewCaller = (...args) => {
  console.log(`不是flutter_inappwebview环境,args:`, args)
}

const webviewCaller = window.flutter_inappwebview?.callHandler || notWebviewCaller

export const useWebviewCallerProvider = () => {
  provide(webviewCallerSymbol, webviewCaller)
  return webviewCaller
}

export const useWebviewCallerInject = () => {
  return inject(webviewCallerSymbol)
}
