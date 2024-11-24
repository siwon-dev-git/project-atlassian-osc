# Atlassian 프로젝트

이 프로젝트는 React 애플리케이션에서 Atlassian Design System 컴포넌트를 사용하여 구현한 산출물입니다.

## 시작하기

### 필수 조건

- Node.js (버전 20.13.1)
- Yarn (버전 1.22.19)

### 설치

```text
# 1. 레포지토리 클론하기:

git clone https://github.com/siwon-dev-git/project-atlassian-osc.git

# 2. 프로젝트 디렉토리로 이동하기:

cd atlassian-project

# 3. 의존성 설치하기:

yarn install

# 4. 개발 서버를 시작하기:

yarn dev

```

## 사용된 기술

- React 16.14
- Atlassian Design System 컴포넌트
- Webpack 5
- TypeScript
- i18next (국제화)

## 라이센스

없음 - 과제제출용

## 개발일지

Atlassian Design System을 활용한 프로젝트 개발에 대한 기술적 설명:

### 컴포넌트 활용

- PageLayout, Content, LeftSidebarWithoutResize, Main 등의 컴포넌트를 사용하여 일관된 레이아웃 구조를 구현했습니다.
- Select, DatePicker, DynamicTableStateless, Modal 등 다양한 UI 컴포넌트를 활용하여 사용자 인터페이스를 구성했습니다.

### 페이지 구조

- 총 5개의 페이지(유저 목록, 유저 상세, 게시물 목록, 게시물 상세, 할일 목록)를 구현했습니다.
- React Router를 사용하여 페이지 간 네비게이션을 구현했습니다.

### API 통신

- 커스텀 훅을 개발하여 API 호출을 추상화했습니다.
- 모든 API 관련 로직을 service 디렉토리 내에 집중시켜 관리의 용이성을 높였습니다.

### 파일 구조 및 네이밍

- 직관적인 파일 구조와 네이밍 규칙을 적용하여 코드의 가독성과 유지보수성을 향상시켰습니다.
- 컴포넌트, 훅, 유틸리티 함수 등을 별도의 디렉토리로 분리하여 관리했습니다.

### 관심사의 분리

- 각 컴포넌트와 파일의 역할을 명확히 분리하여 단일 책임 원칙을 준수했습니다.
- 비즈니스 로직, 프레젠테이션 로직, 상태 관리 등을 적절히 분리하여 코드의 모듈성을 높였습니다.

### 국제화(i18n) 지원

- react-i18next 라이브러리를 사용하여 다국어 지원을 구현했습니다.
- 언어 변경 시 동적으로 문서의 lang 속성을 업데이트하도록 구현했습니다.

## Atlassian Design System 활용

사용된 각 컴포넌트를 간략한 사용예제와 함께 설명합니다.

### 페이지 레이아웃

PageLayout은 전체 페이지 구조를 정의하는 컴포넌트입니다.

LeftSidebarWithoutResize 컴포넌트로 좌측 사이드바의 영역을 정의했습니다.

```tsx
<LeftSidebarWithoutResize
  testId="leftSidebar"
  id="space-navigation"
  skipLinkTitle="Project Navigation"
  isFixed={false}
  width={280}
>
  <CommonPageSideNav />
</LeftSidebarWithoutResize>
```

Main 컴포넌트로 메인 영역을 정의했습니다.

```jsx
<Main testId="main" id="main" skipLinkTitle="Main Content">
  <AppRouter />
</Main>
```

### 사이드 네비게이션

SideNavigation은 좌측 사이드 페널의 네비게이션 내용을 정의합니다.

NavigationHeader 에는 AtlassianLogo를 활용하고, NestableNavigationContent을 통해서 중첩 리스트 형태로 언어 선택을 하도록 구현했습니다.

이 컴포넌트는 앱 내 공통 컴포넌트로 묶어 표현 되었습니다. (CommonPageSideNav)

```jsx
<SideNavigation label="project" testId="side-navigation">
  <NavigationHeader>
    <AtlassianLogo appearance="brand" />
  </NavigationHeader>
  <NestableNavigationContent
    initialStack={[]}
    testId="nestable-navigation-content"
  >
    ...
    <Section title="Settings">
      <NestingItem
        iconBefore={<LanguageIcon label="" />}
        id="language-menu"
        title="Language"
      >
        <ButtonItem onClick={() => i18n.changeLanguage("ko")}>
          한국어
        </ButtonItem>
        <ButtonItem onClick={() => i18n.changeLanguage("en")}>
          English
        </ButtonItem>
      </NestingItem>
    </Section>
  </NestableNavigationContent>
  <NavigationFooter>...</NavigationFooter>
</SideNavigation>
```

### 페이지 헤더

PageHeader와 Breadcrumbs 컴포넌트를 활용해서 각 페이지 헤더를 구현했습니다.
이 컴포넌트는 앱 내 공통 컴포넌트로 묶어 표현 되었습니다. (CommonPageHeader)

```jsx
<PageHeader
  breadcrumbs={
    <Breadcrumbs onExpand={__noop}>
      {breadcrumbs.map(({ text, href }) => (
        <BreadcrumbsItem key={text} text={text} href={href} />
      ))}
    </Breadcrumbs>
  }
>
  {title}
</PageHeader>
```

### 검색

검색과 자동완성 기능을 제공하는 컴포넌트를 찾기 어려웠습니다.
가장 비슷한 Select를 활용해서 검색기능을 구현했습니다.

```jsx
<Select
  components={{
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  }}
  inputId="single-select-name-clearable"
  // eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
  className="single-select"
  classNamePrefix="react-select"
  isClearable={true}
  options={suggestions}
  placeholder={t("searchByUsername")}
  onChange={(d) => setSearchedName(d?.value || "")}
/>
```

### 테이블

앱 내의 리스트 형태를 DynamicTableStateless 컴포넌트로 구현했습니다.

```jsx
<DynamicTableStateless
  head={head}
  rows={rows}
  rowsPerPage={5}
  page={page}
  onSetPage={(p) => setPage(p)}
  isLoading={isLoading}
  emptyView={<p>{t("emptyTableMessage")}</p>}
/>
```

### 로젠지

할일 목록에서 적당한 아이콘을 찾기 어려워, 적합해 보이는 Lozenge 형태로 상태를 표현했습니다.

```jsx
<Lozenge appearance="success">Done</Lozenge>
<Lozenge appearance="new">Todo</Lozenge>
```

### 모달

게시물, 댓글 수정에서 사용되었습니다.

```jsx
<Button aria-haspopup="dialog" appearance="primary" onClick={openModal}>{t("editPost")}</Button>
<ModalTransition>...</ModalTransition>
```

### 텍스트 에어리어

게시물, 댓글 수정을 위한 모달에서 사용되었습니다.

```jsx
<TextArea
  id="comment"
  name="comment"
  resize="auto"
  maxHeight="40vh"
  defaultValue={comment}
  onChange={(e) => setNewComment(e.currentTarget.value)}
/>
```

### 날짜 선택

게시물 필터에서 날짜 선택을 위해 사용되었습니다.

```jsx
<DatePicker
  id="default-date-picker"
  clearControlLabel="Clear choose date"
  shouldShowCalendarButton
  inputLabelId="date"
  openCalendarLabel="open calendar"
  onChange={(d) => setDate(d)}
/>
```
