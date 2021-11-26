import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import {
  Grid,
  Divider,
  Segment,
  Table,
  Button,
  Dropdown,
} from "semantic-ui-react";
import { getCities, getMeasurements } from "../api/api";

const style = {
  h1: {
    marginTop: "3em",
  },
  h2: {
    margin: "4em 0em 2em",
  },
  h3: {
    marginTop: "2em",
    padding: "2em 0em",
  },
  last: {
    marginBottom: "300px",
  },
  container: {
    margin: "20px",
    marginBottom: "35px",
  },
};

async function getCitiesList() {
  return getCities().then((result) => {
    return result.map((city, index) => {
      return {
        key: index,
        text: city.city,
        value: city.city,
      };
    });
  });
}

async function getMeasurmentsList() {
  return getMeasurements().then((result) => {
    return result.map((e) => {
      return {
        city: e.city,
        value: e.value,
        parameter: e.parameter,
        unit: e.unit,
      };
    });
  });
}

function getCityMeasurments(city, measurments = []) {
  return measurments.find((e) => e.city === city);
}

function renderResultsTable(measurments) {
  return measurments ? (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Value</Table.HeaderCell>
          <Table.HeaderCell>Unit</Table.HeaderCell>
          <Table.HeaderCell>Parameter</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{measurments.value}</Table.Cell>
          <Table.Cell>{measurments.unit}</Table.Cell>
          <Table.Cell>{measurments.parameter}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ) : (
    <span>No data found!</span>
  );
}

function onClearButton() {
  //TODO: better implementation for clear button.
  window.location.reload(false);
}

export default function HomeComponent() {
  const [cities, setCities] = useState(null);
  const [measurments, setMeasurments] = useState(null);
  const [firstSelectedCity, setFirstSelectedCity] = useState(null);
  const [secondSelectedCity, setSecondSelectedCity] = useState(null);
  const [onButtonClicked, setOnButtonClicked] = useState(false);
  const [firstCityMeasurments, setFirstCityMeasurments] = useState({});
  const [secondCityMeasurments, setSecondCityMeasurments] = useState({});

  useEffect(() => {
    getCitiesList().then((data) => setCities(data));
  }, []);

  useEffect(() => {
    getMeasurmentsList().then((data) => setMeasurments(data));
  }, []);

  return (
    <div>
      <Container style={style.container}>
        <div>
          <Header as="h2">Air Quality Assessment Tool</Header>
        </div>
      </Container>
      <Container style={style.container}>
        <div>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Divider vertical>VS</Divider>
              <Grid.Column>
                <Dropdown
                  placeholder="Select City"
                  search
                  selection
                  options={cities}
                  onChange={(value) => {
                    setFirstSelectedCity(value.target.innerText);
                    setOnButtonClicked(false);
                  }}
                />
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                  placeholder="Select City"
                  search
                  selection
                  options={cities}
                  onChange={(value) => {
                    setSecondSelectedCity(value.target.innerText);
                    setOnButtonClicked(false);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Container style={style.container}>
            {firstSelectedCity && secondSelectedCity ? (
              <Button
                primary
                onClick={() => {
                  setOnButtonClicked(true);
                  setFirstCityMeasurments(
                    getCityMeasurments(firstSelectedCity, measurments)
                  );
                  setSecondCityMeasurments(
                    getCityMeasurments(secondSelectedCity, measurments)
                  );
                }}
              >
                Compare
              </Button>
            ) : (
              <Button primary disabled>
                Compare
              </Button>
            )}
            <Button secondary onClick={() => onClearButton()}>
              Clear
            </Button>
          </Container>
        </div>
      </Container>
      <Container>
        {onButtonClicked && (
          <Segment placeholder>
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <h3>{firstSelectedCity}</h3>
                  {renderResultsTable(firstCityMeasurments)}
                </Grid.Column>
                <Grid.Column>
                  <h3>{secondSelectedCity}</h3>
                  {renderResultsTable(secondCityMeasurments)}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
      </Container>
    </div>
  );
}
