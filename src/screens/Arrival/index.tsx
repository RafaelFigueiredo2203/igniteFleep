import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Container } from './styles';

type RouteParamsProps = {
  id:string
}

export function Arrival() {

  const route = useRoute();
  const {id} = route.params as RouteParamsProps

  console.log(id)
  return (
    <Container>

    </Container>
  )
}