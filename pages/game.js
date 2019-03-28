import React from 'react';
import styled from 'styled-components';
import Head from '../components/head';
import Nav from '../components/nav';
import api from '../api';
import Page from '../components/Page';

const GamePageStyles = styled.div``;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  padding-bottom: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
`;

const Title = styled.h1`
  margin: 0;
`;

const GameDetails = styled.div`
  /* padding: 10px 0; */
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  margin: 20px 0;
`;

const Label = styled.span`
  font-weight: 700;
`;

const DetailSection = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

  :last-child {
    border-bottom: 0;
  }
`;

const calcGameLength = (minimum, max) => {
  // if min and max are the same, don't show twice
  if (minimum === max) {
    return `${minimum} min`;
  }

  return `${minimum} min - ${max} min`;
};

const groupBy = (data, key) => {
  const result = {};

  data.forEach(item => {
    if (result[item.$.type]) {
      result[item.$.type].push(item.$);
    } else {
      result[item.$.type] = [item.$];
    }
  });

  return result;
};

const GamePage = ({ game }) => {
  console.log(groupBy(game.link, 'type'));
  return (
    <GamePageStyles>
      <Head title="Home" />
      <Nav />

      <Page>
        <Grid>
          <Image src={game.image[0]} alt={game.name[0].$.value} />
          <div>
            <Title>{game.name[0].$.value}</Title>
            <small>({game.yearpublished[0].$.value})</small>
            <GameDetails>
              <DetailSection>
                <Label> Players: </Label> {game.minplayers[0].$.value} -{' '}
                {game.maxplayers[0].$.value}
              </DetailSection>
              <DetailSection>
                <Label> Game Length: </Label>{' '}
                {calcGameLength(
                  game.minplaytime[0].$.value,
                  game.maxplaytime[0].$.value
                )}
              </DetailSection>
              <DetailSection>
                <Label>Complexity: </Label>{' '}
                {game.statistics[0].ratings[0].averageweight[0].$.value} / 5
              </DetailSection>
            </GameDetails>
            <p dangerouslySetInnerHTML={{ __html: game.description[0] }} />
          </div>
        </Grid>
      </Page>
    </GamePageStyles>
  );
};

GamePage.getInitialProps = async ({ query }) => {
  const game = await api.get(query.id);
  return {
    game,
  };
};

export default GamePage;
