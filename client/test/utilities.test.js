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

describe('Ancestry key utils', () => {
  test('it finds all ancestor keys correctly', () => {
    let ancestryKey = '0_0_1_2';
    let ancestorKeys = utils.tree.getAncestorKeys(ancestryKey);
    expect(ancestorKeys).toEqual([
      '0',
      '0_0',
      '0_0_1'
    ]);
  });

  test('it evaluates whether a component has a connected parent', () => {
    let componentProps = {
      '0_0': {connected: false},
      '0_1': {connected: true}
    };

    const checkForInheritedConnection = utils.tree.checkForInheritedConnection;
    expect(checkForInheritedConnection('0_0', componentProps)).toBe(false);
    expect(checkForInheritedConnection('0_0_0', componentProps)).toBe(false);
    expect(checkForInheritedConnection('0_1_0', componentProps)).toBe(true);
    expect(checkForInheritedConnection('0_1', componentProps)).toBe(false);
    expect(checkForInheritedConnection('0_2', componentProps)).toBe(false);
    expect(checkForInheritedConnection('0', componentProps)).toBe(false);
  });

  test('it evaluates where one of it\'s children is connected', () => {
    let componentProps = {
      '0_0_1': {connected: true},
      '0_0_0_0': {connected: false},
      '0_1_0': {connected: true}
    };

    const checkForConnectedDescendants = utils.tree.checkForConnectedDescendants;
    expect(checkForConnectedDescendants('0_0', componentProps)).toBe(true);
    expect(checkForConnectedDescendants('0_0_1', componentProps)).toBe(false);
    expect(checkForConnectedDescendants('0_0_0', componentProps)).toBe(false);
    expect(checkForConnectedDescendants('0_1', componentProps)).toBe(true);
    expect(checkForConnectedDescendants('0', componentProps)).toBe(true);
  });
});
