import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Button, { IconButton } from "@atlaskit/button/new";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import { Flex, Grid, xcss } from "@atlaskit/primitives";
import TextArea from "@atlaskit/textarea";
import { Label } from "@atlaskit/form";
import usePostUpdate from "../../services/putPost";

const gridStyles = xcss({
  width: "100%",
});

const closeContainerStyles = xcss({
  gridArea: "close",
});

const titleContainerStyles = xcss({
  gridArea: "title",
});

interface PostUpdateDialogProps {
  postId: string;
  title: string;
  content: string;
}

const PostUpdateDialog: React.FC<PostUpdateDialogProps> = ({
  postId,
  title,
  content,
}) => {
  const { t } = useTranslation();
  const { updatePost } = usePostUpdate();
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updatePost(String(postId), {
        title: newTitle || title,
        content: newContent || content,
      });
      closeModal();
    },
    [newTitle, newContent]
  );

  return (
    <>
      <Button aria-haspopup="dialog" appearance="primary" onClick={openModal}>
        {t("editPost")}
      </Button>

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <form onSubmit={onSubmit}>
              <ModalHeader>
                <Grid
                  gap="space.200"
                  templateAreas={["title close"]}
                  xcss={gridStyles}
                >
                  <Flex xcss={closeContainerStyles} justifyContent="end">
                    <IconButton
                      appearance="subtle"
                      icon={CrossIcon}
                      label="Close Modal"
                      onClick={closeModal}
                    />
                  </Flex>
                  <Flex xcss={titleContainerStyles} justifyContent="start">
                    <ModalTitle> {t("editPost")}</ModalTitle>
                  </Flex>
                </Grid>
              </ModalHeader>
              <ModalBody>
                <Label htmlFor="title">{t("title")}</Label>
                <TextArea
                  id="title"
                  name="title"
                  resize="auto"
                  maxHeight="40vh"
                  defaultValue={title}
                  onChange={(e) => setNewTitle(e.currentTarget.value)}
                />
                <Label htmlFor="content">{t("content")}</Label>
                <TextArea
                  id="content"
                  name="content"
                  resize="auto"
                  maxHeight="40vh"
                  defaultValue={content}
                  onChange={(e) => setNewContent(e.currentTarget.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button appearance="subtle" onClick={closeModal}>
                  {t("cancel")}
                </Button>
                <Button appearance="primary" type="submit">
                  {t("update")}
                </Button>
              </ModalFooter>
            </form>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

export default PostUpdateDialog;
