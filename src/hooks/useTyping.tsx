import { useState, useEffect } from 'react';

const TypingEffect = ({ text, container }: { text: string; container: HTMLDivElement }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      } else {
        clearInterval(interval); // 타이핑이 끝나면 정지
      }
    }, 50);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [text, index, container]);

  return <p>{displayedText}</p>;
};

export default TypingEffect;
