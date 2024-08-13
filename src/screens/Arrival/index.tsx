import { useNavigation, useRoute } from '@react-navigation/native';
import { X } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { LatLng } from 'react-native-maps';
import { BSON } from 'realm';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Map } from '../../components/Map';
import { getStorageLocation } from '../../libs/asyncStorage/locationStorage';
import { getLastAsyncTimestamp } from '../../libs/asyncStorage/syncStorage';
import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { stopLocationTask } from '../../tasks/backgroundTaskLocation';
import { AsyncMessage, Container, Content, Description, Footer, Label, LicensePlate } from './styles';

type RouteParamsProps = {
  id:string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([])

  const route = useRoute();
  const {id} = route.params as RouteParamsProps

  const historic = useObject(Historic, new BSON.UUID(id))
  const realm = useRealm()
  const {goBack} = useNavigation()
  const title = historic?.status === 'arrival' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleUsage(){
    Alert.alert(
      'Cancelar',
      'Cancelar a utilização do veículo?',
      [
        {text: 'Não', style: 'cancel'},
        {text:'Sim', onPress:() =>  removedVehicleUsage()}
      ]
    )
  }

  async function removedVehicleUsage(){
    realm.write(() => {
      realm.delete(historic);
    });
    await stopLocationTask();
    goBack()
  }

 async function handleArrivalRegister(){
   try {
    if(!historic){
      return Alert.alert('Erro', 'Não foi possível obter os dados para registrar a chegada do veículo')
    }

      const locations = await getStorageLocation();

    
    realm .write(() => {
      historic.status = 'arrival',
      historic.updated_at = new Date();
      historic.coords.push(...locations)
   });

   await stopLocationTask();

   Alert.alert('Chegada', 'Chegada registrada com sucesso')

   goBack()

   } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a chegada.')
   }
  }

  async function getLocationInfo(){
    if(!historic){
      return;
    }

    const lastSync = await getLastAsyncTimestamp()
    const updatedAt = historic!.updated_at.getTime()

    setDataNotSynced(updatedAt > lastSync)

    if(historic?.status === 'departure') {
      const locationsStorage = await getStorageLocation();
      setCoordinates(locationsStorage);
    } else {
      setCoordinates(historic?.coords ?? []);
    }


  }

  
  useEffect(() => {
    getLocationInfo()
  },[historic])

  return (
    <Container>
      <Header title={title}/>

      {
        coordinates.length > 0 && 
        <Map coordinates={coordinates}/>
      }
      <Content>
      <Label>
      Placa do veículo
      </Label>

      <LicensePlate>
        {historic?.license_plate}
      </LicensePlate>

      <Label>
      Finalidade
      </Label>

      <Description>
      {historic?.description}
      </Description>

   

      </Content>
      {
        historic?.status === 'departure' &&
        <Footer>
          <ButtonIcon 
            icon={X} 
            onPress={handleRemoveVehicleUsage}
          />

          <Button 
            title='Registrar chegada' 
            onPress={handleArrivalRegister}
          />
        </Footer>
        }
        {
          dataNotSynced && 
          <AsyncMessage>
            Sincronização da {historic?.status === 'departure'? "partida" : "chegada"} pendente
          </AsyncMessage>
        }
    </Container>
  )
}