# A. 프로젝트 개요

**SmartStock AI**는 ERP/WMS가 없어도 **CSV/Excel 업로드만으로 “정제 → 예측 → 발주정책(EOQ/ROP/SS) → KPI 시각화”**까지 한 번에 처리하는 **AI 재고관리 SaaS 프로토타입**입니다.  
프론트엔드(React)–백엔드(FastAPI)–예측엔진(TensorFlow LSTM+CNN)–데이터베이스(MySQL)를 **도커 기반 클라우드 환경**에 통합하여, 비전문가도 클릭 몇 번으로 수요예측과 발주 의사결정을 수행할 수 있도록 설계했습니다.

## 1. 핵심 가치 제안 (Value Proposition)
1) **즉시 사용 가능**: 로그인 없이 시작, CSV/Excel 업로드만으로 자동 정제·예측 실행  
2) **정확도 중심 설계**: **LSTM+CNN 하이브리드**로 SKU 단기 예측, 성능/버전은 **MLflow**로 추적  
3) **운영 효율화**: 발주정책(SS/ROP/Q)을 자동 산출하여 **수작업을 대폭 축소**하고 리스크(품절/과잉)를 대시보드로 즉시 파악

## 2. 사용 시나리오 (End-to-End Flow)
1) **데이터 업로드**: CSV/Excel 업로드 → 자동 컬럼 인식·결측/이상치 보정·스키마 표준화  
2) **AI 예측**: SKU/카테고리 단기 예측(**LSTM+CNN**) 수행, 예측분위수(p10/p50/p90) 활용  
3) **정책 계산**: 수요 분산·리드타임을 반영해 **SS, ROP, Q** 산출 및 **PO Draft** 생성  
4) **시각화·의사결정**: KPI/리스크 대시보드, Pandas GUI Studio, Copilot 질의응답으로 설명 가능성 강화

## 3. 목표 및 성과 (KPI)
1) **목표**: WAPE ≤ 15%, Fill Rate ≥ 95%, 품절률 ≤ 2%, 클릭 3회 내 주요 작업 완료  
2) **검증 결과(프로토타입)**: **WAPE 14.2%**, **Fill Rate 96.3%**, **품절률 1.8%**, 사용자 작업시간 **약 70% 절감**

## 4. 차별화 포인트 (Why Now / Why Us)
1) **Human–AI Co-Lab**: 사용자의 최종 결정과 AI 제안을 비교·학습하는 **피드백 루프**로 정책 품질을 지속 개선  
2) **설명가능·감사가능**: KPI 카드, 리스크 위젯, 정책 수식 공개로 **투명한 의사결정** 지원  
3) **확장 로드맵**: **Transformer/TFT**, **Auto-Retraining(Airflow+MLflow)**, **ERP/WMS API**, **멀티테넌트 보안(RLS/JWT)** 계획 반영

## 5. 기술 개요 (Tech Snapshot)
- **Frontend**: React(Next/Vite), Tailwind, Chart.js/Recharts  
- **Backend**: FastAPI(Python), OpenAPI/Swagger, Pydantic Validation  
- **AI/ML**: TensorFlow **LSTM+CNN** 하이브리드, 슬라이딩 윈도우, MLflow 트래킹  
- **Data/Infra**: MySQL, Docker, AWS EC2/RDS, Colab 학습 파이프라인

<br><br>
<br><br>
실제 실행 화면

![SmartStock AI 실행 화면](./src/assets/smartstock_running.png)
