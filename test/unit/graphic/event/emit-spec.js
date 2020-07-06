import EventEmit from '../../../../src/graphic/event/emit';

const mockCallback = jest.fn();

const emitter = new EventEmit();

describe('EventEmit', function() {
  it('on', function() {
    emitter.on('a', mockCallback);
    emitter.on('a', null);
    emitter.on('', function() {});
    expect(emitter.__events.a.length).toBe(1);
  });

  it('emit', function() {
    emitter.emit('a');
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('off', function() {
    emitter.on('a', function() {});
    emitter.on('b', function() {});
    emitter.on('b', function() {});
    expect(emitter.__events.a.length).toBe(2);
    expect(emitter.__events.b.length).toBe(2);

    emitter.off('a', mockCallback);
    emitter.off('b');

    expect(emitter.__events.a.length).toBe(1);
    expect(emitter.__events.b).toBe(undefined);
  });

  it('off same name function off', function() {
    emitter.off('a');
    function test() {}
    emitter.on('a', test);
    emitter.on('a', test);
    expect(emitter.__events.a.length).toBe(2);

    emitter.off('a', test);

    expect(emitter.__events.a.length).toBe(0);
  });
});

