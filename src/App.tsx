/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import {
  PageLayout,
  Content,
  LeftSidebarWithoutResize,
  Main,
} from "@atlaskit/page-layout";

import { BrowserRouter, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AppRouter from "./routers/AppRouter";
import CommonPageSideNav from "./components/CommonPageSideNav";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <PageLayout>
        <Content testId="content">
          {
            <LeftSidebarWithoutResize
              testId="leftSidebar"
              id="space-navigation"
              skipLinkTitle="Project Navigation"
              isFixed={false}
              width={280}
            >
              <CommonPageSideNav />
            </LeftSidebarWithoutResize>
          }
          {
            <Main testId="main" id="main" skipLinkTitle="Main Content">
              <AppRouter />
            </Main>
          }
        </Content>
      </PageLayout>
    </BrowserRouter>
  );
};

export default App;
