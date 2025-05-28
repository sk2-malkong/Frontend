import React, { useState, useRef, useEffect } from 'react';
import styled  from 'styled-components';
import {
  GlobalStyle,
  Background as BaseBackground,
  SectionSplit,
  Left,
  Right,
  DropContainer,
  TopCenterDrop,
  BottomLeftDrop,
  BottomRightDrop,
  DropKey,
  ExpandPosition,
  FloatingIcon,
  Title,Text,
  NumberLabel,
  Divider,
  DropWrapper,
} from './detailstyle';
import { Link } from 'react-router-dom';

const Background = styled(BaseBackground)`
  &::before {
    background: var(--expand-color, #ffd700);
  }
`;
interface DetailSecondSectionProps {
  active: boolean;
}

const DetailSecondSection: React.FC<DetailSecondSectionProps> = ({ active })=> {
  const [activeDrop, setActiveDrop] = useState<DropKey>('none');
  // 현재 화면에 표시할 Drop 키
  const [displayDrop, setDisplayDrop] = useState<DropKey>('none');
  const [hasMounted, setHasMounted] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [expandPosition, setExpandPosition] = useState<ExpandPosition | undefined>(undefined);
  const [initialPosition, setInitialPosition] = useState<ExpandPosition | undefined>(undefined);
  const [mouseTracking, setMouseTracking] = useState(false);
  const hoverTimers = useRef<Partial<Record<DropKey, number>>>({});
  const hoverKey = useRef<number>(0); // ✅ 가장 최신 hover를 추적하기 위한 키
  useEffect(() => {
    if (active) {
      setActiveDrop('none');
      setDisplayDrop('none');
      setShowContent(true);
      setInitialPosition(undefined);
      setExpandPosition(undefined);
      setMouseTracking(false);
    }
  }, [active]);
  const contentMap: Record<DropKey, { title: string; text: string }> = {
    none: {
      title: '다양한 소셜 환경에서 사용할 수 있습니다.',
      text: '물방울을 눌러 직접 체험해보세요.'
    },
    top: {
      title: '실시간 채팅 환경에서 체험해 보세요.',
      text: '실시간 채팅 환경에서 비속어를 탐지하고 순화 할 수 있습니다.'
    },
    left: {
      title: '게시판 환경에도 적용 가능합니다.',
      text: '게시판 작성, 댓글 작성 중 사용하는 비속어를 탐지하고 순화 할 수 있습니다.'
    },
    right: {
      title: '디스코드등 다양한 플랫폼에 적용 가능합니다.',
      text: 'Purgo API는 쉽게 다른 플랫폼에 적용할 수 있습니다.'
    }
  };
  const indexMap: Record<DropKey, string> = {
    none: '',
    top: '01',
    left: '02',
    right: '03',
  };
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // 1) activeDrop이 none 이면 즉시 기본 컨텐츠로 복귀
    if (activeDrop === 'none') {
      setDisplayDrop('none');
      setShowContent(true);
      return; // 이번 effect는 여기서 끝
    }

    // 2) 바뀐 것이 displayDrop과 같으면 애니메이션 없이 표시
    if (activeDrop === displayDrop) {
      setShowContent(true);
      return;
    }

    // 3) 그 외에는 fade-out 후 fade-in (원래 로직)
    setShowContent(false);
    const timeoutId = window.setTimeout(() => {
      setDisplayDrop(activeDrop);
      setShowContent(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeDrop, displayDrop]);
  const dropColors = {
    top: '#fef01b',     // 채팅 아이콘: 빨간색 계열
    left: '#8AD99B',    // 카드 아이콘: 파란색 계열
    right: '#bdc0fa',   // 다른 아이콘: 녹색 계열
    none: 'transparent' // 기본값
  };

  // 각 드롭에 대한 별도의 ref 생성
  const topRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { title, text } = contentMap[activeDrop];

  // 초기 이모티콘 위치 저장
  useEffect(() => {
    // 모든 드롭에 대해 초기 이모티콘 위치 저장
    const setInitialPositions = () => {
      // 먼저 topRef에서 이모티콘 위치 확인
      if (topRef.current) {
        const iconElement = topRef.current.querySelector('img, svg');
        if (iconElement) {
          const iconRect = iconElement.getBoundingClientRect();
          const centerX = iconRect.left + (iconRect.width / 2);
          const centerY = iconRect.top + (iconRect.height / 2);

          // 최초 위치 설정
          if (!initialPosition) {
            setInitialPosition({ x: centerX, y: centerY });
          }
        }
      }
    };

    // 컴포넌트 마운트 및 창 크기 변경 시 위치 재계산
    setInitialPositions();
    window.addEventListener('resize', setInitialPositions);

    return () => {
      window.removeEventListener('resize', setInitialPositions);
    };
  }, [initialPosition]);

  // 특정 참조(ref)에서 이모티콘 위치 계산
  const calculateIconPosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return null;

    const iconElement = ref.current.querySelector('img, svg');
    if (iconElement) {
      const iconRect = iconElement.getBoundingClientRect();
      const centerX = iconRect.left + (iconRect.width / 2);
      const centerY = iconRect.top + (iconRect.height / 2);

      return { x: centerX, y: centerY };
    }
    return null;
  };
  const handleEnter = (key: DropKey) => (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseTracking(true);

    // 키에 따라 적절한 ref 선택
    const currentRef = key === 'top' ? topRef : key === 'left' ? leftRef : rightRef;

    // 현재 이모티콘 위치 계산 함수
    const updateIconPosition = () => {
      const position = calculateIconPosition(currentRef);
      if (position) {
        // 해당 이모티콘 위치로 확장 중심 업데이트
        setExpandPosition(position);

        // 처음 위치 저장 (아직 설정되지 않은 경우)
        if (!initialPosition) {
          setInitialPosition(position);
        }
      }
    };

    // 이모티콘 위치 즉시 업데이트
    updateIconPosition();

    // 드롭이 움직이는 동안 위치 계속 추적을 위한 이벤트 리스너
    const trackMovement = () => {
      if (mouseTracking) {
        updateIconPosition();
        requestAnimationFrame(trackMovement);
      }
    };

    // 애니메이션 프레임으로 추적 시작
    requestAnimationFrame(trackMovement);
    const currentHoverId = Date.now();
    hoverKey.current = currentHoverId;

    // 기존 타이머 제거 후 새 타이머 설정
    clearTimeout(hoverTimers.current[key]);
    hoverTimers.current[key] = window.setTimeout(() => {
      if (hoverKey.current !== currentHoverId) return; 
      setActiveDrop(key);
    }, 50);
  };

  const handleLeave = (key: DropKey) => () => {
    setMouseTracking(false);
    clearTimeout(hoverTimers.current[key]);
    setActiveDrop('none');
  };
  const visibleLabel = showContent && displayDrop !== 'none';

  return (
      <>
        <GlobalStyle />
        <Background
            activeDrop={activeDrop}
            expandPosition={expandPosition}
            initialPosition={initialPosition}
            style={{ '--expand-color': dropColors[activeDrop] } as React.CSSProperties}
        >
          <SectionSplit>
            <Left>
              <DropWrapper active = {active}>
                <DropContainer key={active ? 'on' : 'off'}>
                  {/*채팅 엔드 포인트 들어갈 곳*/}
                  <TopCenterDrop
                      small
                      ref={topRef}
                      onMouseEnter={handleEnter('top')}
                      onMouseLeave={handleLeave('top')}
                      // chat 주소 변경
                      onClick={() => window.location.href = 'http://purgochat.kro.kr'}
                      style={{transform: 'translate(-50%, -90%)', cursor: 'pointer' }}
                  >
                    <img src="/images/rocketchat-brands.svg" alt="chat" />
                  </TopCenterDrop>
                  <Link to={"/post/main"}>
                    <BottomLeftDrop
                        small
                        ref={leftRef}
                        onMouseEnter={handleEnter('left')}
                        onMouseLeave={handleLeave('left')}
                        style={{transform: 'translate(-110%, 100%)' }}
                    >
                      <img src="/images/address-card-solid.svg" alt="board" />
                    </BottomLeftDrop>
                  </Link>
                  <BottomRightDrop
                      small
                      ref={rightRef}
                      onMouseEnter={handleEnter('right')}
                      onMouseLeave={handleLeave('right')}
                      style={{transform: 'translate(110%, 100%)' }}
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={50}
                        height={50}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        style={{ color: 'black' }}
                    >
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" fill="black">
                      </path>
                    </svg>
                  </BottomRightDrop>
                </DropContainer>
              </DropWrapper>
            </Left>
            <Right>
              {activeDrop === 'top' && (
                  <FloatingIcon
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M885.8 383.8h-90.4c12.3 15.8 19.7 35.6 19.7 57.1v194c0 51.3-42 93.2-93.2 93.2H494.1c12.1 31 42.2 53.1 77.4 53.1h314.3c45.6 0 83-37.3 83-83V466.8c-0.1-45.7-37.4-83-83-83z"
                        fill="#FFB89A"
                    />
                    <path
                        d="M780.7 582.4V286.3c0-74.2-60.7-134.9-134.9-134.9H198.2c-74.2 0-134.9 60.7-134.9 134.9v296.1c0 70.5 54.8 128.7 123.8 134.4 0 0-20 155.4 4.9 155.4s188.4-154.9 188.4-154.9h265.3c74.3 0 135-60.7 135-134.9z m-424.1 74.9l-17.4 16.4c-0.3 0.3-34.5 32.7-73.2 67.1-8.5 7.5-16.2 14.3-23.3 20.5 1.9-20.9 3.9-36.6 3.9-36.8l8-62.3L192 657c-38.5-3.2-68.7-36-68.7-74.6V286.3c0-19.9 7.8-38.6 22.1-52.8 14.2-14.2 33-22.1 52.8-22.1h447.6c19.9 0 38.6 7.8 52.8 22.1 14.2 14.2 22.1 33 22.1 52.8v296.1c0 19.9-7.8 38.6-22.1 52.8-14.2 14.2-33 22.1-52.8 22.1H356.6z"
                        fill="#94c6ff"
                    />
                    <path
                        d="M830.3 337.9c-16.2-3.3-32.1 7.1-35.4 23.3-3.3 16.2 7.1 32.1 23.3 35.4 39 8 67.3 42.7 67.3 82.5v177c0 41.6-31.1 77.5-72.3 83.4l-32.7 4.7 7.8 32.1c2 8.1 3.9 16.8 5.8 25.3-17.6-16.4-37.3-35.2-55.2-52.7l-8.7-8.6H562.5c-21.9 0-36.6-1.4-47.2-8.6-13.7-9.3-32.4-5.8-41.7 7.9-9.3 13.7-5.8 32.4 7.9 41.7 25.7 17.5 55.3 19 81 19h143.2c10 9.7 27.3 26.3 45 42.8 16.2 15.1 29.6 27.1 39.8 35.9 20 17 29.3 23.1 41.6 23.1 9.7 0 18.7-4.4 24.8-12.1 10.1-12.9 10.2-29.1 0.5-78.7-1.4-7.2-2.9-14.2-4.3-20.6 54.4-21.1 92.4-74.3 92.4-134.6v-177c0.1-68-48.4-127.4-115.2-141.2z"
                        fill="#94c6ff"
                    />
                    <path
                        d="M434.6 602.8c-35.9 0-71-17.1-98.8-48.1-24.6-27.5-39.3-61.6-39.3-91.4v-29.7l29.7-0.3c0.4 0 36.2-0.4 95.4-0.4 16.6 0 30 13.4 30 30s-13.4 30-30 30c-22.3 0-41.2 0.1-56.2 0.1 3.8 7.1 8.8 14.5 15.1 21.6 16 17.9 35.7 28.1 54.1 28.1s38.1-10.3 54.1-28.1c6.5-7.3 11.6-14.9 15.4-22.2-13.7-2.8-24.1-15-24-29.5 0.1-16.5 13.5-29.9 30-29.9h0.1c27.1 0.1 32.5 0.2 33.6 0.3l28.9 1.1v28.9c0 29.8-14.7 63.9-39.3 91.4-27.9 31-62.9 48.1-98.8 48.1z m107.1-109.5z"
                        fill="#33CC99"
                    />
                  </FloatingIcon>
              )}
              {activeDrop === 'right' && (
                  <FloatingIcon
                      viewBox="0 0  255 198"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#5865F2"/>
                  </FloatingIcon>
              )}
              {activeDrop === 'left' && (
                  <FloatingIcon
                      viewBox="0 0 26 28"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16,6l-13,0c-0.552,0 -1,0.448 -1,1l0,22c0,0.552 0.448,1 1,1l22,0c0.552,0 1,-0.448 1,-1l0,-13c0,-0.552 -0.448,-1 -1,-1c-0.552,-0 -1,0.448 -1,1l0,12c0,0 -20,0 -20,0c0,0 0,-20 0,-20c-0,0 12,0 12,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1Zm-9,19l14,-0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-14,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm-0,-4l4,0c0.552,-0 1,-0.448 1,-1c-0,-0.552 -0.448,-1 -1,-1l-4,0c-0.552,-0 -1,0.448 -1,1c-0,0.552 0.448,1 1,1Zm22.707,-13.293c0.391,-0.39 0.391,-1.024 0,-1.414l-4,-4c-0.39,-0.391 -1.024,-0.391 -1.414,-0l-10,10c-0.14,0.139 -0.235,0.317 -0.274,0.511l-1,5c-0.065,0.328 0.037,0.667 0.274,0.903c0.236,0.237 0.575,0.339 0.903,0.274l5,-1c0.194,-0.039 0.372,-0.134 0.511,-0.274l10,-10Zm-22.707,9.293l4,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-4,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm0,-4l5,-0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-5,-0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Z" fill='#33CC99'/>
                  </FloatingIcon>
              )}
<div className="count">
  {displayDrop === 'none' ? (
    // displayDrop이 'none'일 때 보여줄 div
    <div className="count-placeholder">
      {/* 여기에 원하는 내용 혹은 빈 공간용 스타일을 넣으세요 */}
    </div>
  ) : (
    // 그 외에는 기존 NumberLabel + Divider
    <>
      <NumberLabel visible={visibleLabel}>
        {indexMap[displayDrop]}
      </NumberLabel>
      <Divider visible={visibleLabel} />
    </>
  )}
</div>
              <Title  visible={showContent}>{contentMap[displayDrop].title}</Title>
              <Text visible={showContent}> {contentMap[displayDrop].text}</Text>
            </Right>
          </SectionSplit>
        </Background>
      </>
  );
};

export default DetailSecondSection;