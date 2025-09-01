# 🌱 3Days+

> 🧭 **"나로 채워가는 웹, 작심삼일을 꾸준히 만드는 공간, 또렷한 삶을 위한 나만의 파트너"**  [프로젝트 바로가기](https://3daysplus.vercel.app/)<br/>
<br/>


**3Day_plus**는 작심삼일에 그치지 않고, 매일의 삶을 차근차근 나 자신으로 채워나가기 위한 **웹 애플리케이션**입니다.  
바쁜 일상 속에서 놓치기 쉬운 **계획**, **습관**, **루틴**을 지속 가능하고 효과적으로 관리할 수 있도록 도와줍니다.

<br>

⚠️ 개발관련 세부 사항(기술스택, 성능 최적화 과정 등)은 <br>
    [티스토리 블로그](https://manon-kim.tistory.com/category/Project) 에서 확인하실 수 있습니다.
<br>

---


## 🌟 주요 기능

| 기능 | 설명 |
|------|------|
| 📅 **일정 관리** | 일별 스케줄 및 목표 설정, 관리 |
| 🔄 **루틴 관리** | 사용자 맞춤형 습관 기록 및 일주일 단위로 관리 |
| 📰 **뉴스 구독** | TOP10 뉴스, 관심 키워드 기반 뉴스 제공 |
| 📊 **대시보드** | 주간 진행 상황, 오늘의 날씨, 명언 |
| 📱 **반응형** | 웹, 모바일 사이즈 대응 |
<br>

## 🛠️ 기술 스택

```txt
• Framework: Next.js 15 (App Router), TypeScript
• Styling: TailwindCSS, Shadcn, clsx
• State Management: React Query, Zustand
• Data Layer: Prisma (ORM), Supabase (Auth + DB)
• Animation: Framer Motion
• Form & Validation: Zod 기반 타입 유효성 검사
• Etc: Yarn, Github Action, Vercel, RSS Parser, ESLint, Prettier,  
```

<br>

## 📁 폴더 구조

```bash
app/                       # Next.js App Router 기반 폴더 (페이지 라우팅의 핵심)
├── (auth)/                # 인증 관련 라우트 그룹
│   ├── login/             
│   └── oauth/             
├── (main)/                # 주요 기능 라우트 그룹
│   ├── dashboard/         
│   ├── news/              
│   ├── schedule/          
│   └── profile/ 
├── api/                   # API 라우트 (백엔드 핸들러 역할)
├── globals.css            
├── layout.tsx             
├── page.tsx               
├── robots.txt             
└── sitemap.xml            

components/                # 재사용 가능한 UI 컴포넌트 모음
├── icons/                 # SVG 아이콘 컴포넌트
├── shared/                # 페이지 간 공통으로 쓰이는 레이아웃/버튼 등
├── ui/                    # shadcn/ui 기반 UI 요소
└── ...                    # 그 외 박스, 카드 등 재사용 컴포넌트

lib/                       # 외부 연동 라이브러리 또는 클라이언트 모듈
├── supabase/              # Supabase 클라이언트 초기화 및 설정
└── ...

stores/                    # Zustand 상태 관리 파일
├── useDateStore.ts        # 날짜/캘린더 관련 상태
└── useNewsStore.ts        # 뉴스 키워드/데이터 상태

types/                     # 프로젝트 전역 TypeScript 타입 정의
utils/                     # 유틸리티 함수 (날짜 포맷, className 등)
middleware.ts              # 인증/세션 처리용 미들웨어
```
<br>

## 📌 설치 및 실행 방법

```bash
git clone https://github.com/manonkim2/3daysplus.git
cd 3daysplus
npm install
yarn run dev
```

<br>

## 🚀 향후 업데이트 예정
+ main 소개페이지
+ 통계 그래프 강화
+ 다크모드
+ Unsplash API 기반 맞춤형 배경 설정

<br>

## 📚 기타 사항

🛠️ 본 프로젝트는 개인 개발 프로젝트이며, 지속적인 개선과 업데이트를 목표로 합니다.  
💡 사용된 기술 스택은 최신 웹 트렌드를 반영하여 선정되었습니다.  
🧡 사용자 중심 개발을 지향하며, 실제 사용자 피드백을 적극 반영할 계획입니다.  
<br>

