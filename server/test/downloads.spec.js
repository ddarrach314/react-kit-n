const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const AdmZip = require('adm-zip');

const onion = {
  store: {
    todos: [],
    username: null
  },
  actions: {
    1: {
      name: 'addTodo',
      type: 'add',
      target: 'todos'
    },
    2: {
      name: 'deleteTodo',
      type: 'delete',
      target: 'todos'
    },
    3: {
      name: 'setTodo',
      type: 'setIn',
      target: 'todos'
    },
    4: {
      name: 'setUsername',
      type: 'set',
      target: 'username'
    }
  },
  components: {
    0: {
      name: 'App',
      children: [
        {
          'childId': 2,
          'componentId': 2
        },
        {
          'childId': 3,
          'componentId': 3
        },
        {
          'childId': 4,
          'componentId': 4
        }
      ],
    },

    2: {
      name: 'exampleChild',
      children: []
    },

    3: {
      name: 'exampleChild2',
      children: [
        {
          'childId': 5,
          'componentId': 4
        }
      ]
    },

    4: {
      name: 'exampleChildList',
      children: []
    },

    5: {
      name: 'exampleChildOfChild',
      children: []
    }
  },
};

describe('Download Route', function() {
  it('accepts GET requests', function(done) {
    request(app)
      .get('/download')
      .query({onion: JSON.stringify(onion)})
      .expect(200)
      .expect('Content-Type', 'application/zip')
      .end(done);
  });

  it('rejects POST request', (done) => {
    request(app)
      .post('/download')
      .send(onion)
      .expect(404)
      .end(done);
  });

  // it('sends a zip file stream with the correct contents', (done) => {
  //   request(app)
  //     .post('/download')
  //     .send(onion)
  //     .expect(200)
  //     .expect('Content-Type', 'application/zip')
  //     .parse((res, fn) => {
  //       res.data = '';
  //       res.on('data', (chunk) => res.data += chunk);
  //       res.on('end', () => {
  //         try {
  //           fn (null, new AdmZip(res.data));
  //         } catch (error) {
  //           fn(error);
  //         }
  //       });
  //     })
  //     .end((error, res) => {
  //       if (error) return done(error);
  //       console.log('body', res.body);

  //       let zipEntries = res.body.getEntries();

  //       zipEntries.forEach((entry) => {
  //         console.log(entry.toString());
  //       });
  //       done(res.body);
  //     });
  // });
});