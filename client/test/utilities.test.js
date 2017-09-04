import utils from '../src/utilities';

describe('makeMutableCopy', function() {
  test('Creates object that is safely mutable with respect to passed lookups',
    function() {
      let objectToCopy = {
        key1: 'val1',
        key2: {
          key3: 'val2',
          key4: {
            key5: 'val3'
          }
        },
        key6: [
          {key7: 'val3'},
          {key8: 'val4'}
        ]
      };

      let copy;

      const testIfCopy = (copy, copiedFrom) => {
        expect(copy).toEqual(copiedFrom);
        expect(copy).not.toBe(copiedFrom);
      };

      copy = utils.makeMutableCopy(objectToCopy);
      testIfCopy(copy, objectToCopy);

      copy = utils.makeMutableCopy(
        objectToCopy,
        'key2.key3',
        'key6.0'
      );
      testIfCopy(copy, objectToCopy);
      testIfCopy(copy.key2, objectToCopy.key2);
      expect(copy.key2.key4).toBe(objectToCopy.key2.key4);
      testIfCopy(copy.key6, objectToCopy.key6);
      expect(copy.key6[0]).toBe(objectToCopy.key6[0]);
    }
  );
});
