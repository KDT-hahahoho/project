import variables from '@styles/Variables';
import React, { useState } from 'react';
import ECharts from 'echarts-for-react';
import useAnalysisStore from '@store/useAnalysisStore';
import styled from '@emotion/styled';

// interface StressData {
//   value: number | string;
//   color: string;
// }

export const StressText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .stress-box {
    width: 100%;
    height: 18rem;
  }

  .stress-sub-text {
    font-size: 1.5rem;
    font-weight: 500;
    color: ${variables.colors.gray100};
    margin: -2rem 0 3rem;
  }
`;

const EmotionStress = () => {
  const analysisResult = useAnalysisStore((state) => state.analysis);
  console.log(analysisResult);
  const dataValue = analysisResult.prediction.totalScore * 0.5;
  console.log(dataValue);

  // const data: StressData[] = [
  //   {
  //     value: `${analysisResult.prediction.totalScore}`,
  //     color: `${variables.colors.primary}`,
  //   },
  // ];

  const [options] = useState({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        color: `${variables.colors.primaryStrong}`,

        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: `${variables.colors.primaryStrong}`,
          },
        },
        axisLine: {
          lineStyle: {
            width: 12,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: [
          {
            value: dataValue,
          },
        ],
        detail: {
          fontSize: 22,
          color: `${variables.colors.primary}`,
          formatter: '{value}',
          offsetCenter: ['0', '0%'],
        },
        radius: '60%',
        clockwise: false,
      },
    ],

    max: 10,
  });

  return (
    <StressText>
      <div className="stress-box">
        <ECharts option={options} opts={{ width: 170, height: 170 }} />
      </div>
      <p className="stress-sub-text">현재 예상 점수</p>
    </StressText>
  );
};

export default EmotionStress;
