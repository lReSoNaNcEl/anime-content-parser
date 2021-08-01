import * as cheerio from "cheerio";
import {get} from "request";
import {join} from "path"
import {writeFile, ensureDir} from "fs-extra"
import {Anime} from "./interfaces/anime.interface";

const Path = {
    PUBLIC: join(__dirname, 'public'),
    PARSER_RESULT_FILE: join(__dirname, 'public', 'anime.html')
}

get('https://a106.agorov.org/', {}, async (err, res) => {
    if (err) throw err

    const $ = cheerio.load(res.body)
    $('.shortstory').each((i, item) => {
        const title = $(item).find('h2 > a').text()
        const categories = []
        $(item).find('.shortstoryFuter i a').each((i, item) => {
            categories.push({
                title: $(item).text(),
                link: $(item).attr('href')
            })
        })

        const anime: Anime = {title, categories}
        console.log(anime)
    })


    await ensureDir(Path.PUBLIC)
    await writeFile(Path.PARSER_RESULT_FILE, res.body)

})