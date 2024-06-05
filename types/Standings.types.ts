interface IStandingStatsData {
  played: number | null;
  win: number | null;
  draw: number | null;
  lose: number | null;
  goals: {
    for: number | null;
    against: number | null;
  };
}

interface IStandingsData {
  all: IStandingStatsData;
  away: IStandingStatsData;
  description: string;
  form: null | string;
  goalsDiff: 0;
  group: string;
  home: IStandingStatsData;
  points: number;
  rank: number;
  status: "same";
  team: {
    id: number;
    name: string;
    logo: string;
  };
  update: string;
}


interface IStandingState {
    groupName: string,
    data: IStandingsData[] 
}