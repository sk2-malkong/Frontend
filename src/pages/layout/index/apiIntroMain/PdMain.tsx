import React from "react";
import S from "./style";
import banerTitleImg from './banertitle.png';
import LockIcon from "../ActionIcons/LockIcon/LockIcon";
import FileIcon from "../ActionIcons/FileIcon/FileIcon";
import PrinterIcon from "../ActionIcons/PrinterIcon/PrinterIcon";

const PdMain: React.FC = () => {
    return (
        <S.FrameContainer>
            <S.InnerDiv>
                <S.Overlap>
                    <S.OverlayEffect className="overlay-1" />
                    <S.InnerDiv2>
                        <S.Group2 className="group2">
                            <S.ImageWrapper className="image-wrapper">
                                <S.Image
                                    src={banerTitleImg}
                                    alt="비속어 필터링 서비스"
                                    className="small"
                                />
                            </S.ImageWrapper>
                            <S.TextWrapper className="text-wrapper">
                                비속어 필터링 서비스 개발자센터에 오신 것을 환영합니다.
                            </S.TextWrapper>
                            <S.P className="text-p">세로운 기회와 가치를 함께 만들어봐요.</S.P>
                        </S.Group2>
                        {/*<S.Rectangle className="rectangle" />*/}
                        <PrinterIcon/>
                    </S.InnerDiv2>
                </S.Overlap>

                <S.MiddleSection>
                    <S.Overlap3>
                        <S.OverlayEffect className="overlay-2" />
                        <S.Group3 />
                        <S.TextWrapper2>제품 소개</S.TextWrapper2>
                        <S.TextWrapper3>
                            제품 특징을 알려줄게요.
                        </S.TextWrapper3>

                        {/* 자물쇠 아이콘 컴포넌트 사용 */}
                        <LockIcon />

                    </S.Overlap3>

                    <S.Overlap2>
                        <S.OverlayEffect className="overlay-3" />
                        <S.TextWrapper2>API 키 소개</S.TextWrapper2>
                        <S.TextWrapper3>
                            API 키에 대한 제세한 소게입니다.
                        </S.TextWrapper3>

                        {/* 파일 아이콘 컴포넌트 사용 */}
                        <FileIcon />

                    </S.Overlap2>
                </S.MiddleSection>

                <S.DivWrapper>
                    <S.TextWrapper5>푸터 페이지</S.TextWrapper5>
                </S.DivWrapper>
            </S.InnerDiv>
        </S.FrameContainer>
    );
};

export default PdMain;