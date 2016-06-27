import { webFrame, ipcRenderer } from 'electron'
import * as sitedata from '../lib/fg/sitedata-api'

const ZOOM_STEP = 0.5

// globals
// =

var zoom = 0

// exported api
// =

export function setup () {
  // load zoom from sitedata
  sitedata.get('zoom', (err, v) => {
    if (typeof v != 'undefined') {
      zoom = +v
      webFrame.setZoomLevel(zoom)
      ipcRenderer.sendToHost('set-zoom-level', zoom)
    }
  })
}

export function setZoom(z) {
  // clamp
  if (z > 4.5) z = 4.5
  if (z < -3)  z = -3

  // update
  zoom = z
  webFrame.setZoomLevel(zoom)
  ipcRenderer.sendToHost('set-zoom-level', zoom)

  // persist to sitedata
  sitedata.set('zoom', zoom)
}

export function zoomIn () {
  setZoom(zoom + ZOOM_STEP)
}

export function zoomOut () {
  setZoom(zoom - ZOOM_STEP)
}

export function zoomReset () {
  setZoom(0)
}