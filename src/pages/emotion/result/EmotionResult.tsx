import styled from '@emotion/styled';
import useAnalysisStore from '@store/useAnalysisStore';
import variables from '@styles/Variables';
import EmotionGraph from './EmotionGraph';
import EmotionStress from './EmotionStress';
import ECharts from 'echarts-for-react';
// import Footer from '@components/common/Footer';
// import { useEffect, useState } from 'react';
import Button from '@components/common/Button';
import { useNavigate } from 'react-router-dom';
import usePrevRecordStore from '@store/usePrevRecordStore';
import useEmotionStore from '@store/useEmotionStore';
import EmotionStressBefore from './EmotionStressBefore';

const EmotionResult = () => {
  const name = localStorage.getItem('userName');
  const analysisResult = useAnalysisStore((state) => state.analysis);
  const prevRecord = usePrevRecordStore((state) => state.record);
  const resetEmotion = useEmotionStore((state) => state.reset);
  const resetAnalysisResult = useAnalysisStore((state) => state.reset);
  const resetPrevRecord = useAnalysisStore((state) => state.reset);
  const navigate = useNavigate();

  const handleClick = () => {
    resetEmotion();
    resetAnalysisResult();
    resetPrevRecord();
    navigate('/');
  };

  console.log(prevRecord);
  console.log(analysisResult);

  const option = {
    radar: {
      indicator: [
        { name: '사회적' },
        { name: '성적' },
        { name: '필요성' },
        {
          name: `아이가 없는
일상에대한 거부`,
        },
        { name: '관계적' },
      ],
      splitLine: {},
      axisLine: {},
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [
              prevRecord.social,
              prevRecord.sexual,
              prevRecord.essential,
              prevRecord.refusing,
              prevRecord.relational,
            ],
            name: 'Allocated Budget',
            itemStyle: {
              color: variables.colors.secondaryStrong,
            },
          },
          {
            value: [
              analysisResult.prediction.social,
              analysisResult.prediction.sexual,
              analysisResult.prediction.essential,
              analysisResult.prediction.refusing,
              analysisResult.prediction.relational,
            ],

            name: 'Actual Spending',
            itemStyle: {
              color: variables.colors.primary,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <ResultSection>
        <ResultTitleBox>
          <ResultTextBox>
            <h2>오늘 {name}님의 예상감정</h2>
            <pre>위시와 대화한 내용으로 분석되었어요</pre>
          </ResultTextBox>
          <WishImage src="/src/assets/Images/emotionResultSad.svg" alt="감정분석가 위시" />
        </ResultTitleBox>

        <EmotionGraphContainer>
          <EmotionGraph />
        </EmotionGraphContainer>
        <ResultTextBox>
          <pre>난임 스트레스 예상점수</pre>
        </ResultTextBox>

        <EmotionGraphContainer>
          <div className="flex-box">
            <EmotionStressBefore total={prevRecord.total} />
            <EmotionStress />
          </div>
        </EmotionGraphContainer>

        <EmotionGraphContainer>
          <ChartCover>
            <ECharts option={option} />
          </ChartCover>
        </EmotionGraphContainer>
      </ResultSection>

      <Button
        onClick={handleClick}
        fixed={true}
        disabled={false}
        type="submit"
        size="medium"
        text="메인화면으로 이동"
      />
    </>
  );
};

export default EmotionResult;

export const ResultSection = styled.section`
  height: 100%;
  margin: calc(-1 * ${variables.layoutPadding});
  padding: ${variables.layoutPadding};
  margin-bottom: -4rem;
  padding-bottom: 4rem;
  background-color: ${variables.colors.gray5};
  display: flex;
  flex-direction: column;
`;

export const ResultTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ResultTextBox = styled.div`
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 3rem;

  & > h2 {
    font-size: ${variables.size.large};
    font-weight: 500;
  }

  & > pre {
    font-size: ${variables.size.big};
    color: ${variables.colors.gray100};
    margin-top: 1rem;
  }
`;

export const WishImage = styled.img`
  width: 11rem;
  margin-bottom: 0;
`;

export const EmotionGraphContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  & > div {
    background-color: #ffffff;
    border-radius: 1rem;
    border: 1px solid ${variables.colors.gray10};
    box-shadow: 0px 0px 4px rgba(217, 203, 245, 0.3);
  }

  //난임스트레스 예상점수 도표
  .flex-box {
    display: flex;
  }
`;

const ChartCover = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 5rem;
`;
