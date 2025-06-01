import TimeBlock from "./DigiteBlock";

interface TimerProps {
    timeBlockContent: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }
}

export default function TimerClock({ timeBlockContent }: TimerProps) {
    return (
    <div className='flex justify-center gap-6 text-4xl font-mono'>
        <TimeBlock label='Dias' value={timeBlockContent.days} />
        <TimeBlock label='Horas' value={timeBlockContent.hours} /> :
        <TimeBlock label='Minutos' value={timeBlockContent.minutes} /> :
        <TimeBlock label='Segundos' value={timeBlockContent.seconds} />
      </div>
    )
}