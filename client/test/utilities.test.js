import utils from '../src/utilities';

describe('makeMutableCopy', function() {

  test('safeSet sets lookup path without modifying original', () => {
    let object = {
      key1: 'val1',
      key2: {
        key3: 'val2',
      }
    };

    let newObject = utils.safeSet(object, 'val4', 'key1');
    expect(newObject.key1).toBe('val4');
    expect(newObject.key2).toBe(object.key2);

    newObject = utils.safeSet(object, 'val5', 'key2.key3');
    expect(newObject.key2.key3).toBe('val5');
    expect(object.key2.key3).toBe('val2');
  });

  test('safeDelete removes lookup path without modifying original', () => {
    let object = {
      key1: 'val1',
      key2: {
        key3: 'val2',
      }
    };

    let newObject = utils.safeDelete(object, 'key1');
    expect(newObject.key1).toBe(undefined);
    expect(newObject.key2).toBe(object.key2);
    newObject = utils.safeDelete(object, 'key2.key3');
    expect(newObject.key2.key3).toBe(undefined);
    expect(newObject.key2.key3).not.toBe(object.key2.key3);
  });

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

describe('Output store utils', () => {
  test('Builds lookup path correctly', () => {
    let pathArrays = [
      [0],
      [0, 1],
      ['0', '1'],
      [0, 'elementSchema'],
      [0, 1, 'elementSchema', 1]
    ];

    let expectedPaths = [
      'properties.0',
      'properties.0.properties.1',
      'properties.0.properties.1',
      'properties.0.elementSchema',
      'properties.0.properties.1.elementSchema.properties.1',
    ];

    for (let i in pathArrays) {
      expect(
        utils.outputStore.buildPropertiesPath(pathArrays[i])
      ).toBe(expectedPaths[i]);
    }
  });

  test('Converts Properties Into Object', () => {
    let outputStoreProperties = [
      {name: 'displayList', initialValue: 'true', type: 'Boolean'},
      {name: 'displayLogo', initialValue: '', type: 'Boolean'},
      {name: 'listCount', initialValue: '3', type: 'Number'},
      {name: 'listName', initialValue: '"Cats"', type: 'String'},
      {name: 'listName2', initialValue: '""', type: 'String'},
      {name: 'listName3', initialValue: '', type: 'String'},
      {name: 'list', initialValue: '["Garfield", "Fido", "Bob"]', type: 'Array', elementSchema: {type: 'String'}},
      {name: 'list2', initialValue: '', type: 'Array', elementSchema: {type: 'String'}},
      {name: 'petOwners', initialValue: '{}', type: 'Object', properties: [
        {name: 'pets', type: 'Object', properties: [
          {name: 'animal', type: 'String'},
          {name: 'food', type: 'String'}
        ]},
        {name: 'age', type: 'Number'}
      ]},
      {name: 'petOwners2', initialValue: '', type: 'Object', properties: [
        {name: 'pets', type: 'Object', properties: [
          {name: 'animal', type: 'String'},
          {name: 'food', type: 'String'}
        ]},
        {name: 'age', type: 'Number'}
      ]}
    ];

    let convertedObj = utils.outputStore.convertPropertiesIntoObject(outputStoreProperties);

    expect(convertedObj.displayList).toEqual(true);
    expect(convertedObj.displayLogo).toEqual(null);
    expect(convertedObj.listCount).toEqual(3);
    expect(convertedObj.listName).toEqual('Cats');
    expect(convertedObj.listName2).toEqual('');
    expect(convertedObj.listName3).toEqual('');
    expect(convertedObj.list).toEqual(["Garfield", "Fido", "Bob"]);
    expect(convertedObj.list2).toEqual([]);
    expect(convertedObj.petOwners).toEqual({});
    expect(convertedObj.petOwners2).toEqual({
      pets: {animal: '', food: ''},
      age: null
    });
  });
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
