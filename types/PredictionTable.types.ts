interface ITableStatsData {
  exactScore: number;
  draw: number;
  goalsDIff: number;
  result: number;
  sumGoals: number;
  noMatched: number;
  total: number;
}

interface ITableData {
  userFirstName: string;
  userLastName: string;
  userName: string;
  userId: string;
  userPredData: ITableStatsData;
}
