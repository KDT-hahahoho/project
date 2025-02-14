import Button from '@components/common/Button';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import React, { useState, useEffect } from 'react';
import subImage from '@assets/Images/subfertility.svg';

interface SetupSubfertilityProps {
  onNext: () => void;
  value: string;
  onChange: (value: string) => void;
}

const SetupSubfertility = ({ onNext, value, onChange }: SetupSubfertilityProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(value || null);

  useEffect(() => {
    if (value !== selectedOption) {
      setSelectedOption(value || null);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    onChange(newValue);
  };

  const isButtonEnabled = selectedOption !== null;

  return (
    <SubfertilityContainer>
      <SubfertilityDescription>진단 여부에 따른 맞춤형 관리를 도와드려요</SubfertilityDescription>
      <ImageSubfertility src={subImage} alt="난임 진단여부 장식 이미지" />

      <SubfertilityCheckboxContainer>
        <Label>
          <SubfertilityCheckbox
            type="radio"
            name="subfertility"
            value="true"
            checked={selectedOption === 'true'}
            onChange={handleChange}
          />
          네, 진단을 받았어요.
        </Label>
        <Label>
          <SubfertilityCheckbox
            type="radio"
            name="subfertility"
            value="false"
            checked={selectedOption === 'false'}
            onChange={handleChange}
          />
          아니요, 진단은 받지 않았어요.
        </Label>
      </SubfertilityCheckboxContainer>

      <Button text="다음" type="submit" size="large" fixed={true} onClick={onNext} disabled={!isButtonEnabled} />
    </SubfertilityContainer>
  );
};

const SubfertilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
`;

const SubfertilityDescription = styled.p`
  font-size: ${variables.size.big};
`;

const ImageSubfertility = styled.img`
  width: 100%;
  height: 27rem;
`;

const SubfertilityCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubfertilityCheckbox = styled.input`
  margin-right: 0.5rem; /* 라디오 버튼과 텍스트 사이의 간격 조정 */
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default SetupSubfertility;
