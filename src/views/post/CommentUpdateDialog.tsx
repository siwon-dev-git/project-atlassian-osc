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
import useCommentUpdate from "../../services/putComment";

const gridStyles = xcss({
  width: "100%",
});

const closeContainerStyles = xcss({
  gridArea: "close",
});

const titleContainerStyles = xcss({
  gridArea: "title",
});

interface CommentUpdateDialogProps {
  commentId: string;
  comment: string;
}

const CommentUpdateDialog: React.FC<CommentUpdateDialogProps> = ({
  commentId,
  comment,
}) => {
  const { t } = useTranslation();
  const { updateComment } = useCommentUpdate();
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState(comment);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateComment(commentId, { content: newComment });
      closeModal();
    },
    [newComment]
  );

  return (
    <>
      <Button aria-haspopup="dialog" appearance="primary" onClick={openModal}>
        {t("edit")}
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
                    <ModalTitle>{t("editComment")}</ModalTitle>
                  </Flex>
                </Grid>
              </ModalHeader>
              <ModalBody>
                <TextArea
                  id="comment"
                  name="comment"
                  resize="auto"
                  maxHeight="40vh"
                  defaultValue={comment}
                  onChange={(e) => setNewComment(e.currentTarget.value)}
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

export default CommentUpdateDialog;
