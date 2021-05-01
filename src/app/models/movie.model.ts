import { Actor } from "./actor.model";
import { Comment } from "./comment.model";

export interface Movie {
  id: any;
  title: string;
  description: string;
  director: string;
  writer: string;
  category: string;
  actors: Array<Actor>;
  comments: Array<Comment>;
  releaseDate: string;
  imgLogoUrl: string;
  imgBackUrl: string;
}
