import { Box, Typography } from "@mui/material";

export default function PredictionRules() {
  return (
    <Box>
      <Typography align="center" variant="h6">
        Правила гри та умови нарахування балів
      </Typography>
      <Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "20px",
            }}
          >
            <strong>1.</strong>
          </Typography>
          <Typography align="left" variant="body1">
            Прогноз на матч можна зробити лише до стартового свистка
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "20px",
            }}
          >
            <strong>2.</strong>
          </Typography>
          <Typography align="left" variant="body1">
            Здійснений прогноз змінити неможливо. Прогноз є здійсненим після
            настискання кнопки підтвердження та отримання сповіщення про те що
            прогноз прийнятий
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "20px",
            }}
          >
            <strong>3.</strong>
          </Typography>
          <Typography align="left" variant="body1">
            Подивитись прогнози інших учасників неможливо
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "20px",
            }}
          >
            <strong>4.</strong>
          </Typography>
          <Typography align="left" variant="body1">
            Інформація про здійснені прогнози іншими учасниками буде відображена
            на сторінці <strong>Турнірна таблиця</strong> у зведеному вигляді
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "20px",
            }}
          >
            <strong>5.</strong>
          </Typography>
          <Typography align="left" variant="body1">
            Розрахунок результатів відбувається автоматично по завершенню матчу
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "20px",
            }}
          >
            <strong>6.</strong>
          </Typography>
          <Typography align="left" variant="body1">
            Нарахування балів відбувається наступним чином:
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "34px",
            //   pl: "8px",
            }}
          >
            <strong>6.1.</strong>
          </Typography>
          <Typography align="left" variant="body1">
            За точно вгаданий рахунок нараховується 3 бали
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "34px",
            //   pl: "8px",
            }}
          >
            <strong>6.2.</strong>
          </Typography>
          <Typography align="left" variant="body1">За вгадану нічию проте не вгаданий рахунок нараховується 1.75
          бала (наприклад, прогноз був 2-2, а матч завершився з рахунком 1-1)
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "34px",
            //   pl: "8px",
            }}
          >
            <strong>6.3.</strong>
          </Typography>
          <Typography align="left" variant="body1">За вгаданий результат та різницю голів нараховується 1.5 бала
          (наприклад, прогноз був 3-1, а матч завершився з рахунком 4-2)
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "34px",
            //   pl: "8px",
            }}
          >
            <strong>6.4.</strong>
          </Typography>
          <Typography align="left" variant="body1">За вгаданий результат але не вгадану різницю голів нараховується
          1 бал (наприклад, прогноз був 2-0, а матч завершився з рахунком 5-1)
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              minWidth: "34px",
            //   pl: "8px",
            }}
          >
            <strong>6.5.</strong>
          </Typography>
          <Typography align="left" variant="body1">За вгадану кількість голів проте не вгаданий результат
          нараховується 0,25 бала (наприклад, прогноз був 2-0, а матч завершився
          з рахунком 1-1)
          </Typography>
        </Box>



      </Box>
    </Box>
  );
}
