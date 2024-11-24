/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Flex } from "@atlaskit/primitives";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";
import { Label } from "@atlaskit/form";
import Select from "@atlaskit/select";
import { DatePicker } from "@atlaskit/datetime-picker";
import { commonCompWrap, commonInputWrap } from "../../assets/xcss";
import usePosts from "../../services/getPosts";
import { formatDate } from "../../utils/formatDate";

const PostList = () => {
  const { t } = useTranslation();
  const { posts, isLoading } = usePosts();
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const head = {
    cells: [
      { key: "title", content: t("title") },
      { key: "updatedAt", content: t("lastUpdated") },
    ],
  };

  const rows = posts
    .filter((d) => {
      if (title) return d.title === title;
      if (date) return formatDate(d.updatedAt) === date;
      return true;
    })
    .map((d, i) => {
      return {
        key: `post-row-${i}-${d.id}`,
        cells: [
          {
            key: "title",
            content: <Link to={`/posts/${d.id}`}>{d.title}</Link>,
          },
          { key: "updatedAt", content: formatDate(d.updatedAt) },
        ],
      };
    });

  const suggestions = Array.from(new Set(posts.map((d) => d.title))).map(
    (title) => ({
      label: title,
      value: title,
    })
  );

  return (
    <Box xcss={commonCompWrap}>
      <Flex gap="space.500">
        <Box xcss={commonInputWrap}>
          <Label htmlFor="single-select-name-clearable">
            {t("titleSearch")}
          </Label>
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
            placeholder={t("searchByTitle")}
            onChange={(d) => setTitle(d?.value || "")}
          />
        </Box>
        <Box xcss={commonInputWrap}>
          <Label id="date" htmlFor="default-date-picker">
            {t("dateSearch")}
          </Label>
          <DatePicker
            id="default-date-picker"
            clearControlLabel="Clear choose date"
            shouldShowCalendarButton
            inputLabelId="date"
            openCalendarLabel="open calendar"
            onChange={(d) => setDate(d)}
          />
        </Box>
      </Flex>
      <DynamicTableStateless
        head={head}
        rows={rows}
        rowsPerPage={10}
        page={page}
        onSetPage={(p) => setPage(p)}
        isLoading={isLoading}
        emptyView={<p>{t("emptyTableMessage")}</p>}
      />
    </Box>
  );
};

export default PostList;
