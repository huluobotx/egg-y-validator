'use strict';

const Controller = require('egg').Controller;
const assert = require('power-assert');

class HomeController extends Controller {
  async index() {
    await this.ctx.verify('login.login', 'query');
    this.ctx.body = 'hi, ' + this.app.plugins.validator.name;
  }
  async a() {
    await this.ctx.verify('heihei', this.ctx.query);
    this.ctx.body = 'hi, ' + this.app.plugins.validator.name;
  }
  async b() {
    const ret = await this.ctx.verify(
      {
        name: 'string'
      },
      async () => {
        return this.ctx.query;
      }
    );
    this.ctx.body = 'hi, ' + this.app.plugins.validator.name;
  }
  async d() {
    await this.ctx.verify('haha', async () => {
      return { name: '123', email: 'ck123.com' };
    });
    this.ctx.body = 'hi, ' + this.app.plugins.validator.name;
  }
  async f() {
    const ret = await this.ctx.verify('haha.aa', async () => {
      return this.ctx.query;
    });
    console.log(ret);
    this.ctx.body = 'hi, ' + this.app.plugins.validator.name;
  }
}

module.exports = HomeController;
