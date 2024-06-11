interface IPredictFixtureData {
  id: string;
  userId: string;
  fixtureId: number;
  awayTeamGoals: number;
  homeTeamGoals: number;
  createdAt: string;
  updatedAt: string;
  predictionResult: {
    points?: number,
    text: string
  }
}

interface IPredictionsData {
  fixtureId: number;
  date_text: string;
  dateTime: Date | any;
  statusShort: shortMatchStatusType;
  round: string;
  online: {
    elapsedTime: number;
    goalsHome: number;
    goalsAway: number;
  } | null;

  homeTeamNameOriginal: string;
  homeTeamId: number;
  homeTeamLogo: string;
  homeTeamGoalsFT: number | null;
  homeTeamResult: resultMatchType;

  awayTeamNameOriginal: string;
  awayTeamId: number;
  awayTeamLogo: string;
  awayTeamGoalsFT: number | null;
  awayTeamResult: resultMatchType;

  prediction: IPredictFixtureData | null;
}
