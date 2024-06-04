type shortMatchStatusType = 'NS' | 'FT' | 'CANC' | 'TBD' | '1H' | '2H' | 'HT' | 'PST'

type resultMatchType = 'W' | 'D' | 'L' | null

interface IFixtureData {
	fixtureId: number
	date_text: string
	dateTime: Date | any
	referee: string
	statusLong: string
	statusShort: shortMatchStatusType
	city: string
	stadiumName: string
	stadiumId: number
	round: string
	leagueId: number
	leagueName: string

	online: {
		elapsedTime: number
		goalsHome: number
		goalsAway: number
	} | null

	homeTeamNameOriginal: string
	homeTeamId: number
	homeTeamLogo: string
	homeTeamGoalsHT: number | null
	homeTeamGoalsFT: number | null
	homeTeamResult: resultMatchType

	awayTeamNameOriginal: string
	awayTeamId: number
	awayTeamLogo: string
	awayTeamGoalsHT: number | null
	awayTeamGoalsFT: number | null
	awayTeamResult: resultMatchType
}