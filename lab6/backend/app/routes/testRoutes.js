const tests = [
  {
    'title': 'Первый Тест',
    'questions': [
      {
        'title': 'Первый вопрос',
        'responses': [
          {
            'title': 'Первый ответ',
            'isCorrent': false
          },
          {
            'title': 'Второй ответ',
            'isCorrent': false
          },
          {
            'title': 'Третий ответ',
            'isCorrent': true
          }
        ]
      }
    ]
  },
  {
    'title': 'Второй Тест',
    'questions': [
      {
        'title': 'Первый вопрос',
        'responses': [
          {
            'title': 'Первый ответ',
            'isCorrent': false
          },
          {
            'title': 'Второй ответ',
            'isCorrent': false
          },
          {
            'title': 'Третий ответ',
            'isCorrent': true
          }
        ]
      }
    ]
  }
];

module.exports = (app, mongoose, Test) => {
  app.get('/tests', (req, res) => {
    Test.find({}, (err, data) =>{
      if(err) return res.sendStatus(500);
      res.send(data.length ? data : tests);
    });
  });

  app.post('/tests', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const params = req.body;
    const testParams = {
      title: params.title,
      questions: params.questions
    };
    const test = new Test(testParams);
    test.save((err) => {
      if (err) return res.sendStatus(500);
      Test.find({}, (err, data) =>{
        if(err) return res.sendStatus(500);
        res.send(data);
      });
    });
  });
};
