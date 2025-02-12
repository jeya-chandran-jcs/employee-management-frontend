import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {

    searchQuery: string;
}

const initialState: EmployeeState = {
    searchQuery: "",
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setSearchQuery } = employeeSlice.actions;
export default employeeSlice.reducer;
