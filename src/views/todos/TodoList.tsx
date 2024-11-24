/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";

import { Fragment, useState } from "react";
import { Box } from "@atlaskit/primitives";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";
import { useTranslation } from "react-i18next";
import { commonCompWrap } from "../../assets/xcss";
import useTodos from "../../services/getTodos";
import { formatDate } from "../../utils/formatDate";
import Lozenge from "@atlaskit/lozenge";

const TodoList = () => {
  const { t } = useTranslation();
  const { todos, isLoading } = useTodos();
  const [page, setPage] = useState<number>(1);

  const head = {
    cells: [
      { key: "completed", content: t("status") },
      { key: "title", content: t("todo") },
      { key: "createdAt", content: t("createdAt") },
      { key: "updatedAt", content: t("lastUpdated") },
    ],
  };

  const rows = todos.map((d, i) => {
    return {
      key: `todo-row-${i}-${d.id}`,
      cells: [
        {
          key: "completed",
          content: (
            <Fragment>
              {d.completed ? (
                <Lozenge appearance="success">Done</Lozenge>
              ) : (
                <Lozenge appearance="new">Todo</Lozenge>
              )}
            </Fragment>
          ),
        },
        { key: "title", content: d.title },
        { key: "createdAt", content: formatDate(d.createdAt) },
        { key: "updatedAt", content: formatDate(d.updatedAt) },
      ],
    };
  });

  return (
    <Box xcss={commonCompWrap}>
      <DynamicTableStateless
        head={head}
        rows={rows}
        rowsPerPage={10}
        page={page}
        isLoading={isLoading}
        onSetPage={(p) => setPage(p)}
        emptyView={<p>{t("emptyTableMessage")}</p>}
      />
    </Box>
  );
};

export default TodoList;
