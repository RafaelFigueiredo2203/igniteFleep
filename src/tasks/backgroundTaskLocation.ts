import * as TaskManager from 'expo-task-manager';

export const BACKGORUND_TASK_NAME = 'location-tracking'

TaskManager.defineTask(BACKGORUND_TASK_NAME, async ({ data, error }: any) => {
  try {
    if(error){
      new error;
    }

  const {coords, timestamp}  = data.locations[0];
  
  const currentLocation = {
    latitude: coords.latitude,
    longitude: coords.longitude,
    timestamp,
  }

  console.log(currentLocation)

  } catch (error ) {
      console.log(error)
  }
})