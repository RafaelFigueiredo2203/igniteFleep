import backIMG from '../../assets/background.png';
import { Button } from '../../components/button';
import { Container, Slogan, Title } from './styles';

export function SignIn() {
  return (
    <Container source={backIMG}>
      <Title>Ignite Fleet </Title>

      <Slogan>
        Gestão de veículos
      </Slogan>

      <Button title="Entrar com o google"/>
    </Container>
  );
}


