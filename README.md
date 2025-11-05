# Ⅰ. 프로젝트 개요
> **SmartStock AI**는 ERP/WMS가 없어도  
> **CSV/Excel 업로드만으로 “정제 → 예측 → 발주정책(EOQ/ROP/SS) → KPI 시각화”**  
> 까지 한 번에 처리하는 **AI 재고관리 SaaS 프로토타입**입니다.   
> 프론트엔드(React) – 백엔드(FastAPI) – 예측엔진(TensorFlow LSTM+CNN) – 데이터베이스(MySQL)를  
> **도커 기반 클라우드 환경**에 통합하여,  
> 비전문가도 클릭 몇 번으로 수요예측과 발주 의사결정을 수행할 수 있도록 설계했습니다.  
> <br>

---

## 1. 핵심 가치 제안 (Value Proposition)
- **즉시 사용 가능**: 로그인 없이 시작, CSV/Excel 업로드만으로 자동 정제·예측 실행  
- **정확도 중심 설계**: **LSTM+CNN 하이브리드**로 SKU 단기 예측, 성능/버전은 **MLflow**로 추적  
- **운영 효율화**: 발주정책(SS/ROP/Q)을 자동 산출하여 **수작업을 대폭 축소**하고 리스크(품절/과잉)를 대시보드로 즉시 파악
> <br>

---

## 2. 사용 시나리오 (End-to-End Flow)
- **데이터 업로드**: CSV/Excel 업로드 → 자동 컬럼 인식·결측/이상치 보정·스키마 표준화  
- **AI 예측**: SKU/카테고리 단기 예측(**LSTM+CNN**) 수행, 예측분위수(p10/p50/p90) 활용  
- **정책 계산**: 수요 분산·리드타임을 반영해 **SS, ROP, Q** 산출 및 **PO Draft** 생성  
- **시각화·의사결정**: KPI/리스크 대시보드, Pandas GUI Studio, Copilot 질의응답으로 설명 가능성 강화
> <br>

---

## 3. 목표 및 성과 (KPI)
- **목표**: WAPE ≤ 15%, Fill Rate ≥ 95%, 품절률 ≤ 2%, 클릭 3회 내 주요 작업 완료  
- **검증 결과(프로토타입)**: **WAPE 14.2%**, **Fill Rate 96.3%**, **품절률 1.8%**, 사용자 작업시간 **약 70% 절감**
> <br>

---

## 4. 차별화 포인트 (Why Now / Why Us)
- **Human–AI Co-Lab**: 사용자의 최종 결정과 AI 제안을 비교·학습하는 **피드백 루프**로 정책 품질을 지속 개선  
- **설명가능·감사가능**: KPI 카드, 리스크 위젯, 정책 수식 공개로 **투명한 의사결정** 지원  
- **확장 로드맵**: **Transformer/TFT**, **Auto-Retraining(Airflow+MLflow)**, **ERP/WMS API**, **멀티테넌트 보안(RLS/JWT)** 계획 반영
> <br>

---

## 5. 기술 개요 (Tech Snapshot)
- **Frontend**: React(Next/Vite), Tailwind, Chart.js/Recharts  
- **Backend**: FastAPI(Python), OpenAPI/Swagger, Pydantic Validation  
- **AI/ML**: TensorFlow **LSTM+CNN** 하이브리드, 슬라이딩 윈도우, MLflow 트래킹  
- **Data/Infra**: MySQL, Docker, AWS EC2/RDS, Colab 학습 파이프라인
> <br>

---

- 실제 실행 화면

![SmartStock AI 실행 화면](./src/assets/smartstock_running.png)

<br><br>

## Ⅱ. 주요 기능
> SmartStock AI는 데이터 업로드부터 예측, 정책 계산, 시각화, 의사결정 지원까지  
> 전 과정을 자동화한 **AI 재고관리 SaaS 플랫폼**입니다.  
> 아래는 시스템 구성과 핵심 기능 체계입니다.  
> <br>

---

### 1. 데이터 워크스페이스 (Data Workspace)
- CSV/Excel 업로드 시 자동 컬럼 인식 및 **데이터 클렌징** 수행  
- **결측치·이상치·중복 데이터 자동 탐지 및 보정**  
- 정제 결과 리포트 제공 (품질 요약, 컬럼 매핑 상태 등)  
- 전처리 결과를 **예측 엔진 입력 포맷(LSTM/CNN)** 으로 자동 변환  
<br>

---

### 2. AI 예측 및 정책 계산 (Forecast & Policy Engine)
- **TensorFlow LSTM+CNN 하이브리드 모델** 기반 시계열 예측  
- SKU·카테고리별 **7일 단기 예측 수행**  
- 예측 결과의 분위수(p10/p50/p90)를 활용해 **SS·ROP·EOQ 자동 산출**  
- 발주 정책 계산 결과를 **PO Draft 형태로 자동 생성**  
- **MLflow**를 통한 모델 버전 관리 및 성능 추적  
<br>

---

### 3. AI 챗봇 (LLM Agent & Copilot)
- **재고관리 특화 LLM 에이전트** 탑재  
- **자연어 질의**로 재고 상태 조회, 예측 결과 해석, 발주 시뮬레이션 가능  
- AI 제안 기반 정책 추천 / 리포트 자동 생성  
- **권한 기반 질의 제한** 및 **PII 마스킹 적용**으로 보안 강화  
<br>

---

### 4. Human–AI Co-Lab (협업 피드백 루프)
- AI 발주 제안과 사용자의 실제 의사결정 결과를 비교  
- **정확도(WAPE, RMSE, Fill Rate)** 중심 성과 피드백  
- 사용자 피드백을 AI 학습 루프에 반영해 정책 품질 지속 개선  
<br>

---

### 5. 대시보드 & 리스크 모니터링 (Visualization & Monitoring)
- **KPI 대시보드**: 재고일수·Fill Rate·품절률·과잉률 등 시각화  
- **리스크 경고 시스템**: 품절/과잉/리드타임 리스크 실시간 알림  
- **정책 시뮬레이션**: EOQ·ROP·SS 조합별 비교 및 분석  
- **라인리지 관리**: 로그, 모델 버전, 정책 변경 내역 추적  
<br>

---

### 6. 사용자 스토리 기반 워크플로 (User Scenario)
- **Planner:** CSV 업로드 → 자동 정제 리포트 확인  
- **Buyer:** 예측 결과 확인 → SS·ROP 기반 발주 제안 검토  
- **Manager:** 품절·과잉 리스크 대시보드로 실시간 모니터링  
- **Data Expert:** 예측 성능 모니터링 및 파라미터 조정  
- **AI Copilot:** 자연어 질의로 재고 상태 및 예측 결과 조회  

<br><br>

## Ⅲ. 시스템 아키텍처 (System Architecture)
> SmartStock AI는 Frontend–Backend–AI Model–Database를  
> **FastAPI + TensorFlow + MySQL + Docker + AWS** 기반으로 통합한 구조입니다.  
> <br>

![SmartStock AI System Architecture](./src/assets/Group47.png)
<br>

> 🎨 **Background Color:** `#FAF8F4`  
> (부드러운 오프화이트톤 — 완전 흰색보다 눈부심을 줄인 디자인용 색상)
