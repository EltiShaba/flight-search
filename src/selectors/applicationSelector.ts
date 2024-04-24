import { RootState } from "../store/store";

export const selectCount = (state: RootState) => state.counter.value;
export const selectCountLoading = (state: RootState) => state.counter.status;
