/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface PageTitleHeaderProps {
  currentStep: string;
}

const PageTitleHeader = ({ currentStep }: PageTitleHeaderProps) => {
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    const generatedContent = (step: string) => {
      switch (step) {
        case '이름 입력':
          setPageName('이름을 입력해주세요');
          break;
        case '주민등록번호 입력':
          setPageName('주민등록번호를 입력해주세요');
          break;
        case '이메일 입력':
          setPageName('이메일을 입력해주세요');
          break;
        case '비밀번호 입력':
          setPageName('비밀번호를 입력해주세요');
          break;
        default:
          setPageName('');
      }
    };

    generatedContent(currentStep);
  }, [currentStep]);

  return <PageTitle>{pageName}</PageTitle>;
};

export default PageTitleHeader;

const PageTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 3.8rem;
`;
