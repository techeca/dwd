import {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Typography, Button, Paper, Box, TextField, Fade, Stack, Snackbar, Alert, Collapse, IconButton, Input } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { bookService } from '../services/index'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker, {registerLocale} from 'react-datepicker'
import es from  'date-fns/locale/es'
registerLocale('es', es)

export default function Home() {
  const [startDate, setStartDate] = useState(new Date())
  const [date, setDate] = useState({day: '', month:'', year:'', dayWeek:''})
  const [checked, setChecked] = useState(true);
  const [arrHours, setArrHours] = useState([])
  const [datesOut, setDatesOut] = useState([])
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [showMsg, setMsg] = useState({msg: 'none', variant:'info'})

  const dateSelected = async (x) => {
    let temp = []
    let cantTemp = 0
    let cleanHour = {day:'',email:'',idDate:'',month:'',startTime:'',year:''}
    //let tempdate = {day: '', month:'', year:'', dayWeek:''}
    //x.preventDefault();
    setArrHours(Array.from({length: 10}, (_, i) => i + 9))
    setStartDate(x)
    //parseDay(x.getDay())
    parseDMY(x.getDate(), x.getMonth(), x.getFullYear())
    //console.log(parseD(x.getDate()), parseM(x.getMonth()), x.getFullYear())
    bookService.getBook(parseD(x.getDate()), parseM(x.getMonth()), x.getFullYear())
        .then((d) => {
          if(d !== 'No dates'){
            let hourTaked = d.data.map((date) => parseInt(date.startTime))
            //let temp = arrHours.filter((hourM) => hourM !== hourTaked.find((hourT) => hourT === hourM))
              setDatesOut(hourTaked)
              //setChecked(false)
          }
          setChecked(false)
            //console.log(temp)
        })
        .catch(error => {
          console.log(error)
        })
  }

  function prueba(){
    console.log(datesOut)
    messagesBox('succes', 'DONE!!')
    setOpen(true)
  }

  function messagesBox(severity, msg){
    setMsg({msg:`${msg}`, variant:`${severity}`})
    setOpen(true)
  }

  function parseDay(x){
    //Obtiene el dia entregado por el component de fecha y retorna que dia es en string
    if(x === 1){date.dayWeek = 'monday'}
    if(x === 2){date.dayWeek = 'tuesday'}
    if(x === 3){date.dayWeek = 'wednesday'}
    if(x === 4){date.dayWeek = 'thursday'}
    if(x === 5){date.dayWeek = 'friday'}
    if(x === 6){date.dayWeek = 'saturday'}
    if(x === 0){date.dayWeek = 'sunday'}

    return date.dayWeek
  }
  function parseD(d){
  var dN = d.toString()
  if(d < 10){dN = `0${dN}`}else{dN = d}
  date.day = `${dN}`

  return `${dN}`
}
  function parseM(m){
var mN = m+1
if(m < 10){mN = `0${mN}`}else{mN = m}
date.month = `${mN}`

return `${mN}`
}
  function parseDMY(d, m, y){
  var dN = d.toString()
  var mN = m+1
  if(d < 10){dN = `0${dN}`}else{dN = d}
  if(m < 10){mN = `0${mN}`}else{mN = m}
  //travelSelected.fecha = `${dN}`+`${mN}`+`${y}`
  date.day = `${dN}`
  date.month = `${mN}`
  date.year = `${y}`
  }

  function parseStringHour(x){
    if(x > 11){return `${x}:00pm`}
    else {return `${x}:00am`}
  }
  function takeHour(x){
    console.log(email)
    let temphour = 0
    if(email === ''){
      setOpen(true)
      messagesBox('warning', 'Please enter your EMAIL.')
    }else {
      bookService.newDate(x, date.day, date.month, date.year, email)
      .then((d) => {
        if(d === 'User with date'){
          messagesBox('error', `This EMAIL already has an appointment`)
        }else {

          if(x < 10){temphour = `0${x}`}else{temphour = x}
          setChecked(true)
          messagesBox('success', `You have a date with death!!, Date: ${date.month}-${date.day}-${date.year} ${temphour}:00`)
          //setOpen(true)
          setEmail('')
        }
        //console.log('hora tomada')

      })
      .catch(error => {
        console.log(error)
      })
    }

  }

  function firstPanel(){
  return(
    <Paper elevation={1} sx={{p:5, justifyContent:'center', display:'flex', flexDirection:'column'}}>
      <Typography variant='body1'>Select a date:</Typography>
      <DatePicker locale='en' selected={startDate} onChange={(startDate) => dateSelected(startDate)} customInput={<TextField sx={{mt:1}} />} placeholderText="Click here" />

    </Paper>
  )
}
  function closeListHours(){
    setDatesOut([])
    setChecked(true)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Dancing with Death</title>
        <meta name="description" content="muahahaha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Box sx={{display:'flex', justifyContent:'space-around', m:10, flexWrap:'wrap'}}>

        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
              <Alert severity={showMsg.variant} action={<IconButton aria-label="close"  color="inherit"  size="small" onClick={() => { setOpen(false)}}> <CloseIcon fontSize="inherit" /> </IconButton>} sx={{ mb: 2 }}>
                {showMsg.msg}
              </Alert>
            </Collapse>
        </Box>

          {checked ? firstPanel() :
            <Box sx={{ width: '100%'}}>


              <Box sx={{display:'flex', justifyContent:'space-between', mb:4, mx:2}}>
              <Button sx={{width:'20%'}} variant='contained' color='error'  onClick={() => closeListHours()}>Back</Button>
              <Input sx={{display:'flex', width:'50%'}}  placeholder="Email" onInput={(e) => setEmail(e.target.value)} />
              </Box>

             <Stack sx={{m:1}} spacing={2}>

              {arrHours.filter((hour) => hour !== datesOut.find((hourT) => hourT === hour)).length > 0 ? arrHours.filter((hour) => hour !== datesOut.find((hourT) => hourT === hour)).map((hour) =>
                <Paper variant='outlined' key={hour} sx={{p:1, display:'flex', flexDirection:'row', justifyContent:'space-between', }}>
                  <Typography variant='body1' sx={{m:1}}>From: {parseStringHour(hour)}</Typography><Typography variant='body1' sx={{m:1}}>To: {parseStringHour(hour+1)}</Typography>

                  <Button variant='outlined' onClick={() => takeHour(hour)}>Take</Button>
                </Paper>
              ): <Alert severity={showMsg.variant} sx={{ mb: 2 }}>
                No dates availables
              </Alert>}
             </Stack>
            </Box>
          }
        </Box>

    </div>
  )
}
