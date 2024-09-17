import { DocumentInterface } from "@langchain/core/documents";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function generateEmbeddings() {
  const loader = new DirectoryLoader(
    "src/app",
    {
      ".tsx": (path) => new TextLoader(path),
    },
    true,
  );

  const docs = (await loader.load())
    .filter((doc) => doc.metadata.source.endsWith("page.tsx"))
    .map((doc): DocumentInterface => {
      const url =
        doc.metadata.source
          .replace(/\\/g, "/") // replace "\\" with "/"
          .split("/src/app")[1]
          .split("/page.tsx")[0] || "/";

      const pageContentTrimmed = doc.pageContent
        .replace(/^import.*$/gm, "") // remove all import statements
        .replace(/ className=(["']).*?\1| className={.*?}/g, "") // remove all className props
        .replace(/^\s*[\r]/gm, "") // remove empty lines
        .trim();

      return { pageContent: pageContentTrimmed, metadata: { url } };
    });

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");

  const splitDocs = await splitter.splitDocuments(docs);

  console.log(splitDocs);
}

generateEmbeddings();
