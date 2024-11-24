/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import { AtlassianLogo } from "@atlaskit/logo";
import LightbulbIcon from "@atlaskit/icon/glyph/lightbulb";
import CustomerIcon from "@atlaskit/icon/glyph/person";
import LanguageIcon from "@atlaskit/icon/glyph/world";
import PeopleGroupIcon from "@atlaskit/icon/glyph/people-group";
import DocumentsIcon from "@atlaskit/icon/glyph/documents";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import {
  ButtonItem,
  Footer,
  LinkItem,
  NavigationFooter,
  NavigationHeader,
  NestableNavigationContent,
  NestingItem,
  Section,
  SideNavigation,
} from "@atlaskit/side-navigation";
import { useTranslation } from "react-i18next";

const CommonPageSideNav = () => {
  const { t, i18n } = useTranslation();

  return (
    <SideNavigation label="project" testId="side-navigation">
      <NavigationHeader>
        <AtlassianLogo appearance="brand" />
      </NavigationHeader>
      <NestableNavigationContent
        initialStack={[]}
        testId="nestable-navigation-content"
      >
        <Section isList title="Views">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <LinkItem href="/users" iconBefore={<PeopleGroupIcon label="" />}>
            {t("userListPage")}
          </LinkItem>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <LinkItem href="/users/1" iconBefore={<CustomerIcon label="" />}>
            {t("userDetailPage")}
          </LinkItem>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <LinkItem href="/posts" iconBefore={<DocumentsIcon label="" />}>
            {t("postListPage")}
          </LinkItem>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <LinkItem href="/posts/2" iconBefore={<DocumentIcon label="" />}>
            {t("postDetailPage")}
          </LinkItem>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <LinkItem href="/todos" iconBefore={<LightbulbIcon label="" />}>
            {t("todoListPage")}
          </LinkItem>
        </Section>
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

      <NavigationFooter>
        <Footer
          description={
            <div>
              <a href="#">피드백 보내기</a> {" ∙ "}
              <a href="#">프로젝트 소개</a> {" ∙ "}
              <a href="#">이용약관</a>
            </div>
          }
        >
          과제 제출용 프로젝트입니다
        </Footer>
      </NavigationFooter>
    </SideNavigation>
  );
};

export default CommonPageSideNav;
