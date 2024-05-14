import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useDispatch } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDisptach = () => useDispatch<AppDispatch>();

//ts에서는 state에 대해 타입 추론을 못하기 때문에 직접 지정해줘야 함
