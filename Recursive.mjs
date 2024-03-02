/**
 * @title Recursive Endpoints
 * @author Eloc
 * @description Library for getting data off recursive endpoints
 * @version 2.0
 */
import { decode } from './content/cbor-x.mjs';

/**
 * @description Retrieves the inscription ID from the current page's URL.
 * Assumes the URL follows a structure like `/content/<id>` or `/preview/<id>`.
 * The ID is expected to be the third segment in the URL path.
 *
 * @returns {string} The extracted ID.
 * @example
 * import { getId } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const myId = getId();
 */
export const getId = () => {
  let rex = /\/([a-f0-9]{64}i[0-9]{1,3})\/?/i;
  return rex.exec(window.location.pathname).pop();
};

/**
 * @description Fetches information about an inscription.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @param {string} inscriptionId - Inscription to get metadata.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} origin - The origin for the fetch
 * @returns {Promise<{charms: Array<string>, content_type: string, content_length: number, fee: number, height: number, number: number, output: string, sat: null | string, satpoint: string, timestamp: number, value: number} | null>} A promise that resolves with the processed metadata or null if the metadata was not found.
 * @example
 * import { getMetadata } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const inscription = await getInscription();
 */

export const getInscription = async (inscriptionId = getId(), origin = '') => {
  try {
    const response = await fetch(`${origin}/r/inscription/${inscriptionId}`);
    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching inscription:', error);
  }
};

/**
 * @description Fetches metadata information about an inscription.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @param {string} inscriptionId - Inscription to get metadata.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} origin - The origin for the fetch
 * @returns {Promise<{Object | null}>} A promise that resolves with the processed metadata or null if the metadata was not found.
 * @warning Cbor-x decode might not have full coverage of decoding to json. Always test your response is like you intend before inscribing.
 * @example
 * import { getMetadata } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const metadata = await getMetadata();
 */
export const getMetadata = async (inscriptionId = getId(), origin = '') => {
  try {
    const response = await fetch(`${origin}/r/metadata/${inscriptionId}`);
    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    const byteArray = new Uint8Array(
      json.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    );
    const buffer = byteArray.buffer;
    const jsonData = decode(new Uint8Array(buffer));
    return jsonData;
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
};

/**
 * @description Fetches a single inscription on a sat based on index.
 * If index is not provided, it defaults to -1, which fetches the most recent inscription.
 *
 * @param {string} sat - The sat to fetch the inscription from.
 * @param {number} index - The index of the inscription to fetch. Defaults to -1.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<{id: string}>} A promise that resolves with the fetched inscriptionId.
 * @example
 * import { getSatAt } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const sat = 1
 * const newestSatInscription = await getSatAt(sat);
 */
export const getSatAt = async (sat, index = -1, origin = '') => {
  const response = await fetch(`${origin}/r/sat/${sat}/at/${index}`);
  return response.json();
};

/**
 * @description Fetches the page data for a specific SAT at a given page number.
 *
 * @param {string} sat - The SAT number to fetch the page data for.
 * @param {number} page - The page number to fetch. Defaults to 0.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 * @example
 * import { getSatPage } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const sat = 1
 * const satFirst100 = await getSatPage(sat);
 */
export const getSatPage = async (sat, page = 0, origin = '') => {
  try {
    const response = await fetch(`${origin}/r/sat/${sat}/${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const ids = data.ids;
    const more = data.more;
    const pageData = data.page;

    return { ids, more, page: pageData };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

/**
 * @description Fetches all the inscriptions on a sat.
 * The function fetches the inscriptions in pages, and continues fetching until there are no more pages.
 *
 * @param {string} sat - The sat to fetch the inscriptions from.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the inscriptions.
 * @example
 * import { getSatAll } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const satAll = await getSatAll();
 */
export const getSatAll = async (sat, origin = '') => {
  let ids = [];
  let more = true;
  let page = 0;

  while (more) {
    const result = await getSatPage(sat, page, origin);
    ids = ids.concat(result.ids);
    more = result.more;
    page++;
  }
  return ids;
};

/**
 * @description Fetches the children of a given inscription.
 * If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.
 *
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {number} page - The page number to fetch the children from.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 * @example
 * import { getChildrenPage } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const getFirst100Children = await getChildrenPage();
 */
export const getChildrenPage = async (
  inscriptionId = getId(),
  page = 0,
  origin = ''
) => {
  let ids = [];
  let more = true;

  try {
    const response = await fetch(
      `${origin}/r/children/${inscriptionId}/${page}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    ids = ids.concat(data.ids);
    more = data.more;
    page = data.page;
  } catch (error) {
    console.error('Error fetching data:', error);
    more = false;
  }
  return { ids, more, page };
};

/**
 * @description Fetches all the children of a given inscription.
 *
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID obtained from `getId()`.
 *
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the children.
 * @example
 * import { getChildrenAll } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const allChildren = await getChildrenAll();
 */
export const getChildrenAll = async (inscriptionId = getId(), origin = '') => {
  let ids = [];
  let more = true;
  let page = 0;

  while (more) {
    const result = await getChildrenPage(inscriptionId, page, origin);
    ids = ids.concat(result.ids);
    more = result.more;
    page++;
  }
  return ids;
};

/**
 * @description Fetches all information about an inscription, including children, sat inscriptions, metadata and its id.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @param {string} inscriptionId - Inscription to get all information.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} origin - The origin for the fetch
 * @returns {Promise<{inscription: {charms: Array<string>, content_type: string, content_length: number, fee: number, height: number, number: number, output: string, sat: null | string, satpoint: string, timestamp: number, value: number} | null, children: Array<string>, satIds: Array<string>, metadata: Object | null, id: <string>}>} A promise that resolves with all the information about the inscription.
 * @example
 * import { getInscriptionAll } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const allInfo = await getInscriptionAll();
 */
export const getAll = async (inscriptionId = getId(), origin = '') => {
  let res = {};
  try {
    const inscription = await getInscription(inscriptionId, origin);
    res.inscription = inscription;

    const children = await getChildrenAll(inscriptionId, origin);
    res.children = children;

    const sat = await getSatAll(inscription.sat, origin);
    res.satIds = sat;

    const metadata = await getMetadata(inscriptionId, origin);
    res.metadata = metadata;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  res.id = inscriptionId;
  return res;
};

/**
 * @description Fetches information about a specific block by block height or block hash.
 * @param {string} blockInfo - The block height or block hash to get information about.
 * @param {string} origin - The origin for the fetch.
 * @returns {Promise<{bits: number, chainwork: number, confirmations: number, difficulty: number, hash: string, height: number, median_time: number, merkle_root: string, next_block: string, nonce: number, previous_block: string, target: string, timestamp: number, transaction_count: number, version: number} | null>} A promise that resolves with the information about the block or null if not found.
 * @example
 * import { getBlockInfo } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const blockInfo = await getBlockInfo(0);
 */
export const getBlockInfo = async (blockInfo, origin = '') => {
  const url = `${origin}/r/blockinfo/${blockInfo}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Network response was not ok');
  }

  return response.json();
};

/**
 * @description Fetches the block hash at a given block height.
 * @param {number} height - The height of the block to get the hash of.
 * @returns {Promise<string | null>} A promise that resolves with the hash of the block or null if 404.
 * @example
 * import { getBlockHash } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const findHash = await getBlockHash(height)
 */
export const getBlockHash = async (height, origin = '') => {
  const url = `${origin}/r/blockhash/${height}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Network response was not ok');
  }

  const hash = await response.text();
  return hash;
};

/**
 * @description Fetches the latest block height.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<number>} A promise that resolves with the height of the latest block.
 * @example
 * import { getBlockHeight } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const bh = await getBlockHeight();
 */
export const getBlockHeight = async (origin = '') => {
  try {
    const response = await fetch(`${origin}/r/blockheight`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const height = await response.text();
    return Number(height);
  } catch (error) {
    console.error('Error fetching block height:', error);
  }
};

/**
 * @description Fetches the UNIX time stamp of the latest block.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<number>} A promise that resolves with the UNIX time stamp of the latest block.
 * @example
 * import { getBlockTime } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const blockTime = await getBlockTime();
 */
export const getBlockTime = async (origin = '') => {
  try {
    const response = await fetch(`${origin}/r/blocktime`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const time = await response.text();
    return Number(time);
  } catch (error) {
    console.error('Error fetching block time:', error);
  }
};
