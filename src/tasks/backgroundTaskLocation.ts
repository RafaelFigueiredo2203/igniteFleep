import { Accuracy, hasStartedLocationUpdatesAsync, startLocationUpdatesAsync, stopLocationUpdatesAsync } from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { removeStorageLocation, saveStorageLocation } from '../libs/asyncStorage/locationStorage';

export const BACKGORUND_TASK_NAME = 'location-tracking'

TaskManager.defineTask(BACKGORUND_TASK_NAME, async ({ data, error }: any) => {
  try {
    if(error){
      new error;
    }

    if(data){

  const {coords, timestamp}  = data.locations[0];
  
  const currentLocation = {
    latitude: coords.latitude,
    longitude: coords.longitude,
    timestamp,
  }

  await saveStorageLocation(currentLocation)
    }
  } catch (error ) {
      console.log(error)
      stopLocationTask();
  }
})

export async function startLocationTask(){
  try {
    const hashStarted = await hasStartedLocationUpdatesAsync(BACKGORUND_TASK_NAME)

    if(!hashStarted){
      await startLocationTask()
    }

    await startLocationUpdatesAsync(BACKGORUND_TASK_NAME,{
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    })
  } catch (error) {
    console.log(error)
  }
}

export async function stopLocationTask(){
  try {
    const hashStarted = await hasStartedLocationUpdatesAsync(BACKGORUND_TASK_NAME)

    if(hashStarted){
      await stopLocationUpdatesAsync(BACKGORUND_TASK_NAME)
      await removeStorageLocation()
    }


  } catch (error) {
    console.log(error)
  }
}