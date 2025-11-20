import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { JSX } from "react";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";
import Counter from "./Counter";
import Mermaid from "./Mermaid";
import {
  Table as UITable,
  TableBody as UITableBody,
  TableCell as UITableCell,
  TableHead as UITableHead,
  TableHeader as UITableHeader,
  TableRow as UITableRow,
} from "./ui/table";
import { cn } from "@/lib/utils";

function Code({ children, ...props }: any) {
  const className = props.className ?? "";

  if (className.includes("language-mermaid")) {
    return <Mermaid chart={String(children).trim()} />;
  }

  let codeHTML = highlight(String(children));
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function Table(props: JSX.IntrinsicElements["table"]) {
  const { className, ...rest } = props;
  return (
    <div className="my-8">
      <UITable
        className={cn(
          "w-full text-sm [&_td]:px-4 [&_td]:py-3 [&_th]:px-4 [&_th]:py-3",
          className,
        )}
        {...rest}
      />
    </div>
  );
}

function TableHeaderSection(props: JSX.IntrinsicElements["thead"]) {
  const { className, ...rest } = props;
  return (
    <UITableHeader
      {...rest}
      className={cn(
        "bg-muted/70 text-foreground [&_tr]:border-b [&_tr]:border-border/60",
        "[&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide",
        className,
      )}
    />
  );
}

const components = {
  code: Code,
  Counter,
  table: Table,
  thead: TableHeaderSection,
  tbody: UITableBody,
  th: UITableHead,
  td: UITableCell,
  tr: UITableRow,
};

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps,
) {
  const { components: componentsProp, options: optionsProp, ...rest } = props;

  const mergedComponents = {
    ...components,
    ...(componentsProp || {}),
  };

  const mergedOptions: MDXRemoteProps["options"] = {
    ...(optionsProp || {}),
    mdxOptions: {
      ...(optionsProp?.mdxOptions || {}),
      remarkPlugins: [
        remarkGfm,
        ...(optionsProp?.mdxOptions?.remarkPlugins || []),
      ],
    },
  };

  return (
    <MDXRemote
      {...rest}
      components={mergedComponents}
      options={mergedOptions}
    />
  );
}
