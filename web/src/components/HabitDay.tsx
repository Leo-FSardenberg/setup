import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx'

import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';


interface HabitProps{
    date: Date,
    defaultCompleted?: number,
    amount?: number,
}


export function HabitDay({defaultCompleted =0 ,amount = 0, date}: HabitProps){
 const [completed, setCompleted] = useState(defaultCompleted)
 
 const completedPercenatage = amount > 0 ? Math.round((completed/amount)*100) : 0
 
 const dayAndMonth = dayjs(date).format('DD/MM')
 const dayOfWeek =   dayjs(date).format('dddd')

 function handleCompleredChanged(completed: number){
    setCompleted(completed)
 }

 return (
<Popover.Root>
<Popover.Trigger 
className={clsx( "w-10 h-10b border-2 rounded-lg transition-colors", {
    'bg-zinc-900 border-zinc-800': completedPercenatage === 0,
    'bg-violet-900 border-violet-700': completedPercenatage > 0 && completedPercenatage < 20,
    'bg-violet-800 border-violet-600': completedPercenatage >= 20 && completedPercenatage < 40,
    'bg-violet-700 border-violet-500': completedPercenatage >= 40 && completedPercenatage < 60,
    'bg-violet-600 border-violet-500': completedPercenatage >= 60 && completedPercenatage < 80,
    'bg-violet-500 border-violet-400': completedPercenatage >= 80,
}) } />
<Popover.Portal>
    <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
    <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
        <span className='font-extrabold leading-tight mt-1 text-2xl'>{dayAndMonth}</span>
        
        <ProgressBar progress={completedPercenatage}/>
        <HabitsList date={date} onCompletedChanged={ handleCompleredChanged}/>

    <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
    </Popover.Content>
</Popover.Portal>
</Popover.Root>
    )
}