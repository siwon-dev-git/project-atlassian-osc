/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import { Box } from "@atlaskit/primitives";
import { useTranslation } from "react-i18next";
import CommonPageHeader from "../../components/CommonPageHeader";
import { pageContentWrap, commonCompWrap } from "../../assets/xcss";
import UserDetail from "./PostDetail";
import CommentList from "./CommentList";

const PostView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box xcss={pageContentWrap}>
      <CommonPageHeader
        title={t("postDetailPage")}
        breadcrumbs={[
          { href: "/", text: "Home" },
          { href: "/posts", text: "Posts" },
          { text: "Detail" },
        ]}
      />
      <Box xcss={commonCompWrap}>
        <UserDetail />
        <CommentList />
      </Box>
    </Box>
  );
};

export default PostView;
