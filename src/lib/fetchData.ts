import { createAsyncThunk } from "@reduxjs/toolkit";

export type LoadingStatus = "idle" | "pending" | "success" | "error";
