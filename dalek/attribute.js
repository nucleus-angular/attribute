module.exports = {
  name: 'attribute',

  'should add/remove attribute based on expression': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .wait(500)
      .assert.doesntExist('.home-page div:nth-child(1)[data-test="on"]', 'attribute not on element')
    .click('.home-page div:nth-child(1)')
    .wait(500)
      .assert.exists('.home-page div:nth-child(1)[data-test="on"]', 'attribute attribute on element')
    .done();
  },

  'should support conditional values for attributes': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .wait(500)
      .assert.exists('.home-page div:nth-child(2)[data-test="value1"]', 'attribute has first value')
    .click('.home-page div:nth-child(2)')
    .wait(500)
      .assert.exists('.home-page div:nth-child(2)[data-test="value2"]', 'attribute has second value')
    .done();
  },

  'should support dynamic values for attributes': function(test) {
    test.open('http://localhost:3000/home')
    //angular - need to wait for angular to render this container
    .wait(500)
      .assert.exists('.home-page div:nth-child(3)[data-test="attribute-value"]', 'attribute has value based on scope parameter')
    .done();
  }
}