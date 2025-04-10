import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const Index = () => {
    const navigate = useNavigate();
  
    const handleclick = () => {
      navigate('/main');
    };

  return (
    <S.Wrapper>
    {/* 배경 애니메이션 */}
    <S.BackgroundAnimation />

    {/* 메인 텍스트 */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <S.Title>욕설은 NO! 건강한 인터넷 문화를 만들어봐요</S.Title>
    </motion.div>

    {/* 설명 */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <S.Description>
        AI가 댓글과 게시글을 분석하여 욕설 사용을 실시간으로 보여줍니다.
      </S.Description>
    </motion.div>

    {/* 수치 애니메이션 */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <S.Count>
        <CountUp end={23} duration={2} />
        <span className="text-xl ml-2">회</span>
      </S.Count>
    </motion.div>

    {/* 시작 버튼 */}
    <motion.div whileHover={{ scale: 1.1 }}>
      <S.Button onClick={handleclick}>메인 페이지로</S.Button>
    </motion.div>
  </S.Wrapper>
  );
};

export default Index;
