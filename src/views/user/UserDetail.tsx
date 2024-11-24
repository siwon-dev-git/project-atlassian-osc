/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Stack } from "@atlaskit/primitives";

import useUser from "../../services/getUser";
import useUserUpdate, { UserUpdateProps } from "../../services/putUser";
import UserInlineInput from "./UserInlineInput";

const UserDetail = () => {
  const { t } = useTranslation();
  const { userId = "" } = useParams();
  const { user } = useUser(userId);
  const { updateUser } = useUserUpdate();

  const onUpdate = async (field: keyof UserUpdateProps, value: string) => {
    updateUser(userId, { ...user, ...{ [field]: value } });
  };

  return (
    <Stack>
      <UserInlineInput
        label={t("name")}
        defaultValue={user?.name || ""}
        onConfirm={(value) => onUpdate("name", value)}
      />
      <UserInlineInput
        label={t("id")}
        defaultValue={user?.username || ""}
        onConfirm={(value) => onUpdate("username", value)}
      />
      <UserInlineInput
        label={t("email")}
        defaultValue={user?.email || ""}
        onConfirm={(value) => onUpdate("email", value)}
      />
      <UserInlineInput
        label={t("phone")}
        defaultValue={user?.phone || ""}
        onConfirm={(value) => onUpdate("phone", value)}
      />
      <UserInlineInput
        label={t("website")}
        defaultValue={user?.website || ""}
        onConfirm={(value) => onUpdate("website", value)}
      />
      <UserInlineInput
        label={t("province")}
        defaultValue={user?.province || ""}
        onConfirm={(value) => onUpdate("province", value)}
      />
      <UserInlineInput
        label={t("city")}
        defaultValue={user?.city || ""}
        onConfirm={(value) => onUpdate("city", value)}
      />
      <UserInlineInput
        label={t("district")}
        defaultValue={user?.district || ""}
        onConfirm={(value) => onUpdate("district", value)}
      />
      <UserInlineInput
        label={t("street")}
        defaultValue={user?.street || ""}
        onConfirm={(value) => onUpdate("street", value)}
      />
      <UserInlineInput
        label={t("zipcode")}
        defaultValue={user?.zipcode || ""}
        onConfirm={(value) => onUpdate("zipcode", value)}
      />
    </Stack>
  );
};

export default UserDetail;
