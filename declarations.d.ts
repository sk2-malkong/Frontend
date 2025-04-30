// declarations.d.ts
// 이 파일은 TypeScript에게 특정 파일 확장자의 모듈을 처리하는 방법을 알려줍니다.

// SVG 파일을 모듈로 가져올 수 있게 함
declare module "*.svg" {
    const content: string;
    export default content;
}

// 필요시 다른 파일 타입도 여기에 선언할 수 있습니다.
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";