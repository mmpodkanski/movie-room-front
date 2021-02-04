import { Actor } from "./actor.model";

export class Movie {
  id?: any;
  title?: string;
  description?: string;
  director?: string;
  producer?: string;
  category?: string;
  actors?: Array<Actor>;
}
