//import getConfig from 'next/config'
import { conn } from '@config/db'

export default function handler(req, res){
  switch (req.method) {
    case 'POST':
        return getBooksWithParameters(req, res);
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
      }
  }

async function getBooksWithParameters(req, res) {
    //const {day, month, year} = JSON.parse(req.body);
    try {
      const {day, month, year} = JSON.parse(req.body);
      //console.log(day, month, year)
      //const results = conn.query('SELECT * FROM dates WHERE day = ? && month = ? year = ?', {day, month, year});
      let results = await conn.query('SELECT * FROM dates WHERE day = ? AND month = ? AND year = ?', [day, month, year]);
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      conn.end();

      if(parsedata.length > 0){
        return res.status(200).json({data:parsedata});
      }else {
        return res.status(200).json('No dates');
      }

    } catch (error) {
      //Cualquier otro error
        throw error
    }
  }
