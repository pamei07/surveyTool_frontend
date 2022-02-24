import {Option} from "./option";

export class RankingGroup {
  id: number | undefined;
  leastRated_label: string | undefined;
  highestRated_label: string | undefined;
  options: Option[] = [];
}
