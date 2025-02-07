import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
    name: string;
    email: string;
    department: string;
    _id: string;
    role: string;
}

interface EmployeeState {
    employees: Employee[];
    searchQuery: string;
}

const initialState: EmployeeState = {
    employees: [],
    searchQuery: "",
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<Employee[]>) => {
            state.employees = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setEmployees, setSearchQuery } = employeeSlice.actions;
export default employeeSlice.reducer;
