import http from "node:http";
import fs from "node:fs/promises";
import path from "path";
import {addNote} from "./notes.controller";

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        const content = await fs.readFile(path.join(basePath, 'index.ejs'))
        res.writeHeader(200, {
            'Content-Type': 'text/html'
        })

        res.end(content)
    } else if (req.method === 'POST'){
        const body = []
        res.writeHeader(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        })

        req.on('data', data => {
            body.push(Buffer.from(data))
        })

        req.on('end', () => {
            const title = body.toString().split('=')[1].replaceAll('+', ' ')
            addNote(title)

            res.end(`Title = ${title}`)
        })
    }
})
