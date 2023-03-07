import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'

const startReason = 'это профильная IT компания, судя по описанию вакансии Вы заинтересованы в кадрах, а для меня это очень важный фактор потому что я хорошо умею работать в команде и нацелен на долгосрочное сотрудничество'
export default function Home() {
  const [vacansyName, setVacansyName] = useState<string>('')
  const [vacansyCompany, setVacansyCompany] = useState<string>('')
  const [reason, setReason] = useState<string>(startReason)
  const [goodStack, setGoodStack] = useState<string[]>([])
  const [badStack, setBadStack] = useState<string[]>([])
  const [stackResult, setStackResult] = useState<string[]>([])
  const myStack = ['JavaScript(ES6)', 'TypeScript' ,'React', 'NextJS', 'Redux', 'Redux Toolkit',
                  'Jest + React-Testing-Library', 'RTK Query', 'useSWR', 'HTML5', 'CSS3', 'SASS', 'SCSS', 'LESS', 'NodeJS+Express', 
                  'PostgreSQL', 'Prisma', 'Создание Telegram ботов', 'Google Apps Scripts', 
                  'Адаптивная и кроссбраузерная верстка', 'Material UI', 'Bootstrap 4', 'Tailwind', 'React-hook-form', 'Formik',
                  'Flowbite', 'Redux-thunk', 'Git'
                ]
  const allStack = [...myStack, 'GraphQL', 'Storybook', 'PHP', 'MongoDB', 'React Native', 'Vue', 'Angular', 'Redux-saga', 'MongoDB']

  function handler(el: any){
    if(stackResult.includes(el)){
      setStackResult(state => state.filter(str => str != el))
    }
    if(!stackResult.includes(el)){
      setStackResult(state => state.concat([el]))
    }
  }
  function copy(){
    const text = document.getElementById('#text')?.innerHTML ?? '2ss'
    window.navigator.clipboard.writeText(text)
  }
  useEffect(()=>{
    setGoodStack(stackResult.filter(el => myStack.includes(el)))
    setBadStack(stackResult.filter(el => !myStack.includes(el)))
  }, [stackResult])
  return (
    <div className='container mx-auto px-4 grid grid-cols-2 pt-2'>
      <div className='border-r-2 pr-2'>
        <div className='p-2'>
          <Label htmlFor='vacancyName'>Название вакансии</Label>
          <TextInput id="vacancyName" value={vacansyName} onChange={(e)=>setVacansyName(e.target.value)}/>
        </div>
        <div className='p-2'>
          <Label htmlFor='vacancyCompany'>в Компанию</Label>
          <TextInput value={vacansyCompany} onChange={(e)=>setVacansyCompany(e.target.value)}/>
        </div>
        <div className='p-2'>
          <Label htmlFor='reason'>Почему мне нравится ваша компания</Label>
          <TextInput id='reason' value={reason} onChange={(e)=>setReason(e.target.value)}/>
        </div>
        <div className='p-2 grid grid-cols-2'>
          {allStack.sort().map(el => {
            return (
              <div className='col-span-1'>
                <Checkbox id={el} value={el} onChange={(e)=>handler(e.target.value)}/>
                <Label htmlFor={el}> {el}</Label>
              </div>
            )
          })}
        </div>

        <Button onClick={()=>{
          setStackResult([])
          setReason(startReason)
          setVacansyName('')
          setVacansyCompany('')
          //очисти все чекбоксы
        }}>Очистить</Button>
      </div>

      <div id="text" className='pl-2'>
        <p className='pt-4'>
          Здравствуйте, меня зовут Михаил, я Frontend-разработчик, пишу вам по поводу вакансии "{vacansyName}" в компанию "{vacansyCompany}"!
        </p>
        <p className='pt-4'>
          Из технологий что Вы указали в вакансии я владею {goodStack.length}/{stackResult.length}: {goodStack.slice(0, -1).map(el => `${el}, `)} {...goodStack.slice(-1)}.<br />
          { badStack.length > 0 &&
            <>
              Знаком, очень хочу изучить углубленно, но пока не было опыта работы с: {badStack.slice(0, -1).map(el => `${el}, `)} {...badStack.slice(-1)}.<br />
            </>
          }
          Так же вот список технологий которыми я уверенно владею и могу применять в работе: {myStack.filter(el => !goodStack.includes(el) && !badStack.includes(el)).slice(0, -1).map(el => `${el}, `)} {myStack.filter(el => !goodStack.includes(el) && !badStack.includes(el)).slice(-1)}.
        </p>
        <p className='pt-4'> 
          Меня заинтересовала компания "{vacansyCompany}" потому что {reason}.
        </p>
        <p className='pt-4'>​​​​​​​Буду рад присоединиться к команде и вместе работать над крутыми проектами.<br/>
          ​Готов выполнить тестовое задание. <br/>Так же я являюсь студентом и готов рассмотреть возможность пройти у вас практику!<br/>
           Спасибо за обратную связь!
        </p>
        <p className='pt-4'>Мои контакты: +7(983)699-38-84<br />
          ​​​​​​​Telegram: @Mikhail38<br />
          Github: https://github.com/Khoroshev-Mikhail<br />
        </p>
        <Button className='mt-5' onClick={()=>copy()}>Скопировать</Button>
      </div>
    </div>
  )
}
