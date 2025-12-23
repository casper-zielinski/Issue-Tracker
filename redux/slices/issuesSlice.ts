import { IssueSerializable } from "@/app/Dashboard/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issues: [] as IssueSerializable[],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssuesCache: (state, action) => {
      state.issues = action.payload.issues as IssueSerializable[];
    },
    appendIssueCache: (state, action) => {
      state.issues.push(action.payload.issue as IssueSerializable);
    },
    clearIssuesCache: (state) => {
      state.issues = [];
    },
  },
});

export const { appendIssueCache, clearIssuesCache, setIssuesCache } =
  issuesSlice.actions;

export default issuesSlice.reducer;
