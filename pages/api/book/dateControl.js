import getConfig from 'next/config'
import { conn } from '@config/db'
//import { apiHandler } from '@helpers/api'
const { serverRuntimeConfig } = getConfig()

//export default apiHandler(handler);

export default function handler(req, res){
  switch (req.method) {
    case 'POST':
        return newDate();
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function newDate(){
    const {startTime, day, month, year, email} = JSON.parse(req.body);
    //console.log(year)
    try {
        //Buscamos si usuario ya tiene cita
        let results = await conn.query('SELECT * FROM dates WHERE email = ?', [email]);
        const stringdata = JSON.stringify(results);
        const parsedata = JSON.parse(stringdata);
        conn.end();

        if(parsedata.length > 0){
          return res.status(200).json('User with date')
        }else {
          const results = conn.query('INSERT INTO dates SET ?', {startTime, day, email, month, year});
          conn.end();
          const stringdata = JSON.stringify(results);
          const parsedata = JSON.parse(stringdata);
          return res.status(200).json({data: parsedata});
        }

    } catch (error) {
        throw error
    }
  }

}
