import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_ASYNC_KEY = '@igniteFleet:last_sync'

export async function saveLastSyncTimestamp(){
  const timestamp = new Date().getTime();
  await AsyncStorage.setItem(STORAGE_ASYNC_KEY, timestamp.toString())
}

export async function getLastAsyncTimestamp(){
  const response = await AsyncStorage.getItem(STORAGE_ASYNC_KEY);

  return Number(response)
}