import React, { useState, useEffect } from 'react';
import { Metric } from '../../interfaces'; 

import './Dashboard.scss';

const defaultMetricValues: Metric[] = [
  { title: 'CPU Usage', value: NaN, valueUnits: '%', maxValue: 100, graph: [0,0,0,0] },
  { title: 'RAM Usage', value: NaN, valueUnits: 'GB', maxValue: NaN, graph: [0] },
  { title: 'Drive Usage', value: NaN, valueUnits: 'GB', maxValue: NaN, graph: [0] },
  { title: 'Sent/Received Bytes Ratio', value: NaN, valueUnits: '', maxValue: NaN, graph: [0] },
];

const Dashboard: React.FC = () => {
  
  const [metrics, setMetrics] = useState<Metric[]>(defaultMetricValues);

  const sumNumbersInArray = (arr: Array<number>): number => {
    let finalSum: number = 0;
    arr.forEach(num => {finalSum = finalSum + num});
    return finalSum;
  }
  
  useEffect(() => {
    const socket = new WebSocket(`wss://${window.location.hostname}:8080`);

    socket.onmessage = (e: MessageEvent) => {

      let { cpu, memory, drives, network } = JSON.parse(e.data);
      let newMetrics: Metric[] = [
        { title: 'CPU Usage', value: NaN, valueUnits: '%', maxValue: 100, graph: [0,0,0,0] },
        { title: 'RAM Usage', value: NaN, valueUnits: 'GB', maxValue: NaN, graph: [0] },
        { title: 'Drive Usage', value: NaN, valueUnits: 'GB', maxValue: NaN, graph: [0] },
        { title: 'Received/Sent Bytes', value: NaN, valueUnits: 'GB', maxValue: NaN, graph: [] },
      ];

      const cpuUsageValue = ((sumNumbersInArray(cpu.percentage_usage) / cpu.count) * 100) / 100;
      newMetrics[0].value = Math.round((cpuUsageValue + Number.EPSILON) * 100) / 100;
      newMetrics[0].graph = cpu.percentage_usage;
      
      newMetrics[1].value = memory.used;
      newMetrics[1].maxValue = memory.total;
      newMetrics[1].graph = [((100*memory.used) / memory.total)];
  
      newMetrics[2].value = drives.used;
      newMetrics[2].maxValue = drives.total;
      newMetrics[2].graph = [((100*drives.used) / drives.total)];
  
      newMetrics[3].value = Math.round(((network.received / (10 ** 9)) + Number.EPSILON) * 100) / 100;
      newMetrics[3].maxValue = Math.round(((network.sent / (10 ** 9)) + Number.EPSILON) * 100) / 100;
      //newMetrics[3].graph = [Math.round((((network.sent/network.received) * 100) + Number.EPSILON) * 100) / 100];
  
      setMetrics(newMetrics);
    };
  }, [])

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="page-content">
        <div className="quick-overview">

          {metrics.map((metric, index) => (

            <div key={index} className="card-item-small">
              <span className="card-title">{metric.title}</span>
              <div className="heading-line"></div>  
              <div className="info-wrapper">
                <div className="info-value">
                  <span className="value">
                    {metric.value.toString()} 
                    <span className="value-units">{metric.valueUnits}</span>
                  </span>
                  <span className="units">/
                    &nbsp;
                    <span className="value-max">{metric.maxValue.toString()}</span>
                    {metric.valueUnits}
                  </span>
                </div>
                <div className="info-graph">

                  {metric.graph.map((lineValue, index) => (
                    <div key={index} className="graph-line-wrapper">
                      <div className="graph-line" style={{ height: `${lineValue.toString()}%` }}></div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

          ))}

        </div>
      </div>
    </div>
  )
}

export default Dashboard;