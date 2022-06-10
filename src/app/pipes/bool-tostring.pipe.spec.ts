import { BoolTOstringPipe } from './bool-tostring.pipe';

describe('BoolTOstringPipe', () => {
  it('create an instance', () => {
    const pipe = new BoolTOstringPipe();
    expect(pipe).toBeTruthy();
  });
});
