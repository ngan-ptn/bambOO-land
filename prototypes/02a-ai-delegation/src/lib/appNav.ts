export type AppScreen = 'home' | 'actionSheet' | 'manual' | 'scanCamera' | 'scanResults' | 'addPartner'

export interface AppNavState {
  screen: AppScreen
  scanPhotoId: string | null
  backTo: AppScreen
  isPortionPickerOpen: boolean
  portionPickerOrigin: AppScreen | null
}

export type AppNavAction =
  | { type: 'GO_HOME' }
  | { type: 'OPEN_ACTION_SHEET' }
  | { type: 'CLOSE_ACTION_SHEET' }
  | { type: 'GO_MANUAL' }
  | { type: 'GO_SCAN_CAMERA' }
  | { type: 'CAPTURE_SCAN_PHOTO'; photoId: string }
  | { type: 'CANCEL_SCAN' }
  | { type: 'OPEN_PORTION_PICKER'; origin: AppScreen }
  | { type: 'CLOSE_PORTION_PICKER' }
  | { type: 'GO_ADD_PARTNER' }
  | { type: 'CANCEL_ADD_PARTNER' }
  | { type: 'BACK' }

export function initialAppNavState(): AppNavState {
  return {
    screen: 'home',
    scanPhotoId: null,
    backTo: 'home',
    isPortionPickerOpen: false,
    portionPickerOrigin: null,
  }
}

export function appNavReducer(state: AppNavState, action: AppNavAction): AppNavState {
  switch (action.type) {
    case 'GO_HOME':
      return { ...initialAppNavState(), screen: 'home' }

    case 'OPEN_ACTION_SHEET':
      return { ...state, screen: 'actionSheet', backTo: 'home' }

    case 'CLOSE_ACTION_SHEET':
      return { ...state, screen: 'home' }

    case 'GO_MANUAL':
      return { ...state, screen: 'manual', backTo: state.screen === 'actionSheet' ? 'actionSheet' : 'home' }

    case 'GO_SCAN_CAMERA':
      return { ...state, screen: 'scanCamera', backTo: state.screen === 'actionSheet' ? 'actionSheet' : 'home' }

    case 'CAPTURE_SCAN_PHOTO':
      return { ...state, screen: 'scanResults', scanPhotoId: action.photoId }

    case 'CANCEL_SCAN':
      return { ...state, screen: state.backTo, scanPhotoId: null }

    case 'OPEN_PORTION_PICKER':
      return { ...state, isPortionPickerOpen: true, portionPickerOrigin: action.origin }

    case 'CLOSE_PORTION_PICKER':
      return { ...state, isPortionPickerOpen: false, portionPickerOrigin: null }

    case 'GO_ADD_PARTNER':
      return { ...state, screen: 'addPartner', backTo: 'home' }

    case 'CANCEL_ADD_PARTNER':
      return { ...state, screen: 'home' }

    case 'BACK':
      return { ...state, screen: state.backTo }

    default:
      return state
  }
}
