/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";
import { useState } from "react";

import InlineEdit from "@atlaskit/inline-edit";
import { Box, xcss } from "@atlaskit/primitives";
import Textfield from "@atlaskit/textfield";

const readViewContainerStyles = xcss({
  font: "font.body",
  paddingBlock: "space.100",
  paddingInline: "space.075",
  wordBreak: "break-word",
});

interface UserInlineInputProps {
  label: string;
  defaultValue: string;
  onConfirm: (v: string) => Promise<void>;
}

const UserInlineInput: React.FC<UserInlineInputProps> = ({
  label,
  defaultValue,
  onConfirm,
}) => {
  const [data, setData] = useState<string>();

  return (
    <Box paddingInlineStart="space.100" paddingInlineEnd="space.600">
      <InlineEdit
        defaultValue={data}
        label={label}
        editButtonLabel={data || defaultValue}
        editView={({ errorMessage, ...fieldProps }) => (
          <Textfield {...fieldProps} autoFocus />
        )}
        readView={() => (
          <Box xcss={readViewContainerStyles}>{data || defaultValue}</Box>
        )}
        onConfirm={(v) => {
          setData(v);
          onConfirm(v);
        }}
      />
    </Box>
  );
};

export default UserInlineInput;
