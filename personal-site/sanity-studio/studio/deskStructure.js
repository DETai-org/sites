import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Контент")
    .items([S.documentTypeListItem("post").title("Посты")]);
