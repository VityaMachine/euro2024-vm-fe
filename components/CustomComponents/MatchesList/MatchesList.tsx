import { Box, Typography } from "@mui/material";

export default function MatchesList({
  fixtures,
  selectedRound,
}: {
  fixtures: IFixtureData[];
  selectedRound: string;
}) {
  return <Box>
    <Typography align="center">Перелік матчів стадії <strong>{selectedRound}</strong></Typography>
    <Box>

        list of matches
    </Box>

  </Box>;
}
