export function buildBlogPostDescription(excerpt?: string): string {
  return excerpt?.trim() ?? "";
}
