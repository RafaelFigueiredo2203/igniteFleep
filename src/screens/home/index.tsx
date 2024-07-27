import { Container } from './styles';

import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';

export function Home() {
  return (
    <Container>
      <HomeHeader />

      <Content>
      <CarStatus/>
      </Content>
    </Container>
  );
}