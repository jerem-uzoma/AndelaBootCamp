import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
const should = chai.should();
chai.use(chaiHttp);

describe("HTTP API test", () => {

    it('fails, as expected', (done) => { // <= Pass in done callback
        chai.request(app)
            .get('/api/v1.0/recipes')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                done();
            });

    });

    it('fails, as expected', (done) => { // <= Pass in done callback
        chai.request(app)
            .get('/api/v1.0/recipes')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                done();
            });

    });

})