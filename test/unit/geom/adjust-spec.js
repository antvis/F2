const expect = require('chai').expect;
const Adjust = require('../../../src/geom/adjust/index');
const Util = require('../../../src/util/common');

describe('stack adjust', function() {

  describe('default stack', function() {
    const data = [{
      a: 1,
      b: 2,
      c: 1
    }, {
      a: 1,
      b: 3,
      c: 2
    },

    {
      a: 2,
      b: 1,
      c: 1
    }, {
      a: 2,
      b: 4,
      c: 2
    },

    {
      a: 3,
      b: 5,
      c: 1
    }, {
      a: 3,
      b: 1,
      c: 2
    }
    ];

    const adjust = new Adjust.Stack({
      xField: 'a',
      yField: 'b'
    });

    it('init', () => {
      expect(adjust.xField).equal('a');
      expect(adjust.yField).equal('b');
    });

    it('process adjust', function() {
      adjust.processAdjust([ data ]);

      const obj1 = data[0];
      expect(obj1.b.length).to.be.equal(2);
      expect(obj1.b[0]).to.be.equal(0);
      expect(obj1.b[1]).to.be.equal(2);

      const obj2 = data[1];
      expect(obj2.b[0]).to.be.equal(2);
      expect(obj2.b[1]).to.be.equal(5);
    });

  });

  describe('stack array', function() {
    const data = [{
      a: 1,
      b: [ 0, 3 ],
      c: 1
    }, {
      a: 1,
      b: [ 3, 4 ],
      c: 2
    },

    {
      a: 2,
      b: 1,
      c: 1
    }, {
      a: 2,
      b: 4,
      c: 2
    },

    {
      a: 3,
      b: 5,
      c: 1
    }, {
      a: 3,
      b: 1,
      c: 2
    }
    ];

    const adjust = new Adjust.Stack({
      xField: 'a',
      yField: 'b'
    });

    it('process adjust', function() {
      adjust.processAdjust([ data ]);

      const obj1 = data[0];
      expect(obj1.b.length).to.be.equal(2);
      expect(obj1.b[0]).to.be.equal(0);
      expect(obj1.b[1]).to.be.equal(3);

      const obj2 = data[1];
      expect(obj2.b[0]).to.be.equal(3);
      expect(obj2.b[1]).to.be.equal(7);
    });
  });

  describe('stack with 0', function() {
    const data = [{
      a: 1,
      b: 2,
      c: 1
    }, {
      a: 1,
      b: 0,
      c: 2
    },
    {
      a: 2,
      b: 1,
      c: 1
    }, {
      a: 2,
      b: 4,
      c: 2
    },

    {
      a: 3,
      b: 0,
      c: 1
    }, {
      a: 3,
      b: 1,
      c: 2
    }
    ];

    it('adjust result', function() {
      const adjust = new Adjust.Stack({
        xField: 'a',
        yField: 'b'
      });

      adjust.processAdjust([ data ]);
      const obj1 = data[0];
      expect(obj1.b.length).to.be.equal(2);
      expect(obj1.b[0]).to.be.equal(0);
      expect(obj1.b[1]).to.be.equal(2);

      const obj2 = data[1];
      expect(obj2.b.length).to.be.equal(2);
      expect(obj2.b[0]).to.be.equal(2);
      expect(obj2.b[1]).to.be.equal(2);
    });
  });
});

describe('adjust dodge', function() {

  describe('default adjust all has two', function() {
    const data = [{
      a: 1,
      b: 2,
      c: 1
    }, {
      a: 1,
      b: 3,
      c: 2
    },

    {
      a: 2,
      b: 1,
      c: 1
    }, {
      a: 2,
      b: 4,
      c: 2
    },

    {
      a: 3,
      b: 5,
      c: 1
    }, {
      a: 3,
      b: 1,
      c: 2
    }
    ];

    const groupData = Util.Array.group(data, 'c');
    const adjust = new Adjust.Dodge({
      xField: 'a',
      marginRatio: 0.5
    });

    it('init', function() {
      expect(adjust.xField).to.be.equal('a');
    });

    it('process adjust', function() {
      adjust.processAdjust(groupData);
      expect(groupData.length).to.be.equal(2);

      const d1 = groupData[0];

      const obj1 = d1[0];
      expect(obj1.a).to.be.equal(0.8125);

      const obj2 = d1[1];
      expect(obj2.a).to.be.equal(1.8125);
    });
  });

  describe('adjust only one group.', function() {
    const data = [{
      a: 0,
      b: 1,
      c: 2
    }, {
      a: 1,
      b: 1,
      c: 1
    }, {
      a: 2,
      b: 1,
      c: 1
    }];
    const adjust = new Adjust.Dodge({
      xField: 'a'
    });
    const groupData = Util.Array.group(data, 'b');

    it('adjust', function() {
      adjust.processAdjust(groupData);
      expect(groupData[0][0].a).equal(0);
      expect(groupData[0][1].a).equal(1);
      expect(groupData[0][2].a).equal(2);
    });
  });
});
