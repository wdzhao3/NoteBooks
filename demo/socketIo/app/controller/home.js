'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const newslist = await this.ctx.service.homeServer.echo()

    let list = ''
    newslist.forEach(element => {
      list += `<li>${element.title}<p>${element.href}</p><p>作者：${element.anthor}</p></li>`
    });

    ctx.body = `<ol>${list}</ol>`;
  }
}

module.exports = HomeController;
