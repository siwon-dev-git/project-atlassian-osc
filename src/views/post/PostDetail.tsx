/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import { useParams } from "react-router-dom";

import { Box, Stack } from "@atlaskit/primitives";

import usePost from "../../services/getPost";
import { formatDate } from "../../utils/formatDate";
import PostUpdateDialog from "./PostUpdateDialog";

const UserDetail = () => {
  const { postId = "" } = useParams();
  const { post } = usePost(postId);

  return (
    <Stack>
      <Box>
        <PostUpdateDialog
          postId={postId}
          title={post?.title || ""}
          content={post?.content || ""}
        />
      </Box>
      <Box as="strong">{post?.title}</Box>
      {post?.updatedAt && <Box as="p">{formatDate(post.updatedAt)}</Box>}
      <Box as="p">{post?.content}</Box>
    </Stack>
  );
};

export default UserDetail;
