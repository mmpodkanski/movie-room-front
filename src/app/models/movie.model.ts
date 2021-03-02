import { Actor } from "./actor.model";
import { Comment } from "./comment.model";

export class Movie {
  id?: any;
  title?: string;
  description?: string;
  director?: string;
  producer?: string;
  category?: string;
  actors?: Array<Actor>;
  comments?: Array<Comment>;
  imageUrl?: string;
}
