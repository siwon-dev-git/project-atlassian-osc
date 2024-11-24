/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from "@emotion/react";

import PageHeader from "@atlaskit/page-header";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import { BreadcrumbsItemProps } from "@atlaskit/breadcrumbs/dist/types/types";
import __noop from "@atlaskit/ds-lib/noop";

interface CommonPageHeaderProps {
  title: React.ReactNode;
  breadcrumbs: Array<Pick<BreadcrumbsItemProps, "href" | "text">>;
}

const CommonPageHeader: React.FC<CommonPageHeaderProps> = ({
  breadcrumbs,
  title,
}) => {
  return (
    <PageHeader
      breadcrumbs={
        <Breadcrumbs onExpand={__noop}>
          {breadcrumbs.map(({ text, href }) => (
            <BreadcrumbsItem key={text} text={text} href={href} />
          ))}
        </Breadcrumbs>
      }
    >
      {title}
    </PageHeader>
  );
};

export default CommonPageHeader;
