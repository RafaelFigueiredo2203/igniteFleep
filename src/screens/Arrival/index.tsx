import { useNavigation, useRoute } from '@react-navigation/native';
import { X } from 'phosphor-react-native';
import React from 'react';
import { Alert } from 'react-native';
import { BSON } from 'realm';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Container, Content, Description, Footer, Label, LicensePlate } from './styles';

type RouteParamsProps = {
  id:string
}

export function Arrival() {

  const route = useRoute();
  const {id} = route.params as RouteParamsProps

  const historic = useObject(Historic, new BSON.UUID(id))
  const realm = useRealm()
  const {goBack} = useNavigation()

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

  function removedVehicleUsage(){
    realm.write(() => {
      realm.delete(historic);
    });
    goBack()
  }


  return (
    <Container>
      <Header title="Chegada"/>
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

      <Footer>
        <ButtonIcon
        icon={X}
        onPress={handleRemoveVehicleUsage}
        />
        <Button title="Registrar chegada"/>
      </Footer>

      </Content>
    </Container>
  )
}