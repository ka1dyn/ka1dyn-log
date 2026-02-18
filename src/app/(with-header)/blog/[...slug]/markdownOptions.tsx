import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const mdCustomStyle = {
  h1: ({ ...props }) => {
    const text = props.children?.toString() || "";
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return <h1 id={id} className="text-3xl mb-6 mt-8 first:mt-0" {...props} />;
  },
  h2: ({ ...props }) => {
    const text = props.children?.toString() || "";
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return (
      <h2
        id={id}
        className="text-2xl mb-4 mt-12 first:mt-0 pb-3 border-b-2 border-primary/20"
        {...props}
      />
    );
  },
  h3: ({ ...props }) => {
    const text = props.children?.toString() || "";
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return <h3 id={id} className="text-xl mb-3 mt-8" {...props} />;
  },
  p: ({ ...props }) => (
    <p
      className="mb-4 last:mb-0 leading-relaxed text-foreground/90"
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <ul className="list-none space-y-2 mb-4 ml-6" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="list-decimal space-y-2 mb-4 ml-6" {...props} />
  ),
  li: ({ ...props }) => (
    <li
      className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-primary/60 before:rounded-full"
      {...props}
    />
  ),
  code: ({
    className,
    children,
    ...props
  }: {
    className: string;
    children: any;
    props: any;
  }) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <code
        className={`${className} block bg-slate-900 text-slate-100 rounded-lg p-4 mb-4 text-sm`}
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className="bg-accent/30 text-primary px-1.5 py-0.5 rounded text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ ...props }) => (
    <pre
      className="mb-4 rounded-lg whitespace-pre-wrap w-full overflow-x-auto"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className="border-l-4 border-primary/60 bg-accent/30 px-4 py-3 mb-4 italic rounded-r-lg"
      {...props}
    />
  ),
  strong: ({ ...props }) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};

export const mdCustomOption = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
    format: "md" as const,
  },
};
