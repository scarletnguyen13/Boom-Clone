import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import grass from '../../images/grass.png';
import rock from '../../images/rock.jpg';

import './Map.css';
import { Character } from '..';

const MAP_SIZE = 8;

const generateRandom = () => {
  var random_integer = Math.floor(Math.random()*101);
  if (random_integer % 2 === 0)  return "G";
  else                           return "R";
}

const layout: (object)[] = [];

const Map: React.FC = () => {
  const { height, width } = useWindowDimensions();
  const items: (string)[][] = new Array(MAP_SIZE).fill(0).map(() => new Array(MAP_SIZE).fill(0));;
  items[0][0] = "C";
  items[0][1] = "G";
  items[1][0] = "G";
  items[1][1] = "G";

  for (let r = 0; r < MAP_SIZE; r++) {
    for (let c = 0; c < MAP_SIZE; c++) {
      layout.push({i: r + "-" + c, x: 0, y: 0, w: 1, h: 1});
      if ((r === 0 && c === 0) ||
          (r === 0 && c === 1) ||
          (r === 1 && c === 0) ||
          (r === 1 && c === 1)) continue;

      items[r][c] = generateRandom();
    }
  }

  const chooseCell = (str: String) => {
    if      (str === "C") { return (<Character width  = {MAP_SIZE  * 85} 
                                               height = {MAP_SIZE * 85}
                                               map    = {items} />) }
    else if (str === "R") { return (<img src={rock} style={{width: 85, height: 85}}/>); }
    else if (str === "G") { return (<img src={grass} style={{width: 85, height: 85}}/>); }
  }
  
  return (
    <div className="map-container" style={{width: height, height: height}}>
      <Container fluid>
        <Row align="center" style={{marginLeft: 0}}>
          {
          items[0].map((row, index) => {
            return items.map((column) => {
              return chooseCell(column[index])
            })
          })
          }
        </Row>
      </Container>
    </div>
  );
}

export default Map;
