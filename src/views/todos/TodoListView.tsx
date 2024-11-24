/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import { Box } from "@atlaskit/primitives";
import { useTranslation } from "react-i18next";
import CommonPageHeader from "../../components/CommonPageHeader";
import { pageContentWrap } from "../../assets/xcss";
import TodoList from "./TodoList";

const TodoListView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box xcss={pageContentWrap}>
      <CommonPageHeader
        title={t("todoListPage")}
        breadcrumbs={[{ href: "/", text: "Home" }, { text: "Todos" }]}
      />
      <TodoList />
    </Box>
  );
};

export default TodoListView;
