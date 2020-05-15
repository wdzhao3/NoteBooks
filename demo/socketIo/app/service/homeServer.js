'use strict';

const Service = require('egg').Service;
const superagent = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')
const url = require('url')

var cnodeUrl = 'https://cnodejs.org/'

class HomeServerService extends Service {
    /**
     * 并发
     */
    async echo() {
        return new Promise((resolve) => {
            superagent.get(cnodeUrl)
                .end(function (err, res) {
                    console.log('111111')
                    if (err) {
                        resolve(err)
                    }
                    let $ = cheerio.load(res.text)
                    let items = []
                    let topic_list = $('#topic_list .cell')
                    topic_list.length = 3
                    topic_list.each(function (idx, element) {
                        let $element = $(element)
                        // items.push({
                        //     title: $element.find('.topic_title').attr('title'),
                        //     href: url.resolve(cnodeUrl, $element.find('.topic_title').attr('href')),
                        //     anthor: $element.find('.user_avatar').find('img').attr('title')
                        // })
                        items.push(url.resolve(cnodeUrl, $element.find('.topic_title').attr('href')))
                    })
                    const ep = new eventproxy()
                    ep.after('topic_html', items.length, function (topics) {
                        topics = topics.map(function (topicPair) {
                            let Url = topicPair[0]
                            let Html = topicPair[1]
                            let $ = cheerio.load(Html)
                            return ({
                                title: $('.topic_full_title').text().trim(),
                                href: Url,
                                comment1: $('.reply_content').eq(0).text().trim()
                            })
                        })
                        console.log(topics)
                        resolve(topics)
                    })
                    items.forEach(href => {
                        superagent.get(href)
                            .end((err, res) => {
                                ep.emit('topic_html', [href, res.text])
                            })
                    })


                })
        })
    }
}

module.exports = HomeServerService;
