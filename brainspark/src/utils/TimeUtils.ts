import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const horaEmSaoPaulo = dayjs().tz('America/Sao_Paulo');

export const getHourUTC3 = () => {
    return horaEmSaoPaulo.format('YYYY-MM-DDTHH:mm:ss');
}