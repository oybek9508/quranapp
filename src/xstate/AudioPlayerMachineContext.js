/* eslint-disable import/prefer-default-export */
import { createContext } from "react";

import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";

import { audioPlayerMachine } from "./actors/audioPlayer/audioPlayerMachine";

import { DEFAULT_RECITER } from "src/redux/defaultSettings";
import {
  getXstateStateFromLocalStorage,
  persistXstateToLocalStorage,
} from "./actors/audioPlayer/audioPlayerPersistHelper";

// import { ToastStatus, useToast } from '@/dls/Toast/Toast';

export const AudioPlayerMachineContext = createContext({});

const LOCAL_STORAGE_PERSISTENCE_EVENT_TRIGGER = [
  "CHANGE_RECITER",
  "SET_PLAYBACK_SPEED",
];

export const AudioPlayerMachineProvider = ({ children }) => {
  //   const toast = useToast();
  //   const { t } = useTranslation("common");
  const initialXstateContext = getXstateStateFromLocalStorage();
  const defaultLocaleContext = {
    reciterId: DEFAULT_RECITER.id,
  };

  const audioPlayerService = useInterpret(
    audioPlayerMachine,
    {
      context: {
        ...audioPlayerMachine.initialState.context,
        ...defaultLocaleContext,
        ...initialXstateContext,
      },
    },
    (state) => {
      const { playbackRate, reciterId } = state.context;
      //   if (state.matches("VISIBLE.FAILED")) {
      //     toast(t("error.general"), { status: ToastStatus.Error });
      //   }

      if (LOCAL_STORAGE_PERSISTENCE_EVENT_TRIGGER.includes(state.event.type)) {
        persistXstateToLocalStorage({ playbackRate, reciterId });
      }
    }
  );

  return (
    <AudioPlayerMachineContext.Provider value={audioPlayerService}>
      {children}
    </AudioPlayerMachineContext.Provider>
  );
};
