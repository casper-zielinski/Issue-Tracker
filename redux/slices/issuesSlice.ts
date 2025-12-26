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
      if (!state.issues.includes(action.payload.issue as IssueSerializable)) {
        state.issues.push(action.payload.issue as IssueSerializable);
      }
    },
    clearIssuesCache: (state) => {
      state.issues = [];
    },
    editIssue: (state, action) => {
      const index = state.issues.findIndex(
        (issue) => issue.id === action.payload.id
      );
      state.issues[index] = action.payload;
    },
  },
});

export const { appendIssueCache, clearIssuesCache, setIssuesCache, editIssue } =
  issuesSlice.actions;

export default issuesSlice.reducer;
