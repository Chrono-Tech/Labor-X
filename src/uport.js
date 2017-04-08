import { Connect, QRUtil } from 'uport-connect'
import log from 'loglevel';

const customOpenQr = (data, cancel) => {
  log.debug('openQr data = '+JSON.stringify(data))
  QRUtil.openQr(data, cancel)
}

export const uport = new Connect('LaborX', {
  uriHandler: customOpenQr,
  closeUriHandler: QRUtil.closeQr
})
