import { useAuth } from "@clerk/expo";
import { Stack } from "expo-router";

export default function HomeLayout() {
  const { isLoaded } = useAuth();

  if (!isLoaded) return;

  return <Stack screenOptions={{ headerShown: false }} />;
}
