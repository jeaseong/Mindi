# 언어의 숲

### 인공지능 감정 분석을 이용한 일기 서비스

<br>

## TEAM

| 이름     | 역할           |
| -------- | -------------- |
| 박재성   | **프론트, 👑** |
| 이은여울 | **프론트**     |
| 김재연   | **백엔드**     |
| 정윤지   | **백엔드**     |
| 송경아   | **AI**         |

<br>

# 프로젝트 소개

<br>

**Mindi**는 'mind'와 'diary'의 합성어로,
한국어 감정 정보가 포함된 대화 데이터셋을 기반으로 훈련된 인공지능이
내가 쓴 일기를 읽고 이야기 속에 담긴 **감정**을 분석하여 알려주는 서비스입니다.

솔직한 감정을 드러내는 것이 자유롭지 않은 분위기 속에서,
자신이 느끼는 감정을 정확하게 알지 못 하는 경우가 많아지고 있습니다.

지금 느낀 감정이 슬픔인지, 분노인지, 기쁨인지 내 감정에 집중해보고
내가 생각하는 감정이 맞는지 인공지능의 도움을 받아 확인해보며 감성지능을 높여보세요!

<br>

## 문제 인식

<br>

하루가 다르게 변화하는 미지의 세상에 사는 우리는 알 수 없는 것에 대처하고 제어하는 능력이 필요하다.

이에 대해 과거에는 전통적인 지능검사나 학업능력검사로 측정한 지적능력이 결정적이라고 여겼다.

하지만 이후 심리학자들에 의하여 인생의 성취와 성과를 결정하는 또 다른 요소로
'감성지능(정서적 측면에서의 지능)'이 있음이 수많은 스터디 케이스를 통해 입증되었다.

감성지능이 뛰어난 사람은 모든 사람의 인권과 인격을 존중하고, 모든 일에 진지하고 책임감이 있으며,
자아에 대해 정확하게 인지하여 스트레스 관리를 잘한다.

즉, **개인의 건강과 발전에 감성지능이 중요한 작용을 하고 있음을 의미한다.**

그러나 오늘날 사회적 압박을 받으며 바쁘게 살아야 하는 이들은 가끔 자신의 감정이 무슨 감정인지 모를 때가 있다.

혹은 자신이 무슨 감정으로 말과 행동을 하는지 모를 때도 있다.

이런 경우가 잦다면 자아인식이 매우 낮다는 것이다.
다시 말해, 감성지능을 높여야 한다는 신호이다.

**이에 본 서비스에서는 감성지능이 낮은 사람에게 감성지능을 높이는 솔루션을 제공함과 동시에 감성지능이 높은 사람이 자신의 팁을 공유할 수 있는 서비스를 한다.**

<br>

## 감성지능이란?

<br>

**감성지능(emotional intelligence, EI)** 은 자신이나 타인의 감정을 인지하는 개인의 능력을 나타내는 용어이다.

감성지능은 자신과 타인의 감정을 잘 통제하고 여러 종류의 감정들을 잘 변별하여 이것을 토대로
자신의 사고와 행동을 방향 지을 근거를 도출해 내는 능력이다.

이에 '언어의 숲' 팀은

1️⃣감정일기 작성 및 분석

2️⃣대나무숲(익명 커뮤니티)

3️⃣감정에 따른 추천 서비스를 제공하고자 한다.

<br>

# 서비스 미리보기

## Main-01: 감정일기 작성 및 분석

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/63990725/179890354-77ac4c88-2145-4617-8a56-51908f111ff5.gif)

- 오늘 있었던 일과 감정을 구분해서 적도록 하여 사건과 감정을 분리하고 좀 더 자신의 감정을
  돌아볼 수 있도록 도움
- 예시와 함께 50자 이상 쓰도록 하여 감정을 글로 표현하는 연습(고민)을 하도록 유도
- 감성분석을 통해 감정수치 시각화 ⇒ 복합적인 감정도 알 수 있음
- 가장 크게 나타난 대표 감정을 보여줌과 동시에 그 감정에 맞는 음악 추천(유튜브 영상 제공)

<br>

## Main-02: 캘린더 및 월별 통계

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/63990725/179890807-9a894bac-cbb9-468b-b9e4-cbcdbf0757d4.gif)

```
01. 캘린더
- 캘린더 기능을 통하여 색으로 구분한 감정 분포를 한 번에 확인할 수 있음
- 일기를 저장하여 그 날의 감정과 자신이 쓴 일기를 확인할 수 있음

02. 월별 통계
- 매월 각 감정이 얼마나 자주 나타났는지 수치를 확인
- 한 달 동안 자주 사용한 키워드를 보여줌 (tf-idf)
- 가장 자주 나타난 감정이 강하게 나타난 일기들을 보여줌으로써 지난 달을 되돌아볼 수 있게 함(리마인더 기능)
```

<br>

## Sub-01: 감성지능 테스트(+가입 및 로그인)

![ezgif com-gif-maker](https://user-images.githubusercontent.com/63990725/179890450-57c2428b-b9ea-4dbf-963e-3fe12e68665f.gif)

```
- 감성지능 간이 테스트를 통하여 자신의 감성지능을 확인해볼 수 있음 (출처: 감성지능 3.0, 수린)
- 이메일 인증을 통하여 실제 존재하는 이메일로 가입하도록 유도 (=> 비밀번호 찾기에 사용)
```

<br>

## Sub-02: 대나무숲

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/63990725/179890461-541f14fa-c227-4b4c-a5f8-408eba11bdbe.gif)

```
- 감성지능을 높이는 방법 3번(자신의 비밀을 적절하게 누설할 것)과 4번(타인을 통해 자신을 관찰할 것)
	을 실현할 수 있도록 하기 위해 익명으로 자신이 겪은 일과 감정을 공유할 수 있는 공간 제공
- 다른 유저 역시 익명으로 댓글을 달며 공감해주거나 고민 상담을 해줄 수 있음
```

# 서비스 구조도

<br>

<div align='center'>
    <img src='https://user-images.githubusercontent.com/63990725/177198256-cb05159d-dcc0-423a-a9ae-13fd0bd0026d.png' width='650px'>
</div>

<br>

- 와이프레임: [마인디](https://www.figma.com/file/bmsYRDoanHWbw1k6hnXeDC/%EC%96%B8%EC%96%B4%EC%9D%98-%EC%88%B2-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0%3A1)
- flow cart: [마인디](https://www.figma.com/file/gUUFjD4QSdOBHemco6oqLx/FLOW-CHART?node-id=0%3A1)

<br>

# 기술스택

- 프론트엔드
  - <img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=black"/>
  - <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat&logo=styled-components&logoColor=black"/> <img src="https://img.shields.io/badge/Framer-0055FF?style=flat&logo=Framer&logoColor=black"/>
  - <img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=React Query&logoColor=black"/>
- 백엔드
  - <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=black"/> <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=black"/> <img src="https://img.shields.io/badge/Express-c2c2c2?style=flat&logo=Express&logoColor=black"/>
  - <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=MongoDB&logoColor=black"/>
  - <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=Docker&logoColor=black"/> <img src="https://img.shields.io/badge/NaverCloud-03C75A?style=flat&logo=Naver&logoColor=black"/>
  - <img src="https://img.shields.io/badge/Jest-C21325?style=flat&logo=Jest&logoColor=black"/>
- AI 
  - <img src="https://img.shields.io/badge/Flask-FDA061?style=flat&logo=Flask&logoColor=black"/> 
  - <img src="https://img.shields.io/badge/%F0%9F%A4%97-Huggingface-yellow"/> <img src="https://img.shields.io/badge/Pytorch-EE4C2C?style=flat&logo=Pytorch&logoColor=black"/>
  - <img src="https://img.shields.io/badge/-TextRank-green">
  <br>

# 기능

- 메인 기능
  1.  감정일기 작성 및 분석
  - 감정일기와 단순 --했다와 같은 하루 일과를 기록하는 카테고리 분류
  - 감성분석을 통해 감정수치 시각화 ex) 기쁨 7, 슬픔 3
  - 매월 감정수치 통계
  - 자주 사용한 키워드 통계
  - 매월 리마인더 기능을 통해 감정 되돌아보기
  - 캘린더 기능
- 서브 기능
  1.  대나무숲(익명 커뮤니티)
  - 게시글 CRUD
  - 댓글
  2.  감정에 따른 추천 서비스
  - 감정에 따라 음악 추천 (유튜브 영상)
  3. 감성지능 테스트

<br>

# 데이터셋

- 사용된 데이터셋:
  - [한국어 감정 정보가 포함된 단발성 대화 데이터셋](https://aihub.or.kr/aihubdata/data/view.do?currMenu=120&topMenu=100&aihubDataSe=extrldata&dataSetSn=270)(출처: KETI R&D데이터)
  - [한국어 감정 정보가 포함된 연속적 대화 데이터셋](https://aihub.or.kr/aihubdata/data/view.do?currMenu=120&topMenu=100&aihubDataSe=extrldata&dataSetSn=271)(출처: KETI R&D데이터)
- 기술스택: 감정분석 > KcElectra, 키워드추출> TextRank
- 이 프로젝트의 맥락과 배경이 유사한 인공지능 기반 서비스: [trost](https://trosteap.co.kr/blog/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=7644293&t=board)
- 참고한 논문: [ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators](https://arxiv.org/abs/2003.10555)
