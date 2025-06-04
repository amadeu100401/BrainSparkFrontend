import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const horaEmSaoPaulo = dayjs().tz('America/Sao_Paulo');

export const getHourUTC3 = () => {
    return horaEmSaoPaulo.format('YYYY-MM-DDTHH:mm:ss');
}

export const getFormatedDate = (date: string) => {
    const dateFormated = new Date(date);
    return dateFormated.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export const getFormatedHour = (date: string) => {
    const dateFormated = new Date(date);
    return dateFormated.toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}