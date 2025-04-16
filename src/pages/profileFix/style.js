import styled from "styled-components";

const S = {};

// 전체 페이지 랩퍼
S.PageWrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

// 프레임 랩퍼 (전체 컨테이너)
S.FrameWrapper = styled.div`
  background-color: #ffffff;
  height: 900px;
  width: 1440px;
`;

// 프로필 수정 카드 메인 컨테이너
S.ProfileCard = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 5px 5px 13px #e6e6e6e6, -5px -5px 10px #ffffffe6, 
              5px -5px 10px #e6e6e633, -5px 5px 10px #e6e6e633, 
              inset -1px -1px 2px #e6e6e680, inset 1px 1px 2px #ffffff4c;
  height: 450px;
  left: 500px;
  overflow: hidden;
  position: relative;
  top: 225px;
  width: 440px;
`;

// 헤더 영역 ('프로필 수정' 텍스트가 있는 상단 영역)
S.HeaderArea = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  left: 0;
  padding: 10px;
  position: absolute;
  top: 20px;
  width: 440px;
`;

// 헤더 텍스트 ('프로필 수정')
S.HeaderText = styled.div`
  color: #000000;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

// 닉네임 입력 필드
S.NicknameField = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 50px;
  display: flex;
  gap: 10px;
  height: 48px;
  left: 20px;
  padding: 14px 0px 14px 20px;
  position: absolute;
  top: 210px;
  width: 400px;
`;

// 입력 가이드 텍스트 ('2-10자 이내')
S.GuideText = styled.div`
  color: #aaaaaa;
  font-family: "Pretendard-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

// 수정 완료 버튼
S.SubmitButton = styled.div`
  align-items: center;
  background-color: #5784e1;
  border-radius: 26px;
  display: flex;
  gap: 14px;
  height: 48px;
  justify-content: center;
  left: 20px;
  padding: 10px 14px;
  position: absolute;
  top: 278px;
  width: 400px;
`;

// 버튼 텍스트 ('수정 완료')
S.ButtonText = styled.div`
  color: #ffffff;
  font-family: "Pretendard-Bold", Helvetica;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.50px;
  line-height: normal;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
`;

// 프로필 이미지 영역
S.ProfileImageArea = styled.div`
  height: 120px;
  left: 160px;
  position: absolute;
  top: 70px;
  width: 120px;
`;

// 카메라 아이콘 래퍼 (프로필 사진 변경 아이콘)
S.CameraIconWrapper = styled.div`
  background-color: #ffffff;
  border: 0.5px solid;
  border-color: #dddddd;
  border-radius: 13px;
  height: 26px;
  left: 86px;
  position: relative;
  top: 94px;
  width: 26px;
  
  .camera-icon {
    height: 23px;
    left: 1px;
    position: absolute;
    top: 1px;
    width: 23px;
  }
`;

// 회원 탈퇴 영역
S.WithdrawalArea = styled.div`
  align-items: center;
  display: inline-flex;
  gap: 14px;
  justify-content: center;
  left: 177px;
  padding: 10px 14px;
  position: absolute;
  top: 391px;
`;

// 회원 탈퇴 텍스트
S.WithdrawalText = styled.div`
  color: #888888;
  font-family: "Pretendard-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.50px;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  text-decoration: underline;
  white-space: nowrap;
  width: fit-content;
`;

export { S };