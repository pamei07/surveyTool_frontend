import {Option} from "./option";

export class RankingGroup {
  id: number | undefined;

  // Labels for scale:
  lowestRated: string | undefined;
  highestRated: string | undefined;

  options: Option[] = [];
}
