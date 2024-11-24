/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// 컴포넌트를 lazy로 동적으로 import
const PostView = lazy(() => import("../views/post/PostView"));
const PostListView = lazy(() => import("../views/posts/PostListView"));
const TodoListView = lazy(() => import("../views/todos/TodoListView"));
const UserView = lazy(() => import("../views/user/UserView"));
const UserListView = lazy(() => import("../views/users/UserListView"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/users/:userId" element={<UserView />} />
        <Route path="/users" element={<UserListView />} />
        <Route path="/posts/:postId" element={<PostView />} />
        <Route path="/posts" element={<PostListView />} />
        <Route path="/todos" element={<TodoListView />} />
        <Route path="*" element={<TodoListView />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
