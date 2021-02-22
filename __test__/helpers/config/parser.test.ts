import {
  setParsers,
  setParser,
  getParsers,
  clearParsers,
} from '../../../src/helpers/config/parser';

describe('parsers', () => {
  afterEach(() => {
    clearParsers();
  });

  test('setParser', () => {
    const Parser = () => {};
    setParser(Parser);
    expect(getParsers()).toEqual([Parser]);

    const Parser2 = () => {};
    setParser(Parser2);
    expect(getParsers()).toEqual([Parser, Parser2]);
  });

  test('setParsers', () => {
    const Parser = () => {};
    const Parser2 = () => {};
    setParsers([Parser, Parser2]);

    expect(getParsers()).toEqual([Parser, Parser2]);
  });

  test('clearParsers', () => {
    const Parser = () => {};
    setParsers([Parser]);

    clearParsers();
    expect(getParsers()).toEqual([]);
  });
});
