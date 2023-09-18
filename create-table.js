import {sql} from './db.js'


sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration TEXT
);
`.then(()=>{
    console.log('Created table "videos"!')
})