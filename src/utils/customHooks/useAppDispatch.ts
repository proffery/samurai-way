import { useDispatch } from "react-redux";
import { AppDispatchType } from 'store/redux-store'

export const useAppDispatch: () => AppDispatchType = useDispatch;
