import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Define a type for the paste
interface Paste {
  _id: string; // Add other properties as needed
  // additional properties can be added here
}

// Define a type for the initial state
interface PasteState {
  pastes: Paste[];
}

// Set the initial state using local storage
const initialState: PasteState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes") as string)
    : [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action: PayloadAction<Paste>) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        // If the paste already exists, show an error
        toast.error("Paste already exists");
        return;
      }
      // If the paste is new, add it to the pastes
      state.pastes.push(paste);

      // Update local storage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      // Show success toast
      toast.success("Paste added");
    },

    updatePastes: (state, action: PayloadAction<Paste>) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        // If the paste is found, update it
        state.pastes[index] = paste;
        // Update local storage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        // Show success toast
        toast.success("Paste updated");
      }
    },

    removeFromPastes: (state, action: PayloadAction<string>) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        // If the paste is found, remove it
        state.pastes.splice(index, 1);
        // Update local storage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        // Show success toast
        toast.success("Paste deleted");
      }
    },

    resetPaste: (state) => {
      state.pastes = [];
      // Clear local storage
      localStorage.removeItem("pastes");
    },
  },
});

// Export the actions and reducer
export const { addToPastes, removeFromPastes, updatePastes, resetPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
