import { useDispatch, useSelector } from "react-redux";
import { listenerMiddleware } from "rtk/middleware";
import type { RootState, AppDispatch } from "rtk/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type ExtraArgument = { [key: string]: string };

export const startAppListening = listenerMiddleware.startListening.withTypes<
    RootState,
    AppDispatch,
    ExtraArgument
>();
