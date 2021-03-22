import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, Button, Text, Box, Heading, Flex } from "theme-ui";
import Chart from 'chart.js';
import {
  Percent,
  MINIMUM_COLLATERAL_RATIO,
  CRITICAL_COLLATERAL_RATIO,
  Trove
} from "@liquity/lib-base";
import { BlockPolledLiquityStoreState } from "@liquity/lib-ethers";
import { useLiquitySelector } from "@liquity/lib-react";
import { useLiquity } from "../hooks/LiquityContext";

type RiskiestTrovesProps = {
  pageSize: number;
};

const select = ({ numberOfTroves, price, blockTag }: BlockPolledLiquityStoreState) => ({
  numberOfTroves,
  price,
  blockTag
});

export const RiskiestTrovesChart = (props: any) => {
  const chartRef = useRef(null);
  const { blockTag, numberOfTroves, price } = useLiquitySelector(select);
  const { liquity } = useLiquity();

  useEffect(() => {
    const canvas = chartRef.current as any;
    const ctx = canvas.getContext('2d');

    liquity
      .getTroves(
        {
          first: 100,
          sortedBy: "ascendingCollateralRatio",
          startingAt: 0
        },
        { blockTag }
      )
      .then((troves: [address: string, trove: Trove][]) => {
        // console.log(troves[0][1].collateralRatio(price).prettify(4));
        //    console.log(troves[0][1].collateral.prettify(0)) 
        drawChart(price, ctx, troves);
      });

  }, [drawChart]);

  return (
    <Card sx={{ height: "460px", width: "100%" }}>
      <h4 style={{color: "#ff4339", margin: 0}}>Riskiest Troves</h4>
      <canvas id="myScatterChart" ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </Card>
  );
};

const drawChart = (price: any, ctx: any, troves: [address: string, trove: Trove][]) => {

  // create the chart data
  const data = troves.map((k: [address: string, trove: Trove]) => ({
    label: "Sushmit",
    x: +k[1].collateral.prettify(4),
    y: +k[1].debt.prettify(4)
  }));

  const scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      labels: ["Label 1", "Label 2", "Label 3"],
      datasets: [{
        label: 'Riskiest Troves',
        backgroundColor: '#ff4339',
        // pointBackgroundColor: (context: any) => {
        //     const index = context.dataIndex;
        //     const value = context.dataset.data[index];
        //     const ratio = +troves[index][1].collateralRatio(price).prettify(4);
        //     return ratio < 0.55 ? '#ff0000' : '#0000ff';
        // },
        pointRadius: (context: any) => {
            const index = context.dataIndex;
            const ratio = +troves[index][1].collateralRatio(price).prettify(4);
            const radius = ratio < 0.55 ? 5 : 10;
            return radius;
        },
        data
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom'
        }]
      },
      layout: {
        padding: {
          left: 10,
          right: 20,
          top: 10,
          bottom: 10
        }
      },
      tooltips: {
        callbacks: {
           label: (tooltipItem: any, data: any) => {
              const label = data.labels[tooltipItem.index];
              return `
                <p>Collateral: ${tooltipItem.xLabel}</p>
                <p>Debt: ${tooltipItem.yLabel}</p>
              `;
           }
        }
     }
    }
  });
};

export default RiskiestTrovesChart;