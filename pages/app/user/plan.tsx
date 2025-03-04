export { MyPlan as default } from '@/pages/app/user/plan';

// 기존 export default를 export로 변경했습니다.

// 변경한 이유는 pages 폴더 내부에서 re-export 시키기 위해서 입니다.

// export default는 re-export가 불가능해 개별적으로 export가 가능한 named export로 변경했습니다.

// 이 파일에서는 app 폴더에 위치한 파일을 re-export 하여 export default 하고 있습니다.
