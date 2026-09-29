import { useSyncExternalStore } from "react";
import { getAuthSnapshot, subscribe } from "../store/authStore";

export default function useAuth() {
  return useSyncExternalStore(subscribe, getAuthSnapshot, getAuthSnapshot);
}