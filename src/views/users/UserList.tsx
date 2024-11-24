/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@atlaskit/primitives";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";
import { Label } from "@atlaskit/form";
import Select from "@atlaskit/select";
import { useTranslation } from "react-i18next";
import useUsers from "../../services/getUsers";
import { commonCompWrap, commonInputWrap } from "../../assets/xcss";

const UserList = () => {
  const { t } = useTranslation();
  const { users, isLoading } = useUsers();
  const [searchedName, setSearchedName] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const head = {
    cells: [
      { key: "name", content: t("name") },
      { key: "username", content: t("id") },
      { key: "email", content: t("email") },
      { key: "updatedAt", content: t("lastUpdated") },
    ],
  };

  const rows = users
    .filter((d) => {
      if (!searchedName) return true;
      return d.name === searchedName;
    })
    .map((d, i) => {
      return {
        key: `user-row-${i}-${d.id}`,
        cells: [
          {
            key: "name",
            content: <Link to={`/users/${d.id}`}>{d.name}</Link>,
          },
          { key: "username", content: d.username },
          { key: "email", content: d.email },
          { key: "updatedAt", content: d.updatedAt },
        ],
      };
    });

  const suggestions = Array.from(new Set(users.map((d) => d.name))).map(
    (name) => ({
      label: name,
      value: name,
    })
  );

  return (
    <Box xcss={commonCompWrap}>
      <Box xcss={commonInputWrap}>
        <Label htmlFor="single-select-name-clearable">{t("userSearch")}</Label>
        <Select
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          inputId="single-select-name-clearable"
          // eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
          className="single-select"
          classNamePrefix="react-select"
          isClearable={true}
          options={suggestions}
          placeholder={t("searchByUsername")}
          onChange={(d) => setSearchedName(d?.value || "")}
        />
      </Box>
      <DynamicTableStateless
        head={head}
        rows={rows}
        rowsPerPage={5}
        page={page}
        onSetPage={(p) => setPage(p)}
        isLoading={isLoading}
        emptyView={<p>{t("emptyTableMessage")}</p>}
      />
    </Box>
  );
};

export default UserList;
