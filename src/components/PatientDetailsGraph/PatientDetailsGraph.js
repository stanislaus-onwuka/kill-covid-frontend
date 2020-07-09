import React from "react";
import {
  VictoryChart,
  VictoryArea,
  VictoryScatter,
  VictoryAxis
} from "victory";
import subDays from 'date-fns/subDays'
import format from 'date-fns/format';
import './PatientDetailsGraph.css';


const PatientDetailsGraph = () => {
  const sampleData = [
    { x: 1, y: 39 },
    { x: 2, y: 38 },
    { x: 3, y: 40.2 },
    { x: 4, y: 37 },
    { x: 5, y: 36.5 },
    { x: 6, y: 36.5 }
  ];
  const lowestTemp = Math.min(...sampleData.map(item => Math.floor(item.y)));
  const highestTemp = Math.max(...sampleData.map(item => Math.ceil(item.y)));

  // compute list of days in proper format for x-axis on graph
  const days = [];
  const today = new Date();
  for (let i = (sampleData.length - 1); i > 0 ; i--) {
    days.push(format(subDays(today, i), "d/M"));
  };
  days.push(format(today, "d/M"));

  const isTempNormal = temp => {
    const highBound = 37.5;
    const lowBound = 36;

    if (temp >= lowBound && temp <= highBound) {
      return true;
    };
    return false;
  };

  const range = (low, high) => {
    let i = low + 1;
    let result = [low];

    while(i < high) {
      result.push(i++);
    };
    return result;
  };

  return (
    <div className="patient_graph-container">
      <div className="patient_graph-item">
        <VictoryChart domainPadding={[30, 0]}>
          <VictoryAxis tickValues={days}/>
          <VictoryAxis
            dependentAxis
            tickValues={range(lowestTemp, highestTemp + 1)}
          />
          <VictoryArea
            data={sampleData}
            domain={{x: [1, 6], y: [lowestTemp, highestTemp]}}
            style={{
              data: {
                fill: '#e1f5f1'
              }
            }}
          />
          <VictoryScatter
            data={sampleData}
            style={{
              data: {
                fill: ({ datum }) => isTempNormal(datum.y) ? '#407ac7' : '#ce3030'
              }
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default PatientDetailsGraph;
