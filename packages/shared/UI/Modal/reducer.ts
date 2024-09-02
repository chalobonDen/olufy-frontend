import type { IModalScreenProps } from './Screen'
import type { ModalAction, ModalState } from './types'
import { ModalActionType } from './types'

export const initModalState: ModalState = {
  currentScreen: null,
  currentScreens: [],
  currentScreenId: null,
}

const reducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case ModalActionType.SET_SCREEN:
      return {
        ...state,
        ...action.payload,
      }

    case ModalActionType.SET_SCREEENS:
      return {
        ...state,
        ...action.payload,
      }

    case ModalActionType.NEXT:
      const screenKeys = state.currentScreens.map((e: any) => e?.props?.screen?.toString())
      const currentIndex = screenKeys.indexOf(action.screenId?.toString() || String(state.currentScreenId))

      if (currentIndex < 0) throw `please check 'screen id' for change screen`

      const nextScreenId = action.screenId?.toString() || screenKeys[currentIndex + 1]
      if (!nextScreenId) throw `please check 'screen id' for change screen`

      return {
        ...state,
        currentScreenId: nextScreenId,
        currentScreen: state.currentScreens.find((screen: any) => {
          const screenProps = screen?.props as IModalScreenProps
          return screenProps?.screen?.toString() === nextScreenId.toString()
        }),
      }
  }
}

export default reducer
