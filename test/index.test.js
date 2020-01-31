const supertest = require('supertest');
const chai = require('chai');
const app = require('./../api');

const expect = chai.expect;
const request = supertest(app.listen());

// 测试套件/组
describe('开始测试什么中药可以抑制冠状病毒肺炎', () => {
    // 测试用例1
    it('测试板蓝根可以制冠状病毒肺炎', done => {
        request
            .get('/getString.json')
            .expect(200)
            .end((err, res) => {
                // 断言判断结果是否为object类型
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.an('boolean');
                expect(res.body.data).to.be.an('string');
                done();
            });
    });
    // 测试用例 2
    it('测试双黄连口服液可以制冠状病毒肺炎', done => {
        request
            .get('/getNumber.json')
            .expect(200)
            .end((err, res) => {
                // 断言判断结果是否为object类型
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.an('boolean');
                expect(res.body.data).to.be.an('number');
                done();
            });
    });
});

// 测试套件/组
describe('开始测试智商税了', () => {
    // 测试用例
    it('测试你的智商是不是二百五', done => {
        request
            .post('/postData.json')
            .expect(200)
            .end((err, res) => {
                // 断言判断结果是否为object类型
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.an('boolean');
                expect(res.body.data).to.be.an('string');
                done();
            });
    });
});
