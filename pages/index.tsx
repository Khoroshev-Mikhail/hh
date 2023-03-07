import { Checkbox, Label, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'


export default function Home() {
  const [vacansyName, setVacansyName] = useState<string>('')
  const [vacansyCompany, setVacansyCompany] = useState<string>('')
  const [reason, setReason] = useState<string>('это профильная IT компания, судя по описанию вакансии Вы заинтересованы в кадрах, а для меня это очень важный фактор потому что я хорошо умею работать в команде и нацелен на долгосрочное сотрудничество')
  const [goodStack, setGoodStack] = useState<string[]>([])
  const [badStack, setBadStack] = useState<string[]>([])
  const [stackResult, setStackResult] = useState<string[]>([])
  const myStack = ['JavaScript(ES6)', 'TypeScript' ,'React', 'NextJS', 'Redux', 'Redux Toolkit', 'Jest + React-Testing-Library', 'RTK Query', 'useSWR', 'HTML', 'CSS', 'SASS', 'LESS', 'NodeJS+Express', 'PostgreSQL', 'Prisma', 'Создание Telegram ботов', 'Google Apps Scripts', 'Адаптивная и кроссбраузерная верстка']
  const allStack = [...myStack, 'GraphQL', 'PHP', 'MongoDB', 'React Native', 'Vue', 'Angular']

  function handler(el: any){
    if(stackResult.includes(el)){
      setStackResult(state => state.filter(str => str != el))
    }
    if(!stackResult.includes(el)){
      setStackResult(state => state.concat([el]))
    }
  }
  useEffect(()=>{
    setGoodStack(stackResult.filter(el => myStack.includes(el)))
    setBadStack(stackResult.filter(el => !myStack.includes(el)))
  })
  return (
    <div className='container mx-auto px-4 grid grid-cols-2 gap-2'>
      <div>
      <div className='p-2'>
        <TextInput value={vacansyName} onChange={(e)=>setVacansyName(e.target.value)}/>
      </div>
      <div className='p-2'>
        <TextInput value={vacansyCompany} onChange={(e)=>setVacansyCompany(e.target.value)}/>
      </div>
      <div className='p-2'>
        <TextInput value={reason} onChange={(e)=>setReason(e.target.value)}/>
      </div>
      <div className='p-2'>
        {allStack.map(el => {
          return (
            <div>
              <Checkbox id={el} value={el} onChange={(e)=>handler(e.target.value)}/>
              <Label htmlFor={el}> {el}</Label>
            </div>
          )
        })}
      </div>

      </div>


      <div>
        <p className='pt-4'>
          Здравствуйте, меня зовут Михаил, я Frontend-разработчик, пишу вам по поводу вакансии "{vacansyName}" в компанию "{vacansyCompany}"!
        </p>
        <p className='pt-4'>
          Из технологий что Вы указали в вакансии я владею 
          {goodStack.length}/{stackResult.length}: {goodStack.slice(0, -1).map(el => `${el}, `)} {...goodStack.slice(-1)}.<br />
          { badStack.length > 0 &&
            <>
              Знаком, очень хочу изучить углубленно, но пока не было опыта работы с: {badStack.slice(0, -1).map(el => `${el}, `)} {...badStack.slice(-1)}.
            </>
          }
        </p>
        <p className='pt-4'> 
          Меня заинтересовала компания "{vacansyCompany}" потому что {reason}.
        </p>
        <p className='pt-4'>​​​​​​​Буду рад присоединиться к команде и вместе работать над крутыми проектами.<br/>
          ​Готов выполнить тестовое задание. Спасибо за обратную связь!
        </p>
        <p className='pt-4'>Мои контакты: +7(983)699-38-84<br />
          ​​​​​​​Telegram: @Mikhail38<br />
          Github: https://github.com/Khoroshev-Mikhail<br />
        </p>
      </div>
    </div>
  )
}
