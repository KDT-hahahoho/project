import useAnalysisStore from '@store/useAnalysisStore';
import variables from '@styles/Variables';
import ECharts from 'echarts-for-react';
import React, { useState } from 'react';

interface EmotionData {
  value: number;
  name: string;
  color: string;
}

const EmotionGraph: React.FC = () => {
  const analysisResult = useAnalysisStore((state) => state.analysis);

  const data: EmotionData[] = [
    { value: analysisResult.emotions.anger, name: '분노', color: `#FFD4CB` },
    { value: analysisResult.emotions.disgust, name: '혐오', color: `#E6E6E6` },
    { value: analysisResult.emotions.fear, name: '공포', color: `#FEE9CA` },
    { value: analysisResult.emotions.joy, name: '기쁨', color: `${variables.colors.primaryStrong}` },
    { value: analysisResult.emotions.sadness, name: '슬픔', color: `#E2F2FF` },
    { value: analysisResult.emotions.surprise, name: '놀람', color: `${variables.colors.secondarySoft}` },
  ];

  const [options] = useState({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'verticla',
      top: '5%',
      right: 0,
      icon: 'circle',
      itemWidth: 20,
      itemHeight: 20,
      padding: [40, 35, 0, 0],
    },
    series: [
      {
        data: data.map((v) => ({
          value: v.value,
          name: v.name,
          itemStyle: {
            color: v.color,
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2,
          },
        })),
        type: 'pie',
        pointer: {
          show: false,
        },

        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        clockwise: true,
        left: '-20%',
      },
    ],
  });

  return (
    <div className="BarChartDiv">
      <ECharts option={options} opts={{ width: 'auto', height: 'auto' }} />
    </div>
  );
};

export default EmotionGraph;
