'use client'
import { FC, useState, useEffect } from 'react';

type Props = {
  words: string[]
}

const Typewriter: FC<Props> = ({ words }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        setSpeed(100);

        if (text === currentWord) {
          setSpeed(1600);
          setIsDeleting(true);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        setSpeed(50);

        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
          setSpeed(300);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, speed, words]);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span>{text}</span>
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          backgroundColor: '#2196F3',
          marginLeft: '4px',
          animation: 'cursorBlink 0.8s infinite',
        }}
      />
    </div>
  );
}

export default Typewriter;
