import { baseBlogPosts } from "./blog.base";
import { BlogPostBase } from "./types";

export function getAllBlogPostsClient(): BlogPostBase[] {
  return baseBlogPosts;
}
