import {
  getAll,
  getSatAt,
  getSatAll,
  getChildrenPage,
  getChildrenAll,
  getMetadata,
  getSatPage,
  getBlockHash,
  getBlockHeight,
  getBlockTime,
  getBlockInfo,
} from './Recursive.mjs';
import { describe, it, expect } from 'bun:test';

const testOrigin = 'https://ordinals.com';

describe('getAll', () => {
  it('should fetch all inscriptions', async () => {
    const id = '<inscriptionId>';
    const testResponse = {};
    const inscription = await fetch(`${testOrigin}/r/inscription/${id}`);
    const inscriptionJson = await inscription.json();
    const sat = inscriptionJson.sat;

    const satAll = await fetch(`${testOrigin}/r/sat/${sat}`);
    const satAllJson = await satAll.json();

    const children = await fetch(`${regTestOrigin}/r/children/${id}/0`);
    const childrenJson = await children.json();

    testResponse.children = childrenJson.ids;
    testResponse.id = id;
    testResponse.inscription = inscriptionJson;
    testResponse.metadata = 'metadata here';
    testResponse.satIds = satAllJson.ids;

    const all = await getAll(id, regTestOrigin);
    expect(all).toEqual(testResponse);
  });
});

describe('getBlockInfo', () => {
  it('should fetch block info', async () => {
    const blockInfo = await getBlockInfo(0, testOrigin);
    expect(blockInfo).toEqual({
      bits: 486604799,
      chainwork: 4295032833,
      confirmations: 832757,
      difficulty: 1.0,
      hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
      height: 0,
      median_time: 1231006505,
      merkle_root:
        '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
      next_block:
        '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
      nonce: 2083236893,
      previous_block: null,
      target:
        '00000000ffff0000000000000000000000000000000000000000000000000000',
      timestamp: 1231006505,
      transaction_count: 1,
      version: 1,
    });
  });
});

describe('getSatAt', () => {
  it('should fetch a single inscription on a sat', async () => {
    const sat = 1932536250000000;
    const index = 1;
    const mockInscription = {
      id: '0974de6e963752b9e54215038188f8c9ad35df909db8688d69ad018320d0de9ai0',
    };

    const inscription = await getSatAt(sat, index, testOrigin);
    expect(inscription).toEqual(mockInscription);
  });
});

describe('getSatPage', () => {
  it('should fetch page data for a specific SAT', async () => {
    const sat = 1932536250000000;
    const page = 0;

    const testData = await fetch(`${testOrigin}/r/sat/${sat}/${page}`);

    const pageData = await getSatPage(sat, page, testOrigin);
    const test = await testData.json();
    expect(pageData).toEqual(test);
  });
});

describe('getSatAll', () => {
  it('should fetch all inscriptions on a sat', async () => {
    const sat = 1932536250000000;

    const ids = await getSatAll(sat, testOrigin);
    expect(ids).toEqual([
      '025107e06ac442f014c09a73cd97372f69619edd00dbeacca0aac55c75efe3ffi0',
      '0974de6e963752b9e54215038188f8c9ad35df909db8688d69ad018320d0de9ai0',
    ]);
  });
});

describe('getChildrenPage', () => {
  it('should fetch a page of children for a given inscription', async () => {
    const inscriptionId =
      '025107e06ac442f014c09a73cd97372f69619edd00dbeacca0aac55c75efe3ffi0';
    const page = 0;

    const testData = await fetch(
      `${testOrigin}/r/children/${inscriptionId}/${page}`
    );

    const result = await getChildrenPage(inscriptionId, page, testOrigin);
    expect(result).toEqual(await testData.json());
  });
});

describe('getChildrenAll', () => {
  it('should fetch all children of a given inscription', async () => {
    const inscriptionId =
      '025107e06ac442f014c09a73cd97372f69619edd00dbeacca0aac55c75efe3ffi0';
    const page = 0;

    const testData = await fetch(
      `${testOrigin}/r/children/${inscriptionId}/${page}`
    );
    const test = await testData.json();
    const ids = await getChildrenAll(inscriptionId, testOrigin);
    expect(ids).toEqual(test.ids);
  });
});

describe('getMetadata', () => {
  it('should fetch and process metadata', async () => {
    const testId =
      'ea224b93622931ff17c43a5625bed067cede609bcd8f6bd3d8ac5e4b8a30625bi0';

    const metadata = await getMetadata(testId, testOrigin);
    expect(metadata).toEqual({
      title: 'Cypherpunk Ghost Honoary Eloc',
      description: 'Cypherpunk legends of past, present and future',
      collection: 'Cypherpunk Ghost Honoarys',
    });
  });
});

describe('getMetadata', () => {
  it('should fetch and process metadata and handle 404', async () => {
    const testId =
      'c75dfdc8cbc8c237dfa94f7ba023a25412e3d7839f3009bfb880f054968fc21di0';
    const meta = await getMetadata(testId, testOrigin);
    expect(meta).toEqual(null);
  });
});

describe('getBlockHash', () => {
  it('should fetch hash at height', async () => {
    const testHeight = 1;
    const mockHash =
      '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048';

    const blockHash = await getBlockHash(testHeight, testOrigin);
    expect(JSON.parse(blockHash)).toBe(mockHash);
  });

  it('should handle future block', async () => {
    const testHeight = 888888;

    const hash = await getBlockHash(testHeight, testOrigin);
    expect(hash).toEqual(null);
  });
});

describe('getBlockTime', () => {
  it('should fetch the UNIX timestamp of the latest block', async () => {
    const timeTest = await fetch(`${testOrigin}/r/blocktime`);

    const time = await getBlockTime(testOrigin);
    expect(time).toEqual(await timeTest.json());
  });
});

describe('getBlockHash', () => {
  it('should fetch the Current block height', async () => {
    const timeTest = await fetch(`${testOrigin}/r/blockheight`);

    const time = await getBlockHeight(testOrigin);
    expect(time).toEqual(await timeTest.json());
  });
});
