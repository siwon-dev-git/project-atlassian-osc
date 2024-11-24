/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack } from "@atlaskit/primitives";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";
import { formatDate } from "../../utils/formatDate";
import useCommentsByPostId from "../../services/getComments";
import CommentUpdateDialog from "./CommentUpdateDialog";

const CommentList = () => {
  const { t } = useTranslation();
  const { postId = "" } = useParams();
  const { comments, isLoading } = useCommentsByPostId(postId);
  const [page, setPage] = useState<number>(1);

  const head = {
    cells: [
      { key: "username", content: t("id") },
      { key: "title", content: t("content") },
      { key: "updatedAt", content: t("lastUpdated") },
      { key: "update", content: "" },
    ],
  };

  const rows = comments.map((d, i) => {
    return {
      key: `comment-row-${i}-${d.id}`,
      cells: [
        { key: "username", content: d.User.username },
        { key: "title", content: d.content },
        { key: "updatedAt", content: formatDate(d.updatedAt) },
        {
          key: "update",
          content: (
            <CommentUpdateDialog commentId={String(d.id)} comment={d.content} />
          ),
        },
      ],
    };
  });

  return (
    <Stack>
      <Box as="strong">{t("commentList")}</Box>
      <DynamicTableStateless
        head={head}
        rows={rows}
        rowsPerPage={10}
        page={page}
        onSetPage={(p) => setPage(p)}
        isLoading={isLoading}
        emptyView={<p>{t("emptyTableMessage")}</p>}
      />
    </Stack>
  );
};

export default CommentList;
